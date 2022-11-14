import type { FC } from "react";
import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export const DorsaTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(99, 161, 255, 1)",
    minWidth: "fit-content",
    color: "#fff",
    fontSize: "14px",
    borderRadius: "24px",
    padding: "16px",
    textAlign: "center",
    "& .MuiTooltip-arrow::before": {
      color: "rgba(99, 161, 255, 1)",
    },
  },
}));

export const WelcomeTooltip: FC = () => {
  const tooltipTitle = `مهدی عزیز سلام، به فینتک لند خوش آمدی!
  شما در اینجا می‌توانید از اخبار روز دنیای فینتک در اکوسیستم استارتاپی ایران و جهان باخبر بشوید.
  برای اطلاعات بیشتر لطفا ایمیل خود را چک کنید`;

  return (
    <DorsaTooltip title={tooltipTitle} arrow>
      <ErrorOutlineOutlinedIcon sx={{ color: "primary.light" }} />
    </DorsaTooltip>
  );
};
