import { createSlice } from "@reduxjs/toolkit";
import { VmProjectList } from "../services/api.generated";
import { logoutAction } from "./authSlice";

type vmProjectSliceType = { selectVmProjects: VmProjectList | null };

const initialState: vmProjectSliceType = {
  selectVmProjects: null,
};

const vmProjectSlice = createSlice({
  name: "vmProject",
  initialState,
  reducers: {
    setSelectVmProjects: (
      state,
      { payload }: { payload: VmProjectList | null }
    ) => {
      state.selectVmProjects = payload;
    },
  },
  extraReducers: ({ addMatcher, addCase }) => {
    addCase(logoutAction, () => {
      return initialState;
    });
  },
});

export const { setSelectVmProjects: setSelectVmProjectsAction } =
  vmProjectSlice.actions;

export default vmProjectSlice.reducer;
