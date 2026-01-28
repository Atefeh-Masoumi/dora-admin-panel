import {
  PostApiMyPortalIssueCreateApiResponse,
} from "./api.generated";
import { enhancedApi } from "./api.generated";

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
  "Ingress",
];

export const api = enhancedApi
  .injectEndpoints({
    endpoints: (build) => ({
      customCreateIssue: build.mutation<
        PostApiMyPortalIssueCreateApiResponse,
        FormData
      >({
        query: (formData) => ({
          url: `/api/my/portal/issue/create`,
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
     
      // ============================== VmHost ============================== //
      getApiMyVmByProjectIdHostList: {
        providesTags: () => ["VmHost"],
      },
      getApiMyVmByProjectIdHostShortList: {
        providesTags: () => ["VmHost"],
      },
      getApiMyVmByProjectIdHostGetAndId: {
        providesTags: () => ["VmHost"],
      },
      postApiMyVmByProjectIdHostCreate: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiMyVmByProjectIdHostEditAndId: {
        invalidatesTags: () => ["VmHost"],
      },
      deleteApiMyVmByProjectIdHostDeleteAndId: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiMyVmByProjectIdHostStartAndId: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiMyVmByProjectIdHostShutdownAndId: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiMyVmByProjectIdHostRebootAndId: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiMyVmByProjectIdHostResetAndId: {
        invalidatesTags: () => ["VmHost"],
      },
      putApiMyVmByProjectIdHostRebuildAndId: {
        invalidatesTags: () => ["VmHost"],
      },
      getApiMyAccountCustomerUserList: {
        providesTags: () => ["Accessibility"],
      },
      postApiMyAccountCustomerUserCreate: {
        invalidatesTags: () => ["Accessibility"],
      },
      postApiMyAccountCustomerUserChangeCustomer: {
        invalidatesTags: () => ["Accessibility"],
      },
    },
  });

export const {
  useCustomCreateIssueMutation,

  useLazyGetApiMyPortalProductItemListByProductIdQuery,
  useLazyGetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountQuery,
  useLazyGetApiMyVmByProjectIdHostConsoleAndIdQuery,
  
  useLazyGetApiMyFinancialOrderListByProductIdQuery,
  useLazyGetApiMyFinancialReferralListByReferralIdQuery,
} = api;
