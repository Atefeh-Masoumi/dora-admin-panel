import { FC } from "react";
import { FormikProps } from "formik";

import { Stack } from "@mui/system";
import { KuberCloudAppImageType } from "src/types/kuberCloud.types";
import { Counter } from "src/components/organisms/kuberCloud/add/steps/Counter";
import { Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg-icons/ExclamationMarkCircleSvg";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";

type CounterNewValueType = number | ((prevValue: number) => number);

type SelectDeploymentInfoPropsType = {
  formik: FormikProps<KuberCloudAppImageType>;
};

export const SelectDeploymentInfo: FC<SelectDeploymentInfoPropsType> = ({
  formik,
}) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));

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
    <Stack
      gap={2}
      direction={{ xs: "column", lg: "row" }}
      sx={{ width: "100%" }}
    >
      <Stack width="100%">
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{ px: 2 }}
          >
            <ExclamationMarkCircleSvg
              sx={{
                transform: "rotate(180deg)",
                "&>path:first-of-type": {
                  opacity: 1,
                  stroke: ({ palette }) => palette.grey[700],
                  strokeWidth: 1,
                  fill: "transparent",
                },
              }}
            />
            <Typography
              align="center"
              sx={{ color: ({ palette }) => palette.grey[700] }}
            >
              یک نام برای شناسایی سرویس خود انتخاب کنید
            </Typography>
          </Stack>
          <DorsaTextField
            value={formik.values.name}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
            sx={{ minWidth: 300 }}
            label="نام سرویس"
            inputProps={{ dir: "ltr" }}
          />
        </Stack>
      </Stack>

      <Divider
        orientation={isLargeScreen ? "horizontal" : "vertical"}
        flexItem
        sx={{ margin: { xs: "50px 10px", lg: 0 } }}
      />

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ width: "100%" }}
      >
        <Typography sx={{ color: ({ palette }) => palette.grey[700] }}>
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
  );
};
