import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "src/components/organisms/tables/table.types";

export const invoicesTableStruct: columnType[] = [
  {
    id: "id",
    label: "شماره فاکتور",
  },
  {
    id: "invoiceDate",
    label: "تاریخ",
    type: "date"
  },
  {
    id: "totalPrice",
    label: "جمع کل",
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
    id: "discount",
    label: "تخفیف",
    isPrice: true,
    format: priceToPersian,
  },
  {
    id: "invoicePrice",
    label: "مبلغ فاکتور",
    isPrice: true,
    format: priceToPersian,
  },
  {
    id: "invoiceStatus",
    label: "وضعیت",
  },
];

export const invoiceTableStruct: columnType[] = [
  {
    id: "product",
    label: "شرح کالا یا خدمت",
  },
  {
    id: "quantity",
    label: "تعداد",
  },
  {
    id: "price",
    label: "مبلغ",
    format: priceToPersian,
  },
  {
    id: "totalPrice",
    label: "جمع کل",
    format: priceToPersian,
  },
];
