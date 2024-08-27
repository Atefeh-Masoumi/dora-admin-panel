import { ChangeEvent, FC, useState } from "react";
import { Divider, Stack, Typography, MenuItem } from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { serviceTableStruct } from "src/components/organisms/portal/customerProduct/tables/struct";
import ServiceTableRow from "src/components/organisms/portal/customerProduct/tables/ServiceTableRow";
import PageLoading from "src/components/atoms/PageLoading";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import {
  useGetApiMyPortalProductListQuery,
  useGetApiMyPortalCustomerProductListByProductIdQuery,
} from "src/app/services/api.generated";

const Services: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("0");

  const { data: services, isLoading: getServicesLoading } =
    useGetApiMyPortalCustomerProductListByProductIdQuery({
      productId: Number(selectedCategory),
    });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSelectedCategory(event.target.value as string);

  const { data: categories = [], isLoading: getCategoriesLoading } =
    useGetApiMyPortalProductListQuery();

  return (
    <>
      {getCategoriesLoading && <PageLoading />}
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
              {categories.map(({ id, name }) => (
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
                  {name}
                </MenuItem>
              ))}
            </DorsaTextField>
          </Stack>
        </Stack>
        <Divider
          variant="middle"
          sx={{ my: 2, color: "rgba(110, 118, 138, 0.8)" }}
        />
        <Stack>
          <BaseTable
            struct={serviceTableStruct}
            RowComponent={ServiceTableRow}
            rows={services || []}
            text="در حال حاضر سرویس فعالی ندارید"
            isLoading={getServicesLoading}
            initialOrder={3}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default Services;
