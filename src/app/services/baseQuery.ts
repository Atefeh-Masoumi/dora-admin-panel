import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { logoutAction } from "../slice/authSlice";
import { RootStateType } from "../store";
import { navigateTo } from "src/utils/navigate";
import { CleaningServices } from "@mui/icons-material";
import { handleApiError } from "src/utils/errorHandler";

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
    timeout?: number
  },
  unknown,
  unknown
> = async (
  { url, method, body, params, headers, abortController, onUploadProgress, timeout },
  { getState, dispatch, signal }
) => {
    const state = getState() as RootStateType;
    const auth = state.auth;

    const config: AxiosRequestConfig = {
      url: `${baseUrl}${url}`,
      method: method || "GET",
      data: body,
      params,
      headers: {
        "Content-Type": body instanceof FormData ? "multipart/form-data" : "application/json",
        ...(auth?.accessToken && {
          Authorization: `Bearer ${auth.accessToken}`,
        }),
        ...headers,
      },
      signal: abortController?.signal || signal,
      onUploadProgress,
      timeout: timeout || 30000,
    };

    try {
      const response = await axios(config);
      return { data: response.data };
    } catch (axiosError) {
      const e = axiosError as AxiosError<string, any>;

      if (e.code === 'ECONNABORTED') {
        toast.error('درخواست شما زمان زیادی طول کشید. لطفا دوباره تلاش کنید');
        return { error: { status: 408, errorMessage: 'Request timeout' } };
      }

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
      if (error.status == 422) {
        handleApiError(error.errorMessage as any, "اطلاعات وارد شده معتبر نمی باشد");
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
        navigateTo("/login");
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
