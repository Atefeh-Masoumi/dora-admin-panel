import { Add } from "@mui/icons-material";
import {
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  IconButton,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetApiMyStorageByProjectIdHostAndStorageHostIdKeyListQuery,
  usePostApiMyStorageByProjectIdHostAndStorageHostIdKeyCreateMutation,
} from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { accessKeyTableStruct } from "./tables/AccessKeyStruct";
import AccessKeyTableRow from "./tables/AccessKeyTableRow";
import { RefreshButton } from "src/components/atoms/RefreshButton";
import { Copy } from "src/components/atoms/svg-icons/CopySvg";

type AccessKeyListPropsType = {};

const AccessKeyList: FC<AccessKeyListPropsType> = () => {
  const { id,projectId } = useParams();
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [accessKey, setAccessKey] = useState("");

  const {
    data,
    isLoading: getDataLoading,
    refetch,
    isFetching,
  } = useGetApiMyStorageByProjectIdHostAndStorageHostIdKeyListQuery({
    projectId: Number(projectId),
    storageHostId: id ? +id : 0,
  });

  const [callCreateAccessKey, { isLoading: createAccessKeyIsLoading }] =
  usePostApiMyStorageByProjectIdHostAndStorageHostIdKeyCreateMutation();

  const [showDialog, setShowDialog] = useState(false);

  const closeDialog = () => setShowDialog(false);

  const handleCloseModal = () => {
    setShowSecretKey(false);
    setSecretKey("");
    setAccessKey("");
  };

  const handleCopyAccessKey = () => {
    navigator.clipboard.writeText(accessKey);
    toast.success("Access Key کپی شد", { position: "bottom-left" });
  };

  const handleCopySecretKey = () => {
    navigator.clipboard.writeText(secretKey);
    toast.success("Secret Key کپی شد", { position: "bottom-left" });
  };

  const isLoading = useMemo(
    () => getDataLoading || isFetching,
    [getDataLoading, isFetching]
  );

  const createAccessKey = () => {
    callCreateAccessKey({
        projectId: Number(projectId),
         storageHostId: id ? +id : 0 ,
    })
      .unwrap()
      .then((res) => {
        setSecretKey(res.secretKey || "");
        setAccessKey(res.accessKey || "");
        setShowSecretKey(true);
        refetch();
        toast.success("عملیات با موفقیت انجام شد");
      })
      .catch(() => {});
  };

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
            <Typography
              color="grey.700"
              fontSize={24}
              fontWeight={700}
            >
              لیست کلید های دسترسی
            </Typography>
            <RefreshButton isFetching={isFetching} refetchData={refetch} />
          </Stack>
          <Button
            onClick={() => createAccessKey()}
            variant="outlined"
            disabled={createAccessKeyIsLoading}
            startIcon={<Add />}
          >
            ایجاد کلید دسترسی جدید
          </Button>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack>
          <BaseTable
            struct={accessKeyTableStruct}
            RowComponent={AccessKeyTableRow}
            rows={data || []}
            text="در حال حاضر کلید دسترسی وجود ندارد"
            isLoading={isLoading}
            initialOrder={9}
          />
        </Stack>
      </Paper>

      <Dialog open={showSecretKey} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>کلید دسترسی جدید</DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 2, mb: 3 }}>
            لطفا این کلیدها را در جای امنی ذخیره کنید. این کلیدها فقط یکبار نمایش داده می‌شوند.
          </Typography>
          
          {/* Access Key */}
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Typography  color="grey.700">
                Access Key:
              </Typography>
              <IconButton
                onClick={handleCopyAccessKey}
                size="small"
                sx={{ p: 0.5 }}
              >
                <Copy
                  sx={{
                    "& path": {
                      stroke: ({ palette }) => palette.secondary.main,
                    },
                  }}
                />
              </IconButton>
            </Stack>
            <Box
              sx={{
                p: 2,
                bgcolor: 'grey.100',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'grey.300',
                fontFamily: 'monospace',
                fontSize: '14px',
                wordBreak: 'break-all',
                direction: 'ltr',
                textAlign: 'left',
              }}
            >
              {accessKey}
            </Box>
          </Box>

          {/* Secret Key */}
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Typography  color="grey.700">
                Secret Key:
              </Typography>
              <IconButton
                onClick={handleCopySecretKey}
                size="small"
                sx={{ p: 0.5 }}
              >
                <Copy
                  sx={{
                    "& path": {
                      stroke: ({ palette }) => palette.secondary.main,
                    },
                  }}
                />
              </IconButton>
            </Stack>
            <Box
              sx={{
                p: 2,
                bgcolor: 'grey.100',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'grey.300',
                fontFamily: 'monospace',
                fontSize: '14px',
                wordBreak: 'break-all',
                direction: 'ltr',
                textAlign: 'left',
              }}
            >
              {secretKey}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>بستن</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AccessKeyList;
