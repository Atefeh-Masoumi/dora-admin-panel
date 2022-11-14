import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "src/app/services/baseQuery";
export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: (build) => ({
    postApiV2AccountLogin: build.mutation<
      PostApiV2AccountLoginApiResponse,
      PostApiV2AccountLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/account/login`,
        method: "POST",
        body: queryArg.loginModel,
      }),
    }),
    postApiV2AccountRegister: build.mutation<
      PostApiV2AccountRegisterApiResponse,
      PostApiV2AccountRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/account/register`,
        method: "POST",
        body: queryArg.registerModel,
      }),
    }),
    postApiV2AccountForgot: build.mutation<
      PostApiV2AccountForgotApiResponse,
      PostApiV2AccountForgotApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/account/forgot`,
        method: "POST",
        body: queryArg.forgotModel,
      }),
    }),
    postApiV2AccountForgotConfirm: build.mutation<
      PostApiV2AccountForgotConfirmApiResponse,
      PostApiV2AccountForgotConfirmApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/account/forgot-confirm`,
        method: "POST",
        body: queryArg.confirmForgotModel,
      }),
    }),
    postApiV2AccountLogout: build.mutation<
      PostApiV2AccountLogoutApiResponse,
      PostApiV2AccountLogoutApiArg
    >({
      query: () => ({ url: `/api/v2/account/logout`, method: "POST" }),
    }),
    postApiV2CdnAnalyticGet: build.mutation<
      PostApiV2CdnAnalyticGetApiResponse,
      PostApiV2CdnAnalyticGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/analytic/get`,
        method: "POST",
        body: queryArg.getAnalyticModel,
      }),
    }),
    getApiV2CdnApiGatewayListByZoneName: build.query<
      GetApiV2CdnApiGatewayListByZoneNameApiResponse,
      GetApiV2CdnApiGatewayListByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/api-gateway/list/${queryArg.zoneName}`,
      }),
    }),
    getApiV2CdnApiGatewayGetById: build.query<
      GetApiV2CdnApiGatewayGetByIdApiResponse,
      GetApiV2CdnApiGatewayGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/api-gateway/get/${queryArg.id}`,
      }),
    }),
    postApiV2CdnApiGatewayCreate: build.mutation<
      PostApiV2CdnApiGatewayCreateApiResponse,
      PostApiV2CdnApiGatewayCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/api-gateway/create`,
        method: "POST",
        body: queryArg.createApiGatewayModel,
      }),
    }),
    putApiV2CdnApiGatewayEdit: build.mutation<
      PutApiV2CdnApiGatewayEditApiResponse,
      PutApiV2CdnApiGatewayEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/api-gateway/edit`,
        method: "PUT",
        body: queryArg.editApiGatewayModel,
      }),
    }),
    deleteApiV2CdnApiGatewayDeleteById: build.mutation<
      DeleteApiV2CdnApiGatewayDeleteByIdApiResponse,
      DeleteApiV2CdnApiGatewayDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/api-gateway/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiV2PortalBusinessUnitList: build.query<
      GetApiV2PortalBusinessUnitListApiResponse,
      GetApiV2PortalBusinessUnitListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/business-unit/list` }),
    }),
    getApiV2PortalCalculateMonthList: build.query<
      GetApiV2PortalCalculateMonthListApiResponse,
      GetApiV2PortalCalculateMonthListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/calculate-month/list` }),
    }),
    getApiV2PortalCommissionList: build.query<
      GetApiV2PortalCommissionListApiResponse,
      GetApiV2PortalCommissionListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/commission/list` }),
    }),
    getApiV2PortalDashboardGetUserAnalyticsByCategoryId: build.query<
      GetApiV2PortalDashboardGetUserAnalyticsByCategoryIdApiResponse,
      GetApiV2PortalDashboardGetUserAnalyticsByCategoryIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/dashboard/get-user-analytics/${queryArg.categoryId}`,
      }),
    }),
    getApiV2PortalDashboardUserBillShortList: build.query<
      GetApiV2PortalDashboardUserBillShortListApiResponse,
      GetApiV2PortalDashboardUserBillShortListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/dashboard/user-bill-short-list` }),
    }),
    getApiV2PortalDashboardSupportShortList: build.query<
      GetApiV2PortalDashboardSupportShortListApiResponse,
      GetApiV2PortalDashboardSupportShortListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/dashboard/support-short-list` }),
    }),
    getApiV2VmDatacenterList: build.query<
      GetApiV2VmDatacenterListApiResponse,
      GetApiV2VmDatacenterListApiArg
    >({
      query: () => ({ url: `/api/v2/vm/datacenter/list` }),
    }),
    getApiV2VmImageListByDatacenterId: build.query<
      GetApiV2VmImageListByDatacenterIdApiResponse,
      GetApiV2VmImageListByDatacenterIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/image/list/${queryArg.datacenterId}`,
      }),
    }),
    getApiV2VmIsoListByDatacenterId: build.query<
      GetApiV2VmIsoListByDatacenterIdApiResponse,
      GetApiV2VmIsoListByDatacenterIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/iso/list/${queryArg.datacenterId}`,
      }),
    }),
    putApiV2VmIsoMount: build.mutation<
      PutApiV2VmIsoMountApiResponse,
      PutApiV2VmIsoMountApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/iso/mount`,
        method: "PUT",
        body: queryArg.mountModel,
      }),
    }),
    putApiV2VmIsoUnmount: build.mutation<
      PutApiV2VmIsoUnmountApiResponse,
      PutApiV2VmIsoUnmountApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/iso/unmount`,
        method: "PUT",
        body: queryArg.unmountModel,
      }),
    }),
    getApiV2CdnDnsRecordListByZoneName: build.query<
      GetApiV2CdnDnsRecordListByZoneNameApiResponse,
      GetApiV2CdnDnsRecordListByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/dns-record/list/${queryArg.zoneName}`,
      }),
    }),
    getApiV2CdnDnsRecordGetById: build.query<
      GetApiV2CdnDnsRecordGetByIdApiResponse,
      GetApiV2CdnDnsRecordGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/dns-record/get/${queryArg.id}`,
      }),
    }),
    postApiV2CdnDnsRecordCreate: build.mutation<
      PostApiV2CdnDnsRecordCreateApiResponse,
      PostApiV2CdnDnsRecordCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/dns-record/create`,
        method: "POST",
        body: queryArg.createDnsRecordModel,
      }),
    }),
    putApiV2CdnDnsRecordEdit: build.mutation<
      PutApiV2CdnDnsRecordEditApiResponse,
      PutApiV2CdnDnsRecordEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/dns-record/edit`,
        method: "PUT",
        body: queryArg.editDnsRecordModel,
      }),
    }),
    deleteApiV2CdnDnsRecordDeleteById: build.mutation<
      DeleteApiV2CdnDnsRecordDeleteByIdApiResponse,
      DeleteApiV2CdnDnsRecordDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/dns-record/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putApiV2CdnDnsRecordChangeProxyStatusById: build.mutation<
      PutApiV2CdnDnsRecordChangeProxyStatusByIdApiResponse,
      PutApiV2CdnDnsRecordChangeProxyStatusByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/dns-record/change-proxy-status/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiV2DomainList: build.query<
      GetApiV2DomainListApiResponse,
      GetApiV2DomainListApiArg
    >({
      query: () => ({ url: `/api/v2/domain/list` }),
    }),
    getApiV2DomainGetById: build.query<
      GetApiV2DomainGetByIdApiResponse,
      GetApiV2DomainGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v2/domain/get/${queryArg.id}` }),
    }),
    getApiV2DomainGetStatusById: build.query<
      GetApiV2DomainGetStatusByIdApiResponse,
      GetApiV2DomainGetStatusByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/domain/get-status/${queryArg.id}`,
      }),
    }),
    postApiV2DomainGetPrice: build.mutation<
      PostApiV2DomainGetPriceApiResponse,
      PostApiV2DomainGetPriceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/domain/get-price`,
        method: "POST",
        body: queryArg.getPriceModel,
      }),
    }),
    getApiV2DomainPayById: build.query<
      GetApiV2DomainPayByIdApiResponse,
      GetApiV2DomainPayByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v2/domain/pay/${queryArg.id}` }),
    }),
    postApiV2DomainRegister: build.mutation<
      PostApiV2DomainRegisterApiResponse,
      PostApiV2DomainRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/domain/register`,
        method: "POST",
        body: queryArg.registerDomainModel,
      }),
    }),
    putApiV2DomainDeleteById: build.mutation<
      PutApiV2DomainDeleteByIdApiResponse,
      PutApiV2DomainDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/domain/delete/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiV2DomainChangeContact: build.mutation<
      PutApiV2DomainChangeContactApiResponse,
      PutApiV2DomainChangeContactApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/domain/change-contact`,
        method: "PUT",
        body: queryArg.changeContactModel,
      }),
    }),
    putApiV2DomainChangeNs: build.mutation<
      PutApiV2DomainChangeNsApiResponse,
      PutApiV2DomainChangeNsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/domain/change-ns`,
        method: "PUT",
        body: queryArg.changeNsModel,
      }),
    }),
    postApiV2DomainResendVerificationById: build.mutation<
      PostApiV2DomainResendVerificationByIdApiResponse,
      PostApiV2DomainResendVerificationByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/domain/resend-verification/${queryArg.id}`,
        method: "POST",
      }),
    }),
    get: build.query<GetApiResponse, GetApiArg>({
      query: () => ({ url: `/` }),
    }),
    getApiV2PortalInvoiceList: build.query<
      GetApiV2PortalInvoiceListApiResponse,
      GetApiV2PortalInvoiceListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/invoice/list` }),
    }),
    getApiV2PortalInvoiceGetById: build.query<
      GetApiV2PortalInvoiceGetByIdApiResponse,
      GetApiV2PortalInvoiceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/invoice/get/${queryArg.id}`,
      }),
    }),
    getApiV2CdnLoadBalanceListByZoneName: build.query<
      GetApiV2CdnLoadBalanceListByZoneNameApiResponse,
      GetApiV2CdnLoadBalanceListByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/load-balance/list/${queryArg.zoneName}`,
      }),
    }),
    getApiV2CdnLoadBalanceGetById: build.query<
      GetApiV2CdnLoadBalanceGetByIdApiResponse,
      GetApiV2CdnLoadBalanceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/load-balance/get/${queryArg.id}`,
      }),
    }),
    postApiV2CdnLoadBalanceCreate: build.mutation<
      PostApiV2CdnLoadBalanceCreateApiResponse,
      PostApiV2CdnLoadBalanceCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/load-balance/create`,
        method: "POST",
        body: queryArg.createLoadBalanceModel,
      }),
    }),
    putApiV2CdnLoadBalanceEdit: build.mutation<
      PutApiV2CdnLoadBalanceEditApiResponse,
      PutApiV2CdnLoadBalanceEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/load-balance/edit`,
        method: "PUT",
        body: queryArg.editLoadBalanceModel,
      }),
    }),
    deleteApiV2CdnLoadBalanceDeleteById: build.mutation<
      DeleteApiV2CdnLoadBalanceDeleteByIdApiResponse,
      DeleteApiV2CdnLoadBalanceDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/load-balance/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiV2LogSmsReceiveByFromAndTextTo: build.query<
      GetApiV2LogSmsReceiveByFromAndTextToApiResponse,
      GetApiV2LogSmsReceiveByFromAndTextToApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/log-sms/receive/${queryArg["from"]}/${queryArg.text}/${queryArg.to}`,
      }),
    }),
    getApiV2PortalNotificationList: build.query<
      GetApiV2PortalNotificationListApiResponse,
      GetApiV2PortalNotificationListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/notification/list` }),
    }),
    getApiV2PortalNotificationShortList: build.query<
      GetApiV2PortalNotificationShortListApiResponse,
      GetApiV2PortalNotificationShortListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/notification/short-list` }),
    }),
    getApiV2PortalOrderListByProductCategoryId: build.query<
      GetApiV2PortalOrderListByProductCategoryIdApiResponse,
      GetApiV2PortalOrderListByProductCategoryIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/order/list/${queryArg.productCategoryId}`,
      }),
    }),
    getApiV2PortalOrderNotPaidList: build.query<
      GetApiV2PortalOrderNotPaidListApiResponse,
      GetApiV2PortalOrderNotPaidListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/order/not-paid-list` }),
    }),
    getApiV2PortalOrderShortListByProductCategoryId: build.query<
      GetApiV2PortalOrderShortListByProductCategoryIdApiResponse,
      GetApiV2PortalOrderShortListByProductCategoryIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/order/short-list/${queryArg.productCategoryId}`,
      }),
    }),
    getApiV2PortalOrderGetById: build.query<
      GetApiV2PortalOrderGetByIdApiResponse,
      GetApiV2PortalOrderGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v2/portal/order/get/${queryArg.id}` }),
    }),
    putApiV2PortalOrderPaymentType: build.mutation<
      PutApiV2PortalOrderPaymentTypeApiResponse,
      PutApiV2PortalOrderPaymentTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/order/payment-type`,
        method: "PUT",
        body: queryArg.orderPaymentTypeModel,
      }),
    }),
    putApiV2PortalOrderDuration: build.mutation<
      PutApiV2PortalOrderDurationApiResponse,
      PutApiV2PortalOrderDurationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/order/duration`,
        method: "PUT",
        body: queryArg.orderDurationModel,
      }),
    }),
    putApiV2PortalOrderVoucher: build.mutation<
      PutApiV2PortalOrderVoucherApiResponse,
      PutApiV2PortalOrderVoucherApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/order/voucher`,
        method: "PUT",
        body: queryArg.orderVoucherModel,
      }),
    }),
    putApiV2PortalOrderCancelById: build.mutation<
      PutApiV2PortalOrderCancelByIdApiResponse,
      PutApiV2PortalOrderCancelByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/order/cancel/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    postApiV2PortalOrderPay: build.mutation<
      PostApiV2PortalOrderPayApiResponse,
      PostApiV2PortalOrderPayApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/order/pay`,
        method: "POST",
        body: queryArg.orderPayModel,
      }),
    }),
    getApiV2PortalOrderPlanList: build.query<
      GetApiV2PortalOrderPlanListApiResponse,
      GetApiV2PortalOrderPlanListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/order-plan/list` }),
    }),
    postApiV2PortalOrderPlanOrder: build.mutation<
      PostApiV2PortalOrderPlanOrderApiResponse,
      PostApiV2PortalOrderPlanOrderApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/order-plan/order`,
        method: "POST",
        body: queryArg.createOrderPlanModel,
      }),
    }),
    getApiV2PortalProductBundleListByProductCategoryId: build.query<
      GetApiV2PortalProductBundleListByProductCategoryIdApiResponse,
      GetApiV2PortalProductBundleListByProductCategoryIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/product-bundle/list/${queryArg.productCategoryId}`,
      }),
    }),
    getApiV2PortalProductCategoryList: build.query<
      GetApiV2PortalProductCategoryListApiResponse,
      GetApiV2PortalProductCategoryListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/product-category/list` }),
    }),
    getApiV2PortalProfileGet: build.query<
      GetApiV2PortalProfileGetApiResponse,
      GetApiV2PortalProfileGetApiArg
    >({
      query: () => ({ url: `/api/v2/portal/profile/get` }),
    }),
    postApiV2PortalProfileGetNotificationStatus: build.mutation<
      PostApiV2PortalProfileGetNotificationStatusApiResponse,
      PostApiV2PortalProfileGetNotificationStatusApiArg
    >({
      query: () => ({
        url: `/api/v2/portal/profile/get-notification-status`,
        method: "POST",
      }),
    }),
    putApiV2PortalProfileEdit: build.mutation<
      PutApiV2PortalProfileEditApiResponse,
      PutApiV2PortalProfileEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/profile/edit`,
        method: "PUT",
        body: queryArg.editProfileModel,
      }),
    }),
    putApiV2PortalProfileEditAccountType: build.mutation<
      PutApiV2PortalProfileEditAccountTypeApiResponse,
      PutApiV2PortalProfileEditAccountTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/profile/edit-account-type`,
        method: "PUT",
        body: queryArg.editAccountTypeModel,
      }),
    }),
    putApiV2PortalProfileEditEmail: build.mutation<
      PutApiV2PortalProfileEditEmailApiResponse,
      PutApiV2PortalProfileEditEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/profile/edit-email`,
        method: "PUT",
        body: queryArg.editEmailModel,
      }),
    }),
    postApiV2PortalProfileConfirmEmail: build.mutation<
      PostApiV2PortalProfileConfirmEmailApiResponse,
      PostApiV2PortalProfileConfirmEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/profile/confirm-email`,
        method: "POST",
        body: queryArg.confirmEmailModel,
      }),
    }),
    putApiV2PortalProfileEditPhoneNumber: build.mutation<
      PutApiV2PortalProfileEditPhoneNumberApiResponse,
      PutApiV2PortalProfileEditPhoneNumberApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/profile/edit-phone-number`,
        method: "PUT",
        body: queryArg.editPhoneNumberModel,
      }),
    }),
    postApiV2PortalProfileConfirmPhoneNumber: build.mutation<
      PostApiV2PortalProfileConfirmPhoneNumberApiResponse,
      PostApiV2PortalProfileConfirmPhoneNumberApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/profile/confirm-phone-number`,
        method: "POST",
        body: queryArg.confirmPhoneNumberModel,
      }),
    }),
    putApiV2PortalProfileEditEmailNotification: build.mutation<
      PutApiV2PortalProfileEditEmailNotificationApiResponse,
      PutApiV2PortalProfileEditEmailNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/profile/edit-email-notification`,
        method: "PUT",
        body: queryArg.editEmailNotifyModel,
      }),
    }),
    putApiV2PortalProfileEditPhoneNotification: build.mutation<
      PutApiV2PortalProfileEditPhoneNotificationApiResponse,
      PutApiV2PortalProfileEditPhoneNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/profile/edit-phone-notification`,
        method: "PUT",
        body: queryArg.editPhoneNotifyModel,
      }),
    }),
    postApiV2PortalProfileChangePassword: build.mutation<
      PostApiV2PortalProfileChangePasswordApiResponse,
      PostApiV2PortalProfileChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/profile/change-password`,
        method: "POST",
        body: queryArg.changePasswordModel,
      }),
    }),
    getApiV2RabbitRabbitHostList: build.query<
      GetApiV2RabbitRabbitHostListApiResponse,
      GetApiV2RabbitRabbitHostListApiArg
    >({
      query: () => ({ url: `/api/v2/rabbit/rabbit-host/list` }),
    }),
    getApiV2RabbitRabbitHostGetById: build.query<
      GetApiV2RabbitRabbitHostGetByIdApiResponse,
      GetApiV2RabbitRabbitHostGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/rabbit/rabbit-host/get/${queryArg.id}`,
      }),
    }),
    getApiV2RabbitRabbitHostPayById: build.query<
      GetApiV2RabbitRabbitHostPayByIdApiResponse,
      GetApiV2RabbitRabbitHostPayByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/rabbit/rabbit-host/pay/${queryArg.id}`,
      }),
    }),
    postApiV2RabbitRabbitHostCreate: build.mutation<
      PostApiV2RabbitRabbitHostCreateApiResponse,
      PostApiV2RabbitRabbitHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/rabbit/rabbit-host/create`,
        method: "POST",
        body: queryArg.createRabbitHostModel,
      }),
    }),
    putApiV2RabbitRabbitHostChangeService: build.mutation<
      PutApiV2RabbitRabbitHostChangeServiceApiResponse,
      PutApiV2RabbitRabbitHostChangeServiceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/rabbit/rabbit-host/change-service`,
        method: "PUT",
        body: queryArg.editRabbitHostModel,
      }),
    }),
    deleteApiV2RabbitRabbitHostDeleteById: build.mutation<
      DeleteApiV2RabbitRabbitHostDeleteByIdApiResponse,
      DeleteApiV2RabbitRabbitHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/rabbit/rabbit-host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiV2RabbitRabbitHostChangeExchange: build.mutation<
      PostApiV2RabbitRabbitHostChangeExchangeApiResponse,
      PostApiV2RabbitRabbitHostChangeExchangeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/rabbit/rabbit-host/change-exchange`,
        method: "POST",
        body: queryArg.changeExchangeModel,
      }),
    }),
    getApiV2RabbitRabbitUserListByRabbitHostId: build.query<
      GetApiV2RabbitRabbitUserListByRabbitHostIdApiResponse,
      GetApiV2RabbitRabbitUserListByRabbitHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/rabbit/rabbit-user/list/${queryArg.rabbitHostId}`,
      }),
    }),
    postApiV2RabbitRabbitUserCreate: build.mutation<
      PostApiV2RabbitRabbitUserCreateApiResponse,
      PostApiV2RabbitRabbitUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/rabbit/rabbit-user/create`,
        method: "POST",
        body: queryArg.createRabbitUserModel,
      }),
    }),
    deleteApiV2RabbitRabbitUserDeleteById: build.mutation<
      DeleteApiV2RabbitRabbitUserDeleteByIdApiResponse,
      DeleteApiV2RabbitRabbitUserDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/rabbit/rabbit-user/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiV2RabbitRabbitUserChangePassword: build.mutation<
      PostApiV2RabbitRabbitUserChangePasswordApiResponse,
      PostApiV2RabbitRabbitUserChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/rabbit/rabbit-user/change-password`,
        method: "POST",
        body: queryArg.changeRabbitPasswordModel,
      }),
    }),
    getApiV2SmsReceiveContentList: build.query<
      GetApiV2SmsReceiveContentListApiResponse,
      GetApiV2SmsReceiveContentListApiArg
    >({
      query: () => ({ url: `/api/v2/sms/receive-content/list` }),
    }),
    getApiV2PortalReferralGet: build.query<
      GetApiV2PortalReferralGetApiResponse,
      GetApiV2PortalReferralGetApiArg
    >({
      query: () => ({ url: `/api/v2/portal/referral/get` }),
    }),
    postApiV2PortalReferralJoin: build.mutation<
      PostApiV2PortalReferralJoinApiResponse,
      PostApiV2PortalReferralJoinApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/referral/join`,
        method: "POST",
        body: queryArg.joinReferralModel,
      }),
    }),
    getApiV2SmsSendContentList: build.query<
      GetApiV2SmsSendContentListApiResponse,
      GetApiV2SmsSendContentListApiArg
    >({
      query: () => ({ url: `/api/v2/sms/send-content/list` }),
    }),
    postApiV2SmsSendContentSendSms: build.mutation<
      PostApiV2SmsSendContentSendSmsApiResponse,
      PostApiV2SmsSendContentSendSmsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/sms/send-content/send-sms`,
        method: "POST",
        body: queryArg.sendSmsModel,
      }),
    }),
    postApiV2SmsSendContentSend1ToN: build.mutation<
      PostApiV2SmsSendContentSend1ToNApiResponse,
      PostApiV2SmsSendContentSend1ToNApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/sms/send-content/send-1-to-n`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postApiV2SmsSendContentSendNToN: build.mutation<
      PostApiV2SmsSendContentSendNToNApiResponse,
      PostApiV2SmsSendContentSendNToNApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/sms/send-content/send-n-to-n`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postApiV2SmsGatewaySendSms: build.mutation<
      PostApiV2SmsGatewaySendSmsApiResponse,
      PostApiV2SmsGatewaySendSmsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/sms/gateway/send-sms`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postApiV2SmsGatewayReceiveSms: build.mutation<
      PostApiV2SmsGatewayReceiveSmsApiResponse,
      PostApiV2SmsGatewayReceiveSmsApiArg
    >({
      query: () => ({ url: `/api/v2/sms/gateway/receive-sms`, method: "POST" }),
    }),
    getApiV2SmsSmsNumberList: build.query<
      GetApiV2SmsSmsNumberListApiResponse,
      GetApiV2SmsSmsNumberListApiArg
    >({
      query: () => ({ url: `/api/v2/sms/sms-number/list` }),
    }),
    getApiV2SmsSmsNumberHostList: build.query<
      GetApiV2SmsSmsNumberHostListApiResponse,
      GetApiV2SmsSmsNumberHostListApiArg
    >({
      query: () => ({ url: `/api/v2/sms/sms-number-host/list` }),
    }),
    postApiV2SmsSmsNumberHostCreate: build.mutation<
      PostApiV2SmsSmsNumberHostCreateApiResponse,
      PostApiV2SmsSmsNumberHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/sms/sms-number-host/create`,
        method: "POST",
        body: queryArg.createUserSmsNumberModel,
      }),
    }),
    deleteApiV2SmsSmsNumberHostDeleteById: build.mutation<
      DeleteApiV2SmsSmsNumberHostDeleteByIdApiResponse,
      DeleteApiV2SmsSmsNumberHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/sms/sms-number-host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiV2PortalSupportList: build.query<
      GetApiV2PortalSupportListApiResponse,
      GetApiV2PortalSupportListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/support/list` }),
    }),
    postApiV2PortalSupportCreate: build.mutation<
      PostApiV2PortalSupportCreateApiResponse,
      PostApiV2PortalSupportCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/support/create`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiV2PortalSupportItemListBySupportId: build.query<
      GetApiV2PortalSupportItemListBySupportIdApiResponse,
      GetApiV2PortalSupportItemListBySupportIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/support-item/list/${queryArg.supportId}`,
      }),
    }),
    postApiV2PortalSupportItemCreate: build.mutation<
      PostApiV2PortalSupportItemCreateApiResponse,
      PostApiV2PortalSupportItemCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/support-item/create`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiV2PortalSupportItemDownloadById: build.query<
      GetApiV2PortalSupportItemDownloadByIdApiResponse,
      GetApiV2PortalSupportItemDownloadByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/support-item/download/${queryArg.id}`,
      }),
    }),
    getApiV2PortalSupportSubjectList: build.query<
      GetApiV2PortalSupportSubjectListApiResponse,
      GetApiV2PortalSupportSubjectListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/support-subject/list` }),
    }),
    postApiV2PortalSupportSubjectSelectList: build.mutation<
      PostApiV2PortalSupportSubjectSelectListApiResponse,
      PostApiV2PortalSupportSubjectSelectListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/support-subject/select-list`,
        method: "POST",
        body: queryArg.selectListModel,
      }),
    }),
    getApiV2PortalUserApiKeyList: build.query<
      GetApiV2PortalUserApiKeyListApiResponse,
      GetApiV2PortalUserApiKeyListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/user-api-key/list` }),
    }),
    postApiV2PortalUserApiKeyCreate: build.mutation<
      PostApiV2PortalUserApiKeyCreateApiResponse,
      PostApiV2PortalUserApiKeyCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/user-api-key/create`,
        method: "POST",
        body: queryArg.createUserApiKeyModel,
      }),
    }),
    deleteApiV2PortalUserApiKeyDeleteById: build.mutation<
      DeleteApiV2PortalUserApiKeyDeleteByIdApiResponse,
      DeleteApiV2PortalUserApiKeyDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/user-api-key/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiV2PortalUserBillList: build.query<
      GetApiV2PortalUserBillListApiResponse,
      GetApiV2PortalUserBillListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/user-bill/list` }),
    }),
    getApiV2PortalUserBillGetById: build.query<
      GetApiV2PortalUserBillGetByIdApiResponse,
      GetApiV2PortalUserBillGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/user-bill/get/${queryArg.id}`,
      }),
    }),
    getApiV2PortalUserBillDownloadById: build.query<
      GetApiV2PortalUserBillDownloadByIdApiResponse,
      GetApiV2PortalUserBillDownloadByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/user-bill/download/${queryArg.id}`,
      }),
    }),
    getApiV2PortalUserCompanyGet: build.query<
      GetApiV2PortalUserCompanyGetApiResponse,
      GetApiV2PortalUserCompanyGetApiArg
    >({
      query: () => ({ url: `/api/v2/portal/user-company/get` }),
    }),
    putApiV2PortalUserCompanyEdit: build.mutation<
      PutApiV2PortalUserCompanyEditApiResponse,
      PutApiV2PortalUserCompanyEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/user-company/edit`,
        method: "PUT",
        body: queryArg.editUserCompanyModel,
      }),
    }),
    getApiV2SmsUserSmsCreditGetBalance: build.query<
      GetApiV2SmsUserSmsCreditGetBalanceApiResponse,
      GetApiV2SmsUserSmsCreditGetBalanceApiArg
    >({
      query: () => ({ url: `/api/v2/sms/user-sms-credit/get-balance` }),
    }),
    getApiV2VmVmList: build.query<
      GetApiV2VmVmListApiResponse,
      GetApiV2VmVmListApiArg
    >({
      query: () => ({ url: `/api/v2/vm/vm/list` }),
    }),
    getApiV2VmVmGetById: build.query<
      GetApiV2VmVmGetByIdApiResponse,
      GetApiV2VmVmGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v2/vm/vm/get/${queryArg.id}` }),
    }),
    getApiV2VmVmPayById: build.query<
      GetApiV2VmVmPayByIdApiResponse,
      GetApiV2VmVmPayByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v2/vm/vm/pay/${queryArg.id}` }),
    }),
    postApiV2VmVmCreate: build.mutation<
      PostApiV2VmVmCreateApiResponse,
      PostApiV2VmVmCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/vm/create`,
        method: "POST",
        body: queryArg.createVmModel,
      }),
    }),
    putApiV2VmVmEdit: build.mutation<
      PutApiV2VmVmEditApiResponse,
      PutApiV2VmVmEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/vm/edit`,
        method: "PUT",
        body: queryArg.editVmModel,
      }),
    }),
    deleteApiV2VmVmDeleteById: build.mutation<
      DeleteApiV2VmVmDeleteByIdApiResponse,
      DeleteApiV2VmVmDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/vm/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putApiV2VmVmRebuild: build.mutation<
      PutApiV2VmVmRebuildApiResponse,
      PutApiV2VmVmRebuildApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/vm/rebuild`,
        method: "PUT",
        body: queryArg.rebuildVmModel,
      }),
    }),
    putApiV2VmVmConnectById: build.mutation<
      PutApiV2VmVmConnectByIdApiResponse,
      PutApiV2VmVmConnectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/vm/connect/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiV2VmVmDisconnectById: build.mutation<
      PutApiV2VmVmDisconnectByIdApiResponse,
      PutApiV2VmVmDisconnectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/vm/disconnect/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiV2VmVmRebootById: build.mutation<
      PutApiV2VmVmRebootByIdApiResponse,
      PutApiV2VmVmRebootByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/vm/reboot/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiV2VmVmShutdownById: build.mutation<
      PutApiV2VmVmShutdownByIdApiResponse,
      PutApiV2VmVmShutdownByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/vm/shutdown/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiV2VmVmResetById: build.mutation<
      PutApiV2VmVmResetByIdApiResponse,
      PutApiV2VmVmResetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/vm/reset/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiV2VmVmStartById: build.mutation<
      PutApiV2VmVmStartByIdApiResponse,
      PutApiV2VmVmStartByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/vm/start/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiV2VmVmStopById: build.mutation<
      PutApiV2VmVmStopByIdApiResponse,
      PutApiV2VmVmStopByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/vm/stop/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiV2VmVmIpListByVmId: build.query<
      GetApiV2VmVmIpListByVmIdApiResponse,
      GetApiV2VmVmIpListByVmIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v2/vm/vm-ip/list/${queryArg.vmId}` }),
    }),
    postApiV2VmVmIpCreate: build.mutation<
      PostApiV2VmVmIpCreateApiResponse,
      PostApiV2VmVmIpCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/vm-ip/create`,
        method: "POST",
        body: queryArg.createVmIpModel,
      }),
    }),
    deleteApiV2VmVmIpDeleteById: build.mutation<
      DeleteApiV2VmVmIpDeleteByIdApiResponse,
      DeleteApiV2VmVmIpDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/vm-ip/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiV2VmVmKmsGet: build.mutation<
      PostApiV2VmVmKmsGetApiResponse,
      PostApiV2VmVmKmsGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/vm/vm-kms/get`,
        method: "POST",
        body: queryArg.getKmsModel,
      }),
    }),
    getApiV2PortalWalletList: build.query<
      GetApiV2PortalWalletListApiResponse,
      GetApiV2PortalWalletListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/wallet/list` }),
    }),
    getApiV2PortalWalletGetBalance: build.query<
      GetApiV2PortalWalletGetBalanceApiResponse,
      GetApiV2PortalWalletGetBalanceApiArg
    >({
      query: () => ({ url: `/api/v2/portal/wallet/get-balance` }),
    }),
    getApiV2PortalWalletPaymentList: build.query<
      GetApiV2PortalWalletPaymentListApiResponse,
      GetApiV2PortalWalletPaymentListApiArg
    >({
      query: () => ({ url: `/api/v2/portal/wallet-payment/list` }),
    }),
    getApiV2PortalWalletPaymentGetById: build.query<
      GetApiV2PortalWalletPaymentGetByIdApiResponse,
      GetApiV2PortalWalletPaymentGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/wallet-payment/get/${queryArg.id}`,
      }),
    }),
    postApiV2PortalWalletPaymentCreate: build.mutation<
      PostApiV2PortalWalletPaymentCreateApiResponse,
      PostApiV2PortalWalletPaymentCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/wallet-payment/create`,
        method: "POST",
        body: queryArg.createPaymentModel,
      }),
    }),
    postApiV2PortalWalletPaymentPecCallBack: build.mutation<
      PostApiV2PortalWalletPaymentPecCallBackApiResponse,
      PostApiV2PortalWalletPaymentPecCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/wallet-payment/pec-call-back`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postApiV2PortalWalletPaymentSepCallBack: build.mutation<
      PostApiV2PortalWalletPaymentSepCallBackApiResponse,
      PostApiV2PortalWalletPaymentSepCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/portal/wallet-payment/sep-call-back`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiV2WebWebHostList: build.query<
      GetApiV2WebWebHostListApiResponse,
      GetApiV2WebWebHostListApiArg
    >({
      query: () => ({ url: `/api/v2/web/web-host/list` }),
    }),
    getApiV2WebWebHostGetById: build.query<
      GetApiV2WebWebHostGetByIdApiResponse,
      GetApiV2WebWebHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v2/web/web-host/get/${queryArg.id}` }),
    }),
    getApiV2WebWebHostGetLoginSessionById: build.query<
      GetApiV2WebWebHostGetLoginSessionByIdApiResponse,
      GetApiV2WebWebHostGetLoginSessionByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/web/web-host/get-login-session/${queryArg.id}`,
      }),
    }),
    getApiV2WebWebHostPayById: build.query<
      GetApiV2WebWebHostPayByIdApiResponse,
      GetApiV2WebWebHostPayByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v2/web/web-host/pay/${queryArg.id}` }),
    }),
    postApiV2WebWebHostCreate: build.mutation<
      PostApiV2WebWebHostCreateApiResponse,
      PostApiV2WebWebHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/web/web-host/create`,
        method: "POST",
        body: queryArg.createWebHostModel,
      }),
    }),
    putApiV2WebWebHostEdit: build.mutation<
      PutApiV2WebWebHostEditApiResponse,
      PutApiV2WebWebHostEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/web/web-host/edit`,
        method: "PUT",
        body: queryArg.editWebHostModel,
      }),
    }),
    deleteApiV2WebWebHostDeleteById: build.mutation<
      DeleteApiV2WebWebHostDeleteByIdApiResponse,
      DeleteApiV2WebWebHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/web/web-host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiV2WebAlarmList: build.query<
      GetApiV2WebAlarmListApiResponse,
      GetApiV2WebAlarmListApiArg
    >({
      query: () => ({ url: `/api/v2/web/alarm/list` }),
    }),
    getApiV2WebWebBlogList: build.query<
      GetApiV2WebWebBlogListApiResponse,
      GetApiV2WebWebBlogListApiArg
    >({
      query: () => ({ url: `/api/v2/web/web-blog/list` }),
    }),
    getApiV2WebWebBlogGetByLink: build.query<
      GetApiV2WebWebBlogGetByLinkApiResponse,
      GetApiV2WebWebBlogGetByLinkApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/web/web-blog/get/${queryArg.link}`,
      }),
    }),
    getApiV2WebWebBlogGetRandomArticlesByLink: build.query<
      GetApiV2WebWebBlogGetRandomArticlesByLinkApiResponse,
      GetApiV2WebWebBlogGetRandomArticlesByLinkApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/web/web-blog/get-random-articles/${queryArg.link}`,
      }),
    }),
    getApiV2WebWebBlogGetHeaderArticles: build.query<
      GetApiV2WebWebBlogGetHeaderArticlesApiResponse,
      GetApiV2WebWebBlogGetHeaderArticlesApiArg
    >({
      query: () => ({ url: `/api/v2/web/web-blog/get-header-articles` }),
    }),
    getApiV2WebWebBlogCommentGetById: build.query<
      GetApiV2WebWebBlogCommentGetByIdApiResponse,
      GetApiV2WebWebBlogCommentGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/web/web-blog-comment/get/${queryArg.id}`,
      }),
    }),
    postApiV2WebWebBlogCommentCreate: build.mutation<
      PostApiV2WebWebBlogCommentCreateApiResponse,
      PostApiV2WebWebBlogCommentCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/web/web-blog-comment/create`,
        method: "POST",
        body: queryArg.createWebBolgCommentModel,
      }),
    }),
    postApiV2WebContactUsCreate: build.mutation<
      PostApiV2WebContactUsCreateApiResponse,
      PostApiV2WebContactUsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/web/contact-us/create`,
        method: "POST",
        body: queryArg.createContactUsModel,
      }),
    }),
    postApiV2WebNewsLetterCreate: build.mutation<
      PostApiV2WebNewsLetterCreateApiResponse,
      PostApiV2WebNewsLetterCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/web/news-letter/create`,
        method: "POST",
        body: queryArg.createNewsLetterModel,
      }),
    }),
    postApiV2DomainWhoisGet: build.mutation<
      PostApiV2DomainWhoisGetApiResponse,
      PostApiV2DomainWhoisGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/domain/whois/get`,
        method: "POST",
        body: queryArg.getDomainWhoisModel,
      }),
    }),
    getApiV2CdnZoneList: build.query<
      GetApiV2CdnZoneListApiResponse,
      GetApiV2CdnZoneListApiArg
    >({
      query: () => ({ url: `/api/v2/cdn/zone/list` }),
    }),
    getApiV2CdnZoneGetByZoneName: build.query<
      GetApiV2CdnZoneGetByZoneNameApiResponse,
      GetApiV2CdnZoneGetByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/zone/get/${queryArg.zoneName}`,
      }),
    }),
    getApiV2CdnZoneGetNsStatusByZoneName: build.query<
      GetApiV2CdnZoneGetNsStatusByZoneNameApiResponse,
      GetApiV2CdnZoneGetNsStatusByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/zone/get-ns-status/${queryArg.zoneName}`,
      }),
    }),
    postApiV2CdnZoneCheckZone: build.mutation<
      PostApiV2CdnZoneCheckZoneApiResponse,
      PostApiV2CdnZoneCheckZoneApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/zone/check-zone`,
        method: "POST",
        body: queryArg.checkZoneModel,
      }),
    }),
    postApiV2CdnZoneCreate: build.mutation<
      PostApiV2CdnZoneCreateApiResponse,
      PostApiV2CdnZoneCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/zone/create`,
        method: "POST",
        body: queryArg.createZoneModel,
      }),
    }),
    deleteApiV2CdnZoneDeleteById: build.mutation<
      DeleteApiV2CdnZoneDeleteByIdApiResponse,
      DeleteApiV2CdnZoneDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/zone/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putApiV2CdnZoneChangeClientCertType: build.mutation<
      PutApiV2CdnZoneChangeClientCertTypeApiResponse,
      PutApiV2CdnZoneChangeClientCertTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/zone/change-client-cert-type`,
        method: "PUT",
        body: queryArg.changeClientCertTypeModel,
      }),
    }),
    putApiV2CdnZoneChangeEdgeCertType: build.mutation<
      PutApiV2CdnZoneChangeEdgeCertTypeApiResponse,
      PutApiV2CdnZoneChangeEdgeCertTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/zone/change-edge-cert-type`,
        method: "PUT",
        body: queryArg.changeEdgeCertTypeModel,
      }),
    }),
    putApiV2CdnZoneChangeHsts: build.mutation<
      PutApiV2CdnZoneChangeHstsApiResponse,
      PutApiV2CdnZoneChangeHstsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/zone/change-hsts`,
        method: "PUT",
        body: queryArg.changeHstsModel,
      }),
    }),
    putApiV2CdnZoneChangeRedirect: build.mutation<
      PutApiV2CdnZoneChangeRedirectApiResponse,
      PutApiV2CdnZoneChangeRedirectApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/zone/change-redirect`,
        method: "PUT",
        body: queryArg.changeRedirectModel,
      }),
    }),
    putApiV2CdnZoneChangeZoneType: build.mutation<
      PutApiV2CdnZoneChangeZoneTypeApiResponse,
      PutApiV2CdnZoneChangeZoneTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/zone/change-zone-type`,
        method: "PUT",
        body: queryArg.changeZoneTypeModel,
      }),
    }),
    getApiV2CdnClientCertGetByZoneName: build.query<
      GetApiV2CdnClientCertGetByZoneNameApiResponse,
      GetApiV2CdnClientCertGetByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/client-cert/get/${queryArg.zoneName}`,
      }),
    }),
    getApiV2CdnClientCertGetUserCertByZoneName: build.query<
      GetApiV2CdnClientCertGetUserCertByZoneNameApiResponse,
      GetApiV2CdnClientCertGetUserCertByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/client-cert/get-user-cert/${queryArg.zoneName}`,
      }),
    }),
    postApiV2CdnClientCertCreateUserCert: build.mutation<
      PostApiV2CdnClientCertCreateUserCertApiResponse,
      PostApiV2CdnClientCertCreateUserCertApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/client-cert/create-user-cert`,
        method: "POST",
        body: queryArg.createUserZoneClientCertificateModel,
      }),
    }),
    getApiV2CdnEdgeCertGetByZoneName: build.query<
      GetApiV2CdnEdgeCertGetByZoneNameApiResponse,
      GetApiV2CdnEdgeCertGetByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/edge-cert/get/${queryArg.zoneName}`,
      }),
    }),
    getApiV2CdnEdgeCertGetUserCertByZoneName: build.query<
      GetApiV2CdnEdgeCertGetUserCertByZoneNameApiResponse,
      GetApiV2CdnEdgeCertGetUserCertByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/edge-cert/get-user-cert/${queryArg.zoneName}`,
      }),
    }),
    postApiV2CdnEdgeCertCreate: build.mutation<
      PostApiV2CdnEdgeCertCreateApiResponse,
      PostApiV2CdnEdgeCertCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/edge-cert/create`,
        method: "POST",
        body: queryArg.createZoneEdgeCertificateModel,
      }),
    }),
    postApiV2CdnEdgeCertCreateUserCert: build.mutation<
      PostApiV2CdnEdgeCertCreateUserCertApiResponse,
      PostApiV2CdnEdgeCertCreateUserCertApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v2/cdn/edge-cert/create-user-cert`,
        method: "POST",
        body: queryArg.createUserZoneEdgeCertificateModel,
      }),
    }),
  }),
});
export type PostApiV2AccountLoginApiResponse =
  /** status 200 Success */ LoginResponseModel;
export type PostApiV2AccountLoginApiArg = {
  loginModel: LoginModel;
};
export type PostApiV2AccountRegisterApiResponse = unknown;
export type PostApiV2AccountRegisterApiArg = {
  registerModel: RegisterModel;
};
export type PostApiV2AccountForgotApiResponse = unknown;
export type PostApiV2AccountForgotApiArg = {
  forgotModel: ForgotModel;
};
export type PostApiV2AccountForgotConfirmApiResponse = unknown;
export type PostApiV2AccountForgotConfirmApiArg = {
  confirmForgotModel: ConfirmForgotModel;
};
export type PostApiV2AccountLogoutApiResponse = unknown;
export type PostApiV2AccountLogoutApiArg = void;
export type PostApiV2CdnAnalyticGetApiResponse =
  /** status 200 Success */ GetAnalyticResponseModel[];
export type PostApiV2CdnAnalyticGetApiArg = {
  getAnalyticModel: GetAnalyticModel;
};
export type GetApiV2CdnApiGatewayListByZoneNameApiResponse =
  /** status 200 Success */ ApiGatewayListResponse[];
export type GetApiV2CdnApiGatewayListByZoneNameApiArg = {
  zoneName: string;
};
export type GetApiV2CdnApiGatewayGetByIdApiResponse =
  /** status 200 Success */ GetApiGatewayResponse;
export type GetApiV2CdnApiGatewayGetByIdApiArg = {
  id: number;
};
export type PostApiV2CdnApiGatewayCreateApiResponse = unknown;
export type PostApiV2CdnApiGatewayCreateApiArg = {
  createApiGatewayModel: CreateApiGatewayModel;
};
export type PutApiV2CdnApiGatewayEditApiResponse = unknown;
export type PutApiV2CdnApiGatewayEditApiArg = {
  editApiGatewayModel: EditApiGatewayModel;
};
export type DeleteApiV2CdnApiGatewayDeleteByIdApiResponse = unknown;
export type DeleteApiV2CdnApiGatewayDeleteByIdApiArg = {
  id: number;
};
export type GetApiV2PortalBusinessUnitListApiResponse =
  /** status 200 Success */ BusinessUnitListResponse[];
export type GetApiV2PortalBusinessUnitListApiArg = void;
export type GetApiV2PortalCalculateMonthListApiResponse =
  /** status 200 Success */ CalculateMonthListResponse[];
export type GetApiV2PortalCalculateMonthListApiArg = void;
export type GetApiV2PortalCommissionListApiResponse =
  /** status 200 Success */ CommissionListResponse;
export type GetApiV2PortalCommissionListApiArg = void;
export type GetApiV2PortalDashboardGetUserAnalyticsByCategoryIdApiResponse =
  /** status 200 Success */ GetUserAnalyticsResponseModel[];
export type GetApiV2PortalDashboardGetUserAnalyticsByCategoryIdApiArg = {
  categoryId: number;
};
export type GetApiV2PortalDashboardUserBillShortListApiResponse =
  /** status 200 Success */ UserBillShortListResponseModel[];
export type GetApiV2PortalDashboardUserBillShortListApiArg = void;
export type GetApiV2PortalDashboardSupportShortListApiResponse =
  /** status 200 Success */ SupportShortListModel[];
export type GetApiV2PortalDashboardSupportShortListApiArg = void;
export type GetApiV2VmDatacenterListApiResponse =
  /** status 200 Success */ DatacenterListResponse[];
export type GetApiV2VmDatacenterListApiArg = void;
export type GetApiV2VmImageListByDatacenterIdApiResponse =
  /** status 200 Success */ ImageListResponse[];
export type GetApiV2VmImageListByDatacenterIdApiArg = {
  datacenterId: number;
};
export type GetApiV2VmIsoListByDatacenterIdApiResponse =
  /** status 200 Success */ IsoListResponse[];
export type GetApiV2VmIsoListByDatacenterIdApiArg = {
  datacenterId: number;
};
export type PutApiV2VmIsoMountApiResponse = unknown;
export type PutApiV2VmIsoMountApiArg = {
  mountModel: MountModel;
};
export type PutApiV2VmIsoUnmountApiResponse = unknown;
export type PutApiV2VmIsoUnmountApiArg = {
  unmountModel: UnmountModel;
};
export type GetApiV2CdnDnsRecordListByZoneNameApiResponse =
  /** status 200 Success */ DnsHostListResponse[];
export type GetApiV2CdnDnsRecordListByZoneNameApiArg = {
  zoneName: string;
};
export type GetApiV2CdnDnsRecordGetByIdApiResponse =
  /** status 200 Success */ GetDnsHostResponse;
export type GetApiV2CdnDnsRecordGetByIdApiArg = {
  id: number;
};
export type PostApiV2CdnDnsRecordCreateApiResponse = unknown;
export type PostApiV2CdnDnsRecordCreateApiArg = {
  createDnsRecordModel: CreateDnsRecordModel;
};
export type PutApiV2CdnDnsRecordEditApiResponse = unknown;
export type PutApiV2CdnDnsRecordEditApiArg = {
  editDnsRecordModel: EditDnsRecordModel;
};
export type DeleteApiV2CdnDnsRecordDeleteByIdApiResponse = unknown;
export type DeleteApiV2CdnDnsRecordDeleteByIdApiArg = {
  id: number;
};
export type PutApiV2CdnDnsRecordChangeProxyStatusByIdApiResponse = unknown;
export type PutApiV2CdnDnsRecordChangeProxyStatusByIdApiArg = {
  id: number;
};
export type GetApiV2DomainListApiResponse =
  /** status 200 Success */ DomainListResponse[];
export type GetApiV2DomainListApiArg = void;
export type GetApiV2DomainGetByIdApiResponse =
  /** status 200 Success */ GetDomainResponse;
export type GetApiV2DomainGetByIdApiArg = {
  id: number;
};
export type GetApiV2DomainGetStatusByIdApiResponse =
  /** status 200 Success */ GetDomainResponse;
export type GetApiV2DomainGetStatusByIdApiArg = {
  id: number;
};
export type PostApiV2DomainGetPriceApiResponse =
  /** status 200 Success */ GetProductPriceResponse;
export type PostApiV2DomainGetPriceApiArg = {
  getPriceModel: GetPriceModel;
};
export type GetApiV2DomainPayByIdApiResponse = /** status 200 Success */ number;
export type GetApiV2DomainPayByIdApiArg = {
  id: number;
};
export type PostApiV2DomainRegisterApiResponse =
  /** status 200 Success */ number;
export type PostApiV2DomainRegisterApiArg = {
  registerDomainModel: RegisterDomainModel;
};
export type PutApiV2DomainDeleteByIdApiResponse = unknown;
export type PutApiV2DomainDeleteByIdApiArg = {
  id: number;
};
export type PutApiV2DomainChangeContactApiResponse = unknown;
export type PutApiV2DomainChangeContactApiArg = {
  changeContactModel: ChangeContactModel;
};
export type PutApiV2DomainChangeNsApiResponse = unknown;
export type PutApiV2DomainChangeNsApiArg = {
  changeNsModel: ChangeNsModel;
};
export type PostApiV2DomainResendVerificationByIdApiResponse = unknown;
export type PostApiV2DomainResendVerificationByIdApiArg = {
  id: number;
};
export type GetApiResponse = unknown;
export type GetApiArg = void;
export type GetApiV2PortalInvoiceListApiResponse =
  /** status 200 Success */ InvoiceListResponse[];
export type GetApiV2PortalInvoiceListApiArg = void;
export type GetApiV2PortalInvoiceGetByIdApiResponse =
  /** status 200 Success */ InvoiceGetResponse;
export type GetApiV2PortalInvoiceGetByIdApiArg = {
  id: number;
};
export type GetApiV2CdnLoadBalanceListByZoneNameApiResponse =
  /** status 200 Success */ LoadBalanceListResponse[];
export type GetApiV2CdnLoadBalanceListByZoneNameApiArg = {
  zoneName: string;
};
export type GetApiV2CdnLoadBalanceGetByIdApiResponse =
  /** status 200 Success */ GetLoadBalanceResponse;
export type GetApiV2CdnLoadBalanceGetByIdApiArg = {
  id: number;
};
export type PostApiV2CdnLoadBalanceCreateApiResponse = unknown;
export type PostApiV2CdnLoadBalanceCreateApiArg = {
  createLoadBalanceModel: CreateLoadBalanceModel;
};
export type PutApiV2CdnLoadBalanceEditApiResponse = unknown;
export type PutApiV2CdnLoadBalanceEditApiArg = {
  editLoadBalanceModel: EditLoadBalanceModel;
};
export type DeleteApiV2CdnLoadBalanceDeleteByIdApiResponse = unknown;
export type DeleteApiV2CdnLoadBalanceDeleteByIdApiArg = {
  id: number;
};
export type GetApiV2LogSmsReceiveByFromAndTextToApiResponse = unknown;
export type GetApiV2LogSmsReceiveByFromAndTextToApiArg = {
  from: string;
  text: string;
  to: string;
};
export type GetApiV2PortalNotificationListApiResponse =
  /** status 200 Success */ NotificationListResponse[];
export type GetApiV2PortalNotificationListApiArg = void;
export type GetApiV2PortalNotificationShortListApiResponse =
  /** status 200 Success */ NotificationListResponse[];
export type GetApiV2PortalNotificationShortListApiArg = void;
export type GetApiV2PortalOrderListByProductCategoryIdApiResponse =
  /** status 200 Success */ OrderListResponse[];
export type GetApiV2PortalOrderListByProductCategoryIdApiArg = {
  productCategoryId: number;
};
export type GetApiV2PortalOrderNotPaidListApiResponse =
  /** status 200 Success */ OrderNotPaidListResponse[];
export type GetApiV2PortalOrderNotPaidListApiArg = void;
export type GetApiV2PortalOrderShortListByProductCategoryIdApiResponse =
  /** status 200 Success */ OrderShortListResponse[];
export type GetApiV2PortalOrderShortListByProductCategoryIdApiArg = {
  productCategoryId: number;
};
export type GetApiV2PortalOrderGetByIdApiResponse =
  /** status 200 Success */ GetOrderResponse;
export type GetApiV2PortalOrderGetByIdApiArg = {
  id: number;
};
export type PutApiV2PortalOrderPaymentTypeApiResponse = unknown;
export type PutApiV2PortalOrderPaymentTypeApiArg = {
  orderPaymentTypeModel: OrderPaymentTypeModel;
};
export type PutApiV2PortalOrderDurationApiResponse = unknown;
export type PutApiV2PortalOrderDurationApiArg = {
  orderDurationModel: OrderDurationModel;
};
export type PutApiV2PortalOrderVoucherApiResponse = unknown;
export type PutApiV2PortalOrderVoucherApiArg = {
  orderVoucherModel: OrderVoucherModel;
};
export type PutApiV2PortalOrderCancelByIdApiResponse = unknown;
export type PutApiV2PortalOrderCancelByIdApiArg = {
  id: number;
};
export type PostApiV2PortalOrderPayApiResponse =
  /** status 200 Success */ OrderPayResponse;
export type PostApiV2PortalOrderPayApiArg = {
  orderPayModel: OrderPayModel;
};
export type GetApiV2PortalOrderPlanListApiResponse =
  /** status 200 Success */ OrderPlanListResponse[];
export type GetApiV2PortalOrderPlanListApiArg = void;
export type PostApiV2PortalOrderPlanOrderApiResponse = unknown;
export type PostApiV2PortalOrderPlanOrderApiArg = {
  createOrderPlanModel: CreateOrderPlanModel;
};
export type GetApiV2PortalProductBundleListByProductCategoryIdApiResponse =
  /** status 200 Success */ ProductBundleListResponse[];
export type GetApiV2PortalProductBundleListByProductCategoryIdApiArg = {
  productCategoryId: number;
};
export type GetApiV2PortalProductCategoryListApiResponse =
  /** status 200 Success */ ProductCategoryListResponse[];
export type GetApiV2PortalProductCategoryListApiArg = void;
export type GetApiV2PortalProfileGetApiResponse =
  /** status 200 Success */ GetProfileResponse;
export type GetApiV2PortalProfileGetApiArg = void;
export type PostApiV2PortalProfileGetNotificationStatusApiResponse =
  /** status 200 Success */ GetNotificationStatusResponse;
export type PostApiV2PortalProfileGetNotificationStatusApiArg = void;
export type PutApiV2PortalProfileEditApiResponse = unknown;
export type PutApiV2PortalProfileEditApiArg = {
  editProfileModel: EditProfileModel;
};
export type PutApiV2PortalProfileEditAccountTypeApiResponse = unknown;
export type PutApiV2PortalProfileEditAccountTypeApiArg = {
  editAccountTypeModel: EditAccountTypeModel;
};
export type PutApiV2PortalProfileEditEmailApiResponse = unknown;
export type PutApiV2PortalProfileEditEmailApiArg = {
  editEmailModel: EditEmailModel;
};
export type PostApiV2PortalProfileConfirmEmailApiResponse = unknown;
export type PostApiV2PortalProfileConfirmEmailApiArg = {
  confirmEmailModel: ConfirmEmailModel;
};
export type PutApiV2PortalProfileEditPhoneNumberApiResponse = unknown;
export type PutApiV2PortalProfileEditPhoneNumberApiArg = {
  editPhoneNumberModel: EditPhoneNumberModel;
};
export type PostApiV2PortalProfileConfirmPhoneNumberApiResponse = unknown;
export type PostApiV2PortalProfileConfirmPhoneNumberApiArg = {
  confirmPhoneNumberModel: ConfirmPhoneNumberModel;
};
export type PutApiV2PortalProfileEditEmailNotificationApiResponse = unknown;
export type PutApiV2PortalProfileEditEmailNotificationApiArg = {
  editEmailNotifyModel: EditEmailNotifyModel;
};
export type PutApiV2PortalProfileEditPhoneNotificationApiResponse = unknown;
export type PutApiV2PortalProfileEditPhoneNotificationApiArg = {
  editPhoneNotifyModel: EditPhoneNotifyModel;
};
export type PostApiV2PortalProfileChangePasswordApiResponse = unknown;
export type PostApiV2PortalProfileChangePasswordApiArg = {
  changePasswordModel: ChangePasswordModel;
};
export type GetApiV2RabbitRabbitHostListApiResponse =
  /** status 200 Success */ RabbitHostListResponse[];
export type GetApiV2RabbitRabbitHostListApiArg = void;
export type GetApiV2RabbitRabbitHostGetByIdApiResponse =
  /** status 200 Success */ GetRabbitHostResponse;
export type GetApiV2RabbitRabbitHostGetByIdApiArg = {
  id: number;
};
export type GetApiV2RabbitRabbitHostPayByIdApiResponse =
  /** status 200 Success */ number;
export type GetApiV2RabbitRabbitHostPayByIdApiArg = {
  id: number;
};
export type PostApiV2RabbitRabbitHostCreateApiResponse = unknown;
export type PostApiV2RabbitRabbitHostCreateApiArg = {
  createRabbitHostModel: CreateRabbitHostModel;
};
export type PutApiV2RabbitRabbitHostChangeServiceApiResponse = unknown;
export type PutApiV2RabbitRabbitHostChangeServiceApiArg = {
  editRabbitHostModel: EditRabbitHostModel;
};
export type DeleteApiV2RabbitRabbitHostDeleteByIdApiResponse = unknown;
export type DeleteApiV2RabbitRabbitHostDeleteByIdApiArg = {
  id: number;
};
export type PostApiV2RabbitRabbitHostChangeExchangeApiResponse = unknown;
export type PostApiV2RabbitRabbitHostChangeExchangeApiArg = {
  changeExchangeModel: ChangeExchangeModel;
};
export type GetApiV2RabbitRabbitUserListByRabbitHostIdApiResponse =
  /** status 200 Success */ RabbitHostUserListResponse[];
export type GetApiV2RabbitRabbitUserListByRabbitHostIdApiArg = {
  rabbitHostId: number;
};
export type PostApiV2RabbitRabbitUserCreateApiResponse = unknown;
export type PostApiV2RabbitRabbitUserCreateApiArg = {
  createRabbitUserModel: CreateRabbitUserModel;
};
export type DeleteApiV2RabbitRabbitUserDeleteByIdApiResponse = unknown;
export type DeleteApiV2RabbitRabbitUserDeleteByIdApiArg = {
  id: number;
};
export type PostApiV2RabbitRabbitUserChangePasswordApiResponse = unknown;
export type PostApiV2RabbitRabbitUserChangePasswordApiArg = {
  changeRabbitPasswordModel: ChangeRabbitPasswordModel;
};
export type GetApiV2SmsReceiveContentListApiResponse =
  /** status 200 Success */ SmsReceiveContentResponse[];
export type GetApiV2SmsReceiveContentListApiArg = void;
export type GetApiV2PortalReferralGetApiResponse =
  /** status 200 Success */ GetReferralResponse;
export type GetApiV2PortalReferralGetApiArg = void;
export type PostApiV2PortalReferralJoinApiResponse =
  /** status 200 Success */ JoinReferralResponse;
export type PostApiV2PortalReferralJoinApiArg = {
  joinReferralModel: JoinReferralModel;
};
export type GetApiV2SmsSendContentListApiResponse =
  /** status 200 Success */ SmsSendContentListResponse[];
export type GetApiV2SmsSendContentListApiArg = void;
export type PostApiV2SmsSendContentSendSmsApiResponse = unknown;
export type PostApiV2SmsSendContentSendSmsApiArg = {
  sendSmsModel: SendSmsModel;
};
export type PostApiV2SmsSendContentSend1ToNApiResponse = unknown;
export type PostApiV2SmsSendContentSend1ToNApiArg = {
  body: {
    Source: string;
    SentContent: string;
    SmsDataFile: Blob;
  };
};
export type PostApiV2SmsSendContentSendNToNApiResponse = unknown;
export type PostApiV2SmsSendContentSendNToNApiArg = {
  body: {
    Source: string;
    SmsDataFile: Blob;
  };
};
export type PostApiV2SmsGatewaySendSmsApiResponse =
  /** status 200 Success */ SendSmsSmsGatewayResponse;
export type PostApiV2SmsGatewaySendSmsApiArg = {
  body: SendSmsGatewayModel[];
};
export type PostApiV2SmsGatewayReceiveSmsApiResponse = unknown;
export type PostApiV2SmsGatewayReceiveSmsApiArg = void;
export type GetApiV2SmsSmsNumberListApiResponse =
  /** status 200 Success */ SmsNumberListResponse[];
export type GetApiV2SmsSmsNumberListApiArg = void;
export type GetApiV2SmsSmsNumberHostListApiResponse =
  /** status 200 Success */ UserSmsNumberListResponse[];
export type GetApiV2SmsSmsNumberHostListApiArg = void;
export type PostApiV2SmsSmsNumberHostCreateApiResponse = unknown;
export type PostApiV2SmsSmsNumberHostCreateApiArg = {
  createUserSmsNumberModel: CreateUserSmsNumberModel;
};
export type DeleteApiV2SmsSmsNumberHostDeleteByIdApiResponse = unknown;
export type DeleteApiV2SmsSmsNumberHostDeleteByIdApiArg = {
  id: number;
};
export type GetApiV2PortalSupportListApiResponse =
  /** status 200 Success */ SupportListModel[];
export type GetApiV2PortalSupportListApiArg = void;
export type PostApiV2PortalSupportCreateApiResponse = unknown;
export type PostApiV2PortalSupportCreateApiArg = {
  body: {
    Content: string;
    BusinessUnitId: number;
    SupportSubjectId: number;
    OrderId?: number;
    ProductCategoryId?: number;
    Attachment?: Blob;
  };
};
export type GetApiV2PortalSupportItemListBySupportIdApiResponse =
  /** status 200 Success */ SupportItemListResponse;
export type GetApiV2PortalSupportItemListBySupportIdApiArg = {
  supportId: number;
};
export type PostApiV2PortalSupportItemCreateApiResponse = unknown;
export type PostApiV2PortalSupportItemCreateApiArg = {
  body: {
    SupportId: number;
    Content: string;
    Attachment?: Blob;
  };
};
export type GetApiV2PortalSupportItemDownloadByIdApiResponse = unknown;
export type GetApiV2PortalSupportItemDownloadByIdApiArg = {
  id: number;
};
export type GetApiV2PortalSupportSubjectListApiResponse =
  /** status 200 Success */ SupportSubjectListResponse[];
export type GetApiV2PortalSupportSubjectListApiArg = void;
export type PostApiV2PortalSupportSubjectSelectListApiResponse =
  /** status 200 Success */ SupportSubjectListResponse[];
export type PostApiV2PortalSupportSubjectSelectListApiArg = {
  selectListModel: SelectListModel;
};
export type GetApiV2PortalUserApiKeyListApiResponse =
  /** status 200 Success */ UserApiKeyListResponse[];
export type GetApiV2PortalUserApiKeyListApiArg = void;
export type PostApiV2PortalUserApiKeyCreateApiResponse = unknown;
export type PostApiV2PortalUserApiKeyCreateApiArg = {
  createUserApiKeyModel: CreateUserApiKeyModel;
};
export type DeleteApiV2PortalUserApiKeyDeleteByIdApiResponse = unknown;
export type DeleteApiV2PortalUserApiKeyDeleteByIdApiArg = {
  id: number;
};
export type GetApiV2PortalUserBillListApiResponse =
  /** status 200 Success */ UserBillListResponseModel[];
export type GetApiV2PortalUserBillListApiArg = void;
export type GetApiV2PortalUserBillGetByIdApiResponse =
  /** status 200 Success */ GetUserBillResponseModel;
export type GetApiV2PortalUserBillGetByIdApiArg = {
  id: number;
};
export type GetApiV2PortalUserBillDownloadByIdApiResponse = unknown;
export type GetApiV2PortalUserBillDownloadByIdApiArg = {
  id: number;
};
export type GetApiV2PortalUserCompanyGetApiResponse =
  /** status 200 Success */ GetUserCompanyResponse[];
export type GetApiV2PortalUserCompanyGetApiArg = void;
export type PutApiV2PortalUserCompanyEditApiResponse = unknown;
export type PutApiV2PortalUserCompanyEditApiArg = {
  editUserCompanyModel: EditUserCompanyModel;
};
export type GetApiV2SmsUserSmsCreditGetBalanceApiResponse =
  /** status 200 Success */ number;
export type GetApiV2SmsUserSmsCreditGetBalanceApiArg = void;
export type GetApiV2VmVmListApiResponse =
  /** status 200 Success */ VmListResponse[];
export type GetApiV2VmVmListApiArg = void;
export type GetApiV2VmVmGetByIdApiResponse =
  /** status 200 Success */ GetVmResponse;
export type GetApiV2VmVmGetByIdApiArg = {
  id: number;
};
export type GetApiV2VmVmPayByIdApiResponse = /** status 200 Success */ number;
export type GetApiV2VmVmPayByIdApiArg = {
  id: number;
};
export type PostApiV2VmVmCreateApiResponse = /** status 200 Success */ number;
export type PostApiV2VmVmCreateApiArg = {
  createVmModel: CreateVmModel;
};
export type PutApiV2VmVmEditApiResponse = unknown;
export type PutApiV2VmVmEditApiArg = {
  editVmModel: EditVmModel;
};
export type DeleteApiV2VmVmDeleteByIdApiResponse = unknown;
export type DeleteApiV2VmVmDeleteByIdApiArg = {
  id: number;
};
export type PutApiV2VmVmRebuildApiResponse = unknown;
export type PutApiV2VmVmRebuildApiArg = {
  rebuildVmModel: RebuildVmModel;
};
export type PutApiV2VmVmConnectByIdApiResponse = unknown;
export type PutApiV2VmVmConnectByIdApiArg = {
  id: number;
};
export type PutApiV2VmVmDisconnectByIdApiResponse = unknown;
export type PutApiV2VmVmDisconnectByIdApiArg = {
  id: number;
};
export type PutApiV2VmVmRebootByIdApiResponse = unknown;
export type PutApiV2VmVmRebootByIdApiArg = {
  id: number;
};
export type PutApiV2VmVmShutdownByIdApiResponse = unknown;
export type PutApiV2VmVmShutdownByIdApiArg = {
  id: number;
};
export type PutApiV2VmVmResetByIdApiResponse = unknown;
export type PutApiV2VmVmResetByIdApiArg = {
  id: number;
};
export type PutApiV2VmVmStartByIdApiResponse = unknown;
export type PutApiV2VmVmStartByIdApiArg = {
  id: number;
};
export type PutApiV2VmVmStopByIdApiResponse = unknown;
export type PutApiV2VmVmStopByIdApiArg = {
  id: number;
};
export type GetApiV2VmVmIpListByVmIdApiResponse =
  /** status 200 Success */ VmIpListResponse[];
export type GetApiV2VmVmIpListByVmIdApiArg = {
  vmId: number;
};
export type PostApiV2VmVmIpCreateApiResponse = unknown;
export type PostApiV2VmVmIpCreateApiArg = {
  createVmIpModel: CreateVmIpModel;
};
export type DeleteApiV2VmVmIpDeleteByIdApiResponse = unknown;
export type DeleteApiV2VmVmIpDeleteByIdApiArg = {
  id: number;
};
export type PostApiV2VmVmKmsGetApiResponse = /** status 200 Success */ string;
export type PostApiV2VmVmKmsGetApiArg = {
  getKmsModel: GetKmsModel;
};
export type GetApiV2PortalWalletListApiResponse =
  /** status 200 Success */ WalletListResponse[];
export type GetApiV2PortalWalletListApiArg = void;
export type GetApiV2PortalWalletGetBalanceApiResponse =
  /** status 200 Success */ number;
export type GetApiV2PortalWalletGetBalanceApiArg = void;
export type GetApiV2PortalWalletPaymentListApiResponse =
  /** status 200 Success */ WalletPaymentListResponse[];
export type GetApiV2PortalWalletPaymentListApiArg = void;
export type GetApiV2PortalWalletPaymentGetByIdApiResponse =
  /** status 200 Success */ WalletPaymentListResponse;
export type GetApiV2PortalWalletPaymentGetByIdApiArg = {
  id: number;
};
export type PostApiV2PortalWalletPaymentCreateApiResponse =
  /** status 200 Success */ CreateWalletPaymentResponse;
export type PostApiV2PortalWalletPaymentCreateApiArg = {
  createPaymentModel: CreatePaymentModel;
};
export type PostApiV2PortalWalletPaymentPecCallBackApiResponse = unknown;
export type PostApiV2PortalWalletPaymentPecCallBackApiArg = {
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
export type PostApiV2PortalWalletPaymentSepCallBackApiResponse = unknown;
export type PostApiV2PortalWalletPaymentSepCallBackApiArg = {
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
export type GetApiV2WebWebHostListApiResponse =
  /** status 200 Success */ WebHostListResponse[];
export type GetApiV2WebWebHostListApiArg = void;
export type GetApiV2WebWebHostGetByIdApiResponse =
  /** status 200 Success */ GetWebHostResponse;
export type GetApiV2WebWebHostGetByIdApiArg = {
  id: number;
};
export type GetApiV2WebWebHostGetLoginSessionByIdApiResponse =
  /** status 200 Success */ GetLoginSessionResponse;
export type GetApiV2WebWebHostGetLoginSessionByIdApiArg = {
  id: number;
};
export type GetApiV2WebWebHostPayByIdApiResponse =
  /** status 200 Success */ number;
export type GetApiV2WebWebHostPayByIdApiArg = {
  id: number;
};
export type PostApiV2WebWebHostCreateApiResponse = unknown;
export type PostApiV2WebWebHostCreateApiArg = {
  createWebHostModel: CreateWebHostModel;
};
export type PutApiV2WebWebHostEditApiResponse = unknown;
export type PutApiV2WebWebHostEditApiArg = {
  editWebHostModel: EditWebHostModel;
};
export type DeleteApiV2WebWebHostDeleteByIdApiResponse = unknown;
export type DeleteApiV2WebWebHostDeleteByIdApiArg = {
  id: number;
};
export type GetApiV2WebAlarmListApiResponse =
  /** status 200 Success */ AlarmListResponse[];
export type GetApiV2WebAlarmListApiArg = void;
export type GetApiV2WebWebBlogListApiResponse =
  /** status 200 Success */ WebBolgListResponse[];
export type GetApiV2WebWebBlogListApiArg = void;
export type GetApiV2WebWebBlogGetByLinkApiResponse =
  /** status 200 Success */ GetWebBolgResponse;
export type GetApiV2WebWebBlogGetByLinkApiArg = {
  link: string;
};
export type GetApiV2WebWebBlogGetRandomArticlesByLinkApiResponse =
  /** status 200 Success */ GetRandomArticleResponse[];
export type GetApiV2WebWebBlogGetRandomArticlesByLinkApiArg = {
  link: string;
};
export type GetApiV2WebWebBlogGetHeaderArticlesApiResponse =
  /** status 200 Success */ GetHeaderArticleResponse[];
export type GetApiV2WebWebBlogGetHeaderArticlesApiArg = void;
export type GetApiV2WebWebBlogCommentGetByIdApiResponse =
  /** status 200 Success */ GetWebBolgCommentResponse[];
export type GetApiV2WebWebBlogCommentGetByIdApiArg = {
  id: number;
};
export type PostApiV2WebWebBlogCommentCreateApiResponse = unknown;
export type PostApiV2WebWebBlogCommentCreateApiArg = {
  createWebBolgCommentModel: CreateWebBolgCommentModel;
};
export type PostApiV2WebContactUsCreateApiResponse = unknown;
export type PostApiV2WebContactUsCreateApiArg = {
  createContactUsModel: CreateContactUsModel;
};
export type PostApiV2WebNewsLetterCreateApiResponse = unknown;
export type PostApiV2WebNewsLetterCreateApiArg = {
  createNewsLetterModel: CreateNewsLetterModel;
};
export type PostApiV2DomainWhoisGetApiResponse = unknown;
export type PostApiV2DomainWhoisGetApiArg = {
  getDomainWhoisModel: GetDomainWhoisModel;
};
export type GetApiV2CdnZoneListApiResponse =
  /** status 200 Success */ ZoneListResponse[];
export type GetApiV2CdnZoneListApiArg = void;
export type GetApiV2CdnZoneGetByZoneNameApiResponse =
  /** status 200 Success */ GetZoneResponse;
export type GetApiV2CdnZoneGetByZoneNameApiArg = {
  zoneName: string;
};
export type GetApiV2CdnZoneGetNsStatusByZoneNameApiResponse =
  /** status 200 Success */ GetNsStatusResponse;
export type GetApiV2CdnZoneGetNsStatusByZoneNameApiArg = {
  zoneName: string;
};
export type PostApiV2CdnZoneCheckZoneApiResponse = unknown;
export type PostApiV2CdnZoneCheckZoneApiArg = {
  checkZoneModel: CheckZoneModel;
};
export type PostApiV2CdnZoneCreateApiResponse = unknown;
export type PostApiV2CdnZoneCreateApiArg = {
  createZoneModel: CreateZoneModel;
};
export type DeleteApiV2CdnZoneDeleteByIdApiResponse = unknown;
export type DeleteApiV2CdnZoneDeleteByIdApiArg = {
  id: number;
};
export type PutApiV2CdnZoneChangeClientCertTypeApiResponse = unknown;
export type PutApiV2CdnZoneChangeClientCertTypeApiArg = {
  changeClientCertTypeModel: ChangeClientCertTypeModel;
};
export type PutApiV2CdnZoneChangeEdgeCertTypeApiResponse = unknown;
export type PutApiV2CdnZoneChangeEdgeCertTypeApiArg = {
  changeEdgeCertTypeModel: ChangeEdgeCertTypeModel;
};
export type PutApiV2CdnZoneChangeHstsApiResponse = unknown;
export type PutApiV2CdnZoneChangeHstsApiArg = {
  changeHstsModel: ChangeHstsModel;
};
export type PutApiV2CdnZoneChangeRedirectApiResponse = unknown;
export type PutApiV2CdnZoneChangeRedirectApiArg = {
  changeRedirectModel: ChangeRedirectModel;
};
export type PutApiV2CdnZoneChangeZoneTypeApiResponse = unknown;
export type PutApiV2CdnZoneChangeZoneTypeApiArg = {
  changeZoneTypeModel: ChangeZoneTypeModel;
};
export type GetApiV2CdnClientCertGetByZoneNameApiResponse =
  /** status 200 Success */ GetZoneClientCertificateResponse;
export type GetApiV2CdnClientCertGetByZoneNameApiArg = {
  zoneName: string;
};
export type GetApiV2CdnClientCertGetUserCertByZoneNameApiResponse =
  /** status 200 Success */ GetZoneClientUserCertificateResponse;
export type GetApiV2CdnClientCertGetUserCertByZoneNameApiArg = {
  zoneName: string;
};
export type PostApiV2CdnClientCertCreateUserCertApiResponse = unknown;
export type PostApiV2CdnClientCertCreateUserCertApiArg = {
  createUserZoneClientCertificateModel: CreateUserZoneClientCertificateModel;
};
export type GetApiV2CdnEdgeCertGetByZoneNameApiResponse =
  /** status 200 Success */ GetZoneEdgeCertificateResponse;
export type GetApiV2CdnEdgeCertGetByZoneNameApiArg = {
  zoneName: string;
};
export type GetApiV2CdnEdgeCertGetUserCertByZoneNameApiResponse =
  /** status 200 Success */ GetZoneEdgeUserCertificateResponse;
export type GetApiV2CdnEdgeCertGetUserCertByZoneNameApiArg = {
  zoneName: string;
};
export type PostApiV2CdnEdgeCertCreateApiResponse = unknown;
export type PostApiV2CdnEdgeCertCreateApiArg = {
  createZoneEdgeCertificateModel: CreateZoneEdgeCertificateModel;
};
export type PostApiV2CdnEdgeCertCreateUserCertApiResponse = unknown;
export type PostApiV2CdnEdgeCertCreateUserCertApiArg = {
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
  invoiceId?: number;
  totalPrice?: number;
  commissionPrice?: number;
  commissionDate?: string;
  user?: string | null;
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
export type InvoiceListResponse = {
  id?: number;
  invoiceDate?: string;
  netPrice?: number;
  discount?: number;
  vat?: number;
  totalPrice?: number;
  invoicePrice?: number;
  invoiceStatus?: string | null;
  invoiceStatusId?: number;
};
export type InvoiceItemModel = {
  product?: string | null;
  quantity?: number;
  price?: number;
  totalPrice?: number;
};
export type InvoiceGetResponse = {
  id?: number;
  sellerName?: string | null;
  sellerAddress?: string | null;
  sellerPhone?: string | null;
  customerName?: string | null;
  customerAddress?: string | null;
  customerPhone?: string | null;
  invoiceStatusId?: number;
  invoiceStatus?: string | null;
  invoiceDate?: string;
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
  status?: string | null;
  createDate?: string;
};
export type OrderNotPaidListResponse = {
  id?: number;
  name?: string | null;
  productName?: string | null;
  status?: string | null;
  orderStatusId?: number;
  createDate?: string;
};
export type OrderShortListResponse = {
  id?: number;
  name?: string | null;
};
export type GetOrderResponse = {
  id?: number;
  name?: string | null;
  productCategory?: string | null;
  productBundle?: string | null;
  orderStatus?: string | null;
  orderStatusId?: number;
  orderDate?: string;
  orderPaymentTypeId?: number;
  orderDurationId?: number;
  isPrepaid?: boolean;
  prepaidStatus?: string | null;
  netPrice?: number;
  discount?: number;
  vat?: number;
  orderPrice?: number;
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
  minimumPrice?: number;
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
  isCompanyAccount?: boolean;
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
  isCompanyAccount?: boolean;
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
  confirmPassword: string;
};
export type RabbitHostListResponse = {
  id?: number;
  datacenter?: string | null;
  name?: string | null;
  status?: string | null;
  createDate?: string;
};
export type GetRabbitHostResponse = {
  id?: number;
  datacenter?: string | null;
  name?: string | null;
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
  source: string;
  destination: string;
  sentContent: string;
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
export type UserBillListResponseModel = {
  id?: number;
  userId?: string;
  billDate?: string;
  netPrice?: number;
  vat?: number;
  totalPrice?: number;
};
export type UserBillItemsModel = {
  product?: string | null;
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
export type GetUserCompanyResponse = {
  id?: number;
  userCompanyTypeId?: number;
  name?: string | null;
  nationalId?: string | null;
  registrationNumber?: string | null;
  registrationDate?: string | null;
  economicNumber?: string | null;
  businessPhone?: string | null;
  address?: string | null;
  postalCode?: string | null;
};
export type EditUserCompanyModel = {
  userCompanyTypeId?: number;
  name: string;
  nationalId: string;
  registrationNumber: string;
  registrationDate: string;
  economicNumber: string;
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
  createDate?: string;
};
export type GetWebHostResponse = {
  id?: number;
  datacenter?: string | null;
  domainName?: string | null;
  status?: string | null;
  createDate?: string;
};
export type GetLoginSessionResponse = {
  location?: string | null;
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
export type AlarmListResponse = {
  subject?: string | null;
  link?: string | null;
};
export type WebBolgListResponse = {
  link?: string | null;
  imageLink?: string | null;
  author?: string | null;
  title?: string | null;
  subtitle?: string | null;
  createDate?: string;
  webBolgTags?: string[] | null;
};
export type GetWebBolgResponse = {
  id?: number;
  author?: string | null;
  imageLink?: string | null;
  title?: string | null;
  subtitle?: string | null;
  text?: string | null;
  viewCount?: number;
  loveCount?: number;
  createDate?: string;
  webBolgTags?: string[] | null;
};
export type GetRandomArticleResponse = {
  imageLink?: string | null;
  link?: string | null;
  author?: string | null;
  title?: string | null;
  subtitle?: string | null;
  createDate?: string;
};
export type GetHeaderArticleResponse = {
  imageLink?: string | null;
  author?: string | null;
  title?: string | null;
  subtitle?: string | null;
  createDate?: string;
  webBolgTags?: string[] | null;
};
export type GetWebBolgCommentResponse = {
  id?: number;
  parentId?: number | null;
  name?: string | null;
  content?: string | null;
  createDate?: string;
};
export type CreateWebBolgCommentModel = {
  id?: number;
  parentId?: number | null;
  name: string;
  email: string;
  content: string;
};
export type CreateContactUsModel = {
  firstName: string;
  lastName: string;
  email: string;
  content: string;
};
export type CreateNewsLetterModel = {
  email: string;
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
  usePostApiV2AccountLoginMutation,
  usePostApiV2AccountRegisterMutation,
  usePostApiV2AccountForgotMutation,
  usePostApiV2AccountForgotConfirmMutation,
  usePostApiV2AccountLogoutMutation,
  usePostApiV2CdnAnalyticGetMutation,
  useGetApiV2CdnApiGatewayListByZoneNameQuery,
  useGetApiV2CdnApiGatewayGetByIdQuery,
  usePostApiV2CdnApiGatewayCreateMutation,
  usePutApiV2CdnApiGatewayEditMutation,
  useDeleteApiV2CdnApiGatewayDeleteByIdMutation,
  useGetApiV2PortalBusinessUnitListQuery,
  useGetApiV2PortalCalculateMonthListQuery,
  useGetApiV2PortalCommissionListQuery,
  useGetApiV2PortalDashboardGetUserAnalyticsByCategoryIdQuery,
  useGetApiV2PortalDashboardUserBillShortListQuery,
  useGetApiV2PortalDashboardSupportShortListQuery,
  useGetApiV2VmDatacenterListQuery,
  useGetApiV2VmImageListByDatacenterIdQuery,
  useGetApiV2VmIsoListByDatacenterIdQuery,
  usePutApiV2VmIsoMountMutation,
  usePutApiV2VmIsoUnmountMutation,
  useGetApiV2CdnDnsRecordListByZoneNameQuery,
  useGetApiV2CdnDnsRecordGetByIdQuery,
  usePostApiV2CdnDnsRecordCreateMutation,
  usePutApiV2CdnDnsRecordEditMutation,
  useDeleteApiV2CdnDnsRecordDeleteByIdMutation,
  usePutApiV2CdnDnsRecordChangeProxyStatusByIdMutation,
  useGetApiV2DomainListQuery,
  useGetApiV2DomainGetByIdQuery,
  useGetApiV2DomainGetStatusByIdQuery,
  usePostApiV2DomainGetPriceMutation,
  useGetApiV2DomainPayByIdQuery,
  usePostApiV2DomainRegisterMutation,
  usePutApiV2DomainDeleteByIdMutation,
  usePutApiV2DomainChangeContactMutation,
  usePutApiV2DomainChangeNsMutation,
  usePostApiV2DomainResendVerificationByIdMutation,
  useGetQuery,
  useGetApiV2PortalInvoiceListQuery,
  useGetApiV2PortalInvoiceGetByIdQuery,
  useGetApiV2CdnLoadBalanceListByZoneNameQuery,
  useGetApiV2CdnLoadBalanceGetByIdQuery,
  usePostApiV2CdnLoadBalanceCreateMutation,
  usePutApiV2CdnLoadBalanceEditMutation,
  useDeleteApiV2CdnLoadBalanceDeleteByIdMutation,
  useGetApiV2LogSmsReceiveByFromAndTextToQuery,
  useGetApiV2PortalNotificationListQuery,
  useGetApiV2PortalNotificationShortListQuery,
  useGetApiV2PortalOrderListByProductCategoryIdQuery,
  useGetApiV2PortalOrderNotPaidListQuery,
  useGetApiV2PortalOrderShortListByProductCategoryIdQuery,
  useGetApiV2PortalOrderGetByIdQuery,
  usePutApiV2PortalOrderPaymentTypeMutation,
  usePutApiV2PortalOrderDurationMutation,
  usePutApiV2PortalOrderVoucherMutation,
  usePutApiV2PortalOrderCancelByIdMutation,
  usePostApiV2PortalOrderPayMutation,
  useGetApiV2PortalOrderPlanListQuery,
  usePostApiV2PortalOrderPlanOrderMutation,
  useGetApiV2PortalProductBundleListByProductCategoryIdQuery,
  useGetApiV2PortalProductCategoryListQuery,
  useGetApiV2PortalProfileGetQuery,
  usePostApiV2PortalProfileGetNotificationStatusMutation,
  usePutApiV2PortalProfileEditMutation,
  usePutApiV2PortalProfileEditAccountTypeMutation,
  usePutApiV2PortalProfileEditEmailMutation,
  usePostApiV2PortalProfileConfirmEmailMutation,
  usePutApiV2PortalProfileEditPhoneNumberMutation,
  usePostApiV2PortalProfileConfirmPhoneNumberMutation,
  usePutApiV2PortalProfileEditEmailNotificationMutation,
  usePutApiV2PortalProfileEditPhoneNotificationMutation,
  usePostApiV2PortalProfileChangePasswordMutation,
  useGetApiV2RabbitRabbitHostListQuery,
  useGetApiV2RabbitRabbitHostGetByIdQuery,
  useGetApiV2RabbitRabbitHostPayByIdQuery,
  usePostApiV2RabbitRabbitHostCreateMutation,
  usePutApiV2RabbitRabbitHostChangeServiceMutation,
  useDeleteApiV2RabbitRabbitHostDeleteByIdMutation,
  usePostApiV2RabbitRabbitHostChangeExchangeMutation,
  useGetApiV2RabbitRabbitUserListByRabbitHostIdQuery,
  usePostApiV2RabbitRabbitUserCreateMutation,
  useDeleteApiV2RabbitRabbitUserDeleteByIdMutation,
  usePostApiV2RabbitRabbitUserChangePasswordMutation,
  useGetApiV2SmsReceiveContentListQuery,
  useGetApiV2PortalReferralGetQuery,
  usePostApiV2PortalReferralJoinMutation,
  useGetApiV2SmsSendContentListQuery,
  usePostApiV2SmsSendContentSendSmsMutation,
  usePostApiV2SmsSendContentSend1ToNMutation,
  usePostApiV2SmsSendContentSendNToNMutation,
  usePostApiV2SmsGatewaySendSmsMutation,
  usePostApiV2SmsGatewayReceiveSmsMutation,
  useGetApiV2SmsSmsNumberListQuery,
  useGetApiV2SmsSmsNumberHostListQuery,
  usePostApiV2SmsSmsNumberHostCreateMutation,
  useDeleteApiV2SmsSmsNumberHostDeleteByIdMutation,
  useGetApiV2PortalSupportListQuery,
  usePostApiV2PortalSupportCreateMutation,
  useGetApiV2PortalSupportItemListBySupportIdQuery,
  usePostApiV2PortalSupportItemCreateMutation,
  useGetApiV2PortalSupportItemDownloadByIdQuery,
  useGetApiV2PortalSupportSubjectListQuery,
  usePostApiV2PortalSupportSubjectSelectListMutation,
  useGetApiV2PortalUserApiKeyListQuery,
  usePostApiV2PortalUserApiKeyCreateMutation,
  useDeleteApiV2PortalUserApiKeyDeleteByIdMutation,
  useGetApiV2PortalUserBillListQuery,
  useGetApiV2PortalUserBillGetByIdQuery,
  useGetApiV2PortalUserBillDownloadByIdQuery,
  useGetApiV2PortalUserCompanyGetQuery,
  usePutApiV2PortalUserCompanyEditMutation,
  useGetApiV2SmsUserSmsCreditGetBalanceQuery,
  useGetApiV2VmVmListQuery,
  useGetApiV2VmVmGetByIdQuery,
  useGetApiV2VmVmPayByIdQuery,
  usePostApiV2VmVmCreateMutation,
  usePutApiV2VmVmEditMutation,
  useDeleteApiV2VmVmDeleteByIdMutation,
  usePutApiV2VmVmRebuildMutation,
  usePutApiV2VmVmConnectByIdMutation,
  usePutApiV2VmVmDisconnectByIdMutation,
  usePutApiV2VmVmRebootByIdMutation,
  usePutApiV2VmVmShutdownByIdMutation,
  usePutApiV2VmVmResetByIdMutation,
  usePutApiV2VmVmStartByIdMutation,
  usePutApiV2VmVmStopByIdMutation,
  useGetApiV2VmVmIpListByVmIdQuery,
  usePostApiV2VmVmIpCreateMutation,
  useDeleteApiV2VmVmIpDeleteByIdMutation,
  usePostApiV2VmVmKmsGetMutation,
  useGetApiV2PortalWalletListQuery,
  useGetApiV2PortalWalletGetBalanceQuery,
  useGetApiV2PortalWalletPaymentListQuery,
  useGetApiV2PortalWalletPaymentGetByIdQuery,
  usePostApiV2PortalWalletPaymentCreateMutation,
  usePostApiV2PortalWalletPaymentPecCallBackMutation,
  usePostApiV2PortalWalletPaymentSepCallBackMutation,
  useGetApiV2WebWebHostListQuery,
  useGetApiV2WebWebHostGetByIdQuery,
  useGetApiV2WebWebHostGetLoginSessionByIdQuery,
  useGetApiV2WebWebHostPayByIdQuery,
  usePostApiV2WebWebHostCreateMutation,
  usePutApiV2WebWebHostEditMutation,
  useDeleteApiV2WebWebHostDeleteByIdMutation,
  useGetApiV2WebAlarmListQuery,
  useGetApiV2WebWebBlogListQuery,
  useGetApiV2WebWebBlogGetByLinkQuery,
  useGetApiV2WebWebBlogGetRandomArticlesByLinkQuery,
  useGetApiV2WebWebBlogGetHeaderArticlesQuery,
  useGetApiV2WebWebBlogCommentGetByIdQuery,
  usePostApiV2WebWebBlogCommentCreateMutation,
  usePostApiV2WebContactUsCreateMutation,
  usePostApiV2WebNewsLetterCreateMutation,
  usePostApiV2DomainWhoisGetMutation,
  useGetApiV2CdnZoneListQuery,
  useGetApiV2CdnZoneGetByZoneNameQuery,
  useGetApiV2CdnZoneGetNsStatusByZoneNameQuery,
  usePostApiV2CdnZoneCheckZoneMutation,
  usePostApiV2CdnZoneCreateMutation,
  useDeleteApiV2CdnZoneDeleteByIdMutation,
  usePutApiV2CdnZoneChangeClientCertTypeMutation,
  usePutApiV2CdnZoneChangeEdgeCertTypeMutation,
  usePutApiV2CdnZoneChangeHstsMutation,
  usePutApiV2CdnZoneChangeRedirectMutation,
  usePutApiV2CdnZoneChangeZoneTypeMutation,
  useGetApiV2CdnClientCertGetByZoneNameQuery,
  useGetApiV2CdnClientCertGetUserCertByZoneNameQuery,
  usePostApiV2CdnClientCertCreateUserCertMutation,
  useGetApiV2CdnEdgeCertGetByZoneNameQuery,
  useGetApiV2CdnEdgeCertGetUserCertByZoneNameQuery,
  usePostApiV2CdnEdgeCertCreateMutation,
  usePostApiV2CdnEdgeCertCreateUserCertMutation,
} = api;
