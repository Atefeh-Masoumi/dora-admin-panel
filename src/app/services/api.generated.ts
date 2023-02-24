import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "src/app/services/baseQuery";
export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: (build) => ({
    postUserV2AccountLogin: build.mutation<
      PostUserV2AccountLoginApiResponse,
      PostUserV2AccountLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/account/login`,
        method: "POST",
        body: queryArg.loginModel,
      }),
    }),
    postUserV2AccountRegister: build.mutation<
      PostUserV2AccountRegisterApiResponse,
      PostUserV2AccountRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/account/register`,
        method: "POST",
        body: queryArg.registerModel,
      }),
    }),
    postUserV2AccountForgot: build.mutation<
      PostUserV2AccountForgotApiResponse,
      PostUserV2AccountForgotApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/account/forgot`,
        method: "POST",
        body: queryArg.forgotModel,
      }),
    }),
    postUserV2AccountForgotConfirm: build.mutation<
      PostUserV2AccountForgotConfirmApiResponse,
      PostUserV2AccountForgotConfirmApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/account/forgot-confirm`,
        method: "POST",
        body: queryArg.confirmForgotModel,
      }),
    }),
    postUserV2AccountLogout: build.mutation<
      PostUserV2AccountLogoutApiResponse,
      PostUserV2AccountLogoutApiArg
    >({
      query: () => ({ url: `/user/v2/account/logout`, method: "POST" }),
    }),
    postUserV2CdnAnalyticGet: build.mutation<
      PostUserV2CdnAnalyticGetApiResponse,
      PostUserV2CdnAnalyticGetApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/analytic/get`,
        method: "POST",
        body: queryArg.getAnalyticModel,
      }),
    }),
    getUserV2CdnApiGatewayListByZoneName: build.query<
      GetUserV2CdnApiGatewayListByZoneNameApiResponse,
      GetUserV2CdnApiGatewayListByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/api-gateway/list/${queryArg.zoneName}`,
      }),
    }),
    getUserV2CdnApiGatewayGetById: build.query<
      GetUserV2CdnApiGatewayGetByIdApiResponse,
      GetUserV2CdnApiGatewayGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/api-gateway/get/${queryArg.id}`,
      }),
    }),
    postUserV2CdnApiGatewayCreate: build.mutation<
      PostUserV2CdnApiGatewayCreateApiResponse,
      PostUserV2CdnApiGatewayCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/api-gateway/create`,
        method: "POST",
        body: queryArg.createApiGatewayModel,
      }),
    }),
    putUserV2CdnApiGatewayEdit: build.mutation<
      PutUserV2CdnApiGatewayEditApiResponse,
      PutUserV2CdnApiGatewayEditApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/api-gateway/edit`,
        method: "PUT",
        body: queryArg.editApiGatewayModel,
      }),
    }),
    deleteUserV2CdnApiGatewayDeleteById: build.mutation<
      DeleteUserV2CdnApiGatewayDeleteByIdApiResponse,
      DeleteUserV2CdnApiGatewayDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/api-gateway/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getUserV2PortalUserBillList: build.query<
      GetUserV2PortalUserBillListApiResponse,
      GetUserV2PortalUserBillListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/user-bill/list` }),
    }),
    getUserV2PortalUserBillGetById: build.query<
      GetUserV2PortalUserBillGetByIdApiResponse,
      GetUserV2PortalUserBillGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/user-bill/get/${queryArg.id}`,
      }),
    }),
    getUserV2PortalUserBillDownloadById: build.query<
      GetUserV2PortalUserBillDownloadByIdApiResponse,
      GetUserV2PortalUserBillDownloadByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/user-bill/download/${queryArg.id}`,
      }),
    }),
    getUserV2PortalBusinessUnitList: build.query<
      GetUserV2PortalBusinessUnitListApiResponse,
      GetUserV2PortalBusinessUnitListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/business-unit/list` }),
    }),
    getUserV2PortalCalculateMonthList: build.query<
      GetUserV2PortalCalculateMonthListApiResponse,
      GetUserV2PortalCalculateMonthListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/calculate-month/list` }),
    }),
    getUserV2PortalCommissionList: build.query<
      GetUserV2PortalCommissionListApiResponse,
      GetUserV2PortalCommissionListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/commission/list` }),
    }),
    getUserV2PortalDashboardGetUserAnalyticsByCategoryId: build.query<
      GetUserV2PortalDashboardGetUserAnalyticsByCategoryIdApiResponse,
      GetUserV2PortalDashboardGetUserAnalyticsByCategoryIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/dashboard/get-user-analytics/${queryArg.categoryId}`,
      }),
    }),
    getUserV2PortalDashboardUserBillShortList: build.query<
      GetUserV2PortalDashboardUserBillShortListApiResponse,
      GetUserV2PortalDashboardUserBillShortListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/dashboard/user-bill-short-list` }),
    }),
    getUserV2PortalDashboardSupportShortList: build.query<
      GetUserV2PortalDashboardSupportShortListApiResponse,
      GetUserV2PortalDashboardSupportShortListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/dashboard/support-short-list` }),
    }),
    getUserV2VmDatacenterList: build.query<
      GetUserV2VmDatacenterListApiResponse,
      GetUserV2VmDatacenterListApiArg
    >({
      query: () => ({ url: `/user/v2/vm/datacenter/list` }),
    }),
    getUserV2VmImageListByDatacenterId: build.query<
      GetUserV2VmImageListByDatacenterIdApiResponse,
      GetUserV2VmImageListByDatacenterIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/image/list/${queryArg.datacenterId}`,
      }),
    }),
    getUserV2VmIsoListByDatacenterId: build.query<
      GetUserV2VmIsoListByDatacenterIdApiResponse,
      GetUserV2VmIsoListByDatacenterIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/iso/list/${queryArg.datacenterId}`,
      }),
    }),
    putUserV2VmIsoMount: build.mutation<
      PutUserV2VmIsoMountApiResponse,
      PutUserV2VmIsoMountApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/iso/mount`,
        method: "PUT",
        body: queryArg.mountModel,
      }),
    }),
    putUserV2VmIsoUnmount: build.mutation<
      PutUserV2VmIsoUnmountApiResponse,
      PutUserV2VmIsoUnmountApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/iso/unmount`,
        method: "PUT",
        body: queryArg.unmountModel,
      }),
    }),
    getUserV2CdnDnsRecordListByZoneName: build.query<
      GetUserV2CdnDnsRecordListByZoneNameApiResponse,
      GetUserV2CdnDnsRecordListByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/dns-record/list/${queryArg.zoneName}`,
      }),
    }),
    getUserV2CdnDnsRecordGetById: build.query<
      GetUserV2CdnDnsRecordGetByIdApiResponse,
      GetUserV2CdnDnsRecordGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/dns-record/get/${queryArg.id}`,
      }),
    }),
    postUserV2CdnDnsRecordCreate: build.mutation<
      PostUserV2CdnDnsRecordCreateApiResponse,
      PostUserV2CdnDnsRecordCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/dns-record/create`,
        method: "POST",
        body: queryArg.createDnsRecordModel,
      }),
    }),
    putUserV2CdnDnsRecordEdit: build.mutation<
      PutUserV2CdnDnsRecordEditApiResponse,
      PutUserV2CdnDnsRecordEditApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/dns-record/edit`,
        method: "PUT",
        body: queryArg.editDnsRecordModel,
      }),
    }),
    deleteUserV2CdnDnsRecordDeleteById: build.mutation<
      DeleteUserV2CdnDnsRecordDeleteByIdApiResponse,
      DeleteUserV2CdnDnsRecordDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/dns-record/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putUserV2CdnDnsRecordChangeProxyStatusById: build.mutation<
      PutUserV2CdnDnsRecordChangeProxyStatusByIdApiResponse,
      PutUserV2CdnDnsRecordChangeProxyStatusByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/dns-record/change-proxy-status/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getUserV2DomainList: build.query<
      GetUserV2DomainListApiResponse,
      GetUserV2DomainListApiArg
    >({
      query: () => ({ url: `/user/v2/domain/list` }),
    }),
    getUserV2DomainGetById: build.query<
      GetUserV2DomainGetByIdApiResponse,
      GetUserV2DomainGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/user/v2/domain/get/${queryArg.id}` }),
    }),
    getUserV2DomainGetStatusById: build.query<
      GetUserV2DomainGetStatusByIdApiResponse,
      GetUserV2DomainGetStatusByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/domain/get-status/${queryArg.id}`,
      }),
    }),
    postUserV2DomainGetPrice: build.mutation<
      PostUserV2DomainGetPriceApiResponse,
      PostUserV2DomainGetPriceApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/domain/get-price`,
        method: "POST",
        body: queryArg.getPriceModel,
      }),
    }),
    postUserV2DomainRegister: build.mutation<
      PostUserV2DomainRegisterApiResponse,
      PostUserV2DomainRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/domain/register`,
        method: "POST",
        body: queryArg.registerDomainModel,
      }),
    }),
    deleteUserV2DomainDeleteById: build.mutation<
      DeleteUserV2DomainDeleteByIdApiResponse,
      DeleteUserV2DomainDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/domain/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putUserV2DomainChangeContact: build.mutation<
      PutUserV2DomainChangeContactApiResponse,
      PutUserV2DomainChangeContactApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/domain/change-contact`,
        method: "PUT",
        body: queryArg.changeContactModel,
      }),
    }),
    putUserV2DomainChangeNs: build.mutation<
      PutUserV2DomainChangeNsApiResponse,
      PutUserV2DomainChangeNsApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/domain/change-ns`,
        method: "PUT",
        body: queryArg.changeNsModel,
      }),
    }),
    postUserV2DomainResendVerificationById: build.mutation<
      PostUserV2DomainResendVerificationByIdApiResponse,
      PostUserV2DomainResendVerificationByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/domain/resend-verification/${queryArg.id}`,
        method: "POST",
      }),
    }),
    getUserV2Index: build.query<
      GetUserV2IndexApiResponse,
      GetUserV2IndexApiArg
    >({
      query: () => ({ url: `/user/v2/index` }),
    }),
    getUserV2Handshake: build.query<
      GetUserV2HandshakeApiResponse,
      GetUserV2HandshakeApiArg
    >({
      query: () => ({ url: `/user/v2/handshake` }),
    }),
    getUserV2PortalUserServiceListByProductCategoryId: build.query<
      GetUserV2PortalUserServiceListByProductCategoryIdApiResponse,
      GetUserV2PortalUserServiceListByProductCategoryIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/user-service/list/${queryArg.productCategoryId}`,
      }),
    }),
    getUserV2PortalInvoiceList: build.query<
      GetUserV2PortalInvoiceListApiResponse,
      GetUserV2PortalInvoiceListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/invoice/list` }),
    }),
    getUserV2PortalInvoiceGetById: build.query<
      GetUserV2PortalInvoiceGetByIdApiResponse,
      GetUserV2PortalInvoiceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/invoice/get/${queryArg.id}`,
      }),
    }),
    getUserV2CdnLoadBalanceListByZoneName: build.query<
      GetUserV2CdnLoadBalanceListByZoneNameApiResponse,
      GetUserV2CdnLoadBalanceListByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/load-balance/list/${queryArg.zoneName}`,
      }),
    }),
    getUserV2CdnLoadBalanceGetById: build.query<
      GetUserV2CdnLoadBalanceGetByIdApiResponse,
      GetUserV2CdnLoadBalanceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/load-balance/get/${queryArg.id}`,
      }),
    }),
    postUserV2CdnLoadBalanceCreate: build.mutation<
      PostUserV2CdnLoadBalanceCreateApiResponse,
      PostUserV2CdnLoadBalanceCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/load-balance/create`,
        method: "POST",
        body: queryArg.createLoadBalanceModel,
      }),
    }),
    putUserV2CdnLoadBalanceEdit: build.mutation<
      PutUserV2CdnLoadBalanceEditApiResponse,
      PutUserV2CdnLoadBalanceEditApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/load-balance/edit`,
        method: "PUT",
        body: queryArg.editLoadBalanceModel,
      }),
    }),
    deleteUserV2CdnLoadBalanceDeleteById: build.mutation<
      DeleteUserV2CdnLoadBalanceDeleteByIdApiResponse,
      DeleteUserV2CdnLoadBalanceDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/load-balance/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getUserV2LogSmsReceiveByFromAndTextTo: build.query<
      GetUserV2LogSmsReceiveByFromAndTextToApiResponse,
      GetUserV2LogSmsReceiveByFromAndTextToApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/log-sms/receive/${queryArg["from"]}/${queryArg.text}/${queryArg.to}`,
      }),
    }),
    getUserV2PortalNotificationList: build.query<
      GetUserV2PortalNotificationListApiResponse,
      GetUserV2PortalNotificationListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/notification/list` }),
    }),
    getUserV2PortalNotificationShortList: build.query<
      GetUserV2PortalNotificationShortListApiResponse,
      GetUserV2PortalNotificationShortListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/notification/short-list` }),
    }),
    getUserV2PortalOrderList: build.query<
      GetUserV2PortalOrderListApiResponse,
      GetUserV2PortalOrderListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/order/list` }),
    }),
    getUserV2PortalOrderGetById: build.query<
      GetUserV2PortalOrderGetByIdApiResponse,
      GetUserV2PortalOrderGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/order/get/${queryArg.id}`,
      }),
    }),
    putUserV2PortalOrderPaymentType: build.mutation<
      PutUserV2PortalOrderPaymentTypeApiResponse,
      PutUserV2PortalOrderPaymentTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/order/payment-type`,
        method: "PUT",
        body: queryArg.orderPaymentTypeModel,
      }),
    }),
    putUserV2PortalOrderDuration: build.mutation<
      PutUserV2PortalOrderDurationApiResponse,
      PutUserV2PortalOrderDurationApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/order/duration`,
        method: "PUT",
        body: queryArg.orderDurationModel,
      }),
    }),
    putUserV2PortalOrderVoucher: build.mutation<
      PutUserV2PortalOrderVoucherApiResponse,
      PutUserV2PortalOrderVoucherApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/order/voucher`,
        method: "PUT",
        body: queryArg.orderVoucherModel,
      }),
    }),
    postUserV2PortalOrderPay: build.mutation<
      PostUserV2PortalOrderPayApiResponse,
      PostUserV2PortalOrderPayApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/order/pay`,
        method: "POST",
        body: queryArg.orderPayModel,
      }),
    }),
    getUserV2PortalOrderPlanList: build.query<
      GetUserV2PortalOrderPlanListApiResponse,
      GetUserV2PortalOrderPlanListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/order-plan/list` }),
    }),
    postUserV2PortalOrderPlanOrder: build.mutation<
      PostUserV2PortalOrderPlanOrderApiResponse,
      PostUserV2PortalOrderPlanOrderApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/order-plan/order`,
        method: "POST",
        body: queryArg.createOrderPlanModel,
      }),
    }),
    getUserV2PortalProductBundleListByProductCategoryId: build.query<
      GetUserV2PortalProductBundleListByProductCategoryIdApiResponse,
      GetUserV2PortalProductBundleListByProductCategoryIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/product-bundle/list/${queryArg.productCategoryId}`,
      }),
    }),
    getUserV2PortalProductCategoryList: build.query<
      GetUserV2PortalProductCategoryListApiResponse,
      GetUserV2PortalProductCategoryListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/product-category/list` }),
    }),
    getUserV2PortalProfileGet: build.query<
      GetUserV2PortalProfileGetApiResponse,
      GetUserV2PortalProfileGetApiArg
    >({
      query: () => ({ url: `/user/v2/portal/profile/get` }),
    }),
    postUserV2PortalProfileGetNotificationStatus: build.mutation<
      PostUserV2PortalProfileGetNotificationStatusApiResponse,
      PostUserV2PortalProfileGetNotificationStatusApiArg
    >({
      query: () => ({
        url: `/user/v2/portal/profile/get-notification-status`,
        method: "POST",
      }),
    }),
    putUserV2PortalProfileEdit: build.mutation<
      PutUserV2PortalProfileEditApiResponse,
      PutUserV2PortalProfileEditApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/profile/edit`,
        method: "PUT",
        body: queryArg.editProfileModel,
      }),
    }),
    putUserV2PortalProfileEditAccountType: build.mutation<
      PutUserV2PortalProfileEditAccountTypeApiResponse,
      PutUserV2PortalProfileEditAccountTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/profile/edit-account-type`,
        method: "PUT",
        body: queryArg.editAccountTypeModel,
      }),
    }),
    putUserV2PortalProfileEditEmail: build.mutation<
      PutUserV2PortalProfileEditEmailApiResponse,
      PutUserV2PortalProfileEditEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/profile/edit-email`,
        method: "PUT",
        body: queryArg.editEmailModel,
      }),
    }),
    postUserV2PortalProfileConfirmEmail: build.mutation<
      PostUserV2PortalProfileConfirmEmailApiResponse,
      PostUserV2PortalProfileConfirmEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/profile/confirm-email`,
        method: "POST",
        body: queryArg.confirmEmailModel,
      }),
    }),
    putUserV2PortalProfileEditPhoneNumber: build.mutation<
      PutUserV2PortalProfileEditPhoneNumberApiResponse,
      PutUserV2PortalProfileEditPhoneNumberApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/profile/edit-phone-number`,
        method: "PUT",
        body: queryArg.editPhoneNumberModel,
      }),
    }),
    postUserV2PortalProfileConfirmPhoneNumber: build.mutation<
      PostUserV2PortalProfileConfirmPhoneNumberApiResponse,
      PostUserV2PortalProfileConfirmPhoneNumberApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/profile/confirm-phone-number`,
        method: "POST",
        body: queryArg.confirmPhoneNumberModel,
      }),
    }),
    putUserV2PortalProfileEditEmailNotification: build.mutation<
      PutUserV2PortalProfileEditEmailNotificationApiResponse,
      PutUserV2PortalProfileEditEmailNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/profile/edit-email-notification`,
        method: "PUT",
        body: queryArg.editEmailNotifyModel,
      }),
    }),
    putUserV2PortalProfileEditPhoneNotification: build.mutation<
      PutUserV2PortalProfileEditPhoneNotificationApiResponse,
      PutUserV2PortalProfileEditPhoneNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/profile/edit-phone-notification`,
        method: "PUT",
        body: queryArg.editPhoneNotifyModel,
      }),
    }),
    postUserV2PortalProfileChangePassword: build.mutation<
      PostUserV2PortalProfileChangePasswordApiResponse,
      PostUserV2PortalProfileChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/profile/change-password`,
        method: "POST",
        body: queryArg.changePasswordModel,
      }),
    }),
    getUserV2RabbitRabbitHostList: build.query<
      GetUserV2RabbitRabbitHostListApiResponse,
      GetUserV2RabbitRabbitHostListApiArg
    >({
      query: () => ({ url: `/user/v2/rabbit/rabbit-host/list` }),
    }),
    getUserV2RabbitRabbitHostGetById: build.query<
      GetUserV2RabbitRabbitHostGetByIdApiResponse,
      GetUserV2RabbitRabbitHostGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/rabbit/rabbit-host/get/${queryArg.id}`,
      }),
    }),
    postUserV2RabbitRabbitHostCreate: build.mutation<
      PostUserV2RabbitRabbitHostCreateApiResponse,
      PostUserV2RabbitRabbitHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/rabbit/rabbit-host/create`,
        method: "POST",
        body: queryArg.createRabbitHostModel,
      }),
    }),
    putUserV2RabbitRabbitHostChangeService: build.mutation<
      PutUserV2RabbitRabbitHostChangeServiceApiResponse,
      PutUserV2RabbitRabbitHostChangeServiceApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/rabbit/rabbit-host/change-service`,
        method: "PUT",
        body: queryArg.editRabbitHostModel,
      }),
    }),
    deleteUserV2RabbitRabbitHostDeleteById: build.mutation<
      DeleteUserV2RabbitRabbitHostDeleteByIdApiResponse,
      DeleteUserV2RabbitRabbitHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/rabbit/rabbit-host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postUserV2RabbitRabbitHostChangeExchange: build.mutation<
      PostUserV2RabbitRabbitHostChangeExchangeApiResponse,
      PostUserV2RabbitRabbitHostChangeExchangeApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/rabbit/rabbit-host/change-exchange`,
        method: "POST",
        body: queryArg.changeExchangeModel,
      }),
    }),
    getUserV2RabbitRabbitUserListByRabbitHostId: build.query<
      GetUserV2RabbitRabbitUserListByRabbitHostIdApiResponse,
      GetUserV2RabbitRabbitUserListByRabbitHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/rabbit/rabbit-user/list/${queryArg.rabbitHostId}`,
      }),
    }),
    postUserV2RabbitRabbitUserCreate: build.mutation<
      PostUserV2RabbitRabbitUserCreateApiResponse,
      PostUserV2RabbitRabbitUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/rabbit/rabbit-user/create`,
        method: "POST",
        body: queryArg.createRabbitUserModel,
      }),
    }),
    deleteUserV2RabbitRabbitUserDeleteById: build.mutation<
      DeleteUserV2RabbitRabbitUserDeleteByIdApiResponse,
      DeleteUserV2RabbitRabbitUserDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/rabbit/rabbit-user/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postUserV2RabbitRabbitUserChangePassword: build.mutation<
      PostUserV2RabbitRabbitUserChangePasswordApiResponse,
      PostUserV2RabbitRabbitUserChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/rabbit/rabbit-user/change-password`,
        method: "POST",
        body: queryArg.changeRabbitPasswordModel,
      }),
    }),
    getUserV2SmsReceiveContentList: build.query<
      GetUserV2SmsReceiveContentListApiResponse,
      GetUserV2SmsReceiveContentListApiArg
    >({
      query: () => ({ url: `/user/v2/sms/receive-content/list` }),
    }),
    getUserV2PortalReferralGet: build.query<
      GetUserV2PortalReferralGetApiResponse,
      GetUserV2PortalReferralGetApiArg
    >({
      query: () => ({ url: `/user/v2/portal/referral/get` }),
    }),
    postUserV2PortalReferralJoin: build.mutation<
      PostUserV2PortalReferralJoinApiResponse,
      PostUserV2PortalReferralJoinApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/referral/join`,
        method: "POST",
        body: queryArg.joinReferralModel,
      }),
    }),
    getUserV2SmsSendContentList: build.query<
      GetUserV2SmsSendContentListApiResponse,
      GetUserV2SmsSendContentListApiArg
    >({
      query: () => ({ url: `/user/v2/sms/send-content/list` }),
    }),
    postUserV2SmsSendContentSendSms: build.mutation<
      PostUserV2SmsSendContentSendSmsApiResponse,
      PostUserV2SmsSendContentSendSmsApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/sms/send-content/send-sms`,
        method: "POST",
        body: queryArg.sendSmsModel,
      }),
    }),
    postUserV2SmsSendContentSend1ToN: build.mutation<
      PostUserV2SmsSendContentSend1ToNApiResponse,
      PostUserV2SmsSendContentSend1ToNApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/sms/send-content/send-1-to-n`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postUserV2SmsSendContentSendNToN: build.mutation<
      PostUserV2SmsSendContentSendNToNApiResponse,
      PostUserV2SmsSendContentSendNToNApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/sms/send-content/send-n-to-n`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postUserV2SmsGatewaySendSms: build.mutation<
      PostUserV2SmsGatewaySendSmsApiResponse,
      PostUserV2SmsGatewaySendSmsApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/sms/gateway/send-sms`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postUserV2SmsGatewayReceiveSms: build.mutation<
      PostUserV2SmsGatewayReceiveSmsApiResponse,
      PostUserV2SmsGatewayReceiveSmsApiArg
    >({
      query: () => ({
        url: `/user/v2/sms/gateway/receive-sms`,
        method: "POST",
      }),
    }),
    getUserV2SmsSmsNumberList: build.query<
      GetUserV2SmsSmsNumberListApiResponse,
      GetUserV2SmsSmsNumberListApiArg
    >({
      query: () => ({ url: `/user/v2/sms/sms-number/list` }),
    }),
    getUserV2SmsSmsNumberHostList: build.query<
      GetUserV2SmsSmsNumberHostListApiResponse,
      GetUserV2SmsSmsNumberHostListApiArg
    >({
      query: () => ({ url: `/user/v2/sms/sms-number-host/list` }),
    }),
    postUserV2SmsSmsNumberHostCreate: build.mutation<
      PostUserV2SmsSmsNumberHostCreateApiResponse,
      PostUserV2SmsSmsNumberHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/sms/sms-number-host/create`,
        method: "POST",
        body: queryArg.createUserSmsNumberModel,
      }),
    }),
    deleteUserV2SmsSmsNumberHostDeleteById: build.mutation<
      DeleteUserV2SmsSmsNumberHostDeleteByIdApiResponse,
      DeleteUserV2SmsSmsNumberHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/sms/sms-number-host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getUserV2PortalSupportList: build.query<
      GetUserV2PortalSupportListApiResponse,
      GetUserV2PortalSupportListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/support/list` }),
    }),
    postUserV2PortalSupportCreate: build.mutation<
      PostUserV2PortalSupportCreateApiResponse,
      PostUserV2PortalSupportCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/support/create`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getUserV2PortalSupportItemListBySupportId: build.query<
      GetUserV2PortalSupportItemListBySupportIdApiResponse,
      GetUserV2PortalSupportItemListBySupportIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/support-item/list/${queryArg.supportId}`,
      }),
    }),
    postUserV2PortalSupportItemCreate: build.mutation<
      PostUserV2PortalSupportItemCreateApiResponse,
      PostUserV2PortalSupportItemCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/support-item/create`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getUserV2PortalSupportItemDownloadById: build.query<
      GetUserV2PortalSupportItemDownloadByIdApiResponse,
      GetUserV2PortalSupportItemDownloadByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/support-item/download/${queryArg.id}`,
      }),
    }),
    getUserV2PortalSupportSubjectList: build.query<
      GetUserV2PortalSupportSubjectListApiResponse,
      GetUserV2PortalSupportSubjectListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/support-subject/list` }),
    }),
    postUserV2PortalSupportSubjectSelectList: build.mutation<
      PostUserV2PortalSupportSubjectSelectListApiResponse,
      PostUserV2PortalSupportSubjectSelectListApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/support-subject/select-list`,
        method: "POST",
        body: queryArg.selectListModel,
      }),
    }),
    getUserV2PortalUserApiKeyList: build.query<
      GetUserV2PortalUserApiKeyListApiResponse,
      GetUserV2PortalUserApiKeyListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/user-api-key/list` }),
    }),
    postUserV2PortalUserApiKeyCreate: build.mutation<
      PostUserV2PortalUserApiKeyCreateApiResponse,
      PostUserV2PortalUserApiKeyCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/user-api-key/create`,
        method: "POST",
        body: queryArg.createUserApiKeyModel,
      }),
    }),
    deleteUserV2PortalUserApiKeyDeleteById: build.mutation<
      DeleteUserV2PortalUserApiKeyDeleteByIdApiResponse,
      DeleteUserV2PortalUserApiKeyDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/user-api-key/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getUserV2PortalUserCompanyGet: build.query<
      GetUserV2PortalUserCompanyGetApiResponse,
      GetUserV2PortalUserCompanyGetApiArg
    >({
      query: () => ({ url: `/user/v2/portal/user-company/get` }),
    }),
    putUserV2PortalUserCompanyEdit: build.mutation<
      PutUserV2PortalUserCompanyEditApiResponse,
      PutUserV2PortalUserCompanyEditApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/user-company/edit`,
        method: "PUT",
        body: queryArg.editUserCompanyModel,
      }),
    }),
    getUserV2SmsUserSmsCreditGetBalance: build.query<
      GetUserV2SmsUserSmsCreditGetBalanceApiResponse,
      GetUserV2SmsUserSmsCreditGetBalanceApiArg
    >({
      query: () => ({ url: `/user/v2/sms/user-sms-credit/get-balance` }),
    }),
    getUserV2VmVmList: build.query<
      GetUserV2VmVmListApiResponse,
      GetUserV2VmVmListApiArg
    >({
      query: () => ({ url: `/user/v2/vm/vm/list` }),
    }),
    getUserV2VmVmGetById: build.query<
      GetUserV2VmVmGetByIdApiResponse,
      GetUserV2VmVmGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/user/v2/vm/vm/get/${queryArg.id}` }),
    }),
    postUserV2VmVmCreate: build.mutation<
      PostUserV2VmVmCreateApiResponse,
      PostUserV2VmVmCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/vm/create`,
        method: "POST",
        body: queryArg.createVmModel,
      }),
    }),
    putUserV2VmVmEdit: build.mutation<
      PutUserV2VmVmEditApiResponse,
      PutUserV2VmVmEditApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/vm/edit`,
        method: "PUT",
        body: queryArg.editVmModel,
      }),
    }),
    deleteUserV2VmVmDeleteById: build.mutation<
      DeleteUserV2VmVmDeleteByIdApiResponse,
      DeleteUserV2VmVmDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/vm/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putUserV2VmVmRebuild: build.mutation<
      PutUserV2VmVmRebuildApiResponse,
      PutUserV2VmVmRebuildApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/vm/rebuild`,
        method: "PUT",
        body: queryArg.rebuildVmModel,
      }),
    }),
    putUserV2VmVmConnectById: build.mutation<
      PutUserV2VmVmConnectByIdApiResponse,
      PutUserV2VmVmConnectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/vm/connect/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putUserV2VmVmDisconnectById: build.mutation<
      PutUserV2VmVmDisconnectByIdApiResponse,
      PutUserV2VmVmDisconnectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/vm/disconnect/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putUserV2VmVmRebootById: build.mutation<
      PutUserV2VmVmRebootByIdApiResponse,
      PutUserV2VmVmRebootByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/vm/reboot/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putUserV2VmVmShutdownById: build.mutation<
      PutUserV2VmVmShutdownByIdApiResponse,
      PutUserV2VmVmShutdownByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/vm/shutdown/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putUserV2VmVmResetById: build.mutation<
      PutUserV2VmVmResetByIdApiResponse,
      PutUserV2VmVmResetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/vm/reset/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putUserV2VmVmStartById: build.mutation<
      PutUserV2VmVmStartByIdApiResponse,
      PutUserV2VmVmStartByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/vm/start/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putUserV2VmVmStopById: build.mutation<
      PutUserV2VmVmStopByIdApiResponse,
      PutUserV2VmVmStopByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/vm/stop/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getUserV2VmVmIpListByVmId: build.query<
      GetUserV2VmVmIpListByVmIdApiResponse,
      GetUserV2VmVmIpListByVmIdApiArg
    >({
      query: (queryArg) => ({ url: `/user/v2/vm/vm-ip/list/${queryArg.vmId}` }),
    }),
    postUserV2VmVmIpCreate: build.mutation<
      PostUserV2VmVmIpCreateApiResponse,
      PostUserV2VmVmIpCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/vm-ip/create`,
        method: "POST",
        body: queryArg.createVmIpModel,
      }),
    }),
    deleteUserV2VmVmIpDeleteById: build.mutation<
      DeleteUserV2VmVmIpDeleteByIdApiResponse,
      DeleteUserV2VmVmIpDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/vm-ip/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postUserV2VmVmKmsGet: build.mutation<
      PostUserV2VmVmKmsGetApiResponse,
      PostUserV2VmVmKmsGetApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/vm/vm-kms/get`,
        method: "POST",
        body: queryArg.getKmsModel,
      }),
    }),
    getUserV2PortalWalletList: build.query<
      GetUserV2PortalWalletListApiResponse,
      GetUserV2PortalWalletListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/wallet/list` }),
    }),
    getUserV2PortalWalletGetBalance: build.query<
      GetUserV2PortalWalletGetBalanceApiResponse,
      GetUserV2PortalWalletGetBalanceApiArg
    >({
      query: () => ({ url: `/user/v2/portal/wallet/get-balance` }),
    }),
    getUserV2PortalWalletPaymentList: build.query<
      GetUserV2PortalWalletPaymentListApiResponse,
      GetUserV2PortalWalletPaymentListApiArg
    >({
      query: () => ({ url: `/user/v2/portal/wallet-payment/list` }),
    }),
    getUserV2PortalWalletPaymentGetById: build.query<
      GetUserV2PortalWalletPaymentGetByIdApiResponse,
      GetUserV2PortalWalletPaymentGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/wallet-payment/get/${queryArg.id}`,
      }),
    }),
    postUserV2PortalWalletPaymentCreate: build.mutation<
      PostUserV2PortalWalletPaymentCreateApiResponse,
      PostUserV2PortalWalletPaymentCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/wallet-payment/create`,
        method: "POST",
        body: queryArg.createPaymentModel,
      }),
    }),
    postUserV2PortalWalletPaymentPecCallBack: build.mutation<
      PostUserV2PortalWalletPaymentPecCallBackApiResponse,
      PostUserV2PortalWalletPaymentPecCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/wallet-payment/pec-call-back`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postUserV2PortalWalletPaymentSepCallBack: build.mutation<
      PostUserV2PortalWalletPaymentSepCallBackApiResponse,
      PostUserV2PortalWalletPaymentSepCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/portal/wallet-payment/sep-call-back`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getUserV2WebWebHostList: build.query<
      GetUserV2WebWebHostListApiResponse,
      GetUserV2WebWebHostListApiArg
    >({
      query: () => ({ url: `/user/v2/web/web-host/list` }),
    }),
    getUserV2WebWebHostGetById: build.query<
      GetUserV2WebWebHostGetByIdApiResponse,
      GetUserV2WebWebHostGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/web/web-host/get/${queryArg.id}`,
      }),
    }),
    getUserV2WebWebHostGetLoginSessionById: build.query<
      GetUserV2WebWebHostGetLoginSessionByIdApiResponse,
      GetUserV2WebWebHostGetLoginSessionByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/web/web-host/get-login-session/${queryArg.id}`,
      }),
    }),
    postUserV2WebWebHostCheckDomain: build.mutation<
      PostUserV2WebWebHostCheckDomainApiResponse,
      PostUserV2WebWebHostCheckDomainApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/web/web-host/check-domain`,
        method: "POST",
        body: queryArg.checkWebHostDomainModel,
      }),
    }),
    postUserV2WebWebHostCreate: build.mutation<
      PostUserV2WebWebHostCreateApiResponse,
      PostUserV2WebWebHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/web/web-host/create`,
        method: "POST",
        body: queryArg.createWebHostModel,
      }),
    }),
    putUserV2WebWebHostEdit: build.mutation<
      PutUserV2WebWebHostEditApiResponse,
      PutUserV2WebWebHostEditApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/web/web-host/edit`,
        method: "PUT",
        body: queryArg.editWebHostModel,
      }),
    }),
    deleteUserV2WebWebHostDeleteById: build.mutation<
      DeleteUserV2WebWebHostDeleteByIdApiResponse,
      DeleteUserV2WebWebHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/web/web-host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postUserV2DomainWhoisGet: build.mutation<
      PostUserV2DomainWhoisGetApiResponse,
      PostUserV2DomainWhoisGetApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/domain/whois/get`,
        method: "POST",
        body: queryArg.getDomainWhoisModel,
      }),
    }),
    getUserV2CdnZoneList: build.query<
      GetUserV2CdnZoneListApiResponse,
      GetUserV2CdnZoneListApiArg
    >({
      query: () => ({ url: `/user/v2/cdn/zone/list` }),
    }),
    getUserV2CdnZoneGetByZoneName: build.query<
      GetUserV2CdnZoneGetByZoneNameApiResponse,
      GetUserV2CdnZoneGetByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/zone/get/${queryArg.zoneName}`,
      }),
    }),
    getUserV2CdnZoneGetNsStatusByZoneName: build.query<
      GetUserV2CdnZoneGetNsStatusByZoneNameApiResponse,
      GetUserV2CdnZoneGetNsStatusByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/zone/get-ns-status/${queryArg.zoneName}`,
      }),
    }),
    getUserV2CdnZoneOverviewByZoneName: build.query<
      GetUserV2CdnZoneOverviewByZoneNameApiResponse,
      GetUserV2CdnZoneOverviewByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/zone/overview/${queryArg.zoneName}`,
      }),
    }),
    postUserV2CdnZoneCheckZone: build.mutation<
      PostUserV2CdnZoneCheckZoneApiResponse,
      PostUserV2CdnZoneCheckZoneApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/zone/check-zone`,
        method: "POST",
        body: queryArg.checkZoneModel,
      }),
    }),
    postUserV2CdnZoneCreate: build.mutation<
      PostUserV2CdnZoneCreateApiResponse,
      PostUserV2CdnZoneCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/zone/create`,
        method: "POST",
        body: queryArg.createZoneModel,
      }),
    }),
    deleteUserV2CdnZoneDeleteById: build.mutation<
      DeleteUserV2CdnZoneDeleteByIdApiResponse,
      DeleteUserV2CdnZoneDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/zone/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putUserV2CdnZoneChangeClientCertType: build.mutation<
      PutUserV2CdnZoneChangeClientCertTypeApiResponse,
      PutUserV2CdnZoneChangeClientCertTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/zone/change-client-cert-type`,
        method: "PUT",
        body: queryArg.changeClientCertTypeModel,
      }),
    }),
    putUserV2CdnZoneChangeEdgeCertType: build.mutation<
      PutUserV2CdnZoneChangeEdgeCertTypeApiResponse,
      PutUserV2CdnZoneChangeEdgeCertTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/zone/change-edge-cert-type`,
        method: "PUT",
        body: queryArg.changeEdgeCertTypeModel,
      }),
    }),
    putUserV2CdnZoneChangeHsts: build.mutation<
      PutUserV2CdnZoneChangeHstsApiResponse,
      PutUserV2CdnZoneChangeHstsApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/zone/change-hsts`,
        method: "PUT",
        body: queryArg.changeHstsModel,
      }),
    }),
    putUserV2CdnZoneChangeRedirect: build.mutation<
      PutUserV2CdnZoneChangeRedirectApiResponse,
      PutUserV2CdnZoneChangeRedirectApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/zone/change-redirect`,
        method: "PUT",
        body: queryArg.changeRedirectModel,
      }),
    }),
    putUserV2CdnZoneChangeZoneType: build.mutation<
      PutUserV2CdnZoneChangeZoneTypeApiResponse,
      PutUserV2CdnZoneChangeZoneTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/zone/change-zone-type`,
        method: "PUT",
        body: queryArg.changeZoneTypeModel,
      }),
    }),
    getUserV2CdnClientCertGetByZoneName: build.query<
      GetUserV2CdnClientCertGetByZoneNameApiResponse,
      GetUserV2CdnClientCertGetByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/client-cert/get/${queryArg.zoneName}`,
      }),
    }),
    getUserV2CdnClientCertGetUserCertByZoneName: build.query<
      GetUserV2CdnClientCertGetUserCertByZoneNameApiResponse,
      GetUserV2CdnClientCertGetUserCertByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/client-cert/get-user-cert/${queryArg.zoneName}`,
      }),
    }),
    postUserV2CdnClientCertCreateUserCert: build.mutation<
      PostUserV2CdnClientCertCreateUserCertApiResponse,
      PostUserV2CdnClientCertCreateUserCertApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/client-cert/create-user-cert`,
        method: "POST",
        body: queryArg.createUserZoneClientCertificateModel,
      }),
    }),
    getUserV2CdnEdgeCertGetByZoneName: build.query<
      GetUserV2CdnEdgeCertGetByZoneNameApiResponse,
      GetUserV2CdnEdgeCertGetByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/edge-cert/get/${queryArg.zoneName}`,
      }),
    }),
    getUserV2CdnEdgeCertGetUserCertByZoneName: build.query<
      GetUserV2CdnEdgeCertGetUserCertByZoneNameApiResponse,
      GetUserV2CdnEdgeCertGetUserCertByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/edge-cert/get-user-cert/${queryArg.zoneName}`,
      }),
    }),
    postUserV2CdnEdgeCertCreate: build.mutation<
      PostUserV2CdnEdgeCertCreateApiResponse,
      PostUserV2CdnEdgeCertCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/edge-cert/create`,
        method: "POST",
        body: queryArg.createZoneEdgeCertificateModel,
      }),
    }),
    postUserV2CdnEdgeCertCreateUserCert: build.mutation<
      PostUserV2CdnEdgeCertCreateUserCertApiResponse,
      PostUserV2CdnEdgeCertCreateUserCertApiArg
    >({
      query: (queryArg) => ({
        url: `/user/v2/cdn/edge-cert/create-user-cert`,
        method: "POST",
        body: queryArg.createUserZoneEdgeCertificateModel,
      }),
    }),
  }),
});
export type PostUserV2AccountLoginApiResponse =
  /** status 200 Success */ LoginResponseModel;
export type PostUserV2AccountLoginApiArg = {
  loginModel: LoginModel;
};
export type PostUserV2AccountRegisterApiResponse = unknown;
export type PostUserV2AccountRegisterApiArg = {
  registerModel: RegisterModel;
};
export type PostUserV2AccountForgotApiResponse = unknown;
export type PostUserV2AccountForgotApiArg = {
  forgotModel: ForgotModel;
};
export type PostUserV2AccountForgotConfirmApiResponse = unknown;
export type PostUserV2AccountForgotConfirmApiArg = {
  confirmForgotModel: ConfirmForgotModel;
};
export type PostUserV2AccountLogoutApiResponse = unknown;
export type PostUserV2AccountLogoutApiArg = void;
export type PostUserV2CdnAnalyticGetApiResponse =
  /** status 200 Success */ GetAnalyticResponseModel[];
export type PostUserV2CdnAnalyticGetApiArg = {
  getAnalyticModel: GetAnalyticModel;
};
export type GetUserV2CdnApiGatewayListByZoneNameApiResponse =
  /** status 200 Success */ ApiGatewayListResponse[];
export type GetUserV2CdnApiGatewayListByZoneNameApiArg = {
  zoneName: string;
};
export type GetUserV2CdnApiGatewayGetByIdApiResponse =
  /** status 200 Success */ GetApiGatewayResponse;
export type GetUserV2CdnApiGatewayGetByIdApiArg = {
  id: number;
};
export type PostUserV2CdnApiGatewayCreateApiResponse = unknown;
export type PostUserV2CdnApiGatewayCreateApiArg = {
  createApiGatewayModel: CreateApiGatewayModel;
};
export type PutUserV2CdnApiGatewayEditApiResponse = unknown;
export type PutUserV2CdnApiGatewayEditApiArg = {
  editApiGatewayModel: EditApiGatewayModel;
};
export type DeleteUserV2CdnApiGatewayDeleteByIdApiResponse = unknown;
export type DeleteUserV2CdnApiGatewayDeleteByIdApiArg = {
  id: number;
};
export type GetUserV2PortalUserBillListApiResponse =
  /** status 200 Success */ UserBillListResponseModel[];
export type GetUserV2PortalUserBillListApiArg = void;
export type GetUserV2PortalUserBillGetByIdApiResponse =
  /** status 200 Success */ GetUserBillResponseModel;
export type GetUserV2PortalUserBillGetByIdApiArg = {
  id: number;
};
export type GetUserV2PortalUserBillDownloadByIdApiResponse = unknown;
export type GetUserV2PortalUserBillDownloadByIdApiArg = {
  id: number;
};
export type GetUserV2PortalBusinessUnitListApiResponse =
  /** status 200 Success */ BusinessUnitListResponse[];
export type GetUserV2PortalBusinessUnitListApiArg = void;
export type GetUserV2PortalCalculateMonthListApiResponse =
  /** status 200 Success */ CalculateMonthListResponse[];
export type GetUserV2PortalCalculateMonthListApiArg = void;
export type GetUserV2PortalCommissionListApiResponse =
  /** status 200 Success */ CommissionListResponse;
export type GetUserV2PortalCommissionListApiArg = void;
export type GetUserV2PortalDashboardGetUserAnalyticsByCategoryIdApiResponse =
  /** status 200 Success */ GetUserAnalyticsResponseModel[];
export type GetUserV2PortalDashboardGetUserAnalyticsByCategoryIdApiArg = {
  categoryId: number;
};
export type GetUserV2PortalDashboardUserBillShortListApiResponse =
  /** status 200 Success */ UserBillShortListResponseModel[];
export type GetUserV2PortalDashboardUserBillShortListApiArg = void;
export type GetUserV2PortalDashboardSupportShortListApiResponse =
  /** status 200 Success */ SupportShortListModel[];
export type GetUserV2PortalDashboardSupportShortListApiArg = void;
export type GetUserV2VmDatacenterListApiResponse =
  /** status 200 Success */ DatacenterListResponse[];
export type GetUserV2VmDatacenterListApiArg = void;
export type GetUserV2VmImageListByDatacenterIdApiResponse =
  /** status 200 Success */ ImageListResponse[];
export type GetUserV2VmImageListByDatacenterIdApiArg = {
  datacenterId: number;
};
export type GetUserV2VmIsoListByDatacenterIdApiResponse =
  /** status 200 Success */ IsoListResponse[];
export type GetUserV2VmIsoListByDatacenterIdApiArg = {
  datacenterId: number;
};
export type PutUserV2VmIsoMountApiResponse = unknown;
export type PutUserV2VmIsoMountApiArg = {
  mountModel: MountModel;
};
export type PutUserV2VmIsoUnmountApiResponse = unknown;
export type PutUserV2VmIsoUnmountApiArg = {
  unmountModel: UnmountModel;
};
export type GetUserV2CdnDnsRecordListByZoneNameApiResponse =
  /** status 200 Success */ DnsHostListResponse[];
export type GetUserV2CdnDnsRecordListByZoneNameApiArg = {
  zoneName: string;
};
export type GetUserV2CdnDnsRecordGetByIdApiResponse =
  /** status 200 Success */ GetDnsHostResponse;
export type GetUserV2CdnDnsRecordGetByIdApiArg = {
  id: number;
};
export type PostUserV2CdnDnsRecordCreateApiResponse = unknown;
export type PostUserV2CdnDnsRecordCreateApiArg = {
  createDnsRecordModel: CreateDnsRecordModel;
};
export type PutUserV2CdnDnsRecordEditApiResponse = unknown;
export type PutUserV2CdnDnsRecordEditApiArg = {
  editDnsRecordModel: EditDnsRecordModel;
};
export type DeleteUserV2CdnDnsRecordDeleteByIdApiResponse = unknown;
export type DeleteUserV2CdnDnsRecordDeleteByIdApiArg = {
  id: number;
};
export type PutUserV2CdnDnsRecordChangeProxyStatusByIdApiResponse = unknown;
export type PutUserV2CdnDnsRecordChangeProxyStatusByIdApiArg = {
  id: number;
};
export type GetUserV2DomainListApiResponse =
  /** status 200 Success */ DomainListResponse[];
export type GetUserV2DomainListApiArg = void;
export type GetUserV2DomainGetByIdApiResponse =
  /** status 200 Success */ GetDomainResponse;
export type GetUserV2DomainGetByIdApiArg = {
  id: number;
};
export type GetUserV2DomainGetStatusByIdApiResponse =
  /** status 200 Success */ GetDomainResponse;
export type GetUserV2DomainGetStatusByIdApiArg = {
  id: number;
};
export type PostUserV2DomainGetPriceApiResponse =
  /** status 200 Success */ GetProductPriceResponse;
export type PostUserV2DomainGetPriceApiArg = {
  getPriceModel: GetPriceModel;
};
export type PostUserV2DomainRegisterApiResponse =
  /** status 200 Success */ number;
export type PostUserV2DomainRegisterApiArg = {
  registerDomainModel: RegisterDomainModel;
};
export type DeleteUserV2DomainDeleteByIdApiResponse = unknown;
export type DeleteUserV2DomainDeleteByIdApiArg = {
  id: number;
};
export type PutUserV2DomainChangeContactApiResponse = unknown;
export type PutUserV2DomainChangeContactApiArg = {
  changeContactModel: ChangeContactModel;
};
export type PutUserV2DomainChangeNsApiResponse = unknown;
export type PutUserV2DomainChangeNsApiArg = {
  changeNsModel: ChangeNsModel;
};
export type PostUserV2DomainResendVerificationByIdApiResponse = unknown;
export type PostUserV2DomainResendVerificationByIdApiArg = {
  id: number;
};
export type GetUserV2IndexApiResponse = unknown;
export type GetUserV2IndexApiArg = void;
export type GetUserV2HandshakeApiResponse = unknown;
export type GetUserV2HandshakeApiArg = void;
export type GetUserV2PortalUserServiceListByProductCategoryIdApiResponse =
  /** status 200 Success */ UserServiceListResponse[];
export type GetUserV2PortalUserServiceListByProductCategoryIdApiArg = {
  productCategoryId: number;
};
export type GetUserV2PortalInvoiceListApiResponse =
  /** status 200 Success */ InvoiceListResponse[];
export type GetUserV2PortalInvoiceListApiArg = void;
export type GetUserV2PortalInvoiceGetByIdApiResponse =
  /** status 200 Success */ GetInvoiceResponse;
export type GetUserV2PortalInvoiceGetByIdApiArg = {
  id: number;
};
export type GetUserV2CdnLoadBalanceListByZoneNameApiResponse =
  /** status 200 Success */ LoadBalanceListResponse[];
export type GetUserV2CdnLoadBalanceListByZoneNameApiArg = {
  zoneName: string;
};
export type GetUserV2CdnLoadBalanceGetByIdApiResponse =
  /** status 200 Success */ GetLoadBalanceResponse;
export type GetUserV2CdnLoadBalanceGetByIdApiArg = {
  id: number;
};
export type PostUserV2CdnLoadBalanceCreateApiResponse = unknown;
export type PostUserV2CdnLoadBalanceCreateApiArg = {
  createLoadBalanceModel: CreateLoadBalanceModel;
};
export type PutUserV2CdnLoadBalanceEditApiResponse = unknown;
export type PutUserV2CdnLoadBalanceEditApiArg = {
  editLoadBalanceModel: EditLoadBalanceModel;
};
export type DeleteUserV2CdnLoadBalanceDeleteByIdApiResponse = unknown;
export type DeleteUserV2CdnLoadBalanceDeleteByIdApiArg = {
  id: number;
};
export type GetUserV2LogSmsReceiveByFromAndTextToApiResponse = unknown;
export type GetUserV2LogSmsReceiveByFromAndTextToApiArg = {
  from: string;
  text: string;
  to: string;
};
export type GetUserV2PortalNotificationListApiResponse =
  /** status 200 Success */ NotificationListResponse[];
export type GetUserV2PortalNotificationListApiArg = void;
export type GetUserV2PortalNotificationShortListApiResponse =
  /** status 200 Success */ NotificationListResponse[];
export type GetUserV2PortalNotificationShortListApiArg = void;
export type GetUserV2PortalOrderListApiResponse =
  /** status 200 Success */ OrderListResponse[];
export type GetUserV2PortalOrderListApiArg = void;
export type GetUserV2PortalOrderGetByIdApiResponse =
  /** status 200 Success */ GetOrderResponse;
export type GetUserV2PortalOrderGetByIdApiArg = {
  id: number;
};
export type PutUserV2PortalOrderPaymentTypeApiResponse = unknown;
export type PutUserV2PortalOrderPaymentTypeApiArg = {
  orderPaymentTypeModel: OrderPaymentTypeModel;
};
export type PutUserV2PortalOrderDurationApiResponse = unknown;
export type PutUserV2PortalOrderDurationApiArg = {
  orderDurationModel: OrderDurationModel;
};
export type PutUserV2PortalOrderVoucherApiResponse = unknown;
export type PutUserV2PortalOrderVoucherApiArg = {
  orderVoucherModel: OrderVoucherModel;
};
export type PostUserV2PortalOrderPayApiResponse =
  /** status 200 Success */ OrderPayResponse;
export type PostUserV2PortalOrderPayApiArg = {
  orderPayModel: OrderPayModel;
};
export type GetUserV2PortalOrderPlanListApiResponse =
  /** status 200 Success */ OrderPlanListResponse[];
export type GetUserV2PortalOrderPlanListApiArg = void;
export type PostUserV2PortalOrderPlanOrderApiResponse = unknown;
export type PostUserV2PortalOrderPlanOrderApiArg = {
  createOrderPlanModel: CreateOrderPlanModel;
};
export type GetUserV2PortalProductBundleListByProductCategoryIdApiResponse =
  /** status 200 Success */ ProductBundleListResponse[];
export type GetUserV2PortalProductBundleListByProductCategoryIdApiArg = {
  productCategoryId: number;
};
export type GetUserV2PortalProductCategoryListApiResponse =
  /** status 200 Success */ ProductCategoryListResponse[];
export type GetUserV2PortalProductCategoryListApiArg = void;
export type GetUserV2PortalProfileGetApiResponse =
  /** status 200 Success */ GetProfileResponse;
export type GetUserV2PortalProfileGetApiArg = void;
export type PostUserV2PortalProfileGetNotificationStatusApiResponse =
  /** status 200 Success */ GetNotificationStatusResponse;
export type PostUserV2PortalProfileGetNotificationStatusApiArg = void;
export type PutUserV2PortalProfileEditApiResponse = unknown;
export type PutUserV2PortalProfileEditApiArg = {
  editProfileModel: EditProfileModel;
};
export type PutUserV2PortalProfileEditAccountTypeApiResponse = unknown;
export type PutUserV2PortalProfileEditAccountTypeApiArg = {
  editAccountTypeModel: EditAccountTypeModel;
};
export type PutUserV2PortalProfileEditEmailApiResponse = unknown;
export type PutUserV2PortalProfileEditEmailApiArg = {
  editEmailModel: EditEmailModel;
};
export type PostUserV2PortalProfileConfirmEmailApiResponse = unknown;
export type PostUserV2PortalProfileConfirmEmailApiArg = {
  confirmEmailModel: ConfirmEmailModel;
};
export type PutUserV2PortalProfileEditPhoneNumberApiResponse = unknown;
export type PutUserV2PortalProfileEditPhoneNumberApiArg = {
  editPhoneNumberModel: EditPhoneNumberModel;
};
export type PostUserV2PortalProfileConfirmPhoneNumberApiResponse = unknown;
export type PostUserV2PortalProfileConfirmPhoneNumberApiArg = {
  confirmPhoneNumberModel: ConfirmPhoneNumberModel;
};
export type PutUserV2PortalProfileEditEmailNotificationApiResponse = unknown;
export type PutUserV2PortalProfileEditEmailNotificationApiArg = {
  editEmailNotifyModel: EditEmailNotifyModel;
};
export type PutUserV2PortalProfileEditPhoneNotificationApiResponse = unknown;
export type PutUserV2PortalProfileEditPhoneNotificationApiArg = {
  editPhoneNotifyModel: EditPhoneNotifyModel;
};
export type PostUserV2PortalProfileChangePasswordApiResponse = unknown;
export type PostUserV2PortalProfileChangePasswordApiArg = {
  changePasswordModel: ChangePasswordModel;
};
export type GetUserV2RabbitRabbitHostListApiResponse =
  /** status 200 Success */ RabbitHostListResponse[];
export type GetUserV2RabbitRabbitHostListApiArg = void;
export type GetUserV2RabbitRabbitHostGetByIdApiResponse =
  /** status 200 Success */ GetRabbitHostResponse;
export type GetUserV2RabbitRabbitHostGetByIdApiArg = {
  id: number;
};
export type PostUserV2RabbitRabbitHostCreateApiResponse = unknown;
export type PostUserV2RabbitRabbitHostCreateApiArg = {
  createRabbitHostModel: CreateRabbitHostModel;
};
export type PutUserV2RabbitRabbitHostChangeServiceApiResponse = unknown;
export type PutUserV2RabbitRabbitHostChangeServiceApiArg = {
  editRabbitHostModel: EditRabbitHostModel;
};
export type DeleteUserV2RabbitRabbitHostDeleteByIdApiResponse = unknown;
export type DeleteUserV2RabbitRabbitHostDeleteByIdApiArg = {
  id: number;
};
export type PostUserV2RabbitRabbitHostChangeExchangeApiResponse = unknown;
export type PostUserV2RabbitRabbitHostChangeExchangeApiArg = {
  changeExchangeModel: ChangeExchangeModel;
};
export type GetUserV2RabbitRabbitUserListByRabbitHostIdApiResponse =
  /** status 200 Success */ RabbitHostUserListResponse[];
export type GetUserV2RabbitRabbitUserListByRabbitHostIdApiArg = {
  rabbitHostId: number;
};
export type PostUserV2RabbitRabbitUserCreateApiResponse = unknown;
export type PostUserV2RabbitRabbitUserCreateApiArg = {
  createRabbitUserModel: CreateRabbitUserModel;
};
export type DeleteUserV2RabbitRabbitUserDeleteByIdApiResponse = unknown;
export type DeleteUserV2RabbitRabbitUserDeleteByIdApiArg = {
  id: number;
};
export type PostUserV2RabbitRabbitUserChangePasswordApiResponse = unknown;
export type PostUserV2RabbitRabbitUserChangePasswordApiArg = {
  changeRabbitPasswordModel: ChangeRabbitPasswordModel;
};
export type GetUserV2SmsReceiveContentListApiResponse =
  /** status 200 Success */ SmsReceiveContentResponse[];
export type GetUserV2SmsReceiveContentListApiArg = void;
export type GetUserV2PortalReferralGetApiResponse =
  /** status 200 Success */ GetReferralResponse;
export type GetUserV2PortalReferralGetApiArg = void;
export type PostUserV2PortalReferralJoinApiResponse =
  /** status 200 Success */ JoinReferralResponse;
export type PostUserV2PortalReferralJoinApiArg = {
  joinReferralModel: JoinReferralModel;
};
export type GetUserV2SmsSendContentListApiResponse =
  /** status 200 Success */ SmsSendContentListResponse[];
export type GetUserV2SmsSendContentListApiArg = void;
export type PostUserV2SmsSendContentSendSmsApiResponse = unknown;
export type PostUserV2SmsSendContentSendSmsApiArg = {
  sendSmsModel: SendSmsModel;
};
export type PostUserV2SmsSendContentSend1ToNApiResponse = unknown;
export type PostUserV2SmsSendContentSend1ToNApiArg = {
  body: {
    FromNumber: string;
    Content: string;
    SmsDataFile: Blob;
  };
};
export type PostUserV2SmsSendContentSendNToNApiResponse = unknown;
export type PostUserV2SmsSendContentSendNToNApiArg = {
  body: {
    Source: string;
    SmsDataFile: Blob;
  };
};
export type PostUserV2SmsGatewaySendSmsApiResponse =
  /** status 200 Success */ SendSmsSmsGatewayResponse;
export type PostUserV2SmsGatewaySendSmsApiArg = {
  body: SendSmsGatewayModel[];
};
export type PostUserV2SmsGatewayReceiveSmsApiResponse = unknown;
export type PostUserV2SmsGatewayReceiveSmsApiArg = void;
export type GetUserV2SmsSmsNumberListApiResponse =
  /** status 200 Success */ SmsNumberListResponse[];
export type GetUserV2SmsSmsNumberListApiArg = void;
export type GetUserV2SmsSmsNumberHostListApiResponse =
  /** status 200 Success */ UserSmsNumberListResponse[];
export type GetUserV2SmsSmsNumberHostListApiArg = void;
export type PostUserV2SmsSmsNumberHostCreateApiResponse = unknown;
export type PostUserV2SmsSmsNumberHostCreateApiArg = {
  createUserSmsNumberModel: CreateUserSmsNumberModel;
};
export type DeleteUserV2SmsSmsNumberHostDeleteByIdApiResponse = unknown;
export type DeleteUserV2SmsSmsNumberHostDeleteByIdApiArg = {
  id: number;
};
export type GetUserV2PortalSupportListApiResponse =
  /** status 200 Success */ SupportListModel[];
export type GetUserV2PortalSupportListApiArg = void;
export type PostUserV2PortalSupportCreateApiResponse = unknown;
export type PostUserV2PortalSupportCreateApiArg = {
  body: {
    Content: string;
    BusinessUnitId: number;
    SupportSubjectId: number;
    HostProductId?: number;
    ProductCategoryId?: number;
    Attachment?: Blob;
  };
};
export type GetUserV2PortalSupportItemListBySupportIdApiResponse =
  /** status 200 Success */ SupportItemListResponse;
export type GetUserV2PortalSupportItemListBySupportIdApiArg = {
  supportId: number;
};
export type PostUserV2PortalSupportItemCreateApiResponse = unknown;
export type PostUserV2PortalSupportItemCreateApiArg = {
  body: {
    SupportId: number;
    Content: string;
    Attachment?: Blob;
  };
};
export type GetUserV2PortalSupportItemDownloadByIdApiResponse = unknown;
export type GetUserV2PortalSupportItemDownloadByIdApiArg = {
  id: number;
};
export type GetUserV2PortalSupportSubjectListApiResponse =
  /** status 200 Success */ SupportSubjectListResponse[];
export type GetUserV2PortalSupportSubjectListApiArg = void;
export type PostUserV2PortalSupportSubjectSelectListApiResponse =
  /** status 200 Success */ SupportSubjectListResponse[];
export type PostUserV2PortalSupportSubjectSelectListApiArg = {
  selectListModel: SelectListModel;
};
export type GetUserV2PortalUserApiKeyListApiResponse =
  /** status 200 Success */ UserApiKeyListResponse[];
export type GetUserV2PortalUserApiKeyListApiArg = void;
export type PostUserV2PortalUserApiKeyCreateApiResponse = unknown;
export type PostUserV2PortalUserApiKeyCreateApiArg = {
  createUserApiKeyModel: CreateUserApiKeyModel;
};
export type DeleteUserV2PortalUserApiKeyDeleteByIdApiResponse = unknown;
export type DeleteUserV2PortalUserApiKeyDeleteByIdApiArg = {
  id: number;
};
export type GetUserV2PortalUserCompanyGetApiResponse =
  /** status 200 Success */ GetUserCompanyResponse[];
export type GetUserV2PortalUserCompanyGetApiArg = void;
export type PutUserV2PortalUserCompanyEditApiResponse = unknown;
export type PutUserV2PortalUserCompanyEditApiArg = {
  editUserCompanyModel: EditUserCompanyModel;
};
export type GetUserV2SmsUserSmsCreditGetBalanceApiResponse =
  /** status 200 Success */ number;
export type GetUserV2SmsUserSmsCreditGetBalanceApiArg = void;
export type GetUserV2VmVmListApiResponse =
  /** status 200 Success */ VmListResponse[];
export type GetUserV2VmVmListApiArg = void;
export type GetUserV2VmVmGetByIdApiResponse =
  /** status 200 Success */ GetVmResponse;
export type GetUserV2VmVmGetByIdApiArg = {
  id: number;
};
export type PostUserV2VmVmCreateApiResponse = /** status 200 Success */ number;
export type PostUserV2VmVmCreateApiArg = {
  createVmModel: CreateVmModel;
};
export type PutUserV2VmVmEditApiResponse = unknown;
export type PutUserV2VmVmEditApiArg = {
  editVmModel: EditVmModel;
};
export type DeleteUserV2VmVmDeleteByIdApiResponse = unknown;
export type DeleteUserV2VmVmDeleteByIdApiArg = {
  id: number;
};
export type PutUserV2VmVmRebuildApiResponse = unknown;
export type PutUserV2VmVmRebuildApiArg = {
  rebuildVmModel: RebuildVmModel;
};
export type PutUserV2VmVmConnectByIdApiResponse = unknown;
export type PutUserV2VmVmConnectByIdApiArg = {
  id: number;
};
export type PutUserV2VmVmDisconnectByIdApiResponse = unknown;
export type PutUserV2VmVmDisconnectByIdApiArg = {
  id: number;
};
export type PutUserV2VmVmRebootByIdApiResponse = unknown;
export type PutUserV2VmVmRebootByIdApiArg = {
  id: number;
};
export type PutUserV2VmVmShutdownByIdApiResponse = unknown;
export type PutUserV2VmVmShutdownByIdApiArg = {
  id: number;
};
export type PutUserV2VmVmResetByIdApiResponse = unknown;
export type PutUserV2VmVmResetByIdApiArg = {
  id: number;
};
export type PutUserV2VmVmStartByIdApiResponse = unknown;
export type PutUserV2VmVmStartByIdApiArg = {
  id: number;
};
export type PutUserV2VmVmStopByIdApiResponse = unknown;
export type PutUserV2VmVmStopByIdApiArg = {
  id: number;
};
export type GetUserV2VmVmIpListByVmIdApiResponse =
  /** status 200 Success */ VmIpListResponse[];
export type GetUserV2VmVmIpListByVmIdApiArg = {
  vmId: number;
};
export type PostUserV2VmVmIpCreateApiResponse = unknown;
export type PostUserV2VmVmIpCreateApiArg = {
  createVmIpModel: CreateVmIpModel;
};
export type DeleteUserV2VmVmIpDeleteByIdApiResponse = unknown;
export type DeleteUserV2VmVmIpDeleteByIdApiArg = {
  id: number;
};
export type PostUserV2VmVmKmsGetApiResponse = /** status 200 Success */ string;
export type PostUserV2VmVmKmsGetApiArg = {
  getKmsModel: GetKmsModel;
};
export type GetUserV2PortalWalletListApiResponse =
  /** status 200 Success */ WalletListResponse[];
export type GetUserV2PortalWalletListApiArg = void;
export type GetUserV2PortalWalletGetBalanceApiResponse =
  /** status 200 Success */ number;
export type GetUserV2PortalWalletGetBalanceApiArg = void;
export type GetUserV2PortalWalletPaymentListApiResponse =
  /** status 200 Success */ WalletPaymentListResponse[];
export type GetUserV2PortalWalletPaymentListApiArg = void;
export type GetUserV2PortalWalletPaymentGetByIdApiResponse =
  /** status 200 Success */ WalletPaymentListResponse;
export type GetUserV2PortalWalletPaymentGetByIdApiArg = {
  id: number;
};
export type PostUserV2PortalWalletPaymentCreateApiResponse =
  /** status 200 Success */ CreateWalletPaymentResponse;
export type PostUserV2PortalWalletPaymentCreateApiArg = {
  createPaymentModel: CreatePaymentModel;
};
export type PostUserV2PortalWalletPaymentPecCallBackApiResponse = unknown;
export type PostUserV2PortalWalletPaymentPecCallBackApiArg = {
  body: {
    Token?: number;
    OrderId?: number;
    TerminalNo?: number;
    Rrn?: number;
    Status?: number;
    HashCardNumber?: string;
    Amount?: string;
    SwAmount?: string;
    STraceNo?: string;
  };
};
export type PostUserV2PortalWalletPaymentSepCallBackApiResponse = unknown;
export type PostUserV2PortalWalletPaymentSepCallBackApiArg = {
  body: {
    TerminalId?: number;
    State?: string;
    Status?: number;
    Rrn?: number;
    RefNum?: string;
    ResNum?: number;
    TraceNo?: number;
    Amount?: number;
    Wage?: number;
    SecurePan?: string;
    HashedCardNumber?: string;
  };
};
export type GetUserV2WebWebHostListApiResponse =
  /** status 200 Success */ WebHostListResponse[];
export type GetUserV2WebWebHostListApiArg = void;
export type GetUserV2WebWebHostGetByIdApiResponse =
  /** status 200 Success */ GetWebHostResponse;
export type GetUserV2WebWebHostGetByIdApiArg = {
  id: number;
};
export type GetUserV2WebWebHostGetLoginSessionByIdApiResponse =
  /** status 200 Success */ GetLoginSessionResponse;
export type GetUserV2WebWebHostGetLoginSessionByIdApiArg = {
  id: number;
};
export type PostUserV2WebWebHostCheckDomainApiResponse = unknown;
export type PostUserV2WebWebHostCheckDomainApiArg = {
  checkWebHostDomainModel: CheckWebHostDomainModel;
};
export type PostUserV2WebWebHostCreateApiResponse = unknown;
export type PostUserV2WebWebHostCreateApiArg = {
  createWebHostModel: CreateWebHostModel;
};
export type PutUserV2WebWebHostEditApiResponse = unknown;
export type PutUserV2WebWebHostEditApiArg = {
  editWebHostModel: EditWebHostModel;
};
export type DeleteUserV2WebWebHostDeleteByIdApiResponse = unknown;
export type DeleteUserV2WebWebHostDeleteByIdApiArg = {
  id: number;
};
export type PostUserV2DomainWhoisGetApiResponse = unknown;
export type PostUserV2DomainWhoisGetApiArg = {
  getDomainWhoisModel: GetDomainWhoisModel;
};
export type GetUserV2CdnZoneListApiResponse =
  /** status 200 Success */ ZoneListResponse[];
export type GetUserV2CdnZoneListApiArg = void;
export type GetUserV2CdnZoneGetByZoneNameApiResponse =
  /** status 200 Success */ GetZoneResponse;
export type GetUserV2CdnZoneGetByZoneNameApiArg = {
  zoneName: string;
};
export type GetUserV2CdnZoneGetNsStatusByZoneNameApiResponse =
  /** status 200 Success */ GetNsStatusResponse;
export type GetUserV2CdnZoneGetNsStatusByZoneNameApiArg = {
  zoneName: string;
};
export type GetUserV2CdnZoneOverviewByZoneNameApiResponse =
  /** status 200 Success */ OverviewResponse;
export type GetUserV2CdnZoneOverviewByZoneNameApiArg = {
  zoneName: string;
};
export type PostUserV2CdnZoneCheckZoneApiResponse = unknown;
export type PostUserV2CdnZoneCheckZoneApiArg = {
  checkZoneModel: CheckZoneModel;
};
export type PostUserV2CdnZoneCreateApiResponse = unknown;
export type PostUserV2CdnZoneCreateApiArg = {
  createZoneModel: CreateZoneModel;
};
export type DeleteUserV2CdnZoneDeleteByIdApiResponse = unknown;
export type DeleteUserV2CdnZoneDeleteByIdApiArg = {
  id: number;
};
export type PutUserV2CdnZoneChangeClientCertTypeApiResponse = unknown;
export type PutUserV2CdnZoneChangeClientCertTypeApiArg = {
  changeClientCertTypeModel: ChangeClientCertTypeModel;
};
export type PutUserV2CdnZoneChangeEdgeCertTypeApiResponse = unknown;
export type PutUserV2CdnZoneChangeEdgeCertTypeApiArg = {
  changeEdgeCertTypeModel: ChangeEdgeCertTypeModel;
};
export type PutUserV2CdnZoneChangeHstsApiResponse = unknown;
export type PutUserV2CdnZoneChangeHstsApiArg = {
  changeHstsModel: ChangeHstsModel;
};
export type PutUserV2CdnZoneChangeRedirectApiResponse = unknown;
export type PutUserV2CdnZoneChangeRedirectApiArg = {
  changeRedirectModel: ChangeRedirectModel;
};
export type PutUserV2CdnZoneChangeZoneTypeApiResponse = unknown;
export type PutUserV2CdnZoneChangeZoneTypeApiArg = {
  changeZoneTypeModel: ChangeZoneTypeModel;
};
export type GetUserV2CdnClientCertGetByZoneNameApiResponse =
  /** status 200 Success */ GetZoneClientCertificateResponse;
export type GetUserV2CdnClientCertGetByZoneNameApiArg = {
  zoneName: string;
};
export type GetUserV2CdnClientCertGetUserCertByZoneNameApiResponse =
  /** status 200 Success */ GetZoneClientUserCertificateResponse;
export type GetUserV2CdnClientCertGetUserCertByZoneNameApiArg = {
  zoneName: string;
};
export type PostUserV2CdnClientCertCreateUserCertApiResponse = unknown;
export type PostUserV2CdnClientCertCreateUserCertApiArg = {
  createUserZoneClientCertificateModel: CreateUserZoneClientCertificateModel;
};
export type GetUserV2CdnEdgeCertGetByZoneNameApiResponse =
  /** status 200 Success */ GetZoneEdgeCertificateResponse;
export type GetUserV2CdnEdgeCertGetByZoneNameApiArg = {
  zoneName: string;
};
export type GetUserV2CdnEdgeCertGetUserCertByZoneNameApiResponse =
  /** status 200 Success */ GetZoneEdgeUserCertificateResponse;
export type GetUserV2CdnEdgeCertGetUserCertByZoneNameApiArg = {
  zoneName: string;
};
export type PostUserV2CdnEdgeCertCreateApiResponse = unknown;
export type PostUserV2CdnEdgeCertCreateApiArg = {
  createZoneEdgeCertificateModel: CreateZoneEdgeCertificateModel;
};
export type PostUserV2CdnEdgeCertCreateUserCertApiResponse = unknown;
export type PostUserV2CdnEdgeCertCreateUserCertApiArg = {
  createUserZoneEdgeCertificateModel: CreateUserZoneEdgeCertificateModel;
};
export type LoginResponseModel = {
  accessToken?: string | null;
  expiration?: string;
  userTitle?: string | null;
};
export type LoginModel = {
  email: string;
  password: string;
};
export type RegisterModel = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  referralCode?: string | null;
};
export type ForgotModel = {
  email: string;
};
export type ConfirmForgotModel = {
  email: string;
  confirmCode: string;
  password: string;
};
export type GetAnalyticResponseModel = {
  data?: number[] | null;
  name?: string | null;
};
export type GetAnalyticModel = {
  periodId?: number;
  zoneName?: string | null;
};
export type ApiGatewayListResponse = {
  id?: number;
  host?: string | null;
  path?: string | null;
  loadBalancingPolicy?: string | null;
  maxConnectionsPerServer?: number;
};
export type DestinationModel = {
  address: string;
};
export type GetApiGatewayResponse = {
  id?: number;
  host?: string | null;
  path?: string | null;
  maxConnectionsPerServer?: number;
  loadBalancingPolicyId?: number;
  dangerousAcceptAnyServerCertificate?: boolean;
  destinations?: DestinationModel[] | null;
};
export type CreateApiGatewayModel = {
  zoneName: string;
  host: string;
  path: string;
  destinations: DestinationModel[];
  loadBalancingPolicyId: number;
  maxConnectionsPerServer: number;
  dangerousAcceptAnyServerCertificate: boolean;
};
export type EditApiGatewayModel = {
  id?: number;
  path: string;
  destinations?: DestinationModel[] | null;
  loadBalancingPolicyId: number;
  maxConnectionsPerServer: number;
  dangerousAcceptAnyServerCertificate: boolean;
};
export type UserBillListResponseModel = {
  id?: number;
  billDate?: string;
  netPrice?: number;
  vat?: number;
  totalPrice?: number;
};
export type UserBillItemsModel = {
  productCategory?: string | null;
  userProduct?: string | null;
  createDate?: string;
  price?: number;
  duration?: number;
};
export type GetUserBillResponseModel = {
  id?: number;
  name?: string | null;
  billDate?: string;
  netPrice?: number;
  vat?: number;
  totalPrice?: number;
  userBillItems?: UserBillItemsModel[] | null;
};
export type BusinessUnitListResponse = {
  id?: number;
  name?: string | null;
};
export type CalculateMonthListResponse = {
  id?: number;
  name?: string | null;
};
export type CommissionListResponse = {
  id?: number;
  orderId?: number;
  totalPrice?: number;
  commissionPrice?: number;
  commissionDate?: string;
};
export type GetUserAnalyticsResponseModel = {
  data?: number[] | null;
  name?: string | null;
};
export type UserBillShortListResponseModel = {
  id?: number;
  billDate?: string;
  totalPrice?: number;
};
export type SupportShortListModel = {
  id?: number;
  supportDate?: string;
  supportSubject?: string | null;
  supportStatus?: string | null;
};
export type DatacenterListResponse = {
  id?: number;
  name?: string | null;
};
export type ImageListResponse = {
  id?: number;
  name?: string | null;
  osId?: number;
  os?: string | null;
};
export type IsoListResponse = {
  id?: number;
  name?: string | null;
};
export type MountModel = {
  id?: number;
  vmId?: number;
};
export type UnmountModel = {
  id?: number;
  vmId?: number;
};
export type DnsHostListResponse = {
  id?: number;
  name?: string | null;
  type?: string | null;
  ttl?: string | null;
  value?: string | null;
  useProxy?: boolean;
};
export type GetDnsHostResponse = {
  id?: number;
  name?: string | null;
  type?: string | null;
  ttl?: string | null;
  value?: string | null;
  preference?: string | null;
  flags?: string | null;
  tag?: string | null;
  priority?: string | null;
  weight?: string | null;
  port?: string | null;
  target?: string | null;
  authority?: string | null;
  useProxy?: boolean;
  isSystemRecord?: boolean;
};
export type CreateDnsRecordModel = {
  zoneName: string;
  name: string;
  type: string;
  ttl: string;
  value: string;
  useProxy?: boolean;
  preference?: string | null;
  flags?: string | null;
  tag?: string | null;
  priority?: string | null;
  weight?: string | null;
  port?: string | null;
  target?: string | null;
  authority?: string | null;
};
export type EditDnsRecordModel = {
  zoneName: string;
  name: string;
  type: string;
  ttl: string;
  value: string;
  useProxy?: boolean;
  preference?: string | null;
  flags?: string | null;
  tag?: string | null;
  priority?: string | null;
  weight?: string | null;
  port?: string | null;
  target?: string | null;
  authority?: string | null;
  id?: number;
};
export type DomainListResponse = {
  id?: number;
  domainName?: string | null;
  status?: string | null;
  statusId?: number;
  type?: string | null;
  ns1?: string | null;
  ns2?: string | null;
  createDate?: string;
  expireDate?: string | null;
};
export type GetDomainResponse = {
  id?: number;
  domainName?: string | null;
  status?: string | null;
  statusId?: number;
  type?: string | null;
  createDate?: string;
  expireDate?: string | null;
  name?: string | null;
  organization?: string | null;
  country?: string | null;
  province?: string | null;
  city?: string | null;
  street?: string | null;
  postalCode?: string | null;
  voice?: string | null;
  fax?: string | null;
  email?: string | null;
  autoRenewal?: boolean;
  isPremium?: boolean;
  ns1?: string | null;
  ns2?: string | null;
};
export type GetProductPriceResponse = {
  productPrice?: number;
};
export type GetPriceModel = {
  domainName: string;
  ext: string;
  typeId: number;
  authCode?: string | null;
};
export type RegisterDomainModel = {
  domainName: string;
  ext: string;
  typeId: number;
  authCode?: string | null;
  name: string;
  country: string;
  province: string;
  city: string;
  street: string;
  postalCode: string;
  voice: string;
  fax?: string | null;
  ns1: string;
  ns2: string;
  autoRenewal: boolean;
  activeCdn: boolean;
};
export type ChangeContactModel = {
  id: number;
  name: string;
  country: string;
  province: string;
  city: string;
  street: string;
  postalCode: string;
  voice: string;
  fax?: string | null;
  email: string;
};
export type ChangeNsModel = {
  id?: number;
  ns1: string;
  ns2: string;
};
export type UserServiceListResponse = {
  id?: number;
  name?: string | null;
  productName?: string | null;
  status?: string | null;
  createDate?: string;
};
export type InvoiceListResponse = {
  id?: number;
  invoiceDate?: string;
  createDate?: string;
  netPrice?: number;
  discount?: number;
  vat?: number;
  totalPrice?: number;
  invoicePrice?: number;
  invoiceStatusId?: number;
};
export type InvoiceItemModel = {
  product?: string | null;
  quantity?: number;
  price?: number;
  totalPrice?: number;
};
export type GetInvoiceResponse = {
  id?: number;
  invoicePaymentTypeId?: number;
  productCategory?: string | null;
  name?: string | null;
  prepaidStatus?: string | null;
  isPrepaid?: boolean;
  hostProductDurationId?: number | null;
  sellerName?: string | null;
  sellerAddress?: string | null;
  sellerPhone?: string | null;
  customerName?: string | null;
  customerAddress?: string | null;
  customerPhone?: string | null;
  invoiceStatusId?: number;
  invoiceStatus?: string | null;
  invoiceDate?: string;
  createDate?: string;
  netPrice?: number;
  discount?: number;
  totalPrice?: number;
  vat?: number;
  invoicePrice?: number;
  invoiceItems?: InvoiceItemModel[] | null;
};
export type LoadBalanceListResponse = {
  id?: number;
  host?: string | null;
  path?: string | null;
  loadBalancingPolicy?: string | null;
  maxConnectionsPerServer?: number;
};
export type GetLoadBalanceResponse = {
  id?: number;
  host?: string | null;
  maxConnectionsPerServer?: number;
  loadBalancingPolicyId?: number;
  dangerousAcceptAnyServerCertificate?: boolean;
  destinations?: DestinationModel[] | null;
};
export type CreateLoadBalanceModel = {
  zoneName: string;
  host: string;
  destinations?: DestinationModel[] | null;
  loadBalancingPolicyId: number;
  maxConnectionsPerServer: number;
  dangerousAcceptAnyServerCertificate: boolean;
};
export type EditLoadBalanceModel = {
  id: number;
  host: string;
  destinations?: DestinationModel[] | null;
  loadBalancingPolicyId: number;
  maxConnectionsPerServer: number;
  dangerousAcceptAnyServerCertificate: boolean;
};
export type NotificationListResponse = {
  id?: number;
  content?: string | null;
  subject?: string | null;
  notificationDate?: string;
};
export type OrderListResponse = {
  id?: number;
  name?: string | null;
  productName?: string | null;
  orderType?: string | null;
  orderStatus?: string | null;
  orderStatusId?: number;
  orderDate?: string;
};
export type GetOrderResponse = {
  id?: number;
  orderPaymentTypeId?: number;
  productCategory?: string | null;
  name?: string | null;
  prepaidStatus?: string | null;
  isPrepaid?: boolean;
  orderDurationId?: number | null;
  orderStatus?: string | null;
  orderStatusId?: number;
  orderDate?: string;
  createDate?: string;
  netPrice?: number;
  discount?: number;
  totalPrice?: number;
  vat?: number;
  orderPrice?: number;
  minPrice?: number;
};
export type OrderPaymentTypeModel = {
  id?: number;
  isPrepaid?: boolean;
};
export type OrderDurationModel = {
  id?: number;
  orderDurationId?: number;
};
export type OrderVoucherModel = {
  id?: number;
  voucherCode?: string | null;
};
export type OrderPayResponse = {
  orderPaymentTypeId?: number;
  status?: boolean;
  location?: string | null;
};
export type OrderPayModel = {
  id?: number;
  orderPaymentTypeId?: number;
  paymentProviderId?: number;
};
export type OrderPlanListResponse = {
  id?: number;
  listOrder?: number;
  title?: string | null;
  price?: number;
  discount?: number;
  totalCredit?: number;
};
export type CreateOrderPlanModel = {
  id?: number;
  paymentProviderId?: number;
};
export type ProductBundleListResponse = {
  id?: number;
  name?: string | null;
  description?: string | null;
  price?: number;
};
export type ProductCategoryListResponse = {
  id?: number;
  name?: string | null;
};
export type GetProfileResponse = {
  id?: string;
  phoneNumber?: string | null;
  phoneNumberConfirmed?: boolean;
  email?: string | null;
  emailConfirmed?: boolean;
  idConfirmed?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  nationalId?: string | null;
  birthDate?: string | null;
  address?: string | null;
  isLegal?: boolean;
};
export type GetNotificationStatusResponse = {
  id?: string;
  phoneNotify?: boolean;
  emailNotify?: boolean;
};
export type EditProfileModel = {
  firstName: string;
  lastName: string;
  nationalId: string;
  birthDate: string;
  address: string;
};
export type EditAccountTypeModel = {
  isLegal?: boolean;
};
export type EditEmailModel = {
  email: string;
};
export type ConfirmEmailModel = {
  confirmCode: string;
};
export type EditPhoneNumberModel = {
  phoneNumber: string;
};
export type ConfirmPhoneNumberModel = {
  confirmCode: string;
};
export type EditEmailNotifyModel = {
  emailNotify: boolean;
};
export type EditPhoneNotifyModel = {
  phoneNotify: boolean;
};
export type ChangePasswordModel = {
  oldPassword: string;
  newPassword: string;
};
export type RabbitHostListResponse = {
  id?: number;
  datacenter?: string | null;
  name?: string | null;
  status?: string | null;
  statusId?: number;
  createDate?: string;
};
export type GetRabbitHostResponse = {
  id?: number;
  datacenterId?: number;
  datacenter?: string | null;
  name?: string | null;
  statusId?: number;
  status?: string | null;
  createDate?: string;
};
export type CreateRabbitHostModel = {
  name: string;
  username: string;
  password: string;
  datacenterId?: number;
  productBundleId?: number;
};
export type EditRabbitHostModel = {
  id?: number;
  productBundleId?: number;
};
export type ChangeExchangeModel = {
  id?: number;
};
export type RabbitHostUserListResponse = {
  id?: number;
  userName?: string | null;
};
export type CreateRabbitUserModel = {
  rabbitHostId?: number;
  username: string;
  password: string;
};
export type ChangeRabbitPasswordModel = {
  id?: number;
  password: string;
};
export type SmsReceiveContentResponse = {
  id?: number;
  operator?: string | null;
  receiveDate?: string;
  source?: string | null;
  destination?: string | null;
  content?: string | null;
};
export type GetReferralResponse = {
  isJoined?: boolean;
  joinCode?: string | null;
  referralCode?: string | null;
  referralLink?: string | null;
};
export type JoinReferralResponse = {
  status?: boolean;
  messages?: string | null;
};
export type JoinReferralModel = {
  referralCode: string;
};
export type SmsSendContentListResponse = {
  id?: number;
  sendContentStatus?: string | null;
  sendDate?: string;
  source?: string | null;
  destination?: string | null;
  content?: string | null;
};
export type SendSmsModel = {
  fromNumber: string;
  toNumber: string;
  content: string;
};
export type SendSmsSmsGatewayResponse = {
  status?: boolean;
  message?: string | null;
  recId?: number[] | null;
};
export type SendSmsGatewayModel = {
  fromNumber: string;
  toNumber: string;
  content: string;
};
export type SmsNumberListResponse = {
  id?: number;
  smsNumber?: string | null;
};
export type UserSmsNumberListResponse = {
  id?: number;
  smsNumber?: string | null;
  createDate?: string;
};
export type CreateUserSmsNumberModel = {
  id: number;
};
export type SupportListModel = {
  id?: number;
  supportDate?: string;
  supportSubject?: string | null;
  businessUnit?: string | null;
  supportStatus?: string | null;
  supportStatusId?: number;
};
export type SupportItemTransactionModel = {
  id?: number;
  supportDate?: string;
  content?: string | null;
  user?: string | null;
  roleId?: number;
  fileName?: string | null;
  fileSize?: number | null;
};
export type SupportItemListResponse = {
  supportId?: number;
  supportDate?: string;
  supportSubject?: string | null;
  supportStatusId?: number;
  transaction?: SupportItemTransactionModel[] | null;
};
export type SupportSubjectListResponse = {
  id?: number;
  name?: string | null;
};
export type SelectListModel = {
  productCategoryId?: number;
  businessUnitId?: number;
};
export type UserApiKeyListResponse = {
  id?: number;
  title?: string | null;
  apiKey?: string | null;
};
export type CreateUserApiKeyModel = {
  title: string;
};
export type GetUserCompanyResponse = {
  name?: string | null;
  nationalId?: string | null;
  businessPhone?: string | null;
  address?: string | null;
  postalCode?: string | null;
};
export type EditUserCompanyModel = {
  name: string;
  nationalId: string;
  businessPhone: string;
  address: string;
  postalCode: string;
};
export type VmListResponse = {
  id?: number;
  name?: string | null;
  status?: string | null;
  statusId?: number;
  datacenter?: string | null;
  operatingSystem?: string | null;
  cpu?: number;
  memory?: number;
  disk?: number;
  ipv4?: string | null;
  createDate?: string;
};
export type GetVmResponse = {
  id?: number;
  datacenterId?: number;
  name?: string | null;
  status?: string | null;
  statusId?: number;
  cpu?: number;
  memory?: number;
  disk?: number;
  macAddress?: string | null;
  ip?: string | null;
  operatingSystem?: string | null;
  powerStatus?: string | null;
  networkStatus?: string | null;
};
export type CreateVmModel = {
  name: string;
  password: string;
  imageId: number;
  productBundleId: number;
  datacenterId: number;
};
export type EditVmModel = {
  id?: number;
  cpu?: number;
  memory?: number;
  disk?: number;
};
export type RebuildVmModel = {
  id?: number;
  name?: string | null;
  password: string;
  imageId: number;
};
export type VmIpListResponse = {
  id?: number;
  ip?: string | null;
  isV4?: boolean;
  isPrimary?: boolean;
};
export type CreateVmIpModel = object;
export type GetKmsModel = {
  id?: number;
  typeId?: number;
};
export type WalletListResponse = {
  id?: number;
  transactionDate?: string;
  credit?: number;
  debit?: number;
  balance?: number;
  description?: string | null;
};
export type WalletPaymentListResponse = {
  id?: number;
  transactionDate?: string;
  amount?: number;
  rrn?: number | null;
  hashCardNumber?: string | null;
  paymentStatus?: string | null;
  paymentStatusId?: number;
  paymentProvider?: string | null;
  paymentProviderId?: number;
  finalStatus?: boolean;
};
export type CreateWalletPaymentResponse = {
  status?: boolean;
  location?: string | null;
};
export type CreatePaymentModel = {
  paymentProviderId?: number;
  amount: number;
  orderPlanId?: number | null;
  voucherCode?: string | null;
};
export type WebHostListResponse = {
  id?: number;
  datacenter?: string | null;
  domainName?: string | null;
  status?: string | null;
  statusId?: number;
  createDate?: string;
  expireDate?: string | null;
};
export type GetWebHostResponse = {
  id?: number;
  datacenter?: string | null;
  domainName?: string | null;
  status?: string | null;
  statusId?: number;
  createDate?: string;
  expireDate?: string | null;
};
export type GetLoginSessionResponse = {
  location?: string | null;
};
export type CheckWebHostDomainModel = {
  domainName: string;
};
export type CreateWebHostModel = {
  domainName: string;
  datacenterId?: number;
  productBundleId?: number;
};
export type EditWebHostModel = {
  id?: number;
  productBundleId?: number;
};
export type GetDomainWhoisModel = {
  domainName: string;
  ext: string;
};
export type ZoneListResponse = {
  id?: number;
  zoneName?: string | null;
  zoneStatus?: string | null;
  zoneStatusId?: number;
  createDate?: string;
};
export type GetZoneResponse = {
  id?: number;
  zoneStatusId?: number;
  zoneTypeId?: number;
  zoneEdgeCertTypeId?: number;
  zoneClientCertTypeId?: number;
  isHsts?: boolean;
  isRedirect?: boolean;
};
export type GetNsStatusResponse = {
  status?: boolean;
  ns?: string[] | null;
  cloudNs?: string[] | null;
};
export type OverviewResponse = {
  id?: number;
  domainName?: string | null;
  statusId?: number;
  status?: string | null;
  createDate?: string;
};
export type CheckZoneModel = {
  zoneName: string;
};
export type CreateZoneModel = {
  zoneName: string;
};
export type ChangeClientCertTypeModel = {
  id?: number;
  zoneClientCertTypeId?: number;
};
export type ChangeEdgeCertTypeModel = {
  id?: number;
  zoneEdgeCertTypeId?: number;
};
export type ChangeHstsModel = {
  id?: number;
  isHsts?: boolean;
};
export type ChangeRedirectModel = {
  id?: number;
  isRedirect?: boolean;
};
export type ChangeZoneTypeModel = {
  id?: number;
  zoneTypeId?: number;
};
export type GetZoneClientCertificateResponse = {
  issuer?: string | null;
  commonName?: string | null;
  expirationDate?: string | null;
};
export type GetZoneClientUserCertificateResponse = {
  issuer?: string | null;
  commonName?: string | null;
  expirationDate?: string | null;
};
export type CreateUserZoneClientCertificateModel = {
  zoneName: string;
  keyPem: string;
  certPem: string;
};
export type GetZoneEdgeCertificateResponse = {
  issuer?: string | null;
  commonName?: string | null;
  expirationDate?: string | null;
};
export type GetZoneEdgeUserCertificateResponse = {
  issuer?: string | null;
  commonName?: string | null;
  expirationDate?: string | null;
};
export type CreateZoneEdgeCertificateModel = {
  zoneName: string;
};
export type CreateUserZoneEdgeCertificateModel = {
  zoneName: string;
  keyPem: string;
  certPem: string;
  bundleCertPem?: string | null;
};
export const {
  usePostUserV2AccountLoginMutation,
  usePostUserV2AccountRegisterMutation,
  usePostUserV2AccountForgotMutation,
  usePostUserV2AccountForgotConfirmMutation,
  usePostUserV2AccountLogoutMutation,
  usePostUserV2CdnAnalyticGetMutation,
  useGetUserV2CdnApiGatewayListByZoneNameQuery,
  useGetUserV2CdnApiGatewayGetByIdQuery,
  usePostUserV2CdnApiGatewayCreateMutation,
  usePutUserV2CdnApiGatewayEditMutation,
  useDeleteUserV2CdnApiGatewayDeleteByIdMutation,
  useGetUserV2PortalUserBillListQuery,
  useGetUserV2PortalUserBillGetByIdQuery,
  useGetUserV2PortalUserBillDownloadByIdQuery,
  useGetUserV2PortalBusinessUnitListQuery,
  useGetUserV2PortalCalculateMonthListQuery,
  useGetUserV2PortalCommissionListQuery,
  useGetUserV2PortalDashboardGetUserAnalyticsByCategoryIdQuery,
  useGetUserV2PortalDashboardUserBillShortListQuery,
  useGetUserV2PortalDashboardSupportShortListQuery,
  useGetUserV2VmDatacenterListQuery,
  useGetUserV2VmImageListByDatacenterIdQuery,
  useGetUserV2VmIsoListByDatacenterIdQuery,
  usePutUserV2VmIsoMountMutation,
  usePutUserV2VmIsoUnmountMutation,
  useGetUserV2CdnDnsRecordListByZoneNameQuery,
  useGetUserV2CdnDnsRecordGetByIdQuery,
  usePostUserV2CdnDnsRecordCreateMutation,
  usePutUserV2CdnDnsRecordEditMutation,
  useDeleteUserV2CdnDnsRecordDeleteByIdMutation,
  usePutUserV2CdnDnsRecordChangeProxyStatusByIdMutation,
  useGetUserV2DomainListQuery,
  useGetUserV2DomainGetByIdQuery,
  useGetUserV2DomainGetStatusByIdQuery,
  usePostUserV2DomainGetPriceMutation,
  usePostUserV2DomainRegisterMutation,
  useDeleteUserV2DomainDeleteByIdMutation,
  usePutUserV2DomainChangeContactMutation,
  usePutUserV2DomainChangeNsMutation,
  usePostUserV2DomainResendVerificationByIdMutation,
  useGetUserV2IndexQuery,
  useGetUserV2HandshakeQuery,
  useGetUserV2PortalUserServiceListByProductCategoryIdQuery,
  useGetUserV2PortalInvoiceListQuery,
  useGetUserV2PortalInvoiceGetByIdQuery,
  useGetUserV2CdnLoadBalanceListByZoneNameQuery,
  useGetUserV2CdnLoadBalanceGetByIdQuery,
  usePostUserV2CdnLoadBalanceCreateMutation,
  usePutUserV2CdnLoadBalanceEditMutation,
  useDeleteUserV2CdnLoadBalanceDeleteByIdMutation,
  useGetUserV2LogSmsReceiveByFromAndTextToQuery,
  useGetUserV2PortalNotificationListQuery,
  useGetUserV2PortalNotificationShortListQuery,
  useGetUserV2PortalOrderListQuery,
  useGetUserV2PortalOrderGetByIdQuery,
  usePutUserV2PortalOrderPaymentTypeMutation,
  usePutUserV2PortalOrderDurationMutation,
  usePutUserV2PortalOrderVoucherMutation,
  usePostUserV2PortalOrderPayMutation,
  useGetUserV2PortalOrderPlanListQuery,
  usePostUserV2PortalOrderPlanOrderMutation,
  useGetUserV2PortalProductBundleListByProductCategoryIdQuery,
  useGetUserV2PortalProductCategoryListQuery,
  useGetUserV2PortalProfileGetQuery,
  usePostUserV2PortalProfileGetNotificationStatusMutation,
  usePutUserV2PortalProfileEditMutation,
  usePutUserV2PortalProfileEditAccountTypeMutation,
  usePutUserV2PortalProfileEditEmailMutation,
  usePostUserV2PortalProfileConfirmEmailMutation,
  usePutUserV2PortalProfileEditPhoneNumberMutation,
  usePostUserV2PortalProfileConfirmPhoneNumberMutation,
  usePutUserV2PortalProfileEditEmailNotificationMutation,
  usePutUserV2PortalProfileEditPhoneNotificationMutation,
  usePostUserV2PortalProfileChangePasswordMutation,
  useGetUserV2RabbitRabbitHostListQuery,
  useGetUserV2RabbitRabbitHostGetByIdQuery,
  usePostUserV2RabbitRabbitHostCreateMutation,
  usePutUserV2RabbitRabbitHostChangeServiceMutation,
  useDeleteUserV2RabbitRabbitHostDeleteByIdMutation,
  usePostUserV2RabbitRabbitHostChangeExchangeMutation,
  useGetUserV2RabbitRabbitUserListByRabbitHostIdQuery,
  usePostUserV2RabbitRabbitUserCreateMutation,
  useDeleteUserV2RabbitRabbitUserDeleteByIdMutation,
  usePostUserV2RabbitRabbitUserChangePasswordMutation,
  useGetUserV2SmsReceiveContentListQuery,
  useGetUserV2PortalReferralGetQuery,
  usePostUserV2PortalReferralJoinMutation,
  useGetUserV2SmsSendContentListQuery,
  usePostUserV2SmsSendContentSendSmsMutation,
  usePostUserV2SmsSendContentSend1ToNMutation,
  usePostUserV2SmsSendContentSendNToNMutation,
  usePostUserV2SmsGatewaySendSmsMutation,
  usePostUserV2SmsGatewayReceiveSmsMutation,
  useGetUserV2SmsSmsNumberListQuery,
  useGetUserV2SmsSmsNumberHostListQuery,
  usePostUserV2SmsSmsNumberHostCreateMutation,
  useDeleteUserV2SmsSmsNumberHostDeleteByIdMutation,
  useGetUserV2PortalSupportListQuery,
  usePostUserV2PortalSupportCreateMutation,
  useGetUserV2PortalSupportItemListBySupportIdQuery,
  usePostUserV2PortalSupportItemCreateMutation,
  useGetUserV2PortalSupportItemDownloadByIdQuery,
  useGetUserV2PortalSupportSubjectListQuery,
  usePostUserV2PortalSupportSubjectSelectListMutation,
  useGetUserV2PortalUserApiKeyListQuery,
  usePostUserV2PortalUserApiKeyCreateMutation,
  useDeleteUserV2PortalUserApiKeyDeleteByIdMutation,
  useGetUserV2PortalUserCompanyGetQuery,
  usePutUserV2PortalUserCompanyEditMutation,
  useGetUserV2SmsUserSmsCreditGetBalanceQuery,
  useGetUserV2VmVmListQuery,
  useGetUserV2VmVmGetByIdQuery,
  usePostUserV2VmVmCreateMutation,
  usePutUserV2VmVmEditMutation,
  useDeleteUserV2VmVmDeleteByIdMutation,
  usePutUserV2VmVmRebuildMutation,
  usePutUserV2VmVmConnectByIdMutation,
  usePutUserV2VmVmDisconnectByIdMutation,
  usePutUserV2VmVmRebootByIdMutation,
  usePutUserV2VmVmShutdownByIdMutation,
  usePutUserV2VmVmResetByIdMutation,
  usePutUserV2VmVmStartByIdMutation,
  usePutUserV2VmVmStopByIdMutation,
  useGetUserV2VmVmIpListByVmIdQuery,
  usePostUserV2VmVmIpCreateMutation,
  useDeleteUserV2VmVmIpDeleteByIdMutation,
  usePostUserV2VmVmKmsGetMutation,
  useGetUserV2PortalWalletListQuery,
  useGetUserV2PortalWalletGetBalanceQuery,
  useGetUserV2PortalWalletPaymentListQuery,
  useGetUserV2PortalWalletPaymentGetByIdQuery,
  usePostUserV2PortalWalletPaymentCreateMutation,
  usePostUserV2PortalWalletPaymentPecCallBackMutation,
  usePostUserV2PortalWalletPaymentSepCallBackMutation,
  useGetUserV2WebWebHostListQuery,
  useGetUserV2WebWebHostGetByIdQuery,
  useGetUserV2WebWebHostGetLoginSessionByIdQuery,
  usePostUserV2WebWebHostCheckDomainMutation,
  usePostUserV2WebWebHostCreateMutation,
  usePutUserV2WebWebHostEditMutation,
  useDeleteUserV2WebWebHostDeleteByIdMutation,
  usePostUserV2DomainWhoisGetMutation,
  useGetUserV2CdnZoneListQuery,
  useGetUserV2CdnZoneGetByZoneNameQuery,
  useGetUserV2CdnZoneGetNsStatusByZoneNameQuery,
  useGetUserV2CdnZoneOverviewByZoneNameQuery,
  usePostUserV2CdnZoneCheckZoneMutation,
  usePostUserV2CdnZoneCreateMutation,
  useDeleteUserV2CdnZoneDeleteByIdMutation,
  usePutUserV2CdnZoneChangeClientCertTypeMutation,
  usePutUserV2CdnZoneChangeEdgeCertTypeMutation,
  usePutUserV2CdnZoneChangeHstsMutation,
  usePutUserV2CdnZoneChangeRedirectMutation,
  usePutUserV2CdnZoneChangeZoneTypeMutation,
  useGetUserV2CdnClientCertGetByZoneNameQuery,
  useGetUserV2CdnClientCertGetUserCertByZoneNameQuery,
  usePostUserV2CdnClientCertCreateUserCertMutation,
  useGetUserV2CdnEdgeCertGetByZoneNameQuery,
  useGetUserV2CdnEdgeCertGetUserCertByZoneNameQuery,
  usePostUserV2CdnEdgeCertCreateMutation,
  usePostUserV2CdnEdgeCertCreateUserCertMutation,
} = api;

