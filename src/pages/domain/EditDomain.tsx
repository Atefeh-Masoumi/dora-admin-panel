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
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { Navigate, useParams } from "react-router";
import { EditDomainContext } from "src/components/organisms/domain/edit/contexts/EditContext";
import { DomainInfo } from "src/components/organisms/domain/edit/DomainInfo";
import { EditDomainInfo } from "src/components/organisms/domain/edit/EditDomainInfo";
import { EditDomainNs } from "src/components/organisms/domain/edit/EditDomainNs";

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

type EditDomainPropsType = {};

const EditDomain: FC<EditDomainPropsType> = () => {
  const { setDomainId } = useContext(EditDomainContext);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    setDomainId(Number(id));
  }, [id, setDomainId]);

  const [section, setSection] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) =>
    setSection(newValue);

  const tabArray = ["مشخصات دامنه", "تغییر اطلاعات", "تغییر NS"];

  const tabPanelArray = [DomainInfo, EditDomainInfo, EditDomainNs];

  if (!id) return <Navigate to="/domain" />;

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
          sx={{
            minWidth: "fix-content",
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

export default EditDomain;
