import moment from "moment-jalaali";

export const ConvertToJalali = (gregorianDate: string) => {
  return moment(gregorianDate, "jalali").format("YYYY-MM-DDTHH:mm:ss");
};
