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
import {  useGetApiMyVmByProjectIdVolumeGetAndIdQuery } from "src/app/services/api.generated";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { BORDER_RADIUS_1 } from "src/configs/theme";

import { VolumeInfo } from "src/components/organisms/volume/edit/overview/VolumeInfo";
import { ChangeConfig } from "src/components/organisms/volume/edit/changeConfig/changeConfig";
import { VolumeSnapshot } from "src/components/organisms/volume/edit/snapshot/VolumeSnapShot";
import { VolumeBackup } from "src/components/organisms/volume/edit/backup/VolumeBackup";
import { AttachVm } from "src/components/organisms/volume/edit/attachVm/AttachVm";
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

interface EditVolumeProps {}

// Constants
const TAB_CONFIGS: TabConfig[] = [
  {
    label: "مشخصات دیسک ابری",
    route: "/block-storage/:projectId/:blockstorageId/specification",
    component: VolumeInfo,
  },
  {
    label: "تغییر منابع سرویس",
    route: "/block-storage/:projectId/:blockstorageId/change-config",
    component: ChangeConfig,
  },
  {
    label: "اسنپ‌شات",
    route: "/block-storage/:projectId/:blockstorageId/snapshot",
    component: VolumeSnapshot,
  },
  {
    label: "بکاپ",
    route: "/block-storage/:projectId/:blockstorageId/backup",
    component: VolumeBackup,
  },
 
  {
    label: "اتصال به سرور ابری ",
    route: "/block-storage/:projectId/:blockstorageId/attach-vm",
    component: AttachVm,
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


const useTabNavigation = (
  blockstorageId: string | undefined,
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
        .replace(':blockstorageId', blockstorageId || '')
      ).test(currentPath)
    );
    if (sectionIndex !== -1) {
      setSection(sectionIndex);
    }
  }, [location.pathname, blockstorageId, projectId, routes]);

  const handleTabChange = useCallback((_: SyntheticEvent, newValue: number) => {
    setSection(newValue);
    const newPath = routes[newValue]
      .replace(':projectId', projectId || '')
      .replace(':blockstorageId', blockstorageId || '');
    navigate(newPath, { replace: true });
  }, [navigate, routes, projectId, blockstorageId]);

  return { section, handleTabChange };
};

// Main component
const EditVolume: FC<EditVolumeProps> = () => {
  const { blockstorageId, projectId } = useParams();
  
  const routes = useMemo(() => TAB_CONFIGS.map(config => config.route), []);
  const { section, handleTabChange } = useTabNavigation(blockstorageId, projectId, routes);

  if (!blockstorageId) {
    return <Navigate to={`/block-storage/${projectId}`} />;
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
            (config, index) =>
              (
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
      {blockstorageId &&
        TAB_CONFIGS.map((config, index) => (
          <TabPanel value={section} index={index} key={index}>
            <config.component />
          </TabPanel>
        ))}
    </Stack>
  );
};

export default EditVolume;
