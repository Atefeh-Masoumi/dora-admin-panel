import {
  api as generatedApi,
  PostApiMyPortalIssueItemCreateApiResponse,
  PostApiMyPortalIssueCreateApiArg,
} from "./api.generated";
import { AxiosRequestConfig } from "axios";

const tags = [
  "Profile",
  "NotificationStatus",
  "Notification",
  "DnsHost",
  "DNSRecordSetting",
  "EditRecordDialog",
  "ProxyStatus",
  "CdnHost",
  "CdnRoute",
  "CdnCert",
  "SupportItems",
  "Support",
  "VmHost",
  "Kubernetes",
  "Storage",
  "WebHost",
  "Vpc",
  "Network",
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
      // ============================== DnsHost ============================== //
      getApiMyDnsHostList: {
        providesTags: () => ["DnsHost"],
      },
      postApiMyDnsHostCreate: {
        invalidatesTags: () => ["DnsHost"],
      },
      getApiMyDnsHostGetById: {
        providesTags: () => ["DnsHost"],
      },
      deleteApiMyDnsHostDeleteById: {
        invalidatesTags: () => ["DnsHost"],
      },
      getApiMyDnsRecordListByDnsHostId: {
        providesTags: () => ["DNSRecordSetting", "ProxyStatus"],
      },
      getApiMyDnsRecordGetById: {
        providesTags: () => ["EditRecordDialog"],
      },
      postApiMyDnsRecordCreate: {
        invalidatesTags: () => ["DNSRecordSetting"],
      },
      putApiMyDnsRecordEdit: {
        invalidatesTags: () => ["DNSRecordSetting", "EditRecordDialog"],
      },
      putApiMyDnsRecordChangeProxyStatusById: {
        invalidatesTags: () => ["EditRecordDialog", "ProxyStatus", "CdnRoute"],
      },
      deleteApiMyDnsRecordDeleteById: {
        invalidatesTags: () => ["DNSRecordSetting"],
      },
      // ============================== CdnHost ============================== //
      getApiMyCdnHostGetByDnsHostId: {
        providesTags: () => ["CdnHost"],
      },
      putApiMyCdnHostChangeCdnType: {
        invalidatesTags: () => ["CdnHost"],
      },
      putApiMyCdnHostChangeHsts: {
        invalidatesTags: () => ["CdnHost"],
      },
      putApiMyCdnHostChangeHttpsRedirect: {
        invalidatesTags: () => ["CdnHost"],
      },
      putApiMyCdnHostChangeNonWwwRedirect: {
        invalidatesTags: () => ["CdnHost"],
      },
      putApiMyCdnHostChangeEdgeCertType: {
        invalidatesTags: () => ["CdnHost"],
      },
      putApiMyCdnHostChangeClientCertType: {
        invalidatesTags: () => ["CdnHost"],
      },
      // ============================== CdnRoute ============================== //
      getApiMyCdnRouteListByDnsHostId: {
        providesTags: () => ["CdnRoute"],
      },
      deleteApiMyCdnRouteDeleteById: {
        invalidatesTags: () => ["CdnRoute", "ProxyStatus"],
      },
      putApiMyCdnRouteEdit: {
        invalidatesTags: () => ["CdnRoute"],
      },
      // ============================== CdnCert ============================== //
      getApiMyCdnEdgeCertGetByDnsHostId: {
        providesTags: () => ["CdnCert"],
      },
      getApiMyCdnEdgeCertGetUserCertByDnsHostId: {
        providesTags: () => ["CdnCert"],
      },
      postApiMyCdnEdgeCertCreate: {
        invalidatesTags: () => ["CdnCert"],
      },
      postApiMyCdnEdgeCertCreateUserCert: {
        invalidatesTags: () => ["CdnCert"],
      },
      getApiMyCdnOriginCertGetByDnsHostId: {
        providesTags: () => ["CdnCert"],
      },
      // ============================== VmHost ============================== //
      getApiMyVmProjectList: {
        providesTags: () => ["VmHost"],
      },
      getApiMyVmHostListByVmProjectId: {
        providesTags: () => ["VmHost"],
      },
      getApiMyVmKmsGetByIdAndTypeId: {
        providesTags: () => ["VmHost"],
      },
      getApiMyVmHostGetById: {
        providesTags: () => ["VmHost"],
      },
      getApiMyVmSnapshotListByVmId: {
        providesTags: () => ["VmHost"],
      },
      getApiMyVmSnapshotGetById: {
        providesTags: () => ["VmHost"],
      },
      putApiMyVmSnapshotRevert: {
        invalidatesTags: () => ["VmHost"],
      },
      postApiMyVmSnapshotCreate: {
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
      postApiMyVmProjectCreate: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiMyVmProjectEditById: {
        invalidatesTags: () => ["VmHost"],
      },
      deleteApiMyVmProjectDeleteById: {
        invalidatesTags: () => ["VmHost"],
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
      putApiMyKubernetesNodeDeleteById: {
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
      // ============================== Storage ============================== //
      getApiMyStorageHostList: {
        providesTags: () => ["Storage"],
      },
      getApiMyStorageHostGetById: {
        providesTags: () => ["Storage"],
      },
      getApiMyStorageUserListByStorageHostId: {
        providesTags: () => ["Storage"],
      },
      postApiMyStorageHostCreate: {
        invalidatesTags: () => ["Storage"],
      },
      putApiMyStorageHostEdit: {
        invalidatesTags: () => ["Storage"],
      },
      deleteApiMyStorageHostDeleteById: {
        invalidatesTags: () => ["Storage"],
      },
      deleteApiMyStorageUserDeleteById: {
        invalidatesTags: () => ["Storage"],
      },
      // ============================== Storage ============================== //
      getApiMyWebHostList: {
        providesTags: () => ["WebHost"],
      },
      getApiMyWebHostGetById: {
        providesTags: () => ["WebHost"],
      },
      postApiMyWebHostCreate: {
        invalidatesTags: () => ["WebHost"],
      },
      putApiMyWebHostEdit: {
        invalidatesTags: () => ["WebHost"],
      },
      deleteApiMyWebHostDeleteById: {
        invalidatesTags: () => ["WebHost"],
      },
      // ============================== VPC ============================== //
      getApiMyVpcHostList: {
        providesTags: () => ["Vpc"],
      },
      postApiMyVpcHostCreate: {
        invalidatesTags: () => ["Vpc"],
      },
      putApiMyVpcHostEditById: {
        invalidatesTags: () => ["Vpc"],
      },
      deleteApiMyVpcHostDeleteById: {
        invalidatesTags: () => ["Vpc"],
      },
      // ============================== VPC Network ============================== //
      getApiMyVpcNetworkListByVpcHostId: {
        providesTags: () => ["Network"],
      },
      postApiMyVpcNetworkCreate: {
        invalidatesTags: () => ["Network"],
      },
      deleteApiMyVpcNetworkDeleteById: {
        invalidatesTags: () => ["Network"],
      },
    },
  });

export const {
  useCustomCreateIssueMutation,
  useLazyGetApiMyDatacenterIpListByIdQuery,
  // useLazyGetApiMyVmImageListByDatacenterIdQuery,
  useLazyGetApiMyVmImageListQuery,
  useLazyGetApiMyVmHostGetByIdQuery,
  useLazyGetApiMyCdnRouteGetByIdQuery,
  useLazyGetApiMyDnsRecordGetByIdQuery,
  useLazyGetApiMyPortalPaymentGetByIdQuery,
  useLazyGetApiMyPortalCustomerProductListByProductIdQuery,
  useLazyGetApiMyWebHostGetLoginSessionByIdQuery,
  useLazyGetApiMyVmKmsGetByIdAndTypeIdQuery,
  useLazyGetApiMyPortalProductItemListByProductIdQuery,
  useLazyGetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountQuery,
  useLazyGetApiMyPortalReferralCustomerByReferralIdListQuery,
} = api;
