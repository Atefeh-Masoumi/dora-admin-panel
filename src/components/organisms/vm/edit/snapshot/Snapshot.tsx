import { FC, useState } from "react";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useGetApiMyVmSnapshotListByVmIdQuery } from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { snapShotTableStruct } from "./table/struct";
import { SnapshotTableRow } from "./table/SnapshotTableRow";
import { Add, Remove } from "@mui/icons-material";
import { CreateSnapshotDialog } from "./create/CreateSnapshotDialog";
import { DeleteAllSnapshotsDialog } from "./deleteAll/DeleteAllSnapshotDialog";

type SnapshotPropsType = {};

export const Snapshot: FC<SnapshotPropsType> = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);

  const { id } = useParams();
  const { data: snapshotList = [], isLoading: getSnapshotLoading } =
    useGetApiMyVmSnapshotListByVmIdQuery({ vmId: Number(id) }, { skip: !id });
  const openCreateDialogHandler = () => {
    setShowCreateDialog(true);
  };
  const closeDialogHandler = () => {
    setShowCreateDialog(false);
  };

  const openDeleteAllDialogHandler = () => {
    setShowDeleteAllDialog(true);
  };
  const closeDeleteAllDialogHandler = () => {
    setShowDeleteAllDialog(false);
  };

  return (
    <>
      <Paper sx={{ overflow: "hidden", p: 3 }} elevation={0}>
        <Stack
          // px={3}
          pb={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Typography>لیست snapshot های سرور</Typography>
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
                onClick={openDeleteAllDialogHandler}
                variant="outlined"
                color="error"
                startIcon={<Remove />}
              >
                حذف همه snapshot
              </Button>
            )}
          </Stack>
        </Stack>
        <Divider />
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
      <DeleteAllSnapshotsDialog
        openDialog={showDeleteAllDialog && !!id}
        handleClose={closeDeleteAllDialogHandler}
        id={Number(id!)}
      />
    </>
  );
};
