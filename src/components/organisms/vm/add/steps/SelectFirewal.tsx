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
import { useGetApiMyVmByProjectIdFirewallListQuery } from "src/app/services/api.generated";
import { AddServerContext } from "src/components/organisms/vm/add/contexts/AddVmContext";
import { AddFirewallDialog } from "src/pages/firewall/AddFirewall";

export const SelectFirewall: FC = () => {
  const { projectId } = useParams();
  const {
    allowRemoteAccess,
    setAllowRemoteAccess,
    allowHttpAccess,
    setAllowHttpAccess,
    allowHttpsAccess,
    setAllowHttpsAccess,
    remoteAccessIp,
    setRemoteAccessIp,
    vmFirewallId,
    setVmFirewallId,
    usedFirewall,
  } = useContext(AddServerContext);

  const { data: firewallList = [], refetch: refetchFirewallList } =
    useGetApiMyVmByProjectIdFirewallListQuery({
      projectId: Number(projectId),
    });

  const [isAddFirewallOpen, setIsAddFirewallOpen] = useState(false);

  return (
    <Paper sx={{ p: 2, boxShadow: "none" }}>
      <Stack direction="column" rowGap={2}>
        <Stack gap={2} direction={{ md: "column", xl: "column" }}>
          {usedFirewall ? (
            <>
              <Box
                p={1.5}
                sx={{
                  width: "100%",
                  border: ({ palette }) => `1px solid ${palette.grey}`,
                }}
              >
                <Stack direction="row" alignItems="center" gap={1} width={"50%"}>
                  <FormControl fullWidth>
                    <InputLabel>انتخاب فایروال</InputLabel>
                    <Select
                      value={vmFirewallId ?? ""}
                      label="انتخاب فایروال"
                      onChange={(e) => {
                        setVmFirewallId(Number(e.target.value));
                      }}
                      size="small"
                    >
                      {firewallList?.map((firewall) => (
                        <MenuItem key={firewall.id} value={Number(firewall.id)}>
                          {firewall.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setIsAddFirewallOpen(true)}
                    sx={{ minWidth: 180 }}
                  >
                    افزودن فایروال جدید
                  </Button> */}
                </Stack>
              </Box>

              <AddFirewallDialog
                open={isAddFirewallOpen}
                forceClose={() => setIsAddFirewallOpen(false)}
                refetch={refetchFirewallList}
                onClose={() => setIsAddFirewallOpen(false)}
              />
            </>
          ) : (
            <>
              <Box
                p={1.5}
                sx={{
                  width: "100%",
                  border: ({ palette }) => `1px solid ${palette.grey}`,
                }}
              >
                <Stack direction="row" gap={2} alignItems="center" >
                  <Stack direction="column"  width={"100%"}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={allowRemoteAccess}
                          onChange={(e) =>
                            setAllowRemoteAccess(e.target.checked)
                          }
                        />
                      }
                      label="اجازه دسترسی با ترافیک RemoteAccess"
                    />
                    <Typography pt={1} pr={1} pl={4}>
                      به شما کمک می‌کند تا به نمونه خود متصل شوید
                    </Typography>
                  </Stack>
                  {allowRemoteAccess && (
                    <TextField
                      fullWidth
                      label=""
                      value={remoteAccessIp || ""}
                      onChange={(e) => setRemoteAccessIp(e.target.value)}
                      placeholder="0.0.0.0/0"
                    />
                  )}
                </Stack>
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
                      checked={allowHttpAccess}
                      onChange={(e) => setAllowHttpAccess(e.target.checked)}
                    />
                  }
                  label="اجازه دسترسی با ترافیک HTTP"
                />
                <Typography pt={1} pr={1} pl={4}>
                  برای تنظیم یک نقطه پایانی، برای مثال هنگام ایجاد یک وب سرور
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
                      checked={allowHttpsAccess}
                      onChange={(e) => setAllowHttpsAccess(e.target.checked)}
                    />
                  }
                  label="استفاده از شبکه خصوصی"
                />
                <Typography pt={1} pr={1} pl={4}>
                  برای تنظیم یک نقطه پایانی، برای مثال هنگام ایجاد یک وب سرور
                </Typography>
              </Box>
            </>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
