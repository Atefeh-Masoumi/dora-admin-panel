import {
  api as generatedApi,
  PostApiMyCloudSupportItemCreateApiResponse,
  PostApiMyCloudSupportCreateApiArg,
} from "./api.generated";
import { AxiosRequestConfig } from "axios";

export const api = generatedApi
  .injectEndpoints({
    endpoints: (build) => ({
      customCreateSupport: build.mutation<
        PostApiMyCloudSupportItemCreateApiResponse,
        PostApiMyCloudSupportCreateApiArg & {
          abortController?: AbortController;
          onUploadProgress: AxiosRequestConfig["onUploadProgress"];
        }
      >({
        query: ({ body, abortController, onUploadProgress }) => ({
          url: `/api/cloud/support/create`,
          method: "POST",
          body,
          abortController,
          onUploadProgress,
        }),
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: [
      "Profile",
      "Notification",
      "Order",
      "Orders",
      "ZoneData",
      "EditRecordDialog",
      "ProxyStatus",
      "DNSRecordSetting",
      "LoadBalance",
      "SslSetting",
      "SupportItems",
      "VmHosts",
      "VmHost",
    ],
    endpoints: {
      getApiMyAccountProfileGet: {
        providesTags: () => ["Profile"],
      },
      getApiMyAccountProfileGetNotificationStatus: {
        providesTags: () => ["Notification"],
      },
      getApiMyCdnDnsRecordGetById: {
        providesTags: () => ["EditRecordDialog"],
      },
      getApiMyCdnDnsRecordListByCdnId: {
        providesTags: () => ["ProxyStatus", "DNSRecordSetting"],
      },
      getApiMyCdnHostGetById: {
        providesTags: () => ["ZoneData"],
      },
      getApiMyCloudSupportItemListBySupportId: {
        providesTags: () => ["SupportItems"],
      },
      getApiMyCdnLoadBalanceListByCdnId: {
        providesTags: () => ["LoadBalance"],
      },
      putApiMyCloudCustomerEditCustomerType: {
        invalidatesTags: () => ["Profile"],
      },
      getApiMyCloudCustomerGet: {
        providesTags: () => ["Profile"],
      },
      postApiMyAccountProfileConfirmPhoneNumber: {
        invalidatesTags: () => ["Profile"],
      },
      putApiMyAccountProfileEditPhoneNotification: {
        invalidatesTags: () => ["Notification"],
      },
      putApiMyAccountProfileEditEmailNotification: {
        invalidatesTags: () => ["Notification"],
      },
      putApiMyCdnDnsRecordChangeProxyStatusById: {
        invalidatesTags: () => ["EditRecordDialog", "ProxyStatus"],
      },
      deleteApiMyCdnDnsRecordDeleteById: {
        invalidatesTags: () => ["DNSRecordSetting"],
      },
      putApiMyCdnDnsRecordEdit: {
        invalidatesTags: () => ["DNSRecordSetting", "EditRecordDialog"],
      },
      postApiMyCdnDnsRecordCreate: {
        invalidatesTags: () => ["DNSRecordSetting"],
      },
      putApiMyCdnHostChangeCdnType: {
        invalidatesTags: () => ["ZoneData"],
      },
      putApiMyCdnHostChangeHsts: {
        invalidatesTags: () => ["ZoneData"],
      },
      putApiMyCdnHostChangeHttpsRedirect: {
        invalidatesTags: () => ["ZoneData"],
      },
      putApiMyCdnHostChangeNonWwwRedirect: {
        invalidatesTags: () => ["ZoneData"],
      },
      putApiMyCdnHostChangeEdgeCertType: {
        invalidatesTags: () => ["ZoneData"],
      },
      putApiMyCdnHostChangeClientCertType: {
        invalidatesTags: () => ["ZoneData"],
      },
      deleteApiMyCdnLoadBalanceDeleteById: {
        invalidatesTags: () => ["LoadBalance"],
      },
      postApiMyCdnLoadBalanceCreate: {
        invalidatesTags: () => ["LoadBalance"],
      },
      putApiMyCdnLoadBalanceEdit: {
        invalidatesTags: () => ["LoadBalance"],
      },
      getApiMyCdnEdgeCertGetByCdnId: {
        providesTags: () => ["SslSetting"],
      },
      getApiMyCdnEdgeCertGetUserCertByCdnId: {
        providesTags: () => ["SslSetting"],
      },
      getApiMyCdnClientCertGetByCdnId: {
        providesTags: () => ["SslSetting"],
      },
      postApiMyCdnEdgeCertCreate: {
        invalidatesTags: () => ["SslSetting"],
      },
      postApiMyCdnEdgeCertCreateUserCert: {
        invalidatesTags: () => ["SslSetting"],
      },
      postApiMyCloudSupportItemCreate: {
        invalidatesTags: () => ["SupportItems"],
      },
      getApiMyVmProjectList: {
        providesTags: () => ["VmHosts"],
      },
      postApiMyVmProjectCreate: {
        invalidatesTags: () => ["VmHosts"],
      },
      deleteApiMyVmProjectDeleteById: {
        invalidatesTags: () => ["VmHosts"],
      },
      putApiMyVmProjectEdit: {
        invalidatesTags: () => ["VmHosts"],
      },
      postApiMyVmHostCreate: {
        invalidatesTags: () => ["VmHosts"],
      },
      deleteApiMyVmHostDeleteById: {
        invalidatesTags: () => ["VmHosts"],
      },
      putApiMyVmHostEdit: {
        invalidatesTags: () => ["VmHosts"],
      },
      getApiMyVmHostGetById: {
        providesTags: () => ["VmHost"],
      },
      putApiMyVmHostConnectById: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiMyVmHostDisconnectById: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiMyVmHostShutdownById: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiMyVmHostStartById: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiMyVmHostStopById: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiMyVmHostRebootById: {
        invalidatesTags: () => ["VmHost"],
      },
    },
  });

export const {
  useCustomCreateSupportMutation,
  useLazyGetApiMyAccountProfileGetNotificationStatusQuery,
  useLazyGetApiMyDatacenterIpListByProductIdAndIdQuery,
  useLazyGetApiMyVmImageListByDatacenterIdQuery,
  useLazyGetApiMyVmHostGetByIdQuery,
  useLazyGetApiMyCdnLoadBalanceGetByIdQuery,
  useLazyGetApiMyCdnDnsRecordGetByIdQuery,
  useLazyGetApiMyCloudInvoiceGetByIdQuery,
  useLazyGetApiMyCloudSupportItemDownloadByIdQuery,
  useLazyGetApiMyCloudPaymentGetByIdQuery,
  useLazyGetApiMyCloudBillDownloadByIdQuery,
  useLazyGetApiMyCloudCustomerProductListByProductIdQuery,
  useLazyGetApiMyWebGetLoginSessionByIdQuery,
  useLazyGetApiMyPlatformNamespaceGetLoginByIdQuery,
  useLazyGetApiMyRabbitUserListByRabbitHostIdQuery,
  useLazyGetApiMyDomainGetByIdQuery,
} = api;
