import { createSlice } from "@reduxjs/toolkit";
import {
  api,
  PostApiMyAccountLoginApiResponse,
} from "../services/api.generated";

type authSliceType = PostApiMyAccountLoginApiResponse | null;

const initialState: () => authSliceType = () => {
  const localStorageUserInfo = localStorage.getItem("loginInfo");

  let result: authSliceType = null;
  try {
    if (!localStorageUserInfo) {
      return result;
    }
    result = JSON.parse(
      localStorageUserInfo
    ) as PostApiMyAccountLoginApiResponse;
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
    setTwoFactor: (state, { payload }: { payload: boolean }) => {
      localStorage.setItem(
        "loginInfo",
        JSON.stringify({ ...state, twoFactor: payload })
      );
      state!.twoFactor = payload;
    },
  },
  extraReducers: ({ addMatcher }) => {
    addMatcher(
      api.endpoints.postApiMyAccountLogin.matchFulfilled,
      (_, { payload }: { payload: PostApiMyAccountLoginApiResponse }) => {
        localStorage.setItem("loginInfo", JSON.stringify(payload));
        return payload;
      }
    );
    addMatcher(
      api.endpoints.putApiMyPortalProfileEnableTwoFactor.matchFulfilled,
      (state) => {
        localStorage.setItem(
          "loginInfo",
          JSON.stringify({ ...state, twoFactor: true })
        );
        state!.twoFactor = true;
      }
    );
    addMatcher(
      api.endpoints.putApiMyPortalProfileDisableTwoFactor.matchFulfilled,
      (state) => {
        localStorage.setItem(
          "loginInfo",
          JSON.stringify({ ...state, twoFactor: false })
        );
        state!.twoFactor = false;
      }
    );
  },
});

export const { logout: logoutAction, setTwoFactor: setTwoFactorAction } =
  authSlice.actions;

export default authSlice.reducer;
