import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { FC, useContext, useState } from "react";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { CreateNetworkModal } from "../../dialogs/CreateNetworkModal";
import  VpcNetworkTableRow  from "../../tables/vpcNetworkTableRow";
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
    <Paper
      elevation={1}
      sx={{ p: 2, width: "100%", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
    >
      <Stack
        bgcolor="white"
        px={3}
        width="100%"
        borderRadius={BORDER_RADIUS_1}
        direction="column"
      >
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
      </Stack>
    </Paper>
  );
};

export default SelectVpcNetwork;
