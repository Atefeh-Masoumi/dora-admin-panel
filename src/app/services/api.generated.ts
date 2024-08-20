import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "src/app/services/baseQuery";
export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: (build) => ({
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
    postApiMyAccountLogout: build.mutation<
      PostApiMyAccountLogoutApiResponse,
      PostApiMyAccountLogoutApiArg
    >({
      query: () => ({ url: `/api/my/account/logout`, method: "POST" }),
    }),
    getApiMyAccountCaptcha: build.query<
      GetApiMyAccountCaptchaApiResponse,
      GetApiMyAccountCaptchaApiArg
    >({
      query: () => ({ url: `/api/my/account/captcha` }),
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
    deleteApiMyBareMetalHostDeleteById: build.mutation<
      DeleteApiMyBareMetalHostDeleteByIdApiResponse,
      DeleteApiMyBareMetalHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/bare-metal/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyPortalBusinessUnitList: build.query<
      GetApiMyPortalBusinessUnitListApiResponse,
      GetApiMyPortalBusinessUnitListApiArg
    >({
      query: () => ({ url: `/api/my/portal/business-unit/list` }),
    }),
    getApiMyPortalCalculateMonthList: build.query<
      GetApiMyPortalCalculateMonthListApiResponse,
      GetApiMyPortalCalculateMonthListApiArg
    >({
      query: () => ({ url: `/api/my/portal/calculate-month/list` }),
    }),
    getApiMyDnsCdnEdgeCertGetByDnsCdnHostId: build.query<
      GetApiMyDnsCdnEdgeCertGetByDnsCdnHostIdApiResponse,
      GetApiMyDnsCdnEdgeCertGetByDnsCdnHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/edge-cert/get/${queryArg.dnsCdnHostId}`,
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
    getApiMyDnsCdnOriginCertGetByDnsCdnHostId: build.query<
      GetApiMyDnsCdnOriginCertGetByDnsCdnHostIdApiResponse,
      GetApiMyDnsCdnOriginCertGetByDnsCdnHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/origin-cert/get/${queryArg.dnsCdnHostId}`,
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
    putApiMyDnsCdnRouteEdit: build.mutation<
      PutApiMyDnsCdnRouteEditApiResponse,
      PutApiMyDnsCdnRouteEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/route/edit`,
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
    getApiMyColocationHostList: build.query<
      GetApiMyColocationHostListApiResponse,
      GetApiMyColocationHostListApiArg
    >({
      query: () => ({ url: `/api/my/colocation/host/list` }),
    }),
    getApiMyColocationHostGetById: build.query<
      GetApiMyColocationHostGetByIdApiResponse,
      GetApiMyColocationHostGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/colocation/host/get/${queryArg.id}`,
      }),
    }),
    postApiMyColocationHostCreate: build.mutation<
      PostApiMyColocationHostCreateApiResponse,
      PostApiMyColocationHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/colocation/host/create`,
        method: "POST",
        body: queryArg.createColocationModel,
      }),
    }),
    deleteApiMyColocationHostDeleteById: build.mutation<
      DeleteApiMyColocationHostDeleteByIdApiResponse,
      DeleteApiMyColocationHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/colocation/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyPortalCommissionList: build.query<
      GetApiMyPortalCommissionListApiResponse,
      GetApiMyPortalCommissionListApiArg
    >({
      query: () => ({ url: `/api/my/portal/commission/list` }),
    }),
    getApiMyPortalCustomerGet: build.query<
      GetApiMyPortalCustomerGetApiResponse,
      GetApiMyPortalCustomerGetApiArg
    >({
      query: () => ({ url: `/api/my/portal/customer/get` }),
    }),
    putApiMyPortalCustomerEdit: build.mutation<
      PutApiMyPortalCustomerEditApiResponse,
      PutApiMyPortalCustomerEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/customer/edit`,
        method: "PUT",
        body: queryArg.editCustomerModel,
      }),
    }),
    putApiMyPortalCustomerConvertToLegal: build.mutation<
      PutApiMyPortalCustomerConvertToLegalApiResponse,
      PutApiMyPortalCustomerConvertToLegalApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/customer/convert-to-legal`,
        method: "PUT",
        body: queryArg.convertCustomerToLegalModel,
      }),
    }),
    getApiMyPortalCustomerBillList: build.query<
      GetApiMyPortalCustomerBillListApiResponse,
      GetApiMyPortalCustomerBillListApiArg
    >({
      query: () => ({ url: `/api/my/portal/customer-bill/list` }),
    }),
    getApiMyPortalCustomerBillShortList: build.query<
      GetApiMyPortalCustomerBillShortListApiResponse,
      GetApiMyPortalCustomerBillShortListApiArg
    >({
      query: () => ({ url: `/api/my/portal/customer-bill/short-list` }),
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
    getApiMyPortalCustomerProductListByProductId: build.query<
      GetApiMyPortalCustomerProductListByProductIdApiResponse,
      GetApiMyPortalCustomerProductListByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/customer-product/list/${queryArg.productId}`,
      }),
    }),
    getApiMyPortalCustomerProductShortList: build.query<
      GetApiMyPortalCustomerProductShortListApiResponse,
      GetApiMyPortalCustomerProductShortListApiArg
    >({
      query: () => ({ url: `/api/my/portal/customer-product/short-list` }),
    }),
    getApiMyPortalCustomerUserList: build.query<
      GetApiMyPortalCustomerUserListApiResponse,
      GetApiMyPortalCustomerUserListApiArg
    >({
      query: () => ({ url: `/api/my/portal/customer-user/list` }),
    }),
    postApiMyPortalCustomerUserCreate: build.mutation<
      PostApiMyPortalCustomerUserCreateApiResponse,
      PostApiMyPortalCustomerUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/customer-user/create`,
        method: "POST",
        body: queryArg.createCustomerUserModel,
      }),
    }),
    deleteApiMyPortalCustomerUserDeleteByUserId: build.mutation<
      DeleteApiMyPortalCustomerUserDeleteByUserIdApiResponse,
      DeleteApiMyPortalCustomerUserDeleteByUserIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/customer-user/delete/${queryArg.userId}`,
        method: "DELETE",
      }),
    }),
    postApiMyPortalCustomerUserChange: build.mutation<
      PostApiMyPortalCustomerUserChangeApiResponse,
      PostApiMyPortalCustomerUserChangeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/customer-user/change`,
        method: "POST",
        body: queryArg.changeCustomerUserModel,
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
    getApiMyDatacenterList: build.query<
      GetApiMyDatacenterListApiResponse,
      GetApiMyDatacenterListApiArg
    >({
      query: () => ({ url: `/api/my/datacenter/list` }),
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
    getApiMyDnsCdnHostList: build.query<
      GetApiMyDnsCdnHostListApiResponse,
      GetApiMyDnsCdnHostListApiArg
    >({
      query: () => ({ url: `/api/my/dns-cdn/host/list` }),
    }),
    getApiMyDnsCdnHostGetById: build.query<
      GetApiMyDnsCdnHostGetByIdApiResponse,
      GetApiMyDnsCdnHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/dns-cdn/host/get/${queryArg.id}` }),
    }),
    getApiMyDnsCdnHostGetCdnById: build.query<
      GetApiMyDnsCdnHostGetCdnByIdApiResponse,
      GetApiMyDnsCdnHostGetCdnByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/get-cdn/${queryArg.id}`,
      }),
    }),
    getApiMyDnsCdnHostGetCdnAnalyticByIdAndPeriodId: build.query<
      GetApiMyDnsCdnHostGetCdnAnalyticByIdAndPeriodIdApiResponse,
      GetApiMyDnsCdnHostGetCdnAnalyticByIdAndPeriodIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/get-cdn-analytic/${queryArg.id}/${queryArg.periodId}`,
      }),
    }),
    getApiMyDnsCdnHostGetNsById: build.query<
      GetApiMyDnsCdnHostGetNsByIdApiResponse,
      GetApiMyDnsCdnHostGetNsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/get-ns/${queryArg.id}`,
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
    deleteApiMyDnsCdnHostDeleteById: build.mutation<
      DeleteApiMyDnsCdnHostDeleteByIdApiResponse,
      DeleteApiMyDnsCdnHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/host/delete/${queryArg.id}`,
        method: "DELETE",
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
    putApiMyDnsCdnDnsRecordEdit: build.mutation<
      PutApiMyDnsCdnDnsRecordEditApiResponse,
      PutApiMyDnsCdnDnsRecordEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/dns-record/edit`,
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
    putApiMyDnsCdnDnsRecordChangeProxyStatusById: build.mutation<
      PutApiMyDnsCdnDnsRecordChangeProxyStatusByIdApiResponse,
      PutApiMyDnsCdnDnsRecordChangeProxyStatusByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/dns-record/change-proxy-status/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiMyDomainHostList: build.query<
      GetApiMyDomainHostListApiResponse,
      GetApiMyDomainHostListApiArg
    >({
      query: () => ({ url: `/api/my/domain/host/list` }),
    }),
    getApiMyDomainHostGetById: build.query<
      GetApiMyDomainHostGetByIdApiResponse,
      GetApiMyDomainHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/domain/host/get/${queryArg.id}` }),
    }),
    postApiMyDomainHostGetStatusById: build.mutation<
      PostApiMyDomainHostGetStatusByIdApiResponse,
      PostApiMyDomainHostGetStatusByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/host/get-status/${queryArg.id}`,
        method: "POST",
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
    deleteApiMyDomainHostDeleteById: build.mutation<
      DeleteApiMyDomainHostDeleteByIdApiResponse,
      DeleteApiMyDomainHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/host/delete/${queryArg.id}`,
        method: "DELETE",
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
    postApiMyDomainHostResendVerificationById: build.mutation<
      PostApiMyDomainHostResendVerificationByIdApiResponse,
      PostApiMyDomainHostResendVerificationByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/host/resend-verification/${queryArg.id}`,
        method: "POST",
      }),
    }),
    getApiMyColocationEquipmentListByTypeIdAndBrandId: build.query<
      GetApiMyColocationEquipmentListByTypeIdAndBrandIdApiResponse,
      GetApiMyColocationEquipmentListByTypeIdAndBrandIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/colocation/equipment/list/${queryArg.typeId}/${queryArg.brandId}`,
      }),
    }),
    getApiMyColocationEquipmentBrandList: build.query<
      GetApiMyColocationEquipmentBrandListApiResponse,
      GetApiMyColocationEquipmentBrandListApiArg
    >({
      query: () => ({ url: `/api/my/colocation/equipment/brand-list` }),
    }),
    getApiMyColocationEquipmentTypeList: build.query<
      GetApiMyColocationEquipmentTypeListApiResponse,
      GetApiMyColocationEquipmentTypeListApiArg
    >({
      query: () => ({ url: `/api/my/colocation/equipment/type-list` }),
    }),
    getApiMyHomeIndex: build.query<
      GetApiMyHomeIndexApiResponse,
      GetApiMyHomeIndexApiArg
    >({
      query: () => ({ url: `/api/my/home/index` }),
    }),
    getApiMyVmProjectList: build.query<
      GetApiMyVmProjectListApiResponse,
      GetApiMyVmProjectListApiArg
    >({
      query: () => ({ url: `/api/my/vm/project/list` }),
    }),
    getApiMyVmProjectGetById: build.query<
      GetApiMyVmProjectGetByIdApiResponse,
      GetApiMyVmProjectGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/vm/project/get/${queryArg.id}` }),
    }),
    postApiMyVmProjectCreate: build.mutation<
      PostApiMyVmProjectCreateApiResponse,
      PostApiMyVmProjectCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/project/create`,
        method: "POST",
        body: queryArg.vmProjectCreateModel,
      }),
    }),
    putApiMyVmProjectEditById: build.mutation<
      PutApiMyVmProjectEditByIdApiResponse,
      PutApiMyVmProjectEditByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/project/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.vmProjectEditModel,
      }),
    }),
    deleteApiMyVmProjectDeleteById: build.mutation<
      DeleteApiMyVmProjectDeleteByIdApiResponse,
      DeleteApiMyVmProjectDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/project/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyVmHypervisorList: build.query<
      GetApiMyVmHypervisorListApiResponse,
      GetApiMyVmHypervisorListApiArg
    >({
      query: () => ({ url: `/api/my/vm/hypervisor/list` }),
    }),
    getApiMyPortalInvoiceList: build.query<
      GetApiMyPortalInvoiceListApiResponse,
      GetApiMyPortalInvoiceListApiArg
    >({
      query: () => ({ url: `/api/my/portal/invoice/list` }),
    }),
    getApiMyPortalInvoiceUnpaid: build.query<
      GetApiMyPortalInvoiceUnpaidApiResponse,
      GetApiMyPortalInvoiceUnpaidApiArg
    >({
      query: () => ({ url: `/api/my/portal/invoice/unpaid` }),
    }),
    getApiMyPortalInvoiceGetById: build.query<
      GetApiMyPortalInvoiceGetByIdApiResponse,
      GetApiMyPortalInvoiceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/invoice/get/${queryArg.id}`,
      }),
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
    getApiMyPortalInvoiceSummary: build.query<
      GetApiMyPortalInvoiceSummaryApiResponse,
      GetApiMyPortalInvoiceSummaryApiArg
    >({
      query: () => ({ url: `/api/my/portal/invoice/summary` }),
    }),
    getApiMyPortalIssueList: build.query<
      GetApiMyPortalIssueListApiResponse,
      GetApiMyPortalIssueListApiArg
    >({
      query: () => ({ url: `/api/my/portal/issue/list` }),
    }),
    getApiMyPortalIssueShortList: build.query<
      GetApiMyPortalIssueShortListApiResponse,
      GetApiMyPortalIssueShortListApiArg
    >({
      query: () => ({ url: `/api/my/portal/issue/short-list` }),
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
    getApiMyPortalIssueItemListByIssueId: build.query<
      GetApiMyPortalIssueItemListByIssueIdApiResponse,
      GetApiMyPortalIssueItemListByIssueIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/issue-item/list/${queryArg.issueId}`,
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
    getApiMyPortalIssueItemDownloadById: build.query<
      GetApiMyPortalIssueItemDownloadByIdApiResponse,
      GetApiMyPortalIssueItemDownloadByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/issue-item/download/${queryArg.id}`,
      }),
    }),
    getApiMyPortalIssueSubjectList: build.query<
      GetApiMyPortalIssueSubjectListApiResponse,
      GetApiMyPortalIssueSubjectListApiArg
    >({
      query: () => ({ url: `/api/my/portal/issue-subject/list` }),
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
    getApiMyKubernetesCloudConfigmapListById: build.query<
      GetApiMyKubernetesCloudConfigmapListByIdApiResponse,
      GetApiMyKubernetesCloudConfigmapListByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/configmap/list/${queryArg.id}`,
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
    deleteApiMyKubernetesCloudConfigmapDeleteById: build.mutation<
      DeleteApiMyKubernetesCloudConfigmapDeleteByIdApiResponse,
      DeleteApiMyKubernetesCloudConfigmapDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/configmap/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyKubernetesCloudDeploymentList: build.query<
      GetApiMyKubernetesCloudDeploymentListApiResponse,
      GetApiMyKubernetesCloudDeploymentListApiArg
    >({
      query: () => ({ url: `/api/my/kubernetes/cloud/deployment/list` }),
    }),
    getApiMyKubernetesCloudDeploymentGetById: build.query<
      GetApiMyKubernetesCloudDeploymentGetByIdApiResponse,
      GetApiMyKubernetesCloudDeploymentGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/deployment/get/${queryArg.id}`,
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
    deleteApiMyKubernetesCloudDeploymentDeleteById: build.mutation<
      DeleteApiMyKubernetesCloudDeploymentDeleteByIdApiResponse,
      DeleteApiMyKubernetesCloudDeploymentDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/deployment/delete/${queryArg.id}`,
        method: "DELETE",
      }),
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
    putApiMyKubernetesCloudHostEdit: build.mutation<
      PutApiMyKubernetesCloudHostEditApiResponse,
      PutApiMyKubernetesCloudHostEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/host/edit`,
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
    getApiMyKubernetesCloudImageList: build.query<
      GetApiMyKubernetesCloudImageListApiResponse,
      GetApiMyKubernetesCloudImageListApiArg
    >({
      query: () => ({ url: `/api/my/kubernetes/cloud/image/list` }),
    }),
    getApiMyKubernetesCloudCategoryList: build.query<
      GetApiMyKubernetesCloudCategoryListApiResponse,
      GetApiMyKubernetesCloudCategoryListApiArg
    >({
      query: () => ({ url: `/api/my/kubernetes/cloud/category/list` }),
    }),
    getApiMyKubernetesCloudImageKeyGetById: build.query<
      GetApiMyKubernetesCloudImageKeyGetByIdApiResponse,
      GetApiMyKubernetesCloudImageKeyGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/image/key/get/${queryArg.id}`,
      }),
    }),
    getApiMyKubernetesCloudImageTagListById: build.query<
      GetApiMyKubernetesCloudImageTagListByIdApiResponse,
      GetApiMyKubernetesCloudImageTagListByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/image/tag/list/${queryArg.id}`,
      }),
    }),
    getApiMyKubernetesCloudIngressList: build.query<
      GetApiMyKubernetesCloudIngressListApiResponse,
      GetApiMyKubernetesCloudIngressListApiArg
    >({
      query: () => ({ url: `/api/my/kubernetes/cloud/ingress/list` }),
    }),
    getApiMyKubernetesCloudIngressGetById: build.query<
      GetApiMyKubernetesCloudIngressGetByIdApiResponse,
      GetApiMyKubernetesCloudIngressGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/ingress/get/${queryArg.id}`,
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
    deleteApiMyKubernetesCloudIngressDeleteById: build.mutation<
      DeleteApiMyKubernetesCloudIngressDeleteByIdApiResponse,
      DeleteApiMyKubernetesCloudIngressDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/ingress/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyKubernetesCloudSecretListById: build.query<
      GetApiMyKubernetesCloudSecretListByIdApiResponse,
      GetApiMyKubernetesCloudSecretListByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/secret/list/${queryArg.id}`,
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
    deleteApiMyKubernetesCloudSecretDeleteById: build.mutation<
      DeleteApiMyKubernetesCloudSecretDeleteByIdApiResponse,
      DeleteApiMyKubernetesCloudSecretDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/secret/delete/${queryArg.id}`,
        method: "DELETE",
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
    deleteApiMyKubernetesClusterHostDeleteById: build.mutation<
      DeleteApiMyKubernetesClusterHostDeleteByIdApiResponse,
      DeleteApiMyKubernetesClusterHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cluster/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyKubernetesClusterNodeListByKubernetesHostId: build.query<
      GetApiMyKubernetesClusterNodeListByKubernetesHostIdApiResponse,
      GetApiMyKubernetesClusterNodeListByKubernetesHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cluster/node/list/${queryArg.kubernetesHostId}`,
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
    putApiMyKubernetesClusterNodeDeleteById: build.mutation<
      PutApiMyKubernetesClusterNodeDeleteByIdApiResponse,
      PutApiMyKubernetesClusterNodeDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cluster/node/delete/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiMyKubernetesClusterVersionList: build.query<
      GetApiMyKubernetesClusterVersionListApiResponse,
      GetApiMyKubernetesClusterVersionListApiArg
    >({
      query: () => ({ url: `/api/my/kubernetes/cluster/version/list` }),
    }),
    getApiMyPortalNotificationList: build.query<
      GetApiMyPortalNotificationListApiResponse,
      GetApiMyPortalNotificationListApiArg
    >({
      query: () => ({ url: `/api/my/portal/notification/list` }),
    }),
    getApiMyPortalNotificationShortList: build.query<
      GetApiMyPortalNotificationShortListApiResponse,
      GetApiMyPortalNotificationShortListApiArg
    >({
      query: () => ({ url: `/api/my/portal/notification/short-list` }),
    }),
    putApiMyPortalNotificationSeenById: build.mutation<
      PutApiMyPortalNotificationSeenByIdApiResponse,
      PutApiMyPortalNotificationSeenByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/notification/seen/${queryArg.id}`,
        method: "PUT",
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
    postApiMyPortalOfferPayment: build.mutation<
      PostApiMyPortalOfferPaymentApiResponse,
      PostApiMyPortalOfferPaymentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/offer/payment`,
        method: "POST",
        body: queryArg.paymentModel,
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
    getApiMyPortalPaymentProviderList: build.query<
      GetApiMyPortalPaymentProviderListApiResponse,
      GetApiMyPortalPaymentProviderListApiArg
    >({
      query: () => ({ url: `/api/my/portal/payment-provider/list` }),
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
    getApiMyPortalProductBundleWebList: build.query<
      GetApiMyPortalProductBundleWebListApiResponse,
      GetApiMyPortalProductBundleWebListApiArg
    >({
      query: () => ({ url: `/api/my/portal/product-bundle/web-list` }),
    }),
    getApiMyPortalProductBundleKuberClusterList: build.query<
      GetApiMyPortalProductBundleKuberClusterListApiResponse,
      GetApiMyPortalProductBundleKuberClusterListApiArg
    >({
      query: () => ({
        url: `/api/my/portal/product-bundle/kuber-cluster-list`,
      }),
    }),
    getApiMyPortalProductBundleVpcList: build.query<
      GetApiMyPortalProductBundleVpcListApiResponse,
      GetApiMyPortalProductBundleVpcListApiArg
    >({
      query: () => ({ url: `/api/my/portal/product-bundle/vpc-list` }),
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
    getApiMyPortalProfileGet: build.query<
      GetApiMyPortalProfileGetApiResponse,
      GetApiMyPortalProfileGetApiArg
    >({
      query: () => ({ url: `/api/my/portal/profile/get` }),
    }),
    getApiMyPortalProfileGetNotificationStatus: build.query<
      GetApiMyPortalProfileGetNotificationStatusApiResponse,
      GetApiMyPortalProfileGetNotificationStatusApiArg
    >({
      query: () => ({ url: `/api/my/portal/profile/get-notification-status` }),
    }),
    putApiMyPortalProfileEdit: build.mutation<
      PutApiMyPortalProfileEditApiResponse,
      PutApiMyPortalProfileEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/profile/edit`,
        method: "PUT",
        body: queryArg.editProfileModel,
      }),
    }),
    putApiMyPortalProfileEditEmail: build.mutation<
      PutApiMyPortalProfileEditEmailApiResponse,
      PutApiMyPortalProfileEditEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/profile/edit-email`,
        method: "PUT",
        body: queryArg.editEmailModel,
      }),
    }),
    postApiMyPortalProfileConfirmEmail: build.mutation<
      PostApiMyPortalProfileConfirmEmailApiResponse,
      PostApiMyPortalProfileConfirmEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/profile/confirm-email`,
        method: "POST",
        body: queryArg.confirmEmailModel,
      }),
    }),
    putApiMyPortalProfileEditPhoneNumber: build.mutation<
      PutApiMyPortalProfileEditPhoneNumberApiResponse,
      PutApiMyPortalProfileEditPhoneNumberApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/profile/edit-phone-number`,
        method: "PUT",
        body: queryArg.editPhoneNumberModel,
      }),
    }),
    postApiMyPortalProfileConfirmPhoneNumber: build.mutation<
      PostApiMyPortalProfileConfirmPhoneNumberApiResponse,
      PostApiMyPortalProfileConfirmPhoneNumberApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/profile/confirm-phone-number`,
        method: "POST",
        body: queryArg.confirmPhoneNumberModel,
      }),
    }),
    putApiMyPortalProfileEditEmailNotification: build.mutation<
      PutApiMyPortalProfileEditEmailNotificationApiResponse,
      PutApiMyPortalProfileEditEmailNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/profile/edit-email-notification`,
        method: "PUT",
        body: queryArg.editEmailNotifyModel,
      }),
    }),
    putApiMyPortalProfileEditPhoneNotification: build.mutation<
      PutApiMyPortalProfileEditPhoneNotificationApiResponse,
      PutApiMyPortalProfileEditPhoneNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/profile/edit-phone-notification`,
        method: "PUT",
        body: queryArg.editPhoneNotifyModel,
      }),
    }),
    putApiMyPortalProfileEditTwoFactor: build.mutation<
      PutApiMyPortalProfileEditTwoFactorApiResponse,
      PutApiMyPortalProfileEditTwoFactorApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/profile/edit-two-factor`,
        method: "PUT",
        body: queryArg.twoFactorModel,
      }),
    }),
    postApiMyPortalProfileChangePassword: build.mutation<
      PostApiMyPortalProfileChangePasswordApiResponse,
      PostApiMyPortalProfileChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/profile/change-password`,
        method: "POST",
        body: queryArg.changePasswordModel,
      }),
    }),
    getApiMyPortalPromotionRedirectLinkByCode: build.query<
      GetApiMyPortalPromotionRedirectLinkByCodeApiResponse,
      GetApiMyPortalPromotionRedirectLinkByCodeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/promotion/redirect-link/${queryArg.code}`,
      }),
    }),
    getApiMyPortalReferralGet: build.query<
      GetApiMyPortalReferralGetApiResponse,
      GetApiMyPortalReferralGetApiArg
    >({
      query: () => ({ url: `/api/my/portal/referral/get` }),
    }),
    getApiMyPortalReferralCustomerByReferralIdList: build.query<
      GetApiMyPortalReferralCustomerByReferralIdListApiResponse,
      GetApiMyPortalReferralCustomerByReferralIdListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/referral/customer/${queryArg.referralId}/list`,
      }),
    }),
    getApiMyPortalRoleList: build.query<
      GetApiMyPortalRoleListApiResponse,
      GetApiMyPortalRoleListApiArg
    >({
      query: () => ({ url: `/api/my/portal/role/list` }),
    }),
    getApiMyPortalRoleAccessListByUserId: build.query<
      GetApiMyPortalRoleAccessListByUserIdApiResponse,
      GetApiMyPortalRoleAccessListByUserIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/role-access/list/${queryArg.userId}`,
      }),
    }),
    putApiMyPortalRoleAccessEdit: build.mutation<
      PutApiMyPortalRoleAccessEditApiResponse,
      PutApiMyPortalRoleAccessEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/role-access/edit`,
        method: "PUT",
        body: queryArg.editRoleAccessModel,
      }),
    }),
    getApiMyPortalRoleAccessTypeList: build.query<
      GetApiMyPortalRoleAccessTypeListApiResponse,
      GetApiMyPortalRoleAccessTypeListApiArg
    >({
      query: () => ({ url: `/api/my/portal/role-access-type/list` }),
    }),
    getApiMyStorageHostList: build.query<
      GetApiMyStorageHostListApiResponse,
      GetApiMyStorageHostListApiArg
    >({
      query: () => ({ url: `/api/my/storage/host/list` }),
    }),
    getApiMyStorageHostGetById: build.query<
      GetApiMyStorageHostGetByIdApiResponse,
      GetApiMyStorageHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/storage/host/get/${queryArg.id}` }),
    }),
    postApiMyStorageHostCreate: build.mutation<
      PostApiMyStorageHostCreateApiResponse,
      PostApiMyStorageHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/storage/host/create`,
        method: "POST",
        body: queryArg.createStorageHostModel,
      }),
    }),
    putApiMyStorageHostEdit: build.mutation<
      PutApiMyStorageHostEditApiResponse,
      PutApiMyStorageHostEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/storage/host/edit`,
        method: "PUT",
        body: queryArg.editStorageHostModel,
      }),
    }),
    deleteApiMyStorageHostDeleteById: build.mutation<
      DeleteApiMyStorageHostDeleteByIdApiResponse,
      DeleteApiMyStorageHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/storage/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyStorageUserListByStorageHostId: build.query<
      GetApiMyStorageUserListByStorageHostIdApiResponse,
      GetApiMyStorageUserListByStorageHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/storage/user/list/${queryArg.storageHostId}`,
      }),
    }),
    postApiMyStorageUserCreate: build.mutation<
      PostApiMyStorageUserCreateApiResponse,
      PostApiMyStorageUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/storage/user/create`,
        method: "POST",
        body: queryArg.createStorageUserModel,
      }),
    }),
    deleteApiMyStorageUserDeleteById: build.mutation<
      DeleteApiMyStorageUserDeleteByIdApiResponse,
      DeleteApiMyStorageUserDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/storage/user/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyPortalUserLogList: build.query<
      GetApiMyPortalUserLogListApiResponse,
      GetApiMyPortalUserLogListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/user-log/list`,
        params: {
          Action: queryArg.action,
          Controller: queryArg.controller,
          PageNumber: queryArg.pageNumber,
          PageSize: queryArg.pageSize,
        },
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
    getApiMyVmHostShortListByHypervisorTypeId: build.query<
      GetApiMyVmHostShortListByHypervisorTypeIdApiResponse,
      GetApiMyVmHostShortListByHypervisorTypeIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/short-list/${queryArg.hypervisorTypeId}`,
      }),
    }),
    getApiMyVmHostGetById: build.query<
      GetApiMyVmHostGetByIdApiResponse,
      GetApiMyVmHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/vm/host/get/${queryArg.id}` }),
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
    putApiMyVmHostEdit: build.mutation<
      PutApiMyVmHostEditApiResponse,
      PutApiMyVmHostEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/edit`,
        method: "PUT",
        body: queryArg.editVmModel,
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
    putApiMyVmHostRebuild: build.mutation<
      PutApiMyVmHostRebuildApiResponse,
      PutApiMyVmHostRebuildApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/rebuild`,
        method: "PUT",
        body: queryArg.rebuildVmModel,
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
    putApiMyVmHostDisconnectById: build.mutation<
      PutApiMyVmHostDisconnectByIdApiResponse,
      PutApiMyVmHostDisconnectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/disconnect/${queryArg.id}`,
        method: "PUT",
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
    putApiMyVmHostShutdownById: build.mutation<
      PutApiMyVmHostShutdownByIdApiResponse,
      PutApiMyVmHostShutdownByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/shutdown/${queryArg.id}`,
        method: "PUT",
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
    putApiMyVmHostStartById: build.mutation<
      PutApiMyVmHostStartByIdApiResponse,
      PutApiMyVmHostStartByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/start/${queryArg.id}`,
        method: "PUT",
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
    getApiMyVmIsoListByDatacenterId: build.query<
      GetApiMyVmIsoListByDatacenterIdApiResponse,
      GetApiMyVmIsoListByDatacenterIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/iso/list/${queryArg.datacenterId}`,
      }),
    }),
    putApiMyVmIsoMount: build.mutation<
      PutApiMyVmIsoMountApiResponse,
      PutApiMyVmIsoMountApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/iso/mount`,
        method: "PUT",
        body: queryArg.mountModel,
      }),
    }),
    putApiMyVmIsoUnmount: build.mutation<
      PutApiMyVmIsoUnmountApiResponse,
      PutApiMyVmIsoUnmountApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/iso/unmount`,
        method: "PUT",
        body: queryArg.unmountModel,
      }),
    }),
    getApiMyVmKmsGetByIdAndTypeId: build.query<
      GetApiMyVmKmsGetByIdAndTypeIdApiResponse,
      GetApiMyVmKmsGetByIdAndTypeIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/kms/get/${queryArg.id}/${queryArg.typeId}`,
      }),
    }),
    getApiMyVmSnapshotListByVmId: build.query<
      GetApiMyVmSnapshotListByVmIdApiResponse,
      GetApiMyVmSnapshotListByVmIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/snapshot/list/${queryArg.vmId}`,
      }),
    }),
    getApiMyVmSnapshotGetById: build.query<
      GetApiMyVmSnapshotGetByIdApiResponse,
      GetApiMyVmSnapshotGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/vm/snapshot/get/${queryArg.id}` }),
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
    putApiMyVmSnapshotRevert: build.mutation<
      PutApiMyVmSnapshotRevertApiResponse,
      PutApiMyVmSnapshotRevertApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/snapshot/revert`,
        method: "PUT",
        body: queryArg.revertSnapshotModel,
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
    deleteApiMyVmSnapshotDeleteAllByVmHostId: build.mutation<
      DeleteApiMyVmSnapshotDeleteAllByVmHostIdApiResponse,
      DeleteApiMyVmSnapshotDeleteAllByVmHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/snapshot/delete-all/${queryArg.vmHostId}`,
        method: "DELETE",
      }),
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
    getApiMyVpcHostList: build.query<
      GetApiMyVpcHostListApiResponse,
      GetApiMyVpcHostListApiArg
    >({
      query: () => ({ url: `/api/my/vpc/host/list` }),
    }),
    getApiMyVpcHostShortList: build.query<
      GetApiMyVpcHostShortListApiResponse,
      GetApiMyVpcHostShortListApiArg
    >({
      query: () => ({ url: `/api/my/vpc/host/short-list` }),
    }),
    getApiMyVpcHostGetById: build.query<
      GetApiMyVpcHostGetByIdApiResponse,
      GetApiMyVpcHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/vpc/host/get/${queryArg.id}` }),
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
    getApiMyVpcGatewayGetByVpcHostId: build.query<
      GetApiMyVpcGatewayGetByVpcHostIdApiResponse,
      GetApiMyVpcGatewayGetByVpcHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/gateway/get/${queryArg.vpcHostId}`,
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
    deleteApiMyVpcIpDeleteById: build.mutation<
      DeleteApiMyVpcIpDeleteByIdApiResponse,
      DeleteApiMyVpcIpDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/ip/delete/${queryArg.id}`,
        method: "DELETE",
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
    deleteApiMyVpcNatDeleteById: build.mutation<
      DeleteApiMyVpcNatDeleteByIdApiResponse,
      DeleteApiMyVpcNatDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/nat/delete/${queryArg.id}`,
        method: "DELETE",
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
    deleteApiMyVpcLoadBalanceDeleteById: build.mutation<
      DeleteApiMyVpcLoadBalanceDeleteByIdApiResponse,
      DeleteApiMyVpcLoadBalanceDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/load-balance/delete/${queryArg.id}`,
        method: "DELETE",
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
    getApiMyVpcNetworkShortListByVpcHostId: build.query<
      GetApiMyVpcNetworkShortListByVpcHostIdApiResponse,
      GetApiMyVpcNetworkShortListByVpcHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/network/short-list/${queryArg.vpcHostId}`,
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
    postApiMyVpcNetworkEditVmNetwork: build.mutation<
      PostApiMyVpcNetworkEditVmNetworkApiResponse,
      PostApiMyVpcNetworkEditVmNetworkApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/network/edit-vm-network`,
        method: "POST",
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
    getApiMyVpcStaticRouteListByVpcHostId: build.query<
      GetApiMyVpcStaticRouteListByVpcHostIdApiResponse,
      GetApiMyVpcStaticRouteListByVpcHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/static-route/list/${queryArg.vpcHostId}`,
      }),
    }),
    getApiMyVpcStaticRouteGetById: build.query<
      GetApiMyVpcStaticRouteGetByIdApiResponse,
      GetApiMyVpcStaticRouteGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/static-route/get/${queryArg.id}`,
      }),
    }),
    postApiMyVpcStaticRouteCreate: build.mutation<
      PostApiMyVpcStaticRouteCreateApiResponse,
      PostApiMyVpcStaticRouteCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/static-route/create`,
        method: "POST",
        body: queryArg.createVpcStaticRouteModel,
      }),
    }),
    putApiMyVpcStaticRouteEdit: build.mutation<
      PutApiMyVpcStaticRouteEditApiResponse,
      PutApiMyVpcStaticRouteEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/static-route/edit`,
        method: "PUT",
        body: queryArg.editVpcStaticRouteModel,
      }),
    }),
    postApiMyVpcStaticRouteDeleteById: build.mutation<
      PostApiMyVpcStaticRouteDeleteByIdApiResponse,
      PostApiMyVpcStaticRouteDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/static-route/delete/${queryArg.id}`,
        method: "POST",
      }),
    }),
    getApiMyVpcTranslateList: build.query<
      GetApiMyVpcTranslateListApiResponse,
      GetApiMyVpcTranslateListApiArg
    >({
      query: () => ({ url: `/api/my/vpc/translate/list` }),
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
    deleteApiMyVpcTranslateDeleteById: build.mutation<
      DeleteApiMyVpcTranslateDeleteByIdApiResponse,
      DeleteApiMyVpcTranslateDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/translate/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyPortalWalletGetBalance: build.query<
      GetApiMyPortalWalletGetBalanceApiResponse,
      GetApiMyPortalWalletGetBalanceApiArg
    >({
      query: () => ({ url: `/api/my/portal/wallet/get-balance` }),
    }),
    getApiMyPortalWalletTransactionList: build.query<
      GetApiMyPortalWalletTransactionListApiResponse,
      GetApiMyPortalWalletTransactionListApiArg
    >({
      query: () => ({ url: `/api/my/portal/wallet-transaction/list` }),
    }),
    getApiMyPortalWalletTransactionBalanceUsage: build.query<
      GetApiMyPortalWalletTransactionBalanceUsageApiResponse,
      GetApiMyPortalWalletTransactionBalanceUsageApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/wallet-transaction/balance-usage`,
        params: { period: queryArg.period },
      }),
    }),
    getApiMyWebHostList: build.query<
      GetApiMyWebHostListApiResponse,
      GetApiMyWebHostListApiArg
    >({
      query: () => ({ url: `/api/my/web/host/list` }),
    }),
    getApiMyWebHostGetById: build.query<
      GetApiMyWebHostGetByIdApiResponse,
      GetApiMyWebHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/web/host/get/${queryArg.id}` }),
    }),
    getApiMyWebHostGetLoginSessionById: build.query<
      GetApiMyWebHostGetLoginSessionByIdApiResponse,
      GetApiMyWebHostGetLoginSessionByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/web/host/get-login-session/${queryArg.id}`,
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
    putApiMyWebHostEdit: build.mutation<
      PutApiMyWebHostEditApiResponse,
      PutApiMyWebHostEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/web/host/edit`,
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
    getApiMyPortalWebsiteAlarmList: build.query<
      GetApiMyPortalWebsiteAlarmListApiResponse,
      GetApiMyPortalWebsiteAlarmListApiArg
    >({
      query: () => ({ url: `/api/my/portal/website-alarm/list` }),
    }),
    getApiMyPortalWebsiteBlogList: build.query<
      GetApiMyPortalWebsiteBlogListApiResponse,
      GetApiMyPortalWebsiteBlogListApiArg
    >({
      query: () => ({ url: `/api/my/portal/website-blog/list` }),
    }),
    getApiMyPortalWebsiteBlogGetByLink: build.query<
      GetApiMyPortalWebsiteBlogGetByLinkApiResponse,
      GetApiMyPortalWebsiteBlogGetByLinkApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/website-blog/get/${queryArg.link}`,
      }),
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
    postApiMyDomainWhoisGet: build.mutation<
      PostApiMyDomainWhoisGetApiResponse,
      PostApiMyDomainWhoisGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/whois/get`,
        method: "POST",
        body: queryArg.getDomainWhoisModel,
      }),
    }),
  }),
});
export type PostApiMyAccountLoginApiResponse =
  /** status 200 OK */ LoginResponse;
export type PostApiMyAccountLoginApiArg = {
  loginModel: LoginModel;
};
export type GetApiMyAccountSsoUrlApiResponse =
  /** status 200 OK */ SsoLoginResponse;
export type GetApiMyAccountSsoUrlApiArg = void;
export type PostApiMyAccountSsoLoginApiResponse =
  /** status 200 OK */ LoginResponse;
export type PostApiMyAccountSsoLoginApiArg = {
  ssoLoginModel: SsoLoginModel;
};
export type PostApiMyAccountTwoFactorLoginApiResponse =
  /** status 200 OK */ LoginResponse;
export type PostApiMyAccountTwoFactorLoginApiArg = {
  twoFactorLoginModel: TwoFactorLoginModel;
};
export type PostApiMyAccountRegisterApiResponse =
  /** status 200 OK */ LoginResponse;
export type PostApiMyAccountRegisterApiArg = {
  registerModel: RegisterModel;
};
export type PostApiMyAccountForgotApiResponse = unknown;
export type PostApiMyAccountForgotApiArg = {
  forgotModel: ForgotModel;
};
export type PostApiMyAccountForgotConfirmApiResponse = unknown;
export type PostApiMyAccountForgotConfirmApiArg = {
  forgotConfirmModel: ForgotConfirmModel;
};
export type PostApiMyAccountLogoutApiResponse = unknown;
export type PostApiMyAccountLogoutApiArg = void;
export type GetApiMyAccountCaptchaApiResponse =
  /** status 200 OK */ CaptchaResponse;
export type GetApiMyAccountCaptchaApiArg = void;
export type GetApiMyBareMetalHostListApiResponse =
  /** status 200 OK */ BareMetalListResponse[];
export type GetApiMyBareMetalHostListApiArg = void;
export type GetApiMyBareMetalHostGetByIdApiResponse =
  /** status 200 OK */ BareMetalResponse;
export type GetApiMyBareMetalHostGetByIdApiArg = {
  id: number;
};
export type PostApiMyBareMetalHostCreateApiResponse = unknown;
export type PostApiMyBareMetalHostCreateApiArg = {
  createBareMetalModel: CreateBareMetalModel;
};
export type DeleteApiMyBareMetalHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyBareMetalHostDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyPortalBusinessUnitListApiResponse =
  /** status 200 OK */ BusinessUnitListResponse[];
export type GetApiMyPortalBusinessUnitListApiArg = void;
export type GetApiMyPortalCalculateMonthListApiResponse =
  /** status 200 OK */ CalculateMonthListResponse[];
export type GetApiMyPortalCalculateMonthListApiArg = void;
export type GetApiMyDnsCdnEdgeCertGetByDnsCdnHostIdApiResponse =
  /** status 200 OK */ GetCdnCertResponse;
export type GetApiMyDnsCdnEdgeCertGetByDnsCdnHostIdApiArg = {
  dnsCdnHostId: number;
};
export type GetApiMyDnsCdnEdgeCertGetUserCertByDnsCdnHostIdApiResponse =
  /** status 200 OK */ GetCdnCertResponse;
export type GetApiMyDnsCdnEdgeCertGetUserCertByDnsCdnHostIdApiArg = {
  dnsCdnHostId: number;
};
export type PostApiMyDnsCdnEdgeCertCreateApiResponse = unknown;
export type PostApiMyDnsCdnEdgeCertCreateApiArg = {
  createCdnEdgeCertModel: CreateCdnEdgeCertModel;
};
export type PostApiMyDnsCdnEdgeCertCreateUserCertApiResponse = unknown;
export type PostApiMyDnsCdnEdgeCertCreateUserCertApiArg = {
  createCdnEdgeUserCertModel: CreateCdnEdgeUserCertModel;
};
export type GetApiMyDnsCdnOriginCertGetByDnsCdnHostIdApiResponse =
  /** status 200 OK */ GetCdnCertResponse;
export type GetApiMyDnsCdnOriginCertGetByDnsCdnHostIdApiArg = {
  dnsCdnHostId: number;
};
export type GetApiMyDnsCdnOriginCertGetUserCertByDnsCdnHostIdApiResponse =
  /** status 200 OK */ GetCdnCertResponse;
export type GetApiMyDnsCdnOriginCertGetUserCertByDnsCdnHostIdApiArg = {
  dnsCdnHostId: number;
};
export type PostApiMyDnsCdnOriginCertCreateUserCertApiResponse = unknown;
export type PostApiMyDnsCdnOriginCertCreateUserCertApiArg = {
  createCdnOriginUserCertModel: CreateCdnOriginUserCertModel;
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
export type PutApiMyDnsCdnRouteEditApiResponse = unknown;
export type PutApiMyDnsCdnRouteEditApiArg = {
  editCdnRouteModel: EditCdnRouteModel;
};
export type DeleteApiMyDnsCdnRouteDeleteByIdApiResponse = unknown;
export type DeleteApiMyDnsCdnRouteDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyColocationHostListApiResponse =
  /** status 200 OK */ ColocationListResponse[];
export type GetApiMyColocationHostListApiArg = void;
export type GetApiMyColocationHostGetByIdApiResponse =
  /** status 200 OK */ GetColocationResponse;
export type GetApiMyColocationHostGetByIdApiArg = {
  id: number;
};
export type PostApiMyColocationHostCreateApiResponse = unknown;
export type PostApiMyColocationHostCreateApiArg = {
  createColocationModel: CreateColocationModel;
};
export type DeleteApiMyColocationHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyColocationHostDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyPortalCommissionListApiResponse =
  /** status 200 OK */ CommissionListResponse[];
export type GetApiMyPortalCommissionListApiArg = void;
export type GetApiMyPortalCustomerGetApiResponse =
  /** status 200 OK */ GetCustomerResponse;
export type GetApiMyPortalCustomerGetApiArg = void;
export type PutApiMyPortalCustomerEditApiResponse = unknown;
export type PutApiMyPortalCustomerEditApiArg = {
  editCustomerModel: EditCustomerModel;
};
export type PutApiMyPortalCustomerConvertToLegalApiResponse = unknown;
export type PutApiMyPortalCustomerConvertToLegalApiArg = {
  convertCustomerToLegalModel: ConvertCustomerToLegalModel;
};
export type GetApiMyPortalCustomerBillListApiResponse =
  /** status 200 OK */ CustomerBillListResponse[];
export type GetApiMyPortalCustomerBillListApiArg = void;
export type GetApiMyPortalCustomerBillShortListApiResponse =
  /** status 200 OK */ CustomerBillShortListResponse[];
export type GetApiMyPortalCustomerBillShortListApiArg = void;
export type GetApiMyPortalCustomerBillGetByIdApiResponse =
  /** status 200 OK */ GetCustomerBillResponse;
export type GetApiMyPortalCustomerBillGetByIdApiArg = {
  id: number;
};
export type GetApiMyPortalCustomerBillDownloadByIdApiResponse = unknown;
export type GetApiMyPortalCustomerBillDownloadByIdApiArg = {
  id: number;
};
export type GetApiMyPortalCustomerProductListByProductIdApiResponse =
  /** status 200 OK */ CustomerProductListResponse[];
export type GetApiMyPortalCustomerProductListByProductIdApiArg = {
  productId: number;
};
export type GetApiMyPortalCustomerProductShortListApiResponse =
  /** status 200 OK */ CustomerProductShortListResponse[];
export type GetApiMyPortalCustomerProductShortListApiArg = void;
export type GetApiMyPortalCustomerUserListApiResponse =
  /** status 200 OK */ CustomerUserListResponse[];
export type GetApiMyPortalCustomerUserListApiArg = void;
export type PostApiMyPortalCustomerUserCreateApiResponse = unknown;
export type PostApiMyPortalCustomerUserCreateApiArg = {
  createCustomerUserModel: CreateCustomerUserModel;
};
export type DeleteApiMyPortalCustomerUserDeleteByUserIdApiResponse = unknown;
export type DeleteApiMyPortalCustomerUserDeleteByUserIdApiArg = {
  userId: string;
};
export type PostApiMyPortalCustomerUserChangeApiResponse =
  /** status 200 OK */ ChangeCustomerUserResponse;
export type PostApiMyPortalCustomerUserChangeApiArg = {
  changeCustomerUserModel: ChangeCustomerUserModel;
};
export type GetApiMyDashboardUsageByCategoryIdApiResponse =
  /** status 200 OK */ DashboardUsageResponse[];
export type GetApiMyDashboardUsageByCategoryIdApiArg = {
  categoryId: number;
};
export type GetApiMyDashboardFinancialApiResponse =
  /** status 200 OK */ DashboardFinancialResponse;
export type GetApiMyDashboardFinancialApiArg = void;
export type GetApiMyDatacenterListApiResponse =
  /** status 200 OK */ DatacenterListResponse[];
export type GetApiMyDatacenterListApiArg = void;
export type GetApiMyDatacenterImageListApiResponse =
  /** status 200 OK */ DatacenterImageListResponse[];
export type GetApiMyDatacenterImageListApiArg = {
  datacenterId?: number;
  productId?: number;
  hypervisorTypeId?: number;
};
export type GetApiMyDatacenterIpListByIdApiResponse =
  /** status 200 OK */ DatacenterIpListResponse[];
export type GetApiMyDatacenterIpListByIdApiArg = {
  id: number;
};
export type DeleteApiMyDatacenterIpDeleteByIdApiResponse = unknown;
export type DeleteApiMyDatacenterIpDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyDnsCdnHostListApiResponse =
  /** status 200 OK */ DnsCdnListResponse[];
export type GetApiMyDnsCdnHostListApiArg = void;
export type GetApiMyDnsCdnHostGetByIdApiResponse =
  /** status 200 OK */ GetDnsCdnResponse;
export type GetApiMyDnsCdnHostGetByIdApiArg = {
  id: number;
};
export type GetApiMyDnsCdnHostGetCdnByIdApiResponse =
  /** status 200 OK */ GetCdnResponse;
export type GetApiMyDnsCdnHostGetCdnByIdApiArg = {
  id: number;
};
export type GetApiMyDnsCdnHostGetCdnAnalyticByIdAndPeriodIdApiResponse =
  /** status 200 OK */ GetCdnAnalyticResponse;
export type GetApiMyDnsCdnHostGetCdnAnalyticByIdAndPeriodIdApiArg = {
  id: number;
  periodId: number;
};
export type GetApiMyDnsCdnHostGetNsByIdApiResponse =
  /** status 200 OK */ GetDnsNsResponse;
export type GetApiMyDnsCdnHostGetNsByIdApiArg = {
  id: number;
};
export type PostApiMyDnsCdnHostCheckApiResponse = unknown;
export type PostApiMyDnsCdnHostCheckApiArg = {
  checkDnsCdnModel: CheckDnsCdnModel;
};
export type PostApiMyDnsCdnHostCreateApiResponse = unknown;
export type PostApiMyDnsCdnHostCreateApiArg = {
  createDnsCdnModel: CreateDnsCdnModel;
};
export type DeleteApiMyDnsCdnHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyDnsCdnHostDeleteByIdApiArg = {
  id: number;
};
export type PutApiMyDnsCdnHostChangeCdnTypeApiResponse = unknown;
export type PutApiMyDnsCdnHostChangeCdnTypeApiArg = {
  changeCdnTypeModel: ChangeCdnTypeModel;
};
export type PutApiMyDnsCdnHostChangeOriginCertTypeApiResponse = unknown;
export type PutApiMyDnsCdnHostChangeOriginCertTypeApiArg = {
  changeOriginCertTypeModel: ChangeOriginCertTypeModel;
};
export type PutApiMyDnsCdnHostChangeEdgeCertTypeApiResponse = unknown;
export type PutApiMyDnsCdnHostChangeEdgeCertTypeApiArg = {
  changeEdgeCertTypeModel: ChangeEdgeCertTypeModel;
};
export type PutApiMyDnsCdnHostChangeHstsApiResponse = unknown;
export type PutApiMyDnsCdnHostChangeHstsApiArg = {
  changeHstsModel: ChangeHstsModel;
};
export type PutApiMyDnsCdnHostChangeHttpsRedirectApiResponse = unknown;
export type PutApiMyDnsCdnHostChangeHttpsRedirectApiArg = {
  changeHttpsRedirectModel: ChangeHttpsRedirectModel;
};
export type PutApiMyDnsCdnHostChangeNonWwwRedirectApiResponse = unknown;
export type PutApiMyDnsCdnHostChangeNonWwwRedirectApiArg = {
  changeNonWwwRedirectModel: ChangeNonWwwRedirectModel;
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
export type PostApiMyDnsCdnDnsRecordCreateApiResponse = unknown;
export type PostApiMyDnsCdnDnsRecordCreateApiArg = {
  createDnsRecordModel: CreateDnsRecordModel;
};
export type PutApiMyDnsCdnDnsRecordEditApiResponse = unknown;
export type PutApiMyDnsCdnDnsRecordEditApiArg = {
  editDnsRecordModel: EditDnsRecordModel;
};
export type DeleteApiMyDnsCdnDnsRecordDeleteByIdApiResponse = unknown;
export type DeleteApiMyDnsCdnDnsRecordDeleteByIdApiArg = {
  id: number;
};
export type PutApiMyDnsCdnDnsRecordChangeProxyStatusByIdApiResponse = unknown;
export type PutApiMyDnsCdnDnsRecordChangeProxyStatusByIdApiArg = {
  id: number;
};
export type GetApiMyDomainHostListApiResponse =
  /** status 200 OK */ DomainListResponse[];
export type GetApiMyDomainHostListApiArg = void;
export type GetApiMyDomainHostGetByIdApiResponse =
  /** status 200 OK */ GetDomainResponse;
export type GetApiMyDomainHostGetByIdApiArg = {
  id: number;
};
export type PostApiMyDomainHostGetStatusByIdApiResponse =
  /** status 200 OK */ DomainGetStatusResponse;
export type PostApiMyDomainHostGetStatusByIdApiArg = {
  id: number;
};
export type PostApiMyDomainHostCheckDomainApiResponse = unknown;
export type PostApiMyDomainHostCheckDomainApiArg = {
  checkDomainModel: CheckDomainModel;
};
export type PostApiMyDomainHostRegisterApiResponse = unknown;
export type PostApiMyDomainHostRegisterApiArg = {
  registerDomainModel: RegisterDomainModel;
};
export type DeleteApiMyDomainHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyDomainHostDeleteByIdApiArg = {
  id: number;
};
export type PutApiMyDomainHostChangeContactApiResponse = unknown;
export type PutApiMyDomainHostChangeContactApiArg = {
  changeContactModel: ChangeContactModel;
};
export type PutApiMyDomainHostChangeNsApiResponse = unknown;
export type PutApiMyDomainHostChangeNsApiArg = {
  changeNsModel: ChangeNsModel;
};
export type PostApiMyDomainHostResendVerificationByIdApiResponse = unknown;
export type PostApiMyDomainHostResendVerificationByIdApiArg = {
  id: number;
};
export type GetApiMyColocationEquipmentListByTypeIdAndBrandIdApiResponse =
  /** status 200 OK */ EquipmentListResponse[];
export type GetApiMyColocationEquipmentListByTypeIdAndBrandIdApiArg = {
  typeId: number;
  brandId: number;
};
export type GetApiMyColocationEquipmentBrandListApiResponse =
  /** status 200 OK */ EquipmentBrandListResponse[];
export type GetApiMyColocationEquipmentBrandListApiArg = void;
export type GetApiMyColocationEquipmentTypeListApiResponse =
  /** status 200 OK */ EquipmentTypeListResponse[];
export type GetApiMyColocationEquipmentTypeListApiArg = void;
export type GetApiMyHomeIndexApiResponse = unknown;
export type GetApiMyHomeIndexApiArg = void;
export type GetApiMyVmProjectListApiResponse =
  /** status 200 OK */ VmProjectListResponse[];
export type GetApiMyVmProjectListApiArg = void;
export type GetApiMyVmProjectGetByIdApiResponse =
  /** status 200 OK */ VmProjectGetResponse;
export type GetApiMyVmProjectGetByIdApiArg = {
  id: number;
};
export type PostApiMyVmProjectCreateApiResponse = unknown;
export type PostApiMyVmProjectCreateApiArg = {
  vmProjectCreateModel: VmProjectCreateModel;
};
export type PutApiMyVmProjectEditByIdApiResponse = unknown;
export type PutApiMyVmProjectEditByIdApiArg = {
  id: number;
  vmProjectEditModel: VmProjectEditModel;
};
export type DeleteApiMyVmProjectDeleteByIdApiResponse = unknown;
export type DeleteApiMyVmProjectDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyVmHypervisorListApiResponse =
  /** status 200 OK */ HypervisorTypeListResponse[];
export type GetApiMyVmHypervisorListApiArg = void;
export type GetApiMyPortalInvoiceListApiResponse =
  /** status 200 OK */ InvoiceListResponse[];
export type GetApiMyPortalInvoiceListApiArg = void;
export type GetApiMyPortalInvoiceUnpaidApiResponse =
  /** status 200 OK */ UnPaidInvoiceResponse[];
export type GetApiMyPortalInvoiceUnpaidApiArg = void;
export type GetApiMyPortalInvoiceGetByIdApiResponse =
  /** status 200 OK */ GetInvoiceResponse;
export type GetApiMyPortalInvoiceGetByIdApiArg = {
  id: number;
};
export type PostApiMyPortalInvoicePayApiResponse =
  /** status 200 OK */ PayInvoiceResponse;
export type PostApiMyPortalInvoicePayApiArg = {
  payInvoiceModel: PayInvoiceModel;
};
export type GetApiMyPortalInvoiceSummaryApiResponse =
  /** status 200 OK */ InvoiceSummaryResponse;
export type GetApiMyPortalInvoiceSummaryApiArg = void;
export type GetApiMyPortalIssueListApiResponse =
  /** status 200 OK */ IssueListResponse[];
export type GetApiMyPortalIssueListApiArg = void;
export type GetApiMyPortalIssueShortListApiResponse =
  /** status 200 OK */ IssueShortListResponse[];
export type GetApiMyPortalIssueShortListApiArg = void;
export type PostApiMyPortalIssueCreateApiResponse = unknown;
export type PostApiMyPortalIssueCreateApiArg = {
  body: {
    Content: string;
    BusinessUnitId: number;
    IssueSubjectId: number;
    IssuePriorityId: number;
    CustomerProductId?: number;
    ProductId?: number;
    Attachment?: Blob;
  };
};
export type GetApiMyPortalIssueItemListByIssueIdApiResponse =
  /** status 200 OK */ IssueItemListResponse;
export type GetApiMyPortalIssueItemListByIssueIdApiArg = {
  issueId: number;
};
export type PostApiMyPortalIssueItemCreateApiResponse = unknown;
export type PostApiMyPortalIssueItemCreateApiArg = {
  body: {
    IssueId: number;
    Content: string;
    Attachment?: Blob;
  };
};
export type GetApiMyPortalIssueItemDownloadByIdApiResponse = unknown;
export type GetApiMyPortalIssueItemDownloadByIdApiArg = {
  id: number;
};
export type GetApiMyPortalIssueSubjectListApiResponse =
  /** status 200 OK */ IssueSubjectListResponse[];
export type GetApiMyPortalIssueSubjectListApiArg = void;
export type PostApiMyPortalIssueSubjectSelectListApiResponse =
  /** status 200 OK */ IssueSubjectListResponse[];
export type PostApiMyPortalIssueSubjectSelectListApiArg = {
  issueSubjectSelectListModel: IssueSubjectSelectListModel;
};
export type GetApiMyKubernetesCloudConfigmapListByIdApiResponse =
  /** status 200 OK */ KuberCloudConfigListResponse[];
export type GetApiMyKubernetesCloudConfigmapListByIdApiArg = {
  id: number;
};
export type GetApiMyKubernetesCloudConfigmapGetByIdApiResponse =
  /** status 200 OK */ GetKuberCloudConfigResponse;
export type GetApiMyKubernetesCloudConfigmapGetByIdApiArg = {
  id: number;
};
export type PostApiMyKubernetesCloudConfigmapCreateApiResponse = unknown;
export type PostApiMyKubernetesCloudConfigmapCreateApiArg = {
  createKuberCloudConfigmapModel: CreateKuberCloudConfigmapModel;
};
export type DeleteApiMyKubernetesCloudConfigmapDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubernetesCloudConfigmapDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyKubernetesCloudDeploymentListApiResponse =
  /** status 200 OK */ KuberCloudDeploymentListResponse[];
export type GetApiMyKubernetesCloudDeploymentListApiArg = void;
export type GetApiMyKubernetesCloudDeploymentGetByIdApiResponse =
  /** status 200 OK */ GetKuberCloudDeploymentResponse;
export type GetApiMyKubernetesCloudDeploymentGetByIdApiArg = {
  id: number;
};
export type PostApiMyKubernetesCloudDeploymentCreateApiResponse = unknown;
export type PostApiMyKubernetesCloudDeploymentCreateApiArg = {
  createKuberCloudDeploymentModel: CreateKuberCloudDeploymentModel;
};
export type DeleteApiMyKubernetesCloudDeploymentDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubernetesCloudDeploymentDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyKubernetesCloudHostListApiResponse =
  /** status 200 OK */ KuberCloudHostListResponse[];
export type GetApiMyKubernetesCloudHostListApiArg = void;
export type GetApiMyKubernetesCloudHostGetByIdApiResponse =
  /** status 200 OK */ KuberCloudHostGetResponse;
export type GetApiMyKubernetesCloudHostGetByIdApiArg = {
  id: number;
};
export type PostApiMyKubernetesCloudHostCreateApiResponse = unknown;
export type PostApiMyKubernetesCloudHostCreateApiArg = {
  createKuberCloudHostModel: CreateKuberCloudHostModel;
};
export type PutApiMyKubernetesCloudHostEditApiResponse = unknown;
export type PutApiMyKubernetesCloudHostEditApiArg = {
  editKuberCloudHostModel: EditKuberCloudHostModel;
};
export type DeleteApiMyKubernetesCloudHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubernetesCloudHostDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyKubernetesCloudImageListApiResponse =
  /** status 200 OK */ KuberCloudImageResponse[];
export type GetApiMyKubernetesCloudImageListApiArg = void;
export type GetApiMyKubernetesCloudCategoryListApiResponse =
  /** status 200 OK */ KuberCloudImageCategoryResponse[];
export type GetApiMyKubernetesCloudCategoryListApiArg = void;
export type GetApiMyKubernetesCloudImageKeyGetByIdApiResponse =
  /** status 200 OK */ KuberCloudImageKeyListResponse;
export type GetApiMyKubernetesCloudImageKeyGetByIdApiArg = {
  id: number;
};
export type GetApiMyKubernetesCloudImageTagListByIdApiResponse =
  /** status 200 OK */ KuberCloudImageTagListResponse[];
export type GetApiMyKubernetesCloudImageTagListByIdApiArg = {
  id: number;
};
export type GetApiMyKubernetesCloudIngressListApiResponse =
  /** status 200 OK */ KuberCloudIngressListResponse[];
export type GetApiMyKubernetesCloudIngressListApiArg = void;
export type GetApiMyKubernetesCloudIngressGetByIdApiResponse =
  /** status 200 OK */ GetKuberCloudIngressResponse;
export type GetApiMyKubernetesCloudIngressGetByIdApiArg = {
  id: number;
};
export type PostApiMyKubernetesCloudIngressCreateApiResponse = unknown;
export type PostApiMyKubernetesCloudIngressCreateApiArg = {
  createKuberCloudIngressModel: CreateKuberCloudIngressModel;
};
export type DeleteApiMyKubernetesCloudIngressDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubernetesCloudIngressDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyKubernetesCloudSecretListByIdApiResponse =
  /** status 200 OK */ KuberCloudSecretListResponse[];
export type GetApiMyKubernetesCloudSecretListByIdApiArg = {
  id: number;
};
export type GetApiMyKubernetesCloudSecretGetByIdApiResponse =
  /** status 200 OK */ GetKuberCloudSecretResponse;
export type GetApiMyKubernetesCloudSecretGetByIdApiArg = {
  id: number;
};
export type PostApiMyKubernetesCloudSecretCreateApiResponse = unknown;
export type PostApiMyKubernetesCloudSecretCreateApiArg = {
  createKuberCloudSecretModel: CreateKuberCloudSecretModel;
};
export type DeleteApiMyKubernetesCloudSecretDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubernetesCloudSecretDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyKubernetesClusterHostListApiResponse =
  /** status 200 OK */ KubernetesListResponse[];
export type GetApiMyKubernetesClusterHostListApiArg = void;
export type GetApiMyKubernetesClusterHostGetByIdApiResponse =
  /** status 200 OK */ GetKubernetesResponse;
export type GetApiMyKubernetesClusterHostGetByIdApiArg = {
  id: number;
};
export type PostApiMyKubernetesClusterHostCreateApiResponse = unknown;
export type PostApiMyKubernetesClusterHostCreateApiArg = {
  createKubernetesModel: CreateKubernetesModel;
};
export type DeleteApiMyKubernetesClusterHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubernetesClusterHostDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyKubernetesClusterNodeListByKubernetesHostIdApiResponse =
  /** status 200 OK */ KubernetesNodeListResponse[];
export type GetApiMyKubernetesClusterNodeListByKubernetesHostIdApiArg = {
  kubernetesHostId: number;
};
export type PostApiMyKubernetesClusterNodeCreateApiResponse = unknown;
export type PostApiMyKubernetesClusterNodeCreateApiArg = {
  createKubernetesNodeModel: CreateKubernetesNodeModel;
};
export type PutApiMyKubernetesClusterNodeDeleteByIdApiResponse = unknown;
export type PutApiMyKubernetesClusterNodeDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyKubernetesClusterVersionListApiResponse =
  /** status 200 OK */ KubernetesVersionListResponse[];
export type GetApiMyKubernetesClusterVersionListApiArg = void;
export type GetApiMyPortalNotificationListApiResponse =
  /** status 200 OK */ NotificationListResponse[];
export type GetApiMyPortalNotificationListApiArg = void;
export type GetApiMyPortalNotificationShortListApiResponse =
  /** status 200 OK */ NotificationListResponse[];
export type GetApiMyPortalNotificationShortListApiArg = void;
export type PutApiMyPortalNotificationSeenByIdApiResponse = unknown;
export type PutApiMyPortalNotificationSeenByIdApiArg = {
  id: number;
};
export type GetApiMyPortalOfferListApiResponse =
  /** status 200 OK */ OfferListResponse[];
export type GetApiMyPortalOfferListApiArg = void;
export type GetApiMyPortalOfferGetByIdApiResponse =
  /** status 200 OK */ OfferGetResponse;
export type GetApiMyPortalOfferGetByIdApiArg = {
  id: number;
};
export type PostApiMyPortalOfferPaymentApiResponse =
  /** status 200 OK */ PaymentResponse;
export type PostApiMyPortalOfferPaymentApiArg = {
  paymentModel: PaymentModel;
};
export type GetApiMyPortalPaymentListApiResponse =
  /** status 200 OK */ PaymentListResponse[];
export type GetApiMyPortalPaymentListApiArg = void;
export type GetApiMyPortalPaymentGetByIdApiResponse =
  /** status 200 OK */ GetPaymentResponse;
export type GetApiMyPortalPaymentGetByIdApiArg = {
  id: number;
};
export type PostApiMyPortalPaymentCreateApiResponse =
  /** status 200 OK */ CreatePaymentResponse;
export type PostApiMyPortalPaymentCreateApiArg = {
  createPaymentModel: CreatePaymentModel;
};
export type PostApiMyPortalPaymentPecCallBackApiResponse = unknown;
export type PostApiMyPortalPaymentPecCallBackApiArg = {
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
export type PostApiMyPortalPaymentSepCallBackApiResponse = unknown;
export type PostApiMyPortalPaymentSepCallBackApiArg = {
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
export type PostApiMyPortalPaymentBpmCallBackApiResponse = unknown;
export type PostApiMyPortalPaymentBpmCallBackApiArg = {
  body: {
    RefId?: string;
    ResCode?: number;
    SaleOrderId?: number;
    SaleReferenceId?: number;
    CardHolderInfo?: string;
    CardHolderPan?: string;
    FinalAmount?: number;
  };
};
export type GetApiMyPortalPaymentProviderListApiResponse =
  /** status 200 OK */ PaymentProviderListResponse[];
export type GetApiMyPortalPaymentProviderListApiArg = void;
export type GetApiMyPortalProductListApiResponse =
  /** status 200 OK */ ProductListResponse[];
export type GetApiMyPortalProductListApiArg = void;
export type GetApiMyPortalProductGetByIdApiResponse =
  /** status 200 OK */ GetProductResponse;
export type GetApiMyPortalProductGetByIdApiArg = {
  id: number;
};
export type GetApiMyPortalProductBundleVmListApiResponse =
  /** status 200 OK */ ProductBundleVmListResponse[];
export type GetApiMyPortalProductBundleVmListApiArg = void;
export type GetApiMyPortalProductBundleStorageListApiResponse =
  /** status 200 OK */ ProductBundleStorageListResponse[];
export type GetApiMyPortalProductBundleStorageListApiArg = void;
export type GetApiMyPortalProductBundleWebListApiResponse =
  /** status 200 OK */ ProductBundleWebListResponse[];
export type GetApiMyPortalProductBundleWebListApiArg = void;
export type GetApiMyPortalProductBundleKuberClusterListApiResponse =
  /** status 200 OK */ ProductBundleKuberClusterListResponse[];
export type GetApiMyPortalProductBundleKuberClusterListApiArg = void;
export type GetApiMyPortalProductBundleVpcListApiResponse =
  /** status 200 OK */ ProductBundleVpcListResponse[];
export type GetApiMyPortalProductBundleVpcListApiArg = void;
export type GetApiMyPortalProductBundleKuberCloudListApiResponse =
  /** status 200 OK */ ProductBundleKuberCloudListResponse[];
export type GetApiMyPortalProductBundleKuberCloudListApiArg = void;
export type GetApiMyPortalProductBundleBareMetalListApiResponse =
  /** status 200 OK */ ProductBundleBareMetalListResponse[];
export type GetApiMyPortalProductBundleBareMetalListApiArg = void;
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
export type GetApiMyPortalProfileGetApiResponse =
  /** status 200 OK */ GetProfileResponse;
export type GetApiMyPortalProfileGetApiArg = void;
export type GetApiMyPortalProfileGetNotificationStatusApiResponse =
  /** status 200 OK */ GetNotificationStatusResponse;
export type GetApiMyPortalProfileGetNotificationStatusApiArg = void;
export type PutApiMyPortalProfileEditApiResponse =
  /** status 200 OK */ EditProfileResponse;
export type PutApiMyPortalProfileEditApiArg = {
  editProfileModel: EditProfileModel;
};
export type PutApiMyPortalProfileEditEmailApiResponse = unknown;
export type PutApiMyPortalProfileEditEmailApiArg = {
  editEmailModel: EditEmailModel;
};
export type PostApiMyPortalProfileConfirmEmailApiResponse =
  /** status 200 OK */ EditProfileResponse;
export type PostApiMyPortalProfileConfirmEmailApiArg = {
  confirmEmailModel: ConfirmEmailModel;
};
export type PutApiMyPortalProfileEditPhoneNumberApiResponse = unknown;
export type PutApiMyPortalProfileEditPhoneNumberApiArg = {
  editPhoneNumberModel: EditPhoneNumberModel;
};
export type PostApiMyPortalProfileConfirmPhoneNumberApiResponse =
  /** status 200 OK */ EditProfileResponse;
export type PostApiMyPortalProfileConfirmPhoneNumberApiArg = {
  confirmPhoneNumberModel: ConfirmPhoneNumberModel;
};
export type PutApiMyPortalProfileEditEmailNotificationApiResponse = unknown;
export type PutApiMyPortalProfileEditEmailNotificationApiArg = {
  editEmailNotifyModel: EditEmailNotifyModel;
};
export type PutApiMyPortalProfileEditPhoneNotificationApiResponse = unknown;
export type PutApiMyPortalProfileEditPhoneNotificationApiArg = {
  editPhoneNotifyModel: EditPhoneNotifyModel;
};
export type PutApiMyPortalProfileEditTwoFactorApiResponse = unknown;
export type PutApiMyPortalProfileEditTwoFactorApiArg = {
  twoFactorModel: TwoFactorModel;
};
export type PostApiMyPortalProfileChangePasswordApiResponse = unknown;
export type PostApiMyPortalProfileChangePasswordApiArg = {
  changePasswordModel: ChangePasswordModel;
};
export type GetApiMyPortalPromotionRedirectLinkByCodeApiResponse = unknown;
export type GetApiMyPortalPromotionRedirectLinkByCodeApiArg = {
  code: string;
};
export type GetApiMyPortalReferralGetApiResponse =
  /** status 200 OK */ GetReferralResponse;
export type GetApiMyPortalReferralGetApiArg = void;
export type GetApiMyPortalReferralCustomerByReferralIdListApiResponse =
  /** status 200 OK */ CustomerReferralListResponse[];
export type GetApiMyPortalReferralCustomerByReferralIdListApiArg = {
  referralId: number;
};
export type GetApiMyPortalRoleListApiResponse =
  /** status 200 OK */ RoleListResponse[];
export type GetApiMyPortalRoleListApiArg = void;
export type GetApiMyPortalRoleAccessListByUserIdApiResponse =
  /** status 200 OK */ RoleAccessListResponse;
export type GetApiMyPortalRoleAccessListByUserIdApiArg = {
  userId: string;
};
export type PutApiMyPortalRoleAccessEditApiResponse = unknown;
export type PutApiMyPortalRoleAccessEditApiArg = {
  editRoleAccessModel: EditRoleAccessModel;
};
export type GetApiMyPortalRoleAccessTypeListApiResponse =
  /** status 200 OK */ RoleAccessTypeListResponse[];
export type GetApiMyPortalRoleAccessTypeListApiArg = void;
export type GetApiMyStorageHostListApiResponse =
  /** status 200 OK */ StorageHostListResponse[];
export type GetApiMyStorageHostListApiArg = void;
export type GetApiMyStorageHostGetByIdApiResponse =
  /** status 200 OK */ GetStorageHostResponse;
export type GetApiMyStorageHostGetByIdApiArg = {
  id: number;
};
export type PostApiMyStorageHostCreateApiResponse = unknown;
export type PostApiMyStorageHostCreateApiArg = {
  createStorageHostModel: CreateStorageHostModel;
};
export type PutApiMyStorageHostEditApiResponse = unknown;
export type PutApiMyStorageHostEditApiArg = {
  editStorageHostModel: EditStorageHostModel;
};
export type DeleteApiMyStorageHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyStorageHostDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyStorageUserListByStorageHostIdApiResponse =
  /** status 200 OK */ StorageUserListResponse[];
export type GetApiMyStorageUserListByStorageHostIdApiArg = {
  storageHostId: number;
};
export type PostApiMyStorageUserCreateApiResponse = unknown;
export type PostApiMyStorageUserCreateApiArg = {
  createStorageUserModel: CreateStorageUserModel;
};
export type DeleteApiMyStorageUserDeleteByIdApiResponse = unknown;
export type DeleteApiMyStorageUserDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyPortalUserLogListApiResponse =
  /** status 200 OK */ LogUserResponseListPagedResponse;
export type GetApiMyPortalUserLogListApiArg = {
  action?: string;
  controller?: string;
  pageNumber?: number;
  pageSize?: number;
};
export type GetApiMyVmHostListByVmProjectIdApiResponse =
  /** status 200 OK */ VmListResponse[];
export type GetApiMyVmHostListByVmProjectIdApiArg = {
  vmProjectId: number;
};
export type GetApiMyVmHostShortListByHypervisorTypeIdApiResponse =
  /** status 200 OK */ VmShortListResponse[];
export type GetApiMyVmHostShortListByHypervisorTypeIdApiArg = {
  hypervisorTypeId: number;
};
export type GetApiMyVmHostGetByIdApiResponse =
  /** status 200 OK */ GetVmResponse;
export type GetApiMyVmHostGetByIdApiArg = {
  id: number;
};
export type PostApiMyVmHostCreateApiResponse = /** status 200 OK */ number;
export type PostApiMyVmHostCreateApiArg = {
  createVmModel: CreateVmModel;
};
export type PutApiMyVmHostEditApiResponse = unknown;
export type PutApiMyVmHostEditApiArg = {
  editVmModel: EditVmModel;
};
export type DeleteApiMyVmHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyVmHostDeleteByIdApiArg = {
  id: number;
};
export type PutApiMyVmHostRebuildApiResponse = unknown;
export type PutApiMyVmHostRebuildApiArg = {
  rebuildVmModel: RebuildVmModel;
};
export type PutApiMyVmHostConnectByIdApiResponse = unknown;
export type PutApiMyVmHostConnectByIdApiArg = {
  id: number;
};
export type PutApiMyVmHostDisconnectByIdApiResponse = unknown;
export type PutApiMyVmHostDisconnectByIdApiArg = {
  id: number;
};
export type PutApiMyVmHostRebootByIdApiResponse = unknown;
export type PutApiMyVmHostRebootByIdApiArg = {
  id: number;
};
export type PutApiMyVmHostShutdownByIdApiResponse = unknown;
export type PutApiMyVmHostShutdownByIdApiArg = {
  id: number;
};
export type PutApiMyVmHostResetByIdApiResponse = unknown;
export type PutApiMyVmHostResetByIdApiArg = {
  id: number;
};
export type PutApiMyVmHostStartByIdApiResponse = unknown;
export type PutApiMyVmHostStartByIdApiArg = {
  id: number;
};
export type PutApiMyVmHostStopByIdApiResponse = unknown;
export type PutApiMyVmHostStopByIdApiArg = {
  id: number;
};
export type GetApiMyVmIsoListByDatacenterIdApiResponse =
  /** status 200 OK */ IsoListResponse[];
export type GetApiMyVmIsoListByDatacenterIdApiArg = {
  datacenterId: number;
};
export type PutApiMyVmIsoMountApiResponse = unknown;
export type PutApiMyVmIsoMountApiArg = {
  mountModel: MountModel;
};
export type PutApiMyVmIsoUnmountApiResponse = unknown;
export type PutApiMyVmIsoUnmountApiArg = {
  unmountModel: UnmountModel;
};
export type GetApiMyVmKmsGetByIdAndTypeIdApiResponse =
  /** status 200 OK */ GetRemoteConsoleResponse;
export type GetApiMyVmKmsGetByIdAndTypeIdApiArg = {
  id: number;
  typeId: number;
};
export type GetApiMyVmSnapshotListByVmIdApiResponse =
  /** status 200 OK */ VmSnapshotResponse[];
export type GetApiMyVmSnapshotListByVmIdApiArg = {
  vmId: number;
};
export type GetApiMyVmSnapshotGetByIdApiResponse =
  /** status 200 OK */ VmSnapshotResponse;
export type GetApiMyVmSnapshotGetByIdApiArg = {
  id: number;
};
export type PostApiMyVmSnapshotCreateApiResponse = unknown;
export type PostApiMyVmSnapshotCreateApiArg = {
  createSnapshotModel: CreateSnapshotModel;
};
export type PutApiMyVmSnapshotRevertApiResponse = unknown;
export type PutApiMyVmSnapshotRevertApiArg = {
  revertSnapshotModel: RevertSnapshotModel;
};
export type DeleteApiMyVmSnapshotDeleteByIdApiResponse = unknown;
export type DeleteApiMyVmSnapshotDeleteByIdApiArg = {
  id: number;
};
export type DeleteApiMyVmSnapshotDeleteAllByVmHostIdApiResponse = unknown;
export type DeleteApiMyVmSnapshotDeleteAllByVmHostIdApiArg = {
  vmHostId: number;
};
export type PostApiMyPortalVoucherUseApiResponse = unknown;
export type PostApiMyPortalVoucherUseApiArg = {
  useVoucherModel: UseVoucherModel;
};
export type GetApiMyVpcHostListApiResponse =
  /** status 200 OK */ VpcListResponse[];
export type GetApiMyVpcHostListApiArg = void;
export type GetApiMyVpcHostShortListApiResponse =
  /** status 200 OK */ VpcShortListResponse[];
export type GetApiMyVpcHostShortListApiArg = void;
export type GetApiMyVpcHostGetByIdApiResponse =
  /** status 200 OK */ VpcResponse;
export type GetApiMyVpcHostGetByIdApiArg = {
  id: number;
};
export type PostApiMyVpcHostCreateApiResponse = unknown;
export type PostApiMyVpcHostCreateApiArg = {
  createVpcHostModel: CreateVpcHostModel;
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
export type GetApiMyVpcGatewayGetByVpcHostIdApiResponse =
  /** status 200 OK */ GetVpcGatewayResponse;
export type GetApiMyVpcGatewayGetByVpcHostIdApiArg = {
  vpcHostId: number;
};
export type GetApiMyVpcIpListByVpcHostIdApiResponse =
  /** status 200 OK */ VpcHostGatewayListResponse[];
export type GetApiMyVpcIpListByVpcHostIdApiArg = {
  vpcHostId: number;
};
export type PostApiMyVpcIpCreateApiResponse = unknown;
export type PostApiMyVpcIpCreateApiArg = {
  createVpcHostGatewayIpModel: CreateVpcHostGatewayIpModel;
};
export type DeleteApiMyVpcIpDeleteByIdApiResponse = unknown;
export type DeleteApiMyVpcIpDeleteByIdApiArg = {
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
export type PostApiMyVpcNatCreateDnatApiResponse = unknown;
export type PostApiMyVpcNatCreateDnatApiArg = {
  createVpcGatewayDnatModel: CreateVpcGatewayDnatModel;
};
export type PostApiMyVpcNatCreateSnatApiResponse = unknown;
export type PostApiMyVpcNatCreateSnatApiArg = {
  createVpcGatewaySnatModel: CreateVpcGatewaySnatModel;
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
export type DeleteApiMyVpcNatDeleteByIdApiResponse = unknown;
export type DeleteApiMyVpcNatDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyVpcLoadBalanceListByVpcHostIdApiResponse =
  /** status 200 OK */ VpcLbListResponse[];
export type GetApiMyVpcLoadBalanceListByVpcHostIdApiArg = {
  vpcHostId: number;
};
export type PostApiMyVpcLoadBalanceCreateApiResponse = unknown;
export type PostApiMyVpcLoadBalanceCreateApiArg = {
  createVpcHostLbModel: CreateVpcHostLbModel;
};
export type DeleteApiMyVpcLoadBalanceDeleteByIdApiResponse = unknown;
export type DeleteApiMyVpcLoadBalanceDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyVpcNetworkListByVpcHostIdApiResponse =
  /** status 200 OK */ VpcNetworkListResponse[];
export type GetApiMyVpcNetworkListByVpcHostIdApiArg = {
  vpcHostId: number;
};
export type GetApiMyVpcNetworkShortListByVpcHostIdApiResponse =
  /** status 200 OK */ VpcNetworkShortListResponse[];
export type GetApiMyVpcNetworkShortListByVpcHostIdApiArg = {
  vpcHostId: number;
};
export type PostApiMyVpcNetworkCreateApiResponse = unknown;
export type PostApiMyVpcNetworkCreateApiArg = {
  createVpcNetworkModel: CreateVpcNetworkModel;
};
export type PostApiMyVpcNetworkEditVmNetworkApiResponse = unknown;
export type PostApiMyVpcNetworkEditVmNetworkApiArg = {
  editVmNetworkModel: EditVmNetworkModel;
};
export type DeleteApiMyVpcNetworkDeleteByIdApiResponse = unknown;
export type DeleteApiMyVpcNetworkDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyVpcStaticRouteListByVpcHostIdApiResponse =
  /** status 200 OK */ GetVpcGatewayNatResponse[];
export type GetApiMyVpcStaticRouteListByVpcHostIdApiArg = {
  vpcHostId: number;
};
export type GetApiMyVpcStaticRouteGetByIdApiResponse =
  /** status 200 OK */ GetVpcGatewayNatResponse;
export type GetApiMyVpcStaticRouteGetByIdApiArg = {
  id: number;
};
export type PostApiMyVpcStaticRouteCreateApiResponse = unknown;
export type PostApiMyVpcStaticRouteCreateApiArg = {
  createVpcStaticRouteModel: CreateVpcStaticRouteModel;
};
export type PutApiMyVpcStaticRouteEditApiResponse = unknown;
export type PutApiMyVpcStaticRouteEditApiArg = {
  editVpcStaticRouteModel: EditVpcStaticRouteModel;
};
export type PostApiMyVpcStaticRouteDeleteByIdApiResponse = unknown;
export type PostApiMyVpcStaticRouteDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyVpcTranslateListApiResponse =
  /** status 200 OK */ VpcHostTranslateListResponse[];
export type GetApiMyVpcTranslateListApiArg = void;
export type PostApiMyVpcTranslateCreateApiResponse = unknown;
export type PostApiMyVpcTranslateCreateApiArg = {
  createVpcTranslateModel: CreateVpcTranslateModel;
};
export type DeleteApiMyVpcTranslateDeleteByIdApiResponse = unknown;
export type DeleteApiMyVpcTranslateDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyPortalWalletGetBalanceApiResponse =
  /** status 200 OK */ number;
export type GetApiMyPortalWalletGetBalanceApiArg = void;
export type GetApiMyPortalWalletTransactionListApiResponse =
  /** status 200 OK */ WalletTransactionListResponse[];
export type GetApiMyPortalWalletTransactionListApiArg = void;
export type GetApiMyPortalWalletTransactionBalanceUsageApiResponse =
  /** status 200 OK */ BalanceUsageResponse[];
export type GetApiMyPortalWalletTransactionBalanceUsageApiArg = {
  period?: number;
};
export type GetApiMyWebHostListApiResponse =
  /** status 200 OK */ WebHostListResponse[];
export type GetApiMyWebHostListApiArg = void;
export type GetApiMyWebHostGetByIdApiResponse =
  /** status 200 OK */ GetWebHostResponse;
export type GetApiMyWebHostGetByIdApiArg = {
  id: number;
};
export type GetApiMyWebHostGetLoginSessionByIdApiResponse =
  /** status 200 OK */ GetLoginSessionResponse;
export type GetApiMyWebHostGetLoginSessionByIdApiArg = {
  id: number;
};
export type PostApiMyWebHostCheckDomainApiResponse = unknown;
export type PostApiMyWebHostCheckDomainApiArg = {
  checkWebHostDomainModel: CheckWebHostDomainModel;
};
export type PostApiMyWebHostCreateApiResponse = unknown;
export type PostApiMyWebHostCreateApiArg = {
  createWebHostModel: CreateWebHostModel;
};
export type PutApiMyWebHostEditApiResponse = unknown;
export type PutApiMyWebHostEditApiArg = {
  editWebHostModel: EditWebHostModel;
};
export type DeleteApiMyWebHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyWebHostDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyPortalWebsiteAlarmListApiResponse =
  /** status 200 OK */ WebSiteAlarmListResponse[];
export type GetApiMyPortalWebsiteAlarmListApiArg = void;
export type GetApiMyPortalWebsiteBlogListApiResponse =
  /** status 200 OK */ WebSiteBolgListResponse[];
export type GetApiMyPortalWebsiteBlogListApiArg = void;
export type GetApiMyPortalWebsiteBlogGetByLinkApiResponse =
  /** status 200 OK */ GetWebSiteBolgResponse;
export type GetApiMyPortalWebsiteBlogGetByLinkApiArg = {
  link: string;
};
export type GetApiMyPortalWebsiteBlogGetRandomArticlesByLinkApiResponse =
  /** status 200 OK */ GetWebSiteRandomArticleResponse[];
export type GetApiMyPortalWebsiteBlogGetRandomArticlesByLinkApiArg = {
  link: string;
};
export type GetApiMyPortalWebsiteBlogGetHeaderArticlesApiResponse =
  /** status 200 OK */ GetWebSiteHeaderArticleResponse[];
export type GetApiMyPortalWebsiteBlogGetHeaderArticlesApiArg = void;
export type GetApiMyPortalWebsiteBlogCommentGetByIdApiResponse =
  /** status 200 OK */ GetWebSiteBolgCommentResponse[];
export type GetApiMyPortalWebsiteBlogCommentGetByIdApiArg = {
  id: number;
};
export type PostApiMyPortalWebsiteBlogCommentCreateApiResponse = unknown;
export type PostApiMyPortalWebsiteBlogCommentCreateApiArg = {
  createWebSiteBolgCommentModel: CreateWebSiteBolgCommentModel;
};
export type PostApiMyPortalContactUsCreateApiResponse = unknown;
export type PostApiMyPortalContactUsCreateApiArg = {
  createContactUsModel: CreateContactUsModel;
};
export type PostApiMyPortalNewsCreateApiResponse = unknown;
export type PostApiMyPortalNewsCreateApiArg = {
  createNewsLetterModel: CreateNewsLetterModel;
};
export type PostApiMyDomainWhoisGetApiResponse = unknown;
export type PostApiMyDomainWhoisGetApiArg = {
  getDomainWhoisModel: GetDomainWhoisModel;
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
export type LoginModel = {
  email: string;
  password: string;
  captchaKey?: string | null;
  captchaCode?: string | null;
};
export type SsoLoginResponse = {
  url: string | null;
};
export type SsoLoginModel = {
  code: string | null;
};
export type TwoFactorLoginModel = {
  email: string;
  confirmCode: number;
};
export type RegisterModel = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  referralCode?: string | null;
  captchaKey?: string;
  captchaCode: string | null;
};
export type ForgotModel = {
  email: string;
  captchaKey?: string;
  captchaCode: string | null;
};
export type ForgotConfirmModel = {
  email: string;
  confirmCode: number;
  password: string;
};
export type CaptchaResponse = {
  base64CaptchaImage: string | null;
  captchaKey: string;
};
export type BareMetalListResponse = {
  id: number;
  name: string | null;
  status: string | null;
  statusId?: number;
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
  statusId?: number;
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
export type BusinessUnitListResponse = {
  id: number;
  name: string | null;
};
export type CalculateMonthListResponse = {
  id?: number;
  name: string | null;
};
export type GetCdnCertResponse = {
  issuer?: string | null;
  commonName?: string | null;
  expirationDate?: string | null;
};
export type CreateCdnEdgeCertModel = {
  dnsCdnHostId?: number;
};
export type CreateCdnEdgeUserCertModel = {
  dnsCdnHostId?: number;
  keyPem: string;
  certPem: string;
  bundleCertPem?: string | null;
};
export type CreateCdnOriginUserCertModel = {
  dnsCdnHostId?: number;
  keyPem: string;
  certPem: string;
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
  id?: number;
  host: string;
  loadBalancingPolicyId: number;
  maxConnectionsPerServer: number;
  dangerousAcceptAnyServerCertificate: boolean;
  destinations: DestinationModel[] | null;
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
export type CommissionListResponse = {
  id?: number;
  walletTransactionId?: number;
  totalPrice?: number;
  commissionPrice?: number;
  commissionDate?: string;
};
export type GetCustomerResponse = {
  id: number;
  name: string | null;
  nationalId?: string | null;
  registrationNumber?: string | null;
  registrationDate?: string | null;
  phone?: string | null;
  status: string | null;
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
export type CustomerBillListResponse = {
  id: number;
  calculateMonthId: number;
  calculateMonth: string | null;
  billDate: string;
  netPrice: number;
  vat: number;
  totalPrice: number;
};
export type CustomerBillShortListResponse = {
  id: number;
  billDate: string;
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
export type CustomerProductListResponse = {
  id: number;
  name: string | null;
  product: string | null;
  productId: number;
  customerProduct: string | null;
  status: string | null;
  createDate: string;
};
export type CustomerProductShortListResponse = {
  id: number;
  product: string | null;
  customerProduct: string | null;
  createDate: string;
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
export type AccessTupleModel = {
  accessId: number;
  hasAccess: boolean;
};
export type RoleAccessListModel = {
  roleAccessTypeId: number;
  roleId: number;
  accessTuples?: AccessTupleModel[] | null;
};
export type CreateCustomerUserModel = {
  userName: string;
  isSuperUser: boolean;
  isFinancialManager: boolean;
  isAccountManager: boolean;
  roleAccesses?: RoleAccessListModel[] | null;
};
export type ChangeCustomerUserResponse = {
  isSuperUser: boolean;
  isFinancialManager: boolean;
  isAccountManager: boolean;
  roles?: number[] | null;
};
export type ChangeCustomerUserModel = {
  customerId?: number;
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
export type DatacenterListResponse = {
  id: number;
  name: string | null;
  photoName?: string | null;
};
export type DatacenterImageListResponse = {
  id: number;
  name: string | null;
  osId: number;
  os: string | null;
};
export type DatacenterIpListResponse = {
  id?: number;
  ip?: string | null;
  isV4?: boolean;
  isPrimary?: boolean;
};
export type DnsCdnListResponse = {
  id?: number;
  zoneName: string | null;
  zoneStatus: string | null;
  zoneStatusId?: number;
  createDate?: string;
};
export type GetDnsCdnResponse = {
  id?: number;
  zoneName: string | null;
  statusId: number;
  status: string | null;
  createDate: string;
  modifyDate: string;
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
export type GetCdnAnalyticResponse = {
  categories?: string[] | null;
  series?: SeriesModel[] | null;
};
export type GetDnsNsResponse = {
  status?: boolean;
  ns?: string[] | null;
  cloudNs?: string[] | null;
};
export type CheckDnsCdnModel = {
  zoneName: string;
};
export type CreateDnsCdnModel = {
  zoneName: string;
};
export type ChangeCdnTypeModel = {
  id?: number;
  cdnHostTypeId?: number;
};
export type ChangeOriginCertTypeModel = {
  id?: number;
  cdnHostOriginCertTypeId?: number;
};
export type ChangeEdgeCertTypeModel = {
  id?: number;
  cdnHostEdgeCertTypeId?: number;
};
export type ChangeHstsModel = {
  id?: number;
  isHsts?: boolean;
};
export type ChangeHttpsRedirectModel = {
  id?: number;
  isHttpsRedirect?: boolean;
};
export type ChangeNonWwwRedirectModel = {
  id?: number;
  isNonWwwRedirect?: boolean;
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
  id?: number;
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
export type GetDomainResponse = {
  id: number;
  domainName: string | null;
  status: string | null;
  statusId: number;
  type: string | null;
  createDate: string;
  expireDate?: string | null;
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
};
export type DomainGetStatusResponse = {
  statusId?: number;
};
export type CheckDomainModel = {
  domainName: string;
  ext: string;
};
export type RegisterDomainModel = {
  domainName: string;
  ext: string;
  productId: number;
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
  id: number;
  ns1: string;
  ns2: string;
};
export type EquipmentListResponse = {
  id: number;
  name: string | null;
  type: string | null;
  typeId: number;
  brand: string | null;
  brandId: number;
};
export type EquipmentBrandListResponse = {
  id: number;
  name: string | null;
};
export type EquipmentTypeListResponse = {
  id: number;
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
export type VmProjectCreateModel = {
  name: string;
  hypervisorTypeId: number;
  datacenterId: number;
};
export type VmProjectEditModel = {
  name: string;
};
export type HypervisorTypeListResponse = {
  id?: number;
  name: string | null;
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
export type PayInvoiceResponse = {
  status: boolean;
  location: string | null;
};
export type PayInvoiceModel = {
  id?: number;
};
export type InvoiceSummaryResponse = {
  totalPaid: number;
  totalUnpaid: number;
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
export type IssueShortListResponse = {
  id: number;
  issueSubject: string | null;
  issueStatus: string | null;
  createDate: string;
  modifyDate?: string | null;
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
export type IssueSubjectListResponse = {
  id: number;
  name: string | null;
};
export type IssueSubjectSelectListModel = {
  productId?: number;
  businessUnitId?: number;
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
export type CreateKuberCloudConfigmapModel = {
  name: string;
  namespaceId: number;
  envs: {
    [key: string]: string;
  };
  alias?: string | null;
  description?: string | null;
};
export type KuberCloudDeploymentListResponse = {
  id: number;
  name: string | null;
  image: string | null;
  namespace: string | null;
  createDate: string;
};
export type GetKuberCloudDeploymentResponse = {
  id: number;
  name: string | null;
  image: string | null;
  replica: number;
  nodePort: number;
  servicePort: number;
  namespace: string | null;
  createDate: string;
  modifyDate: string;
};
export type CreateKuberCloudDeploymentModel = {
  name: string;
  imageTagId: number;
  namespaceId: number;
  keyValue?: {
    [key: string]: {
      [key: string]: string;
    } | null;
  } | null;
  replicaNumber?: number;
};
export type KuberCloudHostListResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  status: string | null;
  statusId: number;
  createDate: string;
};
export type KuberCloudHostGetResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  status: string | null;
  statusId: number;
  createDate: string;
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
export type EditKuberCloudHostModel = {
  id: number;
  cpu: number;
  memory: number;
  disk: number;
  tenPods: number;
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
export type KuberCloudImageCategoryResponse = {
  id: number;
  name: string | null;
};
export type KuberCloudImageKeysRespones = {
  id: number;
  name: string | null;
};
export type KuberCloudImageKeyListResponse = {
  id: number;
  name: string | null;
  keys: KuberCloudImageKeysRespones[] | null;
};
export type KuberCloudImageTagListResponse = {
  id: number;
  name: string | null;
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
  domainName: string | null;
  serviceName: string | null;
  port: number;
  createDate: string;
  modifiyDate: string;
};
export type GetKuberCloudIngressResponse = {
  id: number;
  name: string | null;
  rules: RulesResponse[] | null;
  createDate: string;
};
export type RuleModelRequest = {
  domainName: string | null;
  path: string | null;
  kuberCloudDeployPortId: number;
};
export type CreateKuberCloudIngressModel = {
  name: string;
  rules: RuleModelRequest[];
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
  expireDate?: string | null;
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
export type KubernetesVersionListResponse = {
  id: number;
  name: string | null;
};
export type NotificationListResponse = {
  id: number;
  content: string | null;
  subject: string | null;
  isRead: boolean;
  notificationDate: string;
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
export type PaymentResponse = {
  status: boolean;
  location: string | null;
  phoneNumber?: string | null;
  refId?: string | null;
};
export type PaymentModel = {
  paymentProviderId?: number;
  offerId: number;
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
export type PaymentProviderListResponse = {
  id: number;
  name: string | null;
  isDisabled: boolean;
  photoName?: string | null;
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
export type ProductBundleWebListResponse = {
  id: number;
  name: string | null;
  price: number;
  quantity?: number;
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
export type ProductBundleVpcListResponse = {
  id: number;
  name: string | null;
  price: number;
  rules10: number;
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
export type ProductItemListResponse = {
  id: number;
  name: string | null;
  price: number;
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
export type GetProfileResponse = {
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
};
export type GetNotificationStatusResponse = {
  id: string;
  phoneNotify: boolean;
  emailNotify: boolean;
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
export type TwoFactorModel = {
  twoFactorStatus: boolean;
};
export type ChangePasswordModel = {
  currentPassword: string;
  password: string;
};
export type GetReferralResponse = {
  id: number;
  referralCode: string | null;
  referralLink: string | null;
};
export type CustomerReferralListResponse = {
  customer: string | null;
  commissionPercent: number;
  joinDate: string;
};
export type RoleListResponse = {
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
export type EditRoleAccessModel = {
  userName: string;
  isSuperUser: boolean;
  isFinancialManager: boolean;
  isAccountManager: boolean;
  roleAccesses?: RoleAccessListModel[] | null;
};
export type RoleAccessTypeListResponse = {
  id: number;
  name: string | null;
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
  expireDate?: string | null;
};
export type CreateStorageHostModel = {
  name: string;
  isPublic: boolean;
  datacenterId: number;
  storageHostTypeId: number;
  isPredefined: boolean;
  productBundleId?: number | null;
  disk?: number | null;
};
export type EditStorageHostModel = {
  id?: number;
  disk?: number;
  storageHostTypeId?: number;
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
export type LogUserResponse = {
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
export type LogUserResponseListPagedResponse = {
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  totalRecords?: number;
  data?: LogUserResponse[] | null;
};
export type VmListResponse = {
  id?: number;
  name: string | null;
  status: string | null;
  statusId?: number;
  datacenter: string | null;
  operatingSystem: string | null;
  ipv4?: string | null;
  createDate?: string;
};
export type VmShortListResponse = {
  id?: number;
  name: string | null;
};
export type GetVmResponse = {
  id: number;
  datacenterId: number;
  name: string | null;
  operatingSystem: string | null;
  operatingSystemId: number;
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
export type CreateVmModel = {
  name: string;
  password: string;
  publicKey?: string | null;
  imageId: number;
  isPredefined: boolean;
  vmProjectId: number;
  productBundleId?: number | null;
  cpu?: number | null;
  memory?: number | null;
  disk?: number | null;
  vpcHostNetworkId?: number | null;
  ipAddress?: string | null;
};
export type EditVmModel = {
  id: number;
  cpu: number;
  memory: number;
  disk: number;
};
export type RebuildVmModel = {
  id: number;
  name: string | null;
  password: string;
  publicKey?: string | null;
  imageId: number;
};
export type IsoListResponse = {
  id?: number;
  name: string | null;
};
export type MountModel = {
  id?: number;
  vmId?: number;
};
export type UnmountModel = {
  id: number;
  vmId: number;
};
export type GetRemoteConsoleResponse = {
  location: string | null;
  vmTypeId: number;
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
export type RevertSnapshotModel = {
  snapshotId: number;
};
export type UseVoucherModel = {
  voucherCode: string;
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
export type VpcShortListResponse = {
  id: number;
  name: string | null;
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
export type CreateVpcHostDefaultNetworks = {
  name: string | null;
  gatewayCidr: string | null;
};
export type CreateVpcHostModel = {
  name: string;
  datacenterId: number;
  productBundleId: number;
  hypervisorTypeId?: number;
  defaultNetworks?: CreateVpcHostDefaultNetworks[] | null;
};
export type EditVpcHostModel = {
  name: string;
};
export type GetVpcGatewayResponse = {
  id: number;
  name: string | null;
  status: string | null;
  datacenterId: number;
  createDate: string;
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
export type GetVpcGatewayNatResponse = {
  id: number;
  natTypeId: number;
  natTypeName: string | null;
  name: string | null;
  sourceIp: string | null;
  sourcePort: number;
  destinationIp: string | null;
  destinationPort: number;
  isDisabled: boolean;
  translateIp: string | null;
  sequence?: number;
  vpcHostServiceName?: string | null;
  serviceId?: number | null;
  description?: string | null;
  createDate: string;
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
export type VpcNetworkListResponse = {
  id: number;
  gatewayCidr: string | null;
  subnetMask: string | null;
  subnetCidr: string | null;
  name: string | null;
  status: string | null;
  datacenter: string | null;
  createDate: string;
};
export type VpcNetworkShortListResponse = {
  id: number;
  name: string | null;
};
export type CreateVpcNetworkModel = {
  vpcHostId: number;
  name: string | null;
  gatewayCidr: string | null;
};
export type EditVmNetworkModel = {
  vpcHostId: number;
  vmHostId: number;
  vpcHostNetworkId: number;
};
export type CreateVpcStaticRouteModel = {
  vpcHostId: number;
  name: string | null;
  destinationIp: string | null;
  gatewayIp: string;
  description?: string | null;
};
export type EditVpcStaticRouteModel = {
  id: number;
  vpcHostId: number;
  name: string | null;
  vpcHostServiceId?: number | null;
  sourceIp?: string | null;
  destinationIp?: string | null;
  destinationPort?: number | null;
  translateIp?: string | null;
  description?: string | null;
  isDisabled?: boolean;
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
export type WalletTransactionListResponse = {
  id: number;
  transactionDate: string;
  credit: number;
  debit: number;
  balance: number;
  description?: string | null;
};
export type BalanceUsageResponse = {
  balance: number;
  toDate: string;
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
export type GetWebHostResponse = {
  id: number;
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
export type CheckWebHostDomainModel = {
  domainName: string;
};
export type CreateWebHostModel = {
  domainName: string;
  datacenterId: number;
  productBundleId?: number;
};
export type EditWebHostModel = {
  id: number;
  productBundleId: number;
};
export type WebSiteAlarmListResponse = {
  subject?: string | null;
  link?: string | null;
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
export type CreateContactUsModel = {
  firstName: string;
  lastName: string;
  email: string;
  content: string;
  captchaKey: string;
  captchaCode: string;
};
export type CreateNewsLetterModel = {
  email: string;
  captchaKey: string;
  captchaCode: string;
};
export type GetDomainWhoisModel = {
  domainName: string;
  ext: string;
};
export const {
  usePostApiMyAccountLoginMutation,
  useGetApiMyAccountSsoUrlQuery,
  usePostApiMyAccountSsoLoginMutation,
  usePostApiMyAccountTwoFactorLoginMutation,
  usePostApiMyAccountRegisterMutation,
  usePostApiMyAccountForgotMutation,
  usePostApiMyAccountForgotConfirmMutation,
  usePostApiMyAccountLogoutMutation,
  useGetApiMyAccountCaptchaQuery,
  useGetApiMyBareMetalHostListQuery,
  useGetApiMyBareMetalHostGetByIdQuery,
  usePostApiMyBareMetalHostCreateMutation,
  useDeleteApiMyBareMetalHostDeleteByIdMutation,
  useGetApiMyPortalBusinessUnitListQuery,
  useGetApiMyPortalCalculateMonthListQuery,
  useGetApiMyDnsCdnEdgeCertGetByDnsCdnHostIdQuery,
  useGetApiMyDnsCdnEdgeCertGetUserCertByDnsCdnHostIdQuery,
  usePostApiMyDnsCdnEdgeCertCreateMutation,
  usePostApiMyDnsCdnEdgeCertCreateUserCertMutation,
  useGetApiMyDnsCdnOriginCertGetByDnsCdnHostIdQuery,
  useGetApiMyDnsCdnOriginCertGetUserCertByDnsCdnHostIdQuery,
  usePostApiMyDnsCdnOriginCertCreateUserCertMutation,
  useGetApiMyDnsCdnRouteListByDnsCdnHostIdQuery,
  useGetApiMyDnsCdnRouteGetByIdQuery,
  usePutApiMyDnsCdnRouteEditMutation,
  useDeleteApiMyDnsCdnRouteDeleteByIdMutation,
  useGetApiMyColocationHostListQuery,
  useGetApiMyColocationHostGetByIdQuery,
  usePostApiMyColocationHostCreateMutation,
  useDeleteApiMyColocationHostDeleteByIdMutation,
  useGetApiMyPortalCommissionListQuery,
  useGetApiMyPortalCustomerGetQuery,
  usePutApiMyPortalCustomerEditMutation,
  usePutApiMyPortalCustomerConvertToLegalMutation,
  useGetApiMyPortalCustomerBillListQuery,
  useGetApiMyPortalCustomerBillShortListQuery,
  useGetApiMyPortalCustomerBillGetByIdQuery,
  useGetApiMyPortalCustomerBillDownloadByIdQuery,
  useGetApiMyPortalCustomerProductListByProductIdQuery,
  useGetApiMyPortalCustomerProductShortListQuery,
  useGetApiMyPortalCustomerUserListQuery,
  usePostApiMyPortalCustomerUserCreateMutation,
  useDeleteApiMyPortalCustomerUserDeleteByUserIdMutation,
  usePostApiMyPortalCustomerUserChangeMutation,
  useGetApiMyDashboardUsageByCategoryIdQuery,
  useGetApiMyDashboardFinancialQuery,
  useGetApiMyDatacenterListQuery,
  useGetApiMyDatacenterImageListQuery,
  useGetApiMyDatacenterIpListByIdQuery,
  useDeleteApiMyDatacenterIpDeleteByIdMutation,
  useGetApiMyDnsCdnHostListQuery,
  useGetApiMyDnsCdnHostGetByIdQuery,
  useGetApiMyDnsCdnHostGetCdnByIdQuery,
  useGetApiMyDnsCdnHostGetCdnAnalyticByIdAndPeriodIdQuery,
  useGetApiMyDnsCdnHostGetNsByIdQuery,
  usePostApiMyDnsCdnHostCheckMutation,
  usePostApiMyDnsCdnHostCreateMutation,
  useDeleteApiMyDnsCdnHostDeleteByIdMutation,
  usePutApiMyDnsCdnHostChangeCdnTypeMutation,
  usePutApiMyDnsCdnHostChangeOriginCertTypeMutation,
  usePutApiMyDnsCdnHostChangeEdgeCertTypeMutation,
  usePutApiMyDnsCdnHostChangeHstsMutation,
  usePutApiMyDnsCdnHostChangeHttpsRedirectMutation,
  usePutApiMyDnsCdnHostChangeNonWwwRedirectMutation,
  useGetApiMyDnsCdnDnsRecordListByDnsCdnHostIdQuery,
  useGetApiMyDnsCdnDnsRecordGetByIdQuery,
  usePostApiMyDnsCdnDnsRecordCreateMutation,
  usePutApiMyDnsCdnDnsRecordEditMutation,
  useDeleteApiMyDnsCdnDnsRecordDeleteByIdMutation,
  usePutApiMyDnsCdnDnsRecordChangeProxyStatusByIdMutation,
  useGetApiMyDomainHostListQuery,
  useGetApiMyDomainHostGetByIdQuery,
  usePostApiMyDomainHostGetStatusByIdMutation,
  usePostApiMyDomainHostCheckDomainMutation,
  usePostApiMyDomainHostRegisterMutation,
  useDeleteApiMyDomainHostDeleteByIdMutation,
  usePutApiMyDomainHostChangeContactMutation,
  usePutApiMyDomainHostChangeNsMutation,
  usePostApiMyDomainHostResendVerificationByIdMutation,
  useGetApiMyColocationEquipmentListByTypeIdAndBrandIdQuery,
  useGetApiMyColocationEquipmentBrandListQuery,
  useGetApiMyColocationEquipmentTypeListQuery,
  useGetApiMyHomeIndexQuery,
  useGetApiMyVmProjectListQuery,
  useGetApiMyVmProjectGetByIdQuery,
  usePostApiMyVmProjectCreateMutation,
  usePutApiMyVmProjectEditByIdMutation,
  useDeleteApiMyVmProjectDeleteByIdMutation,
  useGetApiMyVmHypervisorListQuery,
  useGetApiMyPortalInvoiceListQuery,
  useGetApiMyPortalInvoiceUnpaidQuery,
  useGetApiMyPortalInvoiceGetByIdQuery,
  usePostApiMyPortalInvoicePayMutation,
  useGetApiMyPortalInvoiceSummaryQuery,
  useGetApiMyPortalIssueListQuery,
  useGetApiMyPortalIssueShortListQuery,
  usePostApiMyPortalIssueCreateMutation,
  useGetApiMyPortalIssueItemListByIssueIdQuery,
  usePostApiMyPortalIssueItemCreateMutation,
  useGetApiMyPortalIssueItemDownloadByIdQuery,
  useGetApiMyPortalIssueSubjectListQuery,
  usePostApiMyPortalIssueSubjectSelectListMutation,
  useGetApiMyKubernetesCloudConfigmapListByIdQuery,
  useGetApiMyKubernetesCloudConfigmapGetByIdQuery,
  usePostApiMyKubernetesCloudConfigmapCreateMutation,
  useDeleteApiMyKubernetesCloudConfigmapDeleteByIdMutation,
  useGetApiMyKubernetesCloudDeploymentListQuery,
  useGetApiMyKubernetesCloudDeploymentGetByIdQuery,
  usePostApiMyKubernetesCloudDeploymentCreateMutation,
  useDeleteApiMyKubernetesCloudDeploymentDeleteByIdMutation,
  useGetApiMyKubernetesCloudHostListQuery,
  useGetApiMyKubernetesCloudHostGetByIdQuery,
  usePostApiMyKubernetesCloudHostCreateMutation,
  usePutApiMyKubernetesCloudHostEditMutation,
  useDeleteApiMyKubernetesCloudHostDeleteByIdMutation,
  useGetApiMyKubernetesCloudImageListQuery,
  useGetApiMyKubernetesCloudCategoryListQuery,
  useGetApiMyKubernetesCloudImageKeyGetByIdQuery,
  useGetApiMyKubernetesCloudImageTagListByIdQuery,
  useGetApiMyKubernetesCloudIngressListQuery,
  useGetApiMyKubernetesCloudIngressGetByIdQuery,
  usePostApiMyKubernetesCloudIngressCreateMutation,
  useDeleteApiMyKubernetesCloudIngressDeleteByIdMutation,
  useGetApiMyKubernetesCloudSecretListByIdQuery,
  useGetApiMyKubernetesCloudSecretGetByIdQuery,
  usePostApiMyKubernetesCloudSecretCreateMutation,
  useDeleteApiMyKubernetesCloudSecretDeleteByIdMutation,
  useGetApiMyKubernetesClusterHostListQuery,
  useGetApiMyKubernetesClusterHostGetByIdQuery,
  usePostApiMyKubernetesClusterHostCreateMutation,
  useDeleteApiMyKubernetesClusterHostDeleteByIdMutation,
  useGetApiMyKubernetesClusterNodeListByKubernetesHostIdQuery,
  usePostApiMyKubernetesClusterNodeCreateMutation,
  usePutApiMyKubernetesClusterNodeDeleteByIdMutation,
  useGetApiMyKubernetesClusterVersionListQuery,
  useGetApiMyPortalNotificationListQuery,
  useGetApiMyPortalNotificationShortListQuery,
  usePutApiMyPortalNotificationSeenByIdMutation,
  useGetApiMyPortalOfferListQuery,
  useGetApiMyPortalOfferGetByIdQuery,
  usePostApiMyPortalOfferPaymentMutation,
  useGetApiMyPortalPaymentListQuery,
  useGetApiMyPortalPaymentGetByIdQuery,
  usePostApiMyPortalPaymentCreateMutation,
  usePostApiMyPortalPaymentPecCallBackMutation,
  usePostApiMyPortalPaymentSepCallBackMutation,
  usePostApiMyPortalPaymentBpmCallBackMutation,
  useGetApiMyPortalPaymentProviderListQuery,
  useGetApiMyPortalProductListQuery,
  useGetApiMyPortalProductGetByIdQuery,
  useGetApiMyPortalProductBundleVmListQuery,
  useGetApiMyPortalProductBundleStorageListQuery,
  useGetApiMyPortalProductBundleWebListQuery,
  useGetApiMyPortalProductBundleKuberClusterListQuery,
  useGetApiMyPortalProductBundleVpcListQuery,
  useGetApiMyPortalProductBundleKuberCloudListQuery,
  useGetApiMyPortalProductBundleBareMetalListQuery,
  useGetApiMyPortalProductItemListByProductIdQuery,
  useGetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountQuery,
  useGetApiMyPortalProfileGetQuery,
  useGetApiMyPortalProfileGetNotificationStatusQuery,
  usePutApiMyPortalProfileEditMutation,
  usePutApiMyPortalProfileEditEmailMutation,
  usePostApiMyPortalProfileConfirmEmailMutation,
  usePutApiMyPortalProfileEditPhoneNumberMutation,
  usePostApiMyPortalProfileConfirmPhoneNumberMutation,
  usePutApiMyPortalProfileEditEmailNotificationMutation,
  usePutApiMyPortalProfileEditPhoneNotificationMutation,
  usePutApiMyPortalProfileEditTwoFactorMutation,
  usePostApiMyPortalProfileChangePasswordMutation,
  useGetApiMyPortalPromotionRedirectLinkByCodeQuery,
  useGetApiMyPortalReferralGetQuery,
  useGetApiMyPortalReferralCustomerByReferralIdListQuery,
  useGetApiMyPortalRoleListQuery,
  useGetApiMyPortalRoleAccessListByUserIdQuery,
  usePutApiMyPortalRoleAccessEditMutation,
  useGetApiMyPortalRoleAccessTypeListQuery,
  useGetApiMyStorageHostListQuery,
  useGetApiMyStorageHostGetByIdQuery,
  usePostApiMyStorageHostCreateMutation,
  usePutApiMyStorageHostEditMutation,
  useDeleteApiMyStorageHostDeleteByIdMutation,
  useGetApiMyStorageUserListByStorageHostIdQuery,
  usePostApiMyStorageUserCreateMutation,
  useDeleteApiMyStorageUserDeleteByIdMutation,
  useGetApiMyPortalUserLogListQuery,
  useGetApiMyVmHostListByVmProjectIdQuery,
  useGetApiMyVmHostShortListByHypervisorTypeIdQuery,
  useGetApiMyVmHostGetByIdQuery,
  usePostApiMyVmHostCreateMutation,
  usePutApiMyVmHostEditMutation,
  useDeleteApiMyVmHostDeleteByIdMutation,
  usePutApiMyVmHostRebuildMutation,
  usePutApiMyVmHostConnectByIdMutation,
  usePutApiMyVmHostDisconnectByIdMutation,
  usePutApiMyVmHostRebootByIdMutation,
  usePutApiMyVmHostShutdownByIdMutation,
  usePutApiMyVmHostResetByIdMutation,
  usePutApiMyVmHostStartByIdMutation,
  usePutApiMyVmHostStopByIdMutation,
  useGetApiMyVmIsoListByDatacenterIdQuery,
  usePutApiMyVmIsoMountMutation,
  usePutApiMyVmIsoUnmountMutation,
  useGetApiMyVmKmsGetByIdAndTypeIdQuery,
  useGetApiMyVmSnapshotListByVmIdQuery,
  useGetApiMyVmSnapshotGetByIdQuery,
  usePostApiMyVmSnapshotCreateMutation,
  usePutApiMyVmSnapshotRevertMutation,
  useDeleteApiMyVmSnapshotDeleteByIdMutation,
  useDeleteApiMyVmSnapshotDeleteAllByVmHostIdMutation,
  usePostApiMyPortalVoucherUseMutation,
  useGetApiMyVpcHostListQuery,
  useGetApiMyVpcHostShortListQuery,
  useGetApiMyVpcHostGetByIdQuery,
  usePostApiMyVpcHostCreateMutation,
  usePutApiMyVpcHostEditByIdMutation,
  useDeleteApiMyVpcHostDeleteByIdMutation,
  useGetApiMyVpcGatewayGetByVpcHostIdQuery,
  useGetApiMyVpcIpListByVpcHostIdQuery,
  usePostApiMyVpcIpCreateMutation,
  useDeleteApiMyVpcIpDeleteByIdMutation,
  useGetApiMyVpcNatListByVpcHostIdQuery,
  useGetApiMyVpcNatGetByIdQuery,
  usePostApiMyVpcNatCreateDnatMutation,
  usePostApiMyVpcNatCreateSnatMutation,
  usePutApiMyVpcNatIncreaseSequenceByVpcHostIdAndIdMutation,
  usePutApiMyVpcNatDecreaseSequenceByVpcHostIdAndIdMutation,
  useDeleteApiMyVpcNatDeleteByIdMutation,
  useGetApiMyVpcLoadBalanceListByVpcHostIdQuery,
  usePostApiMyVpcLoadBalanceCreateMutation,
  useDeleteApiMyVpcLoadBalanceDeleteByIdMutation,
  useGetApiMyVpcNetworkListByVpcHostIdQuery,
  useGetApiMyVpcNetworkShortListByVpcHostIdQuery,
  usePostApiMyVpcNetworkCreateMutation,
  usePostApiMyVpcNetworkEditVmNetworkMutation,
  useDeleteApiMyVpcNetworkDeleteByIdMutation,
  useGetApiMyVpcStaticRouteListByVpcHostIdQuery,
  useGetApiMyVpcStaticRouteGetByIdQuery,
  usePostApiMyVpcStaticRouteCreateMutation,
  usePutApiMyVpcStaticRouteEditMutation,
  usePostApiMyVpcStaticRouteDeleteByIdMutation,
  useGetApiMyVpcTranslateListQuery,
  usePostApiMyVpcTranslateCreateMutation,
  useDeleteApiMyVpcTranslateDeleteByIdMutation,
  useGetApiMyPortalWalletGetBalanceQuery,
  useGetApiMyPortalWalletTransactionListQuery,
  useGetApiMyPortalWalletTransactionBalanceUsageQuery,
  useGetApiMyWebHostListQuery,
  useGetApiMyWebHostGetByIdQuery,
  useGetApiMyWebHostGetLoginSessionByIdQuery,
  usePostApiMyWebHostCheckDomainMutation,
  usePostApiMyWebHostCreateMutation,
  usePutApiMyWebHostEditMutation,
  useDeleteApiMyWebHostDeleteByIdMutation,
  useGetApiMyPortalWebsiteAlarmListQuery,
  useGetApiMyPortalWebsiteBlogListQuery,
  useGetApiMyPortalWebsiteBlogGetByLinkQuery,
  useGetApiMyPortalWebsiteBlogGetRandomArticlesByLinkQuery,
  useGetApiMyPortalWebsiteBlogGetHeaderArticlesQuery,
  useGetApiMyPortalWebsiteBlogCommentGetByIdQuery,
  usePostApiMyPortalWebsiteBlogCommentCreateMutation,
  usePostApiMyPortalContactUsCreateMutation,
  usePostApiMyPortalNewsCreateMutation,
  usePostApiMyDomainWhoisGetMutation,
} = api;

