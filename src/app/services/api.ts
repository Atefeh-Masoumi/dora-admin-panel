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
      "EditRecordDialog",
      "ProxyStatus",
      "DNSRecordSetting",
      "ZoneData",
      "LoadBalance",
      "SupportItems",
      "CloudServer",
      "VmData",
      "CartDetails",
      "Cart",
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
      getUserV2CdnZoneGetByZoneName: {
        providesTags: () => ["ZoneData"],
      },
      getUserV2PortalSupportItemListBySupportId: {
        providesTags: () => ["SupportItems"],
      },
      getUserV2CdnLoadBalanceListByZoneName: {
        providesTags: () => ["LoadBalance"],
      },
      getUserV2VmVmList: {
        providesTags: () => ["CloudServer"],
      },
      getUserV2VmVmGetById: {
        providesTags: () => ["VmData"],
      },
      getUserV2PortalOrderList: {
        providesTags: () => ["Cart"],
      },
      getUserV2PortalOrderGetById: {
        providesTags: () => ["CartDetails"],
      },
      putUserV2PortalOrderPaymentType: {
        invalidatesTags: () => ["CartDetails"],
      },
      putUserV2PortalOrderDuration: {
        invalidatesTags: () => ["CartDetails"],
      },
      putUserV2PortalProfileEditAccountType: {
        invalidatesTags: () => ["Profile"],
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
      putUserV2CdnZoneChangeZoneType: { invalidatesTags: () => ["ZoneData"] },
      putUserV2CdnZoneChangeHsts: { invalidatesTags: () => ["ZoneData"] },
      putUserV2CdnZoneChangeRedirect: { invalidatesTags: () => ["ZoneData"] },
      putUserV2CdnZoneChangeEdgeCertType: {
        invalidatesTags: () => ["ZoneData"],
      },
      putUserV2CdnZoneChangeClientCertType: {
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
      postUserV2PortalSupportItemCreate: {
        invalidatesTags: () => ["SupportItems"],
      },
      postUserV2VmVmCreate: {
        invalidatesTags: () => ["CloudServer"],
      },
      deleteUserV2VmVmDeleteById: {
        invalidatesTags: () => ["CloudServer"],
      },
      putUserV2VmVmEdit: {
        invalidatesTags: () => ["CloudServer"],
      },
      putUserV2VmVmConnectById: {
        invalidatesTags: () => ["VmData"],
      },
      putUserV2VmVmDisconnectById: {
        invalidatesTags: () => ["VmData"],
      },
      putUserV2VmVmShutdownById: {
        invalidatesTags: () => ["VmData"],
      },
      putUserV2VmVmStartById: {
        invalidatesTags: () => ["VmData"],
      },
      putUserV2VmVmStopById: {
        invalidatesTags: () => ["VmData"],
      },
      putUserV2VmVmRebootById: {
        invalidatesTags: () => ["VmData"],
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
  useLazyGetUserV2PortalUserBillDownloadByIdQuery,
  useLazyGetUserV2WebWebHostGetLoginSessionByIdQuery,
  useLazyGetUserV2RabbitRabbitUserListByRabbitHostIdQuery,
} = api;
