import { FC, useContext, useState } from "react";
import {
  Box,
  Button,
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
  useGetApiMyVmByProjectIdFirewallListQuery,
  useGetApiMyVmByProjectIdNetworkShortListQuery,
} from "src/app/services/api.generated";
import { AddServerContext } from "src/components/organisms/vm/add/contexts/AddVmContext";
import { AddFirewallDialog } from "src/pages/firewall/AddFirewall";

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
    usedFirewall,
    setUsedFirewall,
    vmFirewallId,
    setVmFirewallId,
  } = useContext(AddServerContext);

  const { data: vmNetworkList } = useGetApiMyVmByProjectIdNetworkShortListQuery(
    {
      projectId: Number(projectId),
    }
  );
  const { data: firewallList = [], refetch: refetchFirewallList } =
    useGetApiMyVmByProjectIdFirewallListQuery({
      projectId: Number(projectId),
    });

  const [isAddFirewallOpen, setIsAddFirewallOpen] = useState(false);

  const handlePrivateNetworkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsePrivateNetwork(event.target.checked);
    if (!event.target.checked) {
      setSelectedNetwork(null);
      setIpAddress(null);
    }
  };

  const handleFirewallChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsedFirewall(event.target.checked);
    if (!event.target.checked) {
      setVmFirewallId(null);
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

          <Box
            p={1.5}
            sx={{
              width: "100%",
              border: ({ palette }) => `1px solid ${palette.grey}`,
            }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <Stack flex="column" flexGrow={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={usedFirewall}
                      onChange={handleFirewallChange}
                    />
                  }
                  label="استفاده از فایروال"
                />
                <Typography pt={1} pr={1} pl={4}>
                  با فعال‌سازی فایروال، ترافیک ورودی و خروجی سرور کنترل می‌شود.
                </Typography>
              </Stack>
              {usedFirewall && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsAddFirewallOpen(true)}
                sx={{ minWidth: 180 }}
              >
                افزودن فایروال جدید
              </Button>)}
            </Stack>
            {usedFirewall && (
              <Stack direction="column" gap={2} mt={2}>
                <Stack direction={{ xs: "column", sm: "row" }} gap={1}>
                  {/* <IconButton
                    onClick={() => refetchFirewallList()}
                    sx={{ minWidth: 180 }}
                  >
                    <RefreshIcon
                      style={{
                        transform: `rotate(360deg)`,
                        transition: "transform 0.7s ease",
                      }}
                    />
                  </IconButton> */}
                </Stack>

                <FormControl fullWidth>
                  <InputLabel>انتخاب فایروال</InputLabel>
                  <Select
                    value={vmFirewallId ?? ""}
                    label="انتخاب فایروال"
                    onChange={(e) => {
                      setVmFirewallId(Number(e.target.value));
                    }}
                  >
                    {firewallList?.map((firewall) => (
                      <MenuItem key={firewall.id} value={Number(firewall.id)}>
                        {firewall.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            )}
          </Box>

          <AddFirewallDialog
            open={isAddFirewallOpen}
            forceClose={() => setIsAddFirewallOpen(false)}
            refetch={refetchFirewallList}
            onClose={() => setIsAddFirewallOpen(false)}
          />
        </Stack>
      </Stack>
    </Paper>
  );
};
