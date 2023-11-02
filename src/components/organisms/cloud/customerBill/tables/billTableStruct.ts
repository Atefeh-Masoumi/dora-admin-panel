import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "../../../tables/table.types";

export const billTableStruct: columnType[] = [
  {
    id: "product",
    label: "نام محصول",
  },
  {
    id: "customerProduct",
    label: "نام محصول کاربر",
  },
  {
    id: "customerProductPrice",
    label: "مبلغ (ریال)",
    format: priceToPersian,
  },
  {
    id: "fromDate",
    label: "از تاریخ",
  },
  {
    id: "toDate",
    label: "تا تاریخ",
  },
];
