import { columnType } from "src/components/organisms/tables/table.types";

export const serviceTableStruct: columnType[] = [
  {
    id: "id",
    label: "شماره سرویس",
  },
  {
    id: "product",
    label: "نام محصول",
  },
  {
    id: "name",
    label: "نام محصول کاربر",
  },
  {
    id: "createDate",
    label: "تاریخ فعالسازی",
    type: "date",
  },
];
