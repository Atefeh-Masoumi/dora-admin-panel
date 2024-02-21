import { columnType } from "src/components/organisms/tables/table.types";

export const snapShotTableStruct: columnType[] = [
  { id: "id", label: "شناسه" },
  { id: "snapshotId", label: "شناسه snapshot" },
  { id: "name", label: "نام" },
  { id: "isActive", label: "وضعیت فعال بودن" },
  { id: "isCreated", label: "وضعیت ایجاد" },
  { id: "datacenter", label: "مرکز داده" },
  { id: "operatingSystem", label: "سیستم عامل" },
  { id: "description", label: "توضیحات" },
  { id: "vmProjectId", label: "شناسه پروژه" },
  { id: "vmProjectName", label: "نام پروژه" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "modifiedDate", label: "تاریخ ویرایش" },
  { id: "control", label: "", disableSort: true },
];
