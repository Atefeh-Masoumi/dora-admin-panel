import { FC } from "react";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  CommonSelectPropsType,
  KeyListInResourceType,
  ResourceListType,
} from "src/types/kubernetesCloud.types";
import { DeleteOutline } from "@mui/icons-material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";

type SelectEnvValuePropsType = CommonSelectPropsType & {
  keyListInResource?: KeyListInResourceType;
  isResourceSelectionRequired?: boolean;
  selectedResourceItem?: number | null;
  handleResourceOnChange?: (resourceId: number) => void;
  resourceList?: ResourceListType;
  onDelete?: () => void;
};

export const SelectEnvValue: FC<SelectEnvValuePropsType> = ({
  keyListInResource,
  value,
  onChange,
  isResourceSelectionRequired,
  selectedResourceItem,
  handleResourceOnChange,
  resourceList,
  onDelete,
}) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const gridItems = [
    {
      label: "Value",
      id: "value-select",
      value: Number(value),
      onChange: (newValue: string | number) => onChange && onChange(newValue),
      menuList: keyListInResource,
      menuItemKey: "key",
    },
    {
      label: "Resource",
      id: "resource-select",
      value: selectedResourceItem || "",
      onChange: (newValue: string | number) =>
        handleResourceOnChange && handleResourceOnChange(Number(newValue)),
      menuList: resourceList,
      menuItemKey: "name",
    },
  ];
  return (
    <Stack direction="row">
      <IconButton onClick={onDelete}>
        <DeleteOutline color="error" />
      </IconButton>
      {isResourceSelectionRequired ? (
        <Grid container spacing={2}>
          {[...(!isSm ? gridItems.reverse() : gridItems)].map(
            ({ label, id, value, onChange, menuList, menuItemKey }) => (
              <Grid key={id} item xs={12} sm={6} md={6} lg={6}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="value-select">{label}</InputLabel>
                  <Select
                    label={label}
                    id={id}
                    dir="ltr"
                    value={Number(value)}
                    onChange={(e) => onChange(e.target.value)}
                    sx={{
                      "& .MuiSelect-select": {
                        fontSize: "14px",
                      },
                      "& .MuiMenuItem-root": {
                        fontSize: "10px",
                      },
                    }}
                  >
                    {menuList?.map((item, index) => (
                      <MenuItem
                        key={index}
                        sx={{
                          justifyContent: "end",
                          bgColor: "primary.contrastText",
                        }}
                        value={item.id}
                      >
                        {item[menuItemKey as keyof typeof item]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )
          )}
        </Grid>
      ) : (
        <DorsaTextField
          sx={{
            background: ({ palette }) => palette.primary.contrastText,
          }}
          placeholder="Custom Value"
          dir="ltr"
          size="small"
          fullWidth
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      )}
    </Stack>
  );
};
