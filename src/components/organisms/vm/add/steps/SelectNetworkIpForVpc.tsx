import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetApiMyVpcNetworkShortListByVpcHostIdQuery } from "src/app/services/api.generated";
import { ipValidation } from "src/utils/regex.utils";

type SelectNetworkIpForVpcPropsType = {
  handleSelectedNetwork: (network: string | number | null) => void;
  handleSelectedIp: (ip: string | number | null) => void;
};

export const SelectNetworkIpForVpc: FC<SelectNetworkIpForVpcPropsType> = ({
  handleSelectedNetwork,
  handleSelectedIp,
}) => {
  const [searchParams] = useSearchParams();
  const vpcId = searchParams.get("vpcId");
  const [selectedIp, setSelectedIp] = useState("");
  const [selectedNetworkId, setSelectedNetworkId] = useState<number | null>(
    null
  );

  const { data: vpcNetworkList = [] } =
    useGetApiMyVpcNetworkShortListByVpcHostIdQuery({
      vpcHostId: Number(vpcId) || 0,
    });

  return (
    <Stack
      justifyContent="center"
      direction={{ xs: "column", lg: "row" }}
      gap={2}
    >
      <Box sx={{ width: "100%", p: 2 }}>
        <Stack direction="column" rowGap={2}>
          <Typography fontSize={24} fontWeight="bold">
            انتخاب شبکه
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Typography color="text.light">
            لطفا Network را انتخاب کنید.
          </Typography>
          <FormControl
            sx={{
              selectLabel: {
                display: "flex",
                alignItems: "center",
              },
            }}
            fullWidth
          >
            <InputLabel id="network-network">Network</InputLabel>
            <Select
              value={selectedNetworkId}
              onChange={(event) => {
                handleSelectedNetwork(event.target.value);
                setSelectedNetworkId(Number(event.target.value));
              }}
              labelId="network-network"
              id="network-select"
              label="Network"
            >
              {vpcNetworkList?.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>
      <Box sx={{ width: "100%", p: 2 }}>
        <Stack direction="column" rowGap={2}>
          <Typography fontSize={24} fontWeight="bold">
            آدرس IP
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Typography color="text.light">لطفا IP را انتخاب کنید.</Typography>
          <TextField
            value={selectedIp}
            onChange={(event) => {
              handleSelectedIp(event?.target.value);
              setSelectedIp(event?.target?.value);
            }}
            autoComplete="off"
            InputProps={{
              inputProps: {
                pattern: ipValidation.source,
                title: "Please enter only alphanumeric characters",
              },
            }}
            fullWidth
          />
        </Stack>
      </Box>
    </Stack>
  );
};
