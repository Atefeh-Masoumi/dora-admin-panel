import { FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { usePostApiMyKubesphereUserCreateMutation } from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
// import { ServiceUsersContext } from "src/pages/kubernetes/Users";

const formInitialValues = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const formValidation = yup.object().shape({
  username: yup.string().required("نام کاربری الزامیست!"),
  password: yup
    .string()
    .required("رمز عبور را وارد کنید")
    .min(8, "رمز عبور حداقل ۸ کاراکتر میباشد")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@!%&?]).{8,}$/,
      "پسورد باید شامل 8 کارکتر، به همراه حداقل یک حرف خاص (#$@!%&*) ، یک حرف بزرگ ، یک حرف کوچک و بدون space باشد"
    )
    .trim(),
  passwordConfirm: yup
    .string()
    .required(" تکرار رمز عبور را وارد کنید")
    .min(8, "تکرار رمز عبور حداقل ۸ کاراکتر میباشد")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@!%&?]).{8,}$/,
      "پسورد باید شامل 8 کارکتر، به همراه حداقل یک حرف خاص (#$@!%&*) ، یک حرف بزرگ ، یک حرف کوچک و بدون space باشد"
    )
    .oneOf([yup.ref("password")], "تکرار رمز عبور صحیح نمیباشد")
    .trim(),
  email: yup
    .string()
    .required("پست الکترونیکی خود را وارد کنید")
    .trim()
    .email("پست الکترونیکی خود را صحیح وارد کنید"),
});

type AddPlatformUserDialogPropsType = {
  onClose: () => void;
};

export const AddPlatformUserDialog: FC<AddPlatformUserDialogPropsType> = ({
  onClose,
}) => {
  // const { refetchUsersData } = useContext(ServiceUsersContext);

  const [createPlatformUserCreate, { isLoading: createPlatformUserLoading }] =
    usePostApiMyKubesphereUserCreateMutation();

  const submitHandler: formikOnSubmitType<typeof formInitialValues> = ({
    username,
    password,
    email,
  }) => {
    createPlatformUserCreate({
      createKubeUserModel: {
        username: username,
        email: email,
        password: password,
      },
    })
      .unwrap()
      .then(() => {
        // refetchUsersData();
        toast.success("کاربر با موفقیت ایجاد شد");
        onClose();
      });
  };

  return (
    <>
      <Dialog
        open
        onClose={onClose}
        components={{ Backdrop: BlurBackdrop }}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2.5 },
        }}
      >
        <DialogTitle>ایجاد کاربر سرویس</DialogTitle>
        <Formik
          initialValues={{
            username: "",
            password: "",
            email: "",
            passwordConfirm: "",
          }}
          validationSchema={formValidation}
          onSubmit={submitHandler}
        >
          {({ errors, touched, getFieldProps }) => (
            <Form autoComplete="on">
              <Stack p={{ xs: 1.8, md: 3 }} spacing={{ xs: 2, md: 5 }}>
                <Grid2 container spacing={3}>
                  <Grid2 xs={12}>
                    <DorsaTextField
                      inputProps={{ fontSize: "20px !important" }}
                      fullWidth
                      label="پست الکترونیکی"
                      error={Boolean(errors.email && touched.email)}
                      helperText={errors.email}
                      {...getFieldProps("email")}
                    />
                  </Grid2>
                  <Grid2 xs={12}>
                    <DorsaTextField
                      inputProps={{ fontSize: "20px !important" }}
                      fullWidth
                      label="نام کاربری"
                      error={Boolean(errors.username && touched.username)}
                      helperText={errors.username}
                      {...getFieldProps("username")}
                    />
                  </Grid2>
                  <Grid2 xs={12}>
                    <DorsaTextField
                      inputProps={{ fontSize: "20px !important" }}
                      fullWidth
                      type="password"
                      label="رمز عبور"
                      error={Boolean(errors.password && touched.password)}
                      helperText={errors.password}
                      {...getFieldProps("password")}
                    />
                  </Grid2>
                  <Grid2 xs={12}>
                    <DorsaTextField
                      inputProps={{ fontSize: "20px !important" }}
                      fullWidth
                      type="password"
                      label="تکرار رمز عبور"
                      error={Boolean(
                        errors.passwordConfirm && touched.passwordConfirm
                      )}
                      helperText={errors.passwordConfirm}
                      {...getFieldProps("passwordConfirm")}
                    />
                  </Grid2>
                </Grid2>
                <br />
                <DialogActions>
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
                    loading={createPlatformUserLoading}
                    variant="contained"
                    sx={{ px: 3, py: 0.8 }}
                  >
                    ذخیره تغییرات
                  </LoadingButton>
                </DialogActions>
              </Stack>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};
