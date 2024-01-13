import { FC, useState, createContext } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { useGetApiMyPlatformUserListQuery } from "src/app/services/api.generated";
import { AddPlatformUserDialog } from "src/components/organisms/kubernetes/users/dialogs/AddKubeUserDialog";
import { PlatformUserTableStruct } from "src/components/organisms/kubernetes/users/tables/struct";
import { PlatformUserTableRow } from "src/components/organisms/kubernetes/users/tables/KubeUserTableRow";

type ServiceUsersContextValueType = {
  refetchUsersData: () => any;
};

export const ServiceUsersContext = createContext<ServiceUsersContextValueType>({
  refetchUsersData: () => null,
});

export const ServiceUsers: FC<void> = () => {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const { data, isLoading, refetch } = useGetApiMyPlatformUserListQuery();

  return (
    <ServiceUsersContext.Provider value={{ refetchUsersData: () => refetch() }}>
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
                struct={PlatformUserTableStruct}
                RowComponent={PlatformUserTableRow}
                rows={data || []}
                text="در حال حاضر کاربری وجود ندارد"
                isLoading={isLoading}
              />
            </Box>
          </Stack>
        </Grid2>
      </Grid2>
      {showDialog && <AddPlatformUserDialog onClose={closeDialog} />}
    </ServiceUsersContext.Provider>
  );
};
