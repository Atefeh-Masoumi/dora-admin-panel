import { columnType } from "../../table.types";
import { priceToPersian } from "src/utils/priceToPersian";

export const paymentTableStruct: columnType[] = [
  { id: "id", label: "شماره پیگیری" },
  { id: "transactionDate", label: "تاریخ", type: "date" },
  { id: "amount", label: "مبلغ", isPrice: true, format: priceToPersian },
  { id: "rrn", label: "شماره پیگیری بانک" },
  { id: "hashCardNumber", label: "شماره کارت" },
  { id: "paymentStatus", label: "وضعیت" },
  { id: "paymentProvider", label: "نام درگاه" },
];
