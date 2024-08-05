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
import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetApiMyPortalRoleAccessListByUserIdQuery,
  useGetApiMyPortalRoleListQuery,
  usePutApiMyPortalRoleAccessEditMutation,
} from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import { access, roleAccessType } from "src/constant/accessModal.constant";
import RoleAccessList from "../RoleAccessList";
import { RoleAccessStateType } from "./CreateUserAccessModal";

type EditUserAccessModalPropsType = {
  dialogProps: DialogProps;
  forceClose: () => any;
  userId: string;
  userName: string;
};

export const EditUserAccessModal: FC<EditUserAccessModalPropsType> = ({
  dialogProps,
  forceClose,
  userId,
  userName,
}) => {
  const [roleAccessList, setRoleAccessList] = useState<RoleAccessStateType>([]);

  const { data: roleList, isLoading: roleListIsLoading } =
    useGetApiMyPortalRoleListQuery();

  const [editCustomerUser, { isLoading: editUserIsLoading }] =
    usePutApiMyPortalRoleAccessEditMutation();

  const {
    data: currentUserRoleAccessList,
    isLoading: customerUserAccessesIsLoading,
  } = useGetApiMyPortalRoleAccessListByUserIdQuery(
    { userId },
    { skip: !userId }
  );

  const [superUser, setSuperUser] = useState(false);
  const [financialManager, setFinancialManager] = useState(false);
  const [accountManager, setAccountManager] = useState(false);

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
  }, [roleList, currentUserRoleAccessList]);

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

  return (
    <Dialog {...dialogProps} sx={{ "& .MuiPaper-root": { maxWidth: "750px" } }}>
      <DialogTitle align="center">ویرایش دسترسی های کاربر موجود</DialogTitle>
      <DialogContent>
        <Stack direction="column" rowGap={2}>
          <Divider flexItem />
        </Stack>
        <Formik initialValues={{}} onSubmit={onSubmit}>
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
                  <Typography>نام کاربری</Typography>
                </Box>
                <TextField
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
                      <Typography>نقش دسترسی کاربر را انتخاب کنید</Typography>
                    </Box>

                    <RoleAccessList
                      {...{ setRoleAccessList, roleAccessList }}
                    />
                  </Stack>
                </>
              )}

              <Divider sx={{ display: superUser ? "none" : "flex" }} flexItem />
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
                  loading={editUserIsLoading}
                  variant="contained"
                >
                  ویرایش
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
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
