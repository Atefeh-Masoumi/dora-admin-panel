import { Box, Stack, Tabs } from "@mui/material";
import { FC, SyntheticEvent, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { AnalyticChart } from "src/components/organisms/cdn/edit/analytics/AnalyticChart";
import { DnsRecord } from "src/components/organisms/cdn/edit/dns/DnsRecords";
import LoadBalance from "src/components/organisms/cdn/edit/loadbalance/LoadBalance";
import { ZoneInfo } from "src/components/organisms/cdn/edit/overview/ZoneInfo";
import { CdnSetting } from "src/components/organisms/cdn/edit/setting/CdnSetting";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const EditZone: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const selectedTab = useMemo(() => {
    let result;
    if (pathname.includes("overview")) {
      result = `overview`;
    }
    if (pathname.includes("analytics")) {
      result = `analytics`;
    }
    if (pathname.includes("dns-record-settings")) {
      result = `dns-record-settings`;
    }
    if (pathname.includes("setting")) {
      result = `setting`;
    }
    if (pathname.includes("load-balance-settings")) {
      result = `load-balance-settings`;
    }
    // if (pathname.includes("api-gateway-settings")) {
    //   result = "api-gateway-settings";
    // }
    return result;
  }, [pathname]);

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    navigate(`/cdn/${id}/${newValue}`);
  };

  const renderHandler = () => {
    let result = <></>;

    switch (selectedTab) {
      case `overview`:
        result = <ZoneInfo />;
        break;
      case `analytics`:
        result = <AnalyticChart />;
        break;
      case `dns-record-settings`:
        result = <DnsRecord />;
        break;
      case `setting`:
        result = <CdnSetting />;
        break;
      case `load-balance-settings`:
        result = <LoadBalance />;
        break;
      // case "api-gateway-settings":
      //   result = <></>;
      //break;
      default:
        result = <ZoneInfo />;
        break;
    }
    return result;
  };

  return (
    <Stack spacing={5} alignItems="center">
      <Box
        sx={{
          overflow: "overlay",
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
        >
          <DorsaTab value={`overview`} label="مشخصات دامنه" />
          <DorsaTab value={`setting`} label="تنظیمات" />
          <DorsaTab value={`analytics`} label="آنالیز ترافیک" />
          <DorsaTab value={`dns-record-settings`} label="تنظیمات DNS Record" />
          <DorsaTab
            value={`load-balance-settings`}
            label="تنظیمات Load Balance"
          />
          {/* <DorsaTab value="api-gateway-settings" label="تنظیمات API Gateway" /> */}
        </Tabs>
      </Box>
      {/* <Stack
        p={2.5}
        bgcolor="rgba(244, 95, 80, 1)"
        direction="row"
        borderRadius={BORDER_RADIUS_1}
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

export default EditZone;
