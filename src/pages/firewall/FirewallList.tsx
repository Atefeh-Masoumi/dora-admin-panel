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
  VmFirewallListResponse,
  useGetApiMyVmByProjectIdFirewallListQuery,
  useDeleteApiMyVmByProjectIdFirewallDeleteAndIdMutation,
} from "src/app/services/api.generated";
import { firewallTableStruct } from "src/components/organisms/firewall/firewalllist/struct";
import FirewallTableRow from "src/components/organisms/firewall/firewalllist/FirewallTableRow";
import { AddFirewallDialog } from "./AddFirewall";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const FirewallList: FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedFirewall, setSelectedFirewall] = useState<VmFirewallListResponse | null>(null);

  const {
    data: firewallList = [],
    isLoading: getFirewallListLoading,
    refetch,
    isFetching,
  } = useGetApiMyVmByProjectIdFirewallListQuery({
    projectId: Number(projectId),
  });

  const [deleteFirewall, { isLoading: deleteFirewallLoading }] =
    useDeleteApiMyVmByProjectIdFirewallDeleteAndIdMutation();

  useEffect(() => {
    const getNotifInterval = setInterval(() => {
      refetch();
    }, 120 * 1000);
    return () => {
      clearInterval(getNotifInterval);
    };
  }, [refetch]);

  const filteredList = useMemo(() => {
    if (firewallList.length === 0) return firewallList;
    return (
      firewallList.filter((item) =>
        item.name
          ?.trim()
          .toLowerCase()
          ?.includes(search.trim().toLowerCase())
      ) || []
    );
  }, [search, firewallList]);

  const createFirewallOnClick = () => {
    setDialogType(DIALOG_TYPE_ENUM.CREATE);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedFirewall(null);
  };

  const deleteFirewallHandler = () => {
    if (!selectedFirewall?.id) return;
    deleteFirewall({
      id: selectedFirewall.id,
      projectId: Number(projectId),
    })
      .unwrap()
      .then(() => {
        toast.success("فایروال مورد نظر با موفقیت حذف شد");
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
              لیست فایروال‌ها
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
              placeholder="جستجو در نام فایروال"
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
              ایجاد فایروال جدید
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={firewallTableStruct}
            RowComponent={FirewallTableRow}
            rows={filteredList}
            text="در حال حاضر فایروالی وجود ندارد"
            isLoading={getFirewallListLoading}
            initialOrder={0}
          />
        </Box>
      </Stack> 
      <AddFirewallDialog
        open={dialogType === DIALOG_TYPE_ENUM.CREATE}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
        refetch={refetch}
      />
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="فایروال"
        subTitle="برای حذف فایروال موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedFirewall?.name || ""}
        onSubmit={deleteFirewallHandler}
        submitLoading={deleteFirewallLoading}
      />
    </>
  );
};

export default FirewallList;

