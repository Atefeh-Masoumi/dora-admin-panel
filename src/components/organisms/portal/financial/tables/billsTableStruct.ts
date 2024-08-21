import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "../../../tables/table.types";

export const billsTableStruct: columnType[] = [
  {
    id: "id",
    label: "شماره صورتحساب",
  },
  {
    id: "calculateMonth",
    label: "ماه صورتحساب",
    type: "date",
  },
  {
    id: "billDate",
    label: "تاریخ و زمان صورتحساب",
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
