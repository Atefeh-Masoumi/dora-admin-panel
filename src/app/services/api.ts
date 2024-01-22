import {
  api as generatedApi,
  PostApiMyPortalIssueItemCreateApiResponse,
  PostApiMyPortalIssueCreateApiArg,
} from "./api.generated";
import { AxiosRequestConfig } from "axios";

export const api = generatedApi
  .injectEndpoints({
    endpoints: (build) => ({
      customCreateIssue: build.mutation<
        PostApiMyPortalIssueItemCreateApiResponse,
        PostApiMyPortalIssueCreateApiArg & {
          abortController?: AbortController;
          onUploadProgress: AxiosRequestConfig["onUploadProgress"];
        }
      >({
        query: ({ body, abortController, onUploadProgress }) => ({
          url: `/api/my/portal/issue/create`,
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
      "Support",
      "VmHosts",
      "VmHost",
      "Kubernetes",
      "NotificationStatus",
    ],
    endpoints: {
      // ============================== Login ============================== //
      postApiMyAccountLogin: {
        invalidatesTags: () => [
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
          "Support",
          "VmHosts",
          "VmHost",
          "Kubernetes",
          "NotificationStatus",
        ],
      },
      postApiMyAccountTwoFactorLogin: {
        invalidatesTags: () => [
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
          "Support",
          "VmHosts",
          "VmHost",
          "Kubernetes",
          "NotificationStatus",
        ],
      },
      // ============================== Kubernetes ============================== //
      getApiMyKubernetesHostList: {
        providesTags: () => ["Kubernetes"],
      },
      getApiMyKubernetesNodeListByKubernetesHostId: {
        providesTags: () => ["Kubernetes"],
      },
      getApiMyKubernetesHostGetById: {
        providesTags: () => ["Kubernetes"],
      },
      putApiMyKubernetesNodeDeleteByKubernetesHostNodeId: {
        invalidatesTags: () => ["Kubernetes"],
      },
      postApiMyKubernetesNodeCreate: {
        invalidatesTags: () => ["Kubernetes"],
      },
      postApiMyKubernetesHostCreate: {
        invalidatesTags: () => ["Kubernetes"],
      },
      deleteApiMyKubernetesHostDeleteById: {
        invalidatesTags: () => ["Kubernetes"],
      },
      // ============================== NotificationStatus ============================== //
      getApiMyPortalProfileGetNotificationStatus: {
        providesTags: () => ["NotificationStatus"],
      },
      putApiMyPortalProfileEditPhoneNotification: {
        invalidatesTags: () => ["NotificationStatus"],
      },
      putApiMyPortalProfileEditEmailNotification: {
        invalidatesTags: () => ["NotificationStatus"],
      },
      // ============================== Notification ============================== //
      getApiMyPortalNotificationShortList: {
        providesTags: () => ["Notification"],
      },
      getApiMyPortalNotificationList: {
        providesTags: () => ["Notification"],
      },
      putApiMyPortalNotificationSeenById: {
        invalidatesTags: () => ["Notification"],
      },
      // ============================== Profile ============================== //
      getApiMyPortalProfileGet: {
        providesTags: () => ["Profile"],
      },
      getApiMyPortalCustomerGet: {
        providesTags: () => ["Profile"],
      },
      postApiMyPortalProfileConfirmPhoneNumber: {
        invalidatesTags: () => ["Profile"],
      },
      putApiMyPortalProfileEditTwoFactor: {
        invalidatesTags: () => ["Profile"],
      },
      putApiMyPortalCustomerEditCustomerType: {
        invalidatesTags: () => ["Profile"],
      },
      putApiMyPortalProfileEdit: {
        invalidatesTags: () => ["Profile"],
      },
      putApiMyPortalProfileEditEmail: {
        invalidatesTags: () => ["Profile"],
      },
      putApiMyPortalProfileEditPhoneNumber: {
        invalidatesTags: () => ["Profile"],
      },
      postApiMyPortalProfileConfirmEmail: {
        invalidatesTags: () => ["Profile"],
      },
      postApiMyPortalProfileChangePassword: {
        invalidatesTags: () => ["Profile"],
      },
      // ============================== Support ============================== //
      getApiMyPortalIssueItemListByIssueId: {
        providesTags: () => ["Support"],
      },
      getApiMyPortalIssueList: {
        providesTags: () => ["Support"],
      },
      postApiMyPortalIssueCreate: {
        invalidatesTags: () => ["Support"],
      },
      postApiMyPortalIssueItemCreate: {
        invalidatesTags: () => ["Support"],
      },
      // ============================== EditRecordDialog ============================== //
      getApiMyCdnDnsRecordGetById: {
        providesTags: () => ["EditRecordDialog"],
      },
      putApiMyCdnDnsRecordChangeProxyStatusById: {
        invalidatesTags: () => ["EditRecordDialog", "ProxyStatus"],
      },
      // ============================== DNSRecordSetting ============================== //
      getApiMyCdnDnsRecordListByCdnId: {
        providesTags: () => ["DNSRecordSetting", "ProxyStatus"],
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
      // ============================== ZoneData ============================== //
      putApiMyCdnHostChangeCdnType: {
        invalidatesTags: () => ["ZoneData"],
      },
      getApiMyCdnHostGetById: {
        providesTags: () => ["ZoneData"],
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
      // ============================== LoadBalance ============================== //
      getApiMyCdnLoadBalanceListByCdnId: {
        providesTags: () => ["LoadBalance"],
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
      // ============================== SslSetting ============================== //
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
      // ============================== VmHosts ============================== //
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
      // ============================== VmHost ============================== //
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
  useCustomCreateIssueMutation,
  useLazyGetApiMyPortalProfileGetNotificationStatusQuery,
  useLazyGetApiMyDatacenterIpListByProductIdAndIdQuery,
  useLazyGetApiMyVmImageListByDatacenterIdQuery,
  useLazyGetApiMyVmHostGetByIdQuery,
  useLazyGetApiMyCdnLoadBalanceGetByIdQuery,
  useLazyGetApiMyCdnDnsRecordGetByIdQuery,
  useLazyGetApiMyPortalInvoiceGetByIdQuery,
  useLazyGetApiMyPortalIssueItemDownloadByIdQuery,
  useLazyGetApiMyPortalPaymentGetByIdQuery,
  useLazyGetApiMyPortalBillDownloadByIdQuery,
  useLazyGetApiMyPortalCustomerProductListByProductIdQuery,
  useLazyGetApiMyWebHostGetLoginSessionByIdQuery,
  useLazyGetApiMyKubesphereHostGetLoginByIdQuery,
  useLazyGetApiMyRabbitUserListByRabbitHostIdQuery,
  useLazyGetApiMyDomainHostGetByIdQuery,
} = api;
