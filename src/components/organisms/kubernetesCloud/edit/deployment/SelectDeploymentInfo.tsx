import { FC } from "react";
import { FormikProps } from "formik";

import { Stack } from "@mui/system";
import { KuberCloudAppImageType } from "src/types/kubernetesCloud.types";
import { SelectServiceName } from "./SelectServiceName";
import { Counter } from "src/components/organisms/kubernetes/add/steps/Counter";
import { Paper, Typography } from "@mui/material";

type CounterNewValueType = number | ((prevValue: number) => number);

type SelectDeploymentInfoPropsType = {
  formik: FormikProps<KuberCloudAppImageType>;
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

  console.log(formik.values);

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
    <Stack
      gap={2}
      direction={{ xs: "column", lg: "row" }}
      sx={{ width: "100%" }}
    >
      <Stack width="100%">
        <SelectServiceName
          serviceName={formik.values.name}
          setServiceName={(newValue) => formik.setFieldValue("name", newValue)}
        />
      </Stack>
      <Paper sx={{ px: 2, py: 4, width: "100%" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography sx={{ color: ({ palette }) => palette.grey[700] }}>
            یک نام برای شناسایی سرویس خود انتخاب کنید
          </Typography>
          <Counter
            label="Replica Number"
            value={formik.values.replicaNumber}
            onChange={(newValue: CounterNewValueType) => handleCounterOnChange}
            onPlusClick={handleCounterOnPlusClick}
            onMinusClick={handleCounterOnMinusClick}
          />
        </Stack>
      </Paper>
    </Stack>
  );
};
