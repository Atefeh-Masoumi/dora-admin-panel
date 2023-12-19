import { createSlice } from "@reduxjs/toolkit";
import { VmProjectList } from "../services/api.generated";
import { logoutAction } from "./authSlice";

type vmProjectSliceType = { selectedVmProject: VmProjectList | null };

const initialState: vmProjectSliceType = {
  selectedVmProject: null,
};

const vmProjectSlice = createSlice({
  name: "vmProject",
  initialState,
  reducers: {
    setSelectVmProject: (
      state,
      { payload }: { payload: VmProjectList | null }
    ) => {
      state.selectedVmProject = payload;
    },
  },
  extraReducers: ({ addMatcher, addCase }) => {
    addCase(logoutAction, () => {
      return initialState;
    });
  },
});

export const { setSelectVmProject: setSelectVmProjectAction } =
  vmProjectSlice.actions;

export default vmProjectSlice.reducer;
