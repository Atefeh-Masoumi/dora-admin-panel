import { FC, useEffect, useContext, useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { EditRabbitContext } from "src/components/organisms/rabbit/edit/context/EditRabbitContext";
import { rabbitUserTableStruct } from "src/components/organisms/rabbit/edit/users/tables/struct";
import { RabbitUserTableRow } from "src/components/organisms/rabbit/edit/users/tables/RabbitUserTableRow";
import { AddRabbitUserDialog } from "src/components/organisms/rabbit/edit/users/dialogs/AddRabbitUserDialog";
import { useLazyGetPortalRabbitRabbitUserListByRabbitHostIdQuery } from "src/app/services/api";
import { GetPortalRabbitRabbitUserListByRabbitHostIdApiResponse } from "src/app/services/api.generated";

type ServiceUserPropsType = { row: any };

export const ServiceUser: FC<ServiceUserPropsType> = ({ row }) => {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const { serverId } = useContext(EditRabbitContext);
  const [getData, { isLoading }] = useLazyGetPortalRabbitRabbitUserListByRabbitHostIdQuery();
  const [data, setData] = useState<GetPortalRabbitRabbitUserListByRabbitHostIdApiResponse | null>(
    null
  );

  useEffect(() => {
    if (serverId) {
      getData({ rabbitHostId: serverId })
        .unwrap()
        .then((res) => {
          res && setData(res);
        });
    }
  }, [getData, serverId]);

  return (
    <>
      <Grid2
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
      >
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
            <Box width="100%" sx={{ pt: 1.5 }}>
              <BaseTable
                struct={rabbitUserTableStruct}
                RowComponent={RabbitUserTableRow}
                rows={data || []}
                text="در حال حاضر کاربری وجود ندارد"
                isLoading={isLoading}
              />
            </Box>
          </Stack>
        </Grid2>
      </Grid2>
      {showDialog && <AddRabbitUserDialog onClose={closeDialog} />}
    </>
  );
};