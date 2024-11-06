import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Dispatch, FC, SetStateAction, memo } from "react";
import { RoleAccessStateType } from "./dialog/CreateUserAccessModal";
import { roleAccessType } from "src/constant/accessModal.constant";

type RoleAccessListPropsType = {
  roleAccessList: RoleAccessStateType;
  setRoleAccessList: Dispatch<SetStateAction<RoleAccessStateType>>;
  disabled: boolean;
};

const RoleAccessList: FC<RoleAccessListPropsType> = ({
  roleAccessList,
  setRoleAccessList,
  disabled,
}) => {
  const handleRoleChange = (roleId: number | undefined, isChecked: boolean) => {
    const newRoleAccessList = roleAccessList?.map((roleAccess) => {
      return {
        ...roleAccess,
        accessTuples: roleAccess.accessTuples.map((tup) => {
          return {
            accessId: tup.accessId,
            accessName: tup.accessName,
            hasAccess:
              roleAccess.roleId === roleId && !isChecked
                ? false
                : tup.hasAccess,
          };
        }),
        isRoleChecked:
          roleAccess.roleId === roleId ? isChecked : roleAccess.isRoleChecked,
      };
    });
    setRoleAccessList(newRoleAccessList);
  };

  const handleRoleAccessTypeChange = (
    roleId: number | undefined,
    roleAccessTypeId: number
  ) => {
    const newRoleAccessList = roleAccessList?.map((roleAccess) => {
      return {
        ...roleAccess,
        roleAccessTypeId:
          roleAccess.roleId === roleId
            ? roleAccessTypeId
            : roleAccess.roleAccessTypeId,
      };
    });
    setRoleAccessList(newRoleAccessList);
  };

  const handleAccessChange = (
    roleId: number | undefined,
    accessId: number,
    isChecked: boolean
  ) => {
    const newRoleAccessList = roleAccessList?.map((roleAccess) => {
      return {
        ...roleAccess,
        accessTuples:
          roleAccess.roleId === roleId
            ? roleAccess.accessTuples?.map((access) => {
                return {
                  ...access,
                  hasAccess:
                    access.accessId === accessId ? isChecked : access.hasAccess,
                };
              })
            : roleAccess.accessTuples,
      };
    });
    setRoleAccessList(newRoleAccessList);
  };

  return (
    <>
      {roleAccessList?.map((roleAccess, index) => (
        <Grid
          key={index}
          container
          justifyContent="space-around"
          alignItems="center"
          columnGap={1}
          sx={{ width: "100%" }}
        >
          <Grid item xs={12} sm={12} md={2.5}>
            <FormControlLabel
              sx={{ alignItems: "center", width: "100%", mr: 0 }}
              control={
                <Checkbox
                  onChange={(e) =>
                    handleRoleChange(roleAccess.roleId, e.target.checked)
                  }
                  checked={roleAccess?.isRoleChecked}
                />
              }
              label={
                <Typography
                  variant="text14"
                  noWrap
                  sx={{
                    color: disabled ? "gray" : "inherit",
                  }}
                >
                  {roleAccess.roleName}
                </Typography>
              }
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FormControl fullWidth>
              <Select
                disabled={!roleAccess?.isRoleChecked || disabled}
                defaultValue={roleAccessType[0].id}
                sx={{
                  height: "30px",
                  "& .MuiSelect-outlined": {
                    fontSize: "14px",
                    color: disabled ? "gray" : "inherit",
                  },
                }}
                onChange={(e) =>
                  handleRoleAccessTypeChange(roleAccess.roleId, +e.target.value)
                }
                value={roleAccess.roleAccessTypeId}
              >
                {roleAccessType.map((item) => (
                  <MenuItem value={item.id} key={item.id} sx={{
                    color: disabled ? "gray" : "inherit",
                  }}>
                    {item.persianName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={5} display="flex" justifyContent="end">
            {roleAccess.accessTuples.map((access) => (
              <FormControlLabel
                key={access.accessId}
                sx={{
                  alignItems: "center",
                  // width: "70px",
                  // margin: "0 7px",
                }}
                control={
                  <Checkbox
                    disabled={!roleAccess?.isRoleChecked || disabled}
                    checked={access.hasAccess}
                    onChange={(e) =>
                      handleAccessChange(
                        roleAccess.roleId,
                        access.accessId,
                        e.target.checked
                      )
                    }
                    sx={{ paddingRight: 0 }}
                  />
                }
                label={
                  <Typography
                    color={!roleAccess?.isRoleChecked || disabled ? "grey" : ""}
                    variant="text13"
                  >
                    {access.accessName}
                  </Typography>
                }
              />
            ))}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default memo(RoleAccessList);
