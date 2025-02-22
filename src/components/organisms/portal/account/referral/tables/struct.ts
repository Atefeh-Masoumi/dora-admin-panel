import { columnType } from "src/components/organisms/tables/table.types";

export const referralTableStruct: columnType[] = [
  { id: "joinDate", label: "تاریخ عضویت", type: "date" },
  {
    id: "customer",
    label: "نام کاربر",
  },
  {
    id: "commissionPercent",
    label: "درصد درآمد",
  },
];
