import {
    Button,
    Dialog,
    DialogContent,
    DialogProps,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    Skeleton,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import { useFormik } from "formik";
  import { FC } from "react";
  import { toast } from "react-toastify";
  import {
    CreatePamModel,
    usePostApiMySecurityByProjectIdPamHostCreateMutation,
    useGetApiMyVmByProjectIdImageListQuery,
    VmImageListResponse,
  } from "src/app/services/api.generated";
  import { formikOnSubmitType } from "src/types/form.type";
  import * as yup from "yup";
  import LoadingButton from "src/components/atoms/LoadingButton";
  import { useParams } from "react-router-dom";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
  
  type AddPamDialogPropsType = DialogProps & {
    forceClose: () => void;
    refetch: () => void;
  };
  
  export const AddPamDialog: FC<AddPamDialogPropsType> = ({
    forceClose,
    refetch,
    ...props
  }) => {
    const { projectId } = useParams();
    const [createPam, { isLoading: createPamLoading }] =
      usePostApiMySecurityByProjectIdPamHostCreateMutation();
  const { data: imageList = [], isLoading: imageLoading } =
    useGetApiMyVmByProjectIdImageListQuery(
      {
        projectId: Number(projectId),
        productId: PRODUCT_CATEGORY_ENUM.PAM,
      },
      {
        skip: !projectId,
      }
    );

    const initialValues: CreatePamModel = {
      name: "",
      vmImageId:0,
    };
  
    const validationSchema = yup.object().shape({
      name: yup
        .string()
        .min(5, "نام Pam نباید کمتر از ۵ کارکتر باشد")
        .required("این بخش الزامی می‌باشد"),
    });
  
    const onSubmit: formikOnSubmitType<CreatePamModel> = (
      values,
      { setSubmitting }
    ) => {
      createPam({
        projectId: Number(projectId),
        createPamModel: values,
      })
        .unwrap()
        .then(() => {
          toast.success("PAM جدید با موفقیت ایجاد شد");
          forceClose();
          refetch();
          formik.resetForm();
        })
        .catch(() => { })
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
      <Dialog {...props} onClose={closeDialogHandler} fullWidth>
        <DialogTitle textAlign="left">ایجاد PAM جدید</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Stack direction="column" rowGap={2}>
              <Stack direction="column" rowGap={1}>
                <InputLabel>نام PAM</InputLabel>
                <TextField
                  {...formik.getFieldProps("name")}
                  fullWidth
                  error={Boolean(formik.errors.name && formik.touched.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  placeholder="نام موردنظر را وارد کنید"
                  size="small"
                  inputProps={{
                    dir: "ltr",
                  }}
                />
              </Stack>
              <Stack width={"100%"} justifyContent={"start"}>
                <Typography>لیست image </Typography>
                {imageLoading ? (
                  <Skeleton
                    width="100%"
                    height={37}
                    sx={{ transform: "none" }}
                  />
                ) : (
                  <Select
                    {...formik.getFieldProps("vmImageId")}
                    error={Boolean(
                      formik.errors.vmImageId && formik.touched.vmImageId
                    )}
                    fullWidth
                  >
                    {imageList?.map(({ name, id }: VmImageListResponse) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                {formik.errors.vmImageId && formik.touched.vmImageId && (
                  <Typography color="error">
                    {formik.errors.vmImageId}
                  </Typography>
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
                  loading={createPamLoading}
                  variant="contained"
                  sx={{ px: 3, py: 0.8 }}
                >
                  ایجاد
                </LoadingButton>
              </Stack>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  
  