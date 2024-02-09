import { FC } from "react";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import {
  useGetApiMyPortalProfileGetQuery,
  usePutApiMyPortalProfileEditMutation,
} from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("نام الزامیست!"),
  lastName: yup.string().required("نام خانوادگی الزامیست!"),
  nationalId: yup.string().required("کد ملی الزامیست!"),
  birthDate: yup.string().required("تاریخ تولد الزامیست!"),
  address: yup.string().required("آدرس الزامیست!"),
});

type RealPersonalityPropsType = {};

export const RealPersonality: FC<RealPersonalityPropsType> = () => {
  const [editProfile, { isLoading: loadingEdit }] =
    usePutApiMyPortalProfileEditMutation();

  const { data: userInformation } = useGetApiMyPortalProfileGetQuery();

  const initialValues = {
    firstName: userInformation?.firstName || "",
    lastName: userInformation?.lastName || "",
    nationalId: userInformation?.nationalId || "",
    birthDate: userInformation?.birthDate || "",
    address: userInformation?.address || "",
  };

  const onSubmit: formikOnSubmitType<typeof initialValues> = (
    { firstName, lastName, nationalId, birthDate, address },
    { setSubmitting }
  ) => {
    editProfile({
      editProfileModel: {
        firstName,
        lastName,
        nationalId,
        birthDate,
        address,
      },
    })
      .unwrap()
      .then((res) => {
        if (!res) return;
        toast.success("مشخصات با موفقیت بروز رسانی شد");
      })
      .catch((err) => {});
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ errors, touched, getFieldProps }) => (
        <Form autoComplete="on">
          <Stack spacing={2.7} justifyContent="space-between" p={1}>
            <Stack direction="row" spacing={1}>
              <DorsaTextField
                error={Boolean(errors.firstName && touched.firstName)}
                helperText={errors.firstName}
                {...getFieldProps("firstName")}
                label="نام"
                fullWidth
              />
              <DorsaTextField
                error={Boolean(errors.lastName && touched.lastName)}
                helperText={errors.lastName}
                {...getFieldProps("lastName")}
                label="نام خانوادگی"
                fullWidth
              />
            </Stack>
            <DorsaTextField
              error={Boolean(errors.nationalId && touched.nationalId)}
              {...getFieldProps("nationalId")}
              label="کد ملی"
              fullWidth
              inputProps={{ dir: "ltr" }}
            />
            <DorsaTextField
              error={Boolean(errors.birthDate && touched.birthDate)}
              {...getFieldProps("birthDate")}
              label="تاریخ تولد"
              placeholder="13--/--/--"
              fullWidth
              inputProps={{ dir: "ltr" }}
            />
            <DorsaTextField
              error={Boolean(errors.address && touched.address)}
              {...getFieldProps("address")}
              label="آدرس"
              fullWidth
              multiline
              rows={3}
            />
            <Stack
              direction="row"
              justifyContent={{ xs: "center", md: "end" }}
              pt={1.5}
            >
              <LoadingButton
                component="button"
                type="submit"
                loading={loadingEdit}
                variant="contained"
                sx={{ px: 8, py: 2, fontSize: 16 }}
              >
                ذخیره اطلاعات
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
