import moment from "jalali-moment";

class Moment {
  static convertDateToJalaliDate(date: string): string {
    return moment(date).format("jYYYY/jMM/jDD");
  }

  static convertJalaliDateToDate(jalaliDate?: string): string {
    if (typeof jalaliDate !== "string" || jalaliDate === "") return "";

    const [customValue] = jalaliDate.split(" ");

    return moment(customValue, "jYYYY/jMM/jDD").toString();
  }
}

export default Moment;
