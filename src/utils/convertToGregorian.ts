import moment from "jalali-moment";

export const ConvertToGergorian = (jalaliDate: string) => {
  return moment(jalaliDate, "jYYYY/jMM/jDD").format("YYYY-MM-DDTHH:mm:ss");
};
