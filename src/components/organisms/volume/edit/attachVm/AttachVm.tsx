import { LoadingButton } from "@mui/lab";
import { Divider, Paper, Stack, Typography, Box, Skeleton } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  useGetApiMyVmByProjectIdVolumeNodeGetQuery,
  usePostApiMyVmByProjectIdVolumeNodeAttachMutation,
  usePutApiMyVmByProjectIdVolumeNodeDetachAndIdMutation,
} from "src/app/services/api.generated";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { AttchVmDialog } from "./AttchVmDialog";

export const AttachVm: FC = () => {
  const [hostId, setHostId] = useState<number | null>(null);
  const { blockstorageId, projectId } = useParams();
  const navigate = useNavigate();

  const [isAttachDialogOpen, setIsAttachDialogOpen] = useState(false);
  const [isDettachDialogOpen, setIsDettachDialogOpen] = useState(false);

  const {
    data: blockstorageSpecification,
    isLoading: getStorageSpecificationLoading,
    refetch,
  } = useGetApiMyVmByProjectIdVolumeNodeGetQuery(
    {
      projectId: Number(projectId),
      vmVolumeHostId: Number(blockstorageId),
    },
    { skip: !projectId }
  );

  const [attachVm, { isLoading: attachVmLoading }] =
    usePostApiMyVmByProjectIdVolumeNodeAttachMutation();

  const [dettachVm, { isLoading: dettachVmLoading }] =
    usePutApiMyVmByProjectIdVolumeNodeDetachAndIdMutation();

  useEffect(() => {
    if (!blockstorageSpecification) return;
    // setHostId(blockstorageSpecification.vmHostId || null);
  }, [blockstorageSpecification]);
  
  console.log(blockstorageSpecification);
  
  const closeAttachDialogs = () => {
    setIsAttachDialogOpen(false);
  };

  const closeDettachDialogs = () => {
    setIsDettachDialogOpen(false);
  };

  const handleOpenDialog = () => {
    blockstorageSpecification?.vmHostId 
      ? setIsDettachDialogOpen(true)
      : setIsAttachDialogOpen(true);
  };

  const AttachVmHandler = () => {
    if (!blockstorageId) return;
    if (hostId === null) return toast.error("لطفا یک سرور ابری انتخاب کنید");
    attachVm({
      projectId: Number(projectId),
      attachVolumeModel: {
        vmHostId: hostId,
        vmVolumeHostId: Number(blockstorageId)
      },
    })
      .unwrap()
      .then((res) => {
        setIsAttachDialogOpen(false);
        refetch();
        toast.success("تغییرات با موفقیت اعمال شد");
      })
      .catch((err) => {});
  };

  const DettachVmHandler = () => {
    if (!blockstorageId) return;
    dettachVm({
      projectId: Number(projectId),
      id: Number(blockstorageSpecification?.id),
    })
      .unwrap()
      .then((res) => {
        setIsDettachDialogOpen(false);
        refetch();
        toast.success("تغییرات با موفقیت اعمال شد");
      })
      .catch((err) => {});
  };

  const gotoVm = (vmId: number | null | undefined) => () => {
    if (!vmId) return;
    navigate(`/vm/${projectId}/${vmId}/specification`);
  };

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Stack direction="column" rowGap={2}>
          <Typography> اتصال سرور ابری</Typography>
          <Divider flexItem sx={{ borderWidth: 1.5 }} />
          <Stack direction="column" rowGap={3}>
            <Stack
              mt={6}
              mb={3}
              px={3}
              direction="column"
              rowGap={{ xs: 3, md: 6.5 }}
            >
              {getStorageSpecificationLoading ? (
                <Skeleton variant="text" width="100%" height={40} />
              ) : (
                <>
                  {blockstorageSpecification && blockstorageSpecification?.isConnected ? (
                    <Typography>
                      ذخیره ساز به سرور ابری
                      <Box
                        sx={{
                          display: "inline-block",
                          color: "primary.main",
                          mx: 0.5,
                          fontSize: 16,
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={gotoVm(blockstorageSpecification?.vmHostId)}
                      >
                        {blockstorageSpecification?.vmHost}
                      </Box>
                      متصل است
                    </Typography>
                  ) : (
                    <Typography>
                      هیچ سرور ابری به این ذخیره ساز متصل نمی باشد
                    </Typography>
                  )}
                </>
              )}
            </Stack>
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              justifyContent={{ xs: "center", md: "space-between" }}
            >
              <LoadingButton variant="contained" onClick={handleOpenDialog}>
                {!blockstorageSpecification || blockstorageSpecification?.isConnected === false ? (
                  <>اتصال به سرور </>
                ) : (
                  <>قطع ارتباط با سرور </>
                )}
              </LoadingButton>
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      <AttchVmDialog
        open={isAttachDialogOpen}
        onClose={closeAttachDialogs}
        forceClose={closeAttachDialogs}
        loading={attachVmLoading}
        onSubmit={AttachVmHandler}
        setHostId={setHostId}
      />
      <DeleteDialog
        open={!!isDettachDialogOpen}
        onClose={closeDettachDialogs}
        keyTitle=" ارتباط با سرور ابری "
        subTitle="برای قطع ارتباط با سرور موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={blockstorageSpecification?.vmHost || ""}
        onSubmit={DettachVmHandler}
        submitLoading={dettachVmLoading}
      />
    </>
  );
};
