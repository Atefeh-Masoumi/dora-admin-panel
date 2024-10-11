export const secretTypesConstants = [
  { id: 1, category: "Opaque" },
  { id: 2, category: "TLS Information" },
  { id: 3, category: "Image Registry Information" },
  { id: 4, category: "Username And Password" },
];

export enum SECRET_TYPES_ENUM {
  Opaque = 1,
  TLS = 2,
  ImageRegistry = 3,
  UsernameAndPassword = 4,
}
