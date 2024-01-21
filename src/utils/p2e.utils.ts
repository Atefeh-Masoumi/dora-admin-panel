export const p2e = (s: string | number, onlyNumber?: boolean) => {
  const converted = ("" + s).replace(/[۰-۹]/g, (d) =>
    "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString()
  );
  if (onlyNumber) {
    return converted.replace(/\D/g, "");
  }
  return converted;
};
