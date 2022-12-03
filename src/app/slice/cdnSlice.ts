import { createSlice } from "@reduxjs/toolkit";
import { ZoneListResponse } from "../services/api.generated";
import { logoutAction } from "./authSlice";

type cdnSliceType = { selectedDomain: ZoneListResponse | null };

const initialState: cdnSliceType = {
  selectedDomain: null,
};

const cdnSlice = createSlice({
  name: "cdn",
  initialState,
  reducers: {
    setSelectedDomain: (
      state,
      { payload }: { payload: ZoneListResponse | null }
    ) => {
      state.selectedDomain = payload;
    },
  },
  extraReducers: ({ addMatcher, addCase }) => {
    addCase(logoutAction, () => {
      return initialState;
    });
    // addMatcher(
    //   api.endpoints.postUserV2AccountLogin.matchFulfilled,
    //   (_, { payload }: { payload: PostUserV2AccountLoginApiResponse }) => {
    //     localStorage.setItem("loginInfo", JSON.stringify(payload));
    //     return payload;
    //   }
    // );
  },
});

export const { setSelectedDomain: setSelectedDomainAction } = cdnSlice.actions;

export default cdnSlice.reducer;
