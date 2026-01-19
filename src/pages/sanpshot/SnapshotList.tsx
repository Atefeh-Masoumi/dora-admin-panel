import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { SearchBox } from "src/components/molecules/SearchBox";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { RefreshButton } from "src/components/atoms/RefreshButton";
import {
  useGetApiMyVmByProjectIdSnapshotListQuery,
  VmVolumeSnapshotListResponse,
} from "src/app/services/api.generated";
import { AddSnapshotDialog } from "./AddSnapshot";
import { snapshotTableStruct } from "src/components/organisms/snapshot/snapshotlist/struct";
import SnapshotTableRow from "src/components/organisms/snapshot/snapshotlist/SnapshotTableRow";


enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const SnapshotList: FC = () => {
  const { projectId } = useParams();
  const [search, setSearch] = useState("");
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedSnapshot, setSelectedSnapshot] = useState<VmVolumeSnapshotListResponse | null>(null);

  const {
    data: backupList = [],
    isLoading: getBackupListLoading,
    refetch,
    isFetching,
  } = useGetApiMyVmByProjectIdSnapshotListQuery({
    projectId: Number(projectId),
  });

    useEffect(() => {
    const getNotifInterval = setInterval(() => {
      refetch();
    }, 120 * 1000);
    return () => {
      clearInterval(getNotifInterval);
    };
  }, [refetch]);

  const filteredList = useMemo(() => {
    if (backupList.length === 0) return backupList;
    return (
      backupList.filter((item) =>
        item.name
          ?.trim()
          .toLowerCase()
          ?.includes(search.trim().toLowerCase())
      ) || []
    );
  }, [search, backupList]);

  const createFirewallOnClick = () => {
    setDialogType(DIALOG_TYPE_ENUM.CREATE);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedSnapshot(null);
  };

  return (
    <>
      <Stack
        bgcolor="white"
        py={3}
        px={3}
        width="100%"
        borderRadius={BORDER_RADIUS_1}
        direction="column"
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          rowGap={3}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
          >
            <Typography fontSize={18} color="secondary">
              لیست اسنپ شات‌ها
            </Typography>
            <RefreshButton isFetching={isFetching} refetchData={refetch} />
          </Stack>
          <Stack 
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
          >
            <SearchBox
              onChange={(text) => setSearch(text)}
              placeholder="جستجو در نام اسنپ شات"
            />
            <Button
              onClick={createFirewallOnClick}
              variant="outlined"
              size="large"
              sx={{
                whiteSpace: "nowrap",
                px: 1.2,
                borderRadius: BORDER_RADIUS_1,
              }}
              startIcon={
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: 24,
                    height: 24,
                    border: ({ palette }) => "1px solid " + palette.primary.main,
                    borderRadius: BORDER_RADIUS_1,
                  }}
                >
                  <Add
                    fontSize="small"
                    sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }}
                  />
                </Stack>
              }
            >
              ایجاد اسنپ شات جدید
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={snapshotTableStruct}
            RowComponent={SnapshotTableRow}
            rows={filteredList}
            text="در حال حاضر اسنپ شاتی وجود ندارد"
            isLoading={getBackupListLoading}
            initialOrder={0}
          />
        </Box>
      </Stack> 
      <AddSnapshotDialog
        open={dialogType === DIALOG_TYPE_ENUM.CREATE}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
        refetch={refetch}
      />
   
    </>
  );
};

export default SnapshotList;

