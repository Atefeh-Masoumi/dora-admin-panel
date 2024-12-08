export const dateComparator = (a: Date, b: Date): 0 | 1 | -1 => {
  if (a.getTime() > b.getTime()) return 1;
  if (a.getTime() === b.getTime()) return 0;
  return -1;
};

export const numberComparator = (
  a: number | string,
  b: number | string
): 0 | 1 | -1 => {
  if (a > b) return 1;
  if (a === b) return 0;
  return -1;
};
