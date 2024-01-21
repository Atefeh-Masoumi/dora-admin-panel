export const e2p = (s: string | number, onlyNumber?: boolean) => {
  const convertedNumber = ("" + s).replace(
    /[0-9]/g,
    (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]
  );
  if (onlyNumber) {
    return convertedNumber.replace(/\D/g, "");
  }
  return convertedNumber;
};
