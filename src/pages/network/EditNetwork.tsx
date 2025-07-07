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
import { useGetApiMyVmByProjectIdNetworkListQuery } from "src/app/services/api.generated";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import NetworkNodelistTable from "src/components/organisms/network/editNetwork/NetworkNodelistTable";

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

interface EditNetworkProps {}

// Constants
const TAB_CONFIGS: TabConfig[] = [
  {
    label: "نودها",
    route: "/network/:projectId/:networkId/node-list",
    component: NetworkNodelistTable,
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
const useNetworkData = (id: string | undefined, projectId: string | undefined) => {
  return useGetApiMyVmByProjectIdNetworkListQuery({
    projectId: Number(projectId)!
  });
};

const useTabNavigation = (
  networkId: string | undefined,
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
        .replace(':networkId', networkId || '')
      ).test(currentPath)
    );
    if (sectionIndex !== -1) {
      setSection(sectionIndex);
    }
  }, [location.pathname, networkId, projectId, routes]);

  const handleTabChange = useCallback((_: SyntheticEvent, newValue: number) => {
    setSection(newValue);
    const newPath = routes[newValue]
      .replace(':projectId', projectId || '')
      .replace(':networkId', networkId || '');
    navigate(newPath, { replace: true });
  }, [navigate, routes, projectId, networkId]);

  return { section, handleTabChange };
};

// Main component
const EditNetwork: FC<EditNetworkProps> = () => {
  const { networkId, projectId } = useParams();
  const { data: networkData, isLoading: getNetworkDataLoading } = useNetworkData(networkId, projectId);
  
  const routes = useMemo(() => TAB_CONFIGS.map(config => config.route), []);
  const { section, handleTabChange } = useTabNavigation(networkId, projectId, routes);

  if (!networkId) {
    return <Navigate to={`/network/${projectId}`} />;
  }

  if (getNetworkDataLoading) {
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
      {networkId &&
        TAB_CONFIGS.map((config, index) => (
          <TabPanel value={section} index={index} key={index}>
            <config.component />
          </TabPanel>
        ))}
    </Stack>
  );
};

export default EditNetwork;
