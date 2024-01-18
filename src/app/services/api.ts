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
    ],
    endpoints: {
      getApiMyKubernetesHostList: {
        providesTags: () => ["Kubernetes"],
      },
      getApiMyKubernetesHostGetById: {
        providesTags: () => ["Kubernetes"],
      },
      putApiMyKubernetesNodeDeleteByKubernetesHostIdAndKubernetesHostNodeId: {
        invalidatesTags: () => ["Kubernetes"],
      },
      postApiMyKubernetesHostCreate: {
        invalidatesTags: () => ["Kubernetes"],
      },
      deleteApiMyKubernetesHostDeleteById: {
        invalidatesTags: () => ["Kubernetes"],
      },
      getApiMyPortalProfileGet: {
        providesTags: () => ["Profile"],
      },
      getApiMyPortalProfileGetNotificationStatus: {
        providesTags: () => ["Notification"],
      },
      postApiMyPortalProfileConfirmPhoneNumber: {
        invalidatesTags: () => ["Profile"],
      },
      putApiMyPortalProfileEditPhoneNotification: {
        invalidatesTags: () => ["Notification"],
      },
      putApiMyPortalProfileEditEmailNotification: {
        invalidatesTags: () => ["Notification"],
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
      getApiMyPortalIssueItemListByIssueId: {
        providesTags: () => ["Support"],
      },
      getApiMyCdnLoadBalanceListByCdnId: {
        providesTags: () => ["LoadBalance"],
      },
      putApiMyPortalCustomerEditCustomerType: {
        invalidatesTags: () => ["Profile"],
      },
      getApiMyPortalCustomerGet: {
        providesTags: () => ["Profile"],
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
      getApiMyPortalIssueList: {
        providesTags: () => ["Support"],
      },
      postApiMyPortalIssueCreate: {
        invalidatesTags: () => ["Support"],
      },
      postApiMyPortalIssueItemCreate: {
        invalidatesTags: () => ["Support"],
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
