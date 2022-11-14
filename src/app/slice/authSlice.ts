import { createSlice } from "@reduxjs/toolkit";
import { api, PostApiV2AccountLoginApiResponse } from "../services/api.generated";

type authSliceType = PostApiV2AccountLoginApiResponse | null;

const initialState: () => authSliceType = () => {
  const localStorageUserInfo = localStorage.getItem("loginInfo");

  let result: authSliceType = null;
  try {
    if (!localStorageUserInfo) {
      return result;
    }
    result = JSON.parse(localStorageUserInfo) as PostApiV2AccountLoginApiResponse;
  } catch {
    localStorage.removeItem("loginInfo");
  }

  return result;
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("loginInfo");
      return null;
    },
  },
  extraReducers: ({ addMatcher }) => {
    addMatcher(
      api.endpoints.postApiV2AccountLogin.matchFulfilled,
      (_, { payload }: { payload: PostApiV2AccountLoginApiResponse }) => {
        localStorage.setItem("loginInfo", JSON.stringify(payload));
        return payload;
      }
    );
  },
});

export const { logout: logoutAction } = authSlice.actions;

export default authSlice.reducer;
