import {
    Button,
    Dialog,
    Select,
    MenuItem,
    InputLabel,
    DialogTitle,
    DialogProps,
    FormControl,
    DialogActions,
    DialogContent,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Skeleton,
    Typography,
  } from "@mui/material";
  import { useFormik } from "formik";
  import { Stack } from "@mui/system";
  import { FC, MouseEventHandler } from "react";
  import { useParams } from "react-router-dom";
  import * as yup from "yup";
  import { formikOnSubmitType } from "src/types/form.type";
  import { 
    useGetApiMyVmByProjectIdHostShortListQuery,
    useGetApiMyVmByProjectIdNetworkShortListQuery,
    usePostApiMyVmByProjectIdNetworkNodeAttachMutation
  } from "src/app/services/api.generated";
  import { toast } from "react-toastify";
  import { DorsaTextField } from "src/components/atoms/DorsaTextField";
  import LoadingButton from "src/components/atoms/LoadingButton";
  import { useEffect } from "react";
  
  type CreateFirewallFormPropsType = DialogProps & {
    forceClose: () => void;
    refetch:()=>void
  };

  const validationSchema = yup.object().shape({
    vmHostId: yup.number().required("این بخش الزامی می‌باشد"),
    isV4: yup.boolean().required("این بخش الزامی می‌باشد"),
    ipAddress: yup.string().nullable(),
  });

  const initialValues = {
    vmHostId: 0,
    vmNetworkId: 0,
    isV4: true,
    ipAddress: "",
  };

  export const AttachNodeDialog: FC<CreateFirewallFormPropsType> = ({
    forceClose,
    refetch,
    ...props
  }) => {
    const { id, projectId } = useParams();

    const { data: vmlist, isLoading } = useGetApiMyVmByProjectIdHostShortListQuery({
      projectId: Number(projectId),
    });

    const { data: networkList, isLoading: networkLoading } = useGetApiMyVmByProjectIdNetworkShortListQuery({
      projectId: Number(projectId),
    });

    const [attachNode, { isLoading: attachLoading }] = 
      usePostApiMyVmByProjectIdNetworkNodeAttachMutation();

    const formik = useFormik({
      initialValues: { ...initialValues},
      validationSchema,
      onSubmit: (values) => {
        attachNode({
          projectId: Number(projectId),
          attachNetworkModel: {
            ...values,
            ...(id && { vmHostId: Number(id) }),
          },
        })
          .unwrap()
          .then(() => {
            toast.success("نود با موفقیت متصل شد");
            forceClose();
            refetch();
          })
          .catch((err) => {
            console.error({ err });
          });
      },
    });

    const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      if (!props.onClose) return;
      props.onClose(event, "backdropClick");
    };

    return (
      <Dialog {...props}>
        <DialogTitle fontWeight={"700"}>اتصال به سرور</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent
            sx={{
              py: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              rowGap: 4,
            }}
          >
            
            {id && (
              <Stack width={"100%"} justifyContent={"start"}>
                <Typography>لیست شبکه ابری *</Typography>
                {networkLoading ? (
                  <Skeleton width="100%" height={37} sx={{ transform: "none" }} />
                ) : (
                  <Select
                    {...formik.getFieldProps("vmNetworkId")}
                    error={Boolean(formik.errors.vmNetworkId && formik.touched.vmNetworkId)}
                    fullWidth
                  >
                    {networkList?.map(({ name, id }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                {formik.errors.vmNetworkId && formik.touched.vmNetworkId && (
                  <Typography color="error">{formik.errors.vmNetworkId}</Typography>
                )}
              </Stack>
            )}

            <FormControl fullWidth>
              <InputLabel id="ipVersion-label">IP Version</InputLabel>
              <Select
                dir="rtl"
                {...formik.getFieldProps("isV4")}
                value={formik.values.isV4 ? 0 : 1}
                onChange={(e) => formik.setFieldValue("isV4", e.target.value === 0)}
                labelId="ipVersion-label"
                id="ipVersion"
                label="IP Version"
                fullWidth
                error={Boolean(formik.errors.isV4 && formik.touched.isV4)}
              >
                {["IPv4", "IPv6"].map((label, index) => (
                  <MenuItem key={index} value={index}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              {formik.errors.isV4 && formik.touched.isV4 && (
                <Typography color="error">{formik.errors.isV4}</Typography>
              )}
            </FormControl>

            <DorsaTextField
              focused
              fullWidth
              sx={{ pb: 1 }}
              {...formik.getFieldProps("ipAddress")}
              error={Boolean(formik.errors.ipAddress && formik.touched.ipAddress)}
              helperText={formik.touched.ipAddress && formik.errors.ipAddress}
              label="آدرس IP"
              placeholder="192.168.1.1"
              inputProps={{ dir: "ltr" }}
            />
          </DialogContent>
          <DialogActions>
            <Stack direction="row" justifyContent="end" spacing={1}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ px: 3, py: 0.8 }}
                onClick={cancelBtnOnClick}
              >
                انصراف
              </Button>
              <LoadingButton
                type="submit"
                loading={attachLoading}
                variant="contained"
                sx={{ px: 3, py: 0.8 }}
              >
                اتصال
              </LoadingButton>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
    );
  };