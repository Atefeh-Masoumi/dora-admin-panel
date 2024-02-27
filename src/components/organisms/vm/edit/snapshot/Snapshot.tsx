import { FC, useState } from "react";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useGetApiMyVmSnapshotListByVmIdQuery } from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { snapShotTableStruct } from "./table/struct";
import { SnapshotTableRow } from "./table/SnapshotTableRow";
import { Add } from "@mui/icons-material";
import { CreateSnapshotDialog } from "./create/CreateSnapshotDialog";

type SnapshotPropsType = {};

export const Snapshot: FC<SnapshotPropsType> = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const { id } = useParams();
  const { data: snapshotList = [], isLoading: getSnapshotLoading } =
    useGetApiMyVmSnapshotListByVmIdQuery({ vmId: Number(id) }, { skip: !id });

  const openDialogHandler = () => {
    setShowCreateDialog(true);
  };
  const closeDialogHandler = () => {
    setShowCreateDialog(false);
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
          gap={2}
        >
          <Typography>لیست snapshot های سرور</Typography>
          <Button
            onClick={openDialogHandler}
            variant="outlined"
            startIcon={<Add />}
          >
            افزودن snapshot جدید
          </Button>
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
    </>
  );
};
