import { createSlice } from "@reduxjs/toolkit";
import { CdnListResponse } from "../services/api.generated";
import { logoutAction } from "./authSlice";

type cdnSliceType = { selectedDomain: CdnListResponse | null };

const initialState: cdnSliceType = {
  selectedDomain: null,
};

const cdnSlice = createSlice({
  name: "cdn",
  initialState,
  reducers: {
    setSelectedDomain: (
      state,
      { payload }: { payload: CdnListResponse | null }
    ) => {
      state.selectedDomain = payload;
    },
  },
  extraReducers: ({ addMatcher, addCase }) => {
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

export const { setSelectedDomain: setSelectedDomainAction } = cdnSlice.actions;

export default cdnSlice.reducer;
