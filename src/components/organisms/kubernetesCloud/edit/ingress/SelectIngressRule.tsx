import { Grid, MenuItem } from "@mui/material";
import { FormikProps } from "formik";
import { FC } from "react";
import { CreateIngressTypes } from "../../dialog/AddIngressDialog";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import {
  useGetApiMyKubernetesCloudHostPortListByNamespaceIdQuery,
  useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery,
} from "src/app/services/api.generated";
import { useParams } from "react-router";
import { SECRET_TYPES_ENUM } from "src/components/organisms/home/constants/secretTypesConstants";

type SelectIngressRulePropsType = {
  formik: FormikProps<CreateIngressTypes>;
  mainIndex: number;
};

export const SelectIngressRule: FC<SelectIngressRulePropsType> = ({
  formik,
  mainIndex,
}) => {
  const { kubernetesCloudId } = useParams();

  const { data: portList, isLoading: portListLoading } =
    useGetApiMyKubernetesCloudHostPortListByNamespaceIdQuery({
      namespaceId: Number(kubernetesCloudId),
    });

  const { data: tLSSecretList, isLoading: tLSSecretListLoadning } =
    useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery(
      {
        namespaceId: Number(kubernetesCloudId),
        secretTypeId: SECRET_TYPES_ENUM.TLS,
      },
      { skip: !kubernetesCloudId }
    );

  const inputItems = [
    {
      id: 1,
      xs: 12,
      md: 6,
      width: "100%",
      placeHolder: "Domain Name",
      value: formik.values.rules[mainIndex]?.domainName || "",
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        formik.setFieldValue(
          `rules[${mainIndex}].domainName`,
          event.target.value
        );
      },
      otherProps: {},
    },
    {
      id: 3,
      xs: 12,
      md: 6,
      width: "100%",
      placeHolder: "Protocol Type",
      value: "test",
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        formik.setFieldValue(
          `rules[${mainIndex}].secretId`,
          event.target.value
        );
      },
      otherProps: {
        select: true,
        label: "Protocol Type",
      },
      menuItems: [
        { id: 4, name: "HTTP" },
        { id: 3, name: "HTTPS" },
      ],
    },
    {
      id: 2,
      xs: 12,
      md: 12,
      width: "100%",
      placeHolder: "Secret",
      value: "test",
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        formik.setFieldValue(`rules[${mainIndex}].secret`, event.target.value);
      },
      otherProps: {
        select: true,
        label: "Secret",
      },
      menuItems: tLSSecretList,
    },

    {
      id: 5,
      xs: 12,
      md: 6,
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
        label: "Port",
      },
      menuItems: [],
    },
    {
      id: 5,
      xs: 12,
      md: 6,
      width: "100%",
      placeHolder: "Service",
      value: formik.values.rules[mainIndex]?.service || "",
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        formik.setFieldValue(`rules[${mainIndex}].service`, event.target.value);
      },
      otherProps: {
        select: true,
        label: "Service",
      },
      menuItems: [],
    },
    {
      id: 4,
      xs: 12,
      md: 4,
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
    <Grid container spacing={1}>
      {inputItems.map(
        (
          {
            value,
            xs,
            md,
            otherProps,
            placeHolder,
            onChange,
            width,
            menuItems,
          },
          inputIndex
        ) => (
          <Grid item key={inputIndex} xs={xs} md={md}>
            <DorsaTextField
              dir="ltr"
              size="small"
              sx={{ width: width }}
              placeholder={placeHolder}
              value={value}
              select={otherProps?.select || false}
              onChange={onChange}
              {...(otherProps || {})}
            >
              {menuItems &&
                menuItems.map((item, index) => (
                  <MenuItem dir="ltr" key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </DorsaTextField>
          </Grid>
        )
      )}
    </Grid>
  );
};
