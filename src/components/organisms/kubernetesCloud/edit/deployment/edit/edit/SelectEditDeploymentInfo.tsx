import { FC } from "react";
import { FormikProps } from "formik";
import { Stack } from "@mui/system";
import { Counter } from "src/components/organisms/kubernetesCloud/add/steps/Counter";
import { Typography } from "@mui/material";

type CounterNewValueType = number | ((prevValue: number) => number);

type EditDeploymentFormType = {
  replicaNumber: number;
  keyValue: {
    variableType: number;
    envKey: string;
    value: string;
    id?: number;
  }[];
  envToDelete: number[];
};

type SelectEditDeploymentInfoPropsType = {
  formik: FormikProps<EditDeploymentFormType>;
};

export const SelectEditDeploymentInfo: FC<SelectEditDeploymentInfoPropsType> = ({
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
        تنظیمات دیپلویمنت
      </Typography>
      <Stack direction="column" gap={6}>
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

