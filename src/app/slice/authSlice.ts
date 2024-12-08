import { createSlice } from "@reduxjs/toolkit";
import {
  enhancedApi,
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
      enhancedApi.endpoints.postApiMyAccountLogin.matchFulfilled,
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
      enhancedApi.endpoints.postApiMyAccountTwoFactorLogin.matchFulfilled,
      (_, { payload }: { payload: PostApiMyAccountLoginApiResponse }) => {
        localStorage.setItem("loginInfo", JSON.stringify(payload));
        return { ...payload, email: "", password: "" };
      }
    );
    addMatcher(
      enhancedApi.endpoints.putApiMyAccountProfileEditTwoFactor.matchFulfilled,
      (state, actionPayload) => {
        const twoFactor =
          actionPayload.meta.arg.originalArgs.twoFactorModel.twoFactorStatus;

        const newState = { ...state, twoFactor };

        localStorage.setItem("loginInfo", JSON.stringify(newState));
        return { ...newState, email: "", password: "" };
      }
    );
    addMatcher(
      enhancedApi.endpoints.putApiMyAccountProfileEdit.matchFulfilled,
      (state, actionPayload) => {
        const { profileCompleted } = actionPayload.payload;
        const newState = { ...state, profileCompleted };
        localStorage.setItem("loginInfo", JSON.stringify(newState));
        return { ...newState, email: "", password: "" };
      }
    );
    addMatcher(
      enhancedApi.endpoints.postApiMyAccountProfileConfirmPhoneNumber
        .matchFulfilled,
      (state, actionPayload) => {
        const { profileCompleted } = actionPayload.payload;
        const newState = { ...state, profileCompleted };
        localStorage.setItem("loginInfo", JSON.stringify(newState));
        return { ...newState, email: "", password: "" };
      }
    );
    addMatcher(
      enhancedApi.endpoints.postApiMyAccountProfileConfirmEmail.matchFulfilled,
      (state, actionPayload) => {
        const { profileCompleted } = actionPayload.payload;
        const newState = { ...state, profileCompleted };
        localStorage.setItem("loginInfo", JSON.stringify(newState));
        return { ...newState, email: "", password: "" };
      }
    );
  },
});

export const { logout: logoutAction } = authSlice.actions;

export default authSlice.reducer;
