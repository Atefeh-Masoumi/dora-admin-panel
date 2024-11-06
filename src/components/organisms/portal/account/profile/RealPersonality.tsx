import AdapterJalali from "@date-io/date-fns-jalali";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { Form, Formik, useFormik } from "formik";
import moment from "jalali-moment";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetApiMyAccountProfileGetQuery,
  usePutApiMyAccountProfileEditMutation,
} from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";
const ERROR_MESSAGE = "فیلد الزامیست!";

const validationSchema = yup.object().shape({
  firstName: yup.string().typeError(ERROR_MESSAGE).required(ERROR_MESSAGE),
  lastName: yup.string().typeError(ERROR_MESSAGE).required(ERROR_MESSAGE),
  nationalId: yup.string().typeError(ERROR_MESSAGE).required(ERROR_MESSAGE),
  // birthDate: yup.string().required("تاریخ تولد الزامیست!"),
  address: yup.string().typeError(ERROR_MESSAGE).required(ERROR_MESSAGE),
});

type RealPersonalityPropsType = {};

export const RealPersonality: FC<RealPersonalityPropsType> = () => {
  const [editProfile, { isLoading: loadingEdit }] =
    usePutApiMyAccountProfileEditMutation();

  const { data: userInformation } = useGetApiMyAccountProfileGetQuery();

  const initialValues = {
    firstName: userInformation?.firstName || null,
    lastName: userInformation?.lastName || null,
    nationalId: userInformation?.nationalId || null,
    birthDate: userInformation?.birthDate || "",
    address: userInformation?.address || null,
  };

  const onSubmit: formikOnSubmitType<typeof initialValues> = ({
    firstName,
    lastName,
    nationalId,
    address,
    birthDate,
  }) => {
    editProfile({
      editProfileModel: {
        firstName: firstName!,
        lastName: lastName!,
        nationalId: nationalId!,
        birthDate,
        address: address!,
      },
    })
      .unwrap()
      .then((res) => {
        if (!res) return;
        toast.success("مشخصات با موفقیت بروز رسانی شد");
      })
      .catch((err) => {});
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  // console.log(formik.values);    

  const handleBirthDate = (date: any) => {
    const jalaliDate = moment.utc(date).format("YYYY-MM-DDTHH:mm:ss");
    formik.setFieldValue("birthDate", jalaliDate);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2.7} justifyContent="space-between" p={1}>
        <Stack direction="row" spacing={1}>
          <DorsaTextField
            error={Boolean(formik.errors.firstName && formik.touched.firstName)}
            helperText={formik.errors.firstName}
            label="نام"
            fullWidth
            {...formik.getFieldProps("firstName")}
          />
          <DorsaTextField
            error={Boolean(formik.errors.lastName && formik.touched.lastName)}
            helperText={formik.errors.lastName}
            label="نام خانوادگی"
            fullWidth
            {...formik.getFieldProps("lastName")}
          />
        </Stack>
        <DorsaTextField
          error={Boolean(formik.errors.nationalId && formik.touched.nationalId)}
          helperText={formik.errors.nationalId}
          label="کد ملی"
          fullWidth
          inputProps={{ dir: "ltr" }}
          {...formik.getFieldProps("nationalId")}
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
            value={formik.values.birthDate}
            onChange={(date) => handleBirthDate(date)}
            renderInput={(params) => (
              <DorsaTextField
                error={Boolean(
                  formik.errors.birthDate && formik.touched.birthDate
                )}
                helperText={formik.errors.birthDate}
                fullWidth
                {...params}
              />
            )}
          />
        </LocalizationProvider>
        <DorsaTextField
          error={Boolean(formik.errors.address && formik.touched.address)}
          helperText={formik.errors.address}
          {...formik.getFieldProps("address")}
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
            type="submit"
            loading={loadingEdit}
            variant="contained"
            sx={{ px: 3, py: 1, fontSize: 16 }}
          >
            ذخیره اطلاعات
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  );
};
