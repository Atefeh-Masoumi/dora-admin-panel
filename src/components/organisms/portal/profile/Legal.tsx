import { FC, useMemo } from "react";
import { Form, Formik } from "formik";
import { Button, Stack, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { toast } from "react-toastify";
import { formikOnSubmitType } from "src/types/form.type";
import {
  useGetApiMyPortalCustomerGetQuery,
  usePutApiMyPortalCustomerEditMutation,
  useGetApiMyPortalProfileGetQuery,
} from "src/app/services/api.generated";

const validationSchema = yup.object().shape({
  name: yup.string().required("نام شرکت را وارد کنید"),
  nationalId: yup.number().required("شناسه ملی را به عدد وارد کنید"),
  phone: yup.number().required("تلفن را به عدد وارد کنید"),
  address: yup.string().required("آدرس وارد کنید"),
  postalCode: yup.number().required("کد پستی را به عدد وارد کنید"),
});

type LegalPersonalityPropsType = {};

export const LegalPersonality: FC<LegalPersonalityPropsType> = () => {
  const { data: customerData } = useGetApiMyPortalCustomerGetQuery();
  const { data: profileInfo } = useGetApiMyPortalProfileGetQuery();

  const isLegal = useMemo(() => !!profileInfo?.isLegal, [profileInfo?.isLegal]);

  const initialValues = {
    name: customerData?.name || "",
    nationalId: customerData?.nationalId || "",
    phone: customerData?.phone || "",
    address: customerData?.address || "",
    postalCode: customerData?.postalCode || "",
  };

  const [editCustomer, { isLoading: loadingEdit }] =
    usePutApiMyPortalCustomerEditMutation();

  const onSubmit: formikOnSubmitType<typeof initialValues> = (
    { name, nationalId, phone, address, postalCode },
    { setSubmitting }
  ) => {
    if (!name || !nationalId || !phone || !address || !postalCode) return;
    editCustomer({
      editCustomerModel: {
        name,
        nationalId,
        phone,
        address,
        postalCode,
      },
    })
      .unwrap()
      .then(() => toast.success("مشخصات با موفقیت بروز رسانی شد"))
      .catch(({ status, customerData }) => {
        if (status === 401 || status === 404) {
          toast.error("اطلاعات را درست وارد کنید");
        } else toast.error(customerData[""][0]);
      });
    setSubmitting(false);
  };

  // const [editType, { isLoading }] =
  //   usePutApiMyPortalCustomerEditCustomerTypeMutation();

  // const handleChange: SwitchProps["onChange"] = (event, checked) => {
  //   editType({ editCustomerTypeModel: { isLegal: checked } })
  //     .unwrap()
  //     .then(() => {})
  //     .catch((err) => {});
  // };

  return (
    <Stack bgcolor="white" borderRadius={2} py={2.5} px={3}>
      <Typography>حساب کاربری حقوقی</Typography>
      <Stack py={2}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={onSubmit}
        >
          {({ errors, touched, getFieldProps }) => (
            <Form autoComplete="on">
              <Stack rowGap={{ xs: 1, md: 1.5, lg: 1.8 }}>
                <Stack direction="row" spacing={1}>
                  <DorsaTextField
                    error={Boolean(errors.name && touched.name)}
                    helperText={errors.name}
                    {...getFieldProps("name")}
                    label="نام شرکت/طرف حساب"
                    fullWidth
                  />
                  <DorsaTextField
                    error={Boolean(errors.nationalId && touched.nationalId)}
                    helperText={errors.nationalId}
                    {...getFieldProps("nationalId")}
                    label="شناسه ملی/کد ملی"
                    fullWidth
                    inputProps={{ dir: "ltr" }}
                    type="text"
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <DorsaTextField
                    error={Boolean(errors.phone && touched.phone)}
                    helperText={errors.phone}
                    {...getFieldProps("phone")}
                    label="تلفن شرکت"
                    fullWidth
                    inputProps={{ dir: "ltr" }}
                  />
                  <DorsaTextField
                    error={Boolean(errors.postalCode && touched.postalCode)}
                    helperText={errors.postalCode}
                    {...getFieldProps("postalCode")}
                    label="کد پستی"
                    fullWidth
                    inputProps={{ dir: "ltr" }}
                  />
                </Stack>
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
      </Stack>
    </Stack>
  );
};
