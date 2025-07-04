import { Box, CircularProgress, Stack, Tabs } from "@mui/material";
import {
  FC,
  ReactNode,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import { useGetApiMyVmByProjectIdHostGetAndIdQuery } from "src/app/services/api.generated";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { VM_ENUM } from "src/types/vmEnum";
import { ServerConfig } from "src/components/organisms/vm/edit/config/ServerConfig";
import { EditServerContext } from "src/components/organisms/vm/edit/rebuild/contexts/EditServerContext";
import { VmInfo } from "src/components/organisms/vm/edit/overview/VmInfo";
// import { AnalyticChart } from "src/components/organisms/vm/edit/analytics/AnalyticChart";
import { VmIpAddress } from "src/components/organisms/vm/edit/ip/VmIpAddress";
import { VmRebuild } from "src/components/organisms/vm/edit/rebuild/VmRebuild";
import { Snapshot } from "src/components/organisms/vm/edit/snapshot/Snapshot";
import { Firewall } from "src/components/organisms/vm/edit/firewall/Firewall";
import { Volume } from "src/components/organisms/vm/edit/volume/Volume";
import { Network } from "src/components/organisms/vm/edit/network/VmNatworkTable";

// Types
interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

interface TabConfig {
  label: string;
  route: string;
  component: FC;
  isHidden?: boolean;
}

interface EditVmProps {}

// Constants
const TAB_CONFIGS: TabConfig[] = [
  {
    label: "مشخصات سرور",
    route: "/vm/:projectId/:id/specification",
    component: VmInfo,
  },
  // {
  //   label: "آنالیز ترافیک",
  //   route: "/vm/:projectId/:id/analytics",
  //   component: AnalyticChart,
  // },
  {
    label: "آدرس IP",
    route: "/vm/:projectId/:id/ip",
    component: VmIpAddress,
  },
  {
    label: "بازسازی",
    route: "/vm/:projectId/:id/rebuild",
    component: VmRebuild,
  },
  {
    label: "سخت افزاری",
    route: "/vm/:projectId/:id/config",
    component: ServerConfig,
  },
  {
    label: "اسنپ‌شات",
    route: "/vm/:projectId/:id/snapshot",
    component: Snapshot,
  },
  {
    label: "فایروال",
    route: "/vm/:projectId/:id/firewall",
    component: Firewall,
  },
  {
    label: "دیسک",
    route: "/vm/:projectId/:id/volume",
    component: Volume,
  },
  {
    label: "شبکه",
    route: "/vm/:projectId/:id/network",
    component: Network,
  },
];

// Utility functions
const createA11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

const getHiddenTabs = (vmData: any): number[] => {
  if (!vmData) return [];

  if (vmData.isCluster && vmData.isMaster) {
    return [VM_ENUM.VM_REBUILD];
  }

  if (vmData.isCluster && !vmData.isMaster) {
    return [VM_ENUM.VM_REBUILD];
  }

  return [];
};

// Components
const TabPanel: FC<TabPanelProps> = ({ children, value, index, ...other }) => (
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

// Custom hooks
const useVmData = (id: string | undefined, projectId: string | undefined) => {
  return useGetApiMyVmByProjectIdHostGetAndIdQuery({
    id: Number(id)!,
    projectId: Number(projectId)!
  });
};

const useServerContext = (id: string | undefined, vmData: any) => {
  const { setServerId, setHostProjectId, setHypervisorId, setDatacenterId } =
    useContext(EditServerContext);

  useEffect(() => {
    if (!id) return;
    setServerId(Number(id));
    setDatacenterId(vmData?.datacenterId || 0);
  }, [id, vmData, setServerId, setDatacenterId]);
};

const useTabNavigation = (
  id: string | undefined,
  projectId: string | undefined,
  routes: string[]
) => {
  const [section, setSection] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const sectionIndex = routes.findIndex(route => 
      new RegExp(route
        .replace(':projectId', projectId || '')
        .replace(':id', id || '')
      ).test(currentPath)
    );
    if (sectionIndex !== -1) {
      setSection(sectionIndex);
    }
  }, [location.pathname, id, projectId, routes]);

  const handleTabChange = useCallback((_: SyntheticEvent, newValue: number) => {
    setSection(newValue);
    const newPath = routes[newValue]
      .replace(':projectId', projectId || '')
      .replace(':id', id || '');
    navigate(newPath, { replace: true });
  }, [navigate, routes, projectId, id]);

  return { section, handleTabChange };
};

// Main component
const EditVm: FC<EditVmProps> = () => {
  const { id, projectId } = useParams();
  const { data: vmData, isLoading: getVmDataLoading } = useVmData(id, projectId);
  
  const routes = useMemo(() => TAB_CONFIGS.map(config => config.route), []);
  const { section, handleTabChange } = useTabNavigation(id, projectId, routes);
  
  useServerContext(id, vmData);

  const hiddenTabs = useMemo(() => getHiddenTabs(vmData), [vmData]);

  if (!id) {
    return <Navigate to="/vm" />;
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
          onChange={handleTabChange}
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
            TAB_CONFIGS.map(
              (config, index) =>
                !hiddenTabs.includes(index) && (
                  <DorsaTab
                    {...createA11yProps(index)}
                    label={config.label}
                    key={index}
                    onClick={() => handleTabChange({} as SyntheticEvent, index)}
                  />
                )
            )
          )}
        </Tabs>
      </Box>
      {id &&
        TAB_CONFIGS.map((config, index) => (
          <TabPanel value={section} index={index} key={index}>
            <config.component />
          </TabPanel>
        ))}
    </Stack>
  );
};

export default EditVm;
