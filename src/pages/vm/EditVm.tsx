import {
  useContext,
  FC,
  SyntheticEvent,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Tabs, Stack, Box, CircularProgress } from "@mui/material";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { BORDER_RADIUS_5 } from "src/configs/theme";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { EditServerContext } from "src/components/organisms/vm/edit/rebuild/contexts/EditServerContext";
import { VmInfo } from "src/components/organisms/vm/edit/overview/VmInfo";
import { VmIpAddress } from "src/components/organisms/vm/edit/ip/VmIpAddress";
import { ServerConfig } from "src/components/organisms/vm/edit/config/ServerConfig";
import { VmRebuild } from "src/components/organisms/vm/edit/rebuild/VmRebuild";
import { Snapshot } from "src/components/organisms/vm/edit/snapshot/Snapshot";
import { useGetApiMyVmHostGetByIdQuery } from "src/app/services/api.generated";
import { VM_ENUM } from "src/types/vmEnum";

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
  const [section, setSection] = useState(0);
  const { setServerId } = useContext(EditServerContext);
  const { id } = useParams();
  const navigate = useNavigate(); // Added

  const {
    data: vmData,
    isLoading: getVmDataLoading,
    isFetching: getVmDataFetching,
  } = useGetApiMyVmHostGetByIdQuery({
    id: Number(id)!,
  });

  useEffect(() => {
    if (!id) return;
    setServerId(Number(id));
  }, [id, setServerId]);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setSection(newValue);
    navigate(`?section=${newValue}`, { replace: true });
  };

  const tabArray = [
    "مشخصات سرور",
    "آدرس IP سرور",
    "بازسازی سیستم عامل",
    "تغییر مشخصات سخت افزاری",
    "Snapshot",
  ];

  const tabPanelArray = [
    VmInfo,
    VmIpAddress,
    ServerConfig,
    VmRebuild,
    Snapshot,
  ];

  if (!id) return <Navigate to="/vm" />;

  let hiddenTabs: number[] = [];

  switch (true) {
    case vmData?.isCluster && vmData?.isMaster:
      hiddenTabs = [VM_ENUM.VM_REBUILD, VM_ENUM.SNAPSHOT];
      break;
    case vmData?.isCluster && !vmData?.isMaster:
      hiddenTabs = [
        VM_ENUM.VM_REBUILD,
        VM_ENUM.SNAPSHOT,
        VM_ENUM.SERVER_CONFIG,
      ];
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
          borderRadius: BORDER_RADIUS_5,
        }}
      >
        <Tabs
          sx={{
            minWidth: { xs: 550, md: 605 },
          }}
          TabIndicatorProps={{ style: { display: "none" } }}
          value={section}
          onChange={handleChange}
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
