import { Add, Remove } from "@mui/icons-material";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useDeleteApiMyVmSnapshotDeleteAllByVmHostIdMutation,
  useGetApiMyVmSnapshotListByVmHostIdQuery,
} from "src/app/services/api.generated";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { CreateSnapshotDialog } from "./create/CreateSnapshotDialog";
import SnapshotTableRow from "./table/SnapshotTableRow";
import { snapShotTableStruct } from "./table/struct";

type SnapshotPropsType = {};

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const Snapshot: FC<SnapshotPropsType> = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);

  const { id } = useParams();
  const { data: snapshotList = [], isLoading: getSnapshotLoading } =
    useGetApiMyVmSnapshotListByVmHostIdQuery(
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

  const handleOpenDelete = () => {
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const [deleteAllSnapShots, { isLoading: deleteDnsRecordLoading }] =
    useDeleteApiMyVmSnapshotDeleteAllByVmHostIdMutation();

  const deleteDnsRecordHandler = () =>
    deleteAllSnapShots({ vmHostId: Number(id) })
      .unwrap()
      .then(() => {
        toast.success("تمام snapshot ها بعد از بررسی حذف خواهند شد");
        closeDialogHandler();
      })
      .catch((err) => {});

  return (
    <>
      <Typography
        color="grey.700"
        fontSize={24}
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        بازسازی سیستم عامل
      </Typography>

      <Paper
        elevation={0}
        sx={{ overflow: "hidden", px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 5 }}
      >
        <Stack
          pb={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Stack direction={{ xs: "column", sm: "row" }} gap={1}>
            <Button
              onClick={openCreateDialogHandler}
              variant="outlined"
              startIcon={<Add />}
            >
              افزودن snapshot جدید
            </Button>
            {snapshotList.length > 0 && (
              <Button
                onClick={handleOpenDelete}
                variant="outlined"
                color="error"
                startIcon={<Remove />}
              >
                حذف همه snapshot
              </Button>
            )}
          </Stack>
        </Stack>
        <BaseTable
          struct={snapShotTableStruct}
          RowComponent={SnapshotTableRow}
          rows={snapshotList}
          text="در حال حاضر snapshot وجود ندارد"
          isLoading={getSnapshotLoading}
          initialOrder={9}
        />
      </Paper>
      <CreateSnapshotDialog
        maxWidth="xs"
        fullWidth
        open={showCreateDialog}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
      />
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="Snapshot"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={`SnapShots=${id}`}
        onSubmit={deleteDnsRecordHandler}
        submitLoading={deleteDnsRecordLoading}
      />
    </>
  );
};
