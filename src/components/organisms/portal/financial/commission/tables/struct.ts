import { columnType } from "src/components/organisms/tables/table.types";
import { priceToPersian } from "src/utils/priceToPersian";

export const commissionTableStruct: columnType[] = [
  {
    id: "id",
    label: "شناسه کمیسیون",
  },
  {
    id: "walletTransactionId",
    label: "شناسه تراکنش",
  },
  {
    id: "totalPrice",
    label: "جمع کل",
    isPrice: true,
    format: priceToPersian,
  },
  {
    id: "commissionPrice",
    label: "مبلغ درآمد",
    isPrice: true,
    format: priceToPersian,
  },
  {
    id: "commissionDate",
    label: "تاریخ",
    type: "date",
  },
];
