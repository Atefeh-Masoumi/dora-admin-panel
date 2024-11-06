export type ProvincesType = {
  id: number;
  name: string;
  slug: string;
};

export type CitiesType = {
  id: number;
  name: string;
  slug: string;
  province_id: number;
};
