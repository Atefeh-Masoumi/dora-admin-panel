import * as yup from "yup";

export const usernameValidator = yup
  .string()
  .min(3, "نام کاربری حداقل باید ۳ حرف باشد.")
  .max(50, "نام کاربری حداکثر باید ۵۰ حرف باشد.");

export const emailValidator = yup.string().email("ایمیل معتبر نیست!");

export const passwordValidator = yup.string();

export const codeValidator = yup
  .string()
  .min(6, "کد تایید حداقل باید ۶ رقم باشد.")
  .max(6, "کد تایید حداکثر باید ۶ رقمّ باشد.");

export const phoneNumberValidator = yup
  .string()
  .min(11, "لطفا شماره موبایل صحیح وارد کنید")
  .max(11, "لطفا شماره موبایل صحیح وارد کنید");

export const passwordValidatorRegex =
  /^(?=.*[A-Z])(?=.*[!@#$&.*-_])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
