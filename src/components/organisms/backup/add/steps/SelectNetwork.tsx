import { FC, useContext } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useGetApiMyVmByProjectIdNetworkShortListQuery,
} from "src/app/services/api.generated";
import { AddBckupVMContext } from "../contex/AddBackupContext";

export const SelectNetwork: FC = () => {
  const { projectId } = useParams();
  const {
    usePublicIpV4,
    setUsePublicIpV4,
    usePublicIpV6,
    setUsePublicIpV6,
    usePrivateNetwork,
    setUsePrivateNetwork,
    selectedNetwork,
    setSelectedNetwork,
    ipAddress,
    setIpAddress,
  } = useContext(AddBckupVMContext);

  const { data: vmNetworkList } = useGetApiMyVmByProjectIdNetworkShortListQuery(
    {
      projectId: Number(projectId),
    }
  );


  const handlePrivateNetworkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsePrivateNetwork(event.target.checked);
    if (!event.target.checked) {
      setSelectedNetwork(null);
      setIpAddress(null);
    }
  };


  return (
    <Paper sx={{ p: 2, boxShadow: "none" }}>
      <Stack direction="column" rowGap={2}>
        <Typography fontSize={24} fontWeight="bold" align="center">
          تنظیمات شبکه
        </Typography>
        <Typography
          align="center"
          fontSize={16}
          sx={{ color: ({ palette }) => palette.grey[700] }}
        >
          تنظیمات اتصال شبکه و فایروال مورد نیاز سرور را انتخاب کنید
        </Typography>
        <Stack gap={2} direction={{ md: "column", xl: "column" }}>
          <Box
            p={1.5}
            sx={{
              width: "100%",
              border: ({ palette }) => `1px solid ${palette.grey}`,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={usePublicIpV4}
                  onChange={(e) => setUsePublicIpV4(e.target.checked)}
                />
              }
              label="استفاده از IP عمومی IPv4"
            />
            <Typography pt={1} pr={1} pl={4}>
              با فعال‌سازی IP عمومی نسخه IPv4، سرور از اینترنت قابل دسترسی خواهد
              بود.
            </Typography>
          </Box>

          <Box
            p={1.5}
            sx={{
              width: "100%",
              border: ({ palette }) => `1px solid ${palette.grey}`,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={usePublicIpV6}
                  onChange={(e) => setUsePublicIpV6(e.target.checked)}
                />
              }
              label="استفاده از IP عمومی IPv6"
            />
            <Typography pt={1} pr={1} pl={4}>
              با فعال‌سازی IP عمومی نسخه IPv6، سرور از اینترنت قابل دسترسی خواهد
              بود.
            </Typography>
          </Box>

          <Box
            p={1.5}
            sx={{
              width: "100%",
              border: ({ palette }) => `1px solid ${palette.grey}`,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={usePrivateNetwork}
                  onChange={handlePrivateNetworkChange}
                />
              }
              label="استفاده از شبکه خصوصی"
            />
            <Typography pt={1} pr={1} pl={4}>
              با استفاده از شبکه خصوصی، سرور خود را به شبکه‌های دیگر متصل کنید.
            </Typography>

            {usePrivateNetwork && (
              <Stack direction="column" gap={2} mt={2}>
                <FormControl fullWidth>
                  <InputLabel>انتخاب شبکه</InputLabel>
                  <Select
                    value={selectedNetwork?.id ?? ""}
                    label="انتخاب شبکه"
                    onChange={(e) => {
                      const selectedId = Number(e.target.value);
                      const network =
                        vmNetworkList?.find(
                          (n) => Number(n.id) === selectedId
                        ) || null;
                      setSelectedNetwork(network);
                    }}
                  >
                    {vmNetworkList?.map((network) => (
                      <MenuItem key={network.id} value={Number(network.id)}>
                        {network.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="آدرس IP"
                  value={ipAddress || ""}
                  onChange={(e) => setIpAddress(e.target.value)}
                  placeholder="مثال: 192.168.1.100"
                />
              </Stack>
            )}
          </Box>

        </Stack>
      </Stack>
    </Paper>
  );
};
