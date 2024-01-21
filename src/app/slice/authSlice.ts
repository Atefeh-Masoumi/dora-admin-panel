import { createSlice } from "@reduxjs/toolkit";
import {
  api,
  LoginModel,
  PostApiMyAccountLoginApiResponse,
} from "../services/api.generated";

type loginWithPassType = PostApiMyAccountLoginApiResponse & LoginModel;

type authSliceType = loginWithPassType | null;

const initialState: () => authSliceType = () => {
  const localStorageUserInfo = localStorage.getItem("loginInfo");

  let result: authSliceType = null;
  try {
    if (!localStorageUserInfo) {
      return result;
    }
    result = {
      ...JSON.parse(localStorageUserInfo),
      email: "",
      password: "",
    };
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
      api.endpoints.postApiMyAccountLogin.matchFulfilled,
      (_, actionPayload) => {
        const accessToken =
          actionPayload.payload.accessToken === "0"
            ? ""
            : actionPayload.payload.accessToken;

        const enhancedPayload = {
          ...{
            ...actionPayload.payload,
            accessToken,
          },
          ...actionPayload.meta.arg.originalArgs.loginModel,
        };

        localStorage.setItem("loginInfo", JSON.stringify(enhancedPayload));

        return {
          ...enhancedPayload,
          ...actionPayload.meta.arg.originalArgs.loginModel,
        };
      }
    );
    addMatcher(
      api.endpoints.postApiMyAccountTwoFactorLogin.matchFulfilled,
      (_, { payload }: { payload: PostApiMyAccountLoginApiResponse }) => {
        localStorage.setItem("loginInfo", JSON.stringify(payload));
        return { ...payload, email: "", password: "" };
      }
    );
    addMatcher(
      api.endpoints.putApiMyPortalProfileEnableTwoFactor.matchFulfilled,
      (state, { payload }: { payload: any }) => {
        localStorage.setItem(
          "loginInfo",
          JSON.stringify({ ...state, twoFactor: true, email: "", password: "" })
        );
        state!.twoFactor = true;
        return payload;
      }
    );
    addMatcher(
      api.endpoints.putApiMyPortalProfileDisableTwoFactor.matchFulfilled,
      (state, { payload }: { payload: any }) => {
        localStorage.setItem(
          "loginInfo",
          JSON.stringify({
            ...state,
            twoFactor: false,
            email: "",
            password: "",
          })
        );
        state!.twoFactor = false;
        return payload;
      }
    );
  },
});

export const { logout: logoutAction } = authSlice.actions;

export default authSlice.reducer;
