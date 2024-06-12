import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import {
  VmProjectCreateModel,
  VmProjectListResponse,
  useGetApiMyDatacenterListQuery,
  usePostApiMyVmProjectCreateMutation,
  usePutApiMyVmProjectEditByIdMutation,
} from "src/app/services/api.generated";
import { AlphaNumericTextField } from "src/components/atoms/AlphaNumericTextField";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";

type CreateVmProjectDialogPropsType = DialogProps & {
  projectId?: VmProjectListResponse["id"];
  name?: VmProjectListResponse["name"];
  hypervisorTypeId?: VmProjectListResponse["hypervisorTypeId"];
};

export const CreateVmProjectDialog: FC<CreateVmProjectDialogPropsType> = ({
  projectId,
  name,
  hypervisorTypeId,
  ...props
}) => {
  const [createVmProject, { isLoading: createVmProjectLoading }] =
    usePostApiMyVmProjectCreateMutation();
  const [editVmProject, { isLoading: editVmProjectLoading }] =
    usePutApiMyVmProjectEditByIdMutation();
  const { data: datacenterList, isLoading: datacenterListLoading } =
    useGetApiMyDatacenterListQuery();

  const initialValues: VmProjectCreateModel = {
    name: name || "",
    hypervisorTypeId: 1,
    datacenterId: datacenterList && datacenterList[0].id,
    isPublic: true,
    vpcHostId: null,
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(5, "نباید کمتر از ۵ کارکتر باشد")
      .max(70, "نباید بیشتر از ۷۰ کارکتر باشد")
      .required("این بخش الزامی است"),
    hypervisorTypeId: yup.number().required("این بخش الزامی است"),
    datacenterId: projectId
      ? yup.number().nullable()
      : yup.number().required("این بخش الزامی است"),
  });

  const onSubmit: formikOnSubmitType<VmProjectCreateModel> = (
    values,
    { setSubmitting, resetForm }
  ) => {
    const { name } = values;
    const API = projectId
      ? editVmProject({
          id: projectId,
          vmProjectEditModel: { name },
        })
      : createVmProject({ vmProjectCreateModel: values });

    API.unwrap()
      .then(() => {
        toast.success(
          projectId
            ? "نام پروژه با موفقیت تغییر یافت"
            : "پروژه با موفقیت ایجاد شد"
        );
        closeDialogHandler({});
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
      components={{ Backdrop: BlurBackdrop }}
      sx={{ "& .MuiPaper-root": { borderRadius: BORDER_RADIUS_1 } }}
    >
      <DialogTitle textAlign="center">
        {projectId ? "بروزرسانی پروژه" : "افزودن پروژه جدید"}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" rowGap={2}>
            {/* {!projectId && (
              <DialogContentText textAlign="center">
                یک نام برای شناسایی پروژه خود وارد کنید.
              </DialogContentText>
            )} */}
            <Stack direction="column" rowGap={1}>
              <InputLabel>نام پروژه</InputLabel>
              <AlphaNumericTextField
                formik={formik}
                id="name"
                size="small"
                fullWidth
                error={Boolean(formik.errors.name && formik.touched.name)}
                helperText={formik.touched.name && formik.errors.name}
                placeholder="نام موردنظر را وارد کنید"
              />
            </Stack>
            {!projectId && (
              <Stack direction="column" rowGap={1}>
                <InputLabel>نام دیتاسنتر</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  value={formik.getFieldProps("datacenterId").value}
                  onChange={(event) =>
                    formik.setFieldValue("datacenterId", event.target.value)
                  }
                  size={"small"}
                  name={"datacenterId"}
                >
                  {datacenterList?.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            )}
            <Divider />
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              rowGap={1.5}
            >
              <LoadingButton
                sx={{ width: { xs: "100%", sm: 260 } }}
                variant="contained"
                type="submit"
                loading={createVmProjectLoading || editVmProjectLoading}
              >
                {projectId ? "بروزرسانی پروژه" : "ایجاد پروژه"}
              </LoadingButton>
              <Button
                sx={{ width: { xs: "100%", sm: 260 } }}
                variant="text"
                onClick={closeDialogHandler}
              >
                انصراف
              </Button>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
