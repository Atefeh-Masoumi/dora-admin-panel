import {
  api as generatedApi,
  PostApiCloudSupportItemCreateApiResponse,
  PostApiCloudSupportCreateApiArg,
} from "./api.generated";
import { AxiosRequestConfig } from "axios";

export const api = generatedApi
  .injectEndpoints({
    endpoints: (build) => ({
      customCreateSupport: build.mutation<
        PostApiCloudSupportItemCreateApiResponse,
        PostApiCloudSupportCreateApiArg & {
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
      getApiAccountProfileGet: {
        providesTags: () => ["Profile"],
      },
      getApiAccountProfileGetNotificationStatus: {
        providesTags: () => ["Notification"],
      },
      getApiCdnDnsRecordGetById: {
        providesTags: () => ["EditRecordDialog"],
      },
      getApiCdnDnsRecordListByZoneName: {
        providesTags: () => ["ProxyStatus", "DNSRecordSetting"],
      },
      getApiCdnHostGetByZoneName: {
        providesTags: () => ["ZoneData"],
      },
      getApiCloudSupportItemListBySupportId: {
        providesTags: () => ["SupportItems"],
      },
      getApiCdnLoadBalanceListByZoneName: {
        providesTags: () => ["LoadBalance"],
      },
      getApiCloudOrderList: {
        providesTags: () => ["Orders"],
      },
      getApiCloudOrderGetById: {
        providesTags: () => ["Order"],
      },
      putApiCloudOrderPaymentType: {
        invalidatesTags: () => ["Order"],
      },
      putApiCloudOrderDuration: {
        invalidatesTags: () => ["Order"],
      },
      putApiCloudCustomerEditCustomerType: {
        invalidatesTags: () => ["Profile"],
      },
      getApiCloudCustomerGet: {
        providesTags: () => ["Profile"],
      },
      postApiAccountProfileConfirmPhoneNumber: {
        invalidatesTags: () => ["Profile"],
      },
      putApiAccountProfileEditPhoneNotification: {
        invalidatesTags: () => ["Notification"],
      },
      putApiAccountProfileEditEmailNotification: {
        invalidatesTags: () => ["Notification"],
      },
      putApiCdnDnsRecordChangeProxyStatusById: {
        invalidatesTags: () => ["EditRecordDialog", "ProxyStatus"],
      },
      deleteApiCdnDnsRecordDeleteById: {
        invalidatesTags: () => ["DNSRecordSetting"],
      },
      putApiCdnDnsRecordEdit: {
        invalidatesTags: () => ["DNSRecordSetting", "EditRecordDialog"],
      },
      postApiCdnDnsRecordCreate: {
        invalidatesTags: () => ["DNSRecordSetting"],
      },
      putApiCdnHostChangeCdnType: {
        invalidatesTags: () => ["ZoneData"],
      },
      putApiCdnHostChangeHsts: {
        invalidatesTags: () => ["ZoneData"],
      },
      putApiCdnHostChangeHttpsRedirect: {
        invalidatesTags: () => ["ZoneData"],
      },
      putApiCdnHostChangeNonWwwRedirect: {
        invalidatesTags: () => ["ZoneData"],
      },
      putApiCdnHostChangeEdgeCertType: {
        invalidatesTags: () => ["ZoneData"],
      },
      putApiCdnHostChangeClientCertType: {
        invalidatesTags: () => ["ZoneData"],
      },
      deleteApiCdnLoadBalanceDeleteById: {
        invalidatesTags: () => ["LoadBalance"],
      },
      postApiCdnLoadBalanceCreate: {
        invalidatesTags: () => ["LoadBalance"],
      },
      putApiCdnLoadBalanceEdit: {
        invalidatesTags: () => ["LoadBalance"],
      },
      getApiCdnEdgeCertGetByZoneName: {
        providesTags: () => ["SslSetting"],
      },
      getApiCdnEdgeCertGetUserCertByZoneName: {
        providesTags: () => ["SslSetting"],
      },
      getApiCdnClientCertGetByZoneName: {
        providesTags: () => ["SslSetting"],
      },
      postApiCdnEdgeCertCreate: {
        invalidatesTags: () => ["SslSetting"],
      },
      postApiCdnEdgeCertCreateUserCert: {
        invalidatesTags: () => ["SslSetting"],
      },
      postApiCloudSupportItemCreate: {
        invalidatesTags: () => ["SupportItems"],
      },
      getApiVmHostList: {
        providesTags: () => ["VmHosts"],
      },
      postApiVmHostCreate: {
        invalidatesTags: () => ["VmHosts"],
      },
      deleteApiVmHostDeleteById: {
        invalidatesTags: () => ["VmHosts"],
      },
      putApiVmHostEdit: {
        invalidatesTags: () => ["VmHosts"],
      },
      getApiVmHostGetById: {
        providesTags: () => ["VmHost"],
      },
      putApiVmHostConnectById: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiVmHostDisconnectById: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiVmHostShutdownById: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiVmHostStartById: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiVmHostStopById: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiVmHostRebootById: {
        invalidatesTags: () => ["VmHost"],
      },
    },
  });

export const {
  useCustomCreateSupportMutation,
  useLazyGetApiAccountProfileGetNotificationStatusQuery,
  useLazyGetApiDatacenterIpListByProductCategoryIdAndIdQuery,
  useLazyGetApiVmImageListByDatacenterIdQuery,
  useLazyGetApiVmHostGetByIdQuery,
  useLazyGetApiCdnLoadBalanceGetByIdQuery,
  useLazyGetApiCdnDnsRecordGetByIdQuery,
  useLazyGetApiCloudInvoiceGetByIdQuery,
  useLazyGetApiCloudSupportItemDownloadByIdQuery,
  useLazyGetApiCloudPaymentGetByIdQuery,
  useLazyGetApiCloudBillDownloadByIdQuery,
  useLazyGetApiCloudHostProductListByProductCategoryIdQuery,
  useLazyGetApiWebGetLoginSessionByIdQuery,
  useLazyGetApiPlatformNamespaceGetLoginByIdQuery,
  useLazyGetApiRabbitUserListByRabbitHostIdQuery,
  useLazyGetApiDomainGetByIdQuery,
} = api;
