import { FC, useEffect, useState } from "react";
import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { BORDER_RADIUS_4 } from "src/configs/theme";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useNavigate, useParams } from "react-router";
import { LoadingButton } from "@mui/lab";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg/ExclamationMarkCircleSvg";
import { formikOnSubmitType } from "src/types/form.type";
import {
  ChangeContactModel,
  usePutApiMyDomainChangeContactMutation,
} from "src/app/services/api.generated";
import { useLazyGetApiMyDomainGetByIdQuery } from "src/app/services/api";
import PageLoading from "src/components/atoms/PageLoading";

const commonValidation = yup.string().required("این فیلد اجباری می‌باشد");

export const domainInfoFormValidation = yup.object().shape({
  name: commonValidation,
  value: commonValidation,
});

type EditDomainInfoPropsType = {};

export const EditDomainInfo: FC<EditDomainInfoPropsType> = () => {
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState<ChangeContactModel>({
    id: 0,
    name: "",
    country: "",
    province: "",
    city: "",
    street: "",
    postalCode: "",
    voice: "",
    fax: "",
    email: "",
  });

  const [getInfo, { isLoading: getDetailsLoading }] =
    useLazyGetApiMyDomainGetByIdQuery();

  useEffect(() => {
    if (!id) return;
    getInfo({ id: Number(id)! })
      .unwrap()
      .then((response) => {
        if (
          !response ||
          !response.name ||
          !response.country ||
          !response.province ||
          !response.city ||
          !response.street
        )
          return;

        setInitialValues((prevState) => {
          let result = { ...prevState };
          result.name = response.name!;
          result.country = response.country!;
          result.province = response.province!;
          result.city = response.city!;
          result.street = response.street || "";
          result.postalCode = response.postalCode || "";
          result.voice = response.voice || "";
          result.fax = response.fax || "";
          result.email = response.email || "";

          return result;
        });
      });
  }, [getInfo, id]);

  const navigate = useNavigate();

  const [changeContactModel, { isLoading: loadEdit }] =
    usePutApiMyDomainChangeContactMutation();

  const submitHandler: formikOnSubmitType<ChangeContactModel> = (
    { name, country, province, city, street, postalCode, voice, email },
    { setSubmitting }
  ) => {
    changeContactModel({
      changeContactModel: {
        id: Number(id)!,
        name,
        country,
        province,
        city,
        street,
        postalCode,
        voice,
        email,
      },
    })
      .unwrap()
      .then(() => {
        navigate("/domain");
      });

    setSubmitting(false);
  };
  return (
    <>
      {getDetailsLoading || (getDetailsLoading && <PageLoading />)}

      <Formik
        initialValues={initialValues}
        validationSchema={domainInfoFormValidation}
        onSubmit={submitHandler}
        enableReinitialize
      >
        {({ errors, touched, getFieldProps }) => (
          <Form autoComplete="on">
            <Grid2
              container
              spacing={3}
              alignItems="center"
              justifyContent="center"
            >
              <Grid2 xs={12}>
                <Paper
                  component={Stack}
                  rowGap={2}
                  elevation={0}
                  sx={{
                    borderRadius: BORDER_RADIUS_4,
                    p: { xs: 2.5 },
                  }}
                >
                  <Typography align="center" fontWeight={700} fontSize={18}>
                    تغییر اطلاعات دامنه
                  </Typography>
                  <Divider />

                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid xs={12} item sx={{ m: 2 }} spacing={1}>
                      <Stack direction="row" spacing={2} px={2} mb={1}>
                        <ExclamationMarkCircleSvg
                          sx={{
                            transform: "rotate(180deg)",
                            "&>path:first-of-type": {
                              opacity: 1,
                              stroke: ({ palette }) => palette.grey[700],
                              strokeWidth: 1,
                              fill: "transparent",
                            },
                          }}
                        />
                        <Typography
                          sx={{ color: ({ palette }) => palette.grey[700] }}
                        >
                          تغییر اطلاعات شاید کمی زمانبر باشد.
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={2} px={2}>
                        <ExclamationMarkCircleSvg
                          sx={{
                            transform: "rotate(180deg)",
                            "&>path:first-of-type": {
                              opacity: 1,
                              stroke: ({ palette }) => palette.grey[700],
                              strokeWidth: 1,
                              fill: "transparent",
                            },
                          }}
                        />
                        <Typography
                          sx={{ color: ({ palette }) => palette.grey[700] }}
                        >
                          بعد از تغییر، ایمیلی برای شما ارسال میگردد و بعد از
                          تائید تغییر اعمال میگردد.
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid xs={12} container item sx={{ m: 2 }} spacing={2}>
                      <Grid item xs={12} lg={6}>
                        <DorsaTextField
                          fullWidth
                          error={Boolean(errors.name && touched.name)}
                          helperText={errors.name}
                          {...getFieldProps("name")}
                          inputProps={{ dir: "ltr" }}
                          label="Name"
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <DorsaTextField
                          fullWidth
                          error={Boolean(errors.email && touched.email)}
                          helperText={errors.email}
                          {...getFieldProps("email")}
                          inputProps={{ dir: "ltr" }}
                          label="ایمیل"
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <DorsaTextField
                          fullWidth
                          error={Boolean(errors.country && touched.country)}
                          helperText={errors.country}
                          {...getFieldProps("country")}
                          inputProps={{ dir: "ltr" }}
                          label="نام کشور"
                          placeholder="Iran"
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <DorsaTextField
                          fullWidth
                          error={Boolean(errors.province && touched.province)}
                          helperText={errors.province}
                          {...getFieldProps("province")}
                          inputProps={{ dir: "ltr" }}
                          label="نام استان"
                          placeholder="Tehran"
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <DorsaTextField
                          fullWidth
                          error={Boolean(errors.city && touched.city)}
                          helperText={errors.city}
                          {...getFieldProps("city")}
                          inputProps={{ dir: "ltr" }}
                          label="نام شهر"
                          placeholder="Tehran"
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <DorsaTextField
                          fullWidth
                          error={Boolean(errors.street && touched.street)}
                          helperText={errors.street}
                          {...getFieldProps("street")}
                          inputProps={{ dir: "ltr" }}
                          label="آدرس"
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <DorsaTextField
                          fullWidth
                          error={Boolean(
                            errors.postalCode && touched.postalCode
                          )}
                          helperText={errors.postalCode}
                          {...getFieldProps("postalCode")}
                          inputProps={{ dir: "ltr" }}
                          label="کد پستی"
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <DorsaTextField
                          fullWidth
                          error={Boolean(errors.voice && touched.voice)}
                          helperText={errors.voice}
                          {...getFieldProps("voice")}
                          inputProps={{ dir: "ltr" }}
                          label="تلفن"
                          placeholder="+9821________"
                        />
                      </Grid>
                    </Grid>

                    <Grid xs={12} item sx={{ m: 2 }} spacing={1}>
                      <Stack alignItems="center" justifyContent="center">
                        <LoadingButton
                          component="button"
                          type="submit"
                          loading={getDetailsLoading || loadEdit}
                          variant="contained"
                          sx={{ px: 3, py: 0.8 }}
                        >
                          ذخیره اطلاعات
                        </LoadingButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid2>
            </Grid2>
          </Form>
        )}
      </Formik>
    </>
  );
};
function getInfo(arg0: { id: string }) {
  throw new Error("Function not implemented.");
}
