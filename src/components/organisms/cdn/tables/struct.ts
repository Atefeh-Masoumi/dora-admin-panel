import { columnType } from "../../tables/table.types";

export const cdnDnsTableStruct: columnType[] = [
  {
    id: "id",
    label: "",
    invisibility: true,
  },
  {
    id: "zoneName",
    label: "نام سرویس",
  },
  {
    id: "isHsts",
    label: "HSTS",
  },
  {
    id: "isHttpsRedirect",
    label: "Https Redirection",
  },
  {
    id: "isNonWwwRedirect",
    label: "Non WWW Redirection",
  },
  {
    id: "statusId",
    label: "وضعیت",
  },
  {
    id: "createDate",
    label: "تاریخ ایجاد",
  },
  { id: "control", label: "", disableSort: true },
];
