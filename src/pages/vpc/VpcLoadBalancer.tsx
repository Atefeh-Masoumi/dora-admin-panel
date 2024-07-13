import {
  Button,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { useGetApiMyVpcLoadBalancerGetVirtualServersByIdQuery } from "src/app/services/api.generated";
import { Add } from "src/components/atoms/svg-icons/AddSvg";
import { SearchBox } from "src/components/molecules/SearchBox";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { CreateVpcLoadBalancerDialog } from "src/components/organisms/vpc/dialogs/CreateVpcLoadBalancerDialog";
import { vpcLoadBalanceStruct } from "src/components/organisms/vpc/tables/struct";
import { VpcLoadBalanceListTableRow } from "src/components/organisms/vpc/tables/VpcLoadBalanceListTableRow";
import { VpcNetworkListTableRow } from "src/components/organisms/vpc/tables/VpcNetworkListTableRow";
import { BORDER_RADIUS_1 } from "src/configs/theme";

export const VpcLoadBalancer: FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const { vpcId } = useParams();
  const vpcHostId = Number(vpcId) || 0;

  const { data: vpcLoadBalancerList, isLoading } =
    useGetApiMyVpcLoadBalancerGetVirtualServersByIdQuery({
      id: vpcHostId,
    });

  const [search, setSearch] = useState("");

  const filteredList = vpcLoadBalancerList?.filter((loadBalancer) =>
    loadBalancer.name?.includes(search)
  );

  const openDialogHandler = () => {
    setShowDialog(true);
  };

  const closeDialogs = () => {
    setShowDialog(false);
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
                  لیست LoadBalancer
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
                <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
              }
            >
              افزودن LoadBalancer جدید
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack py={1.5}>
          {/* <BaseTable
            struct={vpcLoadBalanceStruct}
            RowComponent={VpcLoadBalanceListTableRow}
            rows={filteredList || []}
            text="در حال حاضر رکورد وجود ندارد"
            isLoading={isLoading}
          /> */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {vpcLoadBalanceStruct.map((item, index) => {
                    return (
                      <TableCell align="center" key={index}>
                        {item.label}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredList &&
                  filteredList.map((item, index) => (
                    <VpcLoadBalanceListTableRow
                      rowBgColor={
                        (index + 1) % 2 === 0 ? "" : "rgba(240, 247, 255, 1)"
                      }
                      key={index}
                      rowData={item}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
      <CreateVpcLoadBalancerDialog
        openDialog={showDialog}
        onClose={closeDialogs}
      />
    </Stack>
  );
};
