import { FC, useState, createContext, useEffect, SetStateAction } from "react";
import {
  VmListResponse,
  usePostApiVmHostListMutation,
} from "src/app/services/api.generated";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { Add } from "@mui/icons-material";
import { AddVmTableRow } from "src/components/organisms/vm/tables/VmTableRow";
import { addVmTableStruct } from "src/components/organisms/vm/tables/struct";
import { BORDER_RADIUS_1, BORDER_RADIUS_5 } from "src/configs/theme";
import { RefreshSvg } from "src/components/atoms/svg/RefreshSvg";
import { SearchBox } from "src/components/molecules/SearchBox";
import { useNavigate } from "react-router";
import { useAppSelector } from "src/app/hooks";

// Define the type for your context value
type DataContextValueType = {
  refetchOnClick: () => any;
};

// Create the context
export const DataContext = createContext<DataContextValueType>({
  refetchOnClick: () => null,
});

type VmManagementPropsType = {};

const VmManagement: FC<VmManagementPropsType> = () => {
  const selectVmProjects = useAppSelector(
    (store) => store.vmProject.selectedVmProject
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (selectVmProjects) return;
    navigate('/vm');
  }, [navigate, selectVmProjects]);

  const vmProjectId = selectVmProjects?.id;

  const [search, setSearch] = useState("");

  const [vmList, setVmList] = useState<VmListResponse[]>([]);

  const [selectList, { isLoading: vmListLoading }] =
    usePostApiVmHostListMutation();
  useEffect(() => {
    selectList({
      vmListModel: {
        vmProjectId: vmProjectId,
      },
    })
      .unwrap()
      .then((res: SetStateAction<VmListResponse[]>) => setVmList(res));
  }, [selectList, selectVmProjects]);

  const filteredList =
    vmList?.filter((item) => {
      let result = null;
      if (item?.name) {
        result = item?.name.includes(search);
      }
      return result;
    }) || [];

  const refetchOnClick = () => null;
  const createCloudOnClick = () => navigate("/vm/add-vm");

  return (
    <DataContext.Provider value={{ refetchOnClick }}>
      <Stack
        bgcolor="white"
        py={3}
        px={3}
        width="100%"
        borderRadius={3}
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
            <SearchBox
              onChange={(text) => setSearch(text)}
              placeholder="جستجو در نام ماشین"
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              onClick={refetchOnClick}
              variant="outlined"
              size="large"
              sx={{
                whiteSpace: "nowrap",
                px: 1.2,
                borderRadius: BORDER_RADIUS_5,
              }}
              startIcon={<RefreshSvg sx={{ width: 20, height: 20 }} />}
            >
              بازخوانی
            </Button>
            <Button
              onClick={createCloudOnClick}
              variant="outlined"
              size="large"
              sx={{
                whiteSpace: "nowrap",
                px: 1.2,
                borderRadius: BORDER_RADIUS_5,
              }}
              startIcon={
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: 24,
                    height: 24,
                    border: ({ palette }) =>
                      "1px solid " + palette.primary.main,
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
              سرور ابری جدید
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
            isLoading={vmListLoading}
            initialOrder={9}
          />
        </Box>
      </Stack>
    </DataContext.Provider>
  );
};

export default VmManagement;
