import { Box, CircularProgress, Stack, Tabs } from "@mui/material";
import {
  FC,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import { 
  useGetApiMyProjectGetByIdQuery,
} from "src/app/services/api.generated";
import { DorsaTab } from "src/components/atoms/DorsaTab";
import { ProjectInfo } from "src/components/organisms/project/ProjectInfo";
import { ProjectUsers } from "src/components/organisms/project/ProjectUsers";
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

type EditProjectPropsType = {};

 const EditProject: FC<EditProjectPropsType> = () => {
  const { projectId } = useParams();
  const [section, setSection] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const { data: projectData, isLoading: getProjectDataLoading } =
    useGetApiMyProjectGetByIdQuery({
      id: Number(projectId)!,
    });

  useEffect(() => {
    const currentPath = location.pathname;
    const sectionIndex = routes.findIndex(route => 
      new RegExp(route
        .replace(':projectId', projectId || '')
      ).test(currentPath)
    );
    if (sectionIndex !== -1) {
      setSection(sectionIndex);
    }
  }, [location.pathname, projectId]);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setSection(newValue);
    const newPath = routes[newValue]
      .replace(':projectId', projectId || '');
    navigate(newPath, { replace: true });
  };

  const tabArray = [
    "مشخصات پروژه",
    "کاربران پروژه",
  ];

  const routes = [
    "/project/:projectId/specification",
    "/project/:projectId/users",
  ];

  const tabPanelArray = [
    ProjectInfo,
    ProjectUsers,
  ];

  if (!projectId) return <Navigate to="/" />;

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
          variant="scrollable"
          scrollButtons="auto"
        >
          {getProjectDataLoading ? (
            <CircularProgress
              size={20}
              sx={{
                margin: "10px auto",
              }}
            />
          ) : (
            tabArray.map(
              (label, index) => (
                <DorsaTab
                  {...a11yProps(index)}
                  label={label}
                  key={index}
                  onClick={() => setSection(index)}
                />
              )
            )
          )}
        </Tabs>
      </Box>
      {projectId &&
        tabPanelArray.map((Component, index) => (
          <TabPanel value={section} index={index} key={index}>
            <Component />
          </TabPanel>
        ))}
    </Stack>
  );
};

export default EditProject;
