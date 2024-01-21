import { columnType } from "src/components/organisms/tables/table.types";

export const supportTableStruct: columnType[] = [
  {
    id: "id",
    label: "شماره تیکت",
  },
  { id: "createDate", label: "تاریخ", type: "date" },
  {
    id: "businessUnit",
    label: "واحد",
  },
  { id: "issueSubject", label: "عنوان" },
  {
    id: "issueStatus",
    label: "وضعیت",
  },
  { id: "control", label: "", disableSort: true },
];
