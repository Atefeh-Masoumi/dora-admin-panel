import { FC } from "react";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import {
  GetProfileResponse,
  usePutApiV2PortalProfileEditMutation,
} from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";

const formValidation = yup.object().shape({
  firstName: yup.string().required("نام الزامیست!"),
  lastName: yup.string().required("نام خانوادگی الزامیست!"),
  nationalId: yup.string().required("national id"),
  birthDate: yup.string().required("birth date"),
  address: yup.string().required("address"),
});

type RealPersonalityPropsType = { data: GetProfileResponse };

export const RealPersonality: FC<RealPersonalityPropsType> = ({
  data: userInformation,
}) => {
  const [editProfile, { isLoading: loadingEdit }] =
    usePutApiV2PortalProfileEditMutation();

  const submitHandler: formikOnSubmitType<GetProfileResponse> = (
    { firstName, lastName, nationalId, birthDate, address },
    { setSubmitting }
  ) => {
    if (!firstName || !lastName || !nationalId || !birthDate || !address) {
      return;
    }
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
      .then(() => toast.success("مشخصات با موفقیت آپدیت شد"))
      .catch(({ status, data }) => {
        if (status === 401 || status === 404)
          toast.error("اطلاعات را درست وارد کنید");
        else toast.error(data[""][0]);
      });
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={userInformation as any}
      validationSchema={formValidation}
      onSubmit={submitHandler}
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
              dir="ltr"
            />
            <DorsaTextField
              error={Boolean(errors.birthDate && touched.birthDate)}
              {...getFieldProps("birthDate")}
              label="تاریخ تولد"
              fullWidth
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
                sx={{ px: 7, py: 2, fontSize: 16 }}
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
