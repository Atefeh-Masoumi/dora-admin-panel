import { createSlice } from "@reduxjs/toolkit";
import { logoutAction } from "./authSlice";
import { ProductBundleVmListResponse } from "../services/api.generated";

type createNodeSliceType = {
  nodeType: number | null;
  productBundle: ProductBundleVmListResponse | null;
  vmPassword: string;
};

const initialState: createNodeSliceType = {
  nodeType: null,
  productBundle: null,
  vmPassword: "",
};

const createNodeSlice = createSlice({
  name: "createNode",
  initialState,
  reducers: {
    setNodeType: (
      state,
      { payload }: { payload: createNodeSliceType["nodeType"] }
    ) => {
      state.nodeType = payload;
    },
    setProductBundleId: (
      state,
      { payload }: { payload: createNodeSliceType["productBundle"] }
    ) => {
      state.productBundle = payload;
    },
    setVmPassword: (
      state,
      { payload }: { payload: createNodeSliceType["vmPassword"] }
    ) => {
      state.vmPassword = payload;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(logoutAction, () => {
      return initialState;
    });
  },
});

export const {
  setNodeType: setNodeTypeAction,
  setProductBundleId: setProductBundleIdAction,
  setVmPassword: setVmPasswordAction,
} = createNodeSlice.actions;

export default createNodeSlice.reducer;
