# curl -o swagger.json http://192.168.5.182:5002/swagger/v1/swagger.json
curl -o swagger.json http://dctm.ir/swagger/v1/swagger.json
curl -o swagger.json http://localhost:5000/swagger/v1/swagger.json
npx @rtk-incubator/rtk-query-codegen-openapi --hooks swagger.json > ./src/app/services/api.generated.ts --baseQuery src/app/services/baseQuery.ts:baseQuery
rm -rf swagger.json