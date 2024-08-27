import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useGetApiMyDomainHostListQuery } from "src/app/services/api.generated";
import { SearchBox } from "src/components/molecules/SearchBox";
import DomainTableRow from "src/components/organisms/domain/tables/DomainTableRow";
import { domainTableStruct } from "src/components/organisms/domain/tables/struct";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const DomainList: FC = () => {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading: getDataLoading,
    refetch,
    isFetching,
  } = useGetApiMyDomainHostListQuery();

  const isLoading = useMemo(
    () => getDataLoading || isFetching,
    [getDataLoading, isFetching]
  );

  const filteredList =
    data?.filter((item) => {
      let result = null;
      if (item?.domainName) {
        result = item?.domainName.includes(search);
      }
      return result;
    }) || [];

  const navigate = useNavigate();
  const createCloudOnClick = () => navigate("/domain/registerDomain");

  return (
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
          <Typography fontSize={18} color="secondary">
            لیست ثبت/تمدید دامنه
          </Typography>
          <SearchBox
            onChange={(text) => setSearch(text)}
            placeholder="جستجو در نام دامنه"
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            onClick={createCloudOnClick}
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
                  sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }}
                />
              </Stack>
            }
          >
            ثبت/تمدید دامنه جدید
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
      <Box width="100%" sx={{ pt: 1.5 }}>
        <BaseTable
          struct={domainTableStruct}
          RowComponent={DomainTableRow}
          rows={filteredList}
          text="در حال حاضر دامنه ای وجود ندارد"
          isLoading={isLoading}
          initialOrder={9}
        />
      </Box>
    </Stack>
  );
};

export default DomainList;
