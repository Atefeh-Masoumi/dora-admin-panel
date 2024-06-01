import { FC, useState, SyntheticEvent, useEffect } from "react";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { KubernetesEditNodes } from "src/components/organisms/kubernetes/edit/editNodes/KubernetesEditNodes";
import { KubernetesOverview } from "src/components/organisms/kubernetes/edit/overview/KubernetesOverview";
import { Container, Tabs } from "@mui/material";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { useParams, useNavigate } from "react-router-dom";

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
      <Container maxWidth="xs">
        <Tabs
          variant="fullWidth"
          sx={{
            minWidth: { xs: 300, md: 250 },
            bgcolor: "white",
            py: 0.5,
            borderRadius: BORDER_RADIUS_1,
          }}
          TabIndicatorProps={{ style: { display: "none" } }}
          value={value}
          onChange={handleChange}
        >
          <DorsaTab {...a11yProps(1)} label="اطلاعات" value="1" />
          <DorsaTab {...a11yProps(2)} label="نودها" value="2" />
        </Tabs>
      </Container>
      <TabPanel value="1" sx={{ p: 0, my: 3 }}>
        <KubernetesOverview />
      </TabPanel>
      <TabPanel value="2" sx={{ p: 0, my: 3 }}>
        <KubernetesEditNodes />
      </TabPanel>
    </TabContext>
  );
};

export default EditKubernetes;
