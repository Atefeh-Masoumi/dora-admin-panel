import { FC, useContext, useMemo } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Grid2 from "@mui/material/Unstable_Grid2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { EditNamespaceTableRow } from "./tables/EditNamespaceTableRow";
import { editNamespaceTableStruct } from "./tables/struct";
import {
  useGetPortalPanelProductBundleListByProductCategoryIdQuery,
  usePutPortalKubeWorkspaceChangeServiceMutation,
} from "src/app/services/api.generated";
import { EditNamespaceContext } from "./context/EditNamespaceContext";

type SelectConfigPropsType = {};

export const SelectConfig: FC<SelectConfigPropsType> = () => {
  const { data: configsList, isLoading } =
    useGetPortalPanelProductBundleListByProductCategoryIdQuery({
      productCategoryId: PRODUCT_CATEGORY_ENUM.KUBE,
    });

  const table = useMemo(
    () => (
      <BaseTable
        struct={editNamespaceTableStruct}
        RowComponent={EditNamespaceTableRow}
        rows={configsList || []}
        text=""
        isLoading={isLoading}
      />
    ),
    [configsList, isLoading]
  );

  const navigate = useNavigate();

  const { serverId, serverConfig } = useContext(EditNamespaceContext);
  const [editNamespaceHostModel, { isLoading: updateLoading }] =
    usePutPortalKubeWorkspaceChangeServiceMutation();

  const submitHandler = () => {
    if (!serverId || !serverConfig) return;

    editNamespaceHostModel({
      editKubeWorkspaceModel: {
        id: serverId,
        productBundleId: serverConfig.id || 0,
      },
    })
      .unwrap()
      .then(() => {
        navigate("/kube");
        toast.success("درخواست تغییر سرویس با موفقیت انجام شد");
      });
    return;
  };

  return (
    <>
      <Grid2 container spacing={3} alignItems="center" justifyContent="center">
        <Grid2 xs={12} md={10}>
          <Stack
            bgcolor="white"
            py={3}
            px={3}
            width="100%"
            borderRadius={3}
            direction="column"
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
              rowGap={3}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems="center"
                spacing={2}
              >
                <Typography fontSize={18} color="secondary">
                  مشخصات سرویس را انتخاب کنید
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
            <Box sx={{ px: { lg: 5 }, pt: 5 }}>{table}</Box>
            <Stack py={3} px={3} alignItems="center" justifyContent="center">
              <LoadingButton
                loading={updateLoading}
                variant="contained"
                onClick={submitHandler}
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  px: { sm: 8 },
                  py: 2.1,
                }}
              >
                تغییر سرویس
              </LoadingButton>
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
    </>
  );
};
