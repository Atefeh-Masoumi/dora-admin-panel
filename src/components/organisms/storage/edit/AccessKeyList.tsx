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

type AccessKeyListPropsType = {};

const AccessKeyList: FC<AccessKeyListPropsType> = () => {
  const { id,projectId } = useParams();
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [secretKey, setSecretKey] = useState("");

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

      <Dialog open={showSecretKey} onClose={handleCloseModal}>
        <DialogTitle>کلید دسترسی جدید</DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 2 }}>
            لطفا این کلید را در جای امنی ذخیره کنید. این کلید فقط یکبار نمایش داده می‌شود.
          </Typography>
          <Typography sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            {secretKey}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>بستن</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AccessKeyList;
