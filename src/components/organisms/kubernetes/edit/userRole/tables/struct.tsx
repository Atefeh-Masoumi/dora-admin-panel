import { columnType } from "src/components/organisms/tables/table.types";

export const userRoleTableStruct: columnType[] = [
  {
    id: "id",
    label: "",
    invisibility: true,
  },
  {
    id: "userName",
    label: "نام کاربری",
  },
  {
    id: "email",
    label: "ایمیل",
  },
  {
    id: "createDate",
    label: "تاریخ ایجاد",
  },
  { id: "control", label: "", disableSort: true },
];
