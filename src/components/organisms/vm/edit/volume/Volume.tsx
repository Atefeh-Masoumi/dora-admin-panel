import { Add } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { CreateVolumeDialog } from "./dialog/CreateVolumeDialog";
import VolumeTableRow from "./table/VolumeTableRow";
import { volumeTableStruct } from "./table/struct";
import {
  useDeleteApiMyVmVolumeDeleteByIdMutation,
  useGetApiMyVmVolumeListByVmHostIdQuery,
  VmVolumeListResponse,
} from "src/app/services/api.generated";

type VolumePropsType = {};

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const Volume: FC<VolumePropsType> = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedVolume, setselectedVolume] =
    useState<VmVolumeListResponse | null>(null);

  const { id } = useParams();
  const { data: volumeList = [], isLoading: getVolumeLoading } =
    useGetApiMyVmVolumeListByVmHostIdQuery(
      { vmHostId: Number(id) },
      { skip: !id }
    );
  const openCreateDialogHandler = () => {
    setShowCreateDialog(true);
  };
  const closeDialogHandler = () => {
    setDialogType(null);
    setShowCreateDialog(false);
  };

  const [deleteVolume, { isLoading: deleteRecordLoading }] =
    useDeleteApiMyVmVolumeDeleteByIdMutation();

  const deleteRecordHandler = () =>
    deleteVolume({ id: Number(id) })
      .unwrap()
      .then(() => {
        toast.success("دیسک بعد از بررسی حذف خواهند شد");
        closeDialogHandler();
      })
      .catch(() => {});

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
        <BaseTable
          struct={volumeTableStruct}
          RowComponent={VolumeTableRow}
          rows={volumeList}
          text="در حال حاضر دیسک وجود ندارد"
          isLoading={getVolumeLoading}
          initialOrder={9}
        />
      </Paper>
      <CreateVolumeDialog
        maxWidth="xs"
        fullWidth
        open={showCreateDialog}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
      />
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="دیسک"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={`${selectedVolume?.name}`}
        onSubmit={deleteRecordHandler}
        submitLoading={deleteRecordLoading}
      />
    </>
  );
};
