import { Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { useGetApiMyVpcIpListByVpcHostIdQuery } from "src/app/services/api.generated";
import { Add } from "src/components/atoms/svg-icons/AddSvg";
import { SearchBox } from "src/components/molecules/SearchBox";
import { CreateRecordDialog } from "src/components/organisms/cdn/edit/dns/dialogs/CreateRecordDialog";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { CreateVpcIpDialog } from "src/components/organisms/vpc/dialogs/CreateVpcIpDialog";
import { VpcIpTableRow } from "src/components/organisms/vpc/tables/VpcIpTableRow";
import { vpcIpTableStruct } from "src/components/organisms/vpc/tables/struct";
import { BORDER_RADIUS_1 } from "src/configs/theme";
// import { ZoneTableRow } from "./tables/DnsTableRow";

export const VpcIp: FC = () => {
  const { vpcId } = useParams();
  const vpcHostId = Number(vpcId) || 0;

  const { data: vpcIpList, isLoading } = useGetApiMyVpcIpListByVpcHostIdQuery({
    vpcHostId: vpcHostId,
  });

  const [search, setSearch] = useState("");

  const filteredList = vpcIpList?.filter((ip) => ip.ip?.includes(search));

  const handleOpen = () => setShowDialog(true);
  const [showDialog, setShowDialog] = useState(false);
  const handleClose = () => setShowDialog(false);

  return (
    <Stack
      bgcolor="white"
      py={2}
      px={3}
      borderRadius={BORDER_RADIUS_1}
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
                  لیست Vpc IP
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
                  افزودن IP جدید
                </Button>
              </Stack>
            </Stack>
            <Stack display={{ xs: "flex", md: "none" }} width="100%">
              <SearchBox
                placeholder="جستجو "
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
              افزودن IP جدید
            </Button>
          </Stack>
        </Stack>

        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack py={1.5}>
          <BaseTable
            struct={vpcIpTableStruct}
            RowComponent={VpcIpTableRow}
            rows={filteredList || []}
            text="در حال حاضر رکورد وجود ندارد"
            isLoading={isLoading}
          />
        </Stack>
      </Stack>
      <CreateVpcIpDialog
        open={showDialog}
        vpcHostId={vpcHostId}
        // openDialog={showDialog}
        onClose={handleClose}
      />
    </Stack>
  );
};
