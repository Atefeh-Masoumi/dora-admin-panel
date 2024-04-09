import { createSlice } from "@reduxjs/toolkit";
import { DnsListResponse } from "../services/api.generated";
import { logoutAction } from "./authSlice";

type cdnSliceType = { selectedDomain: DnsListResponse | null };

const initialState: cdnSliceType = {
  selectedDomain: null,
};

const cdnSlice = createSlice({
  name: "cdn",
  initialState,
  reducers: {
    setSelectedDomain: (
      state,
      { payload }: { payload: DnsListResponse | null }
    ) => {
      state.selectedDomain = payload;
    },
  },
  extraReducers: ({ addMatcher, addCase }) => {
    addCase(logoutAction, () => {
      return initialState;
    });
    // addMatcher(
    //   api.endpoints.postApiAccountLogin.matchFulfilled,
    //   (_, { payload }: { payload: PostApiAccountLoginApiResponse }) => {
    //     localStorage.setItem("loginInfo", JSON.stringify(payload));
    //     return payload;
    //   }
    // );
  },
});

export const { setSelectedDomain: setSelectedDomainAction } = cdnSlice.actions;

export default cdnSlice.reducer;
