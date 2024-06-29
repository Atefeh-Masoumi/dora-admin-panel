export const convertToStringRegex =
  /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;

// * Minimum eight characters, maximum sixty characters, at least one uppercase letter, one lowercase letter, one number and one special character:
export const passwordValidationRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@!%&?]).{8,}$/;

export const wsRegex = /^\s+|\s+$|\s+(?=\s)/g;

export const enWordNumAndSpaceRegex = /^[a-zA-Z0-9\s]+$/;

export const dateValidationRegEx = /^\d{4}\/\d{2}\/\d{2}$/;

export const domainAddressValidation =
  /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;

export const ipValidation = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
export const captchaRegex = /^[a-zA-Z0-9!@#]{6}$/;

export const onlyEnCharacter = /^[a-zA-Z0-9]+$/;
export const eppRegex = /^[A-Za-z0-9]{5,20}$/;

export const maskRegex =
  /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/([1-9]|[12][0-9]|3[0-2])$/;

export const maskRegexOnly24 =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/24$/;
