import { FC, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { formikOnSubmitType } from "src/types/form.type";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";
import {
  createDnsRecordType,
  dnsType,
} from "src/components/organisms/cdn/edit/dns/types/createRecordType";
import {
  createDnsFormValidation,
  dnsTTLItems,
  dnsTypeItemsArray,
  dnsTypeValueLabelObject,
} from "src/components/organisms/cdn/edit/dns/constants/createDnsRecord";
import PageLoading from "src/components/atoms/PageLoading";
import { useLazyGetApiMyDnsCdnDnsRecordGetByIdQuery } from "src/app/services/api";
import {
  usePostApiMyDnsCdnDnsRecordCreateMutation,
  usePutApiMyDnsCdnDnsRecordEditByIdMutation,
} from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type CreateRecordDialogPropsType = {
  id?: number;
  dnsId: number;
  onClose: () => void;
  openDialog: boolean;
};

export const CreateRecordDialog: FC<CreateRecordDialogPropsType> = ({
  id,
  dnsId,
  onClose,
  openDialog,
}) => {
  const [getInfo, { isLoading: getDetailsLoading }] =
    useLazyGetApiMyDnsCdnDnsRecordGetByIdQuery();

  const [type, setType] = useState<dnsType>("A");

  const [initialValues, setInitialValues] = useState<createDnsRecordType>({
    name: "",
    value: "",
    ttl: "120",
    useProxy: false,
    weight: "",
    port: "",
    priority: "",
    preference: "",
  });

  useEffect(() => {
    if (!id) return;
    getInfo({ id })
      .unwrap()
      .then((response) => {
        if (
          !response ||
          !response.name ||
          !response.value ||
          !response.ttl ||
          !response.type
        )
          return;

        setType(response.type as dnsType);

        setInitialValues((prevState) => {
          let result = { ...prevState };
          result.name = response.name!;
          result.value = response.value!;
          result.ttl = response.ttl!;
          result.useProxy = response.useProxy!;
          result.weight = response.weight || "";
          result.port = response.port || "";
          result.priority = response.priority || "";
          result.preference = response.preference || "";

          return result;
        });
      });
  }, [getInfo, id]);

  const [createDnsRecord, { isLoading: createDnsRecordLoading }] =
    usePostApiMyDnsCdnDnsRecordCreateMutation();

  const [editDnsRecord, { isLoading: editDnsRecordLoading }] =
    usePutApiMyDnsCdnDnsRecordEditByIdMutation();

  const submitHandler: formikOnSubmitType<createDnsRecordType> = (
    { ttl, name, weight, port, value, priority, preference, useProxy },
    { setSubmitting }
  ) => {
    if (!name || !value) return;
    if (id) {
      editDnsRecord({
        id: id,
        editDnsRecordModel: {
          dnsCdnHostId: dnsId,
          name,
          type,
          ttl,
          value,
          useProxy,
          preference,
          priority,
          weight,
          port,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("رکورد مورد نظر با موفقیت بروز شد");
          onClose();
        })
        .catch(() => {});
    } else {
      createDnsRecord({
        createDnsRecordModel: {
          dnsCdnHostId: dnsId,
          name,
          type,
          ttl,
          value,
          useProxy,
          preference,
          priority,
          weight,
          port,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("رکورد جدید با موفقیت ایجاد شد");
          onClose();
        })
        .catch(() => {});
    }

    setSubmitting(false);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
      components={{ Backdrop: BlurBackdrop }}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: BORDER_RADIUS_1 },
      }}
    >
      {getDetailsLoading && <PageLoading />}
      <DialogTitle fontWeight="bold" variant="text1">
        {id ? "ویرایش DNS" : "ایجاد DNS"}
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={createDnsFormValidation}
        onSubmit={submitHandler}
        enableReinitialize
      >
        {({ errors, touched, getFieldProps, setFieldValue, values }) => (
          <Form autoComplete="on">
            <Stack p={{ xs: 1.8, md: 3 }} spacing={{ xs: 2, md: 5 }}>
              <Stack spacing={3}>
                <Stack direction="row" spacing={3}>
                  <DorsaTextField
                    select
                    fullWidth
                    label="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value as dnsType)}
                  >
                    {dnsTypeItemsArray.map((type, index) => (
                      <MenuItem
                        key={index}
                        value={type}
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
                        {type}
                      </MenuItem>
                    ))}
                  </DorsaTextField>
                  <DorsaTextField
                    select
                    fullWidth
                    label="TTL"
                    error={Boolean(errors.ttl && touched.ttl)}
                    helperText={errors.ttl}
                    {...getFieldProps("ttl")}
                  >
                    {dnsTTLItems.map(({ label, value }) => (
                      <MenuItem
                        key={value}
                        value={value}
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
                </Stack>
                <DorsaTextField
                  error={Boolean(errors.name && touched.name)}
                  helperText={errors.name}
                  {...getFieldProps("name")}
                  inputProps={{ dir: "ltr" }}
                  label="Name"
                />
                {type === "TXT" ? (
                  <DorsaTextField
                    error={Boolean(errors.value && touched.value)}
                    helperText={errors.value}
                    {...getFieldProps("value")}
                    inputProps={{ dir: "ltr" }}
                    label={dnsTypeValueLabelObject[type]}
                    multiline
                    rows={6}
                  />
                ) : (
                  <DorsaTextField
                    error={Boolean(errors.value && touched.value)}
                    helperText={errors.value}
                    {...getFieldProps("value")}
                    inputProps={{ dir: "ltr" }}
                    label={dnsTypeValueLabelObject[type]}
                  />
                )}
                {type === "SRV" && (
                  <>
                    <DorsaTextField
                      error={Boolean(errors.priority && touched.priority)}
                      helperText={errors.priority}
                      {...getFieldProps("priority")}
                      inputProps={{ dir: "ltr" }}
                      label="Priority"
                    />
                    <DorsaTextField
                      error={Boolean(errors.weight && touched.weight)}
                      helperText={errors.weight}
                      {...getFieldProps("weight")}
                      inputProps={{ dir: "ltr" }}
                      label="Weight"
                    />
                    <DorsaTextField
                      error={Boolean(errors.port && touched.port)}
                      helperText={errors.port}
                      {...getFieldProps("port")}
                      inputProps={{ dir: "ltr" }}
                      label="Port"
                    />
                  </>
                )}
                {type === "MX" && (
                  <DorsaTextField
                    error={Boolean(errors.priority && touched.priority)}
                    helperText={errors.priority}
                    {...getFieldProps("priority")}
                    inputProps={{ dir: "ltr" }}
                    label="Priority (0 - 65535)"
                  />
                )}
              </Stack>
              {(type === "A" || type === "AAAA" || type === "CNAME") && (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  border={1}
                  borderColor={
                    values.useProxy ? "primary.light" : "secondary.light"
                  }
                  borderRadius={BORDER_RADIUS_1}
                  alignItems="center"
                  p={1.5}
                  boxShadow={
                    values.useProxy
                      ? "0px 2px 11px rgba(60, 138, 255, 0.44)"
                      : "none"
                  }
                >
                  <Stack color="secondary.main">
                    <Typography
                      color={
                        values.useProxy ? "primary.main" : "secondary.main"
                      }
                      fontSize={16}
                    >
                      استفاده از Proxy
                    </Typography>
                    <Typography variant="text8" color="secondary">
                      با انتخاب این گزینه ترافیک از CDN عبور خواهد کرد
                    </Typography>
                  </Stack>
                  <DorsaSwitch
                    checked={values.useProxy}
                    onChange={() => setFieldValue("useProxy", !values.useProxy)}
                  />
                </Stack>
              )}
              <Stack direction="row" justifyContent="end" spacing={1}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ px: 3, py: 0.8 }}
                  onClick={onClose}
                >
                  انصراف
                </Button>
                <LoadingButton
                  component="button"
                  type="submit"
                  loading={createDnsRecordLoading || editDnsRecordLoading}
                  variant="contained"
                  sx={{ px: 3, py: 0.8 }}
                >
                  ذخیره
                </LoadingButton>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
