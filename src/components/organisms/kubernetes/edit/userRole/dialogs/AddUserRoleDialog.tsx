import { FC, useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  MenuItem,
  Stack,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { Form, Formik } from "formik";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import {
  usePostPortalKubeUserRoleCreateMutation,
  useGetPortalKubeUserShortListQuery,
} from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
import { UserRoleContext } from "../../UserRole";

const formInitialValues = {
  selectedUser: 0,
};

type AddUserRoleDialogPropsType = {
  onClose: () => void;
  hostId: number;
};

export const AddUserRoleDialog: FC<AddUserRoleDialogPropsType> = ({
  onClose,
  hostId,
}) => {
  const { refetchUsersData } = useContext(UserRoleContext);

  const { data: userList } = useGetPortalKubeUserShortListQuery();

  const [
    createUserUserRoleCreate,
    { isLoading: createUserUserRoleLoading },
  ] = usePostPortalKubeUserRoleCreateMutation();

  const submitHandler: formikOnSubmitType<typeof formInitialValues> = ({
    selectedUser,
  }) => {
    if (selectedUser !== 0) {
      createUserUserRoleCreate({
        createKubeUserRoleModel: {
          kubeUserId: selectedUser,
          kubeHostId: +hostId,
        },
      })
        .unwrap()
        .then(() => {
          refetchUsersData();
          toast.success("دسترسی با موفقیت ایجاد شد");
          onClose();
        });
    } else {
      toast.warning("یک مورد را انتخاب کنید");
    }
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
        <DialogTitle>ایجاد دسترسی به کاربر </DialogTitle>
        <Formik
          initialValues={{
            selectedUser: 0,
          }}
          onSubmit={submitHandler}
        >
          {({ errors, touched, getFieldProps }) => (
            <Form autoComplete="on">
              <Stack p={{ xs: 1.8, md: 3 }} spacing={{ xs: 2, md: 5 }}>
                <Grid2 container spacing={3}>
                  <Grid2 xs={12}>
                    <DorsaTextField
                      inputProps={{ fontSize: "20px !important" }}
                      select
                      fullWidth
                      label="انتخاب کاربر"
                      error={Boolean(
                        errors.selectedUser && touched.selectedUser
                      )}
                      helperText={errors.selectedUser}
                      {...getFieldProps("selectedUser")}
                    >
                      {userList?.map(({ id, name }) => (
                        <MenuItem
                          key={id}
                          value={id}
                          sx={{
                            direction: "rtl",
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
                          {name}
                        </MenuItem>
                      ))}
                    </DorsaTextField>
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
                    loading={createUserUserRoleLoading}
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
