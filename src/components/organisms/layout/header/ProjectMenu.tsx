import { ExpandMore, FolderOutlined } from '@mui/icons-material'
import { Box, Button, createTheme, Menu, MenuItem, MenuList, Stack, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { useGetApiMyProjectListQuery } from 'src/app/services/api.generated'
import { BORDER_RADIUS_1 } from 'src/configs/theme'
import { setSelectedProjectId, setSelectedProject, setProjectList } from "src/app/slice/projectSlice";
const ProjectMenu = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { projectId } = useParams();
    const [projectMenuAnchor, setProjectMenuAnchor] = useState<null | HTMLElement>(null);
    const { data: projectList = [], isLoading: getProjectListLoading } =
    useGetApiMyProjectListQuery();
    // Project menu handlers
  const handleProjectMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProjectMenuAnchor(event.currentTarget);
  };
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
  return (
    <Box>
    <Button
      endIcon={<ExpandMore sx={{ fontSize: "1.5em !important" }} />}
      onClick={handleProjectMenuOpen}
      color="secondary"
      sx={{ 
        backgroundColor: "rgba(110, 118, 138, 0.06)",
        py: 1.3,
        width: 150,
        height: 40,
        borderRadius: BORDER_RADIUS_1,
        '&:hover': {
          backgroundColor: "rgba(110, 118, 138, 0.12)",
        }
      }}
    >
      <Stack direction="row">
        <Typography sx={{ direction: "rtl", width: "100%" }}>
          {selectedProject ? selectedProject.name : "انتخاب پروژه"}
        </Typography>
      </Stack>
    </Button>
    <ThemeProvider
      theme={createTheme({
        palette: { mode: "dark" },
      })}
    >
      <Menu
        keepMounted
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={projectMenuAnchor}
        open={Boolean(projectMenuAnchor)}
        onClose={handleProjectMenuClose}
        sx={{ marginRight: { xs: "0", md: "60px" }, marginTop: "10px" }}
        PaperProps={{
          sx: { 
            width: 150,
            mt: 1,
            boxShadow: 4,
            borderRadius: BORDER_RADIUS_1,
            backgroundColor: "rgba(32, 32, 32, 1)"
          },
        }}
      >
        <MenuList sx={{ backgroundColor: "rgba(32, 32, 32, 1)" }}>
          <Stack p={1.5} spacing={1}>
            {projectList.map((project) => (
              <MenuItem
                key={project.id}
                disableRipple
                onClick={() => project?.id && handleProjectSelect(project?.id)}
                selected={project.id === selectedProjectId}
                sx={{
                  borderRadius: BORDER_RADIUS_1,
                  m: 1,
                  py: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    }
                  }
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  py={0.5}
                >
                  <FolderOutlined />
                  <Typography>
                    {project.name}
                  </Typography>
                </Stack>
              </MenuItem>
            ))}
          </Stack>
        </MenuList>
      </Menu>
    </ThemeProvider>
  </Box>
  )
}

export default ProjectMenu