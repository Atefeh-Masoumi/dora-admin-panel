export const convertToStringRegex =
  /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;

// * Password must be between 8 and 20 characters long and contain at least an uppercase letter, a lowercase letter and a number
// export const passwordValidationRegex =
//   /^((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])[^\s]{8,20}$/;

export const wsRegex = /^\s+|\s+$|\s+(?=\s)/g;

export const enWordNumAndSpaceRegex = /^[a-zA-Z0-9\s]+$/;

export const passwordValidationRegex =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
