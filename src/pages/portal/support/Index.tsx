import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { useGetApiMyPortalIssueListQuery } from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { SearchBox } from "src/components/molecules/SearchBox";
import { tickets } from "src/components/organisms/portal/support/constant";
import SupportTableRow from "src/components/organisms/portal/support/tables/SupportTableRow";
import { supportTableStruct } from "src/components/organisms/portal/support/tables/struct";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const Support: FC = () => {
  const { data: issueList, isLoading } = useGetApiMyPortalIssueListQuery();

  const navigate = useNavigate();

  const createCloudOnClick = () => navigate("/portal/support/add-ticket");

  const [search, setSearch] = useState("");
  const [ticket, setTicket] = useState("all");
  const filteredList = issueList?.filter(
    (issueItem) =>
      issueItem.id?.toString().includes(search) &&
      (ticket === "all" ||
        issueItem.issueStatus ===
          tickets.find((t) => t.value === ticket)?.label)
  );

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
        rowGap={4}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          spacing={2}
        >
          <Typography fontSize={18} color="rgba(110, 118, 138, 1)">
            لیست تیکت ها
          </Typography>
          <SearchBox onChange={(text) => setSearch(text)} placeholder="جستجو" />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Box component="form" width={{ xs: "160px", md: "185px" }}>
            <DorsaTextField
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
                  sx={{ "& path": { stroke: "#00a651" } }}
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
  );
};

export default Support;
