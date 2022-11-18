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
import {
  CreateDnsRecordModel,
  usePostApiV2CdnDnsRecordCreateMutation,
  usePutApiV2CdnDnsRecordEditMutation,
} from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";
import { useAppSelector } from "src/app/hooks";
import { useLazyGetApiV2CdnDnsRecordGetByIdQuery } from "src/app/services/api";
import { createDnsRecordType, dnsType } from "src/types/createRecordType";
import {
  createDnsFormValidation,
  dnsTTLItems,
  dnsTypeItemsArray,
  dnsTypeValueLabelObject,
} from "src/components/organisms/cdn/dns/constants/createDnsRecord";
import PageLoading from "src/components/atoms/PageLoading";

type CreateRecordDialogPropsType = {
  id?: number;
  handleClose: () => void;
};

export const CreateRecordDialog: FC<CreateRecordDialogPropsType> = ({
  id,
  handleClose,
}) => {
  const [getInfo, { isLoading }] = useLazyGetApiV2CdnDnsRecordGetByIdQuery();

  const [type, setType] = useState<dnsType>("A");
  const [proxyStatus, setProxyStatus] = useState(false);

  const [initialValues, setInitialValue] = useState<createDnsRecordType>({
    ttl: "120",
    name: "",
    value: "",
    weight: "",
    port: "",
    priority: "",
    preference: "",
  });

  useEffect(() => {
    if (!id) return;
    getInfo({ id })
      .unwrap()
      .then((res) => {
        if (!res || !res.type || !res.ttl || !res.name || !res.value) return;
        setInitialValue({
          ttl: res.ttl,
          name: res.name,
          value: res.value,
          weight: res.weight || "",
          port: res.port || "",
          priority: res.priority || "",
          preference: res.preference || "",
        });
        setType(res.type as dnsType);
        setProxyStatus(res.useProxy || false);
      });
  }, [getInfo, id]);

  const selectedDomain = useAppSelector((store) => store.cdn.selectedDomain);

  const zoneName = selectedDomain?.zoneName || "";

  const [createDnsRecord, { isLoading: createDnsRecordLoading }] =
    usePostApiV2CdnDnsRecordCreateMutation();

  const [editDnsRecord, { isLoading: editDnsRecordLoading }] =
    usePutApiV2CdnDnsRecordEditMutation();

  const submitHandler: formikOnSubmitType<createDnsRecordType> = (
    { ttl, name, weight, port, value, priority, preference },
    { setSubmitting }
  ) => {
    if (!name || !value) return;
    let result: CreateDnsRecordModel = {
      zoneName,
      name,
      type,
      ttl,
      value,
      useProxy: proxyStatus,
      preference,
      priority,
      weight,
      port,
    };

    if (id) {
      editDnsRecord({
        editDnsRecordModel: result,
      })
        .unwrap()
        .then(() => {
          toast.success("رکورد مورد نظر با موفقیت بروز شد");
          handleClose();
        });
    } else {
      createDnsRecord({
        createDnsRecordModel: result,
      })
        .unwrap()
        .then(() => {
          toast.success("رکورد جدید با موفقیت ایجاد شد");
          handleClose();
        });
    }

    setSubmitting(false);
  };

  return (
    <>
      {isLoading && <PageLoading />}
      <Dialog
        open={true}
        onClose={handleClose}
        components={{ Backdrop: BlurBackdrop }}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2.5 },
        }}
      >
        <DialogTitle fontWeight="bold" variant="text1">
          ویرایش رکورد DNS
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={createDnsFormValidation}
          onSubmit={submitHandler}
        >
          {({ errors, touched, getFieldProps }) => (
            <Form autoComplete="on">
              <Stack p={{ xs: 1.8, md: 3 }} spacing={{ xs: 2, md: 5 }}>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={3}>
                    <DorsaTextField
                      inputProps={{ fontSize: "20px !important" }}
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
                      inputProps={{ fontSize: "20px !important" }}
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
                  <DorsaTextField
                    error={Boolean(errors.value && touched.value)}
                    helperText={errors.value}
                    {...getFieldProps("value")}
                    inputProps={{ dir: "ltr" }}
                    label={dnsTypeValueLabelObject[type]}
                  />
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
                      error={Boolean(errors.preference && touched.preference)}
                      helperText={errors.preference}
                      {...getFieldProps("preference")}
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
                      proxyStatus === true ? "primary.light" : "secondary.light"
                    }
                    borderRadius={2}
                    alignItems="center"
                    p={1.5}
                    boxShadow={
                      proxyStatus === true
                        ? "0px 2px 11px rgba(60, 138, 255, 0.44)"
                        : "none"
                    }
                  >
                    <Stack color="secondary.main">
                      <Typography
                        color={
                          proxyStatus === true
                            ? "primary.main"
                            : "secondary.main"
                        }
                        fontSize={16}
                      >
                        استفاده از Proxy
                      </Typography>
                      <Typography variant="text8" color="secondary">
                        با انتخاب این گزینه ترافیک از ابر درسا عبور خواهد کرد
                      </Typography>
                    </Stack>
                    <DorsaSwitch
                      onChange={() => setProxyStatus(!proxyStatus)}
                    />
                  </Stack>
                )}
                <Stack direction="row" justifyContent="end" spacing={1}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ px: 3, py: 0.8 }}
                    onClick={handleClose}
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
                    ثبت رکورد جدید
                  </LoadingButton>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};
