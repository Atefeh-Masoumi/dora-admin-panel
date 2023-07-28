import { FC, createContext, useState } from "react";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { BORDER_RADIUS_1, BORDER_RADIUS_5 } from "src/configs/theme";
import { useNavigate } from "react-router";
import { RefreshSvg } from "src/components/atoms/svg/RefreshSvg";
import { SearchBox } from "src/components/molecules/SearchBox";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { supportTableStruct } from "src/components/organisms/portal/support/tables/struct";
import { SupportTableRow } from "src/components/organisms/portal/support/tables/SupportTableRow";
import { tickets } from "src/components/organisms/portal/support/constant";
import { useGetPortalPanelSupportListQuery } from "src/app/services/api.generated";

// Define the type for your context value
type DataContextValueType = {
  refetchOnClick: () => any;
};

// Create the context
export const DataContext = createContext<DataContextValueType>({
  refetchOnClick: () => null,
});

const Support: FC = () => {
  const {
    data: supportList,
    refetch,
    isLoading,
  } = useGetPortalPanelSupportListQuery();

  const navigate = useNavigate();

  const refetchOnClick = () => refetch();
  const createCloudOnClick = () => navigate("/portal/support/add-ticket");

  const [search, setSearch] = useState("");
  const [ticket, setTicket] = useState("all");
  const filteredList = supportList?.filter(
    (supportItem) =>
      supportItem.id?.toString().includes(search) &&
      (ticket === "all" ||
        supportItem.supportStatus ===
          tickets.find((t) => t.value === ticket)?.label)
  );

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
          rowGap={4}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
          >
            <Typography fontSize={18} color="secondary">
              لیست تیکت ها
            </Typography>
            <SearchBox
              onChange={(text) => setSearch(text)}
              placeholder="جستجو"
            />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Box component="form" width={{ xs: "160px", md: "185px" }}>
              <DorsaTextField
                inputProps={{ fontSize: "20px !important" }}
                select
                fullWidth
                value={ticket}
                onChange={(e) => setTicket(e.target.value)}
              >
                {tickets.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
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
                    {option.label}
                  </MenuItem>
                ))}
              </DorsaTextField>
            </Box>
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
              تیکت جدید
            </Button>
          </Stack>
        </Stack>

        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={supportTableStruct}
            RowComponent={SupportTableRow}
            rows={filteredList || []}
            text="در حال حاضر تیکت وجود ندارد"
            isLoading={isLoading}
            initialOrder={1}
          />
        </Box>
      </Stack>
    </DataContext.Provider>
  );
};

export default Support;
