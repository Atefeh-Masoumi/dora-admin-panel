import { Box, Stack, Tabs } from "@mui/material";
import { FC, SyntheticEvent, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { VpcNetwork } from "./VpcNetwork";
import { VpcVm } from "./VpcVm";
import { VpcNat } from "./VpcNat";
import { VpcIp } from "./VpcIp";
import { VpcOverview } from "./VpcOverview";
import { VpcLoadBalancer } from "./VpcLoadBalancer";
import { useSearchParams } from "react-router-dom";

const EditZone: FC = () => {
  const { vpcId } = useParams();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");

  const { pathname } = useLocation();

  const selectedTab = useMemo(() => {
    let result;
    if (pathname.includes("overview")) {
      result = `overview`;
    }
    if (pathname.includes("network")) {
      result = `network`;
    }
    if (pathname.includes("vm")) {
      result = `vm`;
    }
    if (pathname.includes("nat")) {
      result = `nat`;
    }
    if (pathname.includes("ip")) {
      result = `ip`;
    }
    if (pathname.includes("loadBalancer")) {
      result = `loadBalancer`;
    }
    return result;
  }, [pathname]);

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    navigate(`/vpc/${vpcId}/${newValue}?projectId=${projectId}`);
  };

  const renderHandler = () => {
    let result = <></>;

    switch (selectedTab) {
      case `overview`:
        result = <VpcOverview />;
        break;
      case `network`:
        result = <VpcNetwork />;
        break;
      case `vm`:
        result = <VpcVm />;
        break;
      case `nat`:
        result = <VpcNat />;
        break;
      case `ip`:
        result = <VpcIp />;
        break;
      case `loadBalancer`:
        result = <VpcLoadBalancer />;
        break;
      default:
        result = <VpcOverview />;
        break;
    }
    return result;
  };

  return (
    <Stack spacing={5} alignItems="center">
      <Box
        sx={{
          maxWidth: "100%",
          bgcolor: "white",
          py: 0.5,
          borderRadius: BORDER_RADIUS_1,
        }}
      >
        <Tabs
          sx={{
            minWidth: "fix-content",
            borderRadius: BORDER_RADIUS_1,
          }}
          TabIndicatorProps={{ style: { display: "none" } }}
          value={selectedTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <DorsaTab value={`overview`} label="مشخصات سرویس" />
          <DorsaTab value={`network`} label="Network" />
          <DorsaTab value={`vm`} label="VM" />
          <DorsaTab value={`nat`} label="NAT" />
          <DorsaTab value={`ip`} label="Public IP" />
          <DorsaTab value={`loadBalancer`} label="Load Balancer" />
        </Tabs>
      </Box>
      {renderHandler()}
    </Stack>
  );
};

export default EditZone;
