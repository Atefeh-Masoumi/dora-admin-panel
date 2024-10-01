import { Box, Stack, Tabs } from "@mui/material";
import { FC, SyntheticEvent, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useGetApiMyDnsCdnHostGetByIdQuery } from "src/app/services/api.generated";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { ServiceOverview } from "src/components/molecules/serviceOverview";
import { AnalyticChart } from "src/components/organisms/cdn/edit/analytics/AnalyticChart";
import { DnsRecord } from "src/components/organisms/cdn/edit/dns/DnsRecords";
import LoadBalance from "src/components/organisms/cdn/edit/loadbalance/LoadBalance";
import { CdnSetting } from "src/components/organisms/cdn/edit/setting/CdnSetting";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { ConvertToJalali } from "src/utils/convertToJalali";

const EditZone: FC = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const {
    data,
    isLoading: getDataLoading,
    refetch,
  } = useGetApiMyDnsCdnHostGetByIdQuery({ id: Number(id) });

  const refetchOnClick = () => refetch();

  const infoList = [
    { label: "Status", value: data?.statusId || 0, id: "statusId" },
    { label: "Zone Name", value: data?.zoneName || 0, id: "zoneName" },
    {
      label: "Create Date",
      value: data?.createDate
        ? ConvertToJalali(String(data?.createDate))
            .split(" - ")
            .reverse()
            .join(" - ")
        : "",
      id: "createDate",
    },
    {
      label: "Last Edit Date",
      value: ConvertToJalali(String(data?.modifyDate))
        .split(" - ")
        .reverse()
        .join(" - "),
      id: "lastEditDate",
    },
  ];

  const selectedTab = useMemo(() => {
    let result;
    if (pathname.includes("overview")) {
      result = `overview`;
    }
    if (pathname.includes("setting")) {
      result = `setting`;
    }
    if (pathname.includes("analytics")) {
      result = `analytics`;
    }
    if (pathname.includes("dns-record")) {
      result = `dns-record`;
    }
    if (pathname.includes("load-balance")) {
      result = `load-balance`;
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
      case `setting`:
        result = <CdnSetting />;
        break;
      case `analytics`:
        result = <AnalyticChart />;
        break;
      case `dns-record`:
        result = <DnsRecord />;
        break;
      case `load-balance`:
        result = <LoadBalance />;
        break;
      // case "api-gateway-settings":
      //   result = <></>;
      //break;
      case `overview`:
      default:
        result = (
          <ServiceOverview
            infoList={infoList}
            refetchOnClick={refetchOnClick}
            isLoading={getDataLoading}
          />
        );
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
          <DorsaTab value={`overview`} label="مشخصات دامنه" />
          <DorsaTab value={`setting`} label="تنظیمات" />
          <DorsaTab value={`analytics`} label="آنالیز ترافیک" />
          <DorsaTab value={`dns-record`} label="تنظیمات DNS Record" />
          <DorsaTab value={`load-balance`} label="تنظیمات Load Balance" />
          {/* <DorsaTab value="api-gateway-settings" label="تنظیمات API Gateway" /> */}
        </Tabs>
      </Box>
      {renderHandler()}
    </Stack>
  );
};

export default EditZone;
