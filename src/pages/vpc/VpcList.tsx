import { Add } from "@mui/icons-material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { useGetApiMyVpcHostListQuery } from "src/app/services/api.generated";
import { SearchBox } from "src/components/molecules/SearchBox";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { vpcTableStruct } from "src/components/organisms/vpc/tables/struct";
import VpcTableRow from "src/components/organisms/vpc/tables/VpcTableRow";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const VpcList: FC = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetApiMyVpcHostListQuery();

  const filteredList =
    data?.filter((item) => {
      let result = null;
      if (item?.name) {
        result = item?.name.includes(search);
      }
      return result;
    }) || [];

  const navigate = useNavigate();

  const gotToAddVpc = () => navigate("/vpc/add");

  return (
    <>
      <Stack
        p={3}
        mb={3}
        bgcolor="warning.main"
        direction="row"
        gap={1}
        borderRadius={BORDER_RADIUS_1}
        width="100%"
        color="white"
        alignItems={{ xs: "start", md: "center" }}
      >
        <ErrorOutlineOutlinedIcon />
        <Typography>توجه:</Typography>
        <Typography
          fontSize={14}
          sx={{
            opacity: 0.9,
          }}
        >
          این سرویس نسخه آزمایشی می باشد.
          <br />
        </Typography>
      </Stack>
      <Stack
        bgcolor="white"
        py={3}
        px={3}
        width="100%"
        borderRadius={BORDER_RADIUS_1}
        direction="column"
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          rowGap={3}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
          >
            <Typography fontSize={18} color="rgba(110, 118, 138, 1)">
              لیست ابر اختصاصی
            </Typography>
            <SearchBox
              onChange={(text) => setSearch(text)}
              placeholder="جستجو در نام سرویس"
            />
          </Stack>
          <Button
            onClick={gotToAddVpc}
            variant="outlined"
            size="large"
            sx={{
              whiteSpace: "nowrap",
              px: 1.2,
              borderRadius: BORDER_RADIUS_1,
            }}
            startIcon={
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: 24,
                  height: 24,
                  border: ({ palette }) => "1px solid " + palette.primary.main,
                  borderRadius: BORDER_RADIUS_1,
                }}
              >
                <Add
                  fontSize="small"
                  sx={{ "& path": { stroke: "#00a651" } }}
                />
              </Stack>
            }
          >
            ایجاد ابر اختصاصی
          </Button>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={vpcTableStruct}
            RowComponent={VpcTableRow}
            rows={filteredList}
            text="در حال حاضر سرویس ابری وجود ندارد"
            isLoading={isLoading}
            initialOrder={9}
          />
        </Box>
      </Stack>
    </>
  );
};

export default VpcList;
