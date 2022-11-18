import { columnType } from "src/components/organisms/tables/table.types";

export const cartTableStruct: columnType[] = [
  {
    id: "id",
    label: "شناسه سفارش",
  },
  { id: "createDate", label: "تاریخ", type: "date" },
  {
    id: "name",
    label: "نام سفارش",
  },
  {
    id: "productName",
    label: "نام محصول",
  },
];
