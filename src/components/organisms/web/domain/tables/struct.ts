import { columnType } from "../../../tables/table.types";

export const domainTableStruct: columnType[] = [
  {
    id: "id",
    label: "",
    invisibility: true,
  },
  {
    id: "domainName",
    label: "نام دامنه",
  },
  {
    id: "type",
    label: "نوع درخواست",
  },
  {
    id: "ns1",
    label: "NS 1",
  },
  {
    id: "ns2",
    label: "NS 2",
  },
  {
    id: "createDate",
    label: "تاریخ ایجاد",
  },
  {
    id: "expireDate",
    label: "تاریخ انقضا",
  },
  {
    id: "statusId",
    label: "وضعیت",
  },
  { id: "control", label: "", disableSort: true },
];
