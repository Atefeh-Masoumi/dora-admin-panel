import {
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Dispatch, FC, SetStateAction, memo } from "react";
import { RoleAccessStateType } from "./dialog/CreateUserAccessModal";
import { roleAccessType } from "src/constant/accessModal.constant";

type RoleAccessListPropsType = {
  roleAccessList: RoleAccessStateType;
  setRoleAccessList: Dispatch<SetStateAction<RoleAccessStateType>>;
};

const RoleAccessList: FC<RoleAccessListPropsType> = ({
  roleAccessList,
  setRoleAccessList,
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
      {roleAccessList?.map((roleAccess) => (
        <Stack
          key={roleAccess.roleName}
          px={1}
          direction={{ xs: "column", md: "row" }}
          sx={{
            alignItems: "center",
            border: ({ palette }) => `1px solid #ccc`,
          }}
        >
          <Stack
            flexGrow={1}
            direction="row"
            flexWrap="wrap"
            justifyContent={{ xs: "center", md: "space-between" }}
          >
            <Stack sx={{ alignContent: "center", alignItems: "center" }}>
              <FormControlLabel
                sx={{ alignItems: "center", width: 150 }}
                control={
                  <Checkbox
                    onChange={(e) =>
                      handleRoleChange(roleAccess.roleId, e.target.checked)
                    }
                    checked={roleAccess?.isRoleChecked}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "14px" }} noWrap>
                    {roleAccess.roleName}
                  </Typography>
                }
              />
            </Stack>
            <Stack mt={1}>
              <FormControl size="medium">
                <Select
                  disabled={!roleAccess?.isRoleChecked}
                  defaultValue={roleAccessType[0].id}
                  sx={{
                    height: "25px",
                    width: "165px",
                    "& .MuiSelect-outlined": {
                      padding: "8.5px 3px",
                      fontSize: "10px",
                    },
                  }}
                  onChange={(e) =>
                    handleRoleAccessTypeChange(
                      roleAccess.roleId,
                      +e.target.value
                    )
                  }
                  value={roleAccess.roleAccessTypeId}
                >
                  {roleAccessType.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.persianName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack sx={{ display: "flex", flexDirection: "row" }}>
              {roleAccess.accessTuples.map((access) => (
                <FormControlLabel
                  key={access.accessId}
                  sx={{
                    alignItems: "center",
                    width: "70px",
                    margin: "0 7px",
                  }}
                  control={
                    <Checkbox
                      disabled={!roleAccess?.isRoleChecked}
                      checked={access.hasAccess}
                      onChange={(e) =>
                        handleAccessChange(
                          roleAccess.roleId,
                          access.accessId,
                          e.target.checked
                        )
                      }
                      sx={{ paddingRight: "1px" }}
                    />
                  }
                  label={access.accessName}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      ))}
    </>
  );
};

export default memo(RoleAccessList);
