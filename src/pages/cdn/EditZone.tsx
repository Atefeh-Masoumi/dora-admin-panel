import { ContentCopy } from "@mui/icons-material";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tabs,
  Typography,
} from "@mui/material";
import { FC, Fragment, SyntheticEvent, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useGetApiMyDnsCdnHostGetByIdQuery,
  useGetApiMyDnsCdnHostGetNsByIdQuery,
} from "src/app/services/api.generated";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { ServiceOverview } from "src/components/molecules/ServiceOverview";
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

  const copyText = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.success("متن با موفقیت کپی شد");
        })
        .catch((err) => {});
    } else {
      fallbackCopyTextToClipboard(text);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand("copy");
      successful ?? toast.success("متن با موفقیت کپی شد");
    } catch (err) {
      toast.warning(err as string);
    }
    document.body.removeChild(textArea);
  };

  const { data: nsList, isLoading: nsListLoading } =
    useGetApiMyDnsCdnHostGetNsByIdQuery({ id: Number(id) });

  const {
    data,
    isLoading: getDataLoading,
    refetch,
  } = useGetApiMyDnsCdnHostGetByIdQuery({ id: Number(id) });

  const refetchOnClick = () => refetch();

  const infoList = [
    [
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
    ],
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
          <>
            <ServiceOverview
              infoList={infoList}
              refetchOnClick={refetchOnClick}
              isLoading={getDataLoading}
            />

            {nsList &&
              nsList.status &&
              nsList.cloudNs &&
              nsList.ns &&
              nsList.cloudNs.length > 0 && (
                <Stack
                  border={1}
                  borderColor="customColor.neutralExtraLight"
                  direction="column"
                  gap={2}
                  p={1.5}
                >
                  <Typography>اضافه کردن نام سرور</Typography>
                  <Stack
                    border={1}
                    borderColor="customColor.neutralExtraLight"
                    direction="column"
                    gap={2}
                    p={1.5}
                  >
                    <Typography>NS های تنظیم شده</Typography>
                    {nsList?.cloudNs?.map((cloudNsItem, index) => (
                      <Fragment key={cloudNsItem + index}>
                        <Stack direction="column" gap={1}>
                          <Typography textAlign="end" color="text.light">
                            {`:Name Server ${index + 1}`}
                          </Typography>
                          <Stack
                            border="1px solid #edf2f6"
                            bgcolor="background.default"
                            justifyContent="space-between"
                            alignItems="center"
                            px={2}
                            py={1}
                          >
                            <Chip
                              onClick={() => copyText(cloudNsItem)}
                              variant="filled"
                              label="copy to clipboard"
                              avatar={
                                <IconButton>
                                  <ContentCopy sx={{ fontSize: 16 }} />
                                </IconButton>
                              }
                            />

                            <Typography
                              fontFamily="monospace"
                              color="text.light"
                            >
                              {cloudNsItem}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Divider
                          sx={{
                            display:
                              nsList?.cloudNs!.length - 1 === index
                                ? "none"
                                : "block",
                          }}
                        />
                      </Fragment>
                    ))}
                  </Stack>
                  <Stack
                    border={1}
                    borderColor="customColor.neutralExtraLight"
                    direction="column"
                    gap={2}
                    p={1.5}
                  >
                    <Typography>اضافه کردن نام سرور</Typography>
                    {nsList?.cloudNs?.map((cloudNsItem, index) => (
                      <Fragment key={cloudNsItem + index}>
                        <Stack direction="column" gap={1}>
                          <Typography textAlign="end" color="text.light">
                            {`:Name Server ${index + 1}`}
                          </Typography>
                          <Stack
                            border="1px solid #edf2f6"
                            bgcolor="background.default"
                            justifyContent="space-between"
                            alignItems="center"
                            px={2}
                            py={1}
                          >
                            <Chip
                              onClick={() => copyText(cloudNsItem)}
                              variant="filled"
                              label="copy to clipboard"
                              avatar={
                                <IconButton>
                                  <ContentCopy sx={{ fontSize: 16 }} />
                                </IconButton>
                              }
                            />

                            <Typography
                              fontFamily="monospace"
                              color="text.light"
                            >
                              {cloudNsItem}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Divider
                          sx={{
                            display:
                              nsList!.cloudNs!.length - 1 === index
                                ? "none"
                                : "block",
                          }}
                        />
                      </Fragment>
                    ))}
                  </Stack>
                </Stack>
              )}
          </>
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
