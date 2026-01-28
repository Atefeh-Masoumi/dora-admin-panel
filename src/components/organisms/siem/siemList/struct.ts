import { columnType } from "../../tables/table.types";

export const siemTableStruct: columnType[] = [
  { label: "نام  ", id: "name" },
  { label: "لاگ سیستم عامل", id: "osLogEnabled" },
  { label: "لاگ سرویس ها ", id: "serviceLogEnabled" },
  { label: "لاگ آنالیز ترافیک", id: "trafficAnalysisLogEnabled" },
  { label: "لاگ IDS", id: "idsLogEnabled" },
  { label: "وضعیت", id: "statusId" },
  { label: "تاریخ ایجاد", id: "createDate" },
  { label: "", id: "control" },
];

