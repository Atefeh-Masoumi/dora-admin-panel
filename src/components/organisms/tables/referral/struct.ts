import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "../table.types";

export const referralTableStruct: columnType[] = [
  { id: "commissionDate", label: "تاریخ ثبت", type: "date" },
  {
    id: "invoiceId",
    label: "شماره فاکتور",
  },
  {
    id: "totalPrice",
    label: "مبلغ فاکتور",
    format: priceToPersian,
  },
  {
    id: "commissionPrice",
    label: "مبلغ کمیسیون",
    format: priceToPersian,
  },
  {
    id: "user",
    label: "نام کاربر",
  },
];
