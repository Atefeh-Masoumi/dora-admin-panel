import { columnType } from "src/components/organisms/tables/table.types";

export const orderTableStruct: columnType[] = [
  {
    id: "id",
    label: "شناسه سفارش",
  },
  {
    id: "orderDate",
    label: "تاریخ",
    type: "date"
  },
  {
    id: "name",
    label: "نام سفارش",
  },
  {
    id: "productName",
    label: "نام محصول",
  },
  {
    id: "orderType",
    label: "نوع صورتحساب",
  },
  {
    id: "orderStatus",
    label: "وضعیت",
  },
];
