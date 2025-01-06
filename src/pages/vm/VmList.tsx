import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { SearchBox } from "src/components/molecules/SearchBox";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { addVmTableStruct } from "src/components/organisms/vm/tables/struct";
import AddVmTableRow from "src/components/organisms/vm/tables/VmTableRow";
import { useGetApiMyVmHostListByVmProjectIdQuery } from "src/app/services/api.generated";
import { RefreshButton } from "src/components/atoms/RefreshButton";

const VmList: FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const {
    data: vmList,
    isLoading: getVmListLoading,
    refetch,
    isFetching
  } = useGetApiMyVmHostListByVmProjectIdQuery({
    vmProjectId: Number(projectId),
  });

  useEffect(() => {
    const getNotifInterval = setInterval(() => {
      refetch();
    }, 120 * 1000);
    return () => {
      clearInterval(getNotifInterval);
    };
  }, [refetch]);

  const filteredList =
    vmList?.filter((item) => {
      let result = null;
      if (item?.name) {
        result = item?.name.includes(search);
      }
      return result;
    }) || [];

  const createCloudOnClick = () => navigate(`/vm/${projectId}/add-vm`);

  return (
    <>
      {/* <Stack
        p={2.5}
        mb={1}
        bgcolor="warning.main"
        direction="row"
        spacing={1}
        borderRadius={BORDER_RADIUS_1}
        width="100%"
        color="white"
        alignItems={{ xs: "start", md: "center" }}
      >
        <ErrorOutlineOutlinedIcon />
        <Typography variant="text14">
          استفاده از ترافیک غیرمجاز پیگرد قانونی دارد.
        </Typography>
      </Stack> */}
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
              لیست سرورهای ابری
            </Typography>
            <RefreshButton isFetching={isFetching} refetchData={refetch} />
            
          </Stack>
          <Stack 
             direction={{ xs: "column", sm: "row" }}
             alignItems="center"
             spacing={2}
           >
            <SearchBox
              onChange={(text) => setSearch(text)}
              placeholder="جستجو در نام ماشین"
            />
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
            ایجاد سرور ابری
          </Button>
           </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={addVmTableStruct}
            RowComponent={AddVmTableRow}
            rows={filteredList}
            text="در حال حاضر سروری وجود ندارد"
            isLoading={getVmListLoading}
            initialOrder={9}
          />
        </Box>
      </Stack>
    </>
  );
};

export default VmList;
