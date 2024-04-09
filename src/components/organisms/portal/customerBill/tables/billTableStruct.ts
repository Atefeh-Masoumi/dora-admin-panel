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

export const customerProductsTableStruct: columnType[] = [
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
  {
    id: "",
    label: "",
  },
];

export const customerProductItemsTableStruct: columnType[] = [
  { id: "customerProductItem", label: "نام آیتم" },
  { id: "duration", label: "مبلغ" },
  { id: "price", label: " مدت زمان استفاده" },
  { id: "fromDate", label: "از تاریخ" },
  { id: "toDate", label: "تا تاریخ" },
];
