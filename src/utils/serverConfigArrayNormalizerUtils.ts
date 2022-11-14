import { GetApiV2PortalProductBundleListByProductCategoryIdApiResponse } from "src/app/services/api.generated";

export type normalizedServerConfigArray = {
  productBundleId: number;
  name: string;
  minimumPrice: number;
  price: number;
  cpu: number;
  memory: number;
  disk: number;
};

export const serverConfigArrayNormalizerUtils = (
  originalArray:
    | GetApiV2PortalProductBundleListByProductCategoryIdApiResponse
    | undefined
) => {
  if (!originalArray || originalArray.length === 0) return [];
  let result: normalizedServerConfigArray[] = [];
  // originalArray.forEach(
  //   ({ productBundleId, name, minimumPrice, price, productBundleItems }) => {
  //     let item: normalizedServerConfigArray = {
  //       productBundleId: productBundleId || 0,
  //       name: name || "",
  //       minimumPrice: minimumPrice || 0,
  //       price: price || 0,
  //       cpu: 0,
  //       memory: 0,
  //       disk: 0,
  //     };
  //     productBundleItems?.forEach((productBundleItem) => {
  //       switch (productBundleItem.id) {
  //         case 1:
  //           item.cpu = productBundleItem.quantity || 0;
  //           break;
  //         case 2:
  //           item.memory = productBundleItem.quantity || 0;
  //           break;
  //         case 3:
  //           item.disk = productBundleItem.quantity || 0;
  //           break;
  //         default:
  //           break;
  //       }
  //     });
  //     result.push(item);
  //   }
  // );
  return result;
};
