import React, { FC, useMemo, useState } from "react";
import {
  VmKeyListResponse,
  useGetApiMyVmByProjectIdKeyListQuery,
  useDeleteApiMyVmByProjectIdKeyDeleteAndIdMutation,
} from "src/app/services/api.generated";
import { Button, Divider, Paper, Stack, Typography, Box } from "@mui/material";
import { RefreshButton } from "src/components/atoms/RefreshButton";
import { SearchBox } from "src/components/molecules/SearchBox";
import { useNavigate, useParams } from "react-router";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { toast } from "react-toastify";
import CreateKey from "./CreateKey";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { keyTableStruct } from "./struct";
import KeyListTableRow from "./KeyListTableRow";
import { Add } from "@mui/icons-material";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const KeyList: FC = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [selectedKey, setSelectedKey] = useState<VmKeyListResponse | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { projectId } = useParams();

  const {
    data: keyList = [],
    isLoading: getKeyListLoading,
    refetch,
    isFetching,
  } = useGetApiMyVmByProjectIdKeyListQuery({
    projectId: Number(projectId),
  });

  const [deleteKey, { isLoading: deleteKeyLoading }] =
    useDeleteApiMyVmByProjectIdKeyDeleteAndIdMutation();

  const filteredResult = useMemo(() => {
    if (keyList.length === 0) return keyList;
    return (
      keyList.filter((item) =>
        item.name
          ?.trim()
          .toLowerCase()
          ?.includes(searchInput.trim().toLowerCase())
      ) || []
    );
  }, [searchInput, keyList]);

  const goToCreateKey = () => {
    setShowCreateDialog(true);
  };

  const openDialogHandler = (selectedKey: VmKeyListResponse) => {
    setSelectedKey(selectedKey);
  };

  const closeDialogHandler = () => {
    setSelectedKey(null);
  };

  const deleteKeyHandler = () => {
    if (!selectedKey || !selectedKey.id) return;
    deleteKey({
      id: selectedKey.id,
      projectId: Number(projectId),
    })
      .unwrap()
      .then(() => {
        toast.success("کلید مورد نظر با موفقیت حذف شد");
        closeDialogHandler();
        refetch();
      })
      .catch((err) => {});
  };

  const closeCreateDialog = () => {
    setShowCreateDialog(false);
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
              لیست کلیدها
            </Typography>
            <RefreshButton isFetching={isFetching} refetchData={refetch} />
          </Stack>
          <Stack 
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
          >
            <SearchBox
              onChange={(text) => setSearchInput(text)}
              placeholder="جستجو در نام کلید"
            />
            <Button
              onClick={goToCreateKey}
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
                    sx={{ "& path": { stroke: "#00a651" } }}
                  />
                </Stack>
              }
            >
              ایجاد کلید جدید
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={keyTableStruct}
            RowComponent={KeyListTableRow}
            rows={filteredResult}
            text="در حال حاضر کلیدی وجود ندارد"
            isLoading={getKeyListLoading}
            initialOrder={0}
          />
        </Box>
      </Stack>
      <DeleteDialog
        open={!!selectedKey}
        onClose={closeDialogHandler}
        keyTitle="کلید"
        subTitle="برای حذف کلید موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedKey?.name || ""}
        onSubmit={deleteKeyHandler}
        submitLoading={deleteKeyLoading}
      />
      {showCreateDialog && <CreateKey onClose={closeCreateDialog} refetch={refetch} />}
    </>
  );
};

export default KeyList;
