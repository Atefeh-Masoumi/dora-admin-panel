import { FC, useState } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { Add } from "src/components/atoms/svg/AddSvg";
import { useGetApiV2CdnDnsRecordListByZoneNameQuery } from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { zoneTableStruct } from "src/components/organisms/tables/zoneList/struct";
import { ZoneTableRow } from "src/components/organisms/tables/zoneList/ZoneTableRow";
import { useAppSelector } from "src/app/hooks";
import { CreateRecordDialog } from "src/components/organisms/CDN/CreateRecordDialog";
import { SearchBox } from "src/components/molecules/SearchBox";

export const DNSRecord: FC = () => {
  const selectedDomain = useAppSelector((state) => state.cdn.selectedDomain);
  const { data: zoneList, isLoading } =
    useGetApiV2CdnDnsRecordListByZoneNameQuery({
      zoneName: selectedDomain?.zoneName || "",
    });

  const [search, setSearch] = useState("");

  const filteredList = zoneList?.filter((zone) => zone.name?.includes(search));

  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Stack
      bgcolor="white"
      py={2}
      px={3}
      borderRadius={3}
      width="100%"
      direction="row"
      justifyContent="center"
    >
      <Stack width="100%">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "start", md: "center" }}
            width="100%"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Typography fontSize={18} color="secondary" whiteSpace="nowrap">
                  لیست DNS Record
                </Typography>
                <Stack display={{ xs: "none", md: "flex" }}>
                  <SearchBox
                    placeholder="جستجو در نام رکورد"
                    onChange={(text) => setSearch(text)}
                  />
                </Stack>
              </Stack>
              <Stack display={{ xs: "flex", md: "none" }}>
                <Button
                  variant="outlined"
                  onClick={handleOpen}
                  size="large"
                  sx={{ whiteSpace: "nowrap", px: { xs: 0.5, md: 1.2 } }}
                >
                  افزودن رکورد جدید
                </Button>
              </Stack>
            </Stack>
            <Stack display={{ xs: "flex", md: "none" }} width="100%">
              <SearchBox
                placeholder="جستجو در نام رکورد"
                onChange={(text) => setSearch(text)}
                fullWidth
              />
            </Stack>
          </Stack>
          <Stack
            display={{ xs: "none", md: "flex" }}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Button
              variant="outlined"
              onClick={handleOpen}
              size="large"
              sx={{ whiteSpace: "nowrap", px: { xs: 0.2, md: 1.2 } }}
              startIcon={
                <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
              }
            >
              افزودن رکورد جدید
            </Button>
          </Stack>
        </Stack>

        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack py={1.5}>
          <BaseTable
            struct={zoneTableStruct}
            RowComponent={ZoneTableRow}
            rows={filteredList || []}
            text="در حال حاضر رکورد وجود ندارد"
            isLoading={isLoading}
          />
        </Stack>
      </Stack>
      {open && <CreateRecordDialog handleClose={handleClose} />}
    </Stack>
  );
};
