import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

type directionType = "rtl" | "ltr" | undefined;

const createEmotionCache = (direction: directionType = "rtl") => {
  let result: any = { key: "css" };
  if (direction === "rtl") {
    result = { key: "muirtl", stylisPlugins: [prefixer, rtlPlugin] };
  }
  return createCache(result);
};

export default createEmotionCache;
