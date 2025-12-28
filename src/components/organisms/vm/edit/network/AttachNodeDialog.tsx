import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import { useFormik } from "formik";
import { FC, MouseEventHandler } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";

import {
  useGetApiMyVmByProjectIdNetworkShortListQuery,
  usePostApiMyVmByProjectIdNetworkNodeAttachMutation,
} from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import LoadingButton from "src/components/atoms/LoadingButton";

import {
  dialogSx,
  dialogTitleSx,
  dialogContentSx,
  dialogFormStackSx,
  dialogActionsSx,
  dialogButtonSx,
} from "src/configs/dialogStyles";

type AttachNodeDialogPropsType = DialogProps & {
  forceClose: () => void;
  refetch: () => void;
};

const validationSchema = yup.object({
  vmNetworkId: yup.number().required("این بخش الزامی است"),
  isV4: yup.boolean().required(),
  ipAddress: yup.string().nullable(),
});

export const AttachNodeDialog: FC<AttachNodeDialogPropsType> = ({
  forceClose,
  refetch,
  ...props
}) => {
  const { id, projectId } = useParams();

  const { data: networkList, isLoading } =
    useGetApiMyVmByProjectIdNetworkShortListQuery({
      projectId: Number(projectId),
    });

  const [attachNode, { isLoading: attachLoading }] =
    usePostApiMyVmByProjectIdNetworkNodeAttachMutation();

  const formik = useFormik({
    initialValues: {
      vmNetworkId: 0,
      isV4: true,
      ipAddress: "",
    },
    validationSchema,
    onSubmit: (values) => {
      attachNode({
        projectId: Number(projectId),
        attachNetworkModel: {
          ...values,
          vmHostId: Number(id),
        },
      })
        .unwrap()
        .then(() => {
          toast.success("نود با موفقیت متصل شد");
          forceClose();
          refetch();
        })
        .catch(() => {});
    },
  });

  const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    props.onClose?.(event, "backdropClick");
  };

  return (
    <Dialog {...props} sx={dialogSx}>
      <DialogTitle sx={dialogTitleSx}>اتصال به سرور</DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={dialogContentSx}>
          <Stack sx={dialogFormStackSx}>
            <Stack>
              <InputLabel>شبکه ابری *</InputLabel>
              {isLoading ? (
                <Skeleton height={40} />
              ) : (
                <Select
                  size="small"
                  fullWidth
                  {...formik.getFieldProps("vmNetworkId")}
                  error={Boolean(
                    formik.touched.vmNetworkId && formik.errors.vmNetworkId
                  )}
                >
                  {networkList?.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              {formik.touched.vmNetworkId && formik.errors.vmNetworkId && (
                <Typography color="error" fontSize={12}>
                  {formik.errors.vmNetworkId}
                </Typography>
              )}
            </Stack>

            <Stack>
              <InputLabel>نسخه IP</InputLabel>
              <Select
                size="small"
                fullWidth
                value={formik.values.isV4 ? 0 : 1}
                onChange={(e) =>
                  formik.setFieldValue("isV4", e.target.value === 0)
                }
              >
                <MenuItem value={0}>IPv4</MenuItem>
                <MenuItem value={1}>IPv6</MenuItem>
              </Select>
            </Stack>

            <DorsaTextField
              fullWidth
              label="آدرس IP"
              placeholder="192.168.1.1"
              inputProps={{ dir: "ltr" }}
              {...formik.getFieldProps("ipAddress")}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={dialogActionsSx}>
          <Stack direction="row" justifyContent="end" spacing={1} width="100%">
            <Button
              variant="outlined"
              color="secondary"
              sx={dialogButtonSx}
              onClick={cancelBtnOnClick}
            >
              انصراف
            </Button>

            <LoadingButton
              type="submit"
              loading={attachLoading}
              variant="contained"
              sx={dialogButtonSx}
            >
              اتصال
            </LoadingButton>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};
