import { Grid, IconButton, MenuItem, Stack } from "@mui/material";
import { FormikErrors, FormikProps, FormikTouched } from "formik";
import { Dispatch, FC, Fragment, SetStateAction, useEffect, useMemo } from "react";
import {
  CreateIngressTypes,
  CustomRuleModelRequest,
} from "../../dialog/AddIngressDialog";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { useGetApiMyKubernetesCloudHostPortListByNamespaceIdQuery } from "src/app/services/api.generated";
import { useParams } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";

type SelectIngressRulePropsType = {
  formik: FormikProps<CreateIngressTypes>;
  mainIndex: number;
  setRules: Dispatch<SetStateAction<CustomRuleModelRequest[]>>;
};

export const SelectIngressRule: FC<SelectIngressRulePropsType> = ({
  formik,
  mainIndex,
  setRules,
}) => {
  const { kubernetesCloudId } = useParams();

  const { data: kuberCloudObject , refetch } =
    useGetApiMyKubernetesCloudHostPortListByNamespaceIdQuery({
      namespaceId: Number(kubernetesCloudId),
    });

  const servicePortList = useMemo(() => {
    return kuberCloudObject?.flatMap((item, index) =>
      item.ports?.map((port, portIndex) => ({
        id: port.portId,
        value: `${item.deployName}:${port.targetPort}`,
      }))
    );
  }, [kuberCloudObject]);

  useEffect(()=>{
  
    refetch()
  
  },[])

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
        error: Boolean(
          (
            formik.touched.rules?.[mainIndex] as FormikTouched<{
              path: string | null;
              kuberCloudDeployPortId: number;
            }>
          )?.kuberCloudDeployPortId &&
            (
              formik.errors.rules?.[mainIndex] as FormikErrors<{
                path: string | null;
                kuberCloudDeployPortId: number;
              }>
            )?.kuberCloudDeployPortId
        ),
        helperText:
          (
            formik.touched.rules?.[mainIndex] as FormikTouched<{
              path: string | null;
              kuberCloudDeployPortId: number;
            }>
          )?.kuberCloudDeployPortId &&
          (
            formik.errors.rules?.[mainIndex] as FormikErrors<{
              path: string | null;
              kuberCloudDeployPortId: number;
            }>
          )?.kuberCloudDeployPortId,
        select: true,
        label: "Service Port",
      },
      RestOfComponent: () => (
        <IconButton onClick={() => removeRules(mainIndex)}>
          <DeleteOutline color="error" />
        </IconButton>
      ),
      menuItems: servicePortList || [],
    },

    {
      id: 4,
      xs: 12,
      sm: 5.5,
      width: "100%",
      placeHolder: "Path",
      value: formik.values.rules[mainIndex]?.path || "",
      otherProps: {
        error: Boolean(
          (
            formik.touched.rules?.[mainIndex] as FormikTouched<{
              path: string | null;
              kuberCloudDeployPortId: number;
            }>
          )?.path &&
            (
              formik.errors.rules?.[mainIndex] as FormikErrors<{
                path: string | null;
                kuberCloudDeployPortId: number;
              }>
            )?.path
        ),
        helperText:
          (
            formik.touched.rules?.[mainIndex] as FormikTouched<{
              path: string | null;
              kuberCloudDeployPortId: number;
            }>
          )?.path &&
          (
            formik.errors.rules?.[mainIndex] as FormikErrors<{
              path: string | null;
              kuberCloudDeployPortId: number;
            }>
          )?.path,
      },
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        formik.setFieldValue(`rules[${mainIndex}].path`, event.target.value);
      },
    },
  ];

  return (
    <>
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
            menuItems,
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
                {menuItems &&
                  (menuItems as Array<{ id: number; value: string }>).map(
                    (item, index) => (
                      <MenuItem dir="ltr" key={index} value={item.id}>
                        {item.value}
                      </MenuItem>
                    )
                  )}
              </DorsaTextField>
            </Stack>
          </Grid>
        )
      )}
    </>
  );
};
