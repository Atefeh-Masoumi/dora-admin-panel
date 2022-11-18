import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "src/components/organisms/tables/table.types";

export const AddRabbitTableStruct: columnType[] = [
  { id: "productBundleId", label: "" },
  { id: "name", label: "نام سرویس" },
  { id: "description", label: "توضیحات" },
  {
    id: "minimumPrice",
    label: "قیمت (ماهیانه)",
    format: (x) => priceToPersian(x),
  },
];
