import {
  api as generatedApi,
  PostApiV2PortalSupportCreateApiArg,
  PostApiV2PortalSupportItemCreateApiResponse,
  PostApiV2PortalProfileGetNotificationStatusApiResponse,
  PostApiV2PortalProfileGetNotificationStatusApiArg,
} from "./api.generated";
import { AxiosRequestConfig } from "axios";

export const api = generatedApi
  .injectEndpoints({
    endpoints: (build) => ({
      getApiV2PortalProfileGetNotificationStatus: build.query<
        PostApiV2PortalProfileGetNotificationStatusApiResponse,
        PostApiV2PortalProfileGetNotificationStatusApiArg
      >({
        query: () => ({
          url: `/api/v2/portal/profile/get-notification-status`,
          method: "POST",
        }),
      }),
      customMediaControllerUploadVideo: build.mutation<
        PostApiV2PortalSupportItemCreateApiResponse,
        PostApiV2PortalSupportCreateApiArg & {
          abortController?: AbortController;
          onUploadProgress: AxiosRequestConfig["onUploadProgress"];
        }
      >({
        query: ({ body, abortController, onUploadProgress }) => ({
          url: `/api/v2/portal/support/create`,
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
      getApiV2PortalProfileGet: {
        providesTags: () => ["Profile"],
      },
      getApiV2PortalProfileGetNotificationStatus: {
        providesTags: () => ["Notification"],
      },
      getApiV2CdnDnsRecordGetById: {
        providesTags: () => ["EditRecordDialog"],
      },
      getApiV2CdnDnsRecordListByZoneName: {
        providesTags: () => ["ProxyStatus", "DNSRecordSetting"],
      },
      getApiV2CdnZoneGetByZoneName: {
        providesTags: () => ["ZoneData"],
      },
      getApiV2PortalSupportItemListBySupportId: {
        providesTags: () => ["SupportItems"],
      },
      getApiV2CdnLoadBalanceListByZoneName: {
        providesTags: () => ["LoadBalance"],
      },
      getApiV2VmVmList: {
        providesTags: () => ["CloudServer"],
      },
      getApiV2VmVmGetById: {
        providesTags: () => ["VmData"],
      },
      getApiV2PortalInvoiceGetById: {
        providesTags: () => ["CartDetails"],
      },
      getApiV2PortalInvoiceNotPaidList: {
        providesTags: () => ["Cart"],
      },
      putApiV2PortalProfileEditAccountType: {
        invalidatesTags: () => ["Profile"],
      },
      postApiV2PortalProfileConfirmPhoneNumber: {
        invalidatesTags: () => ["Profile"],
      },
      putApiV2PortalProfileEditPhoneNotification: {
        invalidatesTags: () => ["Notification"],
      },
      putApiV2PortalProfileEditEmailNotification: {
        invalidatesTags: () => ["Notification"],
      },
      putApiV2CdnDnsRecordChangeProxyStatusById: {
        invalidatesTags: () => ["EditRecordDialog", "ProxyStatus"],
      },
      deleteApiV2CdnDnsRecordDeleteById: {
        invalidatesTags: () => ["DNSRecordSetting"],
      },
      putApiV2CdnDnsRecordEdit: {
        invalidatesTags: () => ["DNSRecordSetting", "EditRecordDialog"],
      },
      postApiV2CdnDnsRecordCreate: {
        invalidatesTags: () => ["DNSRecordSetting"],
      },
      putApiV2CdnZoneChangeZoneType: { invalidatesTags: () => ["ZoneData"] },
      putApiV2CdnZoneChangeHsts: { invalidatesTags: () => ["ZoneData"] },
      putApiV2CdnZoneChangeRedirect: { invalidatesTags: () => ["ZoneData"] },
      putApiV2CdnZoneChangeEdgeCertType: {
        invalidatesTags: () => ["ZoneData"],
      },
      putApiV2CdnZoneChangeClientCertType: {
        invalidatesTags: () => ["ZoneData"],
      },

      deleteApiV2CdnLoadBalanceDeleteById: {
        invalidatesTags: () => ["LoadBalance"],
      },
      postApiV2CdnLoadBalanceCreate: {
        invalidatesTags: () => ["LoadBalance"],
      },
      putApiV2CdnLoadBalanceEdit: {
        invalidatesTags: () => ["LoadBalance"],
      },
      postApiV2PortalSupportItemCreate: {
        invalidatesTags: () => ["SupportItems"],
      },
      postApiV2VmVmCreate: {
        invalidatesTags: () => ["CloudServer"],
      },
      deleteApiV2VmVmDeleteById: {
        invalidatesTags: () => ["CloudServer"],
      },
      putApiV2VmVmEdit: {
        invalidatesTags: () => ["CloudServer"],
      },
      putApiV2VmVmConnectById: {
        invalidatesTags: () => ["VmData"],
      },
      putApiV2VmVmDisconnectById: {
        invalidatesTags: () => ["VmData"],
      },
      putApiV2VmVmShutdownById: {
        invalidatesTags: () => ["VmData"],
      },
      putApiV2VmVmStartById: {
        invalidatesTags: () => ["VmData"],
      },
      putApiV2VmVmStopById: {
        invalidatesTags: () => ["VmData"],
      },
      putApiV2VmVmRebootById: {
        invalidatesTags: () => ["VmData"],
      },
      putApiV2PortalInvoicePaymentType: {
        invalidatesTags: () => ["CartDetails"],
      },
      putApiV2PortalInvoiceDuration: {
        invalidatesTags: () => ["CartDetails"],
      }
    },
  });

export const {
  useCustomMediaControllerUploadVideoMutation,
  useGetApiV2PortalProfileGetNotificationStatusQuery,
  useLazyGetApiV2VmVmIpListByVmIdQuery,
  useLazyGetApiV2VmImageListByDatacenterIdQuery,
  useLazyGetApiV2VmVmGetByIdQuery,
  useLazyGetApiV2CdnLoadBalanceGetByIdQuery,
  useLazyGetApiV2CdnDnsRecordGetByIdQuery,
  useLazyGetApiV2PortalInvoiceGetByIdQuery,
  useLazyGetApiV2PortalSupportItemDownloadByIdQuery,
  useLazyGetApiV2PortalWalletPaymentGetByIdQuery,
  useLazyGetApiV2PortalUserBillDownloadByIdQuery,
  useLazyGetApiV2WebWebHostGetLoginSessionByIdQuery,
  useLazyGetApiV2RabbitRabbitUserListByRabbitHostIdQuery
} = api;
