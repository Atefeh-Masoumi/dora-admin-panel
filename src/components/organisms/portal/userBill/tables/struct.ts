import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "../../../tables/table.types";

export const billsTableStruct: columnType[] = [
  {
    id: "id",
    label: "شماره صورتحساب",
  },
  {
    id: "billDate",
    label: "تاریخ صورتحساب",
    type: "date",
  },
  {
    id: "netPrice",
    label: "مبلغ صورتحساب",
    isPrice: true,
    format: priceToPersian,
  },
  {
    id: "vat",
    label: "ارزش افزوده",
    isPrice: true,
    format: priceToPersian,
  },
  {
    id: "totalPrice",
    label: "جمع کل",
    isPrice: true,
    format: priceToPersian,
  },
];

export const billTableStruct: columnType[] = [
  {
    id: "product",
    label: "گروه",
  },
  {
    id: "userProduct",
    label: "نام محصول",
  },
  {
    id: "createDate",
    label: "تاریخ ایجاد",
  },
  {
    id: "duration",
    label: "میزان مصرف (دقیقه)",
  },
  {
    id: "price",
    label: "مبلغ",
    format: priceToPersian,
  },
];
