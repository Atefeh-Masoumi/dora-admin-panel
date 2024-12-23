import { LoadingButton } from "@mui/lab";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  useGetApiMyPortalProductBundleWebListQuery,
  usePutApiMyWebHostEditByIdMutation,
} from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { EditWebContext } from "./contexts/EditWebContext";
import EditWebTableRow from "./tables/EditWebTableRow";
import { editWebTableStruct } from "./tables/editWebTableStruct";

type WebConfigPropsType = {};

export const WebConfig: FC<WebConfigPropsType> = () => {
  const { data: configsList, isLoading } =
    useGetApiMyPortalProductBundleWebListQuery();

  const table = useMemo(
    () => (
      <BaseTable
        struct={editWebTableStruct}
        RowComponent={EditWebTableRow}
        rows={configsList || []}
        text=""
        isLoading={isLoading}
      />
    ),
    [configsList, isLoading]
  );

  const navigate = useNavigate();

  const { serverId, serverConfig } = useContext(EditWebContext);
  const [editWebModel, { isLoading: updateLoading }] =
    usePutApiMyWebHostEditByIdMutation();

  const submitHandler = () => {
    if (!serverId || !serverConfig) return;

    editWebModel({
      id: serverId,
      editWebHostModel: {
        productBundleId: serverConfig.id || 0,
      },
    })
      .unwrap()
      .then(() => {
        navigate("/web");
        toast.success("درخواست تغییر سرویس با موفقیت انجام شد");
      });
    return;
  };

  return (
    <>
      <Grid2 container spacing={3} alignItems="center" justifyContent="center">
        <Grid2 xs={12}>
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
                <Typography fontSize={18} color="rgba(110, 118, 138, 1)">
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
