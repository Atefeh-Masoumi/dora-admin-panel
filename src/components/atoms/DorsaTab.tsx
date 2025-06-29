import { styled, Tab, TabProps } from "@mui/material";
import { BORDER_RADIUS_1 } from "src/configs/theme";

export const DorsaTab = styled((props: TabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  margin: "0 20px !important",
  textTransform: "none",
  padding: "8px 8px 4px",
  minWidth: 0,
  borderRadius: BORDER_RADIUS_1,
  [theme.breakpoints.up("sm")]: { minWidth: 0 },
  marginRight: theme.spacing(1),
  color: theme.palette.secondary.main,
  "&:hover": { color: theme.palette.primary.main, backgroundColor: "#e6f4ff" },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": { backgroundColor: "#d1eaff" },
}));
