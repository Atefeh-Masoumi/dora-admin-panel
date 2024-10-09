import { Grid, IconButton, MenuItem, Stack } from "@mui/material";
import { FormikProps } from "formik";
import { Dispatch, FC, Fragment, SetStateAction } from "react";
import { CreateIngressTypes } from "../../dialog/AddIngressDialog";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import {
  RuleModelRequest,
  useGetApiMyKubernetesCloudHostPortListByNamespaceIdQuery,
  useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery,
} from "src/app/services/api.generated";
import { useParams } from "react-router";
import { SECRET_TYPES_ENUM } from "src/components/organisms/home/constants/secretTypesConstants";
import { DeleteOutline } from "@mui/icons-material";

type SelectIngressRulePropsType = {
  formik: FormikProps<CreateIngressTypes>;
  mainIndex: number;
  setRules: Dispatch<SetStateAction<RuleModelRequest[]>>;
};

export const SelectIngressRule: FC<SelectIngressRulePropsType> = ({
  formik,
  mainIndex,
  setRules,
}) => {
  const { kubernetesCloudId } = useParams();

  const { data: kuberCloudObject, isLoading: portListLoading } =
    useGetApiMyKubernetesCloudHostPortListByNamespaceIdQuery({
      namespaceId: Number(kubernetesCloudId),
    });

  const removeRules = (index: number) => {
    setRules((prevState) => {
      let result = [...prevState];
      result.splice(index, 1);
      return result;
    });
    formik.setFieldValue(
      "rules",
      formik.values.rules.filter((_, i) => i !== index)
    );
  };

  const inputItems = [
    {
      id: 5,
      xs: 12,
      sm: 6.5,
      width: "100%",
      placeHolder: "Port",
      value: formik.values.rules[mainIndex]?.kuberCloudDeployPortId || "",
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        formik.setFieldValue(
          `rules[${mainIndex}].kuberCloudDeployPortId`,
          event.target.value
        );
      },
      otherProps: {
        select: true,
        label: "Service Port",
      },
      RestOfComponent: () => (
        <IconButton onClick={() => removeRules(mainIndex)}>
          <DeleteOutline color="error" />
        </IconButton>
      ),
      // menuItems: kuberCloudObject || [],
    },

    {
      id: 4,
      xs: 12,
      sm: 5.5,
      width: "100%",
      placeHolder: "Path",
      value: formik.values.rules[mainIndex]?.path || "",
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        formik.setFieldValue(`rules[${mainIndex}].path`, event.target.value);
      },
    },
  ];

  return (
    <Fragment key={mainIndex}>
      {inputItems.map(
        (
          {
            value,
            xs,
            sm,
            otherProps,
            placeHolder,
            onChange,
            width,
            RestOfComponent,
            // menuItems,
          },
          inputIndex
        ) => (
          <Grid item key={inputIndex} xs={xs} sm={sm}>
            <Stack direction="row">
              {RestOfComponent && RestOfComponent()}
              <DorsaTextField
                dir="ltr"
                size="small"
                sx={{ width: width }}
                placeholder={placeHolder}
                value={value}
                onChange={onChange}
                {...(otherProps || {})}
              >
                {/* {menuItems &&
                menuItems.map((item, index) => (
                  <MenuItem dir="ltr" key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))} */}
              </DorsaTextField>
            </Stack>
          </Grid>
        )
      )}
    </Fragment>
  );
};
