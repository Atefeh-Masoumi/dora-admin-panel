import { ChangeEvent, FC, useState, useMemo, useCallback } from "react";
import { Divider, Stack, Typography, MenuItem, Paper } from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { serviceTableStruct } from "src/components/organisms/portal/customerProduct/tables/struct";
import ServiceTableRow from "src/components/organisms/portal/customerProduct/tables/ServiceTableRow";
import PageLoading from "src/components/atoms/PageLoading";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import {
 
  useGetApiMyFinancialOrderListByProductIdQuery
} from "src/app/services/api.generated";
// import { EmptyTable } from "src/components/molecule/EmptyTable";

const Services: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("0");

  const { data: services = [], isLoading: getServicesLoading } =
  useGetApiMyFinancialOrderListByProductIdQuery({
       productId: 0 });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSelectedCategory(event.target.value as string);



  // Normalize services to get unique product IDs
  const servicesListNormalizer = useMemo(() => {
    const result: number[] = [];
    services.forEach(({ productId }) => {
      if (productId === undefined) return;
      if (result.includes(productId)) return;
      result.push(productId);
    });
    return result;
  }, [services]);

  // Helper function to get product name by ID
  const productName = useCallback(
    (productId: number) =>
      services.find((item) => item.productId === productId)?.product || "",
    [services]
  );

  // Helper function to filter services by product ID
  const filterServices = useCallback(
    (productId: number) =>
      services.filter((item) => item.productId === productId),
    [services]
  );


  return (
    <>
      <Stack
        borderRadius={BORDER_RADIUS_1}
        bgcolor="white"
        p={{ xs: 1.8, lg: 3 }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "start", md: "center" }}
        >
          <Typography variant="text1" color="secondary" whiteSpace="nowrap">
            لیست سرویس ها
          </Typography>
          <Stack minWidth={150}>
            <DorsaTextField
              select
              label="محصولات"
              value={selectedCategory}
              onChange={handleChange}
            >
              <MenuItem
                value={"0"}
                sx={{
                  borderRadius: 1,
                  backgroundColor: "#F3F4F6",
                  m: 0.5,
                  py: 1.5,
                  color: "secondary",
                  "&: focus": {
                    color: "rgba(60, 138, 255, 1)",
                    backgroundColor: "rgba(60, 138, 255, 0.1)",
                  },
                }}
              >
                هیچکدام
              </MenuItem>
              {services.map(({ id, product }) => (
                <MenuItem
                  key={id}
                  value={id}
                  sx={{
                    borderRadius: 1,
                    backgroundColor: "#F3F4F6",
                    m: 0.5,
                    py: 1.5,
                    color: "secondary",
                    "&: focus": {
                      color: "rgba(60, 138, 255, 1)",
                      backgroundColor: "rgba(60, 138, 255, 0.1)",
                    },
                  }}
                >
                  {product}
                </MenuItem>
              ))}
            </DorsaTextField>
          </Stack>
        </Stack>
        <Divider
          variant="middle"
          sx={{ my: 2, color: "rgba(110, 118, 138, 0.8)" }}
        />
        <Stack p={2}>
          {getServicesLoading ? (
            <PageLoading />
          ) : servicesListNormalizer.length === 0 ? (
            <Paper>
              {/* <EmptyTable /> */}
            </Paper>
          ) : (
            servicesListNormalizer.map((productId) => {
              return (
                <Stack key={productId} m={3}>
                  <Typography variant="text2" mb={2} fontWeight={"bold"}>
                    {productName(productId)}
                  </Typography>
                  <BaseTable
                    struct={serviceTableStruct}
                    RowComponent={ServiceTableRow}
                    rows={filterServices(productId)}
                    text="در حال حاضر سرویس فعالی ندارید"
                    isLoading={getServicesLoading}
                    initialOrder={3}
                    rowsPerPage={50}
                  />
                </Stack>
              );
            })
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Services;