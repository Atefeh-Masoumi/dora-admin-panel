import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import auth from "./slice/authSlice";
import forgetPassword from "./slice/forgetPasswordSlice";
import createNode from "./slice/createNodeSlice";
import { api } from "./services/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    forgetPassword,
    createNode,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  Action<string>
>;
