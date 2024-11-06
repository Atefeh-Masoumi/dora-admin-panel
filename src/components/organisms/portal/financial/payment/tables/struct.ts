import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "src/components/organisms/tables/table.types";

export const paymentTableStruct: columnType[] = [
  { id: "id", label: "شماره پیگیری" },
  { id: "transactionDate", label: "تاریخ", type: "date" },
  { id: "amount", label: "مبلغ", isPrice: true, format: priceToPersian },
  { id: "rrn", label: "شماره پیگیری بانک", format: priceToPersian },
  { id: "hashCardNumber", label: "شماره کارت" },
  { id: "paymentStatus", label: "وضعیت" },
  { id: "paymentProvider", label: "نام درگاه" },
];
