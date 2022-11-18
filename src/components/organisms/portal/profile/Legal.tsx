import { FC, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { MenuItem, Stack, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { LoadingButton } from "@mui/lab";
import {
  GetUserCompanyResponse,
  useGetApiV2PortalUserCompanyGetQuery,
  usePutApiV2PortalProfileEditAccountTypeMutation,
  usePutApiV2PortalUserCompanyEditMutation,
} from "src/app/services/api.generated";
import * as yup from "yup";
import { toast } from "react-toastify";
import { formikOnSubmitType } from "src/types/form.type";
import { legalFormDefault } from "./constants";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";
import PageLoading from "src/components/atoms/PageLoading";

const formValidation = yup.object().shape({
  id: yup.number(),
  userCompanyTypeId: yup.number(),
  name: yup.string(),
  nationalId: yup.string(),
  registrationNumber: yup.string(),
  registrationDate: yup.string(),
  economicNumber: yup.string(),
  businessPhone: yup.string(),
  address: yup.string(),
  postalCode: yup.string(),
});

const typeItems = [
  "سهامی عام",
  "سهامی خاص",
  "مسئولیت محدود",
  "تضامنی",
  "مختلط غیر سهامی",
  "مختلط سهامی",
  "نسبی",
  "تعاونی",
  "دولتی",
  "وزارتخانه",
  "سفارتخانه",
  "مسجد",
  "مدرسه",
  "NGO",
];

type LegalPersonalityPropsType = { isCompany: boolean };

export const LegalPersonality: FC<LegalPersonalityPropsType> = ({
  isCompany,
}) => {
  const { data } = useGetApiV2PortalUserCompanyGetQuery();

  const [companyInfo, setCompanyInfo] = useState(legalFormDefault);

  useEffect(() => {
    if (!data) return;
    setCompanyInfo(data as GetUserCompanyResponse);
  }, [data]);

  const [editUserCompany, { isLoading: loadingEdit }] =
    usePutApiV2PortalUserCompanyEditMutation();

  const submitHandler: formikOnSubmitType<GetUserCompanyResponse> = (
    {
      id,
      userCompanyTypeId,
      name,
      nationalId,
      registrationNumber,
      registrationDate,
      economicNumber,
      businessPhone,
      address,
      postalCode,
    },
    { setSubmitting }
  ) => {
    if (
      !userCompanyTypeId ||
      !name ||
      !nationalId ||
      !registrationNumber ||
      !registrationDate ||
      !economicNumber ||
      !businessPhone ||
      !address ||
      !postalCode
    )
      return;
    editUserCompany({
      editUserCompanyModel: {
        userCompanyTypeId,
        name,
        nationalId,
        registrationNumber,
        registrationDate,
        economicNumber,
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
    usePutApiV2PortalProfileEditAccountTypeMutation();
  const handleChange = () => {
    editType({ editAccountTypeModel: { isCompanyAccount: !isCompany } });
  };

  return (
    <>
      {isLoading && <PageLoading />}
      <Stack bgcolor="white" borderRadius={2} py={2.5} px={3}>
        <Stack direction="row" alignItems="center" spacing={1} py={1}>
          <DorsaSwitch onChange={handleChange} checked={isCompany || false} />
          <Typography>حساب کاربری حقوقی باشد</Typography>
        </Stack>
        <Stack display={isCompany ? "flex" : "none"} py={2}>
          <Formik
            initialValues={companyInfo}
            validationSchema={formValidation}
            onSubmit={submitHandler}
          >
            {({ errors, touched, getFieldProps }) => (
              <Form autoComplete="on">
                <Stack rowGap={{ xs: 1, md: 1.5, lg: 1.8 }}>
                  <Stack direction="row" spacing={1}>
                    <DorsaTextField
                      inputProps={{ fontSize: "20px !important" }}
                      select
                      fullWidth
                      label="نوع شرکت"
                      error={Boolean(
                        errors.userCompanyTypeId && touched.userCompanyTypeId
                      )}
                      helperText={errors.userCompanyTypeId}
                      {...getFieldProps("userCompanyTypeId")}
                      defaultValue={""}
                      value={companyInfo.userCompanyTypeId}
                    >
                      {typeItems.map((label, index) => (
                        <MenuItem
                          key={index}
                          value={index + 1}
                          sx={{
                            borderRadius: 1,
                            backgroundColor: "#F3F4F6",
                            m: 0.5,
                            py: 1.5,
                            color: "secondary",
                            "&: focus": {
                              color: "rgba(60, 138, 255, 1)",
                              backgroundColor: "rgba(60, 138, 255, 0.1)",
                            },
                          }}
                        >
                          {label}
                        </MenuItem>
                      ))}
                    </DorsaTextField>
                    <DorsaTextField
                      error={Boolean(errors.name && touched.name)}
                      helperText={errors.name}
                      {...getFieldProps("name")}
                      label="نام شرکت"
                      fullWidth
                    />
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <DorsaTextField
                      error={Boolean(errors.nationalId && touched.nationalId)}
                      helperText={errors.nationalId}
                      {...getFieldProps("nationalId")}
                      label="کد ملی"
                      fullWidth
                      inputProps={{ dir: "ltr" }}
                      type="text"
                    />
                    <DorsaTextField
                      error={Boolean(
                        errors.registrationNumber && touched.registrationNumber
                      )}
                      helperText={errors.registrationNumber}
                      {...getFieldProps("registrationNumber")}
                      label="کد اقتصادی"
                      fullWidth
                      inputProps={{ dir: "ltr" }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <DorsaTextField
                      error={Boolean(
                        errors.registrationDate && touched.registrationDate
                      )}
                      helperText={errors.registrationDate}
                      {...getFieldProps("registrationDate")}
                      label="تاریخ ثبت"
                      fullWidth
                    />
                    <DorsaTextField
                      error={Boolean(
                        errors.economicNumber && touched.economicNumber
                      )}
                      helperText={errors.economicNumber}
                      {...getFieldProps("economicNumber")}
                      label="شماره ثبت"
                      fullWidth
                      inputProps={{ dir: "ltr" }}
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
