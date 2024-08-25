import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { FC, useEffect, useState } from "react";
import {
  useGetApiMyAccountRoleListQuery,
  usePostApiMyAccountCustomerUserCreateMutation,
} from "src/app/services/api.generated";
import { Form, Formik } from "formik";
import { formikOnSubmitType } from "src/types/form.type";
import RoleAccessList from "../RoleAccessList";
import PageLoading from "src/components/atoms/PageLoading";
import { toast } from "react-toastify";
import { access, roleAccessType } from "src/constant/accessModal.constant";

type CreateUserAccessModalPropsType = {
  dialogProps: DialogProps;
  forceClose: () => any;
};

export type RoleAccessStateType = {
  roleId: number | undefined;
  roleName: string | null | undefined;
  isRoleChecked: boolean;
  roleAccessTypeId: number;
  accessTuples: {
    accessId: number;
    hasAccess: boolean;
    accessName: string;
  }[];
}[];

export const CreateUserAccessModal: FC<CreateUserAccessModalPropsType> = ({
  dialogProps,
  forceClose,
}) => {
  const [roleAccessList, setRoleAccessList] = useState<RoleAccessStateType>([]);

  const { data: roleList, isLoading: roleListIsLoading } =
    useGetApiMyAccountRoleListQuery();

  const [createCustomerUser, { isLoading: createUserIsLoading }] =
    usePostApiMyAccountCustomerUserCreateMutation();

  const [superUser, setSuperUser] = useState(false);
  const [financialManager, setFinancialManager] = useState(false);
  const [accountManager, setAccountManager] = useState(false);

  const formValidation = yup.object().shape({
    userName: yup.string().required("نام کاربری الزامی است"),
    // .userName("نام کاربری وارد شده صحیح نیست"),
  });

  const formInitialValues = {
    userName: "",
  };

  useEffect(() => {
    const newRoleAccessList = roleList?.map((role) => {
      return {
        roleId: role.id,
        roleName: role.name,
        isRoleChecked: false,
        roleAccessTypeId: roleAccessType[0].id,
        accessTuples: access.map((item) => {
          return {
            accessId: item.id,
            hasAccess: false,
            accessName: item.persianName,
          };
        }),
      };
    });
    newRoleAccessList && setRoleAccessList(newRoleAccessList);
  }, [roleList]);

  const onSubmit: formikOnSubmitType<typeof formInitialValues> = (
    { userName },
    { resetForm }
  ) => {
    const inCompletedRoleAccess = roleAccessList.find(
      (roleAccess) =>
        roleAccess.isRoleChecked &&
        roleAccess.accessTuples.every((x) => !x.hasAccess)
    );
    if (inCompletedRoleAccess && !superUser) {
      toast.error(
        `به نقش ${inCompletedRoleAccess.roleName} هیچ یک از دسترسی های چهارگانه را نداده اید`
      );
      return;
    }
    createCustomerUser({
      createCustomerUserModel: {
        userName,
        isSuperUser: superUser,
        isAccountManager: superUser ? false : accountManager,
        isFinancialManager: superUser ? false : financialManager,
        roleAccesses: superUser
          ? []
          : roleAccessList
              ?.filter((roleAccess) => roleAccess.isRoleChecked)
              ?.map((roleAccess) => {
                return {
                  roleId: roleAccess?.roleId!,
                  roleAccessTypeId: roleAccess.roleAccessTypeId,
                  accessTuples: roleAccess.accessTuples.map((access) => {
                    return {
                      accessId: access.accessId,
                      hasAccess: access.hasAccess,
                    };
                  }),
                };
              }),
      },
    })
      .unwrap()
      .then((res) => {
        toast.success("دسترسی کاربر مورد نظر با موفقیت ایجاد گردید");
        forceClose();
      })
      .catch((e) => {});
  };

  return (
    <Dialog {...dialogProps} sx={{ "& .MuiPaper-root": { maxWidth: "750px" } }}>
      <DialogTitle align="center">افزودن کاربر جدید</DialogTitle>
      <DialogContent>
        <Stack direction="column" rowGap={2}>
          <Divider flexItem />
        </Stack>
        <Formik
          validationSchema={formValidation}
          initialValues={formInitialValues}
          onSubmit={onSubmit}
        >
          {({ errors, touched, getFieldProps, setFieldValue }) => {
            return (
              <Form autoComplete="on">
                <Stack
                  rowGap={2}
                  columnGap={2}
                  width="100%"
                  direction="column"
                  mt={2}
                >
                  <Stack
                    direction="column"
                    p={1.3}
                    rowGap={1}
                    columnGap={1}
                    sx={{
                      border: ({ palette }) => `1px solid #ccc`,
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Typography>افزودن کاربر</Typography>
                      <Typography fontSize={12}>
                        از اعضا دعوت کنید تا به همه یا دامنه های خاصی در حساب
                        شما دسترسی داشته باشند{" "}
                      </Typography>
                    </Box>
                    <TextField
                      {...getFieldProps("userName")}
                      size="small"
                      type="userName"
                      label="نام کاربری *"
                      fullWidth
                      inputProps={{ dir: "ltr" }}
                      error={Boolean(errors.userName && touched.userName)}
                      helperText={touched.userName && errors.userName}
                    />
                  </Stack>
                  <Stack
                    direction="column"
                    p={1}
                    rowGap={1}
                    columnGap={1}
                    sx={{
                      border: ({ palette }) => `1px solid #ccc`,
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Typography>نقش های محدوده حساب</Typography>
                      <Typography fontSize={12}>
                        نقش دسترسی کاربر را انتخاب کنید
                      </Typography>
                    </Box>
                    <Grid container py={1} rowGap={1} justifyContent="center">
                      <Grid xs={12} md={6} item pr={{ xs: 0, md: 1 }}>
                        <Box
                          p={1.3}
                          pt={0.1}
                          sx={{
                            width: "100%",
                            height: "100%",
                            border: ({ palette }) => `1px solid #ccc`,
                          }}
                        >
                          <FormControlLabel
                            sx={{ alignItems: "center" }}
                            control={
                              <Checkbox
                                checked={superUser}
                                onChange={(e) => {
                                  setSuperUser(e.target.checked);
                                  setAccountManager(false);
                                  setFinancialManager(false);
                                }}
                                sx={{ padding: "0px", paddingRight: "3px" }}
                              />
                            }
                            label="سوپر ادمین - همه دسترسی ها"
                          />
                          <Typography fontSize={12} px={2}>
                            می تواند هر تنظیم را ویرایش کند، خرید کند،‌ صورتحساب
                            را به روز و ویرایش کند
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid xs={12} md={6} item>
                        <Box
                          p={1.3}
                          pt={0.1}
                          sx={{
                            width: "100%",
                            height: "100%",
                            border: ({ palette }) => `1px solid #ccc`,
                          }}
                        >
                          <FormControlLabel
                            sx={{ alignItems: "center" }}
                            control={
                              <Checkbox
                                disabled={superUser}
                                checked={accountManager}
                                onChange={(e) =>
                                  setAccountManager(e.target.checked)
                                }
                                sx={{ padding: "0px", paddingRight: "3px" }}
                              />
                            }
                            label=" مدیریت کاربران"
                          />
                          <Typography
                            px={2}
                            fontSize={12}
                            sx={
                              superUser
                                ? {
                                    color: ({ palette }) => palette.grey[500],
                                  }
                                : { color: "#000" }
                            }
                          >
                            می تواند به حساب کاربران دسترسی داشته باشد
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid xs={12} item>
                        <Box
                          p={1.3}
                          pt={0.1}
                          sx={{
                            width: "100%",
                            height: "100%",
                            border: ({ palette }) => `1px solid #ccc`,
                          }}
                        >
                          <FormControlLabel
                            sx={{ alignItems: "center" }}
                            control={
                              <Checkbox
                                disabled={superUser}
                                checked={financialManager}
                                onChange={(e) =>
                                  setFinancialManager(e.target.checked)
                                }
                                sx={{ padding: "0px", paddingRight: "3px" }}
                              />
                            }
                            label="مدیریت مالی"
                          />
                          <Typography
                            fontSize={12}
                            sx={
                              superUser
                                ? {
                                    color: ({ palette }) => palette.grey[500],
                                  }
                                : {
                                    color: "#000",
                                  }
                            }
                            px={2}
                          >
                            می تواند صورتحساب را به روز و ویرایش کند
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Divider flexItem />
                  <Stack
                    direction="column"
                    p={1}
                    rowGap={1}
                    columnGap={1}
                    sx={{
                      display: superUser ? "none" : "flex",
                      border: ({ palette }) => `1px solid #ccc`,
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Typography>نقش های محدوده حساب</Typography>
                      <Typography fontSize={12}>
                        نقش دسترسی کاربر را انتخاب کنید
                      </Typography>
                    </Box>
                    {roleListIsLoading || roleAccessList?.length === 0 ? (
                      <PageLoading />
                    ) : (
                      <RoleAccessList
                        {...{ setRoleAccessList, roleAccessList }}
                      />
                    )}
                  </Stack>
                  <Divider
                    sx={{ display: superUser ? "none" : "flex" }}
                    flexItem
                  />
                  <Stack
                    rowGap={1}
                    columnGap={1}
                    sx={{ flexWrap: "wrap", justifyContent: "space-around" }}
                  >
                    <LoadingButton
                      sx={{
                        minWidth: "160px",
                        flexGrow: 1,
                      }}
                      type="submit"
                      loading={createUserIsLoading}
                      variant="contained"
                    >
                      تایید
                    </LoadingButton>
                    <LoadingButton
                      onClick={() => forceClose()}
                      sx={{
                        minWidth: "160px",
                        flexGrow: 1,
                      }}
                      type="button"
                      variant="outlined"
                    >
                      انصراف
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
