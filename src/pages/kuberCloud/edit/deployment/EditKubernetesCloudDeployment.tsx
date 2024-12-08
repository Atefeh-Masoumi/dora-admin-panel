import { FC, SyntheticEvent, useMemo } from "react";
import { Box, Stack, Tabs } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { Gateway } from "src/components/organisms/kubernetesCloud/edit/deployment/edit/Gateway";
import { Settings } from "src/components/organisms/kubernetesCloud/edit/deployment/edit/Settings";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { ServiceOverview } from "src/components/molecules/ServiceOverview";
import { useGetApiMyKubernetesCloudDeploymentGetByIdQuery } from "src/app/services/api.generated";
import { ConvertToJalali } from "src/utils/convertToJalali";

const EditKubernetesCloudDeployment: FC = () => {
  const { deploymentId, kubernetesCloudId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    data,
    isLoading: getDeploymentDataLoading,
    isFetching: getDeploymentDataFetching,
  } = useGetApiMyKubernetesCloudDeploymentGetByIdQuery(
    {
      id: Number(deploymentId),
    },
    { skip: !deploymentId }
  );

  const infoList = [
    [
      {
        id: "Name",
        label: "Name",
        value: data?.name ?? null,
      },
      {
        id: "Image",
        label: "Image",
        value: data?.image ?? null,
      },
      {
        id: "Namespace",
        label: "Namespace",
        value: data?.namespace ?? null,
      },
      {
        id: "Replica",
        label: "Replica",
        value: data?.replica !== undefined ? `${data.replica}` : null,
      },
      {
        id: "createDate",
        label: "Create Date",
        value: data?.createDate
          ? ConvertToJalali(data.createDate).split("-").reverse().join(" - ")
          : null,
      },
      {
        id: "modifyDate",
        label: "Modify Date",
        value: data?.modifyDate
          ? ConvertToJalali(data.modifyDate).split("-").reverse().join(" - ")
          : null,
      },
    ],
  ];

  const isLoading = useMemo(
    () => getDeploymentDataLoading || getDeploymentDataFetching,
    [getDeploymentDataFetching, getDeploymentDataLoading]
  );

  const selectedTab = useMemo(() => {
    let result;
    if (pathname.includes("overview")) {
      result = `overview`;
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
      case `setting`:
        result = <Settings />;
        break;
      case `gateway`:
        result = <Gateway />;
        break;
      case `overview`:
      default:
        result = <ServiceOverview infoList={infoList} isLoading={isLoading} />;
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
          <DorsaTab value={`overview`} label="مشخصات" />
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
