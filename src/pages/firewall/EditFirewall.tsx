import { Box, CircularProgress, Stack, Tabs } from "@mui/material";
import {
  FC,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import { useGetApiMyVmByProjectIdFirewallListQuery } from "src/app/services/api.generated";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import FirewallRuleListTable from "src/components/organisms/firewall/editFirewall/FirewallRuleListTable";

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

interface EditFirewallProps {}

// Constants
const TAB_CONFIGS: TabConfig[] = [
  {
    label: "قوانین",
    route: "/firewall/:projectId/:firewallId/rule-list",
    component: FirewallRuleListTable,
  },
];

// Utility functions
const createA11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

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
const useFirewallData = (id: string | undefined, projectId: string | undefined) => {
  return useGetApiMyVmByProjectIdFirewallListQuery({
    projectId: Number(projectId)!
  });
};

const useTabNavigation = (
  firewallId: string | undefined,
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
        .replace(':firewallId', firewallId || '')
      ).test(currentPath)
    );
    if (sectionIndex !== -1) {
      setSection(sectionIndex);
    }
  }, [location.pathname, firewallId, projectId, routes]);

  const handleTabChange = useCallback((_: SyntheticEvent, newValue: number) => {
    setSection(newValue);
    const newPath = routes[newValue]
      .replace(':projectId', projectId || '')
      .replace(':firewallId', firewallId || '');
    navigate(newPath, { replace: true });
  }, [navigate, routes, projectId, firewallId]);

  return { section, handleTabChange };
};

// Main component
const EditFirewall: FC<EditFirewallProps> = () => {
  const { firewallId, projectId } = useParams();
  const { data: firewallData, isLoading: getFirewallDataLoading } = useFirewallData(firewallId, projectId);
  
  const routes = useMemo(() => TAB_CONFIGS.map(config => config.route), []);
  const { section, handleTabChange } = useTabNavigation(firewallId, projectId, routes);

  if (!firewallId) {
    return <Navigate to={`/firewall/${projectId}`} />;
  }

  if (getFirewallDataLoading) {
    return (
      <Stack justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Stack>
    );
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
          {TAB_CONFIGS.map(
            (config, index) => (
              <DorsaTab
                {...createA11yProps(index)}
                label={config.label}
                key={index}
                onClick={() => handleTabChange({} as SyntheticEvent, index)}
              />
            )
          )}
        </Tabs>
      </Box>
      {firewallId &&
        TAB_CONFIGS.map((config, index) => (
          <TabPanel value={section} index={index} key={index}>
            <config.component />
          </TabPanel>
        ))}
    </Stack>
  );
};

export default EditFirewall;

