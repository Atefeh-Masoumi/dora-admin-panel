import AdapterJalali from "@date-io/date-fns-jalali";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { Form, Formik } from "formik";
import moment, { Moment } from "jalali-moment";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetApiMyAccountProfileGetQuery,
  usePutApiMyAccountProfileEditMutation,
} from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { formikOnSubmitType } from "src/types/form.type";
import { ConvertToJalali } from "src/utils/convertToJalali";
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
  const [birthDate, setBirthDate] = useState<any>(null);
  const [editProfile, { isLoading: loadingEdit }] =
    usePutApiMyAccountProfileEditMutation();

  const { data: userInformation } = useGetApiMyAccountProfileGetQuery();

  const initialValues = {
    firstName: userInformation?.firstName || "",
    lastName: userInformation?.lastName || "",
    nationalId: userInformation?.nationalId || "",
    birthDate: userInformation?.birthDate || "",
    address: userInformation?.address || "",
  };

  useEffect(() => {
    if (userInformation?.birthDate) {
      const jalaliDate = moment(
        userInformation?.birthDate,
        "YYYY-MM-DDTHH:mm:ss"
      );
      setBirthDate(jalaliDate);
    }
  }, [userInformation]);

  const onSubmit: formikOnSubmitType<typeof initialValues> = (
    { firstName, lastName, nationalId, address },
    { setSubmitting }
  ) => {
    const m = moment(birthDate, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    const formattedDate = m.format("YYYY-MM-DDTHH:mm:ss");
    editProfile({
      editProfileModel: {
        firstName,
        lastName,
        nationalId,
        birthDate: formattedDate,
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
            <LocalizationProvider
              dateAdapter={AdapterJalali as any}
              localeText={{
                cancelButtonLabel: "لغو",
                okButtonLabel: "تأیید",
                clearButtonLabel: "پاک کردن",
              }}
            >
              <MobileDatePicker
                label="تاریخ تولد"
                mask="____/__/__"
                value={birthDate}
                onChange={(date) => setBirthDate(date)}
                renderInput={(params) => (
                  <DorsaTextField fullWidth {...params} />
                )}
              />
            </LocalizationProvider>
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
                sx={{ px: 3, py: 1, fontSize: 16 }}
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
