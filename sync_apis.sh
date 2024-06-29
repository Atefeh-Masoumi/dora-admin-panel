curl -o swagger.json https://dctm.ir/my/swagger/v1/swagger.json
npx @rtk-incubator/rtk-query-codegen-openapi --hooks swagger.json > ./src/app/services/api.generated.ts --baseQuery src/app/services/baseQuery.ts:baseQuery
rm -rf swagger.json