import { Box, CircularProgress, Stack, Tabs } from "@mui/material";
import { FC, ReactNode, SyntheticEvent, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetApiMyKubernetesCloudHostGetByIdQuery } from "src/app/services/api.generated";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { KubernetesCloudConfigMap } from "src/components/organisms/kubernetesCloud/edit/configMap/ConfigMap";
import { KubernetesCloudApps } from "src/components/organisms/kubernetesCloud/edit/deployment/KubernetesCloudApps";
import { KubernetesCloudInfo } from "src/components/organisms/kubernetesCloud/edit/info/KubernetesCloudInfo";
import { KubernetesCloudSecretMap } from "src/components/organisms/kubernetesCloud/edit/secretMap/SecretMap";
import { BORDER_RADIUS_1 } from "src/configs/theme";

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

const EditKubernetesCloud: FC = () => {
  const [section, setSection] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate(); // Added

  const {
    data: kubernetesCloudData,
    isLoading: getKubernetesCloudDataLoading,
  } = useGetApiMyKubernetesCloudHostGetByIdQuery({
    id: Number(id)!,
  });

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setSection(newValue);
    navigate(`?section=${newValue}`, { replace: true });
  };

  const tabArray = ["مشخصات سرویس", "Apps", "Config Map", "Secret"];

  const tabPanelArray = [
    KubernetesCloudInfo,
    KubernetesCloudApps,
    KubernetesCloudConfigMap,
    KubernetesCloudSecretMap,
  ];

  if (!id) return <Navigate to={`/kubernetes-cloud`} />;

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
        >
          {getKubernetesCloudDataLoading ? (
            <CircularProgress
              size={20}
              sx={{
                margin: "10px auto",
              }}
            />
          ) : (
            tabArray.map((label, index) => (
              <DorsaTab
                {...a11yProps(index)}
                label={label}
                key={index}
                onClick={() => setSection(index)}
              />
            ))
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

export default EditKubernetesCloud;
