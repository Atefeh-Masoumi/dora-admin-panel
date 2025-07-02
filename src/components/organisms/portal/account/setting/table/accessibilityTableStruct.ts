import { columnType } from "src/components/organisms/tables/table.types";

export const accessibilityTableStruct: columnType[] = [
  {
    id: "user",
    label: "نام",
  },
  {
    id: "email",
    label: "نام کاربری",
  },
  {
    id: "phoneNumber",
    label: "شماره تلفن",
  },
  {
    id: "isActive",
    label: "وضعیت حساب",
  },
  {
    id: "isSuperManager",
    label: "سوپر ادمین",
  },
  {
    id: "isFinancialManager",
    label: "دسترسی مالی",
  },
  { id: "control", label: "عملیات", disableSort: true },
];
