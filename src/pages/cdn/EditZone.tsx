import { FC, SyntheticEvent, useMemo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Tabs, Stack, Box } from "@mui/material";
import { BORDER_RADIUS_5 } from "src/configs/theme";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { useAppSelector } from "src/app/hooks";
import { SSLSetting } from "src/components/organisms/cdn/editZone/ssl/Ssl";
import { DnsRecord } from "src/components/organisms/cdn/editZone/dns/DnsRecord";
import LoadBalance from "src/components/organisms/cdn/editZone/loadbalance/LoadBalance";
import { ZoneInfo } from "src/components/organisms/cdn/editZone/overview/ZoneInfo";
import { AnalyticChart } from "src/components/organisms/cdn/editZone/analytics/AnalyticChart";

const Domains: FC = () => {
  const selectedDomain = useAppSelector((state) => state.cdn.selectedDomain);
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const selectedTab = useMemo(() => {
    let result;
    if (pathname.includes("overview")) {
      result = "overview";
    }
    if (pathname.includes("analytics")) {
      result = "analytics";
    }
    if (pathname.includes("dnsRecordSettings")) {
      result = "dnsRecordSettings";
    }
    if (pathname.includes("sslTslSettings")) {
      result = "sslTslSettings";
    }
    if (pathname.includes("loadBalanceSettings")) {
      result = "loadBalanceSettings";
    }
    if (pathname.includes("apiGatewaySettings")) {
      result = "apiGatewaySettings";
    }
    return result;
  }, [pathname]);

  const handleChange = (_: SyntheticEvent, newValue: string) =>
    navigate("/cdn/" + newValue);

  const renderHandler = () => {
    let result = <></>;

    switch (selectedTab) {
      case "overview":
        result = <ZoneInfo />;
        break;
      case "analytics":
        result = <AnalyticChart />;
        break;
      case "dnsRecordSettings":
        result = <DnsRecord />;
        break;
      case "sslTslSettings":
        result = <SSLSetting />;
        break;
      case "loadBalanceSettings":
        result = <LoadBalance />;
        break;
      case "apiGatewaySettings":
        result = <></>;
        break;
      default:
        result = <ZoneInfo />;
        break;
    }
    return result;
  };

  if (!selectedDomain) return <Navigate to="/cdn" />;

  return (
    <Stack spacing={5} alignItems="center">
      <Box
        sx={{
          overflow: "overlay",
          maxWidth: "100%",
          bgcolor: "white",
          py: 0.5,
          borderRadius: BORDER_RADIUS_5,
        }}
      >
        <Tabs
          sx={{
            minWidth: 520,
          }}
          TabIndicatorProps={{ style: { display: "none" } }}
          value={selectedTab}
          onChange={handleChange}
        >
          <DorsaTab value="overview" label="مشخصات دامنه" />
          <DorsaTab value="analytics" label="آنالیز ترافیک" />
          <DorsaTab value="dnsRecordSettings" label="تنظیمات DNS Record" />
          <DorsaTab value="sslTslSettings" label="تنظیمات SSL/TLS" />
          <DorsaTab value="loadBalanceSettings" label="تنظیمات Load Balance" />
          <DorsaTab value="apiGatewaySettings" label="تنظیمات API Gateway" />
        </Tabs>
      </Box>
      {/* <Stack
        p={2.5}
        bgcolor="rgba(244, 95, 80, 1)"
        direction="row"
        spacing={1}
        borderRadius={2}
        width="100%"
        color="white"
        alignItems={{ xs: "start", md: "center" }}
      >
        <ErrorOutlineIcon />
        <Typography variant="text14">
          دامنه مورد نظر به دلیل بدهی مسدود می‌باشد، لطفا با پشتیبانی تماس
          بگیرید.
        </Typography>
      </Stack> */}
      {renderHandler()}
    </Stack>
  );
};

export default Domains;
