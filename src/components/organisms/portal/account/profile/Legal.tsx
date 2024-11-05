import { LoadingButton } from "@mui/lab";
import {
  Button,
  Chip,
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
import {
  useGetApiMyAccountCustomerGetQuery,
  useGetApiMyAccountProfileGetQuery,
  usePutApiMyAccountCustomerConvertToLegalMutation,
} from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { formikOnSubmitType } from "src/types/form.type";
import { e2p } from "src/utils/e2p.utils";
import { p2e } from "src/utils/p2e.utils";
import { onlyNumber } from "src/utils/priceToPersian";
import * as yup from "yup";
import { LegalPersonalityDetail } from "./LegalPersonality";

const validationSchema = yup.object().shape({
  name: yup.string().required("نام سازمان الزامی است"),
  nationalId: yup
    .string()
    .required("شناسه ملی الزامی است")
    .max(11, "شناسه ملی باید حداکثر 11 کاراکتر باشد"),
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
    label: "شناسه ملی",
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
    label: "شماره ثبت",
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
    registrationNumber: null,
    registrationDate: null,
  };

  const [callConvertToLegal] =
    usePutApiMyAccountCustomerConvertToLegalMutation();

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
      <Typography textAlign="left" sx={{ fontWeight: "bold" }}>
        ثبت اطلاعات حقوقی
      </Typography>
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
            <Stack justifyContent="right" direction="row" columnGap={1}>
              <Button variant="outlined" onClick={closeDialog}>
                انصراف
              </Button>
              <LoadingButton type="submit" variant="contained">
                ثبت اطلاعات حقوقی
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const LegalPersonality: FC<LegalPersonalityPropsType> = () => {
  const [showModal, setShowModal] = useState(false);

  const { data: userInformation } = useGetApiMyAccountProfileGetQuery();
  const { data: accountCustomerInfo } = useGetApiMyAccountCustomerGetQuery();

  const closeDialogHandler = () => {
    setShowModal(false);
  };

  return (
    <Stack
      sx={{
        width: "100%",
        p: { xs: 1.8, lg: 2 },
        borderRadius: BORDER_RADIUS_1,
        backgroundColor: "white",
      }}
      height="100%"
      justifyContent="space-between"
      rowGap={{ xs: 2, md: 2 }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="text1" color="secondary" sx={{ p: 1 }}>
          مشخصات صورتحساب
        </Typography>
        {userInformation?.idConfirmed ? (
          <Chip
            label="تایید شده"
            sx={{
              color: "rgba(13, 191, 102, 1)",
              backgroundColor: "rgba(218, 246, 232, 1)",
              borderRadius: 1,
              fontSize: "14px",
              p: 0.5,
            }}
          />
        ) : (
          <Chip
            label="احراز هویت نشده"
            sx={{
              color: "rgba(244, 95, 80, 1)",
              backgroundColor: "rgba(244, 95, 80, 0.12)",
              borderRadius: 1,
              fontSize: "14px",
              p: 0.5,
            }}
          />
        )}
      </Stack>
      <Divider variant="middle" />
      <LegalPersonalityDetail />
      <Stack direction="row" justifyContent="right">
        <Button
          disabled={accountCustomerInfo?.isLegal}
          variant="contained"
          sx={{ px: 1, py: 1, width: { sm: "100%", md: "22%" } }}
          onClick={() => setShowModal(true)}
        >
          تغییر اکانت به حقوقی
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
