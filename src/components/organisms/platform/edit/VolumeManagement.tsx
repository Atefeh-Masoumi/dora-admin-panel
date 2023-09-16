import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FC, createContext, useState } from "react";
import { useGetApiPlatformVolumeListByIdQuery } from "src/app/services/api.generated";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { BaseTable } from "../../tables/BaseTable";
import { AddVolumeDialog } from "./volume/dialogs/AddVolumeDialog";
import { voluemMangementTableStruct } from "./volume/table/struct";
import { VolumeMangementTableRow } from "./volume/table/VolumeTableRow";

type VolumeManagementPropsType = { row: any };

type VolumeContextValueType = {
  refetchVolumes: () => any;
};

export const VolumeContext = createContext<VolumeContextValueType>({
  refetchVolumes: () => null,
});

export const VolumeManagement: FC<VolumeManagementPropsType> = ({ row }) => {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const { data, isLoading, refetch } = useGetApiPlatformVolumeListByIdQuery({
    id: row,
  });

  return (
    <VolumeContext.Provider value={{ refetchVolumes: () => refetch() }}>
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
                لیست والیوم ها
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
                ایجاد والیوم جدید
              </Button>
            </Stack>
            <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
            <Box width="100%" sx={{ pt: 1.5 }}>
              <BaseTable
                struct={voluemMangementTableStruct}
                RowComponent={VolumeMangementTableRow}
                rows={data || []}
                text="در حال حاضر والیومی داده شده ای وجود ندارد"
                isLoading={isLoading}
              />
            </Box>
          </Stack>
        </Grid2>
      </Grid2>
      {showDialog && <AddVolumeDialog hostId={row} onClose={closeDialog} />}
    </VolumeContext.Provider>
  );
};
