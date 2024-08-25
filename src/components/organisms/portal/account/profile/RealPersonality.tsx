import { FC, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import {
  useGetApiMyAccountProfileGetQuery,
  usePutApiMyAccountProfileEditMutation,
} from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import AdapterJalali from "@date-io/date-fns-jalali";
import moment from "jalali-moment";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("نام الزامیست!"),
  lastName: yup.string().required("نام خانوادگی الزامیست!"),
  nationalId: yup.string().required("کد ملی الزامیست!"),
  birthDate: yup.string().required("تاریخ تولد الزامیست!"),
  address: yup.string().required("آدرس الزامیست!"),
});

type RealPersonalityPropsType = {};

export const RealPersonality: FC<RealPersonalityPropsType> = () => {
  const [birthDate, setBirthDate] = useState<null | Date>(null);
  const [editProfile, { isLoading: loadingEdit }] =
    usePutApiMyAccountProfileEditMutation();

  const { data: userInformation } = useGetApiMyAccountProfileGetQuery();

  useEffect(() => {
    if (userInformation?.birthDate) {
      // Convert Jalali date string to a Gregorian Date object
      const gregorianDate = moment(
        userInformation.birthDate,
        "jYYYY/jMM/jDD"
      ).toDate();
      setBirthDate(gregorianDate);
    }
  }, [userInformation]);

  const initialValues = {
    firstName: userInformation?.firstName || "",
    lastName: userInformation?.lastName || "",
    nationalId: userInformation?.nationalId || "",
    birthDate: userInformation?.birthDate || "",
    address: userInformation?.address || "",
  };

  const onSubmit: formikOnSubmitType<typeof initialValues> = (
    { firstName, lastName, nationalId, address },
    { setSubmitting }
  ) => {
    // Convert the selected Gregorian Date object back to a Jalali date string
    const jalaliBirthDate = birthDate
      ? moment(birthDate).format("jYYYY/jMM/jDD")
      : "";

    editProfile({
      editProfileModel: {
        firstName,
        lastName,
        nationalId,
        birthDate: jalaliBirthDate,
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
                onChange={(date) => setBirthDate(date as Date)}
                renderInput={(params) => <TextField fullWidth {...params} />}
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
