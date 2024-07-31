import { FC, useState } from "react";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import { FormikProps } from "formik";
import AddIcon from "@mui/icons-material/Add";
import { CustomCreate_D_NatInitialValueType } from "src/constant/vpc";
import { GetApiMyVpcTranslateListApiResponse } from "src/app/services/api.generated";
import { convertToLabelId } from "src/utils/convertToLabelId.utils";
import { CreateNatServiceDialog } from "../dialogs/CreateNatServiceDialog";

type SelectNatServicePropsType = {
  formik: FormikProps<CustomCreate_D_NatInitialValueType>;
  natServiceList?: GetApiMyVpcTranslateListApiResponse;
};

export const SelectNatService: FC<SelectNatServicePropsType> = ({
  formik,
  natServiceList = [],
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <>
      <Autocomplete
        value={
          convertToLabelId(natServiceList).find(
            (item) => item.id === formik.values.vpcHostServiceId
          ) || null
        }
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        onChange={(e, value) => {
          formik.setFieldTouched("vpcHostServiceId", true);
          formik.setFieldValue("vpcHostServiceId", value?.id);
        }}
        size="small"
        disablePortal
        options={convertToLabelId(natServiceList)}
        fullWidth
        onClick={() => {
          formik.setFieldTouched("vpcHostServiceId", true);
        }}
        onBlur={(e) => {
          formik.handleBlur(e);
          formik.setFieldTouched("vpcHostServiceId", false);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={"service"}
            error={Boolean(
              formik.touched["vpcHostServiceId"] &&
                !!formik.errors["vpcHostServiceId"]
            )}
            sx={
              {
                //   "& .MuiInputBase-input": {
                //     textAlign: "end",
                //   },
                //   "& .MuiInputLabel-root": {
                //     width: "100%",
                //     textAlign: "center",
                //   },
              }
            }
            helperText={formik.errors["vpcHostServiceId"]}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  {params.InputProps.endAdornment}
                  <IconButton
                    sx={{
                      p: 0,
                    }}
                    disableTouchRipple
                    onClick={handleOpenDialog}
                  >
                    <AddIcon fontSize="medium" />
                  </IconButton>
                </>
              ),
            }}
          />
        )}
      />
      <CreateNatServiceDialog
        forceClose={() => setOpen(false)}
        onClose={handleCloseDialog}
        open={open}
      />
    </>
  );
};
