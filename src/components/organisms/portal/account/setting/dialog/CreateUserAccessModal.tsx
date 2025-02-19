import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import {
  useGetApiMyAccountRoleListQuery,
  usePostApiMyAccountCustomerUserCreateMutation,
} from "src/app/services/api.generated";
import { useFormik } from "formik";
import { formikOnSubmitType } from "src/types/form.type";
import RoleAccessList from "../RoleAccessList";
import PageLoading from "src/components/atoms/PageLoading";
import { toast } from "react-toastify";
import {
  access,
  CHECK_BOX_ENUM,
  roleAccessType,
} from "src/constant/accessModal.constant";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import LoadingButton from "src/components/atoms/LoadingButton";

type CreateUserAccessModalPropsType = DialogProps & {
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
  forceClose,
  ...props
}) => {
  const [roleAccessList, setRoleAccessList] = useState<RoleAccessStateType>([]);

  const { data: roleList, isLoading: roleListIsLoading } =
    useGetApiMyAccountRoleListQuery();

  const [createCustomerUser, { isLoading: createUserIsLoading }] =
    usePostApiMyAccountCustomerUserCreateMutation();

  const [superUser, setSuperUser] = useState(false);
  const [financialManager, setFinancialManager] = useState(false);
  const [accountManager, setAccountManager] = useState(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  // const initialRoleAccessList: RoleAccessStateType = [];

  // const handleClose: DialogProps["onClose"] = (event, reason) => {
  //   if (reason && reason === "backdropClick") {
  //     setSuperUser(false);
  //     setFinancialManager(false);
  //     setAccountManager(false);
  //     setSelectAll(false);
  //     return;
  //   }
  // }

  const handleReset = () => {
    setSuperUser(false);
    setFinancialManager(false);
    setAccountManager(false);
    setSelectAll(false);
    setRoleAccessList((prevList) =>
      prevList.map((role) => ({
        ...role,
        isRoleChecked: false,
        accessTuples: role.accessTuples.map((access) => ({
          ...access,
          hasAccess: false,
        })),
      }))
    );
  };

  const handleCheckbox = (selectAll: boolean) => {
    setSelectAll(selectAll);
    setAccountManager(false);
    setFinancialManager(false);
    if (selectAll) {
      setSuperUser(true);
    } else {
      setSuperUser(false);
    }
  };

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
        handleReset();
        resetForm();
      })
      .catch(() => {});
  };

  useEffect(() => {
    const newRoleAccessList = roleList?.map((role) => {
      return {
        roleId: role.id,
        roleName: role.name,
        isRoleChecked: selectAll ? true : false,
        roleAccessTypeId: roleAccessType[0].id,
        accessTuples: access.map((item) => {
          return {
            accessId: item.id,
            hasAccess: selectAll ? true : false,
            accessName: item.persianName,
          };
        }),
      };
    });

    newRoleAccessList && setRoleAccessList(newRoleAccessList);
  }, [selectAll]);

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
      label: (
        <Typography
          sx={{ color: superUser ? "gray" : "inherit", fontWeight: "bold" }}
        >
          سوپر ادمین
        </Typography>
      ),
      text: (
        <Typography sx={{ color: superUser ? "gray" : "inherit" }}>
          می تواند هر تنظیم را ویرایش کند، خرید کند،‌ صورتحساب را به روز و
          ویرایش کند
        </Typography>
      ),
      value: superUser,
      disable: false,
      onChange: (e: SyntheticEvent<Element, Event>, checked: boolean) => {
        setSuperUser(checked);
        setAccountManager(checked);
        setFinancialManager(checked);
        setSelectAll(checked);
      },
    },
    {
      id: CHECK_BOX_ENUM.ACCOUNT_MANAGER,
      label: (
        <Typography
          sx={{ color: superUser ? "gray" : "inherit", fontWeight: "bold" }}
        >
          مدیریت کاربران
        </Typography>
      ),
      text: (
        <Typography sx={{ color: superUser ? "gray" : "inherit" }}>
          می تواند به حساب کاربران دسترسی داشته باشد
        </Typography>
      ),
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
      label: (
        <Typography
          sx={{ color: superUser ? "gray" : "inherit", fontWeight: "bold" }}
        >
          مدیریت مالی
        </Typography>
      ),
      text: (
        <Typography sx={{ color: superUser ? "gray" : "inherit" }}>
          می تواند صورتحساب را به‌روز و ویرایش کند
        </Typography>
      ),
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

  const formik = useFormik({
    initialValues: formInitialValues,
    validationSchema: formValidation,
    onSubmit,
  });

  return (
    <Dialog
      {...props}
      sx={{ p: 3 }}
      fullWidth
      onClose={() => {
        handleReset();
        formik.resetForm();
        forceClose();
      }}
    >
      <DialogTitle textAlign="left" sx={{ fontWeight: "bold" }}>
        افزودن
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            rowGap={2}
            columnGap={2}
            width="100%"
            direction="column"
            mt={2}
          >
            <Stack direction="column" p={1} rowGap={1} columnGap={1}>
              <Box sx={{ width: "100%" }}>
                <Typography fontSize={12}>
                  از اعضا دعوت کنید تا به همه یا دامنه های خاصی در حساب شما
                  دسترسی داشته باشند
                </Typography>
              </Box>
              <DorsaTextField
                {...formik.getFieldProps("userName")}
                size="small"
                type="userName"
                label="نام کاربری *"
                fullWidth
                inputProps={{ dir: "ltr" }}
                error={Boolean(
                  formik.errors.userName && formik.touched.userName
                )}
                helperText={formik.touched.userName && formik.errors.userName}
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
              >
                {radioItems.map((item, index) => (
                  <Grid
                    key={index}
                    xs={12}
                    md={4}
                    item
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      textAlign: "start",
                      whiteSpace: "normal",
                    }}
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
                        color={item.value ? "primary.main" : "secondary.main"}
                      >
                        <Typography variant="text14" fontWeight="bold">
                          {item.label}
                        </Typography>
                        <Typography variant="text13">{item.text}</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Stack>

            <Divider flexItem />

            <Stack direction="column" p={1} rowGap={1} columnGap={1}>
              <Box sx={{ width: "100%" }}>
                <Typography>سطح‌های دسترسی</Typography>
              </Box>
              <Box sx={{ padding: 0, margin: 0 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectAll}
                      disabled={superUser ? true : false}
                      onChange={(e, checked) => {
                        handleCheckbox(checked);
                        if (checked === true) {
                          setSuperUser(false);
                        }
                      }}
                    />
                  }
                  label="همه"
                />
              </Box>
              {roleListIsLoading || roleAccessList?.length === 0 ? (
                <PageLoading />
              ) : (
                <RoleAccessList
                  {...{
                    setRoleAccessList,
                    roleAccessList,
                    disabled: superUser,
                  }}
                />
              )}
            </Stack>
            <Stack direction="row" justifyContent="end" spacing={1}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ px: 3, py: 0.8 }}
                onClick={() => {
                  handleReset();
                  forceClose();
                }}
              >
                انصراف
              </Button>
              <LoadingButton
                type="submit"
                loading={createUserIsLoading}
                variant="contained"
                sx={{ px: 3, py: 0.8 }}
              >
                ذخیره
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
