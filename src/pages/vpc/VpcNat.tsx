import { Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import {
  GetVpcGatewayNatResponse,
  useGetApiMyVpcNatListByVpcHostIdQuery,
} from "src/app/services/api.generated";
import { Add } from "src/components/atoms/svg-icons/AddSvg";
import { SearchBox } from "src/components/molecules/SearchBox";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { CreateNatDialog } from "src/components/organisms/vpc/dialogs/CreateNatModal";
import { VpcNatTableRow } from "src/components/organisms/vpc/tables/VpcNatTableRow";
import { vpcNatTableStruct } from "src/components/organisms/vpc/tables/struct";
import { BORDER_RADIUS_1 } from "src/configs/theme";

export const VpcNat: FC = () => {
  const [search, setSearch] = useState("");
  const [dialogType, setDialogType] = useState<"DELETE" | "CREATE" | null>(
    null
  );

  const [selectedNat, setSelectedNat] =
    useState<GetVpcGatewayNatResponse | null>(null);

  const closeDialogs = () => {
    setSelectedNat(null);
    setDialogType(null);
  };

  const { vpcId } = useParams();
  const vpcHostId = Number(vpcId) || 0;

  const { data: vpcNatList, isLoading } = useGetApiMyVpcNatListByVpcHostIdQuery(
    {
      vpcHostId: vpcHostId,
    }
  );

  const filteredList = vpcNatList?.filter((nat) => nat.name?.includes(search));

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
              <Stack  direction="row" alignItems="center" spacing={1.5}>
                <Typography fontSize={18} color="secondary" whiteSpace="nowrap">
                  لیست NAT ها
                </Typography>
                <Stack display={{ xs: "none", md: "flex" }}>
                  <SearchBox
                    placeholder="جستجو "
                    onChange={(text) => setSearch(text)}
                  />
                </Stack>
              </Stack>
              <Stack display={{ xs: "flex", md: "none" }}>
                <Button
                  variant="outlined"
                  onClick={() => setDialogType("CREATE")}
                  size="large"
                  sx={{ whiteSpace: "nowrap", px: { xs: 0.5, md: 1.2 } }}
                >
                  افزودن Nat جدید
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
              onClick={() => setDialogType("CREATE")}
              size="large"
              sx={{ whiteSpace: "nowrap", px: { xs: 0.2, md: 1.2 } }}
              startIcon={
                <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
              }
            >
              افزودن Nat جدید
            </Button>
          </Stack>
        </Stack>

        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack py={1.5}>
          <BaseTable
            struct={vpcNatTableStruct}
            RowComponent={VpcNatTableRow}
            rows={filteredList || []}
            text="در حال حاضر رکورد وجود ندارد"
            isLoading={isLoading}
          />
        </Stack>
      </Stack>
      <CreateNatDialog
        maxWidth="md"
        fullWidth
        open={dialogType === "CREATE"}
        onClose={closeDialogs}
        forceClose={() => setDialogType(null)}
        selectedNat={selectedNat && selectedNat}
      />
    </Stack>
  );
};
