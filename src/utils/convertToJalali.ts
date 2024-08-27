import moment from "moment-jalaali";

export const ConvertToJalali = (jalaliDate: string) => {
  return moment(jalaliDate, "YYYY-MM-DDTHH:mm:ss").format("jYYYY/jMM/jDD");
};
