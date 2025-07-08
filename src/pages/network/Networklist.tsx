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
  VmNetworkListResponse,
  useGetApiMyVmByProjectIdNetworkListQuery,
  useDeleteApiMyVmByProjectIdNetworkDeleteAndIdMutation,
} from "src/app/services/api.generated";
import { networkTableStruct } from "src/components/organisms/network/networklist/struct";
import NetworkTableRow from "src/components/organisms/network/networklist/NetworkTableRow";
import { AddNetworkDialog } from "./AddNetwork";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const NetworkList: FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<VmNetworkListResponse | null>(null);

  const {
    data: networkList = [],
    isLoading: getNetworkListLoading,
    refetch,
    isFetching,
  } = useGetApiMyVmByProjectIdNetworkListQuery({
    projectId: Number(projectId),
  });

  const [deleteNetwork, { isLoading: deleteNetworkLoading }] =
    useDeleteApiMyVmByProjectIdNetworkDeleteAndIdMutation();

  useEffect(() => {
    const getNotifInterval = setInterval(() => {
      refetch();
    }, 120 * 1000);
    return () => {
      clearInterval(getNotifInterval);
    };
  }, [refetch]);

  const filteredList = useMemo(() => {
    if (networkList.length === 0) return networkList;
    return (
      networkList.filter((item) =>
        item.name
          ?.trim()
          .toLowerCase()
          ?.includes(search.trim().toLowerCase())
      ) || []
    );
  }, [search, networkList]);

  const createNetworkOnClick = () => {
    setDialogType(DIALOG_TYPE_ENUM.CREATE);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedNetwork(null);
  };

  const deleteNetworkHandler = () => {
    if (!selectedNetwork?.id) return;
    deleteNetwork({
      id: selectedNetwork.id,
      projectId: Number(projectId),
    })
      .unwrap()
      .then(() => {
        toast.success("شبکه مورد نظر با موفقیت حذف شد");
        closeDialogHandler();
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
              لیست شبکه‌ها
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
              placeholder="جستجو در نام شبکه"
            />
            <Button
              onClick={createNetworkOnClick}
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
              ایجاد شبکه جدید
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={networkTableStruct}
            RowComponent={NetworkTableRow}
            rows={filteredList}
            text="در حال حاضر شبکه‌ای وجود ندارد"
            isLoading={getNetworkListLoading}
            initialOrder={0}
          />
        </Box>
      </Stack> 
      <AddNetworkDialog
        open={dialogType === DIALOG_TYPE_ENUM.CREATE}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
        refetch={refetch}
      />
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="شبکه"
        subTitle="برای حذف شبکه موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedNetwork?.name || ""}
        onSubmit={deleteNetworkHandler}
        submitLoading={deleteNetworkLoading}
      />
    </>
  );
};

export default NetworkList;
