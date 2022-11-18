import {
  useContext,
  FC,
  SyntheticEvent,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Tabs, Stack, Box } from "@mui/material";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { BORDER_RADIUS_5 } from "src/configs/theme";
import { Navigate, useParams } from "react-router";
import { EditRabbitContext } from "src/components/organisms/rabbit/editService/context/EditRabbitContext";
import { ServiceInfo } from "src/components/organisms/rabbit/editService/ServiceInfo";
import { ServiceUsers } from "src/components/organisms/rabbit/editService/ServiceUsers";
import { ServerConfig } from "src/components/organisms/rabbit/editService/ServerConfig";

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

type EditRabbitPropsType = {};

const EditRabbitService: FC<EditRabbitPropsType> = () => {
  const { setServerId } = useContext(EditRabbitContext);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setServerId(Number(id));
    }
  }, [id, setServerId]);

  const [section, setSection] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) =>
    setSection(newValue);

  const tabArray = [
    "مشخصات سرویس",
    "شناسه کاربری",
    "تغییر سرویس"
  ];

  const tabPanelArray = [
    ServiceInfo,
    ServiceUsers,
    ServerConfig
  ];

  if (!id) return <Navigate to="/dash/rabbit" />;

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
            minWidth: { xs: 450, md: 350 },
          }}
          TabIndicatorProps={{ style: { display: "none" } }}
          value={section}
          onChange={handleChange}
        >
          {tabArray.map((label, index) => (
            <DorsaTab {...a11yProps(index)} label={label} key={index} />
          ))}
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

export default EditRabbitService;
