import { columnType } from "../../tables/table.types";

export const cdnDnsTableStruct: columnType[] = [
  {
    id: "id",
    label: "شناسه",
    invisibility: true,
  },
  {
    id: "zoneName",
    label: "نام سرویس",
  },
  {
    id: "isHsts",
    label: "isHsts",
  },
  {
    id: "isHttpsRedirect",
    label: "isHttpsRedirect",
  },
  {
    id: "isNonWwwRedirect",
    label: "isNonWwwRedirect",
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
