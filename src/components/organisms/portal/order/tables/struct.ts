import { columnType } from "src/components/organisms/tables/table.types";

export const orderTableStruct: columnType[] = [
  {
    id: "id",
    label: "شناسه سفارش",
  },
  {
    id: "invoiceDate",
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
    id: "invoiceType",
    label: "نوع صورتحساب",
  },
  {
    id: "invoiceStatus",
    label: "وضعیت",
  },
];
