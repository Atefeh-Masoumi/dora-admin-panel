import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Project {
  id?: number;
  name: string | null;
  vpcHostId?: number | null;
  [key: string]: any;
}

interface ProjectState {
  selectedProjectId: number | null;
  selectedProject: Project | null;
  projectList: Project[];
}

// Helper function to get project ID from local storage
const getStoredProjectId = (): number | null => {
  const storedId = localStorage.getItem('selectedProjectId');
  return storedId ? parseInt(storedId, 10) : null;
};

const initialState: ProjectState = {
  selectedProjectId: getStoredProjectId(),
  selectedProject: null,
  projectList: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setSelectedProjectId: (state, action: PayloadAction<number | null>) => {
      // Only update if the new value is different from current
      if (state.selectedProjectId !== action.payload) {
        state.selectedProjectId = action.payload;
        // Store in local storage if not null, remove if null
        if (action.payload) {
          localStorage.setItem('selectedProjectId', action.payload.toString());
          // Update selectedProject only if we have a valid ID and project list
          if (state.projectList.length > 0) {
            const foundProject = state.projectList.find(project => project.id === action.payload);
            if (foundProject) {
              state.selectedProject = foundProject;
            }
          }
        } else {
          localStorage.removeItem('selectedProjectId');
          state.selectedProject = null;
        }
      }
    },
    setProjectList: (state, action: PayloadAction<Project[]>) => {
      state.projectList = action.payload;
      // Only try to find selected project if we have a selectedProjectId
      if (state.selectedProjectId && action.payload.length > 0) {
        const foundProject = action.payload.find(project => project.id === state.selectedProjectId);
        if (foundProject) {
          state.selectedProject = foundProject;
        } else {
          // If the selected project is not found in the new list, clear the selection
          state.selectedProjectId = null;
          state.selectedProject = null;
          localStorage.removeItem('selectedProjectId');
        }
      }
    },
    setSelectedProject: (state, action: PayloadAction<Project | null>) => {
      if (action.payload) {
        state.selectedProject = action.payload;
        state.selectedProjectId = action.payload.id || state.selectedProjectId;
      }
    },
    clearProjectSelection: (state) => {
      state.selectedProjectId = null;
      state.selectedProject = null;
    }
  },
});

export const { setSelectedProjectId, setProjectList, setSelectedProject, clearProjectSelection } = projectSlice.actions;
export default projectSlice.reducer; 