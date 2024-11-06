const en = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const fa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/**
 *
 * @param text a string that contains ۰-۹ characters
 * @returns same string that replaced ۰-۹ characters with 0-9
 */
const faToEn = (text: string) => {
  let numberText = text.slice(0);
  for (let i = 0; i < fa.length; i++) {
    numberText = numberText.replace(new RegExp(fa[i], "g"), en[i]);
  }
  return numberText;
};

/**
 * get an string and return new string contains only numbers of initial string
 * @param text a string that contain numbers
 * @returns string that contains only digits
 */
export const onlyNumber = (text: string) =>
  faToEn(text).match(/\d+/g)?.join("") || "";
