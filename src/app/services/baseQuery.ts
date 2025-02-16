import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { logoutAction } from "../slice/authSlice";
import { RootStateType } from "../store";
import { navigateTo } from "src/utils/navigate";

const defaultErrorMessage =
  "مشکلی پیش آمده است، لطفاً چند دقیقه دیگر دوباره امتحان کنید";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEVELOPMENT_URL_V1_
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
  const { auth } = getState() as RootStateType;
  try {
    const result = await axios({
      url: baseUrl + url,
      method,
      data: body,
      params,
      headers: {
        ...headers,
        ...(auth?.accessToken && {
          authorization: `Bearer ${auth.accessToken}`,
        }),
      },
      ...(abortController && { signal: abortController.signal }),
      onUploadProgress,
    });
    return { data: result.data };
  } catch (axiosError) {
    const e = axiosError as AxiosError<string, any>;

    if (!e.response?.status) {
      toast.error(defaultErrorMessage);
      return { e };
    }

    const error = {
      status: e.response.status,
      errorMessage: e.response?.data,
    };

    if (error.status >= 500) {
      toast.error(error.errorMessage || defaultErrorMessage);
      return { error };
    }
    if (error.status === 403) {
      navigateTo("/forbidden");
      return { error };
    }
    if (error.status === 404) {
      return { error };
    }
    if (error.status === 401) {
      auth?.accessToken && dispatch(logoutAction());
      return { error };
    }
    if (error.status === 400) {
      toast.error(error.errorMessage || defaultErrorMessage);
      return { error };
    }

    toast.error(error.errorMessage || `\n ${defaultErrorMessage}`);

    return { error };
  }
};
