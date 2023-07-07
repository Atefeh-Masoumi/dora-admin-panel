import { createSlice } from "@reduxjs/toolkit";
import { VmListResponse } from "../services/api.generated";
import { logoutAction } from "./authSlice";

type cdnSliceType = { selectedCloudServer: VmListResponse | null };

const initialState: cdnSliceType = {
  selectedCloudServer: null,
};

const cloudSlice = createSlice({
  name: "cloud",
  initialState,
  reducers: {
    setSelectedCloudServer: (
      state,
      { payload }: { payload: VmListResponse | null }
    ) => {
      state.selectedCloudServer = payload;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(logoutAction, () => {
      return initialState;
    });
    // addMatcher(
    //   api.endpoints.postPortalAccountLogin.matchFulfilled,
    //   (_, { payload }: { payload: PostPortalAccountLoginApiResponse }) => {
    //     localStorage.setItem("loginInfo", JSON.stringify(payload));
    //     return payload;
    //   }
    // );
  },
});

export const { setSelectedCloudServer: setSelectedCloudServerAction } =
  cloudSlice.actions;

export default cloudSlice.reducer;
