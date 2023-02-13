import { FC, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Stack, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { LoadingButton } from "@mui/lab";
import {
  GetUserCompanyResponse,
  useGetUserV2PortalUserCompanyGetQuery,
  usePutUserV2PortalUserCompanyEditMutation,
  usePutUserV2PortalProfileEditAccountTypeMutation,
} from "src/app/services/api.generated";
import * as yup from "yup";
import { toast } from "react-toastify";
import { formikOnSubmitType } from "src/types/form.type";
import { legalFormDefault } from "./constants";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";
import PageLoading from "src/components/atoms/PageLoading";

const formValidation = yup.object().shape({
  name: yup.string(),
  nationalId: yup.string(),
  businessPhone: yup.string(),
  address: yup.string(),
  postalCode: yup.string(),
});

type LegalPersonalityPropsType = { isLegal: boolean };

export const LegalPersonality: FC<LegalPersonalityPropsType> = ({
  isLegal,
}) => {
  const { data } = useGetUserV2PortalUserCompanyGetQuery();

  const [companyInfo, setCompanyInfo] = useState(legalFormDefault);

  useEffect(() => {
    if (!data) return;
    setCompanyInfo(data as GetUserCompanyResponse);
  }, [data]);

  const [editUserCompany, { isLoading: loadingEdit }] =
    usePutUserV2PortalUserCompanyEditMutation();

  const submitHandler: formikOnSubmitType<GetUserCompanyResponse> = (
    { name, nationalId, businessPhone, address, postalCode },
    { setSubmitting }
  ) => {
    if (!name || !nationalId || !businessPhone || !address || !postalCode)
      return;
    editUserCompany({
      editUserCompanyModel: {
        name,
        nationalId,
        businessPhone,
        address,
        postalCode,
      },
    })
      .unwrap()
      .then(() => toast.success("مشخصات با موفقیت آپدیت شد"))
      .catch(({ status, data }) => {
        if (status === 401 || status === 404) {
          toast.error("اطلاعات را درست وارد کنید");
        } else toast.error(data[""][0]);
      });
    setSubmitting(false);
  };

  // Account Type
  const [editType, { isLoading }] =
    usePutUserV2PortalProfileEditAccountTypeMutation();
  const handleChange = () => {
    editType({ editAccountTypeModel: { isLegal: !isLegal } });
  };

  return (
    <>
      {isLoading && <PageLoading />}
      <Stack bgcolor="white" borderRadius={2} py={2.5} px={3}>
        <Stack direction="row" alignItems="center" spacing={1} py={1}>
          <DorsaSwitch onChange={handleChange} checked={isLegal || false} />
          <Typography>حساب کاربری حقوقی باشد</Typography>
        </Stack>
        <Stack display={isLegal ? "flex" : "none"} py={2}>
          <Formik
            initialValues={companyInfo}
            validationSchema={formValidation}
            enableReinitialize
            onSubmit={submitHandler}
          >
            {({ errors, touched, getFieldProps }) => (
              <Form autoComplete="on">
                <Stack rowGap={{ xs: 1, md: 1.5, lg: 1.8 }}>
                  <Stack direction="row" spacing={1}>
                    <DorsaTextField
                      error={Boolean(errors.name && touched.name)}
                      helperText={errors.name}
                      {...getFieldProps("name")}
                      label="نام شرکت"
                      fullWidth
                    />
                    <DorsaTextField
                      error={Boolean(errors.nationalId && touched.nationalId)}
                      helperText={errors.nationalId}
                      {...getFieldProps("nationalId")}
                      label="شناسه ملی"
                      fullWidth
                      inputProps={{ dir: "ltr" }}
                      type="text"
                    />
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <DorsaTextField
                      error={Boolean(
                        errors.businessPhone && touched.businessPhone
                      )}
                      helperText={errors.businessPhone}
                      {...getFieldProps("businessPhone")}
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
    </>
  );
};
