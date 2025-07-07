import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  InputLabel,
  Stack,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import { toast } from "react-toastify";
import {
  usePostApiMyVmByProjectIdNetworkNodeAttachMutation,
  useGetApiMyVmByProjectIdHostShortListQuery,
} from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";
import LoadingButton from "src/components/atoms/LoadingButton";
import { useParams } from "react-router-dom";

type AttachNodeDialogPropsType = DialogProps & {
  forceClose: () => void;
  refetch: () => void;
};

export const AttachNodeDialog: FC<AttachNodeDialogPropsType> = ({
  forceClose,
  refetch,
  ...props
}) => {
  const { projectId, networkId } = useParams();
  const [attachNode, { isLoading: attachNodeLoading }] =
    usePostApiMyVmByProjectIdNetworkNodeAttachMutation();

  const { data: vmList = [] } = useGetApiMyVmByProjectIdHostShortListQuery({
    projectId: Number(projectId),
  });

  const initialValues = {
    vmHostId: "",
    ipAddress: "",
  };

  const validationSchema = yup.object().shape({
    vmHostId: yup.number().required("انتخاب سرور الزامی است"),
    ipAddress: yup
      .string()
      .matches(
        /^(\d{1,3}\.){3}\d{1,3}$/,
        "فرمت آدرس IP صحیح نمی‌باشد"
      )
      .required("آدرس IP الزامی است"),
  });

  const onSubmit: formikOnSubmitType<typeof initialValues> = (
    values,
    { setSubmitting }
  ) => {
    attachNode({
        attachNetworkModel: {
            vmHostId: Number(values.vmHostId),
            ipAddress: values.ipAddress,
            vmNetworkId: Number(networkId),
        },
        projectId: Number(projectId),
    })
      .unwrap()
      .then(() => {
        toast.success("نود با موفقیت به شبکه متصل شد");
        forceClose();
        refetch();
        formik.resetForm();
      })
      .catch(() => {})
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const closeDialogHandler = (event: {}) => {
    if (!props.onClose) return;
    props.onClose(event, "escapeKeyDown");
    formik.resetForm();
  };

  return (
    <Dialog
      {...props}
      onClose={closeDialogHandler}
      fullWidth
    >
      <DialogTitle textAlign="left">
        اتصال نود به شبکه
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" rowGap={2}>
            <Stack direction="column" rowGap={1}>
              <InputLabel>انتخاب سرور</InputLabel>
              <FormControl fullWidth size="small">
                <Select
                  {...formik.getFieldProps("vmHostId")}
                  error={Boolean(formik.errors.vmHostId && formik.touched.vmHostId)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    سرور مورد نظر را انتخاب کنید
                  </MenuItem>
                  {vmList.map((vm) => (
                    <MenuItem key={vm.id} value={vm.id}>
                      {vm.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack direction="column" rowGap={1}>
              <InputLabel>آدرس IP</InputLabel>
              <input
                {...formik.getFieldProps("ipAddress")}
                type="text"
                placeholder="مثال: 192.168.1.100"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: formik.errors.ipAddress && formik.touched.ipAddress 
                    ? "1px solid #d32f2f" 
                    : "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
              {formik.touched.ipAddress && formik.errors.ipAddress && (
                <div style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
                  {formik.errors.ipAddress}
                </div>
              )}
            </Stack>
            <Stack direction="row" justifyContent="end" spacing={1}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ px: 3, py: 0.8 }}
                onClick={closeDialogHandler}
              >
                انصراف
              </Button>
              <LoadingButton
                type="submit"
                loading={attachNodeLoading}
                variant="contained"
                sx={{ px: 3, py: 0.8 }}
              >
                اتصال
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
