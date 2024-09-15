import { Box, Stack, Tabs } from "@mui/material";
import { FC, ReactNode, SyntheticEvent, useMemo, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { KubernetesCloudConfigMap } from "src/components/organisms/kubernetesCloud/edit/configMap/ConfigMap";
import { KubernetesCloudDeployment } from "src/components/organisms/kubernetesCloud/edit/deployment/KubernetesCloudDeployment";
import { KubernetesCloudInfo } from "src/components/organisms/kubernetesCloud/edit/info/KubernetesCloudInfo";
import { KubernetesCloudIngress } from "src/components/organisms/kubernetesCloud/edit/ingress/KubernetesCloudIngress";
import { KubernetesCloudSecretMap } from "src/components/organisms/kubernetesCloud/edit/secretMap/SecretMap";
import { KubernetesCloudServerConfig } from "src/components/organisms/kubernetesCloud/edit/serverConfig/KubernetesCloudServerConfig";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const EditKubernetesCloud: FC = () => {
  const { kubernetesCloudId } = useParams();
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
    if (pathname.includes("configmap")) {
      result = `configmap`;
    }
    if (pathname.includes("secret")) {
      result = `secret`;
    }
    if (pathname.includes("deployment")) {
      result = `deployment`;
    }
    if (pathname.includes("ingress")) {
      result = `ingress`;
    }

    return result;
  }, [pathname]);

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    navigate(`/kubernetes-cloud/${kubernetesCloudId}/${newValue}`);
  };

  const renderHandler = () => {
    let result = <></>;

    switch (selectedTab) {
      case `specification`:
        result = <KubernetesCloudInfo />;
        break;
      case `deployment`:
        result = <KubernetesCloudDeployment />;
        break;
      case `configmap`:
        result = <KubernetesCloudConfigMap />;
        break;
      case `secret`:
        result = <KubernetesCloudSecretMap />;
        break;
      case `setting`:
        result = <KubernetesCloudServerConfig />;
        break;
      case `ingress`:
        result = <KubernetesCloudIngress />;
        break;
      default:
        result = <KubernetesCloudInfo />;
        break;
    }
    return result;
  };

  if (!kubernetesCloudId) return <Navigate to={`/kubernetes-cloud`} />;

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
          value={selectedTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <DorsaTab value={`specification`} label="مشخصات" />
          <DorsaTab value={`setting`} label="تغییر مشخصات سخت افزاری" />
          <DorsaTab value={`deployment`} label="Deployment" />
          <DorsaTab value={`configmap`} label="Configmap" />
          <DorsaTab value={`secret`} label="Secret" />
          <DorsaTab value={`ingress`} label="Ingress" />
        </Tabs>
      </Box>
      {renderHandler()}
    </Stack>
  );
};

export default EditKubernetesCloud;
