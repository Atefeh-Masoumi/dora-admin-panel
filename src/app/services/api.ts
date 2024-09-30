import {
  api as generatedApi,
  PostApiMyPortalIssueCreateApiArg,
  PostApiMyPortalIssueItemCreateApiResponse,
} from "./api.generated";

const tags = [
  "Profile",
  "NotificationStatus",
  "Notification",
  "DnsCdnHost",
  "DNSRecordSetting",
  "EditRecordDialog",
  "ProxyStatus",
  "CdnHost",
  "CdnRoute",
  "CdnCert",
  "SupportItems",
  "Support",
  "VmHost",
  "KubernetesCluster",
  "Storage",
  "WebHost",
  "Vpc",
  "Network",
  "LoadBalance",
  "PublicIP",
  "Issue",
  "VpcNat",
  "Accessibility",
  "ConfigMap",
  "SecretMap",
  "NameSpace",
  "Deployment",
];

export const api = generatedApi
  .injectEndpoints({
    endpoints: (build) => ({
      customCreateIssue: build.mutation<
        PostApiMyPortalIssueItemCreateApiResponse,
        PostApiMyPortalIssueCreateApiArg & {
          abortController?: AbortController;
        }
      >({
        query: ({ body, abortController }) => ({
          url: `/api/my/portal/issue/create`,
          method: "POST",
          body,
          abortController,
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
      getApiMyAccountProfileGetNotificationStatus: {
        providesTags: () => ["NotificationStatus"],
      },
      putApiMyAccountProfileEditPhoneNotification: {
        invalidatesTags: () => ["NotificationStatus"],
      },
      putApiMyAccountProfileEditEmailNotification: {
        invalidatesTags: () => ["NotificationStatus"],
      },
      // ============================== Notification ============================== //
      getApiMyAccountNotificationShortList: {
        providesTags: () => ["Notification"],
      },
      getApiMyAccountNotificationList: {
        providesTags: () => ["Notification"],
      },
      putApiMyAccountNotificationSeenById: {
        invalidatesTags: () => ["Notification"],
      },
      // ============================== Profile ============================== //
      getApiMyAccountProfileGet: {
        providesTags: () => ["Profile"],
      },
      getApiMyAccountCustomerGet: {
        providesTags: () => ["Profile"],
      },
      postApiMyAccountProfileConfirmPhoneNumber: {
        invalidatesTags: () => ["Profile"],
      },
      putApiMyAccountProfileEditTwoFactor: {
        invalidatesTags: () => ["Profile"],
      },
      putApiMyAccountProfileEdit: {
        invalidatesTags: () => ["Profile"],
      },
      putApiMyAccountProfileEditEmail: {
        invalidatesTags: () => ["Profile"],
      },
      putApiMyAccountProfileEditPhoneNumber: {
        invalidatesTags: () => ["Profile"],
      },
      postApiMyAccountProfileConfirmEmail: {
        invalidatesTags: () => ["Profile"],
      },
      postApiMyAccountProfileChangePassword: {
        invalidatesTags: () => ["Profile"],
      },
      // ============================== Support ============================== //
      getApiMyPortalIssueItemListByIssueId: {
        providesTags: () => ["Support"],
      },
      getApiMyPortalIssueList: {
        providesTags: () => ["Support"],
      },
      customCreateIssue: {
        invalidatesTags: () => ["Support"],
      },
      postApiMyPortalIssueCreate: {
        invalidatesTags: () => ["Support"],
      },
      postApiMyPortalIssueItemCreate: {
        invalidatesTags: () => ["Support"],
      },
      // ============================== DnsCdnHost ============================== //
      getApiMyDnsCdnHostList: {
        providesTags: () => ["DnsCdnHost"],
      },
      getApiMyDnsCdnHostGetCdnById: {
        providesTags: () => ["DnsCdnHost"],
      },
      postApiMyDnsCdnHostCreate: {
        invalidatesTags: () => ["DnsCdnHost"],
      },
      getApiMyDnsCdnHostGetById: {
        providesTags: () => ["DnsCdnHost"],
      },
      deleteApiMyDnsCdnHostDeleteById: {
        invalidatesTags: () => ["DnsCdnHost"],
      },
      getApiMyDnsCdnDnsRecordListByDnsCdnHostId: {
        providesTags: () => ["DNSRecordSetting", "ProxyStatus"],
      },
      getApiMyDnsCdnDnsRecordGetById: {
        providesTags: () => ["EditRecordDialog"],
      },
      postApiMyDnsCdnDnsRecordCreate: {
        invalidatesTags: () => ["DNSRecordSetting", "CdnRoute"],
      },
      putApiMyDnsCdnDnsRecordEditById: {
        invalidatesTags: () => ["DNSRecordSetting", "EditRecordDialog"],
      },
      putApiMyDnsCdnDnsRecordChangeProxyById: {
        invalidatesTags: () => ["EditRecordDialog", "ProxyStatus", "CdnRoute"],
      },
      deleteApiMyDnsCdnDnsRecordDeleteById: {
        invalidatesTags: () => ["DNSRecordSetting"],
      },
      // ============================== CdnHost ============================== //
      putApiMyDnsCdnHostChangeCdnType: {
        invalidatesTags: () => ["DnsCdnHost"],
      },
      putApiMyDnsCdnHostChangeHsts: {
        invalidatesTags: () => ["DnsCdnHost"],
      },
      putApiMyDnsCdnHostChangeHttpsRedirect: {
        invalidatesTags: () => ["DnsCdnHost"],
      },
      putApiMyDnsCdnHostChangeNonWwwRedirect: {
        invalidatesTags: () => ["DnsCdnHost"],
      },
      putApiMyDnsCdnHostChangeEdgeCertType: {
        invalidatesTags: () => ["DnsCdnHost"],
      },
      putApiMyDnsCdnHostChangeOriginCertType: {
        invalidatesTags: () => ["DnsCdnHost"],
      },
      // ============================== CdnRoute ============================== //
      getApiMyDnsCdnRouteListByDnsCdnHostId: {
        providesTags: () => ["CdnRoute"],
      },
      deleteApiMyDnsCdnRouteDeleteById: {
        invalidatesTags: () => ["CdnRoute", "ProxyStatus"],
      },
      putApiMyDnsCdnRouteEditById: {
        invalidatesTags: () => ["CdnRoute"],
      },
      // ============================== CdnCert ============================== //
      getApiMyDnsCdnEdgeCertGetByDnsCdnHostId: {
        providesTags: () => ["CdnCert"],
      },
      getApiMyDnsCdnEdgeCertGetUserCertByDnsCdnHostId: {
        providesTags: () => ["CdnCert"],
      },
      postApiMyDnsCdnEdgeCertCreate: {
        invalidatesTags: () => ["CdnCert"],
      },
      postApiMyDnsCdnEdgeCertCreateUserCert: {
        invalidatesTags: () => ["CdnCert"],
      },
      getApiMyDnsCdnOriginCertGetByDnsCdnHostId: {
        providesTags: () => ["CdnCert"],
      },
      // ============================== VmHost ============================== //
      getApiMyHostProjectList: {
        providesTags: () => ["VmHost"],
      },
      getApiMyVmHostListByVmProjectId: {
        providesTags: () => ["VmHost"],
      },
      // getApiMyVmKmsGetByIdAndTypeId: {
      //   providesTags: () => ["VmHost"],
      // },
      getApiMyVmHostGetById: {
        providesTags: () => ["VmHost"],
      },
      getApiMyVmSnapshotListByVmHostId: {
        providesTags: () => ["VmHost"],
      },
      getApiMyVmSnapshotGetById: {
        providesTags: () => ["VmHost"],
      },
      putApiMyVmSnapshotRevertById: {
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
      putApiMyVmHostEditById: {
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
      postApiMyHostProjectCreate: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiMyHostProjectEditById: {
        invalidatesTags: () => ["VmHost"],
      },
      deleteApiMyHostProjectDeleteById: {
        invalidatesTags: () => ["VmHost"],
      },
      // ============================== KubernetesCluster ============================== //
      getApiMyKubernetesClusterHostList: {
        providesTags: () => ["KubernetesCluster"],
      },
      getApiMyKubernetesClusterNodeByKubernetesHostId: {
        providesTags: () => ["KubernetesCluster"],
      },
      getApiMyKubernetesClusterHostGetById: {
        providesTags: () => ["KubernetesCluster"],
      },
      deleteApiMyKubernetesClusterNodeDeleteById: {
        invalidatesTags: () => ["KubernetesCluster"],
      },
      postApiMyKubernetesClusterNodeCreate: {
        invalidatesTags: () => ["KubernetesCluster"],
      },
      postApiMyKubernetesClusterHostCreate: {
        invalidatesTags: () => ["KubernetesCluster"],
      },
      deleteApiMyKubernetesClusterHostDeleteById: {
        invalidatesTags: () => ["KubernetesCluster"],
      },
      // ============================== Storage ============================== //
      getApiMyObjectStorageHostList: {
        providesTags: () => ["Storage"],
      },
      getApiMyObjectStorageHostGetById: {
        providesTags: () => ["Storage"],
      },
      getApiMyObjectStorageStorageUserListByStorageHostId: {
        providesTags: () => ["Storage"],
      },
      postApiMyObjectStorageHostCreate: {
        invalidatesTags: () => ["Storage"],
      },
      putApiMyObjectStorageHostEditById: {
        invalidatesTags: () => ["Storage"],
      },
      deleteApiMyObjectStorageHostDeleteById: {
        invalidatesTags: () => ["Storage"],
      },
      deleteApiMyObjectStorageStorageUserDeleteById: {
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
      putApiMyWebHostEditById: {
        invalidatesTags: () => ["WebHost"],
      },
      deleteApiMyWebHostDeleteById: {
        invalidatesTags: () => ["WebHost"],
      },
      // ============================== VPC ============================== //

      getApiMyVpcTranslateList: {
        providesTags: () => ["Vpc", "VpcNat"],
      },
      getApiMyVpcHostList: {
        providesTags: () => ["Vpc"],
      },
      getApiMyVpcNatGetById: {
        providesTags: () => ["Vpc"],
      },
      getApiMyVpcNatListByVpcHostId: {
        providesTags: () => ["Vpc"],
      },

      getApiMyVpcNetworkShortListByVpcHostId: {
        providesTags: () => ["Vpc"],
      },
      postApiMyVpcHostCreate: {
        invalidatesTags: () => ["Vpc"],
      },
      postApiMyVpcTranslateCreate: {
        invalidatesTags: () => ["Vpc", "VpcNat"],
      },
      deleteApiMyVpcTranslateDeleteById: {
        invalidatesTags: () => ["Vpc", "VpcNat"],
      },
      deleteApiMyVpcHostDeleteById: {
        invalidatesTags: () => ["Vpc"],
      },
      putApiMyVpcHostEditById: {
        invalidatesTags: () => ["Vpc"],
      },
      postApiMyVpcNatCreateDnat: {
        invalidatesTags: () => ["Vpc"],
      },
      postApiMyVpcNatCreateSnat: {
        invalidatesTags: () => ["Vpc"],
      },
      deleteApiMyVpcNatDeleteById: {
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
      // ============================== VPC LoadBalance ============================== //
      getApiMyVpcLoadBalanceListByVpcHostId: {
        providesTags: () => ["LoadBalance"],
      },
      postApiMyVpcLoadBalanceCreate: {
        invalidatesTags: () => ["LoadBalance"],
      },
      deleteApiMyVpcLoadBalanceDeleteById: {
        invalidatesTags: () => ["LoadBalance"],
      },
      // ============================== VPC Public IP ============================== //
      getApiMyVpcIpListByVpcHostId: {
        providesTags: () => ["PublicIP"],
      },
      postApiMyVpcIpCreate: {
        invalidatesTags: () => ["PublicIP"],
      },
      deleteApiMyVpcIpDeleteById: {
        invalidatesTags: () => ["PublicIP"],
      },
      // ============================== Accessibility ============================== //
      getApiMyAccountCustomerUserList: {
        providesTags: () => ["Accessibility"],
      },
      postApiMyAccountCustomerUserCreate: {
        invalidatesTags: () => ["Accessibility"],
      },
      deleteApiMyAccountCustomerUserDeleteByUserId: {
        invalidatesTags: () => ["Accessibility"],
      },
      postApiMyAccountCustomerUserChangeCustomer: {
        invalidatesTags: () => ["Accessibility"],
      },
      putApiMyAccountRoleAccessEdit: {
        invalidatesTags: () => ["Accessibility"],
      },
      // ============================== Kubernetes Cloud ConfigMap ============================== //
      getApiMyKubernetesCloudConfigmapListByNamespaceId: {
        providesTags: () => ["ConfigMap"],
      },
      postApiMyKubernetesCloudConfigmapCreate: {
        invalidatesTags: () => ["ConfigMap"],
      },
      deleteApiMyKubernetesCloudConfigmapDeleteById: {
        invalidatesTags: () => ["ConfigMap"],
      },
      putApiMyKubernetesCloudConfigmapEdit: {
        invalidatesTags: () => ["ConfigMap"],
      },
      // ============================== Kubernetes Cloud SecretMap ============================== //
      getApiMyKubernetesCloudSecretListByNamespaceId: {
        providesTags: () => ["SecretMap"],
      },
      postApiMyKubernetesCloudSecretCreate: {
        invalidatesTags: () => ["SecretMap"],
      },
      deleteApiMyKubernetesCloudSecretDeleteById: {
        invalidatesTags: () => ["SecretMap"],
      },
      putApiMyKubernetesCloudSecretEdit: {
        invalidatesTags: () => ["SecretMap"],
      },
      // ============================== Kubernetes Cloud Namespace ============================== //
      getApiMyKubernetesCloudHostList: {
        providesTags: () => ["Namespace"],
      },
      postApiMyKubernetesCloudHostCreate: {
        invalidatesTags: () => ["Namespace"],
      },
      putApiMyKubernetesCloudHostEditById: {
        invalidatesTags: () => ["Namespace"],
      },
      deleteApiMyKubernetesCloudHostDeleteById: {
        invalidatesTags: () => ["Namespace"],
      },
      // ============================== Kubernetes Cloud Deployment ============================== //
      getApiMyKubernetesCloudDeploymentListByNamespaceId: {
        providesTags: () => ["Deployment", "NameSpace"],
      },
      deleteApiMyKubernetesCloudDeploymentDeleteById: {
        invalidatesTags: () => ["Deployment", "NameSpace"],
      },
      postApiMyKubernetesCloudDeploymentCreate: {
        invalidatesTags: () => ["Deployment", "NameSpace"],
      },
    },
  });

export const {
  useCustomCreateIssueMutation,
  useLazyGetApiMyDatacenterIpListByIdQuery,
  useLazyGetApiMyVmHostGetByIdQuery,
  useLazyGetApiMyDnsCdnRouteGetByIdQuery,
  useLazyGetApiMyDnsCdnDnsRecordGetByIdQuery,
  useLazyGetApiMyPortalPaymentGetByIdQuery,
  useLazyGetApiMyPortalCustomerProductListByProductIdQuery,
  useLazyGetApiMyWebHostGetLoginSessionByIdQuery,
  useLazyGetApiMyVmKmsGetByIdQuery,
  useLazyGetApiMyPortalProductItemListByProductIdQuery,
  useLazyGetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountQuery,
  useLazyGetApiMyPortalReferralListByReferralIdQuery,
  useLazyGetApiMyDatacenterImageListQuery,
  useLazyGetApiMyKubernetesCloudHostGetByIdQuery,
} = api;
