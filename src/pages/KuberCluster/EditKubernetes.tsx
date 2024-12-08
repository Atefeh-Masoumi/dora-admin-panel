import { FC, useState, SyntheticEvent, useEffect } from "react";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { KubernetesEditNodes } from "src/components/organisms/kuberCluster/edit/editNodes/KubernetesEditNodes";
import { Box, Stack, Tabs } from "@mui/material";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { useParams, useNavigate } from "react-router-dom";
import { ServiceOverview } from "src/components/molecules/ServiceOverview";
import { useGetApiMyKubernetesClusterHostGetByIdQuery } from "src/app/services/api.generated";
import { ConvertToJalali } from "src/utils/convertToJalali";

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const EditKubernetes: FC = () => {
  const [value, setValue] = useState("1");
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`?tab=${newValue}`);
  };

  const { id: kubernetesId } = useParams();

  const { data, isLoading, refetch } =
    useGetApiMyKubernetesClusterHostGetByIdQuery(
      {
        id: Number(kubernetesId) || 0,
      },
      { skip: !kubernetesId }
    );

  const refetchOnClick = () => refetch();

  const infoList = [
    [
      { label: "Status", value: data?.statusId || 0, id: "statusId" },
      { label: "Cluster Name", value: data?.name || "", id: "name" },
      { label: "Datacenter", value: data?.datacenter || "", id: "datacenter" },
      {
        label: "Worker Node",
        value: data?.workerNode || "",
        id: "workerNode",
      },
      {
        label: "Master Node",
        value: data?.masterNode || "",
        id: "masterNode",
      },
      {
        label: "Create Date",
        value: data?.createDate
          ? ConvertToJalali(String(data?.createDate))
              .split("-")
              .reverse()
              .join(" - ")
          : "----",
        id: "createDate",
      },
      {
        label: "Modify Date",
        value: data?.modifyDate
          ? ConvertToJalali(String(data?.modifyDate))
              .split("-")
              .reverse()
              .join(" - ")
          : "----",
        id: "modifyDate",
      },
    ],
  ];

  useEffect(() => {
    if (tab) {
      setValue(tab);
    }
  }, [tab]);

  useEffect(() => {
    const initialTab = new URLSearchParams(window.location.search).get("tab");
    if (initialTab) {
      setValue(initialTab);
    }
  }, []);

  return (
    <TabContext value={value}>
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
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <DorsaTab {...a11yProps(1)} label="اطلاعات" value="1" />
            <DorsaTab {...a11yProps(2)} label="نودها" value="2" />
          </Tabs>
        </Box>
      </Stack>
      <TabPanel value="1" sx={{ p: 0, my: 3 }}>
        <ServiceOverview
          isLoading={isLoading}
          infoList={infoList}
          refetchOnClick={refetchOnClick}
        />
      </TabPanel>
      <TabPanel value="2" sx={{ p: 0, my: 3 }}>
        <KubernetesEditNodes />
      </TabPanel>
    </TabContext>
  );
};

export default EditKubernetes;
