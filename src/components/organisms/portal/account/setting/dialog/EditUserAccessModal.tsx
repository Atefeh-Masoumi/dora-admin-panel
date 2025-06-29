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
import { Form, Formik } from "formik";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetApiMyAccountRoleAccessListByUserIdQuery,
  useGetApiMyAccountRoleListQuery,
  usePutApiMyAccountRoleAccessEditMutation,
} from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import {
  access,
  CHECK_BOX_ENUM,
  roleAccessType,
} from "src/constant/accessModal.constant";
import RoleAccessList from "../RoleAccessList";
import { RoleAccessStateType } from "./CreateUserAccessModal";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import LoadingButton from "src/components/atoms/LoadingButton";

type EditUserAccessModalPropsType = DialogProps & {
  forceClose: () => any;
  userId: string;
  userName: string;
};

export const EditUserAccessModal: FC<EditUserAccessModalPropsType> = ({
  forceClose,
  userId,
  userName,
  ...props
}) => {
  const [roleAccessList, setRoleAccessList] = useState<RoleAccessStateType>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [superUser, setSuperUser] = useState(false);
  const [financialManager, setFinancialManager] = useState(false);
  const [accountManager, setAccountManager] = useState(false);

  const { data: roleList, isLoading: roleListIsLoading } =
    useGetApiMyAccountRoleListQuery();

  const [editCustomerUser, { isLoading: editUserIsLoading }] =
    usePutApiMyAccountRoleAccessEditMutation();

  const {
    data: currentUserRoleAccessList,
    isLoading: customerUserAccessesIsLoading,
  } = useGetApiMyAccountRoleAccessListByUserIdQuery(
    { userId },
    { skip: !userId }
  );

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

    // useEffect(() => {
    //   if (currentUserRoleAccessList) {
    //     setSuperUser(!!currentUserRoleAccessList.isSuperUser);
    //     setAccountManager(!!currentUserRoleAccessList.isAccountManager);
    //     setFinancialManager(!!currentUserRoleAccessList.isFinancialManager);
    //   }

    //   const newRoleAccessList = roleList?.map((role) => {
    //     const currentSelectedRole = currentUserRoleAccessList?.roleAccesses?.find(
    //       (c) => c.roleId === role.id
    //     );
    //     return {
    //       roleId: role.id,
    //       roleName: role.name,
    //       isRoleChecked: currentSelectedRole?.hasAccess || false,
    //       roleAccessTypeId:
    //         currentSelectedRole?.roleAccessTypeId || roleAccessType[0].id,
    //       accessTuples: access.map((item) => {
    //         return {
    //           accessId: item.id,
    //           hasAccess:
    //             currentSelectedRole?.accesses?.find((a) => item.id === a.accessId)
    //               ?.hasAccess || false,
    //           accessName: item.persianName,
    //         };
    //       }),
    //     };
    //   });
    //   newRoleAccessList && setRoleAccessList(newRoleAccessList);
    // }, [roleList, currentUserRoleAccessList]);
  };

  const handleCheckbox = (selectAll: boolean) => {
    setSelectAll(selectAll);
    setAccountManager(false);
    setFinancialManager(false);
    // if (selectAll) {
    //   setSuperUser(true);
    // } else {
    //   setSuperUser(false);
    // }
  };

  const onSubmit = () => {
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
    editCustomerUser({
      editRoleAccessModel: {
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
                  roleAccessTypeId: roleAccess.roleAccessTypeId,
                  roleId: roleAccess?.roleId!,
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
        toast.success("دسترسی کاربر مورد نظر با موفقیت ویرایش گردید");
        forceClose();
      })
      .catch((e) => {});
  };

  useEffect(() => {
    if (currentUserRoleAccessList) {
      setSuperUser(!!currentUserRoleAccessList.isSuperUser);
      setAccountManager(!!currentUserRoleAccessList.isAccountManager);
      setFinancialManager(!!currentUserRoleAccessList.isFinancialManager);
    }

    const newRoleAccessList = roleList?.map((role) => {
      const currentSelectedRole = currentUserRoleAccessList?.roleAccesses?.find(
        (c) => c.roleId === role.id
      );
      return {
        roleId: role.id,
        roleName: role.name,
        isRoleChecked: currentSelectedRole?.hasAccess || false,
        roleAccessTypeId:
          currentSelectedRole?.roleAccessTypeId || roleAccessType[0].id,
        accessTuples: access.map((item) => {
          return {
            accessId: item.id,
            hasAccess:
              currentSelectedRole?.accesses?.find((a) => item.id === a.accessId)
                ?.hasAccess || false,
            accessName: item.persianName,
          };
        }),
      };
    });
    newRoleAccessList && setRoleAccessList(newRoleAccessList);
  }, [roleList, currentUserRoleAccessList, props.open]);

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
      checked: superUser ? true : false,
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
      checked: superUser ? true : false,
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
    <Dialog
      {...props}
      sx={{ p: 3 }}
      fullWidth
      onClose={() => {
        handleReset();
        forceClose();
      }}
    >
      <DialogTitle textAlign="left" sx={{ fontWeight: "bold" }}>
        ویرایش دسترسی های کاربر موجود
      </DialogTitle>
      <DialogContent>
        <Formik initialValues={{}} onSubmit={onSubmit}>
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
                  <Typography>نام کاربری</Typography>
                </Box>
                <DorsaTextField
                  disabled
                  size="small"
                  type="userName"
                  value={userName}
                  fullWidth
                  inputProps={{ dir: "ltr" }}
                />
              </Stack>
              {roleListIsLoading ||
              roleAccessList?.length === 0 ||
              customerUserAccessesIsLoading ? (
                <PageLoading />
              ) : (
                <>
                  <Stack direction="column" p={1} rowGap={1} columnGap={1}>
                    <Box sx={{ width: "100%" }}>
                      <Typography>نقش های محدوده حساب</Typography>
                    </Box>
                    <Grid container py={1} rowGap={1} justifyContent="center">
                      {/* <Grid xs={12} md={6} item pr={{ xs: 0, md: 1 }}>
                        <Box
                          p={1.3}
                          pt={0.1}
                          sx={{
                            width: "100%",
                            height: "100%",
                            // border: ({ palette }) => `1px solid #ccc`,
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
                          <Typography px={2}>
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
                            // border: ({ palette }) => `1px solid #ccc`,
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
                            sx={
                              superUser
                                ? {
                                    color: ({ palette }) => palette.grey[500],
                                  }
                                : {
                                    color: "#000",
                                  }
                            }
                          >
                            می تواند به حساب کاربران دسترسی داشته باشد
                          </Typography>
                        </Box>
                      </Grid> */}
                      <Grid container spacing={2}>
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

                    <RoleAccessList
                      {...{
                        setRoleAccessList,
                        roleAccessList,
                        disabled: superUser,
                      }}
                    />
                  </Stack>
                </>
              )}
              <Stack direction="row" justifyContent="end" spacing={1}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ px: 3, py: 0.8 }}
                  onClick={() => {
                    forceClose();
                    handleReset();
                  }}
                >
                  انصراف
                </Button>
                <LoadingButton
                  type="submit"
                  loading={editUserIsLoading}
                  variant="contained"
                  sx={{ px: 3, py: 0.8 }}
                >
                  ذخیره
                </LoadingButton>
              </Stack>
            </Stack>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
