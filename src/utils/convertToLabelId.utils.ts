import { commonType } from "src/types/common.type";

export type itemWithIdAndName = {
  id?: commonType;
  name?: commonType;
};

export const convertToLabelId = (array: itemWithIdAndName[]) => {
  return array.map(({ id, name }) => {
    return { id, label: name };
  });
};
