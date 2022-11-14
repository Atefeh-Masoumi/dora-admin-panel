export type dnsType =
  | "A"
  | "AAAA"
  | "NS"
  | "MX"
  | "CNAME"
  | "TXT"
  | "PTR"
  | "SRV"
  | "CAA";

export type createDnsRecordType = {
  ttl: string;
  name: string;
  value: string;
  weight?: string;
  port?: string;
  priority?: string;
  preference?: string;
};
