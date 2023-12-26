import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { logoutAction } from "../slice/authSlice";
import { RootStateType } from "../store";

const defaultErrorMessage =
  "مشکلی پیش آمده است، لطفاً چند دقیقه دیگر دوباره امتحان کنید";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEVELOPMENT_URL_V1
    : process.env.REACT_APP_PRODUCTION_URL_V1;

export const baseQuery: BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig["method"];
    body?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    headers?: AxiosRequestConfig["headers"];
    abortController?: AbortController;
    onUploadProgress?: AxiosRequestConfig["onUploadProgress"];
  },
  unknown,
  unknown
> = async (
  {
    url,
    method = "GET",
    body,
    params,
    headers,
    abortController,
    onUploadProgress,
  },
  { getState, dispatch }
) => {
  try {
    const { auth } = getState() as RootStateType;

    type AuthorizedRequest = Express.Request & { authorization: string };

    const axiosHeader = () => {
      let result = { ...headers } as AuthorizedRequest;
      if (auth?.accessToken) {
        result.authorization = `Bearer ${auth.accessToken}`;
      }
      return result;
    };

    const result = await axios({
      url: baseUrl + url,
      method,
      data: body,
      params,
      headers: axiosHeader(),
      ...(abortController && { signal: abortController.signal }),
      onUploadProgress,
    });
    return { data: result.data };
  } catch (axiosError) {
    const e = axiosError as AxiosError;
    const error = {
      status: e.response?.status,
      data: e.message,
    };
    console.log("rtk query error handler => ", error);
    if (error?.data === "canceled") {
      return { error };
    }

    if (error.status === 400) {
      let message = "";

      (e.response?.data as any).errorMessage.map(
        (item: string) => (message += `${item}\n`)
      );

      toast.error(message || defaultErrorMessage);
    } else if (error.status === 401) {
      dispatch(logoutAction());
    } else if (error.status && error.status >= 500) {
      let message = "";

      (e.response?.data as any).ErrorMessage.map(
        (item: string) => (message += `${item}\n`)
      );

      toast.error(message || defaultErrorMessage);
    } else if (error.status !== 404) {
      toast.error((e.response?.data as any)[""][0]);
    }

    return { error };
  }
};
