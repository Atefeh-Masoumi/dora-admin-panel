import { createSlice } from "@reduxjs/toolkit";
import { api, PostPortalAccountLoginApiResponse } from "../services/api.generated";

type authSliceType = PostPortalAccountLoginApiResponse | null;

const initialState: () => authSliceType = () => {
  const localStorageUserInfo = localStorage.getItem("loginInfo");

  let result: authSliceType = null;
  try {
    if (!localStorageUserInfo) {
      return result;
    }
    result = JSON.parse(localStorageUserInfo) as PostPortalAccountLoginApiResponse;
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
      api.endpoints.postPortalAccountLogin.matchFulfilled,
      (_, { payload }: { payload: PostPortalAccountLoginApiResponse }) => {
        localStorage.setItem("loginInfo", JSON.stringify(payload));
        return payload;
      }
    );
  },
});

export const { logout: logoutAction } = authSlice.actions;

export default authSlice.reducer;
