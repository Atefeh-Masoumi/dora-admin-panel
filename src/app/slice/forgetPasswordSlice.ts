import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../services/api";

const initialState = () => ({ email: "", confirmCode: "", password: "" });

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {
    reset: initialState,
    setConfirmCode: (state, action: PayloadAction<string>) => {
      state.confirmCode = action.payload;
    },
  },
  extraReducers: ({ addMatcher }) => {
    addMatcher(
      api.endpoints.postPortalAccountForgot.matchFulfilled,
      (state, actionPayload) => {
        state.email = actionPayload.meta.arg.originalArgs.forgotModel.email;
      }
    );
  },
});

export const {
  reset: resetForgetPasswordStateAction,
  setConfirmCode: setForgetPasswordConfirmCodeAction,
} = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;
