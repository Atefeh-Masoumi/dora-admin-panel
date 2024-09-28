import { FC } from "react";
import { FormikProps } from "formik";

import { Stack } from "@mui/system";
import { Counter } from "src/components/organisms/kubernetesCloud/add/steps/Counter";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { KuberCloudNamespaceImageType } from "src/types/kubernetesCloud.types";

type CounterNewValueType = number | ((prevValue: number) => number);

type SelectDeploymentInfoPropsType = {
  formik: FormikProps<KuberCloudNamespaceImageType>;
};

export const SelectDeploymentInfo: FC<SelectDeploymentInfoPropsType> = ({
  formik,
}) => {
  const addOne = () => {
    return formik.values.replicaNumber < 10
      ? formik.values.replicaNumber + 1
      : formik.values.replicaNumber;
  };
  const minusOne = () => {
    return formik.values.replicaNumber > 1
      ? formik.values.replicaNumber - 1
      : formik.values.replicaNumber;
  };

  const handleCounterOnChange = (
    newValue: number | ((prevValue: number) => number)
  ) => {
    let updatedValue;

    if (typeof newValue === "function") {
      updatedValue = newValue(formik.values.replicaNumber);
    } else {
      updatedValue = newValue;
    }

    formik.setFieldValue("replicaNumber", updatedValue);
  };

  const handleCounterOnPlusClick = () =>
    formik.setFieldValue("replicaNumber", addOne());

  const handleCounterOnMinusClick = () =>
    formik.setFieldValue("replicaNumber", minusOne());

  return (
    <Stack gap={2} rowGap={6} pb={4} pt={2} direction="column" sx={{ width: "100%" }}>
      <Typography
        variant="text9"
        align="center"
        sx={{ color: ({ palette }) => palette.grey[700] }}
      >
        اطلاعات سرویس
      </Typography>
      <Stack direction="column" gap={6}>
        <Stack
          width="100%"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <FormControl fullWidth>
            <DorsaTextField
              value={formik.values.name}
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
              fullWidth
              label="نام سرویس"
              focused
              error={Boolean(formik.touched.name && formik.errors.name)}
              helperText={
                formik.touched.name && formik.errors.name ? (
                  <FormHelperText sx={{ textAlign: "justify" }}>
                    {formik.errors.name}
                  </FormHelperText>
                ) : null
              }
              inputProps={{
                dir: "ltr",
                backgroundColor: "white",
                "& :focus": { backgroundColor: "white" },
              }}
            />
          </FormControl>
        </Stack>

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <Typography
            variant="text9"
            sx={{ color: ({ palette }) => palette.grey[700] }}
          >
            تعداد مورد نظر از نمونه‌هایی که می‌خواهید به کار ببرید.
          </Typography>
          <Counter
            label="Replica Number"
            value={formik.values.replicaNumber}
            onChange={(newValue: CounterNewValueType) => handleCounterOnChange}
            onPlusClick={handleCounterOnPlusClick}
            onMinusClick={handleCounterOnMinusClick}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
