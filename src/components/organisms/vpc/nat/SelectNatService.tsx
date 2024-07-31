import { FC, useState } from "react";
import {
  Autocomplete,
  IconButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { FormikProps } from "formik";

import { convertToLabelId } from "src/utils/convertToLabelId.utils";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { commonType } from "src/types/common.type";
import { CreateVpcGatewayDnatModel, GetApiMyVpcTranslateListApiResponse, useDeleteApiMyVpcTranslateDeleteByIdMutation } from "src/app/services/api.generated";
import { CreateNatServiceDialog } from "../dialogs/CreateNatServiceDialog";

type SelectNatServicePropsType = {
  formik: FormikProps<CreateVpcGatewayDnatModel>;
  translateIpList?: GetApiMyVpcTranslateListApiResponse;
};

export const SelectNatService: FC<SelectNatServicePropsType> = ({
  formik,
  translateIpList = [],
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const [deleteTranslateItem] = useDeleteApiMyVpcTranslateDeleteByIdMutation();

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleTranslateDelete = (
    event: React.MouseEvent<SVGSVGElement>,
    option: { id: commonType; label: commonType }
  ) => {
    if (!option.id || isNaN(Number(option.id))) return;
    deleteTranslateItem({
      id: Number(option.id),
    })
      .unwrap()
      .then((res) => {
      })
      .catch((err) => {});
  };

  return (
    <>
      <Autocomplete
        value={
          convertToLabelId(translateIpList).find(
            (item) => item.id === formik.values.vpcHostTranslateId
          ) || null
        }
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        onChange={(e, value) => {
          formik.setFieldTouched("vpcHostTranslateId", true);
          formik.setFieldValue("vpcHostTranslateId", value?.id);
        }}
        size="small"
        disablePortal
        options={convertToLabelId(translateIpList)}
        renderOption={(props, option) => (
          <li {...props}>
            <ListItemText primary={option.label} />
            <DeleteIcon
              onClick={(event) => handleTranslateDelete(event, option)}
            />
          </li>
        )}
        fullWidth
        onClick={() => {
          formik.setFieldTouched("vpcHostTranslateId", true);
        }}
        onBlur={(e) => {
          formik.handleBlur(e);
          formik.setFieldTouched("vpcHostTranslateId", false);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={"service"}
            error={Boolean(
              formik.touched["vpcHostTranslateId"] &&
                !!formik.errors["vpcHostTranslateId"]
            )}
            helperText={formik.errors["vpcHostTranslateId"]}
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

          // <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
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
