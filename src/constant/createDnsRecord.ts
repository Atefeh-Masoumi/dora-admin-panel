import * as yup from "yup";

export const dnsTypeValueLabelObject = {
  A: "IPv4 address",
  AAAA: "IPv6 address",
  SRV: "Target",
  CNAME: "Target (Domain name)",
  MX: "Mail server",
  NS: "Name server",
  PTR: "Domain name",
  TXT: "Content",
  CAA: "Certificate",
};

export const dnsTTLItems = [
  { label: "min 2", value: "120" },
  { label: "min 5", value: "300" },
  { label: "min 10", value: "600" },
  { label: "min 15", value: "900" },
  { label: "min 30", value: "1800" },
  { label: "hr 1", value: "3600" },
  { label: "hr 2", value: "7200" },
];

export const dnsTypeItemsArray = [
  "A",
  "AAAA",
  "NS",
  "MX",
  "CNAME",
  "TXT",
  "PTR",
  "SRV",
  "CAA",
];

const commonValidation = yup.string().required("این فیلد اجباری می‌باشد");

export const createDnsFormValidation = yup.object().shape({
  name: commonValidation,
  value: commonValidation,
});
