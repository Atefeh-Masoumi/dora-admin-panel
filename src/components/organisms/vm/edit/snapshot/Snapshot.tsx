import { Add, Remove } from "@mui/icons-material";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { CreateSnapshotDialog } from "./dialog/CreateSnapshotDialog";
import SnapshotTableRow from "./table/SnapshotTableRow";
import { snapShotTableStruct } from "./table/struct";
import { useGetApiMyVmSnapshotListByVmHostIdQuery } from "src/app/services/api.generated";

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

  return (
    <>
      <Typography
        color="grey.700"
        fontSize={24}
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        مدیریت اسنپ شات
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
              افزودن اسنپ شات جدید
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
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <BaseTable
          struct={snapShotTableStruct}
          RowComponent={SnapshotTableRow}
          rows={snapshotList}
          text="در حال حاضر snapshot وجود ندارد"
          isLoading={getSnapshotLoading}
          initialOrder={7}
        />
      </Paper>
      <CreateSnapshotDialog
        maxWidth="xs"
        fullWidth
        open={showCreateDialog}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
      />
    </>
  );
};
