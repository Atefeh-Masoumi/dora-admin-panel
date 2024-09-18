import moment from "moment-jalaali";

export const ConvertToJalali = (jalaliDate: string) => {
  if (!jalaliDate) return "----";
  return moment(jalaliDate, "YYYY-MM-DDTHH:mm:ss").format(
    "HH:mm:ss - jYYYY/jMM/jDD"
  );
};

export const ConvertToJalaliWithoutTime = (jalaliDate: string) => {
  if (!jalaliDate) return "----";

  return moment(jalaliDate, "YYYY-MM-DDTHH:mm:ss").format("jYYYY/jMM/jDD");
};
