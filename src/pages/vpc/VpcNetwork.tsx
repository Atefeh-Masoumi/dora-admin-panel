import { Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { useGetApiMyVpcNetworkListByVpcHostIdQuery } from "src/app/services/api.generated";
import { Add } from "src/components/atoms/svg-icons/AddSvg";
import { SearchBox } from "src/components/molecules/SearchBox";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { CreateNetworkRecordModal } from "src/components/organisms/vpc/dialogs/CreateNetworkRecordModal";
import { vpcNetworkStruct } from "src/components/organisms/vpc/tables/struct";
import VpcNetworkListTableRow from "src/components/organisms/vpc/tables/VpcNetworkListTableRow";
import { BORDER_RADIUS_1 } from "src/configs/theme";

export const VpcNetwork: FC = () => {
  const [dialogType, setDialogType] = useState<"CREATE" | null>(null);
  const { vpcId } = useParams();
  const vpcHostId = Number(vpcId) || 0;

  const { data: vpcNetworkList, isLoading } =
    useGetApiMyVpcNetworkListByVpcHostIdQuery({
      vpcHostId: vpcHostId,
    });

  const [search, setSearch] = useState("");

  const filteredList = vpcNetworkList?.filter((network) =>
    network.name?.includes(search)
  );

  const openDialogHandler = () => {
    setDialogType("CREATE");
  };

  const closeDialogs = () => {
    setDialogType(null);
  };

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
                  لیست شبکه ها
                </Typography>
                <Stack display={{ xs: "none", md: "flex" }}>
                  <SearchBox
                    placeholder="جستجو در نام رکورد"
                    onChange={(text) => setSearch(text)}
                  />
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
          <Stack
            display={{ xs: "none", md: "flex" }}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Button
              variant="outlined"
              onClick={openDialogHandler}
              size="large"
              sx={{ whiteSpace: "nowrap", px: { xs: 0.2, md: 1.2 } }}
              startIcon={
                <Add sx={{ "& path": { stroke: "#00a651" } }} />
              }
            >
              افزودن Network
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack py={1.5}>
          <BaseTable
            struct={vpcNetworkStruct}
            RowComponent={VpcNetworkListTableRow}
            rows={filteredList || []}
            text="در حال حاضر رکورد وجود ندارد"
            isLoading={isLoading}
          />
        </Stack>
      </Stack>
      <CreateNetworkRecordModal
        maxWidth="xs"
        fullWidth
        open={dialogType === "CREATE"}
        onClose={closeDialogs}
      />
    </Stack>
  );
};
