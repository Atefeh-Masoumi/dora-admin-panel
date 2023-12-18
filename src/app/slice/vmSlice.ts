import { createSlice } from "@reduxjs/toolkit";
import { VmProjectList } from "../services/api.generated";
import { logoutAction } from "./authSlice";

type vmSliceType = { selectedVm: VmProjectList | null };

const initialState: vmSliceType = {
  selectedVm: null,
};

const vmSlice = createSlice({
  name: "vm",
  initialState,
  reducers: {
    setSelectedVm: (state, { payload }: { payload: VmProjectList | null }) => {
      state.selectedVm = payload;
    },
  },
  extraReducers: ({ addMatcher, addCase }) => {
    addCase(logoutAction, () => {
      return initialState;
    });
  },
});

export const { setSelectedVm: setSelectedVmAction } = vmSlice.actions;

export default vmSlice.reducer;
