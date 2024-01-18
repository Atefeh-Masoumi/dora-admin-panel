import { FC, createContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Stack, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { toast } from "react-toastify";
import { formikOnSubmitType } from "src/types/form.type";
import { legalFormDefault } from "./constants";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";
import PageLoading from "src/components/atoms/PageLoading";
import {
  GetCustomerResponse,
  useGetApiMyPortalCustomerGetQuery,
  usePutApiMyPortalCustomerEditMutation,
  usePutApiMyPortalCustomerEditCustomerTypeMutation,
} from "src/app/services/api.generated";

const formValidation = yup.object().shape({
  name: yup.string().required("نام شرکت را وارد کنید"),
  nationalId: yup.number().required("شناسه ملی را به عدد وارد کنید"),
  phone: yup.number().required("تلفن را به عدد وارد کنید"),
  address: yup.string().required("آدرس وارد کنید"),
  postalCode: yup.number().required("کد پستی را به عدد وارد کنید"),
});

// Define the type for your context value
type DataContextValueType = {
  refetchOnClick: () => any;
};

// Create the context
export const DataContext = createContext<DataContextValueType>({
  refetchOnClick: () => null,
});

type LegalPersonalityPropsType = { isLegal: boolean };

export const LegalPersonality: FC<LegalPersonalityPropsType> = ({
  isLegal,
}) => {
  const { data, refetch } = useGetApiMyPortalCustomerGetQuery();

  const refetchOnClick = () => {
    refetch().then(() => {
      setCustomerInfo(data as GetCustomerResponse);
    });
  };

  const [CustomerInfo, setCustomerInfo] = useState(legalFormDefault);

  useEffect(() => {
    if (!data) return;
    setCustomerInfo(data as GetCustomerResponse);
  }, [data]);

  const [editCustomer, { isLoading: loadingEdit }] =
    usePutApiMyPortalCustomerEditMutation();

  const submitHandler: formikOnSubmitType<GetCustomerResponse> = (
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
      .catch(({ status, data }) => {
        if (status === 401 || status === 404) {
          toast.error("اطلاعات را درست وارد کنید");
        } else toast.error(data[""][0]);
      });
    setSubmitting(false);
  };

  // Customer Type
  const [editType, { isLoading }] =
    usePutApiMyPortalCustomerEditCustomerTypeMutation();
  const handleChange = () => {
    editType({ editCustomerTypeModel: { isLegal: !isLegal } }).then(() =>
      refetchOnClick()
    );
  };

  return (
    <DataContext.Provider value={{ refetchOnClick }}>
      {isLoading && <PageLoading />}
      <Stack bgcolor="white" borderRadius={2} py={2.5} px={3}>
        <Stack direction="row" alignItems="center" spacing={1} py={1}>
          <DorsaSwitch onChange={handleChange} checked={isLegal || false} />
          <Typography>حساب کاربری حقوقی باشد</Typography>
        </Stack>
        <Stack display={isLegal ? "flex" : "none"} py={2}>
          <Formik
            initialValues={CustomerInfo}
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
    </DataContext.Provider>
  );
};
