import {
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import {
  GetVpcGatewayNatResponse,
  useGetApiMyVpcNatListByVpcHostIdQuery,
} from "src/app/services/api.generated";
import { Add } from "src/components/atoms/svg-icons/AddSvg";
import { SearchBox } from "src/components/molecules/SearchBox";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { CreateDestinationNatDialog } from "src/components/organisms/vpc/dialogs/CreateDestinationNatDialog";
import { VpcNatTableRow } from "src/components/organisms/vpc/tables/VpcNatTableRow";
import { vpcNatTableStruct } from "src/components/organisms/vpc/tables/struct";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import AddIcon from "@mui/icons-material/Add";

import { NAT_TYPE } from "src/constant/vpc";
import { CreateSourceNatDialog } from "src/components/organisms/vpc/dialogs/CreateSourceNatDialog";

export const VpcNat: FC = () => {
  const [search, setSearch] = useState("");
  const [dialogType, setDialogType] = useState<"DELETE" | "CREATE" | null>(
    null
  );
  const [selectedNatType, setSelectedNatType] = useState<NAT_TYPE>(
    NAT_TYPE.D_NAT
  );

  const closeDialogs = () => {
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
              <Stack direction="row" alignItems="center" spacing={1.5}>
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
                <Stack width="auto" direction="row">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setDialogType("CREATE")}
                  >
                    <AddIcon />
                  </Button>
                  <FormControl size="small" fullWidth>
                    <Select
                      value={selectedNatType}
                      onChange={(event) => {
                        setSelectedNatType(Number(event.target.value));
                        setDialogType(null);
                      }}
                    >
                      <MenuItem value={NAT_TYPE.S_NAT}>افزودن SNAT</MenuItem>
                      <MenuItem value={NAT_TYPE.D_NAT}>افزودن DNAT</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
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
          <Stack display={{ xs: "none", md: "flex" }}>
            <Stack width="auto" direction="row">
              <Button
                size="small"
                variant="outlined"
                onClick={() => setDialogType("CREATE")}
                sx={{
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: 0,
                  bgcolor: "primary.main",
                  // "&:hover": {
                  //   backgroundColor: "inherit", // Override hover background color
                  //   color: "inherit", // Override hover text color
                  // },
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "primary.main",
                  },
                }}
              >
                <AddIcon sx={{ color: "white" }} />
              </Button>
              <FormControl
                size="small"
                fullWidth
                sx={{ borderTopLeftRadius: 0 }}
              >
                <Select
                  sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                  value={selectedNatType}
                  onChange={(event) => {
                    setSelectedNatType(Number(event.target.value));
                    setDialogType(null);
                  }}
                >
                  <MenuItem value={NAT_TYPE.S_NAT}>افزودن SNat جدید</MenuItem>
                  <MenuItem value={NAT_TYPE.D_NAT}>افزودن DNat جدید</MenuItem>
                </Select>
              </FormControl>
            </Stack>
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
      <CreateDestinationNatDialog
        maxWidth="md"
        fullWidth
        open={dialogType === "CREATE" && selectedNatType === NAT_TYPE.D_NAT}
        onClose={closeDialogs}
        forceClose={() => setDialogType(null)}
      />

      <CreateSourceNatDialog
        maxWidth="md"
        fullWidth
        open={dialogType === "CREATE" && selectedNatType === NAT_TYPE.S_NAT}
        onClose={closeDialogs}
        forceClose={() => setDialogType(null)}
      />
    </Stack>
  );
};
