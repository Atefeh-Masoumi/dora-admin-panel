import type { FC } from "react";
import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { BORDER_RADIUS_1 } from "src/configs/theme";

export const DorsaTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(99, 161, 255, 1)",
    minWidth: "fit-content",
    color: "#fff",
    fontSize: "14px",
    borderRadius: BORDER_RADIUS_1,
    padding: "16px",
    textAlign: "center",
    "& .MuiTooltip-arrow::before": {
      color: "rgba(99, 161, 255, 1)",
    },
  },
}));

export const WelcomeTooltip: FC = () => {
  const tooltipTitle = `شما در اینجا می‌توانید با معرفی دوستان و ثبت این کد معرف در هنگام ثبت نام، کسب درآمد کنید. برای این کار فقط کافی است که دوستان شما این کدمعرف را ثبت کنند و از هر پرداخت ۱۰ درصد کسب درآمد داشته باشید.`;

  return (
    <DorsaTooltip title={tooltipTitle} arrow>
      <ErrorOutlineOutlinedIcon sx={{ color: "primary.light" }} />
    </DorsaTooltip>
  );
};
