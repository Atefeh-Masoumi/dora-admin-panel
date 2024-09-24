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
import { FC, SyntheticEvent, useEffect, useState } from "react";
import {
  useGetApiMyAccountRoleListQuery,
  usePostApiMyAccountCustomerUserCreateMutation,
} from "src/app/services/api.generated";
import { Form, Formik } from "formik";
import { formikOnSubmitType } from "src/types/form.type";
import RoleAccessList from "../RoleAccessList";
import PageLoading from "src/components/atoms/PageLoading";
import { toast } from "react-toastify";
import {
  access,
  CHECK_BOX_ENUM,
  roleAccessType,
} from "src/constant/accessModal.constant";

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
      .then(() => {
        toast.success("دسترسی کاربر مورد نظر با موفقیت ایجاد گردید");
        forceClose();
      })
      .catch(() => {});
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

  const radioItems = [
    {
      id: CHECK_BOX_ENUM.SUPER_USER,
      label: "سوپر ادمین - همه دسترسی ها",
      text: "می تواند هر تنظیم را ویرایش کند، خرید کند،‌ صورتحساب را به روز و ویرایش کند",
      value: superUser,
      disable: false,
      onChange: (e: SyntheticEvent<Element, Event>, checked: boolean) => {
        setSuperUser(checked);
        setAccountManager(false);
        setFinancialManager(false);
      },
    },
    {
      id: CHECK_BOX_ENUM.ACCOUNT_MANAGER,
      label: "مدیریت کاربران",
      text: "می تواند به حساب کاربران دسترسی داشته باشد",
      value: accountManager,
      disable: superUser ? true : false,
      onChange: (e: SyntheticEvent<Element, Event>, checked: boolean) => {
        setAccountManager(checked);
        if (checked === true) {
          setSuperUser(false);
        }
      },
    },
    {
      id: CHECK_BOX_ENUM.FINANCIAL_MANAGER,
      label: "مدیریت مالی",
      text: "می تواند صورتحساب را به‌روز و ویرایش کند",
      value: financialManager,
      disable: superUser ? true : false,
      onChange: (e: SyntheticEvent<Element, Event>, checked: boolean) => {
        setFinancialManager(checked);
        if (checked === true) {
          setSuperUser(false);
        }
      },
    },
  ];

  return (
    <Dialog {...dialogProps} sx={{ "& .MuiPaper-root": { maxWidth: "850px" } }}>
      <DialogTitle align="center">افزودن کاربر جدید</DialogTitle>
      <DialogContent>
        <Formik
          validationSchema={formValidation}
          initialValues={formInitialValues}
          onSubmit={onSubmit}
        >
          {({ errors, touched, getFieldProps }) => {
            return (
              <Form autoComplete="on">
                <Stack
                  rowGap={2}
                  columnGap={2}
                  width="100%"
                  direction="column"
                  mt={2}
                >
                  <Stack direction="column" p={1.3} rowGap={1} columnGap={1}>
                    <Box sx={{ width: "100%" }}>
                      <Typography fontSize={12}>
                        از اعضا دعوت کنید تا به همه یا دامنه های خاصی در حساب
                        شما دسترسی داشته باشند
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

                  <Stack direction="column" p={1} rowGap={1} columnGap={1}>
                    <Box sx={{ width: "100%" }}>
                      <Typography>نقش های محدوده حساب</Typography>
                    </Box>
                    <Grid
                      container
                      py={1}
                      rowGap={1}
                      justifyContent="center"
                      alignItems="start"
                      columnGap={1}
                    >
                      {radioItems.map((item, index) => (
                        <Grid
                          key={index}
                          xs={12}
                          md={3.5}
                          item

                          // pr={{ xs: 0, md: 1 }}
                        >
                          <Stack
                            direction="row"
                            alignItems="start"
                            justifyContent="center"
                            spacing={1}
                            sx={{
                              "& .MuiRadio-root": { p: 0 },
                              "& .MuiFormControlLabel-root": { m: 0 },
                            }}
                          >
                            <FormControlLabel
                              disabled={item.disable}
                              control={
                                <Checkbox
                                  sx={{ padding: 0 }}
                                  checked={item.value}
                                  onChange={item.onChange}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              }
                              label=""
                            />
                            <Stack
                              textAlign="start"
                              color={
                                item.value ? "primary.main" : "secondary.main"
                              }
                            >
                              <Typography variant="text14" fontWeight="bold">
                                {item.label}
                              </Typography>
                              <Typography variant="text13">
                                {item.text}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                      ))}
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
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Typography>نقش های محدوده حساب</Typography>
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
