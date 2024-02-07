import {
  api as generatedApi,
  PostApiMyPortalIssueItemCreateApiResponse,
  PostApiMyPortalIssueCreateApiArg,
} from "./api.generated";
import { AxiosRequestConfig } from "axios";

const tags = [
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
  "VmHost",
  "Kubernetes",
  "NotificationStatus",
];

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
    addTagTypes: tags,
    endpoints: {
      // ============================== Login ============================== //
      postApiMyAccountLogin: {
        invalidatesTags: () => tags,
      },
      postApiMyAccountTwoFactorLogin: {
        invalidatesTags: () => tags,
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
      // ============================== VmHost ============================== //
      getApiMyVmHostListByVmProjectId: {
        providesTags: () => ["VmHost"],
      },
      getApiMyVmProjectList: {
        providesTags: () => ["VmHost"],
      },
      getApiMyVmKmsGetByIdAndTypeId: {
        providesTags: () => ["VmHost"],
      },
      postApiMyVmProjectCreate: {
        invalidatesTags: () => ["VmHost"],
      },
      deleteApiMyVmProjectDeleteById: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiMyVmProjectEdit: {
        invalidatesTags: () => ["VmHost"],
      },
      postApiMyVmHostCreate: {
        invalidatesTags: () => ["VmHost"],
      },
      deleteApiMyVmHostDeleteById: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiMyVmHostEdit: {
        invalidatesTags: () => ["VmHost"],
      },
      deleteApiMyVmSnapshotDeleteById: {
        invalidatesTags: () => ["VmHost"],
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
  useLazyGetApiMyDatacenterIpListByIdQuery,
  useLazyGetApiMyVmImageListByDatacenterIdQuery,
  useLazyGetApiMyVmHostGetByIdQuery,
  useLazyGetApiMyCdnLoadBalanceGetByIdQuery,
  useLazyGetApiMyCdnDnsRecordGetByIdQuery,
  useLazyGetApiMyPortalPaymentGetByIdQuery,
  useLazyGetApiMyPortalCustomerProductListByProductIdQuery,
  useLazyGetApiMyWebHostGetLoginSessionByIdQuery,
  useLazyGetApiMyRabbitUserListByRabbitHostIdQuery,
  useLazyGetApiMyVmKmsGetByIdAndTypeIdQuery,
} = api;
