import { FC, useEffect, useContext, useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { EditNamespaceContext } from "./context/EditNamespaceContext";
import { kubeUserTableStruct } from "../editNamespace/kubeUsers/tables/struct";
import { KubeUserTableRow } from "./kubeUsers/tables/KubeUserTableRow";
import { AddKubeUserDialog } from "./kubeUsers/dialogs/AddKubeUserDialog";
import { useLazyGetPortalKubeUserListByKubeHostIdQuery } from "src/app/services/api";
import { GetPortalKubeUserListByKubeHostIdApiResponse } from "src/app/services/api.generated";

type ServiceUserPropsType = { row: any };

export const ServiceUser: FC<ServiceUserPropsType> = ({ row }) => {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const { serverId } = useContext(EditNamespaceContext);
  const [getData, { isLoading }] =
    useLazyGetPortalKubeUserListByKubeHostIdQuery();
  const [data, setData] =
    useState<GetPortalKubeUserListByKubeHostIdApiResponse | null>(null);

  useEffect(() => {
    if (serverId) {
      getData({ kubeHostId: serverId })
        .unwrap()
        .then((res) => {
          res && setData(res);
        });
    }
  }, [getData, serverId]);

  return (
    <>
      <Grid2 container spacing={3} alignItems="center" justifyContent="center">
        <Grid2 xs={12} md={8}>
          <Stack
            bgcolor="white"
            py={3}
            px={3}
            width="100%"
            borderRadius={3}
            direction="column"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize={18} color="secondary">
                لیست کاربران
              </Typography>
              <Button
                onClick={openDialog}
                variant="outlined"
                size="large"
                sx={{ whiteSpace: "nowrap", px: 1.2 }}
                startIcon={
                  <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
                }
              >
                افزودن کاربر جدید
              </Button>
            </Stack>
            <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
            <Stack
              py={3}
              px={3}
              bgcolor="rgba(244, 95, 80, 1)"
              direction="row"
              spacing={3}
              borderRadius={2}
              width="100%"
              color="white"
              alignItems={{ xs: "start", md: "center" }}
            >
              <ErrorOutlineOutlinedIcon />
              <Typography>توجه:</Typography>
              <Typography
                fontSize={14}
                sx={{
                  opacity: 0.9,
                }}
              >
                این سرویس نسخه آزمایشی می باشد.
                <br />
                به منظور مدیریت و استفاده از سرویس از
                https://s1-k1.dorsacloud.com استفاده نمایید.
                <br />
                برای استفاده از سرویس از نام کاربری و رمز عبور ارسال شده استفاده
                نمایید.
                <br />
                درصورتیکه نام کاربری را فراموش کرده اید کاربر فعلی را حذف و
                کاربر جدید اضافه نمایید.
              </Typography>
            </Stack>
            <Divider />

            <Box width="100%" sx={{ pt: 1.5 }}>
              <BaseTable
                struct={kubeUserTableStruct}
                RowComponent={KubeUserTableRow}
                rows={data || []}
                text="در حال حاضر کاربری وجود ندارد"
                isLoading={isLoading}
              />
            </Box>
          </Stack>
        </Grid2>
      </Grid2>
      {showDialog && <AddKubeUserDialog onClose={closeDialog} />}
    </>
  );
};
