import { blue } from "@mui/material/colors";

export const supportStatusIdentifier = (issueStatusId: number) => {
  switch (issueStatusId) {
    case 1:
      return {
        bgcolor: "warning.light",
        typographyColor: "warning.main",
        text: "در انتظار پاسخ",
      };
    case 2:
      return {
        bgcolor: blue[100],
        typographyColor: blue[700],
        text: "پاسخ داده شده",
      };
    case 3:
      return {
        bgcolor: "success.light",
        typographyColor: "success.main",
        text: "تکمیل شده",
      };
    default:
      return { bgcolor: "disabled", typographyColor: undefined, text: "" };
  }
};
