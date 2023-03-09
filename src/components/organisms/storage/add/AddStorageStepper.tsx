import { FC, ReactElement } from "react";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { BuildingSvg } from "src/components/atoms/svg/BuildingSvg";
import { WindowsSvg } from "src/components/atoms/svg/WindowsSvg";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg/ExclamationMarkCircleSvg";
import DriverSvg from "src/components/atoms/svg/DriverSvg";
import { addStorageStepsType } from "./context/AddStorageContext";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    padding: "0 10px",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "rgba(60, 138, 255, 0.8)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "rgba(60, 138, 255, 0.8)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: "rgba(110, 118, 138, 0.08)",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "rgba(60, 138, 255, 0.08)",
  }),
  ...(ownerState.completed && {
    backgroundColor: "rgba(60, 138, 255, 0.08)",
  }),
}));

const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  "&>span": {
    "&>.Mui-active": {
      color: "rgba(60, 138, 255, 0.8) !important",
    },
    "&>.Mui-completed": {
      color: "rgba(60, 138, 255, 0.8) !important",
    },
    "&>.MuiStepLabel-label": {
      color: "rgba(110, 118, 138, 0.6)",
    },
  },
}));

const ColorlibStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  const icons: { [index: string]: ReactElement } = {
    1: <BuildingSvg />,
    2: (
      <WindowsSvg
        sx={{
          "&>path": {
            fill: ({ palette }) =>
              active || completed
                ? `${palette.primary.main} !important`
                : undefined,
          },
        }}
      />
    ),
    3: <DriverSvg mode={active || completed ? "selected" : "default"} />,
    4: (
      <ExclamationMarkCircleSvg
        sx={{
          "&>path": {
            fill: ({ palette }) =>
              active || completed
                ? `${palette.primary.main} !important`
                : undefined,
          },
        }}
      />
    ),
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};

const steps = [
  "انتخاب مرکز داده",
  "انتخاب مشخصات سرویس",
  "اطلاعات سرویس",
];

type AddStorageStepperPropsType = {
  step: addStorageStepsType;
};

export const AddStorageStepper: FC<AddStorageStepperPropsType> = ({
  step,
}) => {
  return (
    <Stepper
      alternativeLabel
      activeStep={step - 1}
      connector={<ColorlibConnector />}
      sx={{ mx: "auto", maxWidth: 650 }}
    >
      {steps.map((label) => (
        <Step key={label} sx={{ minWidth: 160 }}>
          <CustomStepLabel
            StepIconComponent={ColorlibStepIcon}
            color="rgba(110, 118, 138, 0.6)"
          >
            {label}
          </CustomStepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
