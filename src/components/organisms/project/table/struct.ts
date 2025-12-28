import { columnType } from "src/components/organisms/tables/table.types";

const getUserAccessTypeName = (accessTypeId: number | undefined) => {
  switch (accessTypeId) {
    case 1:
      return "Owner";
    case 2:
      return "Maintainer";
    case 3:
      return "Reporter";
    default:
      return "-";
  }
};

export const projectUserTableStruct: columnType[] = [
  // { id: "id", label: "" },
  { id: "user", label: "کاربر" },
  { id: "email", label: "ایمیل" },
  { 
    id: "userAccessTypeId", 
    label: "نوع دسترسی",
    format: getUserAccessTypeName
  },
  { id: "createDate", label: "تاریخ اضافه شدن" },
  { id: "control", label: "", disableSort: true },
]; 