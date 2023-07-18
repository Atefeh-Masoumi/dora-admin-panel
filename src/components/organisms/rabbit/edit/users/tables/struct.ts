import { columnType } from "src/components/organisms/tables/table.types";

export const rabbitUserTableStruct: columnType[] = [
  {
    id: "id",
    label: "",
    invisibility: true,
  },
  {
    id: "userName",
    label: "نام کاربری",
  },
  { id: "control", label: "", disableSort: true },
];
