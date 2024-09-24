export const access = [
  {
    id: 1,
    englishName: "Create",
    persianName: "ایجاد",
  },
  {
    id: 2,
    englishName: "Read",
    persianName: "مشاهده",
  },
  {
    id: 3,
    englishName: "Edit",
    persianName: "ویرایش",
  },
  {
    id: 4,
    englishName: "Remove",
    persianName: "حذف",
  },
];

export const roleAccessType = [
  {
    id: 1,
    englishName: "OverSystem",
    persianName: "دسترسی در سطح شرکت/سازمان",
  },
  {
    id: 2,
    englishName: "OverUser",
    persianName: "دسترسی در سطح کاربر",
  },
];

export enum CHECK_BOX_ENUM {
  SUPER_USER = "superUser",
  ACCOUNT_MANAGER = "accountManager",
  FINANCIAL_MANAGER = "financialManager",
}
