export const kubernetesStatusIdentifier = (kubernetesStatusId: number) => {
  switch (kubernetesStatusId) {
    case 1:
      return {
        id: "Unpaid",
        label: "پرداخت نشده",
        textColor: "warning.main",
        bgcolor: "warning.light",
        chipColor: "warning",
      };
    case 2:
      return {
        id: "Active",
        label: "فعال",
        textColor: "success.main",
        bgcolor: "success.light",
        chipColor: "success",
      };
    case 3:
      return {
        id: "Disabled",
        label: "غیرفعال",
        textColor: "error.main",
        bgcolor: "error.light",
        chipColor: "error",
      };
    case 4:
      return {
        id: "Expired",
        label: "منقضی شده",
        textColor: "error.main",
        bgcolor: "error.light",
        chipColor: "error",
      };
    case 5:
      return {
        id: "Deleted",
        label: "حذف شده",
        textColor: "error.main",
        bgcolor: "error.light",
        chipColor: "error",
      };
    case 6:
      return {
        id: "Wait",
        label: "در حال انجام عملیات",
        textColor: "warning.main",
        bgcolor: "warning.light",
        chipColor: "warning",
      };
    case 7:
      return {
        id: "Rebuild",
        label: "بازسازی",
        textColor: "warning.main",
        bgcolor: "warning.light",
        chipColor: "warning",
      };
    case 8:
      return {
        id: "Failed",
        label: "خطا",
        textColor: "error.main",
        bgcolor: "error.light",
        chipColor: "error",
      };
    case 9:
      return {
        id: "WaitChangeDns",
        label: "بازسازی",
        textColor: "warning.main",
        bgcolor: "warning.light",
        chipColor: "warning",
      };
    case 10:
      return {
        id: "Shutdown",
        label: "خاموش",
        textColor: "error.main",
        bgcolor: "error.light",
        chipColor: "error",
      };
    case 11:
      return {
        id: "InQueue",
        label: "در صف انتظار",
        textColor: "warning.main",
        bgcolor: "warning.light",
        chipColor: "warning",
      };
    default:
      return {
        id: "Other",
        label: "خطای نامشخص",
        textColor: "error.main",
        bgcolor: "error.light",
        chipColor: "error",
      };
  }
};
