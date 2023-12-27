import { FC, useContext } from "react";
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
import { EditStorageContext } from "../../contexts/EditStorageContext";
import { usePostApiMyRabbitUserCreateMutation } from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";

const formInitialValues = {
  username: "",
  password: "",
};

const formValidation = yup.object().shape({
  username: yup.string().required("نام کاربری الزامیست!"),
  password: yup.string().required("رمز عبور الزامیست!"),
});

type AddRabbitUserDialogPropsType = {
  onClose: () => void;
};

export const AddRabbitUserDialog: FC<AddRabbitUserDialogPropsType> = ({
  onClose,
}) => {
  const [createRabbitUserCreate, { isLoading: createRabbitUserLoading }] =
    usePostApiMyRabbitUserCreateMutation();

  const { serverId } = useContext(EditStorageContext);

  const submitHandler: formikOnSubmitType<typeof formInitialValues> = ({
    username,
    password,
  }) => {
    if (!serverId) {
      return;
    }

    createRabbitUserCreate({
      createRabbitUserModel: {
        rabbitHostId: serverId,
        username: username,
        password: password,
      },
    })
      .unwrap()
      .then(() => {
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
        <DialogTitle>ایجاد کاربر سرویس RabbitMQ</DialogTitle>
        <Formik
          initialValues={{
            username: "",
            password: "",
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
                      label="رمز عبور"
                      error={Boolean(errors.password && touched.password)}
                      helperText={errors.password}
                      {...getFieldProps("password")}
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
                    loading={createRabbitUserLoading}
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
