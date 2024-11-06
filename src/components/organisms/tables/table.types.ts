export type columnType = {
  id: string;
  label: string;
  format?: (x: any) => string;
  disableSort?: boolean;
  comparator?: (a: any, b: any) => -1 | 0 | 1;
  type?: "string" | "number" | "date" | "array" | "object";
  isPrice?: boolean;
  invisibility?: boolean;
};
