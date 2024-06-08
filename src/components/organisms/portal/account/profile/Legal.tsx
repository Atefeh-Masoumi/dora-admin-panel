import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogProps,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { FC, MouseEventHandler, useState } from "react";
import { toast } from "react-toastify";
import { usePutApiMyPortalCustomerConvertToLegalMutation } from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { formikOnSubmitType } from "src/types/form.type";
import { e2p } from "src/utils/e2p.utils";
import { p2e } from "src/utils/p2e.utils";
import { onlyNumber } from "src/utils/priceToPersian";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("نام سازمان الزامی است"),
  nationalId: yup
    .string()
    .required("کدملی الزامی است")
    .max(10, "کدملی باید حداکثر 10 کاراکتر باشد"),
  phoneNumber: yup.string().required("شماره تلفن همراه الزامی است"),
  address: yup.string().required("آدرس الزامی است"),
  postalCode: yup
    .string()
    .required("کدپستی الزامی است")
    .max(10, "کدپستی باید حداکثر 10 کاراکتر باشد"),
});

export const convertToLegalTypeModalTextFields: any[] = [
  {
    label: "نام سازمان",
    id: "name",
  },

  {
    label: "کدملی",
    id: "nationalId",
  },
  {
    label: "شماره تلفن همراه",
    id: "phoneNumber",
  },
  {
    label: "آدرس",
    id: "address",
  },
  {
    label: "کد پستی",
    id: "postalCode",
  },
  {
    label: "شماره اقتصادی",
    id: "economicNumber",
  },
  {
    label: "شناسه ثبت",
    id: "registrationNumber",
  },
  {
    label: "تاریخ ثبت",
    id: "registrationDate",
  },
];

type LegalPersonalityPropsType = {};

type profileAccountFormInitialValuesType = {
  name: string;
  nationalId: string;
  phoneNumber: string;
  postalCode: string;
  address: string;
  economicNumber: string | null;
  registrationNumber: string | null;
  registrationDate: string | null;
};

type InputTypes = {
  id: string;
  label: string;
};

type UserIdentityModalPropsType = {
  dialogProps: DialogProps;
  forceClose: () => any;
};

export const LegalFormRegistrationModal: FC<UserIdentityModalPropsType> = ({
  dialogProps,
  forceClose,
}) => {
  const closeDialog: MouseEventHandler<HTMLButtonElement> = (event) => {
    dialogProps.onClose && dialogProps.onClose(event, "escapeKeyDown");
  };

  const initialValues: profileAccountFormInitialValuesType = {
    name: "",
    nationalId: "",
    phoneNumber: "",
    postalCode: "",
    address: "",
    economicNumber: null,
    registrationNumber: null,
    registrationDate: null,
  };

  const [callConvertToLegal] =
    usePutApiMyPortalCustomerConvertToLegalMutation();

  const onSubmit: formikOnSubmitType<profileAccountFormInitialValuesType> = (
    values,
    { setSubmitting, resetForm }
  ) => {
    callConvertToLegal({
      convertCustomerToLegalModel: values,
    })
      .unwrap()
      .then(() => {
        toast.success("ثبت اطلاعات با موفقیت انجام شد.");
        forceClose();
      })
      .catch(() => {})
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <Dialog
      {...dialogProps}
      sx={{ "& .MuiPaper-root": { maxWidth: "500px", padding: "20px" } }}
    >
      <Typography align="center">ثبت اطلاعات حقوقی</Typography>
      <Divider flexItem />
      <DialogContent>
        <DialogContentText textAlign="center">
          جهت افزودن اطلاعات حقوقی,اطلاعات زیر را تکمیل کنید
        </DialogContentText>
        <form autoComplete="on" onSubmit={formik.handleSubmit}>
          <Stack
            rowGap={3}
            columnGap={2}
            width="100%"
            direction="column"
            mt={4}
          >
            {convertToLegalTypeModalTextFields.map((item: InputTypes) => {
              return (
                <TextField
                  key={item.id}
                  label={item.label}
                  fullWidth
                  size="small"
                  placeholder={`${item.label} را وارد کنید`}
                  InputProps={{
                    dir: "rtl",
                    sx: { paddingLeft: 0 },
                  }}
                  value={e2p(
                    formik.values[item.id as keyof typeof initialValues] || ""
                  )}
                  onChange={(e) => {
                    formik.setFieldTouched(item.id, true);
                    item.id === "nationalId"
                      ? formik.setFieldValue(
                          item.id,
                          onlyNumber(p2e(e.target.value))
                        )
                      : formik.setFieldValue(item.id, p2e(e.target.value));
                  }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    formik.setFieldTouched(item.id, false);
                  }}
                  error={Boolean(
                    formik.errors[item.id as keyof typeof initialValues] &&
                      formik.touched[item.id as keyof typeof initialValues]
                  )}
                  helperText={
                    formik.touched[item.id as keyof typeof initialValues] &&
                    formik.errors[item.id as keyof typeof initialValues]
                  }
                />
              );
            })}
            <Stack direction="column" rowGap={1}>
              <LoadingButton type="submit" variant="contained">
                ثبت اطلاعات حقوقی
              </LoadingButton>
              <Button variant="outlined" onClick={closeDialog}>
                انصراف
              </Button>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const LegalPersonality: FC<LegalPersonalityPropsType> = () => {
  const [showModal, setShowModal] = useState(false);

  const closeDialogHandler = () => {
    setShowModal(false);
  };

  return (
    <Stack bgcolor="white" borderRadius={BORDER_RADIUS_1} py={2.5} px={3}>
      <Stack
        direction="row"
        sx={{ display: "flex", justifyContent: "space-between" }}
        pt={1.5}
      >
        <Typography
          variant="text1"
          fontWeight={500}
          color="secondary"
          sx={{ pt: 1.1, pb: 1 }}
        >
          تغییر اکانت به حقوقی:
        </Typography>
        <Button
          variant="contained"
          sx={{ px: 3, py: 1, fontSize: { sm: "11px", lg: "16px" } }}
          onClick={() => setShowModal(true)}
        >
          درخواست تغییر
        </Button>
      </Stack>
      {showModal && (
        <LegalFormRegistrationModal
          dialogProps={{
            open: showModal,
            onClose: closeDialogHandler,
          }}
          forceClose={closeDialogHandler}
        />
      )}
    </Stack>
  );
};
