import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  InputLabel,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import { toast } from "react-toastify";
import {
  VmProjectCreateModel,
  VmProjectListResponse,
  useGetApiMyDatacenterListQuery,
  usePostApiMyHostProjectCreateMutation,
  usePutApiMyHostProjectEditByIdMutation,
} from "src/app/services/api.generated";
import { AlphaNumericTextField } from "src/components/atoms/AlphaNumericTextField";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";
import DomainIcon from "@mui/icons-material/Domain";
import LoadingButton from "src/components/atoms/LoadingButton";

type CreateVmProjectDialogPropsType = DialogProps & {
  projectId?: VmProjectListResponse["id"];
  name?: VmProjectListResponse["name"];
};

export const CreateVmProjectDialog: FC<CreateVmProjectDialogPropsType> = ({
  projectId,
  name,
  ...props
}) => {
  const [createVmProject, { isLoading: createVmProjectLoading }] =
    usePostApiMyHostProjectCreateMutation();
  const [editVmProject, { isLoading: editVmProjectLoading }] =
    usePutApiMyHostProjectEditByIdMutation();
  const { data: datacenterList } =
    useGetApiMyDatacenterListQuery();

  const initialValues: VmProjectCreateModel = {
    name: name || "",
    hypervisorTypeId: 0,
    datacenterId: (datacenterList && datacenterList[0].id) || 0,
    // isPublic: true,
    // vpcHostId: null,
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(5, "نباید کمتر از ۵ کارکتر باشد")
      .max(70, "نباید بیشتر از ۷۰ کارکتر باشد")
      .required("این بخش الزامی است"),
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
      : createVmProject({
          vmProjectCreateModel: {
            ...values,
            datacenterId: Number(values.datacenterId),
          },
        });

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

  // const getImageByName = (name: string) => {
  //   switch (name) {
  //     case "asiatech":
  //       return asiatechImage;
  //     case "mobinnet":
  //       return mobinNetImage;
  //     default:
  //       return "";
  //   }
  // };

  return (
    <Dialog
      {...props}
      onClose={closeDialogHandler}
      fullWidth
      // components={{ Backdrop: BlurBackdrop }}
      // sx={{
      // "& .MuiPaper-root": { borderRadius: BORDER_RADIUS_1 },
      // }}
    >
      <DialogTitle textAlign="left">
        {projectId ? "بروزرسانی پروژه" : "افزودن پروژه"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" rowGap={2}>
            <Stack direction="column" rowGap={1}>
              <InputLabel>نام پروژه</InputLabel>
              <AlphaNumericTextField
                formik={formik}
                id="name"
                fullWidth
                error={Boolean(formik.errors.name && formik.touched.name)}
                helperText={formik.touched.name && formik.errors.name}
                placeholder="نام موردنظر را وارد کنید"
              />
            </Stack>
            {!projectId && (
              <Stack direction="column" rowGap={1}>
                <InputLabel>نام مرکز داده</InputLabel>
                <RadioGroup
                  name="datacenterId"
                  value={formik.getFieldProps("datacenterId").value}
                  onChange={(event) =>
                    formik.setFieldValue("datacenterId", event.target.value)
                  }
                >
                  <Grid container columnSpacing={1}>
                    {datacenterList?.map(({ id, name, photoName }) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        key={id}
                        sx={{ textAlign: "center" }}
                        mt={1}
                      >
                        <FormControlLabel
                          sx={{
                            border: "1px solid #ccc",
                            padding: "5px 0",
                            borderRadius: BORDER_RADIUS_1,
                            width: "100%",
                            margin: { xs: " 5px 0", sm: "0 !important" },
                          }}
                          value={id}
                          control={<Radio size="medium" />}
                          label={
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <DomainIcon />
                              <Box>{name}</Box>
                            </Stack>
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </RadioGroup>
              </Stack>
            )}
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
                loading={createVmProjectLoading || editVmProjectLoading}
                variant="contained"
                sx={{ px: 3, py: 0.8 }}
              >
                ذخیره
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
