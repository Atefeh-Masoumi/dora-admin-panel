import {
  api as generatedApi,
  PostPortalPanelSupportCreateApiArg,
  PostPortalPanelSupportItemCreateApiResponse,
  PostPortalPanelProfileGetNotificationStatusApiResponse,
  PostPortalPanelProfileGetNotificationStatusApiArg,
} from "./api.generated";
import { AxiosRequestConfig } from "axios";

export const api = generatedApi
  .injectEndpoints({
    endpoints: (build) => ({
      getPortalPanelProfileGetNotificationStatus: build.query<
        PostPortalPanelProfileGetNotificationStatusApiResponse,
        PostPortalPanelProfileGetNotificationStatusApiArg
      >({
        query: () => ({
          url: `/portal/panel/profile/get-notification-status`,
          method: "POST",
        }),
      }),
      customCreateSupport: build.mutation<
        PostPortalPanelSupportItemCreateApiResponse,
        PostPortalPanelSupportCreateApiArg & {
          abortController?: AbortController;
          onUploadProgress: AxiosRequestConfig["onUploadProgress"];
        }
      >({
        query: ({ body, abortController, onUploadProgress }) => ({
          url: `/portal/panel/support/create`,
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
      getPortalPanelProfileGet: {
        providesTags: () => ["Profile"],
      },
      getPortalPanelProfileGetNotificationStatus: {
        providesTags: () => ["Notification"],
      },
      getPortalCdnDnsRecordGetById: {
        providesTags: () => ["EditRecordDialog"],
      },
      getPortalCdnDnsRecordListByZoneName: {
        providesTags: () => ["ProxyStatus", "DNSRecordSetting"],
      },
      getPortalCdnCdnGetByZoneName: {
        providesTags: () => ["ZoneData"],
      },
      getPortalPanelSupportItemListBySupportId: {
        providesTags: () => ["SupportItems"],
      },
      getPortalCdnLoadBalanceListByZoneName: {
        providesTags: () => ["LoadBalance"],
      },
      getPortalPanelOrderList: {
        providesTags: () => ["Orders"],
      },
      getPortalPanelOrderGetById: {
        providesTags: () => ["Order"],
      },
      putPortalPanelOrderPaymentType: {
        invalidatesTags: () => ["Order"],
      },
      putPortalPanelOrderDuration: {
        invalidatesTags: () => ["Order"],
      },
      putPortalPanelCustomerEditCustomerType: {
        invalidatesTags: () => ["Profile"],
      },
      getPortalPanelCustomerGet: {
        providesTags: () => ["Profile"],
      },
      postPortalPanelProfileConfirmPhoneNumber: {
        invalidatesTags: () => ["Profile"],
      },
      putPortalPanelProfileEditPhoneNotification: {
        invalidatesTags: () => ["Notification"],
      },
      putPortalPanelProfileEditEmailNotification: {
        invalidatesTags: () => ["Notification"],
      },
      putPortalCdnDnsRecordChangeProxyStatusById: {
        invalidatesTags: () => ["EditRecordDialog", "ProxyStatus"],
      },
      deletePortalCdnDnsRecordDeleteById: {
        invalidatesTags: () => ["DNSRecordSetting"],
      },
      putPortalCdnDnsRecordEdit: {
        invalidatesTags: () => ["DNSRecordSetting", "EditRecordDialog"],
      },
      postPortalCdnDnsRecordCreate: {
        invalidatesTags: () => ["DNSRecordSetting"],
      },
      putPortalCdnCdnChangeCdnType: {
        invalidatesTags: () => ["ZoneData"],
      },
      putPortalCdnCdnChangeHsts: {
        invalidatesTags: () => ["ZoneData"],
      },
      putPortalCdnCdnChangeHttpsRedirect: {
        invalidatesTags: () => ["ZoneData"],
      },
      putPortalCdnCdnChangeNonWwwRedirect: {
        invalidatesTags: () => ["ZoneData"],
      },
      putPortalCdnCdnChangeEdgeCertType: {
        invalidatesTags: () => ["ZoneData"],
      },
      putPortalCdnCdnChangeClientCertType: {
        invalidatesTags: () => ["ZoneData"],
      },
      deletePortalCdnLoadBalanceDeleteById: {
        invalidatesTags: () => ["LoadBalance"],
      },
      postPortalCdnLoadBalanceCreate: {
        invalidatesTags: () => ["LoadBalance"],
      },
      putPortalCdnLoadBalanceEdit: {
        invalidatesTags: () => ["LoadBalance"],
      },
      getPortalCdnEdgeCertGetByZoneName: {
        providesTags: () => ["SslSetting"],
      },
      getPortalCdnEdgeCertGetUserCertByZoneName: {
        providesTags: () => ["SslSetting"],
      },
      getPortalCdnClientCertGetByZoneName: {
        providesTags: () => ["SslSetting"],
      },
      postPortalCdnEdgeCertCreate: {
        invalidatesTags: () => ["SslSetting"],
      },
      postPortalCdnEdgeCertCreateUserCert: {
        invalidatesTags: () => ["SslSetting"],
      },
      postPortalPanelSupportItemCreate: {
        invalidatesTags: () => ["SupportItems"],
      },
      getPortalVmVmList: {
        providesTags: () => ["VmHosts"],
      },
      postPortalVmVmCreate: {
        invalidatesTags: () => ["VmHosts"],
      },
      deletePortalVmVmDeleteById: {
        invalidatesTags: () => ["VmHosts"],
      },
      putPortalVmVmEdit: {
        invalidatesTags: () => ["VmHosts"],
      },
      getPortalVmVmGetById: {
        providesTags: () => ["VmHost"],
      },
      putPortalVmVmConnectById: {
        invalidatesTags: () => ["VmHost"],
      },
      putPortalVmVmDisconnectById: {
        invalidatesTags: () => ["VmHost"],
      },
      putPortalVmVmShutdownById: {
        invalidatesTags: () => ["VmHost"],
      },
      putPortalVmVmStartById: {
        invalidatesTags: () => ["VmHost"],
      },
      putPortalVmVmStopById: {
        invalidatesTags: () => ["VmHost"],
      },
      putPortalVmVmRebootById: {
        invalidatesTags: () => ["VmHost"],
      },
    },
  });

export const {
  useCustomCreateSupportMutation,
  useGetPortalPanelProfileGetNotificationStatusQuery,
  useLazyGetPortalVmVmIpListByVmIdQuery,
  useLazyGetPortalVmImageListByDatacenterIdQuery,
  useLazyGetPortalVmVmGetByIdQuery,
  useLazyGetPortalCdnLoadBalanceGetByIdQuery,
  useLazyGetPortalCdnDnsRecordGetByIdQuery,
  useLazyGetPortalPanelInvoiceGetByIdQuery,
  useLazyGetPortalPanelSupportItemDownloadByIdQuery,
  useLazyGetPortalPanelWalletPaymentGetByIdQuery,
  useLazyGetPortalPanelBillDownloadByIdQuery,
  useLazyGetPortalWebWebHostGetLoginSessionByIdQuery,
  useLazyGetPortalRabbitRabbitUserListByRabbitHostIdQuery,
  useLazyGetPortalKubeWorkspaceGetLoginSessionByIdQuery,
  useLazyGetPortalPanelHostProductListByProductCategoryIdQuery,
} = api;
