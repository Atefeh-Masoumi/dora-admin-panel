import { columnType } from "src/components/organisms/tables/table.types";

export const accessibilityTableStruct: columnType[] = [
  {
    id: "name",
    label: "نام",
  },
  {
    id: "userName",
    label: "نام کاربری",
  },
  // {
  //   id: "phoneNumber",
  //   label: "شماره تلفن",
  // },
  {
    id: "isSuperUser",
    label: "سوپر ادمین",
  },
  {
    id: "isActive",
    label: "وضعیت حساب",
  },
  {
    id: "hasTwoFactor",
    label: "ورود دومرحله‌ای",
  },
  { id: "control", label: "عملیات", disableSort: true },
];
