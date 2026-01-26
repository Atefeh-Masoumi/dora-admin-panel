import { LoadingButton } from "@mui/lab";
import { Divider, Paper, Stack, Typography, Box, Skeleton } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  useGetApiMyVmByProjectIdVolumeNodeListQuery,
  usePostApiMyVmByProjectIdVolumeNodeAttachMutation,
} from "src/app/services/api.generated";
import { AttchVmDialog } from "./AttchVmDialog";
import { RefreshButton } from "src/components/atoms/RefreshButton";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { attchVmTableStruct } from "./struct";
import AttachVmTableRow from "./AttachVmTableRow";

export const AttachVm: FC = () => {
  const { blockstorageId, projectId } = useParams();
  const navigate = useNavigate();

  const [isAttachDialogOpen, setIsAttachDialogOpen] = useState(false);
    const [hostId, setHostId] = useState<number | null>(null);

  const {
    data=[],
    isLoading: getStorageSpecificationLoading,
    refetch,
  } = useGetApiMyVmByProjectIdVolumeNodeListQuery(
    {
      projectId: Number(projectId),
      vmVolumeHostId: Number(blockstorageId),
    },
    { skip: !projectId }
  );

  const [attachVm, { isLoading: attachVmLoading }] =
    usePostApiMyVmByProjectIdVolumeNodeAttachMutation();

 const isConnected = data.length > 0 && data[0]?.isConnected;

  const handleOpenDialog = () => {
    if (isConnected) {
      toast.info("این ذخیره‌ساز در حال حاضر متصل است");
      return;
    }
    setIsAttachDialogOpen(true);
  };

  const handleAttach = () => {
    if (!hostId) {
      toast.error("لطفا یک سرور ابری انتخاب کنید");
      return;
    }
    attachVm({
      projectId: Number(projectId),
      attachVolumeModel: {
        vmHostId: hostId,
        vmVolumeHostId: Number(blockstorageId)
      },
    })
      .unwrap()
      .then(() => {
        toast.success("تغییرات با موفقیت اعمال شد");
        setIsAttachDialogOpen(false);
        refetch();
      })
      
  }

  

  return (
    <>
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
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
          >
            <Typography color="grey.700" fontSize={24} fontWeight={700}>
              اتصال سرور ابری
            </Typography>
            <RefreshButton
              isFetching={getStorageSpecificationLoading}
              refetchData={refetch}
            />
          </Stack>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent={{ xs: "center", md: "space-between" }}
          >
            <LoadingButton variant="outlined" onClick={handleOpenDialog}>
              اتصال سرور ابری
            </LoadingButton>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack>
          <BaseTable
            struct={attchVmTableStruct}
            RowComponent={AttachVmTableRow}
            rows={data}
            text="در حال حاضر متصل نیست"
            isLoading={getStorageSpecificationLoading}
            initialOrder={7}
          />
        </Stack>
      </Paper>

      <AttchVmDialog
        open={isAttachDialogOpen}
        onClose={() => setIsAttachDialogOpen(false)}
        loading={attachVmLoading}
        onSubmit={handleAttach}
        setHostId={setHostId}
      />
    </>
  );
};
