import { FC, SyntheticEvent, useMemo } from "react";
import { Box, Stack, Tabs } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { Gateway } from "src/components/organisms/kubernetesCloud/edit/deployment/edit/Gateway";
import { Monitoring } from "src/components/organisms/kubernetesCloud/edit/deployment/edit/Monitoring";
import { Settings } from "src/components/organisms/kubernetesCloud/edit/deployment/edit/Settings";
import { Specification } from "src/components/organisms/kubernetesCloud/edit/deployment/edit/Specification";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const EditKubernetesCloudDeployment: FC = () => {
  const { deploymentId, kubernetesCloudId } = useParams();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const selectedTab = useMemo(() => {
    let result;
    if (pathname.includes("specification")) {
      result = `specification`;
    }
    if (pathname.includes("setting")) {
      result = `setting`;
    }
    if (pathname.includes("gateway")) {
      result = `gateway`;
    }

    return result;
  }, [pathname]);

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    navigate(
      `/kubernetes-cloud/${kubernetesCloudId}/deployment/${deploymentId}/${newValue}`
    );
  };

  const renderHandler = () => {
    let result = <></>;

    switch (selectedTab) {
      case `specification`:
        result = <Specification />;
        break;
      case `setting`:
        result = <Settings />;
        break;
      case `gateway`:
        result = <Gateway />;
        break;
      default:
        result = <Specification />;
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
          <DorsaTab value={`specification`} label="مشخصات" />
          <DorsaTab disabled value={`setting`} label="تنظیمات" />
          <DorsaTab disabled value={`gateway`} label="gateway" />
          {/* <DorsaTab value={`monitoring`} label="monitoring" /> */}
        </Tabs>
      </Box>
      {renderHandler()}
    </Stack>
  );
};

export default EditKubernetesCloudDeployment;
