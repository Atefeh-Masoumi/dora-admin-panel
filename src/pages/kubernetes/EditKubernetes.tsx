import { FC, useState, SyntheticEvent } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { KubernetesEditNodes } from "src/components/organisms/kubernetes/edit/editNodes/KubernetesEditNodes";
import { KubernetesOverview } from "src/components/organisms/kubernetes/edit/overview/KubernetesOverview";

const EditKubernetes: FC = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange}>
          <Tab label="اطلاعات" value="1" />
          <Tab label="نودها" value="2" />
        </TabList>
      </Box>
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
