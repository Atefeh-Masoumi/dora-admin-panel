import { FC, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { SearchBox } from "src/components/molecules/SearchBox";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { Add } from "src/components/atoms/svg/AddSvg";
import { supportTableStruct } from "src/components/organisms/portal/support/tables/struct";
import { SupportTableRow } from "src/components/organisms/portal/support/tables/SupportTableRow";
import { tickets } from "src/components/organisms/portal/support/constant";
import { useGetUserV2PortalSupportListQuery } from "src/app/services/api.generated";
import { RefreshSvg } from "src/components/atoms/svg/RefreshSvg";
import { BORDER_RADIUS_5 } from "src/configs/theme";
import { useNavigate } from "react-router";

const Support: FC = () => {
  const { data: supportList, refetch, isLoading } = useGetUserV2PortalSupportListQuery();

  const navigate = useNavigate();

  const refetchOnClick = () => refetch();
  const createOnClick = () => navigate("/portal/support/addSupport");

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
    <Stack borderRadius={2} bgcolor="white" p={{ xs: 1.8, lg: 2.2 }}>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        px={{ xs: 0, md: 2 }}
      >
        <Grid item order={{ md: 1 }}>
          <Typography
            variant="text1"
            color="secondary"
            display={{ xs: "none", md: "block" }}
          >
            لیست تیکت ها
          </Typography>
        </Grid>
        <Grid item order={{ xs: 2, md: 2 }}>
          <Box width={{ xs: "160px", md: "185px" }}>
            <SearchBox
              onChange={(text) => setSearch(text)}
              placeholder="جستجو ..."
            />
          </Box>
        </Grid>
        <Grid item order={{ xs: 4, md: 3 }}>
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
        </Grid>
        <Grid item order={{ xs: 3, md: 4 }}>
          <Button
            onClick={refetchOnClick}
            variant="outlined"
            size="large"
            sx={{ whiteSpace: "nowrap", px: 1.2, borderRadius: BORDER_RADIUS_5, }}
            startIcon={<RefreshSvg sx={{ width: 20, height: 20 }} />}
          >
            بازخوانی
          </Button>
        </Grid>

        <Grid item order={{ xs: 1, md: 5 }}>
          <Button
            onClick={createOnClick}
            variant="outlined"
            size="large"
            sx={{ whiteSpace: "nowrap", px: 1.2, borderRadius: BORDER_RADIUS_5, }}
            startIcon={<Add sx={{ stroke: "rgba(60, 138, 255, 1)" }} />}
          >
            ثبت تیکت جدید
          </Button>
        </Grid>
      </Grid>
      <Divider
        variant="middle"
        sx={{ my: 2, color: "rgba(110, 118, 138, 0.8)" }}
      />
      <Stack>
        <BaseTable
          struct={supportTableStruct}
          RowComponent={SupportTableRow}
          rows={filteredList || []}
          text="در حال حاضر تیکت وجود ندارد"
          isLoading={isLoading}
          initialOrder={1}
        />
      </Stack>
    </Stack >
  );
};

export default Support;
