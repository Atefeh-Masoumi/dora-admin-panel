import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "../../../../tables/table.types";

export const walletTableStruct: columnType[] = [
  { id: "id", label: "شماره تراکنش" },
  { id: "transactionDate", label: "تاریخ", type: "date" },
  { id: "debit", label: "برداشت", format: priceToPersian },
  { id: "credit", label: "واریز", format: priceToPersian },
  { id: "balance", label: "مانده", format: priceToPersian },
  { id: "description", label: "توضیحات" },
];
