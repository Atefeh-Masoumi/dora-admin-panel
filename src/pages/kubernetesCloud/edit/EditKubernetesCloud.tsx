import { Box, Stack, Tabs } from "@mui/material";
import { FC, SyntheticEvent, useMemo } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useGetApiMyKubernetesCloudHostGetByIdQuery } from "src/app/services/api.generated";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { ServiceOverview } from "src/components/molecules/ServiceOverview";
import { KubernetesCloudConfigMap } from "src/components/organisms/kubernetesCloud/edit/configMap/ConfigMap";
import { KubernetesCloudDeployment } from "src/components/organisms/kubernetesCloud/edit/deployment/KubernetesCloudDeployment";
import { KubernetesCloudIngress } from "src/components/organisms/kubernetesCloud/edit/ingress/KubernetesCloudIngress";
import { KubernetesCloudSecretMap } from "src/components/organisms/kubernetesCloud/edit/secretMap/SecretMap";
import { KubernetesCloudServerConfig } from "src/components/organisms/kubernetesCloud/edit/serverConfig/KubernetesCloudServerConfig";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { ConvertToJalali } from "src/utils/convertToJalali";

const EditKubernetesCloud: FC = () => {
  const { kubernetesCloudId } = useParams();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { data, isLoading, refetch } =
    useGetApiMyKubernetesCloudHostGetByIdQuery(
      {
        id: Number(kubernetesCloudId) || 0,
      },
      { skip: !kubernetesCloudId }
    );

  const refetchOnClick = () => refetch();

  const infoList = [
    [
      { label: "Status", value: data?.statusId || 0, id: "statusId" },
      { label: "Name", value: data?.name || "", id: "name" },
      { label: "Datacenter", value: data?.datacenter || "", id: "datacenter" },
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
    ],
    [
      { label: "CPU", value: `${data?.cpu} Core`, id: "cpu" },
      { label: "Memory", value: `${data?.memory} G`, id: "memory" },
      { label: "Disk", value: `${data?.disk} GB`, id: "disk" },
      { label: "Ten pods", value: `${data?.tenPods} TenPods`, id: "tenPods" },
    ],
  ];

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
      case `overview`:
      default:
        result = (
          <ServiceOverview
            infoList={infoList}
            isLoading={isLoading}
            refetchOnClick={refetchOnClick}
          />
        );
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
          <DorsaTab value={`overview`} label="مشخصات" />
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
