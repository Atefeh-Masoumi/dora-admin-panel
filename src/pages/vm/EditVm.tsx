import { Box, CircularProgress, Stack, Tabs } from "@mui/material";
import {
  FC,
  ReactNode,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetApiMyVmHostGetByIdQuery } from "src/app/services/api.generated";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { VM_ENUM } from "src/types/vmEnum";
import { ServerConfig } from "src/components/organisms/vm/edit/config/ServerConfig";
import { EditServerContext } from "src/components/organisms/vm/edit/rebuild/contexts/EditServerContext";
import { VmInfo } from "src/components/organisms/vm/edit/overview/VmInfo";
import { AnalyticChart } from "src/components/organisms/vm/edit/analytics/AnalyticChart";
import { VmIpAddress } from "src/components/organisms/vm/edit/ip/VmIpAddress";
import { VmRebuild } from "src/components/organisms/vm/edit/rebuild/VmRebuild";
import { Snapshot } from "src/components/organisms/vm/edit/snapshot/Snapshot";
import { Firewall } from "src/components/organisms/vm/edit/firewall/Firewall";

type TabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      sx={{
        minWidth: "100%",
        maxWidth: "100%",
      }}
    >
      {value === index && children}
    </Box>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

type EditCloudServerPropsType = {};

const EditCloudServer: FC<EditCloudServerPropsType> = () => {
  const { id } = useParams();
  const { setServerId, setHostProjectId, setHypervisorId, setDatacenterId } =
    useContext(EditServerContext);
  const [section, setSection] = useState(0);
  const navigate = useNavigate(); 

  const { data: vmData, isLoading: getVmDataLoading } =
    useGetApiMyVmHostGetByIdQuery({
      id: Number(id)!,
    });

  useEffect(() => {
    if (!id) return;
    setServerId(Number(id));
    setHypervisorId(vmData?.hypervisorTypeId || 0);
    setDatacenterId(vmData?.datacenterId || 0);
    setHostProjectId(vmData?.hostProjectId || 0);
  }, [
    id,
    vmData,
    setHostProjectId,
    setServerId,
    setDatacenterId,
    setHypervisorId,
  ]);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setSection(newValue);
    navigate(`?section=${newValue}`, { replace: true });
  };

  const tabArray = [
    "مشخصات سرور",
    "آنالیز ترافیک",
    "آدرس IP",
    "بازسازی",
    "سخت افزاری",
    // "دیسک",
    "اسنپ‌شات",
    "فایروال",
  ];

  const tabPanelArray = [
    VmInfo,
    AnalyticChart,
    VmIpAddress,
    VmRebuild,
    ServerConfig,
    // Volume,
    Snapshot,
    Firewall,
  ];

  if (!id) return <Navigate to="/vm" />;

  let hiddenTabs: number[] = [];

  switch (true) {
    case vmData?.isCluster && vmData?.isMaster:
      hiddenTabs = [
        VM_ENUM.VM_REBUILD,
        VM_ENUM.SNAPSHOT,
        VM_ENUM.SERVER_CONFIG,
      ];
      break;
    case vmData?.isCluster && !vmData?.isMaster:
      hiddenTabs = [VM_ENUM.VM_REBUILD, VM_ENUM.SNAPSHOT];
      break;
    default:
      hiddenTabs = [];
      break;
  }

  return (
    <Stack
      spacing={5}
      alignItems="center"
      overflow="hidden"
      sx={{ maxWidth: "100%" }}
    >
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
          sx={{ padding: "5px 30px" }}
          TabIndicatorProps={{ style: { display: "none" } }}
          value={section}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {getVmDataLoading ? (
            <CircularProgress
              size={20}
              sx={{
                margin: "10px auto",
              }}
            />
          ) : (
            tabArray.map(
              (label, index) =>
                !hiddenTabs.includes(index) && (
                  <DorsaTab
                    {...a11yProps(index)}
                    label={label}
                    key={index}
                    onClick={() => setSection(index)}
                  />
                )
            )
          )}
        </Tabs>
      </Box>
      {id &&
        tabPanelArray.map((Component, index) => (
          <TabPanel value={section} index={index} key={index}>
            <Component />
          </TabPanel>
        ))}
    </Stack>
  );
};

export default EditCloudServer;
