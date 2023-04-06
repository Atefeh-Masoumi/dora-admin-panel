import {
  api as generatedApi,
  PostUserV2PortalSupportCreateApiArg,
  PostUserV2PortalSupportItemCreateApiResponse,
  PostUserV2PortalProfileGetNotificationStatusApiResponse,
  PostUserV2PortalProfileGetNotificationStatusApiArg,
} from "./api.generated";
import { AxiosRequestConfig } from "axios";

export const api = generatedApi
  .injectEndpoints({
    endpoints: (build) => ({
      getUserV2PortalProfileGetNotificationStatus: build.query<
        PostUserV2PortalProfileGetNotificationStatusApiResponse,
        PostUserV2PortalProfileGetNotificationStatusApiArg
      >({
        query: () => ({
          url: `/user/v2/portal/profile/get-notification-status`,
          method: "POST",
        }),
      }),
      customCreateSupport: build.mutation<
        PostUserV2PortalSupportItemCreateApiResponse,
        PostUserV2PortalSupportCreateApiArg & {
          abortController?: AbortController;
          onUploadProgress: AxiosRequestConfig["onUploadProgress"];
        }
      >({
        query: ({ body, abortController, onUploadProgress }) => ({
          url: `/user/v2/portal/support/create`,
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
      getUserV2PortalProfileGet: {
        providesTags: () => ["Profile"],
      },
      getUserV2PortalProfileGetNotificationStatus: {
        providesTags: () => ["Notification"],
      },
      getUserV2CdnDnsRecordGetById: {
        providesTags: () => ["EditRecordDialog"],
      },
      getUserV2CdnDnsRecordListByZoneName: {
        providesTags: () => ["ProxyStatus", "DNSRecordSetting"],
      },
      getUserV2CdnCdnGetByZoneName: {
        providesTags: () => ["ZoneData"],
      },
      getUserV2PortalSupportItemListBySupportId: {
        providesTags: () => ["SupportItems"],
      },
      getUserV2CdnLoadBalanceListByZoneName: {
        providesTags: () => ["LoadBalance"],
      },
      getUserV2PortalOrderList: {
        providesTags: () => ["Orders"],
      },
      getUserV2PortalOrderGetById: {
        providesTags: () => ["Order"],
      },
      putUserV2PortalOrderPaymentType: {
        invalidatesTags: () => ["Order"],
      },
      putUserV2PortalOrderDuration: {
        invalidatesTags: () => ["Order"],
      },
      putUserV2PortalCompanyEditAccountType: {
        invalidatesTags: () => ["Profile"],
      },
      getUserV2PortalCompanyGet: {
        providesTags: () => ["Profile"],
      },
      postUserV2PortalProfileConfirmPhoneNumber: {
        invalidatesTags: () => ["Profile"],
      },
      putUserV2PortalProfileEditPhoneNotification: {
        invalidatesTags: () => ["Notification"],
      },
      putUserV2PortalProfileEditEmailNotification: {
        invalidatesTags: () => ["Notification"],
      },
      putUserV2CdnDnsRecordChangeProxyStatusById: {
        invalidatesTags: () => ["EditRecordDialog", "ProxyStatus"],
      },
      deleteUserV2CdnDnsRecordDeleteById: {
        invalidatesTags: () => ["DNSRecordSetting"],
      },
      putUserV2CdnDnsRecordEdit: {
        invalidatesTags: () => ["DNSRecordSetting", "EditRecordDialog"],
      },
      postUserV2CdnDnsRecordCreate: {
        invalidatesTags: () => ["DNSRecordSetting"],
      },
      putUserV2CdnCdnChangeCdnType: {
        invalidatesTags: () => ["ZoneData"],
      },
      putUserV2CdnCdnChangeHsts: {
        invalidatesTags: () => ["ZoneData"],
      },
      putUserV2CdnCdnChangeHttpsRedirect: {
        invalidatesTags: () => ["ZoneData"],
      },
      putUserV2CdnCdnChangeNonWwwRedirect: {
        invalidatesTags: () => ["ZoneData"],
      },
      putUserV2CdnCdnChangeEdgeCertType: {
        invalidatesTags: () => ["ZoneData"],
      },
      putUserV2CdnCdnChangeClientCertType: {
        invalidatesTags: () => ["ZoneData"],
      },
      deleteUserV2CdnLoadBalanceDeleteById: {
        invalidatesTags: () => ["LoadBalance"],
      },
      postUserV2CdnLoadBalanceCreate: {
        invalidatesTags: () => ["LoadBalance"],
      },
      putUserV2CdnLoadBalanceEdit: {
        invalidatesTags: () => ["LoadBalance"],
      },
      getUserV2CdnEdgeCertGetByZoneName: {
        providesTags: () => ["SslSetting"],
      },
      getUserV2CdnEdgeCertGetUserCertByZoneName: {
        providesTags: () => ["SslSetting"],
      },
      getUserV2CdnClientCertGetByZoneName: {
        providesTags: () => ["SslSetting"],
      },
      postUserV2CdnEdgeCertCreate: {
        invalidatesTags: () => ["SslSetting"],
      },
      postUserV2CdnEdgeCertCreateUserCert: {
        invalidatesTags: () => ["SslSetting"],
      },
      postUserV2PortalSupportItemCreate: {
        invalidatesTags: () => ["SupportItems"],
      },
      getUserV2VmVmList: {
        providesTags: () => ["VmHosts"],
      },
      postUserV2VmVmCreate: {
        invalidatesTags: () => ["VmHosts"],
      },
      deleteUserV2VmVmDeleteById: {
        invalidatesTags: () => ["VmHosts"],
      },
      putUserV2VmVmEdit: {
        invalidatesTags: () => ["VmHosts"],
      },
      getUserV2VmVmGetById: {
        providesTags: () => ["VmHost"],
      },
      putUserV2VmVmConnectById: {
        invalidatesTags: () => ["VmHost"],
      },
      putUserV2VmVmDisconnectById: {
        invalidatesTags: () => ["VmHost"],
      },
      putUserV2VmVmShutdownById: {
        invalidatesTags: () => ["VmHost"],
      },
      putUserV2VmVmStartById: {
        invalidatesTags: () => ["VmHost"],
      },
      putUserV2VmVmStopById: {
        invalidatesTags: () => ["VmHost"],
      },
      putUserV2VmVmRebootById: {
        invalidatesTags: () => ["VmHost"],
      },
    },
  });

export const {
  useCustomCreateSupportMutation,
  useGetUserV2PortalProfileGetNotificationStatusQuery,
  useLazyGetUserV2VmVmIpListByVmIdQuery,
  useLazyGetUserV2VmImageListByDatacenterIdQuery,
  useLazyGetUserV2VmVmGetByIdQuery,
  useLazyGetUserV2CdnLoadBalanceGetByIdQuery,
  useLazyGetUserV2CdnDnsRecordGetByIdQuery,
  useLazyGetUserV2PortalInvoiceGetByIdQuery,
  useLazyGetUserV2PortalSupportItemDownloadByIdQuery,
  useLazyGetUserV2PortalWalletPaymentGetByIdQuery,
  useLazyGetUserV2PortalBillDownloadByIdQuery,
  useLazyGetUserV2WebWebHostGetLoginSessionByIdQuery,
  useLazyGetUserV2RabbitRabbitUserListByRabbitHostIdQuery,
} = api;
