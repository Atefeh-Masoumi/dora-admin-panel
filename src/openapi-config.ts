import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "swagger.json",
  apiFile: "./app/services/emptyApi.ts",
  outputFile: "./app/services/api.generated.ts",
  hooks: true,
};

export default config;
