import { Dispatch, FC, SetStateAction, useState, useEffect } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Popover,
  Stack,
  Toolbar,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { useNavigate, useParams } from "react-router";
import { ArrowForward as ArrowForwardIcon, ExpandMore as ExpandMoreIcon, Home as HomeIcon, HomeMaxOutlined } from "@mui/icons-material";
import { BACK_URL_HINTS_ENUM } from "src/constant/backUrlHintsEnum";
import MenuSvg from "src/components/atoms/svg-icons/MenuSvg";
import MoreSvg from "src/components/atoms/svg-icons/MoreSvg";
import { CalculatorSvg } from "src/components/atoms/svg-icons/CalculatorSvg";
import { HeadphoneSvg } from "src/components/atoms/svg-icons/HeadphoneSvg";
import { Notifications } from "./Notifications";
import { ManageMenu } from "./ManageMenu";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { setSelectedProjectId, setSelectedProject, setProjectList } from "src/app/slice/projectSlice";
import { useGetApiMyProjectListQuery } from "src/app/services/api.generated";

type HeaderPropsType = {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  title?: string;
  link?: { text: string; url: string | number };
  isScrolled?: boolean;
  RightComponent?: FC;
};

const Header: FC<HeaderPropsType> = ({
  setShowSidebar,
  title,
  link,
  isScrolled,
  RightComponent,
}) => {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >();
  const [projectMenuAnchor, setProjectMenuAnchor] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { id: kubernetesClusterID } = useParams();
  const { projectId } = useParams();
  const vpcId = searchParams.get("vpcId");

  const theme = useTheme();
  const goToCalculator = () => navigate("/portal/calculator");

  // Get project data from Redux
  const { data: projectList = [], isLoading: getProjectListLoading } =
    useGetApiMyProjectListQuery();
  const selectedProjectId = useAppSelector((state) => state.project?.selectedProjectId);
  const selectedProject = useAppSelector((state) => state.project?.selectedProject);

  // Effect to set selected project when project list is loaded and we have a stored project ID
  useEffect(() => {
    if (!getProjectListLoading && projectList.length > 0 && selectedProjectId && !selectedProject) {
      const project = projectList.find(p => p.id === selectedProjectId);
      if (project) {
        dispatch(setSelectedProject(project));
      }
    }
  }, [getProjectListLoading, projectList, selectedProjectId, selectedProject, dispatch]);

  // Effect to update project list in Redux state
  useEffect(() => {
    if (!getProjectListLoading && projectList.length > 0) {
      dispatch(setProjectList(projectList));
    }
  }, [getProjectListLoading, projectList, dispatch]);

  // Project menu handlers
  const handleProjectMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProjectMenuAnchor(event.currentTarget);
  };

  const handleProjectMenuClose = () => {
    setProjectMenuAnchor(null);
  };

  const handleProjectSelect = (projectId: number) => {
    const selectedProject = projectList.find(p => p.id === projectId);
    if (selectedProject) {
      dispatch(setSelectedProject(selectedProject));
    }
    dispatch(setSelectedProjectId(projectId));
    localStorage.setItem('selectedProjectId', projectId.toString());
    const selectedProjectData = projectList.find(p => p.id === projectId);
    if (selectedProjectData) {
      dispatch(setSelectedProject(selectedProjectData));
    }
    handleProjectMenuClose();
    navigate(`/vm/${projectId}/list`);
  };

  const closeMenuHandler = () => setAnchorEl(null);
  const openMenuHandler = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setAnchorEl(currentTarget);

  const open = Boolean(anchorEl);
  const id = open ? "header menu" : undefined;

  const desktopHeaderIcon = (
    <>
      <Box>
        <Button
          endIcon={<ExpandMoreIcon sx={{ fontSize: "1.5em !important" }} />}
          onClick={handleProjectMenuOpen}
          variant="outlined"
          size="small"
          sx={{ 
            width: 150,
            height: 40,
            borderRadius: BORDER_RADIUS_1,
            borderColor: "rgba(110, 118, 138, 0.16)",
            color: "text.primary",
            '&:hover': {
              borderColor: "primary.main",
            }
          }}
        >
          {selectedProject ? selectedProject.name : "انتخاب پروژه"}
        </Button>
        <Menu
          anchorEl={projectMenuAnchor}
          open={Boolean(projectMenuAnchor)}
          onClose={handleProjectMenuClose}
          PaperProps={{
            sx: { 
              width: 150,
              mt: 1,
              boxShadow: 4,
              borderRadius: BORDER_RADIUS_1
            },
          }}
        >
          {projectList.map((project) => (
            <MenuItem
              key={project.id}
              onClick={() => project?.id && handleProjectSelect(project?.id)}
              selected={project.id === selectedProjectId}
              sx={{
                py: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  }
                }
              }}
            >
              {project.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Notifications />
      <IconButton
        sx={{
          border: 1,
          borderRadius: BORDER_RADIUS_1,
          borderColor: "rgba(110, 118, 138, 0.16)",
        }}
        onClick={goToCalculator}
      >
        <CalculatorSvg fill="transparent" />
      </IconButton>
      <IconButton
        sx={{
          border: 1,
          borderRadius: BORDER_RADIUS_1,
          borderColor: "rgba(110, 118, 138, 0.16)",
        }}
        onClick={() => {
          closeMenuHandler();
          navigate("/portal/supports");
        }}
      >
        <HeadphoneSvg
          fill="transparent"
          mode="default"
          sx={{ width: "100%", height: "100%" }}
        />
      </IconButton>
    </>
  );

  const mobileHeaderIcon = (
    <>
      <IconButton
        sx={{
          border: 1,
          borderRadius: BORDER_RADIUS_1,
          borderColor: "rgba(110, 118, 138, 0.16)",
          display: { xs: "inline-flex", md: "none" },
        }}
        onClick={openMenuHandler}
      >
        <MoreSvg />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={closeMenuHandler}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            bgcolor: "white",
            py: 2,
            mt: 1,
          },
        }}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Stack rowGap={2} px={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            {desktopHeaderIcon}
          </Stack>
          <ManageMenu />
        </Stack>
      </Popover>
    </>
  );

  const backButtonOnClick = (url: string | number) => {
    let href: string | number = "";
    switch (url) {
      case BACK_URL_HINTS_ENUM.ADD_NODE:
        href = `/kubernetes-cluster/${projectId}/${kubernetesClusterID}`;
        break;
      case BACK_URL_HINTS_ENUM.ADD_DEPLOYMENT:
        navigate(-1);
        return;
      case BACK_URL_HINTS_ENUM.ADD_VM:
        href =
          !projectId || !vpcId
            ? `/vm/${projectId}/list`
            : `/vpc/${vpcId}/vpcVm?projectId=${projectId}&vpcId=${vpcId}`;
        break;
      case BACK_URL_HINTS_ENUM.EDIT_VM:
        href = !vpcId
          ? `/vm/${projectId}/list`
          : `/vpc/${vpcId}/vpcVm?projectId=${projectId}&vpcId=${vpcId}`;

        break;
      default:
        href = typeof url === "string" ? url : "";
        break;
    }
    if (href) {
      navigate(href);
    }
  };

  return (
    <AppBar
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        maxWidth: "100vw",
        boxShadow: isScrolled ? 4 : 0,
        bgcolor: "white",
        overflow: "overlay",
        borderRadius: BORDER_RADIUS_1,
      }}
    >
      <Toolbar sx={{ p: 0 + "!important" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            width: "100%",
            height: "100%",
            py: { xs: 1, lg: 2 },
            px: { xs: 1.5, lg: 3 },
            borderRadius: BORDER_RADIUS_1,
            zIndex: 2,
          }}
        >
          <Stack direction="row" alignItems="center" columnGap={1}>
            {!link && (
              <IconButton
                size="small"
                sx={{
                  width: 34,
                  height: 34,
                  display: { xs: "block", lg: "none" },
                }}
                onClick={() => setShowSidebar(true)}
              >
                <MenuSvg />
              </IconButton>
            )}

            <Stack direction="row" alignItems="center" spacing={1}>
              {link && (
                <Button
                  onClick={() => backButtonOnClick(link.url)}
                  // href={link.url}
                  color="secondary"
                >
                  <ArrowForwardIcon
                    color="secondary"
                    sx={{ width: { xs: 30, md: 40 } }}
                  />
                  <Typography
                    fontSize={16}
                    display={{ xs: "none", md: "flex" }}
                  >
                    {link.text}
                  </Typography>
                </Button>
              )}
              {title && (
                <>
                  <IconButton
                    onClick={() => navigate("/")}
                    sx={{
                      width: { xs: 40, md: 48 },
                      height: { xs: 40, md: 48 },
                      borderRadius: BORDER_RADIUS_1,
                      borderColor: "primary.light",
                      backgroundColor: "primary.50",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        borderColor: "primary.main",
                        transform: "scale(1.05)",
                        "& .MuiSvgIcon-root": {
                          color: "primary.main",
                        },
                      },
                    }}
                  >
                    <HomeMaxOutlined
                      sx={{
                        fontSize: { xs: 24, md: 28 },
                        color: "grey.600",
                        transition: "color 0.2s",
                      }}
                    />
                  </IconButton>
                  <Typography
                    variant="title5"
                    fontWeight={700}
                    whiteSpace="nowrap"
                    lineHeight={1}
                    color={theme.palette.grey[700]}
                  >
                    {title}
                  </Typography>
                </>
              )}
              {RightComponent && <RightComponent />}
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            display={{ xs: "none", md: "inline-flex" }}
          >
            <ManageMenu />
            {desktopHeaderIcon}
          </Stack>
          {mobileHeaderIcon}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
