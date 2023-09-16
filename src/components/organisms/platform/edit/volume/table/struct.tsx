import { columnType } from "src/components/organisms/tables/table.types";

export const voluemMangementTableStruct: columnType[] = [
  {
    id: "id",
    label: "",
    invisibility: true,
  },
  {
    id: "name",
    label: "عنوان",
  },
  {
    id: "capacity",
    label: "ظرفیت",
  },
  {
    id: "createDate",
    label: "تاریخ ایجاد",
  },
  { id: "control", label: "", disableSort: true },
];
