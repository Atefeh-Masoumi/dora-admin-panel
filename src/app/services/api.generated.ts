import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "src/app/services/baseQuery";
export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: (build) => ({
    getApiMyAccountUserLog: build.query<
      GetApiMyAccountUserLogApiResponse,
      GetApiMyAccountUserLogApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/user-log`,
        params: {
          UserId: queryArg.userId,
          FromDate: queryArg.fromDate,
          ToDate: queryArg.toDate,
          PageNumber: queryArg.pageNumber,
          PageSize: queryArg.pageSize,
        },
      }),
    }),
    getApiMyAccountRoleAccessTypeList: build.query<
      GetApiMyAccountRoleAccessTypeListApiResponse,
      GetApiMyAccountRoleAccessTypeListApiArg
    >({
      query: () => ({ url: `/api/my/account/role-access-type/list` }),
    }),
    getApiMyAccountRoleAccessListByUserId: build.query<
      GetApiMyAccountRoleAccessListByUserIdApiResponse,
      GetApiMyAccountRoleAccessListByUserIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/role-access/list/${queryArg.userId}`,
      }),
    }),
    putApiMyAccountRoleAccessEdit: build.mutation<
      PutApiMyAccountRoleAccessEditApiResponse,
      PutApiMyAccountRoleAccessEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/role-access/edit`,
        method: "PUT",
        body: queryArg.editRoleAccessModel,
      }),
    }),
    getApiMyAccountRoleList: build.query<
      GetApiMyAccountRoleListApiResponse,
      GetApiMyAccountRoleListApiArg
    >({
      query: () => ({ url: `/api/my/account/role/list` }),
    }),
    putApiMyAccountProfileEditTwoFactor: build.mutation<
      PutApiMyAccountProfileEditTwoFactorApiResponse,
      PutApiMyAccountProfileEditTwoFactorApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/profile/edit-two-factor`,
        method: "PUT",
        body: queryArg.twoFactorModel,
      }),
    }),
    getApiMyAccountProfileGetNotificationStatus: build.query<
      GetApiMyAccountProfileGetNotificationStatusApiResponse,
      GetApiMyAccountProfileGetNotificationStatusApiArg
    >({
      query: () => ({ url: `/api/my/account/profile/get-notification-status` }),
    }),
    getApiMyAccountProfileGet: build.query<
      GetApiMyAccountProfileGetApiResponse,
      GetApiMyAccountProfileGetApiArg
    >({
      query: () => ({ url: `/api/my/account/profile/get` }),
    }),
    putApiMyAccountProfileEditPhoneNumber: build.mutation<
      PutApiMyAccountProfileEditPhoneNumberApiResponse,
      PutApiMyAccountProfileEditPhoneNumberApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/profile/edit-phone-number`,
        method: "PUT",
        body: queryArg.editPhoneNumberModel,
      }),
    }),
    putApiMyAccountProfileEditPhoneNotification: build.mutation<
      PutApiMyAccountProfileEditPhoneNotificationApiResponse,
      PutApiMyAccountProfileEditPhoneNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/profile/edit-phone-notification`,
        method: "PUT",
        body: queryArg.editPhoneNotifyModel,
      }),
    }),
    putApiMyAccountProfileEditEmailNotification: build.mutation<
      PutApiMyAccountProfileEditEmailNotificationApiResponse,
      PutApiMyAccountProfileEditEmailNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/profile/edit-email-notification`,
        method: "PUT",
        body: queryArg.editEmailNotifyModel,
      }),
    }),
    putApiMyAccountProfileEditEmail: build.mutation<
      PutApiMyAccountProfileEditEmailApiResponse,
      PutApiMyAccountProfileEditEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/profile/edit-email`,
        method: "PUT",
        body: queryArg.editEmailModel,
      }),
    }),
    putApiMyAccountProfileEdit: build.mutation<
      PutApiMyAccountProfileEditApiResponse,
      PutApiMyAccountProfileEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/profile/edit`,
        method: "PUT",
        body: queryArg.editProfileModel,
      }),
    }),
    postApiMyAccountProfileConfirmPhoneNumber: build.mutation<
      PostApiMyAccountProfileConfirmPhoneNumberApiResponse,
      PostApiMyAccountProfileConfirmPhoneNumberApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/profile/confirm-phone-number`,
        method: "POST",
        body: queryArg.confirmPhoneNumberModel,
      }),
    }),
    postApiMyAccountProfileConfirmEmail: build.mutation<
      PostApiMyAccountProfileConfirmEmailApiResponse,
      PostApiMyAccountProfileConfirmEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/profile/confirm-email`,
        method: "POST",
        body: queryArg.confirmEmailModel,
      }),
    }),
    postApiMyAccountProfileChangePassword: build.mutation<
      PostApiMyAccountProfileChangePasswordApiResponse,
      PostApiMyAccountProfileChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/profile/change-password`,
        method: "POST",
        body: queryArg.changePasswordModel,
      }),
    }),
    getApiMyAccountNotificationShortList: build.query<
      GetApiMyAccountNotificationShortListApiResponse,
      GetApiMyAccountNotificationShortListApiArg
    >({
      query: () => ({ url: `/api/my/account/notification/short-list` }),
    }),
    putApiMyAccountNotificationSeenById: build.mutation<
      PutApiMyAccountNotificationSeenByIdApiResponse,
      PutApiMyAccountNotificationSeenByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/notification/seen/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiMyAccountNotificationList: build.query<
      GetApiMyAccountNotificationListApiResponse,
      GetApiMyAccountNotificationListApiArg
    >({
      query: () => ({ url: `/api/my/account/notification/list` }),
    }),
    getApiMyAccountCustomerUserList: build.query<
      GetApiMyAccountCustomerUserListApiResponse,
      GetApiMyAccountCustomerUserListApiArg
    >({
      query: () => ({ url: `/api/my/account/customer-user/list` }),
    }),
    postApiMyAccountCustomerUserChangeCustomer: build.mutation<
      PostApiMyAccountCustomerUserChangeCustomerApiResponse,
      PostApiMyAccountCustomerUserChangeCustomerApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/customer-user/change-customer`,
        method: "POST",
        body: queryArg.changeCustomerUserModel,
      }),
    }),
    deleteApiMyAccountCustomerUserDeleteByUserId: build.mutation<
      DeleteApiMyAccountCustomerUserDeleteByUserIdApiResponse,
      DeleteApiMyAccountCustomerUserDeleteByUserIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/customer-user/delete/${queryArg.userId}`,
        method: "DELETE",
      }),
    }),
    postApiMyAccountCustomerUserCreate: build.mutation<
      PostApiMyAccountCustomerUserCreateApiResponse,
      PostApiMyAccountCustomerUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/customer-user/create`,
        method: "POST",
        body: queryArg.createCustomerUserModel,
      }),
    }),
    getApiMyAccountCustomerGet: build.query<
      GetApiMyAccountCustomerGetApiResponse,
      GetApiMyAccountCustomerGetApiArg
    >({
      query: () => ({ url: `/api/my/account/customer/get` }),
    }),
    putApiMyAccountCustomerEdit: build.mutation<
      PutApiMyAccountCustomerEditApiResponse,
      PutApiMyAccountCustomerEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/customer/edit`,
        method: "PUT",
        body: queryArg.editCustomerModel,
      }),
    }),
    putApiMyAccountCustomerConvertToLegal: build.mutation<
      PutApiMyAccountCustomerConvertToLegalApiResponse,
      PutApiMyAccountCustomerConvertToLegalApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/customer/convert-to-legal`,
        method: "PUT",
        body: queryArg.convertCustomerToLegalModel,
      }),
    }),
    postApiMyAccountTwoFactorLogin: build.mutation<
      PostApiMyAccountTwoFactorLoginApiResponse,
      PostApiMyAccountTwoFactorLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/two-factor-login`,
        method: "POST",
        body: queryArg.twoFactorLoginModel,
      }),
    }),
    getApiMyAccountSsoUrl: build.query<
      GetApiMyAccountSsoUrlApiResponse,
      GetApiMyAccountSsoUrlApiArg
    >({
      query: () => ({ url: `/api/my/account/sso-url` }),
    }),
    postApiMyAccountSsoLogin: build.mutation<
      PostApiMyAccountSsoLoginApiResponse,
      PostApiMyAccountSsoLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/sso-login`,
        method: "POST",
        body: queryArg.ssoLoginModel,
      }),
    }),
    postApiMyAccountRegister: build.mutation<
      PostApiMyAccountRegisterApiResponse,
      PostApiMyAccountRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/register`,
        method: "POST",
        body: queryArg.registerModel,
      }),
    }),
    postApiMyAccountLogout: build.mutation<
      PostApiMyAccountLogoutApiResponse,
      PostApiMyAccountLogoutApiArg
    >({
      query: () => ({ url: `/api/my/account/logout`, method: "POST" }),
    }),
    postApiMyAccountLogin: build.mutation<
      PostApiMyAccountLoginApiResponse,
      PostApiMyAccountLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/login`,
        method: "POST",
        body: queryArg.loginModel,
      }),
    }),
    postApiMyAccountForgotConfirm: build.mutation<
      PostApiMyAccountForgotConfirmApiResponse,
      PostApiMyAccountForgotConfirmApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/forgot-confirm`,
        method: "POST",
        body: queryArg.forgotConfirmModel,
      }),
    }),
    postApiMyAccountForgot: build.mutation<
      PostApiMyAccountForgotApiResponse,
      PostApiMyAccountForgotApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/forgot`,
        method: "POST",
        body: queryArg.forgotModel,
      }),
    }),
    getApiMyAccountCaptcha: build.query<
      GetApiMyAccountCaptchaApiResponse,
      GetApiMyAccountCaptchaApiArg
    >({
      query: () => ({ url: `/api/my/account/captcha` }),
    }),
    getApiMyAssetEquipmentTypeList: build.query<
      GetApiMyAssetEquipmentTypeListApiResponse,
      GetApiMyAssetEquipmentTypeListApiArg
    >({
      query: () => ({ url: `/api/my/asset/equipment/type-list` }),
    }),
    getApiMyAssetEquipmentBrandList: build.query<
      GetApiMyAssetEquipmentBrandListApiResponse,
      GetApiMyAssetEquipmentBrandListApiArg
    >({
      query: () => ({ url: `/api/my/asset/equipment/brand-list` }),
    }),
    getApiMyAssetEquipmentListByTypeIdAndBrandId: build.query<
      GetApiMyAssetEquipmentListByTypeIdAndBrandIdApiResponse,
      GetApiMyAssetEquipmentListByTypeIdAndBrandIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/asset/equipment/list/${queryArg.typeId}/${queryArg.brandId}`,
      }),
    }),
    getApiMyBareMetalHostList: build.query<
      GetApiMyBareMetalHostListApiResponse,
      GetApiMyBareMetalHostListApiArg
    >({
      query: () => ({ url: `/api/my/bare-metal/host/list` }),
    }),
    getApiMyBareMetalHostGetById: build.query<
      GetApiMyBareMetalHostGetByIdApiResponse,
      GetApiMyBareMetalHostGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/bare-metal/host/get/${queryArg.id}`,
      }),
    }),
    deleteApiMyBareMetalHostDeleteById: build.mutation<
      DeleteApiMyBareMetalHostDeleteByIdApiResponse,
      DeleteApiMyBareMetalHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/bare-metal/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyBareMetalHostCreate: build.mutation<
      PostApiMyBareMetalHostCreateApiResponse,
      PostApiMyBareMetalHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/bare-metal/host/create`,
        method: "POST",
        body: queryArg.createBareMetalModel,
      }),
    }),
    getApiMyColocationList: build.query<
      GetApiMyColocationListApiResponse,
      GetApiMyColocationListApiArg
    >({
      query: () => ({ url: `/api/my/colocation/list` }),
    }),
    getApiMyColocationGetById: build.query<
      GetApiMyColocationGetByIdApiResponse,
      GetApiMyColocationGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/colocation/get/${queryArg.id}` }),
    }),
    deleteApiMyColocationDeleteById: build.mutation<
      DeleteApiMyColocationDeleteByIdApiResponse,
      DeleteApiMyColocationDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/colocation/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyColocationCreate: build.mutation<
      PostApiMyColocationCreateApiResponse,
      PostApiMyColocationCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/colocation/create`,
        method: "POST",
        body: queryArg.createColocationModel,
      }),
    }),
    getApiMyDashboardUsageByCategoryId: build.query<
      GetApiMyDashboardUsageByCategoryIdApiResponse,
      GetApiMyDashboardUsageByCategoryIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dashboard/usage/${queryArg.categoryId}`,
      }),
    }),
    getApiMyDashboardFinancial: build.query<
      GetApiMyDashboardFinancialApiResponse,
      GetApiMyDashboardFinancialApiArg
    >({
      query: () => ({ url: `/api/my/dashboard/financial` }),
    }),
    getApiMyDatacenterIpListById: build.query<
      GetApiMyDatacenterIpListByIdApiResponse,
      GetApiMyDatacenterIpListByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/datacenter/ip/list/${queryArg.id}`,
      }),
    }),
    deleteApiMyDatacenterIpDeleteById: build.mutation<
      DeleteApiMyDatacenterIpDeleteByIdApiResponse,
      DeleteApiMyDatacenterIpDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/datacenter/ip/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyDatacenterImageList: build.query<
      GetApiMyDatacenterImageListApiResponse,
      GetApiMyDatacenterImageListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/datacenter/image/list`,
        params: {
          DatacenterId: queryArg.datacenterId,
          ProductId: queryArg.productId,
          HypervisorTypeId: queryArg.hypervisorTypeId,
        },
      }),
    }),
    getApiMyDatacenterList: build.query<
      GetApiMyDatacenterListApiResponse,
      GetApiMyDatacenterListApiArg
    >({
      query: () => ({ url: `/api/my/datacenter/list` }),
    }),
    getApiMyDnsCdnHostList: build.query<
      GetApiMyDnsCdnHostListApiResponse,
      GetApiMyDnsCdnHostListApiArg
    >({
      query: () => ({ url: `/api/my/dns-cdn/host/list` }),
    }),
    getApiMyDnsCdnHostGetNsById: build.query<
      GetApiMyDnsCdnHostGetNsByIdApiResponse,
      GetApiMyDnsCdnHostGetNsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/get-ns/${queryArg.id}`,
      }),
    }),
    getApiMyDnsCdnHostGetCdnById: build.query<
      GetApiMyDnsCdnHostGetCdnByIdApiResponse,
      GetApiMyDnsCdnHostGetCdnByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/get-cdn/${queryArg.id}`,
      }),
    }),
    getApiMyDnsCdnHostGetAnalyticByIdAndPeriodId: build.query<
      GetApiMyDnsCdnHostGetAnalyticByIdAndPeriodIdApiResponse,
      GetApiMyDnsCdnHostGetAnalyticByIdAndPeriodIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/get-analytic/${queryArg.id}/${queryArg.periodId}`,
      }),
    }),
    getApiMyDnsCdnHostGetById: build.query<
      GetApiMyDnsCdnHostGetByIdApiResponse,
      GetApiMyDnsCdnHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/dns-cdn/host/get/${queryArg.id}` }),
    }),
    deleteApiMyDnsCdnHostDeleteById: build.mutation<
      DeleteApiMyDnsCdnHostDeleteByIdApiResponse,
      DeleteApiMyDnsCdnHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyDnsCdnHostCreate: build.mutation<
      PostApiMyDnsCdnHostCreateApiResponse,
      PostApiMyDnsCdnHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/create`,
        method: "POST",
        body: queryArg.createDnsCdnModel,
      }),
    }),
    postApiMyDnsCdnHostCheck: build.mutation<
      PostApiMyDnsCdnHostCheckApiResponse,
      PostApiMyDnsCdnHostCheckApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/check`,
        method: "POST",
        body: queryArg.checkDnsCdnModel,
      }),
    }),
    putApiMyDnsCdnHostChangeOriginCertType: build.mutation<
      PutApiMyDnsCdnHostChangeOriginCertTypeApiResponse,
      PutApiMyDnsCdnHostChangeOriginCertTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/change-origin-cert-type`,
        method: "PUT",
        body: queryArg.changeOriginCertTypeModel,
      }),
    }),
    putApiMyDnsCdnHostChangeNonWwwRedirect: build.mutation<
      PutApiMyDnsCdnHostChangeNonWwwRedirectApiResponse,
      PutApiMyDnsCdnHostChangeNonWwwRedirectApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/change-non-www-redirect`,
        method: "PUT",
        body: queryArg.changeNonWwwRedirectModel,
      }),
    }),
    putApiMyDnsCdnHostChangeHttpsRedirect: build.mutation<
      PutApiMyDnsCdnHostChangeHttpsRedirectApiResponse,
      PutApiMyDnsCdnHostChangeHttpsRedirectApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/change-https-redirect`,
        method: "PUT",
        body: queryArg.changeHttpsRedirectModel,
      }),
    }),
    putApiMyDnsCdnHostChangeHsts: build.mutation<
      PutApiMyDnsCdnHostChangeHstsApiResponse,
      PutApiMyDnsCdnHostChangeHstsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/change-hsts`,
        method: "PUT",
        body: queryArg.changeHstsModel,
      }),
    }),
    putApiMyDnsCdnHostChangeEdgeCertType: build.mutation<
      PutApiMyDnsCdnHostChangeEdgeCertTypeApiResponse,
      PutApiMyDnsCdnHostChangeEdgeCertTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/change-edge-cert-type`,
        method: "PUT",
        body: queryArg.changeEdgeCertTypeModel,
      }),
    }),
    putApiMyDnsCdnHostChangeCdnType: build.mutation<
      PutApiMyDnsCdnHostChangeCdnTypeApiResponse,
      PutApiMyDnsCdnHostChangeCdnTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/change-cdn-type`,
        method: "PUT",
        body: queryArg.changeCdnTypeModel,
      }),
    }),
    getApiMyDnsCdnDnsRecordListByDnsCdnHostId: build.query<
      GetApiMyDnsCdnDnsRecordListByDnsCdnHostIdApiResponse,
      GetApiMyDnsCdnDnsRecordListByDnsCdnHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/dns-record/list/${queryArg.dnsCdnHostId}`,
      }),
    }),
    getApiMyDnsCdnDnsRecordGetById: build.query<
      GetApiMyDnsCdnDnsRecordGetByIdApiResponse,
      GetApiMyDnsCdnDnsRecordGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/dns-record/get/${queryArg.id}`,
      }),
    }),
    putApiMyDnsCdnDnsRecordEditById: build.mutation<
      PutApiMyDnsCdnDnsRecordEditByIdApiResponse,
      PutApiMyDnsCdnDnsRecordEditByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/dns-record/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editDnsRecordModel,
      }),
    }),
    deleteApiMyDnsCdnDnsRecordDeleteById: build.mutation<
      DeleteApiMyDnsCdnDnsRecordDeleteByIdApiResponse,
      DeleteApiMyDnsCdnDnsRecordDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/dns-record/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyDnsCdnDnsRecordCreate: build.mutation<
      PostApiMyDnsCdnDnsRecordCreateApiResponse,
      PostApiMyDnsCdnDnsRecordCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/dns-record/create`,
        method: "POST",
        body: queryArg.createDnsRecordModel,
      }),
    }),
    putApiMyDnsCdnDnsRecordChangeProxyById: build.mutation<
      PutApiMyDnsCdnDnsRecordChangeProxyByIdApiResponse,
      PutApiMyDnsCdnDnsRecordChangeProxyByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/dns-record/change-proxy/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiMyDnsCdnRouteListByDnsCdnHostId: build.query<
      GetApiMyDnsCdnRouteListByDnsCdnHostIdApiResponse,
      GetApiMyDnsCdnRouteListByDnsCdnHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/route/list/${queryArg.dnsCdnHostId}`,
      }),
    }),
    getApiMyDnsCdnRouteGetById: build.query<
      GetApiMyDnsCdnRouteGetByIdApiResponse,
      GetApiMyDnsCdnRouteGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/route/get/${queryArg.id}`,
      }),
    }),
    putApiMyDnsCdnRouteEditById: build.mutation<
      PutApiMyDnsCdnRouteEditByIdApiResponse,
      PutApiMyDnsCdnRouteEditByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/route/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editCdnRouteModel,
      }),
    }),
    deleteApiMyDnsCdnRouteDeleteById: build.mutation<
      DeleteApiMyDnsCdnRouteDeleteByIdApiResponse,
      DeleteApiMyDnsCdnRouteDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/route/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyDnsCdnOriginCertGetUserCertByDnsCdnHostId: build.query<
      GetApiMyDnsCdnOriginCertGetUserCertByDnsCdnHostIdApiResponse,
      GetApiMyDnsCdnOriginCertGetUserCertByDnsCdnHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/origin-cert/get-user-cert/${queryArg.dnsCdnHostId}`,
      }),
    }),
    getApiMyDnsCdnOriginCertGetByDnsCdnHostId: build.query<
      GetApiMyDnsCdnOriginCertGetByDnsCdnHostIdApiResponse,
      GetApiMyDnsCdnOriginCertGetByDnsCdnHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/origin-cert/get/${queryArg.dnsCdnHostId}`,
      }),
    }),
    postApiMyDnsCdnOriginCertCreateUserCert: build.mutation<
      PostApiMyDnsCdnOriginCertCreateUserCertApiResponse,
      PostApiMyDnsCdnOriginCertCreateUserCertApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/origin-cert/create-user-cert`,
        method: "POST",
        body: queryArg.createCdnOriginUserCertModel,
      }),
    }),
    getApiMyDnsCdnEdgeCertGetUserCertByDnsCdnHostId: build.query<
      GetApiMyDnsCdnEdgeCertGetUserCertByDnsCdnHostIdApiResponse,
      GetApiMyDnsCdnEdgeCertGetUserCertByDnsCdnHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/edge-cert/get-user-cert/${queryArg.dnsCdnHostId}`,
      }),
    }),
    getApiMyDnsCdnEdgeCertGetByDnsCdnHostId: build.query<
      GetApiMyDnsCdnEdgeCertGetByDnsCdnHostIdApiResponse,
      GetApiMyDnsCdnEdgeCertGetByDnsCdnHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/edge-cert/get/${queryArg.dnsCdnHostId}`,
      }),
    }),
    postApiMyDnsCdnEdgeCertCreateUserCert: build.mutation<
      PostApiMyDnsCdnEdgeCertCreateUserCertApiResponse,
      PostApiMyDnsCdnEdgeCertCreateUserCertApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/edge-cert/create-user-cert`,
        method: "POST",
        body: queryArg.createCdnEdgeUserCertModel,
      }),
    }),
    postApiMyDnsCdnEdgeCertCreate: build.mutation<
      PostApiMyDnsCdnEdgeCertCreateApiResponse,
      PostApiMyDnsCdnEdgeCertCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/edge-cert/create`,
        method: "POST",
        body: queryArg.createCdnEdgeCertModel,
      }),
    }),
    postApiMyDomainHostResendVerificationById: build.mutation<
      PostApiMyDomainHostResendVerificationByIdApiResponse,
      PostApiMyDomainHostResendVerificationByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/host/resend-verification/${queryArg.id}`,
        method: "POST",
      }),
    }),
    getApiMyDomainHostList: build.query<
      GetApiMyDomainHostListApiResponse,
      GetApiMyDomainHostListApiArg
    >({
      query: () => ({ url: `/api/my/domain/host/list` }),
    }),
    getApiMyDomainHostGetStatusById: build.query<
      GetApiMyDomainHostGetStatusByIdApiResponse,
      GetApiMyDomainHostGetStatusByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/host/get-status/${queryArg.id}`,
      }),
    }),
    getApiMyDomainHostGetById: build.query<
      GetApiMyDomainHostGetByIdApiResponse,
      GetApiMyDomainHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/domain/host/get/${queryArg.id}` }),
    }),
    deleteApiMyDomainHostDeleteById: build.mutation<
      DeleteApiMyDomainHostDeleteByIdApiResponse,
      DeleteApiMyDomainHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyDomainHostRegister: build.mutation<
      PostApiMyDomainHostRegisterApiResponse,
      PostApiMyDomainHostRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/host/register`,
        method: "POST",
        body: queryArg.registerDomainModel,
      }),
    }),
    postApiMyDomainHostCheckDomain: build.mutation<
      PostApiMyDomainHostCheckDomainApiResponse,
      PostApiMyDomainHostCheckDomainApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/host/check-domain`,
        method: "POST",
        body: queryArg.checkDomainModel,
      }),
    }),
    putApiMyDomainHostChangeNs: build.mutation<
      PutApiMyDomainHostChangeNsApiResponse,
      PutApiMyDomainHostChangeNsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/host/change-ns`,
        method: "PUT",
        body: queryArg.changeNsModel,
      }),
    }),
    putApiMyDomainHostChangeContact: build.mutation<
      PutApiMyDomainHostChangeContactApiResponse,
      PutApiMyDomainHostChangeContactApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/host/change-contact`,
        method: "PUT",
        body: queryArg.changeContactModel,
      }),
    }),
    getApiMyHomeIndex: build.query<
      GetApiMyHomeIndexApiResponse,
      GetApiMyHomeIndexApiArg
    >({
      query: () => ({ url: `/api/my/home/index` }),
    }),
    getApiMyHostHypervisorList: build.query<
      GetApiMyHostHypervisorListApiResponse,
      GetApiMyHostHypervisorListApiArg
    >({
      query: () => ({ url: `/api/my/host/hypervisor/list` }),
    }),
    getApiMyHostProjectList: build.query<
      GetApiMyHostProjectListApiResponse,
      GetApiMyHostProjectListApiArg
    >({
      query: () => ({ url: `/api/my/host/project/list` }),
    }),
    getApiMyHostProjectGetById: build.query<
      GetApiMyHostProjectGetByIdApiResponse,
      GetApiMyHostProjectGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/host/project/get/${queryArg.id}` }),
    }),
    putApiMyHostProjectEditById: build.mutation<
      PutApiMyHostProjectEditByIdApiResponse,
      PutApiMyHostProjectEditByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/host/project/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.vmProjectEditModel,
      }),
    }),
    deleteApiMyHostProjectDeleteById: build.mutation<
      DeleteApiMyHostProjectDeleteByIdApiResponse,
      DeleteApiMyHostProjectDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/host/project/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyHostProjectCreate: build.mutation<
      PostApiMyHostProjectCreateApiResponse,
      PostApiMyHostProjectCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/host/project/create`,
        method: "POST",
        body: queryArg.vmProjectCreateModel,
      }),
    }),
    getApiMyKubernetesCloudSecretListByNamespaceId: build.query<
      GetApiMyKubernetesCloudSecretListByNamespaceIdApiResponse,
      GetApiMyKubernetesCloudSecretListByNamespaceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/secret/list/${queryArg.namespaceId}`,
        params: { secretTypeId: queryArg.secretTypeId },
      }),
    }),
    getApiMyKubernetesCloudSecretGetById: build.query<
      GetApiMyKubernetesCloudSecretGetByIdApiResponse,
      GetApiMyKubernetesCloudSecretGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/secret/get/${queryArg.id}`,
      }),
    }),
    putApiMyKubernetesCloudSecretEdit: build.mutation<
      PutApiMyKubernetesCloudSecretEditApiResponse,
      PutApiMyKubernetesCloudSecretEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/secret/edit`,
        method: "PUT",
        body: queryArg.editKuberCloudSecretModel,
      }),
    }),
    deleteApiMyKubernetesCloudSecretDeleteById: build.mutation<
      DeleteApiMyKubernetesCloudSecretDeleteByIdApiResponse,
      DeleteApiMyKubernetesCloudSecretDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/secret/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyKubernetesCloudSecretCreate: build.mutation<
      PostApiMyKubernetesCloudSecretCreateApiResponse,
      PostApiMyKubernetesCloudSecretCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/secret/create`,
        method: "POST",
        body: queryArg.createKuberCloudSecretModel,
      }),
    }),
    getApiMyKubernetesCloudHostPortListByNamespaceId: build.query<
      GetApiMyKubernetesCloudHostPortListByNamespaceIdApiResponse,
      GetApiMyKubernetesCloudHostPortListByNamespaceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/host/port/list/${queryArg.namespaceId}`,
      }),
    }),
    putApiMyKubernetesCloudIngressRuleEdit: build.mutation<
      PutApiMyKubernetesCloudIngressRuleEditApiResponse,
      PutApiMyKubernetesCloudIngressRuleEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/ingress-rule/edit`,
        method: "PUT",
        body: queryArg.editKuberCloudIngressRuleModel,
      }),
    }),
    deleteApiMyKubernetesCloudIngressRuleDelete: build.mutation<
      DeleteApiMyKubernetesCloudIngressRuleDeleteApiResponse,
      DeleteApiMyKubernetesCloudIngressRuleDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/ingress-rule/delete`,
        method: "DELETE",
        body: queryArg.deleteKuberCloudIngressRuleModel,
      }),
    }),
    postApiMyKubernetesCloudIngressRuleCreate: build.mutation<
      PostApiMyKubernetesCloudIngressRuleCreateApiResponse,
      PostApiMyKubernetesCloudIngressRuleCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/ingress-rule/create`,
        method: "POST",
        body: queryArg.createKuberCloudIngressRuleModel,
      }),
    }),
    getApiMyKubernetesCloudIngressListByNamespaceId: build.query<
      GetApiMyKubernetesCloudIngressListByNamespaceIdApiResponse,
      GetApiMyKubernetesCloudIngressListByNamespaceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/ingress/list/${queryArg.namespaceId}`,
      }),
    }),
    getApiMyKubernetesCloudIngressGetById: build.query<
      GetApiMyKubernetesCloudIngressGetByIdApiResponse,
      GetApiMyKubernetesCloudIngressGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/ingress/get/${queryArg.id}`,
      }),
    }),
    deleteApiMyKubernetesCloudIngressDeleteByIngressId: build.mutation<
      DeleteApiMyKubernetesCloudIngressDeleteByIngressIdApiResponse,
      DeleteApiMyKubernetesCloudIngressDeleteByIngressIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/ingress/delete/${queryArg.ingressId}`,
        method: "DELETE",
      }),
    }),
    postApiMyKubernetesCloudIngressCreate: build.mutation<
      PostApiMyKubernetesCloudIngressCreateApiResponse,
      PostApiMyKubernetesCloudIngressCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/ingress/create`,
        method: "POST",
        body: queryArg.createKuberCloudIngressModel,
      }),
    }),
    getApiMyKubernetesCloudCategoryList: build.query<
      GetApiMyKubernetesCloudCategoryListApiResponse,
      GetApiMyKubernetesCloudCategoryListApiArg
    >({
      query: () => ({ url: `/api/my/kubernetes/cloud/category/list` }),
    }),
    getApiMyKubernetesCloudImageList: build.query<
      GetApiMyKubernetesCloudImageListApiResponse,
      GetApiMyKubernetesCloudImageListApiArg
    >({
      query: () => ({ url: `/api/my/kubernetes/cloud/image/list` }),
    }),
    getApiMyKubernetesCloudHostList: build.query<
      GetApiMyKubernetesCloudHostListApiResponse,
      GetApiMyKubernetesCloudHostListApiArg
    >({
      query: () => ({ url: `/api/my/kubernetes/cloud/host/list` }),
    }),
    getApiMyKubernetesCloudHostGetById: build.query<
      GetApiMyKubernetesCloudHostGetByIdApiResponse,
      GetApiMyKubernetesCloudHostGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/host/get/${queryArg.id}`,
      }),
    }),
    putApiMyKubernetesCloudHostEditById: build.mutation<
      PutApiMyKubernetesCloudHostEditByIdApiResponse,
      PutApiMyKubernetesCloudHostEditByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/host/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editKuberCloudHostModel,
      }),
    }),
    deleteApiMyKubernetesCloudHostDeleteById: build.mutation<
      DeleteApiMyKubernetesCloudHostDeleteByIdApiResponse,
      DeleteApiMyKubernetesCloudHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyKubernetesCloudHostCreate: build.mutation<
      PostApiMyKubernetesCloudHostCreateApiResponse,
      PostApiMyKubernetesCloudHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/host/create`,
        method: "POST",
        body: queryArg.createKuberCloudHostModel,
      }),
    }),
    getApiMyKubernetesCloudFirewallListByNamespaceId: build.query<
      GetApiMyKubernetesCloudFirewallListByNamespaceIdApiResponse,
      GetApiMyKubernetesCloudFirewallListByNamespaceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/firewall/list/${queryArg.namespaceId}`,
      }),
    }),
    deleteApiMyKubernetesCloudFirewallDeleteById: build.mutation<
      DeleteApiMyKubernetesCloudFirewallDeleteByIdApiResponse,
      DeleteApiMyKubernetesCloudFirewallDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/firewall/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyKubernetesCloudFirewallCreate: build.mutation<
      PostApiMyKubernetesCloudFirewallCreateApiResponse,
      PostApiMyKubernetesCloudFirewallCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/firewall/create`,
        method: "POST",
        body: queryArg.createKuberCloudFirewallModel,
      }),
    }),
    getApiMyKubernetesCloudDeploymentEnvListByDeploymentId: build.query<
      GetApiMyKubernetesCloudDeploymentEnvListByDeploymentIdApiResponse,
      GetApiMyKubernetesCloudDeploymentEnvListByDeploymentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/deployment/env/list/${queryArg.deploymentId}`,
      }),
    }),
    getApiMyKubernetesCloudDeploymentEnvGetById: build.query<
      GetApiMyKubernetesCloudDeploymentEnvGetByIdApiResponse,
      GetApiMyKubernetesCloudDeploymentEnvGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/deployment/env/get/${queryArg.id}`,
      }),
    }),
    getApiMyKubernetesCloudDeploymentListByNamespaceId: build.query<
      GetApiMyKubernetesCloudDeploymentListByNamespaceIdApiResponse,
      GetApiMyKubernetesCloudDeploymentListByNamespaceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/deployment/list/${queryArg.namespaceId}`,
      }),
    }),
    getApiMyKubernetesCloudDeploymentGetById: build.query<
      GetApiMyKubernetesCloudDeploymentGetByIdApiResponse,
      GetApiMyKubernetesCloudDeploymentGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/deployment/get/${queryArg.id}`,
      }),
    }),
    putApiMyKubernetesCloudDeploymentEdit: build.mutation<
      PutApiMyKubernetesCloudDeploymentEditApiResponse,
      PutApiMyKubernetesCloudDeploymentEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/deployment/edit`,
        method: "PUT",
        body: queryArg.editKuberCloudDeploymentModel,
      }),
    }),
    deleteApiMyKubernetesCloudDeploymentDeleteById: build.mutation<
      DeleteApiMyKubernetesCloudDeploymentDeleteByIdApiResponse,
      DeleteApiMyKubernetesCloudDeploymentDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/deployment/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyKubernetesCloudDeploymentCreate: build.mutation<
      PostApiMyKubernetesCloudDeploymentCreateApiResponse,
      PostApiMyKubernetesCloudDeploymentCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/deployment/create`,
        method: "POST",
        body: queryArg.createKuberCloudDeploymentModel,
      }),
    }),
    getApiMyKubernetesCloudConfigmapListByNamespaceId: build.query<
      GetApiMyKubernetesCloudConfigmapListByNamespaceIdApiResponse,
      GetApiMyKubernetesCloudConfigmapListByNamespaceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/configmap/list/${queryArg.namespaceId}`,
      }),
    }),
    getApiMyKubernetesCloudConfigmapGetById: build.query<
      GetApiMyKubernetesCloudConfigmapGetByIdApiResponse,
      GetApiMyKubernetesCloudConfigmapGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/configmap/get/${queryArg.id}`,
      }),
    }),
    putApiMyKubernetesCloudConfigmapEdit: build.mutation<
      PutApiMyKubernetesCloudConfigmapEditApiResponse,
      PutApiMyKubernetesCloudConfigmapEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/configmap/edit`,
        method: "PUT",
        body: queryArg.editKuberCloudConfigmapModel,
      }),
    }),
    deleteApiMyKubernetesCloudConfigmapDeleteById: build.mutation<
      DeleteApiMyKubernetesCloudConfigmapDeleteByIdApiResponse,
      DeleteApiMyKubernetesCloudConfigmapDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/configmap/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyKubernetesCloudConfigmapCreate: build.mutation<
      PostApiMyKubernetesCloudConfigmapCreateApiResponse,
      PostApiMyKubernetesCloudConfigmapCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/configmap/create`,
        method: "POST",
        body: queryArg.createKuberCloudConfigmapModel,
      }),
    }),
    getApiMyKubernetesClusterVersionList: build.query<
      GetApiMyKubernetesClusterVersionListApiResponse,
      GetApiMyKubernetesClusterVersionListApiArg
    >({
      query: () => ({ url: `/api/my/kubernetes/cluster/version/list` }),
    }),
    getApiMyKubernetesClusterNodeByKubernetesHostId: build.query<
      GetApiMyKubernetesClusterNodeByKubernetesHostIdApiResponse,
      GetApiMyKubernetesClusterNodeByKubernetesHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cluster/node/${queryArg.kubernetesHostId}`,
      }),
    }),
    deleteApiMyKubernetesClusterNodeDeleteById: build.mutation<
      DeleteApiMyKubernetesClusterNodeDeleteByIdApiResponse,
      DeleteApiMyKubernetesClusterNodeDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cluster/node/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyKubernetesClusterNodeCreate: build.mutation<
      PostApiMyKubernetesClusterNodeCreateApiResponse,
      PostApiMyKubernetesClusterNodeCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cluster/node/create`,
        method: "POST",
        body: queryArg.createKubernetesNodeModel,
      }),
    }),
    getApiMyKubernetesClusterHostList: build.query<
      GetApiMyKubernetesClusterHostListApiResponse,
      GetApiMyKubernetesClusterHostListApiArg
    >({
      query: () => ({ url: `/api/my/kubernetes/cluster/host/list` }),
    }),
    getApiMyKubernetesClusterHostGetById: build.query<
      GetApiMyKubernetesClusterHostGetByIdApiResponse,
      GetApiMyKubernetesClusterHostGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cluster/host/get/${queryArg.id}`,
      }),
    }),
    deleteApiMyKubernetesClusterHostDeleteById: build.mutation<
      DeleteApiMyKubernetesClusterHostDeleteByIdApiResponse,
      DeleteApiMyKubernetesClusterHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cluster/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyKubernetesClusterHostCreate: build.mutation<
      PostApiMyKubernetesClusterHostCreateApiResponse,
      PostApiMyKubernetesClusterHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cluster/host/create`,
        method: "POST",
        body: queryArg.createKubernetesModel,
      }),
    }),
    getApiMyObjectStorageStorageUserListByStorageHostId: build.query<
      GetApiMyObjectStorageStorageUserListByStorageHostIdApiResponse,
      GetApiMyObjectStorageStorageUserListByStorageHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/object-storage/storage/user/list/${queryArg.storageHostId}`,
      }),
    }),
    deleteApiMyObjectStorageStorageUserDeleteById: build.mutation<
      DeleteApiMyObjectStorageStorageUserDeleteByIdApiResponse,
      DeleteApiMyObjectStorageStorageUserDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/object-storage/storage/user/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyObjectStorageStorageUserCreate: build.mutation<
      PostApiMyObjectStorageStorageUserCreateApiResponse,
      PostApiMyObjectStorageStorageUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/object-storage/storage/user/create`,
        method: "POST",
        body: queryArg.createStorageUserModel,
      }),
    }),
    getApiMyObjectStorageHostList: build.query<
      GetApiMyObjectStorageHostListApiResponse,
      GetApiMyObjectStorageHostListApiArg
    >({
      query: () => ({ url: `/api/my/object-storage/host/list` }),
    }),
    getApiMyObjectStorageHostGetById: build.query<
      GetApiMyObjectStorageHostGetByIdApiResponse,
      GetApiMyObjectStorageHostGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/object-storage/host/get/${queryArg.id}`,
      }),
    }),
    putApiMyObjectStorageHostEditById: build.mutation<
      PutApiMyObjectStorageHostEditByIdApiResponse,
      PutApiMyObjectStorageHostEditByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/object-storage/host/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editStorageHostModel,
      }),
    }),
    deleteApiMyObjectStorageHostDeleteById: build.mutation<
      DeleteApiMyObjectStorageHostDeleteByIdApiResponse,
      DeleteApiMyObjectStorageHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/object-storage/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyObjectStorageHostCreate: build.mutation<
      PostApiMyObjectStorageHostCreateApiResponse,
      PostApiMyObjectStorageHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/object-storage/host/create`,
        method: "POST",
        body: queryArg.createStorageHostModel,
      }),
    }),
    getApiMyPortalWalletTransactionList: build.query<
      GetApiMyPortalWalletTransactionListApiResponse,
      GetApiMyPortalWalletTransactionListApiArg
    >({
      query: () => ({ url: `/api/my/portal/wallet-transaction/list` }),
    }),
    getApiMyPortalWalletTransactionUsageReportByPeriod: build.query<
      GetApiMyPortalWalletTransactionUsageReportByPeriodApiResponse,
      GetApiMyPortalWalletTransactionUsageReportByPeriodApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/wallet-transaction/usage-report/${queryArg.period}`,
      }),
    }),
    getApiMyPortalWalletTransactionDownload: build.query<
      GetApiMyPortalWalletTransactionDownloadApiResponse,
      GetApiMyPortalWalletTransactionDownloadApiArg
    >({
      query: () => ({ url: `/api/my/portal/wallet-transaction/download` }),
    }),
    getApiMyPortalWalletGetBalance: build.query<
      GetApiMyPortalWalletGetBalanceApiResponse,
      GetApiMyPortalWalletGetBalanceApiArg
    >({
      query: () => ({ url: `/api/my/portal/wallet/get-balance` }),
    }),
    postApiMyPortalVoucherUse: build.mutation<
      PostApiMyPortalVoucherUseApiResponse,
      PostApiMyPortalVoucherUseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/voucher/use`,
        method: "POST",
        body: queryArg.useVoucherModel,
      }),
    }),
    getApiMyPortalReferralListByReferralId: build.query<
      GetApiMyPortalReferralListByReferralIdApiResponse,
      GetApiMyPortalReferralListByReferralIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/referral/list/${queryArg.referralId}`,
      }),
    }),
    getApiMyPortalReferralGet: build.query<
      GetApiMyPortalReferralGetApiResponse,
      GetApiMyPortalReferralGetApiArg
    >({
      query: () => ({ url: `/api/my/portal/referral/get` }),
    }),
    getApiMyPortalPromotionRedirectLinkByCode: build.query<
      GetApiMyPortalPromotionRedirectLinkByCodeApiResponse,
      GetApiMyPortalPromotionRedirectLinkByCodeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/promotion/redirect-link/${queryArg.code}`,
      }),
    }),
    getApiMyPortalProductItemListByProductId: build.query<
      GetApiMyPortalProductItemListByProductIdApiResponse,
      GetApiMyPortalProductItemListByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/product-item/list/${queryArg.productId}`,
      }),
    }),
    getApiMyPortalProductItemKubernetesPriceByWorkerNodeCount: build.query<
      GetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountApiResponse,
      GetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/product-item/kubernetes-price/${queryArg.workerNodeCount}`,
      }),
    }),
    getApiMyPortalProductBundleWebList: build.query<
      GetApiMyPortalProductBundleWebListApiResponse,
      GetApiMyPortalProductBundleWebListApiArg
    >({
      query: () => ({ url: `/api/my/portal/product-bundle/web-list` }),
    }),
    getApiMyPortalProductBundleVpcList: build.query<
      GetApiMyPortalProductBundleVpcListApiResponse,
      GetApiMyPortalProductBundleVpcListApiArg
    >({
      query: () => ({ url: `/api/my/portal/product-bundle/vpc-list` }),
    }),
    getApiMyPortalProductBundleVmList: build.query<
      GetApiMyPortalProductBundleVmListApiResponse,
      GetApiMyPortalProductBundleVmListApiArg
    >({
      query: () => ({ url: `/api/my/portal/product-bundle/vm-list` }),
    }),
    getApiMyPortalProductBundleStorageList: build.query<
      GetApiMyPortalProductBundleStorageListApiResponse,
      GetApiMyPortalProductBundleStorageListApiArg
    >({
      query: () => ({ url: `/api/my/portal/product-bundle/storage-list` }),
    }),
    getApiMyPortalProductBundleKuberClusterList: build.query<
      GetApiMyPortalProductBundleKuberClusterListApiResponse,
      GetApiMyPortalProductBundleKuberClusterListApiArg
    >({
      query: () => ({
        url: `/api/my/portal/product-bundle/kuber-cluster-list`,
      }),
    }),
    getApiMyPortalProductBundleKuberCloudList: build.query<
      GetApiMyPortalProductBundleKuberCloudListApiResponse,
      GetApiMyPortalProductBundleKuberCloudListApiArg
    >({
      query: () => ({ url: `/api/my/portal/product-bundle/kuber-cloud-list` }),
    }),
    getApiMyPortalProductBundleBareMetalList: build.query<
      GetApiMyPortalProductBundleBareMetalListApiResponse,
      GetApiMyPortalProductBundleBareMetalListApiArg
    >({
      query: () => ({ url: `/api/my/portal/product-bundle/bare-metal-list` }),
    }),
    getApiMyPortalProductList: build.query<
      GetApiMyPortalProductListApiResponse,
      GetApiMyPortalProductListApiArg
    >({
      query: () => ({ url: `/api/my/portal/product/list` }),
    }),
    getApiMyPortalProductGetById: build.query<
      GetApiMyPortalProductGetByIdApiResponse,
      GetApiMyPortalProductGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/product/get/${queryArg.id}`,
      }),
    }),
    getApiMyPortalPaymentProviderList: build.query<
      GetApiMyPortalPaymentProviderListApiResponse,
      GetApiMyPortalPaymentProviderListApiArg
    >({
      query: () => ({ url: `/api/my/portal/payment-provider/list` }),
    }),
    postApiMyPortalPaymentSepCallBack: build.mutation<
      PostApiMyPortalPaymentSepCallBackApiResponse,
      PostApiMyPortalPaymentSepCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/payment/sep-call-back`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postApiMyPortalPaymentPecCallBack: build.mutation<
      PostApiMyPortalPaymentPecCallBackApiResponse,
      PostApiMyPortalPaymentPecCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/payment/pec-call-back`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiMyPortalPaymentList: build.query<
      GetApiMyPortalPaymentListApiResponse,
      GetApiMyPortalPaymentListApiArg
    >({
      query: () => ({ url: `/api/my/portal/payment/list` }),
    }),
    getApiMyPortalPaymentGetById: build.query<
      GetApiMyPortalPaymentGetByIdApiResponse,
      GetApiMyPortalPaymentGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/payment/get/${queryArg.id}`,
      }),
    }),
    getApiMyPortalPaymentDownload: build.query<
      GetApiMyPortalPaymentDownloadApiResponse,
      GetApiMyPortalPaymentDownloadApiArg
    >({
      query: () => ({ url: `/api/my/portal/payment/download` }),
    }),
    postApiMyPortalPaymentCreate: build.mutation<
      PostApiMyPortalPaymentCreateApiResponse,
      PostApiMyPortalPaymentCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/payment/create`,
        method: "POST",
        body: queryArg.createPaymentModel,
      }),
    }),
    postApiMyPortalPaymentBpmCallBack: build.mutation<
      PostApiMyPortalPaymentBpmCallBackApiResponse,
      PostApiMyPortalPaymentBpmCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/payment/bpm-call-back`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postApiMyPortalOfferPay: build.mutation<
      PostApiMyPortalOfferPayApiResponse,
      PostApiMyPortalOfferPayApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/offer/pay`,
        method: "POST",
        body: queryArg.orderOfferPayModel,
      }),
    }),
    getApiMyPortalOfferList: build.query<
      GetApiMyPortalOfferListApiResponse,
      GetApiMyPortalOfferListApiArg
    >({
      query: () => ({ url: `/api/my/portal/offer/list` }),
    }),
    getApiMyPortalOfferGetById: build.query<
      GetApiMyPortalOfferGetByIdApiResponse,
      GetApiMyPortalOfferGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/portal/offer/get/${queryArg.id}` }),
    }),
    postApiMyPortalIssueSubjectSelectList: build.mutation<
      PostApiMyPortalIssueSubjectSelectListApiResponse,
      PostApiMyPortalIssueSubjectSelectListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/issue-subject/select-list`,
        method: "POST",
        body: queryArg.issueSubjectSelectListModel,
      }),
    }),
    getApiMyPortalIssueSubjectList: build.query<
      GetApiMyPortalIssueSubjectListApiResponse,
      GetApiMyPortalIssueSubjectListApiArg
    >({
      query: () => ({ url: `/api/my/portal/issue-subject/list` }),
    }),
    getApiMyPortalIssueItemListByIssueId: build.query<
      GetApiMyPortalIssueItemListByIssueIdApiResponse,
      GetApiMyPortalIssueItemListByIssueIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/issue-item/list/${queryArg.issueId}`,
      }),
    }),
    getApiMyPortalIssueItemDownloadById: build.query<
      GetApiMyPortalIssueItemDownloadByIdApiResponse,
      GetApiMyPortalIssueItemDownloadByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/issue-item/download/${queryArg.id}`,
      }),
    }),
    postApiMyPortalIssueItemCreate: build.mutation<
      PostApiMyPortalIssueItemCreateApiResponse,
      PostApiMyPortalIssueItemCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/issue-item/create`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiMyPortalIssueShortList: build.query<
      GetApiMyPortalIssueShortListApiResponse,
      GetApiMyPortalIssueShortListApiArg
    >({
      query: () => ({ url: `/api/my/portal/issue/short-list` }),
    }),
    getApiMyPortalIssueList: build.query<
      GetApiMyPortalIssueListApiResponse,
      GetApiMyPortalIssueListApiArg
    >({
      query: () => ({ url: `/api/my/portal/issue/list` }),
    }),
    postApiMyPortalIssueCreate: build.mutation<
      PostApiMyPortalIssueCreateApiResponse,
      PostApiMyPortalIssueCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/issue/create`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiMyPortalInvoiceUnpaid: build.query<
      GetApiMyPortalInvoiceUnpaidApiResponse,
      GetApiMyPortalInvoiceUnpaidApiArg
    >({
      query: () => ({ url: `/api/my/portal/invoice/unpaid` }),
    }),
    getApiMyPortalInvoiceSummary: build.query<
      GetApiMyPortalInvoiceSummaryApiResponse,
      GetApiMyPortalInvoiceSummaryApiArg
    >({
      query: () => ({ url: `/api/my/portal/invoice/summary` }),
    }),
    postApiMyPortalInvoicePay: build.mutation<
      PostApiMyPortalInvoicePayApiResponse,
      PostApiMyPortalInvoicePayApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/invoice/pay`,
        method: "POST",
        body: queryArg.payInvoiceModel,
      }),
    }),
    getApiMyPortalInvoiceList: build.query<
      GetApiMyPortalInvoiceListApiResponse,
      GetApiMyPortalInvoiceListApiArg
    >({
      query: () => ({ url: `/api/my/portal/invoice/list` }),
    }),
    getApiMyPortalInvoiceGetById: build.query<
      GetApiMyPortalInvoiceGetByIdApiResponse,
      GetApiMyPortalInvoiceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/invoice/get/${queryArg.id}`,
      }),
    }),
    getApiMyPortalInvoiceDownload: build.query<
      GetApiMyPortalInvoiceDownloadApiResponse,
      GetApiMyPortalInvoiceDownloadApiArg
    >({
      query: () => ({ url: `/api/my/portal/invoice/download` }),
    }),
    getApiMyPortalCustomerProductShortList: build.query<
      GetApiMyPortalCustomerProductShortListApiResponse,
      GetApiMyPortalCustomerProductShortListApiArg
    >({
      query: () => ({ url: `/api/my/portal/customer-product/short-list` }),
    }),
    getApiMyPortalCustomerProductListByProductId: build.query<
      GetApiMyPortalCustomerProductListByProductIdApiResponse,
      GetApiMyPortalCustomerProductListByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/customer-product/list/${queryArg.productId}`,
      }),
    }),
    getApiMyPortalCustomerBillShortList: build.query<
      GetApiMyPortalCustomerBillShortListApiResponse,
      GetApiMyPortalCustomerBillShortListApiArg
    >({
      query: () => ({ url: `/api/my/portal/customer-bill/short-list` }),
    }),
    getApiMyPortalCustomerBillList: build.query<
      GetApiMyPortalCustomerBillListApiResponse,
      GetApiMyPortalCustomerBillListApiArg
    >({
      query: () => ({ url: `/api/my/portal/customer-bill/list` }),
    }),
    getApiMyPortalCustomerBillGetById: build.query<
      GetApiMyPortalCustomerBillGetByIdApiResponse,
      GetApiMyPortalCustomerBillGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/customer-bill/get/${queryArg.id}`,
      }),
    }),
    getApiMyPortalCustomerBillDownloadById: build.query<
      GetApiMyPortalCustomerBillDownloadByIdApiResponse,
      GetApiMyPortalCustomerBillDownloadByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/customer-bill/download/${queryArg.id}`,
      }),
    }),
    getApiMyPortalCommissionList: build.query<
      GetApiMyPortalCommissionListApiResponse,
      GetApiMyPortalCommissionListApiArg
    >({
      query: () => ({ url: `/api/my/portal/commission/list` }),
    }),
    getApiMyPortalCalculateMonthList: build.query<
      GetApiMyPortalCalculateMonthListApiResponse,
      GetApiMyPortalCalculateMonthListApiArg
    >({
      query: () => ({ url: `/api/my/portal/calculate-month/list` }),
    }),
    getApiMyPortalBusinessUnitList: build.query<
      GetApiMyPortalBusinessUnitListApiResponse,
      GetApiMyPortalBusinessUnitListApiArg
    >({
      query: () => ({ url: `/api/my/portal/business-unit/list` }),
    }),
    putApiMyVmSnapshotRevertById: build.mutation<
      PutApiMyVmSnapshotRevertByIdApiResponse,
      PutApiMyVmSnapshotRevertByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/snapshot/revert/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiMyVmSnapshotListByVmHostId: build.query<
      GetApiMyVmSnapshotListByVmHostIdApiResponse,
      GetApiMyVmSnapshotListByVmHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/snapshot/list/${queryArg.vmHostId}`,
      }),
    }),
    getApiMyVmSnapshotGetById: build.query<
      GetApiMyVmSnapshotGetByIdApiResponse,
      GetApiMyVmSnapshotGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/vm/snapshot/get/${queryArg.id}` }),
    }),
    deleteApiMyVmSnapshotDeleteAllByVmHostId: build.mutation<
      DeleteApiMyVmSnapshotDeleteAllByVmHostIdApiResponse,
      DeleteApiMyVmSnapshotDeleteAllByVmHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/snapshot/delete-all/${queryArg.vmHostId}`,
        method: "DELETE",
      }),
    }),
    deleteApiMyVmSnapshotDeleteById: build.mutation<
      DeleteApiMyVmSnapshotDeleteByIdApiResponse,
      DeleteApiMyVmSnapshotDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/snapshot/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVmSnapshotCreate: build.mutation<
      PostApiMyVmSnapshotCreateApiResponse,
      PostApiMyVmSnapshotCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/snapshot/create`,
        method: "POST",
        body: queryArg.createSnapshotModel,
      }),
    }),
    putApiMyVmIsoUnmountById: build.mutation<
      PutApiMyVmIsoUnmountByIdApiResponse,
      PutApiMyVmIsoUnmountByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/iso/unmount/${queryArg.id}`,
        method: "PUT",
        body: queryArg.unmountModel,
      }),
    }),
    putApiMyVmIsoMountById: build.mutation<
      PutApiMyVmIsoMountByIdApiResponse,
      PutApiMyVmIsoMountByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/iso/mount/${queryArg.id}`,
        method: "PUT",
        body: queryArg.mountModel,
      }),
    }),
    getApiMyVmIsoListByDatacenterId: build.query<
      GetApiMyVmIsoListByDatacenterIdApiResponse,
      GetApiMyVmIsoListByDatacenterIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/iso/list/${queryArg.datacenterId}`,
      }),
    }),
    putApiMyVmHostStopById: build.mutation<
      PutApiMyVmHostStopByIdApiResponse,
      PutApiMyVmHostStopByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/stop/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiMyVmHostStartById: build.mutation<
      PutApiMyVmHostStartByIdApiResponse,
      PutApiMyVmHostStartByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/start/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiMyVmHostShutdownById: build.mutation<
      PutApiMyVmHostShutdownByIdApiResponse,
      PutApiMyVmHostShutdownByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/shutdown/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiMyVmHostShortListByHypervisorTypeId: build.query<
      GetApiMyVmHostShortListByHypervisorTypeIdApiResponse,
      GetApiMyVmHostShortListByHypervisorTypeIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/short-list/${queryArg.hypervisorTypeId}`,
      }),
    }),
    putApiMyVmHostResetById: build.mutation<
      PutApiMyVmHostResetByIdApiResponse,
      PutApiMyVmHostResetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/reset/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiMyVmKmsGetById: build.query<
      GetApiMyVmKmsGetByIdApiResponse,
      GetApiMyVmKmsGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/vm/kms/get/${queryArg.id}` }),
    }),
    putApiMyVmHostRebuildById: build.mutation<
      PutApiMyVmHostRebuildByIdApiResponse,
      PutApiMyVmHostRebuildByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/rebuild/${queryArg.id}`,
        method: "PUT",
        body: queryArg.rebuildVmModel,
      }),
    }),
    putApiMyVmHostRebootById: build.mutation<
      PutApiMyVmHostRebootByIdApiResponse,
      PutApiMyVmHostRebootByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/reboot/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiMyVmHostListByVmProjectId: build.query<
      GetApiMyVmHostListByVmProjectIdApiResponse,
      GetApiMyVmHostListByVmProjectIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/list/${queryArg.vmProjectId}`,
      }),
    }),
    getApiMyVmHostGetAnalyticByIdAndPeriodId: build.query<
      GetApiMyVmHostGetAnalyticByIdAndPeriodIdApiResponse,
      GetApiMyVmHostGetAnalyticByIdAndPeriodIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/get-analytic/${queryArg.id}/${queryArg.periodId}`,
      }),
    }),
    getApiMyVmHostGetById: build.query<
      GetApiMyVmHostGetByIdApiResponse,
      GetApiMyVmHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/vm/host/get/${queryArg.id}` }),
    }),
    putApiMyVmHostEditById: build.mutation<
      PutApiMyVmHostEditByIdApiResponse,
      PutApiMyVmHostEditByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editVmModel,
      }),
    }),
    putApiMyVmHostDisconnectById: build.mutation<
      PutApiMyVmHostDisconnectByIdApiResponse,
      PutApiMyVmHostDisconnectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/disconnect/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    deleteApiMyVmHostDeleteById: build.mutation<
      DeleteApiMyVmHostDeleteByIdApiResponse,
      DeleteApiMyVmHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVmHostCreate: build.mutation<
      PostApiMyVmHostCreateApiResponse,
      PostApiMyVmHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/create`,
        method: "POST",
        body: queryArg.createVmModel,
      }),
    }),
    putApiMyVmHostConnectById: build.mutation<
      PutApiMyVmHostConnectByIdApiResponse,
      PutApiMyVmHostConnectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/connect/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiMyVpcTranslateList: build.query<
      GetApiMyVpcTranslateListApiResponse,
      GetApiMyVpcTranslateListApiArg
    >({
      query: () => ({ url: `/api/my/vpc/translate/list` }),
    }),
    deleteApiMyVpcTranslateDeleteById: build.mutation<
      DeleteApiMyVpcTranslateDeleteByIdApiResponse,
      DeleteApiMyVpcTranslateDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/translate/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVpcTranslateCreate: build.mutation<
      PostApiMyVpcTranslateCreateApiResponse,
      PostApiMyVpcTranslateCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/translate/create`,
        method: "POST",
        body: queryArg.createVpcTranslateModel,
      }),
    }),
    getApiMyVpcPrivateNetworkRequestList: build.query<
      GetApiMyVpcPrivateNetworkRequestListApiResponse,
      GetApiMyVpcPrivateNetworkRequestListApiArg
    >({
      query: () => ({ url: `/api/my/vpc/private-network-request/list` }),
    }),
    postApiMyVpcPrivateNetworkRequestCreate: build.mutation<
      PostApiMyVpcPrivateNetworkRequestCreateApiResponse,
      PostApiMyVpcPrivateNetworkRequestCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/private-network-request/create`,
        method: "POST",
        body: queryArg.createVpcPrivateNetworkModel,
      }),
    }),
    getApiMyVpcPrivateNetworkList: build.query<
      GetApiMyVpcPrivateNetworkListApiResponse,
      GetApiMyVpcPrivateNetworkListApiArg
    >({
      query: () => ({ url: `/api/my/vpc/private-network/list` }),
    }),
    getApiMyVpcPrivateNetworkGetById: build.query<
      GetApiMyVpcPrivateNetworkGetByIdApiResponse,
      GetApiMyVpcPrivateNetworkGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/private-network/get/${queryArg.id}`,
      }),
    }),
    getApiMyVpcNetworkShortListByVpcHostId: build.query<
      GetApiMyVpcNetworkShortListByVpcHostIdApiResponse,
      GetApiMyVpcNetworkShortListByVpcHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/network/short-list/${queryArg.vpcHostId}`,
      }),
    }),
    getApiMyVpcNetworkListByVpcHostId: build.query<
      GetApiMyVpcNetworkListByVpcHostIdApiResponse,
      GetApiMyVpcNetworkListByVpcHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/network/list/${queryArg.vpcHostId}`,
      }),
    }),
    putApiMyVpcNetworkEditById: build.mutation<
      PutApiMyVpcNetworkEditByIdApiResponse,
      PutApiMyVpcNetworkEditByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/network/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editVmNetworkModel,
      }),
    }),
    deleteApiMyVpcNetworkDeleteById: build.mutation<
      DeleteApiMyVpcNetworkDeleteByIdApiResponse,
      DeleteApiMyVpcNetworkDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/network/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVpcNetworkCreate: build.mutation<
      PostApiMyVpcNetworkCreateApiResponse,
      PostApiMyVpcNetworkCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/network/create`,
        method: "POST",
        body: queryArg.createVpcNetworkModel,
      }),
    }),
    putApiMyVpcNatIncreaseSequenceByVpcHostIdAndId: build.mutation<
      PutApiMyVpcNatIncreaseSequenceByVpcHostIdAndIdApiResponse,
      PutApiMyVpcNatIncreaseSequenceByVpcHostIdAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/nat/increase-sequence/${queryArg.vpcHostId}/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiMyVpcNatDecreaseSequenceByVpcHostIdAndId: build.mutation<
      PutApiMyVpcNatDecreaseSequenceByVpcHostIdAndIdApiResponse,
      PutApiMyVpcNatDecreaseSequenceByVpcHostIdAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/nat/decrease-sequence/${queryArg.vpcHostId}/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiMyVpcNatListByVpcHostId: build.query<
      GetApiMyVpcNatListByVpcHostIdApiResponse,
      GetApiMyVpcNatListByVpcHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/nat/list/${queryArg.vpcHostId}`,
      }),
    }),
    getApiMyVpcNatGetById: build.query<
      GetApiMyVpcNatGetByIdApiResponse,
      GetApiMyVpcNatGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/vpc/nat/get/${queryArg.id}` }),
    }),
    deleteApiMyVpcNatDeleteById: build.mutation<
      DeleteApiMyVpcNatDeleteByIdApiResponse,
      DeleteApiMyVpcNatDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/nat/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVpcNatCreateSnat: build.mutation<
      PostApiMyVpcNatCreateSnatApiResponse,
      PostApiMyVpcNatCreateSnatApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/nat/create-snat`,
        method: "POST",
        body: queryArg.createVpcGatewaySnatModel,
      }),
    }),
    postApiMyVpcNatCreateDnat: build.mutation<
      PostApiMyVpcNatCreateDnatApiResponse,
      PostApiMyVpcNatCreateDnatApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/nat/create-dnat`,
        method: "POST",
        body: queryArg.createVpcGatewayDnatModel,
      }),
    }),
    getApiMyVpcLoadBalanceListByVpcHostId: build.query<
      GetApiMyVpcLoadBalanceListByVpcHostIdApiResponse,
      GetApiMyVpcLoadBalanceListByVpcHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/load-balance/list/${queryArg.vpcHostId}`,
      }),
    }),
    deleteApiMyVpcLoadBalanceDeleteById: build.mutation<
      DeleteApiMyVpcLoadBalanceDeleteByIdApiResponse,
      DeleteApiMyVpcLoadBalanceDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/load-balance/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVpcLoadBalanceCreate: build.mutation<
      PostApiMyVpcLoadBalanceCreateApiResponse,
      PostApiMyVpcLoadBalanceCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/load-balance/create`,
        method: "POST",
        body: queryArg.createVpcHostLbModel,
      }),
    }),
    getApiMyVpcIpListByVpcHostId: build.query<
      GetApiMyVpcIpListByVpcHostIdApiResponse,
      GetApiMyVpcIpListByVpcHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/ip/list/${queryArg.vpcHostId}`,
      }),
    }),
    deleteApiMyVpcIpDeleteById: build.mutation<
      DeleteApiMyVpcIpDeleteByIdApiResponse,
      DeleteApiMyVpcIpDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/ip/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVpcIpCreate: build.mutation<
      PostApiMyVpcIpCreateApiResponse,
      PostApiMyVpcIpCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/ip/create`,
        method: "POST",
        body: queryArg.createVpcHostGatewayIpModel,
      }),
    }),
    getApiMyVpcHostShortList: build.query<
      GetApiMyVpcHostShortListApiResponse,
      GetApiMyVpcHostShortListApiArg
    >({
      query: () => ({ url: `/api/my/vpc/host/short-list` }),
    }),
    getApiMyVpcHostList: build.query<
      GetApiMyVpcHostListApiResponse,
      GetApiMyVpcHostListApiArg
    >({
      query: () => ({ url: `/api/my/vpc/host/list` }),
    }),
    getApiMyVpcHostGetById: build.query<
      GetApiMyVpcHostGetByIdApiResponse,
      GetApiMyVpcHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/vpc/host/get/${queryArg.id}` }),
    }),
    putApiMyVpcHostEditById: build.mutation<
      PutApiMyVpcHostEditByIdApiResponse,
      PutApiMyVpcHostEditByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/host/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editVpcHostModel,
      }),
    }),
    deleteApiMyVpcHostDeleteById: build.mutation<
      DeleteApiMyVpcHostDeleteByIdApiResponse,
      DeleteApiMyVpcHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVpcHostCreate: build.mutation<
      PostApiMyVpcHostCreateApiResponse,
      PostApiMyVpcHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/host/create`,
        method: "POST",
        body: queryArg.createVpcHostModel,
      }),
    }),
    getApiMyWebHostList: build.query<
      GetApiMyWebHostListApiResponse,
      GetApiMyWebHostListApiArg
    >({
      query: () => ({ url: `/api/my/web/host/list` }),
    }),
    getApiMyWebHostGetLoginSessionById: build.query<
      GetApiMyWebHostGetLoginSessionByIdApiResponse,
      GetApiMyWebHostGetLoginSessionByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/web/host/get-login-session/${queryArg.id}`,
      }),
    }),
    getApiMyWebHostGetById: build.query<
      GetApiMyWebHostGetByIdApiResponse,
      GetApiMyWebHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/web/host/get/${queryArg.id}` }),
    }),
    putApiMyWebHostEditById: build.mutation<
      PutApiMyWebHostEditByIdApiResponse,
      PutApiMyWebHostEditByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/web/host/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editWebHostModel,
      }),
    }),
    deleteApiMyWebHostDeleteById: build.mutation<
      DeleteApiMyWebHostDeleteByIdApiResponse,
      DeleteApiMyWebHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/web/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyWebHostCreate: build.mutation<
      PostApiMyWebHostCreateApiResponse,
      PostApiMyWebHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/web/host/create`,
        method: "POST",
        body: queryArg.createWebHostModel,
      }),
    }),
    postApiMyWebHostCheckDomain: build.mutation<
      PostApiMyWebHostCheckDomainApiResponse,
      PostApiMyWebHostCheckDomainApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/web/host/check-domain`,
        method: "POST",
        body: queryArg.checkWebHostDomainModel,
      }),
    }),
    putApiMyPortalNewsUnsubscribeByEmail: build.mutation<
      PutApiMyPortalNewsUnsubscribeByEmailApiResponse,
      PutApiMyPortalNewsUnsubscribeByEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/news/unsubscribe/${queryArg.email}`,
        method: "PUT",
      }),
    }),
    postApiMyPortalNewsCreate: build.mutation<
      PostApiMyPortalNewsCreateApiResponse,
      PostApiMyPortalNewsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/news/create`,
        method: "POST",
        body: queryArg.createNewsLetterModel,
      }),
    }),
    postApiMyPortalContactUsCreate: build.mutation<
      PostApiMyPortalContactUsCreateApiResponse,
      PostApiMyPortalContactUsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/contact-us/create`,
        method: "POST",
        body: queryArg.createContactUsModel,
      }),
    }),
    getApiMyPortalWebsiteBlogCommentGetById: build.query<
      GetApiMyPortalWebsiteBlogCommentGetByIdApiResponse,
      GetApiMyPortalWebsiteBlogCommentGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/website-blog-comment/get/${queryArg.id}`,
      }),
    }),
    postApiMyPortalWebsiteBlogCommentCreate: build.mutation<
      PostApiMyPortalWebsiteBlogCommentCreateApiResponse,
      PostApiMyPortalWebsiteBlogCommentCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/website-blog-comment/create`,
        method: "POST",
        body: queryArg.createWebSiteBolgCommentModel,
      }),
    }),
    getApiMyPortalWebsiteBlogList: build.query<
      GetApiMyPortalWebsiteBlogListApiResponse,
      GetApiMyPortalWebsiteBlogListApiArg
    >({
      query: () => ({ url: `/api/my/portal/website-blog/list` }),
    }),
    getApiMyPortalWebsiteBlogGetRandomArticlesByLink: build.query<
      GetApiMyPortalWebsiteBlogGetRandomArticlesByLinkApiResponse,
      GetApiMyPortalWebsiteBlogGetRandomArticlesByLinkApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/website-blog/get-random-articles/${queryArg.link}`,
      }),
    }),
    getApiMyPortalWebsiteBlogGetHeaderArticles: build.query<
      GetApiMyPortalWebsiteBlogGetHeaderArticlesApiResponse,
      GetApiMyPortalWebsiteBlogGetHeaderArticlesApiArg
    >({
      query: () => ({ url: `/api/my/portal/website-blog/get-header-articles` }),
    }),
    getApiMyPortalWebsiteBlogGetByLink: build.query<
      GetApiMyPortalWebsiteBlogGetByLinkApiResponse,
      GetApiMyPortalWebsiteBlogGetByLinkApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/website-blog/get/${queryArg.link}`,
      }),
    }),
    getApiMyPortalWebsiteAlarmList: build.query<
      GetApiMyPortalWebsiteAlarmListApiResponse,
      GetApiMyPortalWebsiteAlarmListApiArg
    >({
      query: () => ({ url: `/api/my/portal/website-alarm/list` }),
    }),
  }),
});
export type GetApiMyAccountUserLogApiResponse =
  /** status 200 OK */ UserLogResponseIEnumerablePagedResponse;
export type GetApiMyAccountUserLogApiArg = {
  userId?: string;
  fromDate?: string;
  toDate?: string;
  pageNumber: number;
  pageSize: number;
};
export type GetApiMyAccountRoleAccessTypeListApiResponse =
  /** status 200 OK */ RoleAccessTypeListResponse[];
export type GetApiMyAccountRoleAccessTypeListApiArg = void;
export type GetApiMyAccountRoleAccessListByUserIdApiResponse =
  /** status 200 OK */ RoleAccessListResponse;
export type GetApiMyAccountRoleAccessListByUserIdApiArg = {
  userId: string;
};
export type PutApiMyAccountRoleAccessEditApiResponse = unknown;
export type PutApiMyAccountRoleAccessEditApiArg = {
  editRoleAccessModel: EditRoleAccessModel;
};
export type GetApiMyAccountRoleListApiResponse =
  /** status 200 OK */ RoleListResponse[];
export type GetApiMyAccountRoleListApiArg = void;
export type PutApiMyAccountProfileEditTwoFactorApiResponse = unknown;
export type PutApiMyAccountProfileEditTwoFactorApiArg = {
  twoFactorModel: TwoFactorModel;
};
export type GetApiMyAccountProfileGetNotificationStatusApiResponse =
  /** status 200 OK */ GetNotificationStatusResponse;
export type GetApiMyAccountProfileGetNotificationStatusApiArg = void;
export type GetApiMyAccountProfileGetApiResponse =
  /** status 200 OK */ GetProfileResponse;
export type GetApiMyAccountProfileGetApiArg = void;
export type PutApiMyAccountProfileEditPhoneNumberApiResponse = unknown;
export type PutApiMyAccountProfileEditPhoneNumberApiArg = {
  editPhoneNumberModel: EditPhoneNumberModel;
};
export type PutApiMyAccountProfileEditPhoneNotificationApiResponse = unknown;
export type PutApiMyAccountProfileEditPhoneNotificationApiArg = {
  editPhoneNotifyModel: EditPhoneNotifyModel;
};
export type PutApiMyAccountProfileEditEmailNotificationApiResponse = unknown;
export type PutApiMyAccountProfileEditEmailNotificationApiArg = {
  editEmailNotifyModel: EditEmailNotifyModel;
};
export type PutApiMyAccountProfileEditEmailApiResponse = unknown;
export type PutApiMyAccountProfileEditEmailApiArg = {
  editEmailModel: EditEmailModel;
};
export type PutApiMyAccountProfileEditApiResponse =
  /** status 200 OK */ EditProfileResponse;
export type PutApiMyAccountProfileEditApiArg = {
  editProfileModel: EditProfileModel;
};
export type PostApiMyAccountProfileConfirmPhoneNumberApiResponse =
  /** status 200 OK */ EditProfileResponse;
export type PostApiMyAccountProfileConfirmPhoneNumberApiArg = {
  confirmPhoneNumberModel: ConfirmPhoneNumberModel;
};
export type PostApiMyAccountProfileConfirmEmailApiResponse =
  /** status 200 OK */ EditProfileResponse;
export type PostApiMyAccountProfileConfirmEmailApiArg = {
  confirmEmailModel: ConfirmEmailModel;
};
export type PostApiMyAccountProfileChangePasswordApiResponse = unknown;
export type PostApiMyAccountProfileChangePasswordApiArg = {
  changePasswordModel: ChangePasswordModel;
};
export type GetApiMyAccountNotificationShortListApiResponse =
  /** status 200 OK */ NotificationListResponse[];
export type GetApiMyAccountNotificationShortListApiArg = void;
export type PutApiMyAccountNotificationSeenByIdApiResponse = unknown;
export type PutApiMyAccountNotificationSeenByIdApiArg = {
  id: number;
};
export type GetApiMyAccountNotificationListApiResponse =
  /** status 200 OK */ NotificationListResponse[];
export type GetApiMyAccountNotificationListApiArg = void;
export type GetApiMyAccountCustomerUserListApiResponse =
  /** status 200 OK */ CustomerUserListResponse[];
export type GetApiMyAccountCustomerUserListApiArg = void;
export type PostApiMyAccountCustomerUserChangeCustomerApiResponse = unknown;
export type PostApiMyAccountCustomerUserChangeCustomerApiArg = {
  changeCustomerUserModel: ChangeCustomerUserModel;
};
export type DeleteApiMyAccountCustomerUserDeleteByUserIdApiResponse = unknown;
export type DeleteApiMyAccountCustomerUserDeleteByUserIdApiArg = {
  userId: string;
};
export type PostApiMyAccountCustomerUserCreateApiResponse = unknown;
export type PostApiMyAccountCustomerUserCreateApiArg = {
  createCustomerUserModel: CreateCustomerUserModel;
};
export type GetApiMyAccountCustomerGetApiResponse =
  /** status 200 OK */ GetCustomerResponse;
export type GetApiMyAccountCustomerGetApiArg = void;
export type PutApiMyAccountCustomerEditApiResponse = unknown;
export type PutApiMyAccountCustomerEditApiArg = {
  editCustomerModel: EditCustomerModel;
};
export type PutApiMyAccountCustomerConvertToLegalApiResponse = unknown;
export type PutApiMyAccountCustomerConvertToLegalApiArg = {
  convertCustomerToLegalModel: ConvertCustomerToLegalModel;
};
export type PostApiMyAccountTwoFactorLoginApiResponse =
  /** status 200 OK */ LoginResponse;
export type PostApiMyAccountTwoFactorLoginApiArg = {
  twoFactorLoginModel: TwoFactorLoginModel;
};
export type GetApiMyAccountSsoUrlApiResponse =
  /** status 200 OK */ SsoLoginResponse;
export type GetApiMyAccountSsoUrlApiArg = void;
export type PostApiMyAccountSsoLoginApiResponse =
  /** status 200 OK */ LoginResponse;
export type PostApiMyAccountSsoLoginApiArg = {
  ssoLoginModel: SsoLoginModel;
};
export type PostApiMyAccountRegisterApiResponse =
  /** status 200 OK */ LoginResponse;
export type PostApiMyAccountRegisterApiArg = {
  registerModel: RegisterModel;
};
export type PostApiMyAccountLogoutApiResponse = unknown;
export type PostApiMyAccountLogoutApiArg = void;
export type PostApiMyAccountLoginApiResponse =
  /** status 200 OK */ LoginResponse;
export type PostApiMyAccountLoginApiArg = {
  loginModel: LoginModel;
};
export type PostApiMyAccountForgotConfirmApiResponse = unknown;
export type PostApiMyAccountForgotConfirmApiArg = {
  forgotConfirmModel: ForgotConfirmModel;
};
export type PostApiMyAccountForgotApiResponse = unknown;
export type PostApiMyAccountForgotApiArg = {
  forgotModel: ForgotModel;
};
export type GetApiMyAccountCaptchaApiResponse =
  /** status 200 OK */ CaptchaResponse;
export type GetApiMyAccountCaptchaApiArg = void;
export type GetApiMyAssetEquipmentTypeListApiResponse =
  /** status 200 OK */ EquipmentTypeListResponse[];
export type GetApiMyAssetEquipmentTypeListApiArg = void;
export type GetApiMyAssetEquipmentBrandListApiResponse =
  /** status 200 OK */ EquipmentBrandListResponse[];
export type GetApiMyAssetEquipmentBrandListApiArg = void;
export type GetApiMyAssetEquipmentListByTypeIdAndBrandIdApiResponse =
  /** status 200 OK */ EquipmentListResponse[];
export type GetApiMyAssetEquipmentListByTypeIdAndBrandIdApiArg = {
  typeId: number;
  brandId: number;
};
export type GetApiMyBareMetalHostListApiResponse =
  /** status 200 OK */ BareMetalListResponse[];
export type GetApiMyBareMetalHostListApiArg = void;
export type GetApiMyBareMetalHostGetByIdApiResponse =
  /** status 200 OK */ BareMetalResponse;
export type GetApiMyBareMetalHostGetByIdApiArg = {
  id: number;
};
export type DeleteApiMyBareMetalHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyBareMetalHostDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyBareMetalHostCreateApiResponse = unknown;
export type PostApiMyBareMetalHostCreateApiArg = {
  createBareMetalModel: CreateBareMetalModel;
};
export type GetApiMyColocationListApiResponse =
  /** status 200 OK */ ColocationListResponse[];
export type GetApiMyColocationListApiArg = void;
export type GetApiMyColocationGetByIdApiResponse =
  /** status 200 OK */ GetColocationResponse;
export type GetApiMyColocationGetByIdApiArg = {
  id: number;
};
export type DeleteApiMyColocationDeleteByIdApiResponse = unknown;
export type DeleteApiMyColocationDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyColocationCreateApiResponse = unknown;
export type PostApiMyColocationCreateApiArg = {
  createColocationModel: CreateColocationModel;
};
export type GetApiMyDashboardUsageByCategoryIdApiResponse =
  /** status 200 OK */ DashboardUsageResponse[];
export type GetApiMyDashboardUsageByCategoryIdApiArg = {
  categoryId: number;
};
export type GetApiMyDashboardFinancialApiResponse =
  /** status 200 OK */ DashboardFinancialResponse;
export type GetApiMyDashboardFinancialApiArg = void;
export type GetApiMyDatacenterIpListByIdApiResponse =
  /** status 200 OK */ DatacenterIpListResponse[];
export type GetApiMyDatacenterIpListByIdApiArg = {
  id: number;
};
export type DeleteApiMyDatacenterIpDeleteByIdApiResponse =
  /** status 200 OK */ DatacenterIpListResponse[];
export type DeleteApiMyDatacenterIpDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyDatacenterImageListApiResponse =
  /** status 200 OK */ DatacenterImageListResponse[];
export type GetApiMyDatacenterImageListApiArg = {
  datacenterId: number;
  productId: number;
  hypervisorTypeId: number;
};
export type GetApiMyDatacenterListApiResponse =
  /** status 200 OK */ DatacenterListResponse[];
export type GetApiMyDatacenterListApiArg = void;
export type GetApiMyDnsCdnHostListApiResponse =
  /** status 200 OK */ DnsCdnListResponse[];
export type GetApiMyDnsCdnHostListApiArg = void;
export type GetApiMyDnsCdnHostGetNsByIdApiResponse =
  /** status 200 OK */ GetDnsNsResponse;
export type GetApiMyDnsCdnHostGetNsByIdApiArg = {
  id: number;
};
export type GetApiMyDnsCdnHostGetCdnByIdApiResponse =
  /** status 200 OK */ GetCdnResponse;
export type GetApiMyDnsCdnHostGetCdnByIdApiArg = {
  id: number;
};
export type GetApiMyDnsCdnHostGetAnalyticByIdAndPeriodIdApiResponse =
  /** status 200 OK */ GetAnalyticResponse;
export type GetApiMyDnsCdnHostGetAnalyticByIdAndPeriodIdApiArg = {
  id: number;
  periodId: number;
};
export type GetApiMyDnsCdnHostGetByIdApiResponse =
  /** status 200 OK */ GetDnsCdnResponse;
export type GetApiMyDnsCdnHostGetByIdApiArg = {
  id: number;
};
export type DeleteApiMyDnsCdnHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyDnsCdnHostDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyDnsCdnHostCreateApiResponse = unknown;
export type PostApiMyDnsCdnHostCreateApiArg = {
  createDnsCdnModel: CreateDnsCdnModel;
};
export type PostApiMyDnsCdnHostCheckApiResponse = unknown;
export type PostApiMyDnsCdnHostCheckApiArg = {
  checkDnsCdnModel: CheckDnsCdnModel;
};
export type PutApiMyDnsCdnHostChangeOriginCertTypeApiResponse = unknown;
export type PutApiMyDnsCdnHostChangeOriginCertTypeApiArg = {
  changeOriginCertTypeModel: ChangeOriginCertTypeModel;
};
export type PutApiMyDnsCdnHostChangeNonWwwRedirectApiResponse = unknown;
export type PutApiMyDnsCdnHostChangeNonWwwRedirectApiArg = {
  changeNonWwwRedirectModel: ChangeNonWwwRedirectModel;
};
export type PutApiMyDnsCdnHostChangeHttpsRedirectApiResponse = unknown;
export type PutApiMyDnsCdnHostChangeHttpsRedirectApiArg = {
  changeHttpsRedirectModel: ChangeHttpsRedirectModel;
};
export type PutApiMyDnsCdnHostChangeHstsApiResponse = unknown;
export type PutApiMyDnsCdnHostChangeHstsApiArg = {
  changeHstsModel: ChangeHstsModel;
};
export type PutApiMyDnsCdnHostChangeEdgeCertTypeApiResponse = unknown;
export type PutApiMyDnsCdnHostChangeEdgeCertTypeApiArg = {
  changeEdgeCertTypeModel: ChangeEdgeCertTypeModel;
};
export type PutApiMyDnsCdnHostChangeCdnTypeApiResponse = unknown;
export type PutApiMyDnsCdnHostChangeCdnTypeApiArg = {
  changeCdnTypeModel: ChangeCdnTypeModel;
};
export type GetApiMyDnsCdnDnsRecordListByDnsCdnHostIdApiResponse =
  /** status 200 OK */ DnsRecordListResponse[];
export type GetApiMyDnsCdnDnsRecordListByDnsCdnHostIdApiArg = {
  dnsCdnHostId: number;
};
export type GetApiMyDnsCdnDnsRecordGetByIdApiResponse =
  /** status 200 OK */ GetDnsRecordResponse;
export type GetApiMyDnsCdnDnsRecordGetByIdApiArg = {
  id: number;
};
export type PutApiMyDnsCdnDnsRecordEditByIdApiResponse = unknown;
export type PutApiMyDnsCdnDnsRecordEditByIdApiArg = {
  id: number;
  editDnsRecordModel: EditDnsRecordModel;
};
export type DeleteApiMyDnsCdnDnsRecordDeleteByIdApiResponse = unknown;
export type DeleteApiMyDnsCdnDnsRecordDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyDnsCdnDnsRecordCreateApiResponse = unknown;
export type PostApiMyDnsCdnDnsRecordCreateApiArg = {
  createDnsRecordModel: CreateDnsRecordModel;
};
export type PutApiMyDnsCdnDnsRecordChangeProxyByIdApiResponse = unknown;
export type PutApiMyDnsCdnDnsRecordChangeProxyByIdApiArg = {
  id: number;
};
export type GetApiMyDnsCdnRouteListByDnsCdnHostIdApiResponse =
  /** status 200 OK */ CdnRouteListResponse[];
export type GetApiMyDnsCdnRouteListByDnsCdnHostIdApiArg = {
  dnsCdnHostId: number;
};
export type GetApiMyDnsCdnRouteGetByIdApiResponse =
  /** status 200 OK */ GetCdnRouteResponse;
export type GetApiMyDnsCdnRouteGetByIdApiArg = {
  id: number;
};
export type PutApiMyDnsCdnRouteEditByIdApiResponse = unknown;
export type PutApiMyDnsCdnRouteEditByIdApiArg = {
  id: number;
  editCdnRouteModel: EditCdnRouteModel;
};
export type DeleteApiMyDnsCdnRouteDeleteByIdApiResponse = unknown;
export type DeleteApiMyDnsCdnRouteDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyDnsCdnOriginCertGetUserCertByDnsCdnHostIdApiResponse =
  /** status 200 OK */ GetCdnCertResponse;
export type GetApiMyDnsCdnOriginCertGetUserCertByDnsCdnHostIdApiArg = {
  dnsCdnHostId: number;
};
export type GetApiMyDnsCdnOriginCertGetByDnsCdnHostIdApiResponse =
  /** status 200 OK */ GetCdnCertResponse;
export type GetApiMyDnsCdnOriginCertGetByDnsCdnHostIdApiArg = {
  dnsCdnHostId: number;
};
export type PostApiMyDnsCdnOriginCertCreateUserCertApiResponse = unknown;
export type PostApiMyDnsCdnOriginCertCreateUserCertApiArg = {
  createCdnOriginUserCertModel: CreateCdnOriginUserCertModel;
};
export type GetApiMyDnsCdnEdgeCertGetUserCertByDnsCdnHostIdApiResponse =
  /** status 200 OK */ GetCdnCertResponse;
export type GetApiMyDnsCdnEdgeCertGetUserCertByDnsCdnHostIdApiArg = {
  dnsCdnHostId: number;
};
export type GetApiMyDnsCdnEdgeCertGetByDnsCdnHostIdApiResponse =
  /** status 200 OK */ GetCdnCertResponse;
export type GetApiMyDnsCdnEdgeCertGetByDnsCdnHostIdApiArg = {
  dnsCdnHostId: number;
};
export type PostApiMyDnsCdnEdgeCertCreateUserCertApiResponse = unknown;
export type PostApiMyDnsCdnEdgeCertCreateUserCertApiArg = {
  createCdnEdgeUserCertModel: CreateCdnEdgeUserCertModel;
};
export type PostApiMyDnsCdnEdgeCertCreateApiResponse = unknown;
export type PostApiMyDnsCdnEdgeCertCreateApiArg = {
  createCdnEdgeCertModel: CreateCdnEdgeCertModel;
};
export type PostApiMyDomainHostResendVerificationByIdApiResponse = unknown;
export type PostApiMyDomainHostResendVerificationByIdApiArg = {
  id: number;
};
export type GetApiMyDomainHostListApiResponse =
  /** status 200 OK */ DomainListResponse[];
export type GetApiMyDomainHostListApiArg = void;
export type GetApiMyDomainHostGetStatusByIdApiResponse =
  /** status 200 OK */ DomainGetStatusResponse;
export type GetApiMyDomainHostGetStatusByIdApiArg = {
  id: number;
};
export type GetApiMyDomainHostGetByIdApiResponse =
  /** status 200 OK */ GetDomainResponse;
export type GetApiMyDomainHostGetByIdApiArg = {
  id: number;
};
export type DeleteApiMyDomainHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyDomainHostDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyDomainHostRegisterApiResponse = unknown;
export type PostApiMyDomainHostRegisterApiArg = {
  registerDomainModel: RegisterDomainModel;
};
export type PostApiMyDomainHostCheckDomainApiResponse = unknown;
export type PostApiMyDomainHostCheckDomainApiArg = {
  checkDomainModel: CheckDomainModel;
};
export type PutApiMyDomainHostChangeNsApiResponse = unknown;
export type PutApiMyDomainHostChangeNsApiArg = {
  changeNsModel: ChangeNsModel;
};
export type PutApiMyDomainHostChangeContactApiResponse = unknown;
export type PutApiMyDomainHostChangeContactApiArg = {
  changeContactModel: ChangeContactModel;
};
export type GetApiMyHomeIndexApiResponse = unknown;
export type GetApiMyHomeIndexApiArg = void;
export type GetApiMyHostHypervisorListApiResponse =
  /** status 200 OK */ HypervisorListResponse[];
export type GetApiMyHostHypervisorListApiArg = void;
export type GetApiMyHostProjectListApiResponse =
  /** status 200 OK */ VmProjectListResponse[];
export type GetApiMyHostProjectListApiArg = void;
export type GetApiMyHostProjectGetByIdApiResponse =
  /** status 200 OK */ VmProjectGetResponse;
export type GetApiMyHostProjectGetByIdApiArg = {
  id: number;
};
export type PutApiMyHostProjectEditByIdApiResponse = unknown;
export type PutApiMyHostProjectEditByIdApiArg = {
  id: number;
  vmProjectEditModel: VmProjectEditModel;
};
export type DeleteApiMyHostProjectDeleteByIdApiResponse = unknown;
export type DeleteApiMyHostProjectDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyHostProjectCreateApiResponse = unknown;
export type PostApiMyHostProjectCreateApiArg = {
  vmProjectCreateModel: VmProjectCreateModel;
};
export type GetApiMyKubernetesCloudSecretListByNamespaceIdApiResponse =
  /** status 200 OK */ KuberCloudSecretListResponse[];
export type GetApiMyKubernetesCloudSecretListByNamespaceIdApiArg = {
  namespaceId: number;
  secretTypeId?: number;
};
export type GetApiMyKubernetesCloudSecretGetByIdApiResponse =
  /** status 200 OK */ GetKuberCloudSecretResponse;
export type GetApiMyKubernetesCloudSecretGetByIdApiArg = {
  id: number;
};
export type PutApiMyKubernetesCloudSecretEditApiResponse = unknown;
export type PutApiMyKubernetesCloudSecretEditApiArg = {
  editKuberCloudSecretModel: EditKuberCloudSecretModel;
};
export type DeleteApiMyKubernetesCloudSecretDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubernetesCloudSecretDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyKubernetesCloudSecretCreateApiResponse = unknown;
export type PostApiMyKubernetesCloudSecretCreateApiArg = {
  createKuberCloudSecretModel: CreateKuberCloudSecretModel;
};
export type GetApiMyKubernetesCloudHostPortListByNamespaceIdApiResponse =
  /** status 200 OK */ KuberCloudHostListPortResponse[];
export type GetApiMyKubernetesCloudHostPortListByNamespaceIdApiArg = {
  namespaceId: number;
};
export type PutApiMyKubernetesCloudIngressRuleEditApiResponse = unknown;
export type PutApiMyKubernetesCloudIngressRuleEditApiArg = {
  editKuberCloudIngressRuleModel: EditKuberCloudIngressRuleModel;
};
export type DeleteApiMyKubernetesCloudIngressRuleDeleteApiResponse = unknown;
export type DeleteApiMyKubernetesCloudIngressRuleDeleteApiArg = {
  deleteKuberCloudIngressRuleModel: DeleteKuberCloudIngressRuleModel;
};
export type PostApiMyKubernetesCloudIngressRuleCreateApiResponse = unknown;
export type PostApiMyKubernetesCloudIngressRuleCreateApiArg = {
  createKuberCloudIngressRuleModel: CreateKuberCloudIngressRuleModel;
};
export type GetApiMyKubernetesCloudIngressListByNamespaceIdApiResponse =
  /** status 200 OK */ KuberCloudIngressListResponse[];
export type GetApiMyKubernetesCloudIngressListByNamespaceIdApiArg = {
  namespaceId: number;
};
export type GetApiMyKubernetesCloudIngressGetByIdApiResponse =
  /** status 200 OK */ GetKuberCloudIngressResponse;
export type GetApiMyKubernetesCloudIngressGetByIdApiArg = {
  id: number;
};
export type DeleteApiMyKubernetesCloudIngressDeleteByIngressIdApiResponse =
  unknown;
export type DeleteApiMyKubernetesCloudIngressDeleteByIngressIdApiArg = {
  ingressId: number;
};
export type PostApiMyKubernetesCloudIngressCreateApiResponse = unknown;
export type PostApiMyKubernetesCloudIngressCreateApiArg = {
  createKuberCloudIngressModel: CreateKuberCloudIngressModel;
};
export type GetApiMyKubernetesCloudCategoryListApiResponse =
  /** status 200 OK */ KuberCloudImageCategoryDto[];
export type GetApiMyKubernetesCloudCategoryListApiArg = void;
export type GetApiMyKubernetesCloudImageListApiResponse =
  /** status 200 OK */ KuberCloudImageResponse[];
export type GetApiMyKubernetesCloudImageListApiArg = void;
export type GetApiMyKubernetesCloudHostListApiResponse =
  /** status 200 OK */ KuberCloudHostListResponse[];
export type GetApiMyKubernetesCloudHostListApiArg = void;
export type GetApiMyKubernetesCloudHostGetByIdApiResponse =
  /** status 200 OK */ KuberCloudHostGetResponse;
export type GetApiMyKubernetesCloudHostGetByIdApiArg = {
  id: number;
};
export type PutApiMyKubernetesCloudHostEditByIdApiResponse = unknown;
export type PutApiMyKubernetesCloudHostEditByIdApiArg = {
  id: number;
  editKuberCloudHostModel: EditKuberCloudHostModel;
};
export type DeleteApiMyKubernetesCloudHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubernetesCloudHostDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyKubernetesCloudHostCreateApiResponse = unknown;
export type PostApiMyKubernetesCloudHostCreateApiArg = {
  createKuberCloudHostModel: CreateKuberCloudHostModel;
};
export type GetApiMyKubernetesCloudFirewallListByNamespaceIdApiResponse =
  /** status 200 OK */ KuberCloudFirewallListResponse[];
export type GetApiMyKubernetesCloudFirewallListByNamespaceIdApiArg = {
  namespaceId: number;
};
export type DeleteApiMyKubernetesCloudFirewallDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubernetesCloudFirewallDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyKubernetesCloudFirewallCreateApiResponse = unknown;
export type PostApiMyKubernetesCloudFirewallCreateApiArg = {
  createKuberCloudFirewallModel: CreateKuberCloudFirewallModel;
};
export type GetApiMyKubernetesCloudDeploymentEnvListByDeploymentIdApiResponse =
  /** status 200 OK */ KuberCloudDeploymentEnvListResponse[];
export type GetApiMyKubernetesCloudDeploymentEnvListByDeploymentIdApiArg = {
  deploymentId: number;
};
export type GetApiMyKubernetesCloudDeploymentEnvGetByIdApiResponse =
  /** status 200 OK */ GetKuberCloudDeploymentEnvResponse;
export type GetApiMyKubernetesCloudDeploymentEnvGetByIdApiArg = {
  id: number;
};
export type GetApiMyKubernetesCloudDeploymentListByNamespaceIdApiResponse =
  /** status 200 OK */ KuberCloudDeploymentListResponse[];
export type GetApiMyKubernetesCloudDeploymentListByNamespaceIdApiArg = {
  namespaceId: number;
};
export type GetApiMyKubernetesCloudDeploymentGetByIdApiResponse =
  /** status 200 OK */ GetKuberCloudDeploymentResponse;
export type GetApiMyKubernetesCloudDeploymentGetByIdApiArg = {
  id: number;
};
export type PutApiMyKubernetesCloudDeploymentEditApiResponse = unknown;
export type PutApiMyKubernetesCloudDeploymentEditApiArg = {
  editKuberCloudDeploymentModel: EditKuberCloudDeploymentModel;
};
export type DeleteApiMyKubernetesCloudDeploymentDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubernetesCloudDeploymentDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyKubernetesCloudDeploymentCreateApiResponse = unknown;
export type PostApiMyKubernetesCloudDeploymentCreateApiArg = {
  createKuberCloudDeploymentModel: CreateKuberCloudDeploymentModel;
};
export type GetApiMyKubernetesCloudConfigmapListByNamespaceIdApiResponse =
  /** status 200 OK */ KuberCloudConfigListResponse[];
export type GetApiMyKubernetesCloudConfigmapListByNamespaceIdApiArg = {
  namespaceId: number;
};
export type GetApiMyKubernetesCloudConfigmapGetByIdApiResponse =
  /** status 200 OK */ GetKuberCloudConfigResponse;
export type GetApiMyKubernetesCloudConfigmapGetByIdApiArg = {
  id: number;
};
export type PutApiMyKubernetesCloudConfigmapEditApiResponse = unknown;
export type PutApiMyKubernetesCloudConfigmapEditApiArg = {
  editKuberCloudConfigmapModel: EditKuberCloudConfigmapModel;
};
export type DeleteApiMyKubernetesCloudConfigmapDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubernetesCloudConfigmapDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyKubernetesCloudConfigmapCreateApiResponse = unknown;
export type PostApiMyKubernetesCloudConfigmapCreateApiArg = {
  createKuberCloudConfigmapModel: CreateKuberCloudConfigmapModel;
};
export type GetApiMyKubernetesClusterVersionListApiResponse =
  /** status 200 OK */ KubernetesVersionListResponse[];
export type GetApiMyKubernetesClusterVersionListApiArg = void;
export type GetApiMyKubernetesClusterNodeByKubernetesHostIdApiResponse =
  /** status 200 OK */ KubernetesNodeListResponse[];
export type GetApiMyKubernetesClusterNodeByKubernetesHostIdApiArg = {
  kubernetesHostId: number;
};
export type DeleteApiMyKubernetesClusterNodeDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubernetesClusterNodeDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyKubernetesClusterNodeCreateApiResponse = unknown;
export type PostApiMyKubernetesClusterNodeCreateApiArg = {
  createKubernetesNodeModel: CreateKubernetesNodeModel;
};
export type GetApiMyKubernetesClusterHostListApiResponse =
  /** status 200 OK */ KubernetesListResponse[];
export type GetApiMyKubernetesClusterHostListApiArg = void;
export type GetApiMyKubernetesClusterHostGetByIdApiResponse =
  /** status 200 OK */ GetKubernetesResponse;
export type GetApiMyKubernetesClusterHostGetByIdApiArg = {
  id: number;
};
export type DeleteApiMyKubernetesClusterHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubernetesClusterHostDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyKubernetesClusterHostCreateApiResponse = unknown;
export type PostApiMyKubernetesClusterHostCreateApiArg = {
  createKubernetesModel: CreateKubernetesModel;
};
export type GetApiMyObjectStorageStorageUserListByStorageHostIdApiResponse =
  /** status 200 OK */ StorageUserListResponse[];
export type GetApiMyObjectStorageStorageUserListByStorageHostIdApiArg = {
  storageHostId: number;
};
export type DeleteApiMyObjectStorageStorageUserDeleteByIdApiResponse = unknown;
export type DeleteApiMyObjectStorageStorageUserDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyObjectStorageStorageUserCreateApiResponse = unknown;
export type PostApiMyObjectStorageStorageUserCreateApiArg = {
  createStorageUserModel: CreateStorageUserModel;
};
export type GetApiMyObjectStorageHostListApiResponse =
  /** status 200 OK */ StorageHostListResponse[];
export type GetApiMyObjectStorageHostListApiArg = void;
export type GetApiMyObjectStorageHostGetByIdApiResponse =
  /** status 200 OK */ GetStorageHostResponse;
export type GetApiMyObjectStorageHostGetByIdApiArg = {
  id: number;
};
export type PutApiMyObjectStorageHostEditByIdApiResponse = unknown;
export type PutApiMyObjectStorageHostEditByIdApiArg = {
  id: number;
  editStorageHostModel: EditStorageHostModel;
};
export type DeleteApiMyObjectStorageHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyObjectStorageHostDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyObjectStorageHostCreateApiResponse = unknown;
export type PostApiMyObjectStorageHostCreateApiArg = {
  createStorageHostModel: CreateStorageHostModel;
};
export type GetApiMyPortalWalletTransactionListApiResponse =
  /** status 200 OK */ WalletTransactionListResponse[];
export type GetApiMyPortalWalletTransactionListApiArg = void;
export type GetApiMyPortalWalletTransactionUsageReportByPeriodApiResponse =
  /** status 200 OK */ WalletUsageReportResponse[];
export type GetApiMyPortalWalletTransactionUsageReportByPeriodApiArg = {
  period: number;
};
export type GetApiMyPortalWalletTransactionDownloadApiResponse =
  /** status 200 OK */ Blob;
export type GetApiMyPortalWalletTransactionDownloadApiArg = void;
export type GetApiMyPortalWalletGetBalanceApiResponse =
  /** status 200 OK */ number;
export type GetApiMyPortalWalletGetBalanceApiArg = void;
export type PostApiMyPortalVoucherUseApiResponse = unknown;
export type PostApiMyPortalVoucherUseApiArg = {
  useVoucherModel: UseVoucherModel;
};
export type GetApiMyPortalReferralListByReferralIdApiResponse =
  /** status 200 OK */ CustomerReferralListResponse[];
export type GetApiMyPortalReferralListByReferralIdApiArg = {
  referralId: number;
};
export type GetApiMyPortalReferralGetApiResponse =
  /** status 200 OK */ GetReferralResponse;
export type GetApiMyPortalReferralGetApiArg = void;
export type GetApiMyPortalPromotionRedirectLinkByCodeApiResponse =
  /** status 200 OK */ string;
export type GetApiMyPortalPromotionRedirectLinkByCodeApiArg = {
  code: string;
};
export type GetApiMyPortalProductItemListByProductIdApiResponse =
  /** status 200 OK */ ProductItemListResponse[];
export type GetApiMyPortalProductItemListByProductIdApiArg = {
  productId: number;
};
export type GetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountApiResponse =
  /** status 200 OK */ KubernetesPriceResponse;
export type GetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountApiArg = {
  workerNodeCount: number;
};
export type GetApiMyPortalProductBundleWebListApiResponse =
  /** status 200 OK */ ProductBundleWebListResponse[];
export type GetApiMyPortalProductBundleWebListApiArg = void;
export type GetApiMyPortalProductBundleVpcListApiResponse =
  /** status 200 OK */ ProductBundleVpcListResponse[];
export type GetApiMyPortalProductBundleVpcListApiArg = void;
export type GetApiMyPortalProductBundleVmListApiResponse =
  /** status 200 OK */ ProductBundleVmListResponse[];
export type GetApiMyPortalProductBundleVmListApiArg = void;
export type GetApiMyPortalProductBundleStorageListApiResponse =
  /** status 200 OK */ ProductBundleStorageListResponse[];
export type GetApiMyPortalProductBundleStorageListApiArg = void;
export type GetApiMyPortalProductBundleKuberClusterListApiResponse =
  /** status 200 OK */ ProductBundleKuberClusterListResponse[];
export type GetApiMyPortalProductBundleKuberClusterListApiArg = void;
export type GetApiMyPortalProductBundleKuberCloudListApiResponse =
  /** status 200 OK */ ProductBundleKuberCloudListResponse[];
export type GetApiMyPortalProductBundleKuberCloudListApiArg = void;
export type GetApiMyPortalProductBundleBareMetalListApiResponse =
  /** status 200 OK */ ProductBundleBareMetalListResponse[];
export type GetApiMyPortalProductBundleBareMetalListApiArg = void;
export type GetApiMyPortalProductListApiResponse =
  /** status 200 OK */ ProductListResponse[];
export type GetApiMyPortalProductListApiArg = void;
export type GetApiMyPortalProductGetByIdApiResponse =
  /** status 200 OK */ GetProductResponse;
export type GetApiMyPortalProductGetByIdApiArg = {
  id: number;
};
export type GetApiMyPortalPaymentProviderListApiResponse =
  /** status 200 OK */ PaymentProviderListResponse[];
export type GetApiMyPortalPaymentProviderListApiArg = void;
export type PostApiMyPortalPaymentSepCallBackApiResponse = unknown;
export type PostApiMyPortalPaymentSepCallBackApiArg = {
  body: {
    model: SepCallbackModel;
  };
};
export type PostApiMyPortalPaymentPecCallBackApiResponse = unknown;
export type PostApiMyPortalPaymentPecCallBackApiArg = {
  body: {
    model: PecConfirmCallRequest;
  };
};
export type GetApiMyPortalPaymentListApiResponse =
  /** status 200 OK */ PaymentListResponse[];
export type GetApiMyPortalPaymentListApiArg = void;
export type GetApiMyPortalPaymentGetByIdApiResponse =
  /** status 200 OK */ GetPaymentResponse;
export type GetApiMyPortalPaymentGetByIdApiArg = {
  id: number;
};
export type GetApiMyPortalPaymentDownloadApiResponse =
  /** status 200 OK */ Blob;
export type GetApiMyPortalPaymentDownloadApiArg = void;
export type PostApiMyPortalPaymentCreateApiResponse =
  /** status 200 OK */ CreatePaymentResponse;
export type PostApiMyPortalPaymentCreateApiArg = {
  createPaymentModel: CreatePaymentModel;
};
export type PostApiMyPortalPaymentBpmCallBackApiResponse = unknown;
export type PostApiMyPortalPaymentBpmCallBackApiArg = {
  body: {
    model: BpmConfirmCallRequest;
  };
};
export type PostApiMyPortalOfferPayApiResponse =
  /** status 200 OK */ OrderOfferPayResponse;
export type PostApiMyPortalOfferPayApiArg = {
  orderOfferPayModel: OrderOfferPayModel;
};
export type GetApiMyPortalOfferListApiResponse =
  /** status 200 OK */ OfferListResponse[];
export type GetApiMyPortalOfferListApiArg = void;
export type GetApiMyPortalOfferGetByIdApiResponse =
  /** status 200 OK */ OfferGetResponse;
export type GetApiMyPortalOfferGetByIdApiArg = {
  id: number;
};
export type PostApiMyPortalIssueSubjectSelectListApiResponse =
  /** status 200 OK */ IssueSubjectShortListResponse[];
export type PostApiMyPortalIssueSubjectSelectListApiArg = {
  issueSubjectSelectListModel: IssueSubjectSelectListModel;
};
export type GetApiMyPortalIssueSubjectListApiResponse =
  /** status 200 OK */ IssueSubjectListResponse[];
export type GetApiMyPortalIssueSubjectListApiArg = void;
export type GetApiMyPortalIssueItemListByIssueIdApiResponse =
  /** status 200 OK */ IssueItemListResponse;
export type GetApiMyPortalIssueItemListByIssueIdApiArg = {
  issueId: number;
};
export type GetApiMyPortalIssueItemDownloadByIdApiResponse =
  /** status 200 OK */ Blob;
export type GetApiMyPortalIssueItemDownloadByIdApiArg = {
  id: number;
};
export type PostApiMyPortalIssueItemCreateApiResponse = unknown;
export type PostApiMyPortalIssueItemCreateApiArg = {
  body: {
    model: CreateIssueItemModel;
  };
};
export type GetApiMyPortalIssueShortListApiResponse =
  /** status 200 OK */ IssueShortListResponse[];
export type GetApiMyPortalIssueShortListApiArg = void;
export type GetApiMyPortalIssueListApiResponse =
  /** status 200 OK */ IssueListResponse[];
export type GetApiMyPortalIssueListApiArg = void;
export type PostApiMyPortalIssueCreateApiResponse = unknown;
export type PostApiMyPortalIssueCreateApiArg = {
  body: {
    model: CreateIssueModel;
  };
};
export type GetApiMyPortalInvoiceUnpaidApiResponse =
  /** status 200 OK */ UnPaidInvoiceResponse[];
export type GetApiMyPortalInvoiceUnpaidApiArg = void;
export type GetApiMyPortalInvoiceSummaryApiResponse =
  /** status 200 OK */ InvoiceSummaryResponse;
export type GetApiMyPortalInvoiceSummaryApiArg = void;
export type PostApiMyPortalInvoicePayApiResponse =
  /** status 200 OK */ PayInvoiceResponse;
export type PostApiMyPortalInvoicePayApiArg = {
  payInvoiceModel: PayInvoiceModel;
};
export type GetApiMyPortalInvoiceListApiResponse =
  /** status 200 OK */ InvoiceListResponse[];
export type GetApiMyPortalInvoiceListApiArg = void;
export type GetApiMyPortalInvoiceGetByIdApiResponse =
  /** status 200 OK */ GetInvoiceResponse;
export type GetApiMyPortalInvoiceGetByIdApiArg = {
  id: number;
};
export type GetApiMyPortalInvoiceDownloadApiResponse =
  /** status 200 OK */ Blob;
export type GetApiMyPortalInvoiceDownloadApiArg = void;
export type GetApiMyPortalCustomerProductShortListApiResponse =
  /** status 200 OK */ CustomerProductShortListResponse[];
export type GetApiMyPortalCustomerProductShortListApiArg = void;
export type GetApiMyPortalCustomerProductListByProductIdApiResponse =
  /** status 200 OK */ CustomerProductListResponse[];
export type GetApiMyPortalCustomerProductListByProductIdApiArg = {
  productId: number;
};
export type GetApiMyPortalCustomerBillShortListApiResponse =
  /** status 200 OK */ CustomerBillShortListResponse[];
export type GetApiMyPortalCustomerBillShortListApiArg = void;
export type GetApiMyPortalCustomerBillListApiResponse =
  /** status 200 OK */ CustomerBillListResponse[];
export type GetApiMyPortalCustomerBillListApiArg = void;
export type GetApiMyPortalCustomerBillGetByIdApiResponse =
  /** status 200 OK */ GetCustomerBillResponse;
export type GetApiMyPortalCustomerBillGetByIdApiArg = {
  id: number;
};
export type GetApiMyPortalCustomerBillDownloadByIdApiResponse =
  /** status 200 OK */ Blob;
export type GetApiMyPortalCustomerBillDownloadByIdApiArg = {
  id: number;
};
export type GetApiMyPortalCommissionListApiResponse =
  /** status 200 OK */ CommissionListResponse[];
export type GetApiMyPortalCommissionListApiArg = void;
export type GetApiMyPortalCalculateMonthListApiResponse =
  /** status 200 OK */ CalculateMonthListResponse[];
export type GetApiMyPortalCalculateMonthListApiArg = void;
export type GetApiMyPortalBusinessUnitListApiResponse =
  /** status 200 OK */ BusinessUnitListResponse[];
export type GetApiMyPortalBusinessUnitListApiArg = void;
export type PutApiMyVmSnapshotRevertByIdApiResponse = unknown;
export type PutApiMyVmSnapshotRevertByIdApiArg = {
  id: number;
};
export type GetApiMyVmSnapshotListByVmHostIdApiResponse =
  /** status 200 OK */ VmSnapshotResponse[];
export type GetApiMyVmSnapshotListByVmHostIdApiArg = {
  vmHostId: number;
};
export type GetApiMyVmSnapshotGetByIdApiResponse =
  /** status 200 OK */ VmSnapshotResponse;
export type GetApiMyVmSnapshotGetByIdApiArg = {
  id: number;
};
export type DeleteApiMyVmSnapshotDeleteAllByVmHostIdApiResponse = unknown;
export type DeleteApiMyVmSnapshotDeleteAllByVmHostIdApiArg = {
  vmHostId: number;
};
export type DeleteApiMyVmSnapshotDeleteByIdApiResponse = unknown;
export type DeleteApiMyVmSnapshotDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyVmSnapshotCreateApiResponse = unknown;
export type PostApiMyVmSnapshotCreateApiArg = {
  createSnapshotModel: CreateSnapshotModel;
};
export type PutApiMyVmIsoUnmountByIdApiResponse = unknown;
export type PutApiMyVmIsoUnmountByIdApiArg = {
  id: number;
  unmountModel: UnmountModel;
};
export type PutApiMyVmIsoMountByIdApiResponse = unknown;
export type PutApiMyVmIsoMountByIdApiArg = {
  id: number;
  mountModel: MountModel;
};
export type GetApiMyVmIsoListByDatacenterIdApiResponse =
  /** status 200 OK */ IsoListResponse[];
export type GetApiMyVmIsoListByDatacenterIdApiArg = {
  datacenterId: number;
};
export type PutApiMyVmHostStopByIdApiResponse = unknown;
export type PutApiMyVmHostStopByIdApiArg = {
  id: number;
};
export type PutApiMyVmHostStartByIdApiResponse = unknown;
export type PutApiMyVmHostStartByIdApiArg = {
  id: number;
};
export type PutApiMyVmHostShutdownByIdApiResponse = unknown;
export type PutApiMyVmHostShutdownByIdApiArg = {
  id: number;
};
export type GetApiMyVmHostShortListByHypervisorTypeIdApiResponse =
  /** status 200 OK */ VmShortListResponse[];
export type GetApiMyVmHostShortListByHypervisorTypeIdApiArg = {
  hypervisorTypeId: number;
};
export type PutApiMyVmHostResetByIdApiResponse = unknown;
export type PutApiMyVmHostResetByIdApiArg = {
  id: number;
};
export type GetApiMyVmKmsGetByIdApiResponse =
  /** status 200 OK */ GetRemoteConsoleResponse;
export type GetApiMyVmKmsGetByIdApiArg = {
  id: number;
};
export type PutApiMyVmHostRebuildByIdApiResponse = unknown;
export type PutApiMyVmHostRebuildByIdApiArg = {
  id: number;
  rebuildVmModel: RebuildVmModel;
};
export type PutApiMyVmHostRebootByIdApiResponse = unknown;
export type PutApiMyVmHostRebootByIdApiArg = {
  id: number;
};
export type GetApiMyVmHostListByVmProjectIdApiResponse =
  /** status 200 OK */ VmListResponse[];
export type GetApiMyVmHostListByVmProjectIdApiArg = {
  vmProjectId: number;
};
export type GetApiMyVmHostGetAnalyticByIdAndPeriodIdApiResponse =
  /** status 200 OK */ GetAnalyticResponse;
export type GetApiMyVmHostGetAnalyticByIdAndPeriodIdApiArg = {
  id: number;
  periodId: number;
};
export type GetApiMyVmHostGetByIdApiResponse =
  /** status 200 OK */ GetVmResponse;
export type GetApiMyVmHostGetByIdApiArg = {
  id: number;
};
export type PutApiMyVmHostEditByIdApiResponse = unknown;
export type PutApiMyVmHostEditByIdApiArg = {
  id: number;
  editVmModel: EditVmModel;
};
export type PutApiMyVmHostDisconnectByIdApiResponse = unknown;
export type PutApiMyVmHostDisconnectByIdApiArg = {
  id: number;
};
export type DeleteApiMyVmHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyVmHostDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyVmHostCreateApiResponse = unknown;
export type PostApiMyVmHostCreateApiArg = {
  createVmModel: CreateVmModel;
};
export type PutApiMyVmHostConnectByIdApiResponse = unknown;
export type PutApiMyVmHostConnectByIdApiArg = {
  id: number;
};
export type GetApiMyVpcTranslateListApiResponse =
  /** status 200 OK */ VpcHostTranslateListResponse[];
export type GetApiMyVpcTranslateListApiArg = void;
export type DeleteApiMyVpcTranslateDeleteByIdApiResponse = unknown;
export type DeleteApiMyVpcTranslateDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyVpcTranslateCreateApiResponse = unknown;
export type PostApiMyVpcTranslateCreateApiArg = {
  createVpcTranslateModel: CreateVpcTranslateModel;
};
export type GetApiMyVpcPrivateNetworkRequestListApiResponse =
  /** status 200 OK */ VpcPrivateNetworkRequestListResponse[];
export type GetApiMyVpcPrivateNetworkRequestListApiArg = void;
export type PostApiMyVpcPrivateNetworkRequestCreateApiResponse = unknown;
export type PostApiMyVpcPrivateNetworkRequestCreateApiArg = {
  createVpcPrivateNetworkModel: CreateVpcPrivateNetworkModel;
};
export type GetApiMyVpcPrivateNetworkListApiResponse =
  /** status 200 OK */ VpcPrivateNetworkListResponse[];
export type GetApiMyVpcPrivateNetworkListApiArg = void;
export type GetApiMyVpcPrivateNetworkGetByIdApiResponse =
  /** status 200 OK */ VpcPrivateNetworkListResponse;
export type GetApiMyVpcPrivateNetworkGetByIdApiArg = {
  id: number;
};
export type GetApiMyVpcNetworkShortListByVpcHostIdApiResponse =
  /** status 200 OK */ VpcNetworkShortListResponse[];
export type GetApiMyVpcNetworkShortListByVpcHostIdApiArg = {
  vpcHostId: number;
};
export type GetApiMyVpcNetworkListByVpcHostIdApiResponse =
  /** status 200 OK */ VpcNetworkListResponse[];
export type GetApiMyVpcNetworkListByVpcHostIdApiArg = {
  vpcHostId: number;
};
export type PutApiMyVpcNetworkEditByIdApiResponse = unknown;
export type PutApiMyVpcNetworkEditByIdApiArg = {
  id: number;
  editVmNetworkModel: EditVmNetworkModel;
};
export type DeleteApiMyVpcNetworkDeleteByIdApiResponse = unknown;
export type DeleteApiMyVpcNetworkDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyVpcNetworkCreateApiResponse = unknown;
export type PostApiMyVpcNetworkCreateApiArg = {
  createVpcNetworkModel: CreateVpcNetworkModel;
};
export type PutApiMyVpcNatIncreaseSequenceByVpcHostIdAndIdApiResponse = unknown;
export type PutApiMyVpcNatIncreaseSequenceByVpcHostIdAndIdApiArg = {
  vpcHostId: number;
  id: number;
};
export type PutApiMyVpcNatDecreaseSequenceByVpcHostIdAndIdApiResponse = unknown;
export type PutApiMyVpcNatDecreaseSequenceByVpcHostIdAndIdApiArg = {
  vpcHostId: number;
  id: number;
};
export type GetApiMyVpcNatListByVpcHostIdApiResponse =
  /** status 200 OK */ GetVpcGatewayNatResponse[];
export type GetApiMyVpcNatListByVpcHostIdApiArg = {
  vpcHostId: number;
};
export type GetApiMyVpcNatGetByIdApiResponse =
  /** status 200 OK */ GetVpcGatewayNatResponse;
export type GetApiMyVpcNatGetByIdApiArg = {
  id: number;
};
export type DeleteApiMyVpcNatDeleteByIdApiResponse = unknown;
export type DeleteApiMyVpcNatDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyVpcNatCreateSnatApiResponse = unknown;
export type PostApiMyVpcNatCreateSnatApiArg = {
  createVpcGatewaySnatModel: CreateVpcGatewaySnatModel;
};
export type PostApiMyVpcNatCreateDnatApiResponse = unknown;
export type PostApiMyVpcNatCreateDnatApiArg = {
  createVpcGatewayDnatModel: CreateVpcGatewayDnatModel;
};
export type GetApiMyVpcLoadBalanceListByVpcHostIdApiResponse =
  /** status 200 OK */ VpcLbListResponse[];
export type GetApiMyVpcLoadBalanceListByVpcHostIdApiArg = {
  vpcHostId: number;
};
export type DeleteApiMyVpcLoadBalanceDeleteByIdApiResponse = unknown;
export type DeleteApiMyVpcLoadBalanceDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyVpcLoadBalanceCreateApiResponse = unknown;
export type PostApiMyVpcLoadBalanceCreateApiArg = {
  createVpcHostLbModel: CreateVpcHostLbModel;
};
export type GetApiMyVpcIpListByVpcHostIdApiResponse =
  /** status 200 OK */ VpcHostGatewayListResponse[];
export type GetApiMyVpcIpListByVpcHostIdApiArg = {
  vpcHostId: number;
};
export type DeleteApiMyVpcIpDeleteByIdApiResponse = unknown;
export type DeleteApiMyVpcIpDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyVpcIpCreateApiResponse = unknown;
export type PostApiMyVpcIpCreateApiArg = {
  createVpcHostGatewayIpModel: CreateVpcHostGatewayIpModel;
};
export type GetApiMyVpcHostShortListApiResponse =
  /** status 200 OK */ VpcShortListResponse[];
export type GetApiMyVpcHostShortListApiArg = void;
export type GetApiMyVpcHostListApiResponse =
  /** status 200 OK */ VpcListResponse[];
export type GetApiMyVpcHostListApiArg = void;
export type GetApiMyVpcHostGetByIdApiResponse =
  /** status 200 OK */ VpcResponse;
export type GetApiMyVpcHostGetByIdApiArg = {
  id: number;
};
export type PutApiMyVpcHostEditByIdApiResponse = unknown;
export type PutApiMyVpcHostEditByIdApiArg = {
  id: number;
  editVpcHostModel: EditVpcHostModel;
};
export type DeleteApiMyVpcHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyVpcHostDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyVpcHostCreateApiResponse = unknown;
export type PostApiMyVpcHostCreateApiArg = {
  createVpcHostModel: CreateVpcHostModel;
};
export type GetApiMyWebHostListApiResponse =
  /** status 200 OK */ WebHostListResponse[];
export type GetApiMyWebHostListApiArg = void;
export type GetApiMyWebHostGetLoginSessionByIdApiResponse =
  /** status 200 OK */ GetLoginSessionResponse;
export type GetApiMyWebHostGetLoginSessionByIdApiArg = {
  id: number;
};
export type GetApiMyWebHostGetByIdApiResponse =
  /** status 200 OK */ GetWebHostResponse;
export type GetApiMyWebHostGetByIdApiArg = {
  id: number;
};
export type PutApiMyWebHostEditByIdApiResponse = unknown;
export type PutApiMyWebHostEditByIdApiArg = {
  id: number;
  editWebHostModel: EditWebHostModel;
};
export type DeleteApiMyWebHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyWebHostDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyWebHostCreateApiResponse = unknown;
export type PostApiMyWebHostCreateApiArg = {
  createWebHostModel: CreateWebHostModel;
};
export type PostApiMyWebHostCheckDomainApiResponse = unknown;
export type PostApiMyWebHostCheckDomainApiArg = {
  checkWebHostDomainModel: CheckWebHostDomainModel;
};
export type PutApiMyPortalNewsUnsubscribeByEmailApiResponse = unknown;
export type PutApiMyPortalNewsUnsubscribeByEmailApiArg = {
  email: string;
};
export type PostApiMyPortalNewsCreateApiResponse = unknown;
export type PostApiMyPortalNewsCreateApiArg = {
  createNewsLetterModel: CreateNewsLetterModel;
};
export type PostApiMyPortalContactUsCreateApiResponse = unknown;
export type PostApiMyPortalContactUsCreateApiArg = {
  createContactUsModel: CreateContactUsModel;
};
export type GetApiMyPortalWebsiteBlogCommentGetByIdApiResponse =
  /** status 200 OK */ GetWebSiteBolgCommentResponse[];
export type GetApiMyPortalWebsiteBlogCommentGetByIdApiArg = {
  id: number;
};
export type PostApiMyPortalWebsiteBlogCommentCreateApiResponse = unknown;
export type PostApiMyPortalWebsiteBlogCommentCreateApiArg = {
  createWebSiteBolgCommentModel: CreateWebSiteBolgCommentModel;
};
export type GetApiMyPortalWebsiteBlogListApiResponse =
  /** status 200 OK */ WebSiteBolgListResponse[];
export type GetApiMyPortalWebsiteBlogListApiArg = void;
export type GetApiMyPortalWebsiteBlogGetRandomArticlesByLinkApiResponse =
  /** status 200 OK */ GetWebSiteRandomArticleResponse[];
export type GetApiMyPortalWebsiteBlogGetRandomArticlesByLinkApiArg = {
  link: string;
};
export type GetApiMyPortalWebsiteBlogGetHeaderArticlesApiResponse =
  /** status 200 OK */ GetWebSiteHeaderArticleResponse[];
export type GetApiMyPortalWebsiteBlogGetHeaderArticlesApiArg = void;
export type GetApiMyPortalWebsiteBlogGetByLinkApiResponse =
  /** status 200 OK */ GetWebSiteBolgResponse;
export type GetApiMyPortalWebsiteBlogGetByLinkApiArg = {
  link: string;
};
export type GetApiMyPortalWebsiteAlarmListApiResponse =
  /** status 200 OK */ WebSiteAlarmListResponse[];
export type GetApiMyPortalWebsiteAlarmListApiArg = void;
export type UserLogResponse = {
  id?: number;
  userId?: string | null;
  activityDate?: string;
  source?: string | null;
  controller?: string | null;
  action?: string | null;
  userAgent?: string | null;
  userIp?: string | null;
  referrer?: string | null;
  data?: string | null;
};
export type UserLogResponseIEnumerablePagedResponse = {
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  totalRecords?: number;
  data?: UserLogResponse[] | null;
};
export type RoleAccessTypeListResponse = {
  id: number;
  name: string | null;
};
export type RoleAccessListTuple = {
  accessId: number;
  hasAccess: boolean;
};
export type RoleAccessList = {
  roleId: number;
  name: string | null;
  description: string | null;
  roleAccessTypeId?: number;
  hasAccess: boolean;
  accesses?: RoleAccessListTuple[] | null;
};
export type RoleAccessListResponse = {
  isSuperUser: boolean;
  isFinancialManager: boolean;
  isAccountManager: boolean;
  roleAccesses?: RoleAccessList[] | null;
};
export type AccessTupleModel = {
  accessId: number;
  hasAccess: boolean;
};
export type RoleAccessListModel = {
  roleAccessTypeId: number;
  roleId: number;
  accessTuples?: AccessTupleModel[] | null;
};
export type EditRoleAccessModel = {
  userName: string;
  isSuperUser: boolean;
  isFinancialManager: boolean;
  isAccountManager: boolean;
  roleAccesses?: RoleAccessListModel[] | null;
};
export type RoleListResponse = {
  id: number;
  name: string | null;
};
export type TwoFactorModel = {
  twoFactorStatus: boolean;
};
export type GetNotificationStatusResponse = {
  id: string;
  phoneNotify: boolean;
  emailNotify: boolean;
};
export type GetProfileResponse = {
  id?: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  email: string | null;
  emailConfirmed: boolean;
  idConfirmed: boolean;
  hasTwoFactor: boolean;
  isLegal: boolean;
  firstName: string | null;
  lastName: string | null;
  nationalId?: string | null;
  birthDate?: string | null;
  address?: string | null;
  isFromSso?: boolean;
  isDisabled?: string | null;
  createDate?: string;
  modifyDate?: string;
};
export type EditPhoneNumberModel = {
  phoneNumber: string;
};
export type EditPhoneNotifyModel = {
  phoneNotify: boolean;
};
export type EditEmailNotifyModel = {
  emailNotify: boolean;
};
export type EditEmailModel = {
  email: string;
};
export type EditProfileResponse = {
  profileCompleted: boolean;
};
export type EditProfileModel = {
  firstName: string;
  lastName: string;
  nationalId: string;
  birthDate: string;
  address: string;
};
export type ConfirmPhoneNumberModel = {
  confirmCode: string;
};
export type ConfirmEmailModel = {
  confirmCode: string;
};
export type ChangePasswordModel = {
  currentPassword: string;
  password: string;
};
export type NotificationListResponse = {
  id: number;
  content: string | null;
  subject: string | null;
  isRead: boolean;
  notificationDate: string;
};
export type CustomerUserListResponse = {
  userId: string;
  name: string | null;
  userName: string | null;
  phoneNumber: string | null;
  isSuperUser: boolean;
  isActive: boolean;
  hasTwoFactor: boolean;
};
export type ChangeCustomerUserModel = {
  customerId?: number;
};
export type CreateCustomerUserModel = {
  userName: string;
  isSuperUser: boolean;
  isFinancialManager: boolean;
  isAccountManager: boolean;
  roleAccesses?: RoleAccessListModel[] | null;
};
export type GetCustomerResponse = {
  id: number;
  name: string | null;
  nationalId?: string | null;
  registrationNumber?: string | null;
  registrationDate?: string | null;
  phone?: string | null;
  statusId: number;
  status: string | null;
  isLegal: boolean;
  createDate?: string | null;
  modifyDate?: string | null;
};
export type EditCustomerModel = {
  name: string;
  nationalId: string;
  phone: string;
  address: string;
  postalCode: string;
  registrationDate?: string | null;
};
export type ConvertCustomerToLegalModel = {
  name: string | null;
  nationalId: string | null;
  phoneNumber: string | null;
  postalCode: string | null;
  address: string | null;
  registrationNumber?: string | null;
  registrationDate?: string | null;
};
export type LoginResponse = {
  twoFactor?: boolean;
  accessToken?: string | null;
  userId?: string;
  userTitle?: string | null;
  isSuperUser?: boolean;
  isFinancialManager?: boolean;
  isAccountManager?: boolean;
  profileCompleted?: boolean;
  captchaRequired?: boolean;
  roles?: number[] | null;
};
export type TwoFactorLoginModel = {
  email: string;
  confirmCode: number;
};
export type SsoLoginResponse = {
  url: string | null;
};
export type SsoLoginModel = {
  code: string | null;
};
export type RegisterModel = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  captchaKey: string;
  captchaCode: string;
  referralCode?: string | null;
};
export type LoginModel = {
  email: string;
  password: string;
  captchaKey?: string | null;
  captchaCode?: string | null;
};
export type ForgotConfirmModel = {
  email: string;
  confirmCode: number;
  password: string;
};
export type ForgotModel = {
  email: string;
  captchaKey: string;
  captchaCode: string;
};
export type CaptchaResponse = {
  base64CaptchaImage: string | null;
  captchaKey: string;
};
export type EquipmentTypeListResponse = {
  id: number;
  name: string | null;
};
export type EquipmentBrandListResponse = {
  id: number;
  name: string | null;
};
export type EquipmentListResponse = {
  id: number;
  name: string | null;
  type: string | null;
  typeId: number;
  brand: string | null;
  brandId: number;
};
export type BareMetalListResponse = {
  id: number;
  name: string | null;
  status: string | null;
  statusId: number;
  bareMetalImage: string | null;
  bareMetalMachine: string | null;
  datacenter: string | null;
  datacenterRack: string | null;
  createDate?: string;
};
export type BareMetalResponse = {
  id: number;
  name: string | null;
  bareMetalImage: string | null;
  bareMetalMachine: string | null;
  datacenter: string | null;
  datacenterRack: string | null;
  status: string | null;
  statusId: number;
  physicalCpu: number;
  physicalMemory: number;
  hdd600GSas10K: number;
  hdd1200GSas10K: number;
  networkPort1G: number;
  networkPort10G: number;
};
export type CreateBareMetalModel = {
  productBundleId: number;
  name: string;
  datacenterId: number;
  imageId: number;
  password?: string | null;
  publicKey?: string | null;
};
export type ColocationListResponse = {
  id?: number;
  name: string | null;
  datacenter: string | null;
  status: string | null;
  statusId?: number;
  datacenterId?: number;
  datacenterRackId?: number;
  datacenterRack: string | null;
  createDate?: string;
};
export type GetColocationResponse = {
  id: number;
  name: string | null;
  datacenter: string | null;
  status: string | null;
  datacenterRack: string | null;
  powerAmp: number;
  network1G: number;
  network10G: number;
  ipv4Count: number;
  rackUnitSpace: number;
};
export type EquipmentRequestModel = {
  equipmentId: number;
  inventoryNumber: string;
};
export type CreateColocationModel = {
  datacenterId: number;
  name: string;
  rackUnitSpace?: number;
  networkPort1G?: number;
  networkPort10G?: number;
  powerAmp?: number;
  ipv4Count?: number;
  equipmentModels?: EquipmentRequestModel[] | null;
};
export type DashboardUsageResponse = {
  month: string | null;
  count: number;
};
export type DashboardFinancialResponse = {
  walletBalance?: number;
  billPrice?: number;
  unpaidInvoiceCount?: number;
  activeServiceCount?: number;
};
export type DatacenterIpListResponse = {
  id: number;
  ip: string | null;
  isV4: boolean;
  isPrimary: boolean;
};
export type DatacenterImageListResponse = {
  id: number;
  name: string | null;
  osId: number;
  os: string | null;
};
export type DatacenterListResponse = {
  id: number;
  name: string | null;
  photoName?: string | null;
};
export type DnsCdnListResponse = {
  id?: number;
  zoneName: string | null;
  isHsts: boolean;
  isHttpsRedirect: boolean;
  isNonWwwRedirect: boolean;
  status: string | null;
  statusId: number;
  createDate?: string;
};
export type GetDnsNsResponse = {
  status?: boolean;
  ns?: string[] | null;
  cloudNs?: string[] | null;
};
export type GetCdnResponse = {
  zoneName: string | null;
  statusId: number;
  status: string | null;
  cdnHostTypeId: number;
  cdnHostEdgeCertTypeId: number;
  cdnHostOriginCertTypeId: number;
  isHsts: boolean;
  isHttpsRedirect: boolean;
  isNonWwwRedirect: boolean;
};
export type SeriesModel = {
  name?: string | null;
  data?: number[] | null;
};
export type GetAnalyticResponse = {
  categories?: string[] | null;
  series?: SeriesModel[] | null;
};
export type GetDnsCdnResponse = {
  id?: number;
  zoneName: string | null;
  statusId: number;
  status: string | null;
  createDate: string;
  modifyDate: string;
};
export type CreateDnsCdnModel = {
  zoneName: string;
};
export type CheckDnsCdnModel = {
  zoneName: string;
};
export type ChangeOriginCertTypeModel = {
  id?: number;
  cdnHostOriginCertTypeId?: number;
};
export type ChangeNonWwwRedirectModel = {
  id?: number;
  isNonWwwRedirect?: boolean;
};
export type ChangeHttpsRedirectModel = {
  id?: number;
  isHttpsRedirect?: boolean;
};
export type ChangeHstsModel = {
  id?: number;
  isHsts?: boolean;
};
export type ChangeEdgeCertTypeModel = {
  id?: number;
  cdnHostEdgeCertTypeId?: number;
};
export type ChangeCdnTypeModel = {
  id?: number;
  cdnHostTypeId?: number;
};
export type DnsRecordListResponse = {
  id?: number;
  name: string | null;
  type: string | null;
  ttl: string | null;
  value: string | null;
  useProxy?: boolean;
};
export type GetDnsRecordResponse = {
  id?: number;
  name: string | null;
  type: string | null;
  ttl: string | null;
  value: string | null;
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
export type EditDnsRecordModel = {
  dnsCdnHostId?: number;
  name: string;
  type: string;
  ttl: string;
  value: string;
  useProxy: boolean;
  preference?: string | null;
  flags?: string | null;
  tag?: string | null;
  priority?: string | null;
  weight?: string | null;
  port?: string | null;
  target?: string | null;
  authority?: string | null;
};
export type CreateDnsRecordModel = {
  dnsCdnHostId?: number;
  name: string;
  type: string;
  ttl: string;
  value: string;
  useProxy: boolean;
  preference?: string | null;
  flags?: string | null;
  tag?: string | null;
  priority?: string | null;
  weight?: string | null;
  port?: string | null;
  target?: string | null;
  authority?: string | null;
};
export type CdnRouteListResponse = {
  id: number;
  host: string | null;
  path: string | null;
  loadBalancingPolicy: string | null;
  maxConnectionsPerServer?: number;
};
export type DestinationModel = {
  address: string;
};
export type GetCdnRouteResponse = {
  dnsCdnHostId?: number;
  host: string | null;
  maxConnectionsPerServer?: number;
  loadBalancingPolicyId?: number;
  dangerousAcceptAnyServerCertificate?: boolean;
  destinations: DestinationModel[] | null;
};
export type EditCdnRouteModel = {
  host: string;
  loadBalancingPolicyId: number;
  maxConnectionsPerServer: number;
  dangerousAcceptAnyServerCertificate: boolean;
  destinations: DestinationModel[] | null;
};
export type GetCdnCertResponse = {
  issuer?: string | null;
  commonName?: string | null;
  expirationDate?: string | null;
};
export type CreateCdnOriginUserCertModel = {
  dnsCdnHostId?: number;
  keyPem: string;
  certPem: string;
};
export type CreateCdnEdgeUserCertModel = {
  dnsCdnHostId?: number;
  keyPem: string;
  certPem: string;
  bundleCertPem?: string | null;
};
export type CreateCdnEdgeCertModel = {
  dnsCdnHostId?: number;
};
export type DomainListResponse = {
  id: number;
  domainName: string | null;
  status: string | null;
  statusId: number;
  type: string | null;
  ns1: string | null;
  ns2: string | null;
  createDate: string;
  expireDate?: string | null;
};
export type DomainGetStatusResponse = {
  statusId?: number;
};
export type GetDomainResponse = {
  id: number;
  domainName: string | null;
  status: string | null;
  statusId: number;
  type: string | null;
  createDate: string;
  name: string | null;
  organization: string | null;
  country: string | null;
  province: string | null;
  city: string | null;
  street: string | null;
  postalCode: string | null;
  voice: string | null;
  fax?: string | null;
  email: string | null;
  autoRenewal: boolean;
  isPremium: boolean;
  ns1: string | null;
  ns2: string | null;
  expireDate?: string | null;
};
export type RegisterDomainModel = {
  domainName: string;
  ext: string;
  productId: number;
  authCode?: string | null;
  email: string;
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
};
export type CheckDomainModel = {
  domainName: string;
  ext: string;
};
export type ChangeNsModel = {
  id: number;
  ns1: string;
  ns2: string;
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
export type HypervisorListResponse = {
  id?: number;
  name: string | null;
};
export type VmProjectListResponse = {
  id?: number;
  name: string | null;
  hypervisorType: string | null;
  hypervisorTypeId?: number;
  datacenterId: number;
  datacenter: string | null;
  vpcHostId?: number | null;
  vpcHost?: string | null;
  isPublic: boolean;
};
export type VmProjectGetResponse = {
  id: number;
  name: string | null;
  hypervisorTypeId: number;
  datacenterId: number;
  vpcHostId?: number | null;
  isPublic: boolean;
};
export type VmProjectEditModel = {
  name: string;
};
export type VmProjectCreateModel = {
  name: string;
  hypervisorTypeId: number;
  datacenterId: number;
};
export type SecretKeyValuePairsResponse = {
  id: number;
  key: string | null;
  value: string | null;
};
export type KuberCloudSecretListResponse = {
  id: number;
  name: string | null;
  secretTypeId: number;
  createDate: string;
  secrets: SecretKeyValuePairsResponse[] | null;
};
export type SecretKeyValuePairResponse = {
  id: number;
  key: string | null;
  value: string | null;
};
export type GetKuberCloudSecretResponse = {
  id: number;
  name: string | null;
  alias: string | null;
  description: string | null;
  secretTypeId: number;
  keyValuePairs: SecretKeyValuePairResponse[] | null;
  createDate: string;
};
export type EditKuberCloudSecretModel = {
  secretId: number;
  alias?: string | null;
  description?: string | null;
  removeEnvIds?: number[] | null;
  envs?: {
    [key: string]: {
      [key: string]: string;
    };
  } | null;
};
export type CreateKuberCloudSecretModel = {
  name: string;
  namespaceId: number;
  secretTypeId: number;
  envs: {
    [key: string]: string;
  };
  alias?: string | null;
  description?: string | null;
};
export type ListPort = {
  portId?: number;
  nodePort?: number;
  targetPort?: number;
};
export type KuberCloudHostListPortResponse = {
  deploymentId: number;
  deployName: string | null;
  imageName: string | null;
  createDate: string;
  ports?: ListPort[] | null;
};
export type EditKuberCloudIngressRuleModel = {
  ingressId: number;
  ingressRuleId: number;
  secretId?: number;
  domainName?: string | null;
  path?: string | null;
  kuberCloudDeployPortId?: number | null;
};
export type DeleteKuberCloudIngressRuleModel = {
  ingressId: number;
  ruleIds: number[];
};
export type IngressRuleModelRequest = {
  path: string | null;
  kuberCloudDeployPortId: number;
};
export type CreateKuberCloudIngressRuleModel = {
  ingressId: number;
  secretId: number;
  rules: IngressRuleModelRequest[];
};
export type KuberCloudIngressListResponse = {
  id: number;
  name: string | null;
  ruleCount: number;
  createDate: string;
  modifyDate: string;
};
export type RulesResponse = {
  id: number;
  path: string | null;
  serviceName: string | null;
  port: number;
  createDate: string;
  modifyDate: string;
};
export type GetKuberCloudIngressResponse = {
  id: number;
  name: string | null;
  domainName: string | null;
  rules: RulesResponse[] | null;
  createDate: string;
};
export type RuleModelRequest = {
  path: string | null;
  kuberCloudDeployPortId: number;
};
export type CreateKuberCloudIngressModel = {
  name: string;
  domainName: string;
  protocolTypeId: number;
  secretId?: number | null;
  rules: RuleModelRequest[];
};
export type KuberCloudImageCategoryDto = {
  id: number;
  name: string | null;
};
export type KuberCloudImageTagsResponse = {
  id: number;
  name: string | null;
};
export type KuberCloudImagePortResponse = {
  id: number;
  name: string | null;
};
export type KuberCloudImageKeyResponse = {
  id: number;
  name: string | null;
};
export type KuberCloudImageResponse = {
  id: number;
  name: string | null;
  photoName: string | null;
  subtitle: string | null;
  description: string | null;
  path: string | null;
  categoryId: number;
  tags: KuberCloudImageTagsResponse[] | null;
  ports: KuberCloudImagePortResponse[] | null;
  keys: KuberCloudImageKeyResponse[] | null;
};
export type KuberCloudHostListResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  status: string | null;
  statusId: number;
  podInUse?: number;
  tenPods?: number;
  createDate: string;
};
export type KuberCloudHostGetResponse = {
  id: number;
  datacenter: string | null;
  datacenterId: number;
  name: string | null;
  status: string | null;
  statusId: number;
  cpu?: number;
  memory?: number;
  disk?: number;
  podInUse?: number;
  tenPods?: number;
  createDate: string;
};
export type EditKuberCloudHostModel = {
  cpu: number;
  memory: number;
  disk: number;
  tenPods: number;
};
export type CreateKuberCloudHostModel = {
  name: string;
  datacenterId: number;
  isPredefined: boolean;
  hostProjectId?: number | null;
  productBundleId?: number | null;
  cpu?: number | null;
  memory?: number | null;
  disk?: number | null;
  tenPods?: number | null;
};
export type KuberCloudFirewallListResponse = {
  id: number;
  sourceIp: string | null;
  protocol: string | null;
  targetPort: number;
  createDate?: string;
};
export type CreateKuberCloudFirewallModel = {
  datacenterKuberNodeId: number;
  firewallProtocolTypeId: number;
  deployPortId: number;
  sourceIp?: string | null;
  sourcePort?: number | null;
};
export type EnvKeyValuePairResponse = {
  id?: number;
  key: string | null;
  value: string | null;
};
export type KuberCloudDeploymentEnvListResponse = {
  envs: EnvKeyValuePairResponse[] | null;
};
export type GetKuberCloudDeploymentEnvResponse = {
  id?: number;
  key: string | null;
  value: string | null;
  createDate: string;
  modifyDate: string;
};
export type Port = {
  portId?: number;
  nodePort?: number;
  targetPort?: number;
};
export type KuberCloudDeploymentListResponse = {
  id: number;
  name: string | null;
  image: string | null;
  namespace: string | null;
  createDate: string;
  ports?: Port[] | null;
};
export type PortResponse = {
  portId?: number;
  nodePort?: number;
  targetPort?: number;
};
export type GetKuberCloudDeploymentResponse = {
  id: number;
  name: string | null;
  image: string | null;
  replica: number;
  namespace: string | null;
  createDate: string;
  modifyDate: string;
  ports?: PortResponse[] | null;
};
export type EditKuberCloudDeploymentModel = {
  deployId: number;
  keyValue?: {
    [key: string]: {
      [key: string]: string;
    };
  } | null;
  envToDelete?: {
    [key: string]: number;
  } | null;
  replicaNumber?: number | null;
};
export type CreateKuberCloudDeploymentModel = {
  name: string;
  imageTagId: number;
  isPublic: boolean;
  namespaceId: number;
  keyValue?: {
    [key: string]: {
      [key: string]: string;
    };
  } | null;
  replicaNumber?: number;
};
export type ConfigMapKeyValuePairsResponse = {
  id: number;
  key: string | null;
  value: string | null;
};
export type KuberCloudConfigListResponse = {
  id: number;
  name: string | null;
  createDate: string;
  configMaps: ConfigMapKeyValuePairsResponse[] | null;
};
export type KeyValuePairResponse = {
  id: number;
  key: string | null;
  value: string | null;
};
export type GetKuberCloudConfigResponse = {
  id: number;
  name: string | null;
  alias: string | null;
  description: string | null;
  keyValuePairs: KeyValuePairResponse[] | null;
  createDate: string;
};
export type EditKuberCloudConfigmapModel = {
  configmapId: number;
  alias?: string | null;
  description?: string | null;
  removeEnvIds?: number[] | null;
  envs?: {
    [key: string]: {
      [key: string]: string;
    };
  } | null;
};
export type CreateKuberCloudConfigmapModel = {
  name: string;
  namespaceId: number;
  envs: {
    [key: string]: string;
  };
  alias?: string | null;
  description?: string | null;
};
export type KubernetesVersionListResponse = {
  id: number;
  name: string | null;
};
export type KubernetesNodeListResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  status: string | null;
  kubernetesNodeType: string | null;
  kubernetesNodeTypeId: number;
  productId: number;
  product: string | null;
  hostId: number;
  statusId: number;
  ip?: string | null;
};
export type CreateKubernetesNodeModel = {
  kubernetesHostId: number;
  kubernetesNodeTypeId: number;
  isPredefined: boolean;
  productBundleId?: number | null;
  vmPassword: string;
  cpu?: number | null;
  memory?: number | null;
  disk?: number | null;
};
export type KubernetesListResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  status: string | null;
  statusId: number;
  createDate: string;
};
export type GetKubernetesResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  masterNode: number;
  workerNode: number;
  status: string | null;
  statusId: number;
  customerProductType: string | null;
  createDate: string;
  modifyDate: string;
};
export type CreateKubernetesModel = {
  clusterName: string;
  datacenterId: number;
  imageId: number;
  kubernetesVersionId: number;
  vmPassword: string;
  isPredefined: boolean;
  productBundleId?: number | null;
  nodeCount?: number;
  cpu?: number | null;
  memory?: number | null;
  disk?: number | null;
  hypervisorTypeId?: number;
};
export type StorageUserListResponse = {
  id: number;
  accessKey: string | null;
  secretKey: string | null;
  createDate: string;
};
export type CreateStorageUserModel = {
  storageHostId: number;
};
export type StorageHostListResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  status: string | null;
  statusId: number;
  isPublic: boolean;
  public: string | null;
  createDate: string;
  expireDate?: string | null;
};
export type GetStorageHostResponse = {
  id?: number;
  datacenter?: string | null;
  name?: string | null;
  status?: string | null;
  statusId?: number;
  disk?: number;
  isPublic?: boolean;
  public?: string | null;
  createDate?: string;
};
export type EditStorageHostModel = {
  disk?: number;
};
export type CreateStorageHostModel = {
  name: string;
  isPublic: boolean;
  datacenterId: number;
  isPredefined: boolean;
  productBundleId?: number | null;
  disk?: number | null;
};
export type WalletTransactionListResponse = {
  id: number;
  transactionDate: string;
  credit: number;
  debit: number;
  balance: number;
  description?: string | null;
};
export type WalletUsageReportResponse = {
  balance: number;
  toDate: string;
};
export type UseVoucherModel = {
  voucherCode: string;
};
export type CustomerReferralListResponse = {
  customer: string | null;
  commissionPercent: number;
  joinDate: string;
};
export type GetReferralResponse = {
  id: number;
  referralCode: string | null;
  referralLink: string | null;
};
export type ProductItemListResponse = {
  id: number;
  name: string | null;
  price: number;
  unit: string | null;
};
export type VmSpec = {
  productItemId: number;
  name: string | null;
  quantity: number;
};
export type MasterNodeModel = {
  kubernetesManagementItemId: number;
  kubernetesManagementItemPrice: number;
  masterNodeCount: number;
  masterVmSpecs: VmSpec[] | null;
};
export type KubernetesPriceResponse = {
  vmProductItemsPrice: ProductItemListResponse[] | null;
  masterNodesInfo: MasterNodeModel;
};
export type ProductBundleWebListResponse = {
  id: number;
  name: string | null;
  price: number;
  quantity?: number;
};
export type ProductBundleVpcListResponse = {
  id: number;
  name: string | null;
  price: number;
  rules10: number;
  ipv4: number;
};
export type ProductBundleVmListResponse = {
  id: number;
  name: string | null;
  price: number;
  vCpu: number;
  vMemory: number;
  vDisk: number;
  ipv4: number;
};
export type ProductBundleStorageListResponse = {
  id: number;
  name: string | null;
  price: number;
  vDisk: number;
};
export type ProductBundleKuberClusterListResponse = {
  id: number;
  name: string | null;
  price: number;
  vCpu: number;
  vMemory: number;
  vDisk: number;
  ipv4: number;
};
export type ProductBundleKuberCloudListResponse = {
  id: number;
  name: string | null;
  price: number;
  kuberCpu: number;
  kuberMemory: number;
  kuberDisk: number;
  kuber10Pods: number;
};
export type ProductBundleBareMetalListResponse = {
  id: number;
  name: string | null;
  price: number;
  physicalCpu: number;
  physicalMemory: number;
  physicalDisk: number;
  networkPort: number;
  bareMetalIpv4: number;
};
export type ProductListResponse = {
  id: number;
  name: string | null;
  description?: string | null;
};
export type GetProductResponse = {
  id: number;
  name: string | null;
  description?: string | null;
  supplementaryDescription?: string | null;
};
export type PaymentProviderListResponse = {
  id?: number;
  name: string | null;
  photoName?: string | null;
  status?: boolean;
};
export type SepCallbackModel = {
  TerminalId?: number | null;
  state?: string | null;
  status?: number | null;
  RRN?: number | null;
  refNum?: string | null;
  resNum?: number | null;
  traceNo?: number | null;
  amount?: number | null;
  wage?: number | null;
  securePan?: string | null;
  hashedCardNumber?: string | null;
};
export type PecConfirmCallRequest = {
  token?: number;
  orderId?: number | null;
  terminalNo?: number | null;
  RRN?: number | null;
  status?: number | null;
  hashCardNumber?: string | null;
  amount?: string | null;
  swAmount?: string | null;
  sTraceNo?: string | null;
};
export type PaymentListResponse = {
  id: number;
  transactionDate: string;
  amount: number;
  rrn?: number | null;
  hashCardNumber?: string | null;
  paymentStatus: string | null;
  paymentStatusId: number;
  paymentProvider: string | null;
  paymentProviderId: number;
  finalStatus: boolean;
};
export type GetPaymentResponse = {
  id: number;
  transactionDate: string;
  amount: number;
  rrn?: number | null;
  hashCardNumber?: string | null;
  paymentStatus: string | null;
  paymentStatusId: number;
  paymentProvider: string | null;
  paymentProviderId: number;
  finalStatus: boolean;
};
export type CreatePaymentResponse = {
  status: boolean;
  location: string | null;
  phoneNumber?: string | null;
  refId?: string | null;
};
export type CreatePaymentModel = {
  paymentProviderId?: number;
  amount: number;
};
export type BpmConfirmCallRequest = {
  refId?: string | null;
  resCode?: number;
  saleOrderId?: number | null;
  saleReferenceId?: number | null;
  cardHolderInfo?: string | null;
  cardHolderPan?: string | null;
  finalAmount?: number | null;
};
export type OrderOfferPayResponse = {
  status: boolean;
  location: string | null;
  phoneNumber?: string | null;
  refId?: string | null;
};
export type OrderOfferPayModel = {
  paymentProviderId?: number;
  offerId: number;
};
export type OfferListResponse = {
  id: number;
  name: string | null;
  amount: number;
  freeAmount: number;
  expireDate: string;
};
export type OfferGetResponse = {
  name: string | null;
  amount: number;
  freeAmount: number;
  expireDate: string;
};
export type IssueSubjectShortListResponse = {
  id?: number;
  name: string | null;
};
export type IssueSubjectSelectListModel = {
  productId?: number;
  businessUnitId?: number;
};
export type IssueSubjectListResponse = {
  id: number;
  name: string | null;
};
export type IssueItemModel = {
  id: number;
  issueDate: string;
  content: string | null;
  user: string | null;
  userId: string;
  fileName?: string | null;
  fileSize?: number | null;
};
export type IssueItemListResponse = {
  issueId: number;
  issueSubject: string | null;
  businessUnit: string | null;
  customerProduct?: string | null;
  issueStatusId: number;
  createDate: string;
  modifyDate?: string | null;
  issueItems?: IssueItemModel[] | null;
};
export type CreateIssueItemModel = {
  issueId: number;
  content: string;
  attachment?: Blob | null;
};
export type IssueShortListResponse = {
  id: number;
  issueSubject: string | null;
  issueStatus: string | null;
  createDate: string;
  modifyDate?: string | null;
};
export type IssueListResponse = {
  id: number;
  issueSubject: string | null;
  businessUnit: string | null;
  issueStatus: string | null;
  issueStatusId: number;
  createDate: string;
  modifyDate: string | null;
};
export type CreateIssueModel = {
  content: string;
  businessUnitId: number;
  issueSubjectId: number;
  issuePriorityId: number;
  customerProductId?: number | null;
  productId?: number | null;
  attachment?: Blob | null;
};
export type UnPaidInvoiceResponse = {
  id: number;
  customerName: string | null;
  invoiceDate: string;
  netPrice: number;
  discount: number;
  invoiceStatusId: number;
  invoicePrice: number;
  vat: number;
};
export type InvoiceSummaryResponse = {
  totalPaid: number;
  totalUnpaid: number;
};
export type PayInvoiceResponse = {
  status: boolean;
  location: string | null;
};
export type PayInvoiceModel = {
  id?: number;
};
export type InvoiceListResponse = {
  id: number;
  invoiceDate: string;
  netPrice: number;
  discount: number;
  vat: number;
  totalPrice: number;
  invoicePrice: number;
  invoiceStatusId: number;
  invoiceStatus: string | null;
};
export type InvoiceItemModel = {
  product: string | null;
  quantity: number;
  unitPrice: number;
  price: number;
};
export type GetInvoiceResponse = {
  id: number;
  sellerName: string | null;
  sellerAddress: string | null;
  sellerPhone: string | null;
  customerName: string | null;
  customerAddress?: string | null;
  customerPhone?: string | null;
  invoiceStatusId: number;
  invoiceStatus: string | null;
  invoiceDate: string;
  netPrice: number;
  discount: number;
  totalPrice: number;
  vat: number;
  invoicePrice: number;
  invoiceItems: InvoiceItemModel[] | null;
};
export type CustomerProductShortListResponse = {
  id: number;
  name: string | null;
  product: string | null;
  customerProduct: string | null;
  createDate: string;
};
export type CustomerProductListResponse = {
  id: number;
  name: string | null;
  product: string | null;
  productId: number;
  customerProduct: string | null;
  status: string | null;
  createDate: string;
};
export type CustomerBillShortListResponse = {
  id: number;
  billDate: string;
  totalPrice: number;
};
export type CustomerBillListResponse = {
  id: number;
  calculateMonthId: number;
  calculateMonth: string | null;
  billDate: string;
  netPrice: number;
  vat: number;
  totalPrice: number;
};
export type CustomerProductBillItemModel = {
  customerProductItem: string | null;
  quantity: number;
  duration: number;
  price: number;
  fromDate: string;
  toDate: string;
};
export type CustomerProductBillModel = {
  product: string | null;
  customerProduct: string | null;
  customerProductId: number;
  customerProductPrice: number;
  fromDate: string;
  toDate: string;
  customerProductBillItems?: CustomerProductBillItemModel[] | null;
};
export type GetCustomerBillResponse = {
  id: number;
  name: string | null;
  billDate: string;
  netPrice: number;
  vat: number;
  totalPrice: number;
  customerProductBills?: CustomerProductBillModel[] | null;
};
export type CommissionListResponse = {
  id?: number;
  walletTransactionId?: number;
  totalPrice?: number;
  commissionPrice?: number;
  commissionDate?: string;
};
export type CalculateMonthListResponse = {
  id?: number;
  name: string | null;
};
export type BusinessUnitListResponse = {
  id: number;
  name: string | null;
};
export type VmSnapshotResponse = {
  id: number;
  name: string | null;
  vmSnapshotStatusId: number;
  vmSnapshotStatus: string | null;
  isCreated: boolean;
  description?: string | null;
  createDate: string;
};
export type CreateSnapshotModel = {
  vmHostId: number;
  snapshotName: string;
  snapshotDescription?: string | null;
};
export type UnmountModel = {
  vmId: number;
};
export type MountModel = {
  vmId?: number;
};
export type IsoListResponse = {
  id?: number;
  name: string | null;
};
export type VmShortListResponse = {
  id?: number;
  name: string | null;
};
export type GetRemoteConsoleResponse = {
  location: string | null;
  vmTypeId: number;
};
export type RebuildVmModel = {
  name: string | null;
  password: string;
  publicKey?: string | null;
  imageId: number;
};
export type VmListResponse = {
  id?: number;
  name: string | null;
  status: string | null;
  statusId?: number;
  storageClassTypeId?: number;
  datacenter: string | null;
  operatingSystem: string | null;
  ipv4?: string | null;
  createDate?: string;
};
export type GetVmResponse = {
  id: number;
  datacenterId: number;
  name: string | null;
  operatingSystem: string | null;
  operatingSystemId: number;
  storageClassTypeId?: number;
  status: string | null;
  statusId: number;
  cpu: number;
  memory: number;
  disk: number;
  macAddress?: string | null;
  ip?: string | null;
  powerStatus?: string | null;
  networkStatus?: string | null;
  isCluster?: boolean;
  isMaster?: boolean;
  isPublic?: boolean;
  hypervisorTypeId: number;
  createDate: string;
  modifyDate: string;
};
export type EditVmModel = {
  cpu: number;
  memory: number;
  disk: number;
};
export type CreateVmModel = {
  name: string;
  password: string;
  publicKey?: string | null;
  imageId: number;
  storageClassTypeId: number;
  isPredefined: boolean;
  vmProjectId: number;
  productBundleId?: number | null;
  cpu?: number | null;
  memory?: number | null;
  disk?: number | null;
  vpcHostNetworkId?: number | null;
  ipAddress?: string | null;
};
export type VpcHostTranslateListResponse = {
  id: number;
  name: string | null;
  port: number;
  isTcp: boolean;
  createDate?: string;
};
export type CreateVpcTranslateModel = {
  vpcHostId: number;
  serviceName: string | null;
  isTcp: boolean;
  port: number;
  description: string | null;
};
export type VpcPrivateNetworkRequestListResponse = {
  id?: number;
  vpcHost: string | null;
  vpcHostPrivateNetwork: string | null;
  vpcHostPrivateNetworkRequestStatus: string | null;
  createDate?: string;
  modifyDate?: string;
  description?: string | null;
};
export type CreateVpcPrivateNetworkModel = {
  vpcHostId: number;
  vpcPrivateNetworkId: number;
};
export type VpcPrivateNetworkListResponse = {
  id: number;
  name: string | null;
};
export type VpcNetworkShortListResponse = {
  id: number;
  name: string | null;
};
export type VpcNetworkListResponse = {
  id: number;
  gatewayCidr: string | null;
  subnetMask: string | null;
  subnetCidr: string | null;
  name: string | null;
  datacenter: string | null;
  createDate: string;
};
export type EditVmNetworkModel = {
  vpcHostId: number;
  vmHostId: number;
};
export type CreateVpcNetworkModel = {
  vpcHostId: number;
  name: string | null;
  gatewayCidr: string | null;
};
export type GetVpcGatewayNatResponse = {
  id: number;
  natTypeId: number;
  natTypeName: string | null;
  name: string | null;
  sourceIp: string | null;
  sourcePort: number;
  destinationIp: string | null;
  destinationPort: number;
  translateIp: string | null;
  sequence?: number;
  vpcHostServiceName?: string | null;
  serviceId?: number | null;
  description?: string | null;
  createDate: string;
};
export type CreateVpcGatewaySnatModel = {
  vpcHostId: number;
  vpcNetworkId: number;
  vpcHostGatewayIpId: number;
  name: string;
  sourceIp: string;
  destinationIp?: string | null;
  destinationPort?: number | null;
  description?: string | null;
};
export type CreateVpcGatewayDnatModel = {
  vpcHostId: number;
  vpcNetworkId: number;
  vpcHostGatewayIpId: number;
  vpcHostTranslateId: number;
  name: string;
  sourceIp?: string | null;
  destinationIp: string;
  destinationPort: number;
  description?: string | null;
};
export type VpcHostLbNodeResponse = {
  ip: string | null;
  port: number;
  name: string | null;
};
export type VpcLbListResponse = {
  id: number;
  ip: string | null;
  name: string | null;
  port: number;
  vpcHostLbType: string | null;
  vpcHostLbTypeId: number;
  vpcHostLbNodes?: VpcHostLbNodeResponse[] | null;
};
export type VpcHostLbNodeModel = {
  vmHostId: number;
  port: number;
};
export type CreateVpcHostLbModel = {
  vpcHostGatewayIpId: number;
  vpcHostLbPort: number;
  vpcHostLbTypeId: number;
  vpcHostLbNodes: VpcHostLbNodeModel[] | null;
};
export type VpcHostGatewayListResponse = {
  id: number;
  ip: string | null;
  isV4: boolean;
  isPrimary: boolean;
};
export type CreateVpcHostGatewayIpModel = {
  vpcHostId: number;
};
export type VpcShortListResponse = {
  id: number;
  name: string | null;
};
export type VpcListResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  vpcHostProjectId?: number | null;
  status: string | null;
  hypervisorTypeId: number;
  statusId: number;
  createDate: string;
};
export type VpcResponse = {
  id: number;
  datacenterId: number;
  vpcHostProjectId?: number | null;
  datacenter: string | null;
  name: string | null;
  status: string | null;
  hypervisorTypeId: number;
  statusId: number;
  createDate: string;
  modifyDate: string;
};
export type EditVpcHostModel = {
  name: string;
};
export type CreateVpcHostDefaultNetworks = {
  name: string | null;
  gatewayCidr: string | null;
};
export type CreateVpcHostModel = {
  name: string;
  datacenterId: number;
  productBundleId: number;
  vpcNodeTypeId?: number;
  defaultNetworks?: CreateVpcHostDefaultNetworks[] | null;
};
export type WebHostListResponse = {
  id?: number;
  datacenter: string | null;
  domainName: string | null;
  status: string | null;
  statusId?: number;
  createDate?: string;
  expireDate?: string | null;
};
export type GetLoginSessionResponse = {
  location: string | null;
};
export type GetWebHostResponse = {
  id: number;
  datacenter: string | null;
  domainName: string | null;
  status: string | null;
  statusId?: number;
  createDate?: string;
  expireDate?: string | null;
};
export type EditWebHostModel = {
  productBundleId: number;
};
export type CreateWebHostModel = {
  domainName: string;
  datacenterId: number;
  productBundleId?: number;
};
export type CheckWebHostDomainModel = {
  domainName: string;
};
export type CreateNewsLetterModel = {
  email: string;
  captchaKey: string;
  captchaCode: string;
};
export type CreateContactUsModel = {
  firstName: string;
  lastName: string;
  email: string;
  content: string;
  captchaKey: string;
  captchaCode: string;
};
export type GetWebSiteBolgCommentResponse = {
  id?: number;
  parentId?: number | null;
  name?: string | null;
  content?: string | null;
  createDate?: string;
};
export type CreateWebSiteBolgCommentModel = {
  id?: number;
  parentId?: number | null;
  name: string;
  email: string;
  content: string;
};
export type WebSiteBolgListResponse = {
  link?: string | null;
  imageLink?: string | null;
  author?: string | null;
  title?: string | null;
  subtitle?: string | null;
  createDate?: string;
  webBolgTags?: string[] | null;
};
export type GetWebSiteRandomArticleResponse = {
  imageLink?: string | null;
  link?: string | null;
  author?: string | null;
  title?: string | null;
  subtitle?: string | null;
  createDate?: string;
};
export type GetWebSiteHeaderArticleResponse = {
  imageLink?: string | null;
  author?: string | null;
  title?: string | null;
  subtitle?: string | null;
  createDate?: string;
  webBolgTags?: string[] | null;
};
export type GetWebSiteBolgResponse = {
  id?: number;
  author: string | null;
  imageLink: string | null;
  link: string | null;
  title: string | null;
  subtitle: string | null;
  text: string | null;
  viewCount?: number;
  loveCount?: number;
  createDate?: string;
  webBolgTags?: string[] | null;
};
export type WebSiteAlarmListResponse = {
  subject?: string | null;
  link?: string | null;
};
export const {
  useGetApiMyAccountUserLogQuery,
  useGetApiMyAccountRoleAccessTypeListQuery,
  useGetApiMyAccountRoleAccessListByUserIdQuery,
  usePutApiMyAccountRoleAccessEditMutation,
  useGetApiMyAccountRoleListQuery,
  usePutApiMyAccountProfileEditTwoFactorMutation,
  useGetApiMyAccountProfileGetNotificationStatusQuery,
  useGetApiMyAccountProfileGetQuery,
  usePutApiMyAccountProfileEditPhoneNumberMutation,
  usePutApiMyAccountProfileEditPhoneNotificationMutation,
  usePutApiMyAccountProfileEditEmailNotificationMutation,
  usePutApiMyAccountProfileEditEmailMutation,
  usePutApiMyAccountProfileEditMutation,
  usePostApiMyAccountProfileConfirmPhoneNumberMutation,
  usePostApiMyAccountProfileConfirmEmailMutation,
  usePostApiMyAccountProfileChangePasswordMutation,
  useGetApiMyAccountNotificationShortListQuery,
  usePutApiMyAccountNotificationSeenByIdMutation,
  useGetApiMyAccountNotificationListQuery,
  useGetApiMyAccountCustomerUserListQuery,
  usePostApiMyAccountCustomerUserChangeCustomerMutation,
  useDeleteApiMyAccountCustomerUserDeleteByUserIdMutation,
  usePostApiMyAccountCustomerUserCreateMutation,
  useGetApiMyAccountCustomerGetQuery,
  usePutApiMyAccountCustomerEditMutation,
  usePutApiMyAccountCustomerConvertToLegalMutation,
  usePostApiMyAccountTwoFactorLoginMutation,
  useGetApiMyAccountSsoUrlQuery,
  usePostApiMyAccountSsoLoginMutation,
  usePostApiMyAccountRegisterMutation,
  usePostApiMyAccountLogoutMutation,
  usePostApiMyAccountLoginMutation,
  usePostApiMyAccountForgotConfirmMutation,
  usePostApiMyAccountForgotMutation,
  useGetApiMyAccountCaptchaQuery,
  useGetApiMyAssetEquipmentTypeListQuery,
  useGetApiMyAssetEquipmentBrandListQuery,
  useGetApiMyAssetEquipmentListByTypeIdAndBrandIdQuery,
  useGetApiMyBareMetalHostListQuery,
  useGetApiMyBareMetalHostGetByIdQuery,
  useDeleteApiMyBareMetalHostDeleteByIdMutation,
  usePostApiMyBareMetalHostCreateMutation,
  useGetApiMyColocationListQuery,
  useGetApiMyColocationGetByIdQuery,
  useDeleteApiMyColocationDeleteByIdMutation,
  usePostApiMyColocationCreateMutation,
  useGetApiMyDashboardUsageByCategoryIdQuery,
  useGetApiMyDashboardFinancialQuery,
  useGetApiMyDatacenterIpListByIdQuery,
  useDeleteApiMyDatacenterIpDeleteByIdMutation,
  useGetApiMyDatacenterImageListQuery,
  useGetApiMyDatacenterListQuery,
  useGetApiMyDnsCdnHostListQuery,
  useGetApiMyDnsCdnHostGetNsByIdQuery,
  useGetApiMyDnsCdnHostGetCdnByIdQuery,
  useGetApiMyDnsCdnHostGetAnalyticByIdAndPeriodIdQuery,
  useGetApiMyDnsCdnHostGetByIdQuery,
  useDeleteApiMyDnsCdnHostDeleteByIdMutation,
  usePostApiMyDnsCdnHostCreateMutation,
  usePostApiMyDnsCdnHostCheckMutation,
  usePutApiMyDnsCdnHostChangeOriginCertTypeMutation,
  usePutApiMyDnsCdnHostChangeNonWwwRedirectMutation,
  usePutApiMyDnsCdnHostChangeHttpsRedirectMutation,
  usePutApiMyDnsCdnHostChangeHstsMutation,
  usePutApiMyDnsCdnHostChangeEdgeCertTypeMutation,
  usePutApiMyDnsCdnHostChangeCdnTypeMutation,
  useGetApiMyDnsCdnDnsRecordListByDnsCdnHostIdQuery,
  useGetApiMyDnsCdnDnsRecordGetByIdQuery,
  usePutApiMyDnsCdnDnsRecordEditByIdMutation,
  useDeleteApiMyDnsCdnDnsRecordDeleteByIdMutation,
  usePostApiMyDnsCdnDnsRecordCreateMutation,
  usePutApiMyDnsCdnDnsRecordChangeProxyByIdMutation,
  useGetApiMyDnsCdnRouteListByDnsCdnHostIdQuery,
  useGetApiMyDnsCdnRouteGetByIdQuery,
  usePutApiMyDnsCdnRouteEditByIdMutation,
  useDeleteApiMyDnsCdnRouteDeleteByIdMutation,
  useGetApiMyDnsCdnOriginCertGetUserCertByDnsCdnHostIdQuery,
  useGetApiMyDnsCdnOriginCertGetByDnsCdnHostIdQuery,
  usePostApiMyDnsCdnOriginCertCreateUserCertMutation,
  useGetApiMyDnsCdnEdgeCertGetUserCertByDnsCdnHostIdQuery,
  useGetApiMyDnsCdnEdgeCertGetByDnsCdnHostIdQuery,
  usePostApiMyDnsCdnEdgeCertCreateUserCertMutation,
  usePostApiMyDnsCdnEdgeCertCreateMutation,
  usePostApiMyDomainHostResendVerificationByIdMutation,
  useGetApiMyDomainHostListQuery,
  useGetApiMyDomainHostGetStatusByIdQuery,
  useGetApiMyDomainHostGetByIdQuery,
  useDeleteApiMyDomainHostDeleteByIdMutation,
  usePostApiMyDomainHostRegisterMutation,
  usePostApiMyDomainHostCheckDomainMutation,
  usePutApiMyDomainHostChangeNsMutation,
  usePutApiMyDomainHostChangeContactMutation,
  useGetApiMyHomeIndexQuery,
  useGetApiMyHostHypervisorListQuery,
  useGetApiMyHostProjectListQuery,
  useGetApiMyHostProjectGetByIdQuery,
  usePutApiMyHostProjectEditByIdMutation,
  useDeleteApiMyHostProjectDeleteByIdMutation,
  usePostApiMyHostProjectCreateMutation,
  useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery,
  useGetApiMyKubernetesCloudSecretGetByIdQuery,
  usePutApiMyKubernetesCloudSecretEditMutation,
  useDeleteApiMyKubernetesCloudSecretDeleteByIdMutation,
  usePostApiMyKubernetesCloudSecretCreateMutation,
  useGetApiMyKubernetesCloudHostPortListByNamespaceIdQuery,
  usePutApiMyKubernetesCloudIngressRuleEditMutation,
  useDeleteApiMyKubernetesCloudIngressRuleDeleteMutation,
  usePostApiMyKubernetesCloudIngressRuleCreateMutation,
  useGetApiMyKubernetesCloudIngressListByNamespaceIdQuery,
  useGetApiMyKubernetesCloudIngressGetByIdQuery,
  useDeleteApiMyKubernetesCloudIngressDeleteByIngressIdMutation,
  usePostApiMyKubernetesCloudIngressCreateMutation,
  useGetApiMyKubernetesCloudCategoryListQuery,
  useGetApiMyKubernetesCloudImageListQuery,
  useGetApiMyKubernetesCloudHostListQuery,
  useGetApiMyKubernetesCloudHostGetByIdQuery,
  usePutApiMyKubernetesCloudHostEditByIdMutation,
  useDeleteApiMyKubernetesCloudHostDeleteByIdMutation,
  usePostApiMyKubernetesCloudHostCreateMutation,
  useGetApiMyKubernetesCloudFirewallListByNamespaceIdQuery,
  useDeleteApiMyKubernetesCloudFirewallDeleteByIdMutation,
  usePostApiMyKubernetesCloudFirewallCreateMutation,
  useGetApiMyKubernetesCloudDeploymentEnvListByDeploymentIdQuery,
  useGetApiMyKubernetesCloudDeploymentEnvGetByIdQuery,
  useGetApiMyKubernetesCloudDeploymentListByNamespaceIdQuery,
  useGetApiMyKubernetesCloudDeploymentGetByIdQuery,
  usePutApiMyKubernetesCloudDeploymentEditMutation,
  useDeleteApiMyKubernetesCloudDeploymentDeleteByIdMutation,
  usePostApiMyKubernetesCloudDeploymentCreateMutation,
  useGetApiMyKubernetesCloudConfigmapListByNamespaceIdQuery,
  useGetApiMyKubernetesCloudConfigmapGetByIdQuery,
  usePutApiMyKubernetesCloudConfigmapEditMutation,
  useDeleteApiMyKubernetesCloudConfigmapDeleteByIdMutation,
  usePostApiMyKubernetesCloudConfigmapCreateMutation,
  useGetApiMyKubernetesClusterVersionListQuery,
  useGetApiMyKubernetesClusterNodeByKubernetesHostIdQuery,
  useDeleteApiMyKubernetesClusterNodeDeleteByIdMutation,
  usePostApiMyKubernetesClusterNodeCreateMutation,
  useGetApiMyKubernetesClusterHostListQuery,
  useGetApiMyKubernetesClusterHostGetByIdQuery,
  useDeleteApiMyKubernetesClusterHostDeleteByIdMutation,
  usePostApiMyKubernetesClusterHostCreateMutation,
  useGetApiMyObjectStorageStorageUserListByStorageHostIdQuery,
  useDeleteApiMyObjectStorageStorageUserDeleteByIdMutation,
  usePostApiMyObjectStorageStorageUserCreateMutation,
  useGetApiMyObjectStorageHostListQuery,
  useGetApiMyObjectStorageHostGetByIdQuery,
  usePutApiMyObjectStorageHostEditByIdMutation,
  useDeleteApiMyObjectStorageHostDeleteByIdMutation,
  usePostApiMyObjectStorageHostCreateMutation,
  useGetApiMyPortalWalletTransactionListQuery,
  useGetApiMyPortalWalletTransactionUsageReportByPeriodQuery,
  useGetApiMyPortalWalletTransactionDownloadQuery,
  useGetApiMyPortalWalletGetBalanceQuery,
  usePostApiMyPortalVoucherUseMutation,
  useGetApiMyPortalReferralListByReferralIdQuery,
  useGetApiMyPortalReferralGetQuery,
  useGetApiMyPortalPromotionRedirectLinkByCodeQuery,
  useGetApiMyPortalProductItemListByProductIdQuery,
  useGetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountQuery,
  useGetApiMyPortalProductBundleWebListQuery,
  useGetApiMyPortalProductBundleVpcListQuery,
  useGetApiMyPortalProductBundleVmListQuery,
  useGetApiMyPortalProductBundleStorageListQuery,
  useGetApiMyPortalProductBundleKuberClusterListQuery,
  useGetApiMyPortalProductBundleKuberCloudListQuery,
  useGetApiMyPortalProductBundleBareMetalListQuery,
  useGetApiMyPortalProductListQuery,
  useGetApiMyPortalProductGetByIdQuery,
  useGetApiMyPortalPaymentProviderListQuery,
  usePostApiMyPortalPaymentSepCallBackMutation,
  usePostApiMyPortalPaymentPecCallBackMutation,
  useGetApiMyPortalPaymentListQuery,
  useGetApiMyPortalPaymentGetByIdQuery,
  useGetApiMyPortalPaymentDownloadQuery,
  usePostApiMyPortalPaymentCreateMutation,
  usePostApiMyPortalPaymentBpmCallBackMutation,
  usePostApiMyPortalOfferPayMutation,
  useGetApiMyPortalOfferListQuery,
  useGetApiMyPortalOfferGetByIdQuery,
  usePostApiMyPortalIssueSubjectSelectListMutation,
  useGetApiMyPortalIssueSubjectListQuery,
  useGetApiMyPortalIssueItemListByIssueIdQuery,
  useGetApiMyPortalIssueItemDownloadByIdQuery,
  usePostApiMyPortalIssueItemCreateMutation,
  useGetApiMyPortalIssueShortListQuery,
  useGetApiMyPortalIssueListQuery,
  usePostApiMyPortalIssueCreateMutation,
  useGetApiMyPortalInvoiceUnpaidQuery,
  useGetApiMyPortalInvoiceSummaryQuery,
  usePostApiMyPortalInvoicePayMutation,
  useGetApiMyPortalInvoiceListQuery,
  useGetApiMyPortalInvoiceGetByIdQuery,
  useGetApiMyPortalInvoiceDownloadQuery,
  useGetApiMyPortalCustomerProductShortListQuery,
  useGetApiMyPortalCustomerProductListByProductIdQuery,
  useGetApiMyPortalCustomerBillShortListQuery,
  useGetApiMyPortalCustomerBillListQuery,
  useGetApiMyPortalCustomerBillGetByIdQuery,
  useGetApiMyPortalCustomerBillDownloadByIdQuery,
  useGetApiMyPortalCommissionListQuery,
  useGetApiMyPortalCalculateMonthListQuery,
  useGetApiMyPortalBusinessUnitListQuery,
  usePutApiMyVmSnapshotRevertByIdMutation,
  useGetApiMyVmSnapshotListByVmHostIdQuery,
  useGetApiMyVmSnapshotGetByIdQuery,
  useDeleteApiMyVmSnapshotDeleteAllByVmHostIdMutation,
  useDeleteApiMyVmSnapshotDeleteByIdMutation,
  usePostApiMyVmSnapshotCreateMutation,
  usePutApiMyVmIsoUnmountByIdMutation,
  usePutApiMyVmIsoMountByIdMutation,
  useGetApiMyVmIsoListByDatacenterIdQuery,
  usePutApiMyVmHostStopByIdMutation,
  usePutApiMyVmHostStartByIdMutation,
  usePutApiMyVmHostShutdownByIdMutation,
  useGetApiMyVmHostShortListByHypervisorTypeIdQuery,
  usePutApiMyVmHostResetByIdMutation,
  useGetApiMyVmKmsGetByIdQuery,
  usePutApiMyVmHostRebuildByIdMutation,
  usePutApiMyVmHostRebootByIdMutation,
  useGetApiMyVmHostListByVmProjectIdQuery,
  useGetApiMyVmHostGetAnalyticByIdAndPeriodIdQuery,
  useGetApiMyVmHostGetByIdQuery,
  usePutApiMyVmHostEditByIdMutation,
  usePutApiMyVmHostDisconnectByIdMutation,
  useDeleteApiMyVmHostDeleteByIdMutation,
  usePostApiMyVmHostCreateMutation,
  usePutApiMyVmHostConnectByIdMutation,
  useGetApiMyVpcTranslateListQuery,
  useDeleteApiMyVpcTranslateDeleteByIdMutation,
  usePostApiMyVpcTranslateCreateMutation,
  useGetApiMyVpcPrivateNetworkRequestListQuery,
  usePostApiMyVpcPrivateNetworkRequestCreateMutation,
  useGetApiMyVpcPrivateNetworkListQuery,
  useGetApiMyVpcPrivateNetworkGetByIdQuery,
  useGetApiMyVpcNetworkShortListByVpcHostIdQuery,
  useGetApiMyVpcNetworkListByVpcHostIdQuery,
  usePutApiMyVpcNetworkEditByIdMutation,
  useDeleteApiMyVpcNetworkDeleteByIdMutation,
  usePostApiMyVpcNetworkCreateMutation,
  usePutApiMyVpcNatIncreaseSequenceByVpcHostIdAndIdMutation,
  usePutApiMyVpcNatDecreaseSequenceByVpcHostIdAndIdMutation,
  useGetApiMyVpcNatListByVpcHostIdQuery,
  useGetApiMyVpcNatGetByIdQuery,
  useDeleteApiMyVpcNatDeleteByIdMutation,
  usePostApiMyVpcNatCreateSnatMutation,
  usePostApiMyVpcNatCreateDnatMutation,
  useGetApiMyVpcLoadBalanceListByVpcHostIdQuery,
  useDeleteApiMyVpcLoadBalanceDeleteByIdMutation,
  usePostApiMyVpcLoadBalanceCreateMutation,
  useGetApiMyVpcIpListByVpcHostIdQuery,
  useDeleteApiMyVpcIpDeleteByIdMutation,
  usePostApiMyVpcIpCreateMutation,
  useGetApiMyVpcHostShortListQuery,
  useGetApiMyVpcHostListQuery,
  useGetApiMyVpcHostGetByIdQuery,
  usePutApiMyVpcHostEditByIdMutation,
  useDeleteApiMyVpcHostDeleteByIdMutation,
  usePostApiMyVpcHostCreateMutation,
  useGetApiMyWebHostListQuery,
  useGetApiMyWebHostGetLoginSessionByIdQuery,
  useGetApiMyWebHostGetByIdQuery,
  usePutApiMyWebHostEditByIdMutation,
  useDeleteApiMyWebHostDeleteByIdMutation,
  usePostApiMyWebHostCreateMutation,
  usePostApiMyWebHostCheckDomainMutation,
  usePutApiMyPortalNewsUnsubscribeByEmailMutation,
  usePostApiMyPortalNewsCreateMutation,
  usePostApiMyPortalContactUsCreateMutation,
  useGetApiMyPortalWebsiteBlogCommentGetByIdQuery,
  usePostApiMyPortalWebsiteBlogCommentCreateMutation,
  useGetApiMyPortalWebsiteBlogListQuery,
  useGetApiMyPortalWebsiteBlogGetRandomArticlesByLinkQuery,
  useGetApiMyPortalWebsiteBlogGetHeaderArticlesQuery,
  useGetApiMyPortalWebsiteBlogGetByLinkQuery,
  useGetApiMyPortalWebsiteAlarmListQuery,
} = api;

