import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "https://dctm.ir/my/swagger/v1/swagger.json",
  apiFile: "./app/services/emptyApi.ts",
  outputFile: "./app/services/api.generated.ts",
  hooks: true,
};

export default config;
