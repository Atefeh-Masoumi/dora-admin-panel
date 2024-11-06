export const serviceStatusIdentifier = (StatusId: number) => {
  switch (StatusId) {
    case 1:
      return {
        iconColor: "error",
        typographyColor: "error.main",
        bgColor: "error.light",
        label: "پرداخت نشده",
      };
    case 2:
      return {
        iconColor: "success",
        typographyColor: "success.main",
        bgColor: "success.light",
        label: "فعال",
      };
    case 3:
      return {
        iconColor: "error",
        typographyColor: "error.main",
        bgColor: "error.light",
        label: "غیرفعال",
      };
    case 4:
      return {
        iconColor: "error",
        typographyColor: "error.main",
        bgColor: "error.light",
        label: "منقضی شده",
      };
    case 5:
      return {
        iconColor: "error",
        typographyColor: "error.main",
        bgColor: "error.light",
        label: "حذف شده",
      };
    case 6:
      return {
        iconColor: "warning",
        typographyColor: "warning.main",
        bgColor: "warning.light",
        label: "در انتظار انجام عملیات",
      };
    case 7:
      return {
        iconColor: "warning",
        typographyColor: "warning.main",
        bgColor: "warning.light",
        label: "بازسازی",
      };
    case 8:
      return {
        iconColor: "error",
        typographyColor: "error.main",
        bgColor: "error.light",
        label: "خطا در زیرساخت",
      };
    case 9:
      return {
        iconColor: "warning",
        typographyColor: "warning.main",
        bgColor: "warning.light",
        label: "در انتظار تغییر NS",
      };
    case 10:
      return {
        iconColor: "warning",
        typographyColor: "warning.main",
        bgColor: "warning.light",
        label: "خاموش",
      };
    case 11:
      return {
        iconColor: "warning",
        typographyColor: "warning.main",
        bgColor: "warning.light",
        label: "در صف انتظار",
      };
    default:
      return {
        iconColor: "error",
        typographyColor: "error.main",
        bgColor: "error.light",
        label: "ناموفق",
      };
  }
};
