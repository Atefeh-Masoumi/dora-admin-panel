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
  name: string;
  value: string;
  ttl: string;
  useProxy: boolean;
  weight?: string;
  port?: string;
  priority?: string;
  preference?: string;
};
