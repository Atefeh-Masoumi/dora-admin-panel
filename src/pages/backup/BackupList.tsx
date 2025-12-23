import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SearchBox } from "src/components/molecules/SearchBox";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { RefreshButton } from "src/components/atoms/RefreshButton";
import { toast } from "react-toastify";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import {
  VmVolumeBackupListResponse,
  useGetApiMyVmByProjectIdBackupListQuery,
  useDeleteApiMyVmByProjectIdBackupDeleteAndIdMutation,
} from "src/app/services/api.generated";
import { backupTableStruct } from "src/components/organisms/backup/backuplist/struct";
import BackupTableRow from "src/components/organisms/backup/backuplist/BackupTableRow";
import { AddBackupDialog } from "./AddBackup";


enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const BackupList: FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedBackup, setSelectedBackup] = useState<VmVolumeBackupListResponse | null>(null);

  const {
    data: backupList = [],
    isLoading: getBackupListLoading,
    refetch,
    isFetching,
  } = useGetApiMyVmByProjectIdBackupListQuery({
    projectId: Number(projectId),
  });

  const [deleteBackup, { isLoading: deleteBackupLoading }] =
    useDeleteApiMyVmByProjectIdBackupDeleteAndIdMutation();

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
    setSelectedBackup(null);
  };

  const deleteBackupHandler = () => {
    if (!selectedBackup?.id) return;
    deleteBackup({
      id: selectedBackup.id,
      projectId: Number(projectId),
    })
      .unwrap()
      .then(() => {
        toast.success("بکاپ مورد نظر با موفقیت حذف شد");
        closeDialogHandler();
        refetch();
      })
      .catch(() => {});
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
              لیست بکاپ‌ها
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
              placeholder="جستجو در نام بکاپ"
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
                    border: ({ palette }) =>
                      "1px solid " + palette.primary.main,
                    borderRadius: BORDER_RADIUS_1,
                  }}
                >
                  <Add
                    fontSize="small"
                    sx={{ "& path": { stroke: "#00a651" } }}
                  />
                </Stack>
              }
            >
              ایجاد بکاپ جدید
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={backupTableStruct}
            RowComponent={BackupTableRow}
            rows={filteredList}
            text="در حال حاضر بکاپی وجود ندارد"
            isLoading={getBackupListLoading}
            initialOrder={0}
          />
        </Box>
      </Stack>
      <AddBackupDialog
        open={dialogType === DIALOG_TYPE_ENUM.CREATE}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
        refetch={refetch}
      />
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="بکاپ"
        subTitle="برای حذف بکاپ موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedBackup?.name || ""}
        onSubmit={deleteBackupHandler}
        submitLoading={deleteBackupLoading}
      />
    </>
  );
};

export default BackupList;

