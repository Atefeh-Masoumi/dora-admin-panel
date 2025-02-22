import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { FC, useContext, useState } from "react";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { CreateNetworkModal } from "../../dialogs/CreateNetworkModal";
import VpcNetworkTableRow from "../../tables/vpcNetworkTableRow";
import { vpcTableNetworkStruct } from "../../tables/vpcTableNetworkStruct";
import { AddVpcContext } from "../contexts/AddVpcContext";

export type NetworkItemsType = {
  id?: number;
  gatewayCidr: string;
  name: string;
};

const SelectVpcNetwork: FC = () => {
  const { selectedNetworkList, setSelectedNetworkList } =
    useContext(AddVpcContext);

  const [dialogType, setDialogType] = useState<"CREATE" | null>(null);

  const openDialogHandler = () => {
    setDialogType("CREATE");
  };

  const closeDialogs = () => {
    setDialogType(null);
  };

  const handleDeleteNetwork = (id: number) => {
    setSelectedNetworkList(
      (prevList: any) =>
        prevList && prevList?.filter((network: any) => network.id !== id)
    );
  };

  return (
    <>
      <Stack spacing={2}>
        <Typography fontSize={24} fontWeight="bold" align="center">
          مشخصات شبکه های خود را انتخاب کنید
        </Typography>
      </Stack>

      <Box sx={{ px: { lg: 5 }, pt: 5 }}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item>
            <Typography>انتخاب شبکه</Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={openDialogHandler}>
              افزودن شبکه
            </Button>
          </Grid>
        </Grid>
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={vpcTableNetworkStruct}
            RowComponent={(props) => (
              <VpcNetworkTableRow {...props} onDelete={handleDeleteNetwork} />
            )}
            rows={selectedNetworkList as any[]}
            text="در حال حاضر نتورکی وجود ندارد"
            isLoading={false}
          />
        </Box>
        <CreateNetworkModal
          maxWidth="xs"
          fullWidth
          open={dialogType === "CREATE"}
          onClose={closeDialogs}
          setSelectedNetworkList={setSelectedNetworkList}
          selectedNetworkList={selectedNetworkList as any[]}
        />
      </Box>
    </>
  );
};

export default SelectVpcNetwork;
