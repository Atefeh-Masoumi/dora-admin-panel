import { Add } from "@mui/icons-material";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { CreateVolumeDialog } from "./dialog/CreateVolumeDialog";
import VolumeTableRow from "./table/VolumeTableRow";
import { volumeTableStruct } from "./table/struct";
import { useGetApiMyVmVolumeListByVmHostIdQuery } from "src/app/services/api.generated";

export const Volume: FC = () => {
  const { id } = useParams();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [dialogType, setDialogType] = useState<null>(null);

  const {
    data: volumeList,
    isLoading: getVolumeLoading,
    refetch,
  } = useGetApiMyVmVolumeListByVmHostIdQuery({ vmHostId: Number(id) });

  useEffect(() => {
    const getNotifInterval = setInterval(() => {
      refetch();
    }, 120 * 1000);
    return () => {
      clearInterval(getNotifInterval);
    };
  }, [refetch]);

  const openCreateDialogHandler = () => {
    setShowCreateDialog(true);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setShowCreateDialog(false);
  };

  return (
    <>
      <Typography
        color="grey.700"
        fontSize={24}
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        مدیریت دیسک
      </Typography>
      <Paper
        elevation={0}
        sx={{ overflow: "hidden", px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 5 }}
      >
        <Stack
          pb={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="end"
          gap={1}
        >
          <Stack direction={{ xs: "column", sm: "row" }} gap={1}>
            <Button
              onClick={openCreateDialogHandler}
              variant="outlined"
              startIcon={<Add />}
            >
              افزودن دیسک جدید
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack>
          <BaseTable
            struct={volumeTableStruct}
            RowComponent={VolumeTableRow}
            rows={volumeList || []}
            text="در حال حاضر دیسک وجود ندارد"
            isLoading={getVolumeLoading}
            initialOrder={1}
          />
        </Stack>
      </Paper>
      <CreateVolumeDialog
        maxWidth="xs"
        fullWidth
        open={showCreateDialog}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
      />
    </>
  );
};
