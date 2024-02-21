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
    getApiMyBareMetalImageListByDatacenterId: build.query<
      GetApiMyBareMetalImageListByDatacenterIdApiResponse,
      GetApiMyBareMetalImageListByDatacenterIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/bare-metal/image/list/${queryArg.datacenterId}`,
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
    getApiMyCdnAnalyticGetByCdnIdAndPeriodId: build.query<
      GetApiMyCdnAnalyticGetByCdnIdAndPeriodIdApiResponse,
      GetApiMyCdnAnalyticGetByCdnIdAndPeriodIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/analytic/get/${queryArg.cdnId}/${queryArg.periodId}`,
      }),
    }),
    getApiMyCdnApiGatewayListByCdnId: build.query<
      GetApiMyCdnApiGatewayListByCdnIdApiResponse,
      GetApiMyCdnApiGatewayListByCdnIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/api-gateway/list/${queryArg.cdnId}`,
      }),
    }),
    getApiMyCdnApiGatewayGetById: build.query<
      GetApiMyCdnApiGatewayGetByIdApiResponse,
      GetApiMyCdnApiGatewayGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/api-gateway/get/${queryArg.id}`,
      }),
    }),
    postApiMyCdnApiGatewayCreate: build.mutation<
      PostApiMyCdnApiGatewayCreateApiResponse,
      PostApiMyCdnApiGatewayCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/api-gateway/create`,
        method: "POST",
        body: queryArg.createApiGatewayModel,
      }),
    }),
    putApiMyCdnApiGatewayEdit: build.mutation<
      PutApiMyCdnApiGatewayEditApiResponse,
      PutApiMyCdnApiGatewayEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/api-gateway/edit`,
        method: "PUT",
        body: queryArg.editApiGatewayModel,
      }),
    }),
    deleteApiMyCdnApiGatewayDeleteById: build.mutation<
      DeleteApiMyCdnApiGatewayDeleteByIdApiResponse,
      DeleteApiMyCdnApiGatewayDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/api-gateway/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyCdnClientCertGetByCdnId: build.query<
      GetApiMyCdnClientCertGetByCdnIdApiResponse,
      GetApiMyCdnClientCertGetByCdnIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/client-cert/get/${queryArg.cdnId}`,
      }),
    }),
    getApiMyCdnClientCertGetUserCertByCdnId: build.query<
      GetApiMyCdnClientCertGetUserCertByCdnIdApiResponse,
      GetApiMyCdnClientCertGetUserCertByCdnIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/client-cert/get-user-cert/${queryArg.cdnId}`,
      }),
    }),
    postApiMyCdnClientCertCreateUserCert: build.mutation<
      PostApiMyCdnClientCertCreateUserCertApiResponse,
      PostApiMyCdnClientCertCreateUserCertApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/client-cert/create-user-cert`,
        method: "POST",
        body: queryArg.createCdnClientUserCertModel,
      }),
    }),
    getApiMyCdnEdgeCertGetByCdnId: build.query<
      GetApiMyCdnEdgeCertGetByCdnIdApiResponse,
      GetApiMyCdnEdgeCertGetByCdnIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/edge-cert/get/${queryArg.cdnId}`,
      }),
    }),
    getApiMyCdnEdgeCertGetUserCertByCdnId: build.query<
      GetApiMyCdnEdgeCertGetUserCertByCdnIdApiResponse,
      GetApiMyCdnEdgeCertGetUserCertByCdnIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/edge-cert/get-user-cert/${queryArg.cdnId}`,
      }),
    }),
    postApiMyCdnEdgeCertCreate: build.mutation<
      PostApiMyCdnEdgeCertCreateApiResponse,
      PostApiMyCdnEdgeCertCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/edge-cert/create`,
        method: "POST",
        body: queryArg.createCdnEdgeCertModel,
      }),
    }),
    postApiMyCdnEdgeCertCreateUserCert: build.mutation<
      PostApiMyCdnEdgeCertCreateUserCertApiResponse,
      PostApiMyCdnEdgeCertCreateUserCertApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/edge-cert/create-user-cert`,
        method: "POST",
        body: queryArg.createCdnEdgeUserCertModel,
      }),
    }),
    getApiMyCdnHostList: build.query<
      GetApiMyCdnHostListApiResponse,
      GetApiMyCdnHostListApiArg
    >({
      query: () => ({ url: `/api/my/cdn/host/list` }),
    }),
    getApiMyCdnHostGetById: build.query<
      GetApiMyCdnHostGetByIdApiResponse,
      GetApiMyCdnHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/cdn/host/get/${queryArg.id}` }),
    }),
    getApiMyCdnHostGetNsStatusById: build.query<
      GetApiMyCdnHostGetNsStatusByIdApiResponse,
      GetApiMyCdnHostGetNsStatusByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/host/get-ns-status/${queryArg.id}`,
      }),
    }),
    getApiMyCdnHostOverviewById: build.query<
      GetApiMyCdnHostOverviewByIdApiResponse,
      GetApiMyCdnHostOverviewByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/host/overview/${queryArg.id}`,
      }),
    }),
    postApiMyCdnHostCheckZone: build.mutation<
      PostApiMyCdnHostCheckZoneApiResponse,
      PostApiMyCdnHostCheckZoneApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/host/check-zone`,
        method: "POST",
        body: queryArg.checkCdnModel,
      }),
    }),
    postApiMyCdnHostCreate: build.mutation<
      PostApiMyCdnHostCreateApiResponse,
      PostApiMyCdnHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/host/create`,
        method: "POST",
        body: queryArg.createCdnModel,
      }),
    }),
    deleteApiMyCdnHostDeleteById: build.mutation<
      DeleteApiMyCdnHostDeleteByIdApiResponse,
      DeleteApiMyCdnHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putApiMyCdnHostChangeCdnType: build.mutation<
      PutApiMyCdnHostChangeCdnTypeApiResponse,
      PutApiMyCdnHostChangeCdnTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/host/change-Cdn-type`,
        method: "PUT",
        body: queryArg.changeCdnTypeModel,
      }),
    }),
    putApiMyCdnHostChangeClientCertType: build.mutation<
      PutApiMyCdnHostChangeClientCertTypeApiResponse,
      PutApiMyCdnHostChangeClientCertTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/host/change-client-cert-type`,
        method: "PUT",
        body: queryArg.changeClientCertTypeModel,
      }),
    }),
    putApiMyCdnHostChangeEdgeCertType: build.mutation<
      PutApiMyCdnHostChangeEdgeCertTypeApiResponse,
      PutApiMyCdnHostChangeEdgeCertTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/host/change-edge-cert-type`,
        method: "PUT",
        body: queryArg.changeEdgeCertTypeModel,
      }),
    }),
    putApiMyCdnHostChangeHsts: build.mutation<
      PutApiMyCdnHostChangeHstsApiResponse,
      PutApiMyCdnHostChangeHstsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/host/change-hsts`,
        method: "PUT",
        body: queryArg.changeHstsModel,
      }),
    }),
    putApiMyCdnHostChangeHttpsRedirect: build.mutation<
      PutApiMyCdnHostChangeHttpsRedirectApiResponse,
      PutApiMyCdnHostChangeHttpsRedirectApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/host/change-https-redirect`,
        method: "PUT",
        body: queryArg.changeHttpsRedirectModel,
      }),
    }),
    putApiMyCdnHostChangeNonWwwRedirect: build.mutation<
      PutApiMyCdnHostChangeNonWwwRedirectApiResponse,
      PutApiMyCdnHostChangeNonWwwRedirectApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/host/change-non-www-redirect`,
        method: "PUT",
        body: queryArg.changeNonWwwRedirectModel,
      }),
    }),
    getApiMyCdnLoadBalanceListByCdnId: build.query<
      GetApiMyCdnLoadBalanceListByCdnIdApiResponse,
      GetApiMyCdnLoadBalanceListByCdnIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/load-balance/list/${queryArg.cdnId}`,
      }),
    }),
    getApiMyCdnLoadBalanceGetById: build.query<
      GetApiMyCdnLoadBalanceGetByIdApiResponse,
      GetApiMyCdnLoadBalanceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/load-balance/get/${queryArg.id}`,
      }),
    }),
    postApiMyCdnLoadBalanceCreate: build.mutation<
      PostApiMyCdnLoadBalanceCreateApiResponse,
      PostApiMyCdnLoadBalanceCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/load-balance/create`,
        method: "POST",
        body: queryArg.createLoadBalanceModel,
      }),
    }),
    putApiMyCdnLoadBalanceEdit: build.mutation<
      PutApiMyCdnLoadBalanceEditApiResponse,
      PutApiMyCdnLoadBalanceEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/load-balance/edit`,
        method: "PUT",
        body: queryArg.editLoadBalanceModel,
      }),
    }),
    deleteApiMyCdnLoadBalanceDeleteById: build.mutation<
      DeleteApiMyCdnLoadBalanceDeleteByIdApiResponse,
      DeleteApiMyCdnLoadBalanceDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/load-balance/delete/${queryArg.id}`,
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
    getApiMyPortalCustomerBillGetCustomerProductByCustomerBillIdAndCustomerProductId:
      build.query<
        GetApiMyPortalCustomerBillGetCustomerProductByCustomerBillIdAndCustomerProductIdApiResponse,
        GetApiMyPortalCustomerBillGetCustomerProductByCustomerBillIdAndCustomerProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/portal/customer-bill/get-customer-product/${queryArg.customerBillId}/${queryArg.customerProductId}`,
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
    getApiMyCdnDnsRecordListByCdnId: build.query<
      GetApiMyCdnDnsRecordListByCdnIdApiResponse,
      GetApiMyCdnDnsRecordListByCdnIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/dns-record/list/${queryArg.cdnId}`,
      }),
    }),
    getApiMyCdnDnsRecordGetById: build.query<
      GetApiMyCdnDnsRecordGetByIdApiResponse,
      GetApiMyCdnDnsRecordGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/dns-record/get/${queryArg.id}`,
      }),
    }),
    postApiMyCdnDnsRecordCreate: build.mutation<
      PostApiMyCdnDnsRecordCreateApiResponse,
      PostApiMyCdnDnsRecordCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/dns-record/create`,
        method: "POST",
        body: queryArg.createDnsRecordModel,
      }),
    }),
    putApiMyCdnDnsRecordEdit: build.mutation<
      PutApiMyCdnDnsRecordEditApiResponse,
      PutApiMyCdnDnsRecordEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/dns-record/edit`,
        method: "PUT",
        body: queryArg.editDnsRecordModel,
      }),
    }),
    deleteApiMyCdnDnsRecordDeleteById: build.mutation<
      DeleteApiMyCdnDnsRecordDeleteByIdApiResponse,
      DeleteApiMyCdnDnsRecordDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/dns-record/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putApiMyCdnDnsRecordChangeProxyStatusById: build.mutation<
      PutApiMyCdnDnsRecordChangeProxyStatusByIdApiResponse,
      PutApiMyCdnDnsRecordChangeProxyStatusByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cdn/dns-record/change-proxy-status/${queryArg.id}`,
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
    getApiMyDomainHostGetStatusById: build.query<
      GetApiMyDomainHostGetStatusByIdApiResponse,
      GetApiMyDomainHostGetStatusByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/host/get-status/${queryArg.id}`,
      }),
    }),
    postApiMyDomainHostGetPrice: build.mutation<
      PostApiMyDomainHostGetPriceApiResponse,
      PostApiMyDomainHostGetPriceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/host/get-price`,
        method: "POST",
        body: queryArg.getPriceModel,
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
    getApiMyKubesphereDevopsListById: build.query<
      GetApiMyKubesphereDevopsListByIdApiResponse,
      GetApiMyKubesphereDevopsListByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/devops/list/${queryArg.id}`,
      }),
    }),
    getApiMyKubesphereDevopsGetById: build.query<
      GetApiMyKubesphereDevopsGetByIdApiResponse,
      GetApiMyKubesphereDevopsGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/devops/get/${queryArg.id}`,
      }),
    }),
    postApiMyKubesphereDevopsCreate: build.mutation<
      PostApiMyKubesphereDevopsCreateApiResponse,
      PostApiMyKubesphereDevopsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/devops/create`,
        method: "POST",
        body: queryArg.createKubeDevOpsModel,
      }),
    }),
    deleteApiMyKubesphereDevopsDeleteById: build.mutation<
      DeleteApiMyKubesphereDevopsDeleteByIdApiResponse,
      DeleteApiMyKubesphereDevopsDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/devops/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyKubesphereHostList: build.query<
      GetApiMyKubesphereHostListApiResponse,
      GetApiMyKubesphereHostListApiArg
    >({
      query: () => ({ url: `/api/my/kubesphere/host/list` }),
    }),
    getApiMyKubesphereHostGetById: build.query<
      GetApiMyKubesphereHostGetByIdApiResponse,
      GetApiMyKubesphereHostGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/host/get/${queryArg.id}`,
      }),
    }),
    getApiMyKubesphereHostGetLoginById: build.query<
      GetApiMyKubesphereHostGetLoginByIdApiResponse,
      GetApiMyKubesphereHostGetLoginByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/host/get-login/${queryArg.id}`,
      }),
    }),
    postApiMyKubesphereHostCreate: build.mutation<
      PostApiMyKubesphereHostCreateApiResponse,
      PostApiMyKubesphereHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/host/create`,
        method: "POST",
        body: queryArg.createKubeHostModel,
      }),
    }),
    putApiMyKubesphereHostEdit: build.mutation<
      PutApiMyKubesphereHostEditApiResponse,
      PutApiMyKubesphereHostEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/host/edit`,
        method: "PUT",
        body: queryArg.editKubeHostModel,
      }),
    }),
    deleteApiMyKubesphereHostDeleteById: build.mutation<
      DeleteApiMyKubesphereHostDeleteByIdApiResponse,
      DeleteApiMyKubesphereHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyKubesphereServiceListById: build.query<
      GetApiMyKubesphereServiceListByIdApiResponse,
      GetApiMyKubesphereServiceListByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/service/list/${queryArg.id}`,
      }),
    }),
    getApiMyKubesphereServiceGetById: build.query<
      GetApiMyKubesphereServiceGetByIdApiResponse,
      GetApiMyKubesphereServiceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/service/get/${queryArg.id}`,
      }),
    }),
    postApiMyKubesphereServiceCreate: build.mutation<
      PostApiMyKubesphereServiceCreateApiResponse,
      PostApiMyKubesphereServiceCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/service/create`,
        method: "POST",
        body: queryArg.createKubeServiceModel,
      }),
    }),
    deleteApiMyKubesphereServiceDeleteById: build.mutation<
      DeleteApiMyKubesphereServiceDeleteByIdApiResponse,
      DeleteApiMyKubesphereServiceDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/service/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyKubernetesHostList: build.query<
      GetApiMyKubernetesHostListApiResponse,
      GetApiMyKubernetesHostListApiArg
    >({
      query: () => ({ url: `/api/my/kubernetes/host/list` }),
    }),
    getApiMyKubernetesHostGetById: build.query<
      GetApiMyKubernetesHostGetByIdApiResponse,
      GetApiMyKubernetesHostGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/host/get/${queryArg.id}`,
      }),
    }),
    postApiMyKubernetesHostCreate: build.mutation<
      PostApiMyKubernetesHostCreateApiResponse,
      PostApiMyKubernetesHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/host/create`,
        method: "POST",
        body: queryArg.createKubernetesModel,
      }),
    }),
    deleteApiMyKubernetesHostDeleteById: build.mutation<
      DeleteApiMyKubernetesHostDeleteByIdApiResponse,
      DeleteApiMyKubernetesHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyKubernetesImageListByDatacenterId: build.query<
      GetApiMyKubernetesImageListByDatacenterIdApiResponse,
      GetApiMyKubernetesImageListByDatacenterIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/image/list/${queryArg.datacenterId}`,
      }),
    }),
    getApiMyKubernetesNodeListByKubernetesHostId: build.query<
      GetApiMyKubernetesNodeListByKubernetesHostIdApiResponse,
      GetApiMyKubernetesNodeListByKubernetesHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/node/list/${queryArg.kubernetesHostId}`,
      }),
    }),
    postApiMyKubernetesNodeCreate: build.mutation<
      PostApiMyKubernetesNodeCreateApiResponse,
      PostApiMyKubernetesNodeCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/node/create`,
        method: "POST",
        body: queryArg.createKubernetesNodeModel,
      }),
    }),
    putApiMyKubernetesNodeDeleteById: build.mutation<
      PutApiMyKubernetesNodeDeleteByIdApiResponse,
      PutApiMyKubernetesNodeDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/node/delete/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiMyKubernetesVersionList: build.query<
      GetApiMyKubernetesVersionListApiResponse,
      GetApiMyKubernetesVersionListApiArg
    >({
      query: () => ({ url: `/api/my/kubernetes/version/list` }),
    }),
    getApiMyKubesphereUserList: build.query<
      GetApiMyKubesphereUserListApiResponse,
      GetApiMyKubesphereUserListApiArg
    >({
      query: () => ({ url: `/api/my/kubesphere/user/list` }),
    }),
    getApiMyKubesphereUserShortList: build.query<
      GetApiMyKubesphereUserShortListApiResponse,
      GetApiMyKubesphereUserShortListApiArg
    >({
      query: () => ({ url: `/api/my/kubesphere/user/short-list` }),
    }),
    postApiMyKubesphereUserCreate: build.mutation<
      PostApiMyKubesphereUserCreateApiResponse,
      PostApiMyKubesphereUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/user/create`,
        method: "POST",
        body: queryArg.createKubeUserModel,
      }),
    }),
    deleteApiMyKubesphereUserDeleteById: build.mutation<
      DeleteApiMyKubesphereUserDeleteByIdApiResponse,
      DeleteApiMyKubesphereUserDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/user/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyKubesphereUserChangePassword: build.mutation<
      PostApiMyKubesphereUserChangePasswordApiResponse,
      PostApiMyKubesphereUserChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/user/change-password`,
        method: "POST",
        body: queryArg.changeKubeUserPasswordModel,
      }),
    }),
    getApiMyKubesphereUserRoleListByKubeHostId: build.query<
      GetApiMyKubesphereUserRoleListByKubeHostIdApiResponse,
      GetApiMyKubesphereUserRoleListByKubeHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/user-role/list/${queryArg.kubeHostId}`,
      }),
    }),
    postApiMyKubesphereUserRoleCreate: build.mutation<
      PostApiMyKubesphereUserRoleCreateApiResponse,
      PostApiMyKubesphereUserRoleCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/user-role/create`,
        method: "POST",
        body: queryArg.createKubeUserRoleModel,
      }),
    }),
    deleteApiMyKubesphereUserRoleDeleteById: build.mutation<
      DeleteApiMyKubesphereUserRoleDeleteByIdApiResponse,
      DeleteApiMyKubesphereUserRoleDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/user-role/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyKubesphereVolumeListById: build.query<
      GetApiMyKubesphereVolumeListByIdApiResponse,
      GetApiMyKubesphereVolumeListByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/volume/list/${queryArg.id}`,
      }),
    }),
    getApiMyKubesphereVolumeGetById: build.query<
      GetApiMyKubesphereVolumeGetByIdApiResponse,
      GetApiMyKubesphereVolumeGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/volume/get/${queryArg.id}`,
      }),
    }),
    postApiMyKubesphereVolumeCreate: build.mutation<
      PostApiMyKubesphereVolumeCreateApiResponse,
      PostApiMyKubesphereVolumeCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/volume/create`,
        method: "POST",
        body: queryArg.createKubeVolumeModel,
      }),
    }),
    deleteApiMyKubesphereVolumeDeleteById: build.mutation<
      DeleteApiMyKubesphereVolumeDeleteByIdApiResponse,
      DeleteApiMyKubesphereVolumeDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubesphere/volume/delete/${queryArg.id}`,
        method: "DELETE",
      }),
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
    getApiMyPortalProductBundleListByProductId: build.query<
      GetApiMyPortalProductBundleListByProductIdApiResponse,
      GetApiMyPortalProductBundleListByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/product-bundle/list/${queryArg.productId}`,
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
    getApiMyPortalProductBundleWebHostList: build.query<
      GetApiMyPortalProductBundleWebHostListApiResponse,
      GetApiMyPortalProductBundleWebHostListApiArg
    >({
      query: () => ({ url: `/api/my/portal/product-bundle/web-host-list` }),
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
    getApiMyRabbitHostList: build.query<
      GetApiMyRabbitHostListApiResponse,
      GetApiMyRabbitHostListApiArg
    >({
      query: () => ({ url: `/api/my/rabbit/host/list` }),
    }),
    getApiMyRabbitHostGetById: build.query<
      GetApiMyRabbitHostGetByIdApiResponse,
      GetApiMyRabbitHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/rabbit/host/get/${queryArg.id}` }),
    }),
    postApiMyRabbitHostCreate: build.mutation<
      PostApiMyRabbitHostCreateApiResponse,
      PostApiMyRabbitHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/rabbit/host/create`,
        method: "POST",
        body: queryArg.createRabbitHostModel,
      }),
    }),
    putApiMyRabbitHostChangeService: build.mutation<
      PutApiMyRabbitHostChangeServiceApiResponse,
      PutApiMyRabbitHostChangeServiceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/rabbit/host/change-service`,
        method: "PUT",
        body: queryArg.editRabbitHostModel,
      }),
    }),
    deleteApiMyRabbitHostDeleteById: build.mutation<
      DeleteApiMyRabbitHostDeleteByIdApiResponse,
      DeleteApiMyRabbitHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/rabbit/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyRabbitHostChangeExchange: build.mutation<
      PostApiMyRabbitHostChangeExchangeApiResponse,
      PostApiMyRabbitHostChangeExchangeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/rabbit/host/change-exchange`,
        method: "POST",
        body: queryArg.changeExchangeModel,
      }),
    }),
    getApiMyRabbitUserListByRabbitHostId: build.query<
      GetApiMyRabbitUserListByRabbitHostIdApiResponse,
      GetApiMyRabbitUserListByRabbitHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/rabbit/user/list/${queryArg.rabbitHostId}`,
      }),
    }),
    postApiMyRabbitUserCreate: build.mutation<
      PostApiMyRabbitUserCreateApiResponse,
      PostApiMyRabbitUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/rabbit/user/create`,
        method: "POST",
        body: queryArg.createRabbitUserModel,
      }),
    }),
    deleteApiMyRabbitUserDeleteById: build.mutation<
      DeleteApiMyRabbitUserDeleteByIdApiResponse,
      DeleteApiMyRabbitUserDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/rabbit/user/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyRabbitUserChangePassword: build.mutation<
      PostApiMyRabbitUserChangePasswordApiResponse,
      PostApiMyRabbitUserChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/rabbit/user/change-password`,
        method: "POST",
        body: queryArg.changeRabbitPasswordModel,
      }),
    }),
    getApiMyPortalReferralGet: build.query<
      GetApiMyPortalReferralGetApiResponse,
      GetApiMyPortalReferralGetApiArg
    >({
      query: () => ({ url: `/api/my/portal/referral/get` }),
    }),
    postApiMyPortalReferralJoin: build.mutation<
      PostApiMyPortalReferralJoinApiResponse,
      PostApiMyPortalReferralJoinApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/referral/join`,
        method: "POST",
        body: queryArg.joinReferralModel,
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
    getApiMyVmHostListByVmProjectId: build.query<
      GetApiMyVmHostListByVmProjectIdApiResponse,
      GetApiMyVmHostListByVmProjectIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/list/${queryArg.vmProjectId}`,
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
    getApiMyVmImageListByDatacenterId: build.query<
      GetApiMyVmImageListByDatacenterIdApiResponse,
      GetApiMyVmImageListByDatacenterIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/image/list/${queryArg.datacenterId}`,
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
    getApiMyVmProjectList: build.query<
      GetApiMyVmProjectListApiResponse,
      GetApiMyVmProjectListApiArg
    >({
      query: () => ({ url: `/api/my/vm/project/list` }),
    }),
    postApiMyVmProjectCreate: build.mutation<
      PostApiMyVmProjectCreateApiResponse,
      PostApiMyVmProjectCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/project/create`,
        method: "POST",
        body: queryArg.createVmProject,
      }),
    }),
    putApiMyVmProjectEdit: build.mutation<
      PutApiMyVmProjectEditApiResponse,
      PutApiMyVmProjectEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/project/edit`,
        method: "PUT",
        body: queryArg.editVmProject,
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
    getApiMyVpcNetworkListByVpcHostId: build.query<
      GetApiMyVpcNetworkListByVpcHostIdApiResponse,
      GetApiMyVpcNetworkListByVpcHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vpc/network/list/${queryArg.vpcHostId}`,
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
    getApiMyPortalWalletList: build.query<
      GetApiMyPortalWalletListApiResponse,
      GetApiMyPortalWalletListApiArg
    >({
      query: () => ({ url: `/api/my/portal/wallet/list` }),
    }),
    getApiMyPortalWalletGetBalance: build.query<
      GetApiMyPortalWalletGetBalanceApiResponse,
      GetApiMyPortalWalletGetBalanceApiArg
    >({
      query: () => ({ url: `/api/my/portal/wallet/get-balance` }),
    }),
    getApiMyPortalWalletBalanceUsage: build.query<
      GetApiMyPortalWalletBalanceUsageApiResponse,
      GetApiMyPortalWalletBalanceUsageApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/wallet/balance-usage`,
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
  /** status 200 Success */ LoginResponse;
export type PostApiMyAccountLoginApiArg = {
  loginModel: LoginModel;
};
export type PostApiMyAccountTwoFactorLoginApiResponse =
  /** status 200 Success */ LoginResponse;
export type PostApiMyAccountTwoFactorLoginApiArg = {
  twoFactorLoginModel: TwoFactorLoginModel;
};
export type PostApiMyAccountRegisterApiResponse =
  /** status 200 Success */ LoginResponse;
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
export type GetApiMyBareMetalHostListApiResponse =
  /** status 200 Success */ BareMetalListResponse[];
export type GetApiMyBareMetalHostListApiArg = void;
export type GetApiMyBareMetalHostGetByIdApiResponse =
  /** status 200 Success */ BareMetalResponse;
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
export type GetApiMyBareMetalImageListByDatacenterIdApiResponse =
  /** status 200 Success */ BareMetalImageListResponse[];
export type GetApiMyBareMetalImageListByDatacenterIdApiArg = {
  datacenterId: number;
};
export type GetApiMyPortalBusinessUnitListApiResponse =
  /** status 200 Success */ BusinessUnitListResponse[];
export type GetApiMyPortalBusinessUnitListApiArg = void;
export type GetApiMyPortalCalculateMonthListApiResponse =
  /** status 200 Success */ CalculateMonthListResponse[];
export type GetApiMyPortalCalculateMonthListApiArg = void;
export type GetApiMyCdnAnalyticGetByCdnIdAndPeriodIdApiResponse =
  /** status 200 Success */ GetAnalyticResponse;
export type GetApiMyCdnAnalyticGetByCdnIdAndPeriodIdApiArg = {
  cdnId: number;
  periodId: number;
};
export type GetApiMyCdnApiGatewayListByCdnIdApiResponse =
  /** status 200 Success */ ApiGatewayListResponse[];
export type GetApiMyCdnApiGatewayListByCdnIdApiArg = {
  cdnId: number;
};
export type GetApiMyCdnApiGatewayGetByIdApiResponse =
  /** status 200 Success */ GetApiGatewayResponse;
export type GetApiMyCdnApiGatewayGetByIdApiArg = {
  id: number;
};
export type PostApiMyCdnApiGatewayCreateApiResponse = unknown;
export type PostApiMyCdnApiGatewayCreateApiArg = {
  createApiGatewayModel: CreateApiGatewayModel;
};
export type PutApiMyCdnApiGatewayEditApiResponse = unknown;
export type PutApiMyCdnApiGatewayEditApiArg = {
  editApiGatewayModel: EditApiGatewayModel;
};
export type DeleteApiMyCdnApiGatewayDeleteByIdApiResponse = unknown;
export type DeleteApiMyCdnApiGatewayDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyCdnClientCertGetByCdnIdApiResponse =
  /** status 200 Success */ GetCdnCertResponse;
export type GetApiMyCdnClientCertGetByCdnIdApiArg = {
  cdnId: number;
};
export type GetApiMyCdnClientCertGetUserCertByCdnIdApiResponse =
  /** status 200 Success */ GetCdnCertResponse;
export type GetApiMyCdnClientCertGetUserCertByCdnIdApiArg = {
  cdnId: number;
};
export type PostApiMyCdnClientCertCreateUserCertApiResponse = unknown;
export type PostApiMyCdnClientCertCreateUserCertApiArg = {
  createCdnClientUserCertModel: CreateCdnClientUserCertModel;
};
export type GetApiMyCdnEdgeCertGetByCdnIdApiResponse =
  /** status 200 Success */ GetCdnCertResponse;
export type GetApiMyCdnEdgeCertGetByCdnIdApiArg = {
  cdnId: number;
};
export type GetApiMyCdnEdgeCertGetUserCertByCdnIdApiResponse =
  /** status 200 Success */ GetCdnCertResponse;
export type GetApiMyCdnEdgeCertGetUserCertByCdnIdApiArg = {
  cdnId: number;
};
export type PostApiMyCdnEdgeCertCreateApiResponse = unknown;
export type PostApiMyCdnEdgeCertCreateApiArg = {
  createCdnEdgeCertModel: CreateCdnEdgeCertModel;
};
export type PostApiMyCdnEdgeCertCreateUserCertApiResponse = unknown;
export type PostApiMyCdnEdgeCertCreateUserCertApiArg = {
  createCdnEdgeUserCertModel: CreateCdnEdgeUserCertModel;
};
export type GetApiMyCdnHostListApiResponse =
  /** status 200 Success */ CdnListResponse[];
export type GetApiMyCdnHostListApiArg = void;
export type GetApiMyCdnHostGetByIdApiResponse =
  /** status 200 Success */ GetCdnResponse;
export type GetApiMyCdnHostGetByIdApiArg = {
  id: number;
};
export type GetApiMyCdnHostGetNsStatusByIdApiResponse =
  /** status 200 Success */ GetCdnNsStatusResponse;
export type GetApiMyCdnHostGetNsStatusByIdApiArg = {
  id: number;
};
export type GetApiMyCdnHostOverviewByIdApiResponse =
  /** status 200 Success */ CdnOverviewResponse;
export type GetApiMyCdnHostOverviewByIdApiArg = {
  id: number;
};
export type PostApiMyCdnHostCheckZoneApiResponse = unknown;
export type PostApiMyCdnHostCheckZoneApiArg = {
  checkCdnModel: CheckCdnModel;
};
export type PostApiMyCdnHostCreateApiResponse = unknown;
export type PostApiMyCdnHostCreateApiArg = {
  createCdnModel: CreateCdnModel;
};
export type DeleteApiMyCdnHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyCdnHostDeleteByIdApiArg = {
  id: number;
};
export type PutApiMyCdnHostChangeCdnTypeApiResponse = unknown;
export type PutApiMyCdnHostChangeCdnTypeApiArg = {
  changeCdnTypeModel: ChangeCdnTypeModel;
};
export type PutApiMyCdnHostChangeClientCertTypeApiResponse = unknown;
export type PutApiMyCdnHostChangeClientCertTypeApiArg = {
  changeClientCertTypeModel: ChangeClientCertTypeModel;
};
export type PutApiMyCdnHostChangeEdgeCertTypeApiResponse = unknown;
export type PutApiMyCdnHostChangeEdgeCertTypeApiArg = {
  changeEdgeCertTypeModel: ChangeEdgeCertTypeModel;
};
export type PutApiMyCdnHostChangeHstsApiResponse = unknown;
export type PutApiMyCdnHostChangeHstsApiArg = {
  changeHstsModel: ChangeHstsModel;
};
export type PutApiMyCdnHostChangeHttpsRedirectApiResponse = unknown;
export type PutApiMyCdnHostChangeHttpsRedirectApiArg = {
  changeHttpsRedirectModel: ChangeHttpsRedirectModel;
};
export type PutApiMyCdnHostChangeNonWwwRedirectApiResponse = unknown;
export type PutApiMyCdnHostChangeNonWwwRedirectApiArg = {
  changeNonWwwRedirectModel: ChangeNonWwwRedirectModel;
};
export type GetApiMyCdnLoadBalanceListByCdnIdApiResponse =
  /** status 200 Success */ LoadBalanceListResponse[];
export type GetApiMyCdnLoadBalanceListByCdnIdApiArg = {
  cdnId: number;
};
export type GetApiMyCdnLoadBalanceGetByIdApiResponse =
  /** status 200 Success */ GetLoadBalanceResponse;
export type GetApiMyCdnLoadBalanceGetByIdApiArg = {
  id: number;
};
export type PostApiMyCdnLoadBalanceCreateApiResponse = unknown;
export type PostApiMyCdnLoadBalanceCreateApiArg = {
  createLoadBalanceModel: CreateLoadBalanceModel;
};
export type PutApiMyCdnLoadBalanceEditApiResponse = unknown;
export type PutApiMyCdnLoadBalanceEditApiArg = {
  editLoadBalanceModel: EditLoadBalanceModel;
};
export type DeleteApiMyCdnLoadBalanceDeleteByIdApiResponse = unknown;
export type DeleteApiMyCdnLoadBalanceDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyColocationHostListApiResponse =
  /** status 200 Success */ ColocationListResponse[];
export type GetApiMyColocationHostListApiArg = void;
export type GetApiMyColocationHostGetByIdApiResponse =
  /** status 200 Success */ GetColocationResponse;
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
  /** status 200 Success */ CommissionListResponse[];
export type GetApiMyPortalCommissionListApiArg = void;
export type GetApiMyPortalCustomerGetApiResponse =
  /** status 200 Success */ GetCustomerResponse;
export type GetApiMyPortalCustomerGetApiArg = void;
export type PutApiMyPortalCustomerEditApiResponse = unknown;
export type PutApiMyPortalCustomerEditApiArg = {
  editCustomerModel: EditCustomerModel;
};
export type GetApiMyPortalCustomerBillListApiResponse =
  /** status 200 Success */ CustomerBillListResponse[];
export type GetApiMyPortalCustomerBillListApiArg = void;
export type GetApiMyPortalCustomerBillShortListApiResponse =
  /** status 200 Success */ CustomerBillShortListResponse[];
export type GetApiMyPortalCustomerBillShortListApiArg = void;
export type GetApiMyPortalCustomerBillGetByIdApiResponse =
  /** status 200 Success */ GetCustomerBillResponse;
export type GetApiMyPortalCustomerBillGetByIdApiArg = {
  id: number;
};
export type GetApiMyPortalCustomerBillGetCustomerProductByCustomerBillIdAndCustomerProductIdApiResponse =
  /** status 200 Success */ GetCustomerProductResponse;
export type GetApiMyPortalCustomerBillGetCustomerProductByCustomerBillIdAndCustomerProductIdApiArg =
  {
    customerBillId: number;
    customerProductId: number;
  };
export type GetApiMyPortalCustomerBillDownloadByIdApiResponse = unknown;
export type GetApiMyPortalCustomerBillDownloadByIdApiArg = {
  id: number;
};
export type GetApiMyPortalCustomerProductListByProductIdApiResponse =
  /** status 200 Success */ CustomerProductListResponse[];
export type GetApiMyPortalCustomerProductListByProductIdApiArg = {
  productId: number;
};
export type GetApiMyPortalCustomerProductShortListApiResponse =
  /** status 200 Success */ CustomerProductShortListResponse[];
export type GetApiMyPortalCustomerProductShortListApiArg = void;
export type GetApiMyPortalCustomerUserListApiResponse =
  /** status 200 Success */ CustomerUserListResponse[];
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
  /** status 200 Success */ ChangeCustomerUserResponse;
export type PostApiMyPortalCustomerUserChangeApiArg = {
  changeCustomerUserModel: ChangeCustomerUserModel;
};
export type GetApiMyDashboardUsageByCategoryIdApiResponse =
  /** status 200 Success */ DashboardUsageResponse[];
export type GetApiMyDashboardUsageByCategoryIdApiArg = {
  categoryId: number;
};
export type GetApiMyDashboardFinancialApiResponse =
  /** status 200 Success */ DashboardFinancialResponse;
export type GetApiMyDashboardFinancialApiArg = void;
export type GetApiMyDatacenterListApiResponse =
  /** status 200 Success */ DatacenterListResponse[];
export type GetApiMyDatacenterListApiArg = void;
export type GetApiMyDatacenterIpListByIdApiResponse =
  /** status 200 Success */ DatacenterIpListResponse[];
export type GetApiMyDatacenterIpListByIdApiArg = {
  id: number;
};
export type DeleteApiMyDatacenterIpDeleteByIdApiResponse = unknown;
export type DeleteApiMyDatacenterIpDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyCdnDnsRecordListByCdnIdApiResponse =
  /** status 200 Success */ DnsRecordListResponse[];
export type GetApiMyCdnDnsRecordListByCdnIdApiArg = {
  cdnId: number;
};
export type GetApiMyCdnDnsRecordGetByIdApiResponse =
  /** status 200 Success */ GetDnsRecordResponse;
export type GetApiMyCdnDnsRecordGetByIdApiArg = {
  id: number;
};
export type PostApiMyCdnDnsRecordCreateApiResponse = unknown;
export type PostApiMyCdnDnsRecordCreateApiArg = {
  createDnsRecordModel: CreateDnsRecordModel;
};
export type PutApiMyCdnDnsRecordEditApiResponse = unknown;
export type PutApiMyCdnDnsRecordEditApiArg = {
  editDnsRecordModel: EditDnsRecordModel;
};
export type DeleteApiMyCdnDnsRecordDeleteByIdApiResponse = unknown;
export type DeleteApiMyCdnDnsRecordDeleteByIdApiArg = {
  id: number;
};
export type PutApiMyCdnDnsRecordChangeProxyStatusByIdApiResponse = unknown;
export type PutApiMyCdnDnsRecordChangeProxyStatusByIdApiArg = {
  id: number;
};
export type GetApiMyDomainHostListApiResponse =
  /** status 200 Success */ DomainListResponse[];
export type GetApiMyDomainHostListApiArg = void;
export type GetApiMyDomainHostGetByIdApiResponse =
  /** status 200 Success */ GetDomainResponse;
export type GetApiMyDomainHostGetByIdApiArg = {
  id: number;
};
export type GetApiMyDomainHostGetStatusByIdApiResponse =
  /** status 200 Success */ GetDomainResponse;
export type GetApiMyDomainHostGetStatusByIdApiArg = {
  id: number;
};
export type PostApiMyDomainHostGetPriceApiResponse =
  /** status 200 Success */ GetProductPriceResponse;
export type PostApiMyDomainHostGetPriceApiArg = {
  getPriceModel: GetPriceModel;
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
  /** status 200 Success */ EquipmentListResponse[];
export type GetApiMyColocationEquipmentListByTypeIdAndBrandIdApiArg = {
  typeId: number;
  brandId: number;
};
export type GetApiMyColocationEquipmentBrandListApiResponse =
  /** status 200 Success */ EquipmentBrandListResponse[];
export type GetApiMyColocationEquipmentBrandListApiArg = void;
export type GetApiMyColocationEquipmentTypeListApiResponse =
  /** status 200 Success */ EquipmentTypeListResponse[];
export type GetApiMyColocationEquipmentTypeListApiArg = void;
export type GetApiMyHomeIndexApiResponse = unknown;
export type GetApiMyHomeIndexApiArg = void;
export type GetApiMyPortalInvoiceListApiResponse =
  /** status 200 Success */ InvoiceListResponse[];
export type GetApiMyPortalInvoiceListApiArg = void;
export type GetApiMyPortalInvoiceUnpaidApiResponse =
  /** status 200 Success */ UnPaidInvoiceResponse[];
export type GetApiMyPortalInvoiceUnpaidApiArg = void;
export type GetApiMyPortalInvoiceGetByIdApiResponse =
  /** status 200 Success */ GetInvoiceResponse;
export type GetApiMyPortalInvoiceGetByIdApiArg = {
  id: number;
};
export type PostApiMyPortalInvoicePayApiResponse =
  /** status 200 Success */ PayInvoiceResponse;
export type PostApiMyPortalInvoicePayApiArg = {
  payInvoiceModel: PayInvoiceModel;
};
export type GetApiMyPortalInvoiceSummaryApiResponse =
  /** status 200 Success */ InvoiceSummaryResponse;
export type GetApiMyPortalInvoiceSummaryApiArg = void;
export type GetApiMyPortalIssueListApiResponse =
  /** status 200 Success */ IssueListResponse[];
export type GetApiMyPortalIssueListApiArg = void;
export type GetApiMyPortalIssueShortListApiResponse =
  /** status 200 Success */ IssueShortListResponse[];
export type GetApiMyPortalIssueShortListApiArg = void;
export type PostApiMyPortalIssueCreateApiResponse = unknown;
export type PostApiMyPortalIssueCreateApiArg = {
  body: {
    Content: string;
    BusinessUnitId: number;
    IssueSubjectId: number;
    CustomerProductId?: number;
    ProductId?: number;
    Attachment?: Blob;
  };
};
export type GetApiMyPortalIssueItemListByIssueIdApiResponse =
  /** status 200 Success */ IssueItemListResponse;
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
  /** status 200 Success */ IssueSubjectListResponse[];
export type GetApiMyPortalIssueSubjectListApiArg = void;
export type PostApiMyPortalIssueSubjectSelectListApiResponse =
  /** status 200 Success */ IssueSubjectListResponse[];
export type PostApiMyPortalIssueSubjectSelectListApiArg = {
  issueSubjectSelectListModel: IssueSubjectSelectListModel;
};
export type GetApiMyKubesphereDevopsListByIdApiResponse =
  /** status 200 Success */ KubeDevOpsListResponse[];
export type GetApiMyKubesphereDevopsListByIdApiArg = {
  id: number;
};
export type GetApiMyKubesphereDevopsGetByIdApiResponse =
  /** status 200 Success */ KubeDevOpsListResponse;
export type GetApiMyKubesphereDevopsGetByIdApiArg = {
  id: number;
};
export type PostApiMyKubesphereDevopsCreateApiResponse = unknown;
export type PostApiMyKubesphereDevopsCreateApiArg = {
  createKubeDevOpsModel: CreateKubeDevOpsModel;
};
export type DeleteApiMyKubesphereDevopsDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubesphereDevopsDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyKubesphereHostListApiResponse =
  /** status 200 Success */ KubeHostListResponse[];
export type GetApiMyKubesphereHostListApiArg = void;
export type GetApiMyKubesphereHostGetByIdApiResponse =
  /** status 200 Success */ GetKubeHostResponse;
export type GetApiMyKubesphereHostGetByIdApiArg = {
  id: number;
};
export type GetApiMyKubesphereHostGetLoginByIdApiResponse =
  /** status 200 Success */ GetKubeLoginResponse;
export type GetApiMyKubesphereHostGetLoginByIdApiArg = {
  id: number;
};
export type PostApiMyKubesphereHostCreateApiResponse = unknown;
export type PostApiMyKubesphereHostCreateApiArg = {
  createKubeHostModel: CreateKubeHostModel;
};
export type PutApiMyKubesphereHostEditApiResponse = unknown;
export type PutApiMyKubesphereHostEditApiArg = {
  editKubeHostModel: EditKubeHostModel;
};
export type DeleteApiMyKubesphereHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubesphereHostDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyKubesphereServiceListByIdApiResponse =
  /** status 200 Success */ KubeServiceListResponse[];
export type GetApiMyKubesphereServiceListByIdApiArg = {
  id: number;
};
export type GetApiMyKubesphereServiceGetByIdApiResponse =
  /** status 200 Success */ KubeServiceListResponse;
export type GetApiMyKubesphereServiceGetByIdApiArg = {
  id: number;
};
export type PostApiMyKubesphereServiceCreateApiResponse = unknown;
export type PostApiMyKubesphereServiceCreateApiArg = {
  createKubeServiceModel: CreateKubeServiceModel;
};
export type DeleteApiMyKubesphereServiceDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubesphereServiceDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyKubernetesHostListApiResponse =
  /** status 200 Success */ KubernetesListResponse[];
export type GetApiMyKubernetesHostListApiArg = void;
export type GetApiMyKubernetesHostGetByIdApiResponse =
  /** status 200 Success */ GetKubernetesResponse;
export type GetApiMyKubernetesHostGetByIdApiArg = {
  id: number;
};
export type PostApiMyKubernetesHostCreateApiResponse = unknown;
export type PostApiMyKubernetesHostCreateApiArg = {
  createKubernetesModel: CreateKubernetesModel;
};
export type DeleteApiMyKubernetesHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubernetesHostDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyKubernetesImageListByDatacenterIdApiResponse =
  /** status 200 Success */ KubernetesImageListResponse[];
export type GetApiMyKubernetesImageListByDatacenterIdApiArg = {
  datacenterId: number;
};
export type GetApiMyKubernetesNodeListByKubernetesHostIdApiResponse =
  /** status 200 Success */ KubernetesNodeListResponse[];
export type GetApiMyKubernetesNodeListByKubernetesHostIdApiArg = {
  kubernetesHostId: number;
};
export type PostApiMyKubernetesNodeCreateApiResponse = unknown;
export type PostApiMyKubernetesNodeCreateApiArg = {
  createKubernetesNodeModel: CreateKubernetesNodeModel;
};
export type PutApiMyKubernetesNodeDeleteByIdApiResponse = unknown;
export type PutApiMyKubernetesNodeDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyKubernetesVersionListApiResponse =
  /** status 200 Success */ KubernetesVersionListResponse[];
export type GetApiMyKubernetesVersionListApiArg = void;
export type GetApiMyKubesphereUserListApiResponse =
  /** status 200 Success */ KubeUserListResponse[];
export type GetApiMyKubesphereUserListApiArg = void;
export type GetApiMyKubesphereUserShortListApiResponse =
  /** status 200 Success */ KubeShortListResponse[];
export type GetApiMyKubesphereUserShortListApiArg = void;
export type PostApiMyKubesphereUserCreateApiResponse = unknown;
export type PostApiMyKubesphereUserCreateApiArg = {
  createKubeUserModel: CreateKubeUserModel;
};
export type DeleteApiMyKubesphereUserDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubesphereUserDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyKubesphereUserChangePasswordApiResponse = unknown;
export type PostApiMyKubesphereUserChangePasswordApiArg = {
  changeKubeUserPasswordModel: ChangeKubeUserPasswordModel;
};
export type GetApiMyKubesphereUserRoleListByKubeHostIdApiResponse =
  /** status 200 Success */ KubeUserRoleListResponse[];
export type GetApiMyKubesphereUserRoleListByKubeHostIdApiArg = {
  kubeHostId: number;
};
export type PostApiMyKubesphereUserRoleCreateApiResponse = unknown;
export type PostApiMyKubesphereUserRoleCreateApiArg = {
  createKubeUserRoleModel: CreateKubeUserRoleModel;
};
export type DeleteApiMyKubesphereUserRoleDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubesphereUserRoleDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyKubesphereVolumeListByIdApiResponse =
  /** status 200 Success */ KubeVolumeListResponse[];
export type GetApiMyKubesphereVolumeListByIdApiArg = {
  id: number;
};
export type GetApiMyKubesphereVolumeGetByIdApiResponse =
  /** status 200 Success */ KubeVolumeListResponse;
export type GetApiMyKubesphereVolumeGetByIdApiArg = {
  id: number;
};
export type PostApiMyKubesphereVolumeCreateApiResponse = unknown;
export type PostApiMyKubesphereVolumeCreateApiArg = {
  createKubeVolumeModel: CreateKubeVolumeModel;
};
export type DeleteApiMyKubesphereVolumeDeleteByIdApiResponse = unknown;
export type DeleteApiMyKubesphereVolumeDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyPortalNotificationListApiResponse =
  /** status 200 Success */ NotificationListResponse[];
export type GetApiMyPortalNotificationListApiArg = void;
export type GetApiMyPortalNotificationShortListApiResponse =
  /** status 200 Success */ NotificationListResponse[];
export type GetApiMyPortalNotificationShortListApiArg = void;
export type PutApiMyPortalNotificationSeenByIdApiResponse = unknown;
export type PutApiMyPortalNotificationSeenByIdApiArg = {
  id: number;
};
export type GetApiMyPortalPaymentListApiResponse =
  /** status 200 Success */ PaymentListResponse[];
export type GetApiMyPortalPaymentListApiArg = void;
export type GetApiMyPortalPaymentGetByIdApiResponse =
  /** status 200 Success */ GetPaymentResponse;
export type GetApiMyPortalPaymentGetByIdApiArg = {
  id: number;
};
export type PostApiMyPortalPaymentCreateApiResponse =
  /** status 200 Success */ CreatePaymentResponse;
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
export type GetApiMyPortalProductListApiResponse =
  /** status 200 Success */ ProductListResponse[];
export type GetApiMyPortalProductListApiArg = void;
export type GetApiMyPortalProductGetByIdApiResponse =
  /** status 200 Success */ GetProductResponse;
export type GetApiMyPortalProductGetByIdApiArg = {
  id: number;
};
export type GetApiMyPortalProductBundleListByProductIdApiResponse =
  /** status 200 Success */ ProductBundleListResponse[];
export type GetApiMyPortalProductBundleListByProductIdApiArg = {
  productId: number;
};
export type GetApiMyPortalProductBundleVmListApiResponse =
  /** status 200 Success */ ProductBundleVmListResponse[];
export type GetApiMyPortalProductBundleVmListApiArg = void;
export type GetApiMyPortalProductBundleStorageListApiResponse =
  /** status 200 Success */ ProductBundleStorageListResponse[];
export type GetApiMyPortalProductBundleStorageListApiArg = void;
export type GetApiMyPortalProductBundleWebHostListApiResponse =
  /** status 200 Success */ ProductBundleWebListResponse[];
export type GetApiMyPortalProductBundleWebHostListApiArg = void;
export type GetApiMyPortalProductItemListByProductIdApiResponse =
  /** status 200 Success */ ProductItemListResponse[];
export type GetApiMyPortalProductItemListByProductIdApiArg = {
  productId: number;
};
export type GetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountApiResponse =
  /** status 200 Success */ KubernetesPriceResponse;
export type GetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountApiArg = {
  workerNodeCount: number;
};
export type GetApiMyPortalProfileGetApiResponse =
  /** status 200 Success */ GetProfileResponse;
export type GetApiMyPortalProfileGetApiArg = void;
export type GetApiMyPortalProfileGetNotificationStatusApiResponse =
  /** status 200 Success */ GetNotificationStatusResponse;
export type GetApiMyPortalProfileGetNotificationStatusApiArg = void;
export type PutApiMyPortalProfileEditApiResponse =
  /** status 200 Success */ EditProfileResponse;
export type PutApiMyPortalProfileEditApiArg = {
  editProfileModel: EditProfileModel;
};
export type PutApiMyPortalProfileEditEmailApiResponse = unknown;
export type PutApiMyPortalProfileEditEmailApiArg = {
  editEmailModel: EditEmailModel;
};
export type PostApiMyPortalProfileConfirmEmailApiResponse =
  /** status 200 Success */ EditProfileResponse;
export type PostApiMyPortalProfileConfirmEmailApiArg = {
  confirmEmailModel: ConfirmEmailModel;
};
export type PutApiMyPortalProfileEditPhoneNumberApiResponse = unknown;
export type PutApiMyPortalProfileEditPhoneNumberApiArg = {
  editPhoneNumberModel: EditPhoneNumberModel;
};
export type PostApiMyPortalProfileConfirmPhoneNumberApiResponse =
  /** status 200 Success */ EditProfileResponse;
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
export type GetApiMyRabbitHostListApiResponse =
  /** status 200 Success */ RabbitHostListResponse[];
export type GetApiMyRabbitHostListApiArg = void;
export type GetApiMyRabbitHostGetByIdApiResponse =
  /** status 200 Success */ GetRabbitHostResponse;
export type GetApiMyRabbitHostGetByIdApiArg = {
  id: number;
};
export type PostApiMyRabbitHostCreateApiResponse = unknown;
export type PostApiMyRabbitHostCreateApiArg = {
  createRabbitHostModel: CreateRabbitHostModel;
};
export type PutApiMyRabbitHostChangeServiceApiResponse = unknown;
export type PutApiMyRabbitHostChangeServiceApiArg = {
  editRabbitHostModel: EditRabbitHostModel;
};
export type DeleteApiMyRabbitHostDeleteByIdApiResponse = unknown;
export type DeleteApiMyRabbitHostDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyRabbitHostChangeExchangeApiResponse = unknown;
export type PostApiMyRabbitHostChangeExchangeApiArg = {
  changeExchangeModel: ChangeExchangeModel;
};
export type GetApiMyRabbitUserListByRabbitHostIdApiResponse =
  /** status 200 Success */ RabbitHostUserListResponse[];
export type GetApiMyRabbitUserListByRabbitHostIdApiArg = {
  rabbitHostId: number;
};
export type PostApiMyRabbitUserCreateApiResponse = unknown;
export type PostApiMyRabbitUserCreateApiArg = {
  createRabbitUserModel: CreateRabbitUserModel;
};
export type DeleteApiMyRabbitUserDeleteByIdApiResponse = unknown;
export type DeleteApiMyRabbitUserDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyRabbitUserChangePasswordApiResponse = unknown;
export type PostApiMyRabbitUserChangePasswordApiArg = {
  changeRabbitPasswordModel: ChangeRabbitPasswordModel;
};
export type GetApiMyPortalReferralGetApiResponse =
  /** status 200 Success */ GetReferralResponse;
export type GetApiMyPortalReferralGetApiArg = void;
export type PostApiMyPortalReferralJoinApiResponse = unknown;
export type PostApiMyPortalReferralJoinApiArg = {
  joinReferralModel: JoinReferralModel;
};
export type GetApiMyPortalRoleListApiResponse =
  /** status 200 Success */ RoleListResponse[];
export type GetApiMyPortalRoleListApiArg = void;
export type GetApiMyPortalRoleAccessListByUserIdApiResponse =
  /** status 200 Success */ RoleAccessListResponse;
export type GetApiMyPortalRoleAccessListByUserIdApiArg = {
  userId: string;
};
export type PutApiMyPortalRoleAccessEditApiResponse = unknown;
export type PutApiMyPortalRoleAccessEditApiArg = {
  editRoleAccessModel: EditRoleAccessModel;
};
export type GetApiMyPortalRoleAccessTypeListApiResponse =
  /** status 200 Success */ RoleAccessTypeListResponse[];
export type GetApiMyPortalRoleAccessTypeListApiArg = void;
export type GetApiMyStorageHostListApiResponse =
  /** status 200 Success */ StorageHostListResponse[];
export type GetApiMyStorageHostListApiArg = void;
export type GetApiMyStorageHostGetByIdApiResponse =
  /** status 200 Success */ GetStorageHostResponse;
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
  /** status 200 Success */ StorageUserListResponse[];
export type GetApiMyStorageUserListByStorageHostIdApiArg = {
  storageHostId: number;
};
export type PostApiMyStorageUserCreateApiResponse =
  /** status 200 Success */ CreateStorageUserResponse;
export type PostApiMyStorageUserCreateApiArg = {
  createStorageUserModel: CreateStorageUserModel;
};
export type DeleteApiMyStorageUserDeleteByIdApiResponse = unknown;
export type DeleteApiMyStorageUserDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyVmHostListByVmProjectIdApiResponse =
  /** status 200 Success */ VmListResponse[];
export type GetApiMyVmHostListByVmProjectIdApiArg = {
  vmProjectId: number;
};
export type GetApiMyVmHostGetByIdApiResponse =
  /** status 200 Success */ GetVmResponse;
export type GetApiMyVmHostGetByIdApiArg = {
  id: number;
};
export type PostApiMyVmHostCreateApiResponse = /** status 200 Success */ number;
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
export type GetApiMyVmImageListByDatacenterIdApiResponse =
  /** status 200 Success */ ImageListResponse[];
export type GetApiMyVmImageListByDatacenterIdApiArg = {
  datacenterId: number;
};
export type GetApiMyVmIsoListByDatacenterIdApiResponse =
  /** status 200 Success */ IsoListResponse[];
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
  /** status 200 Success */ string;
export type GetApiMyVmKmsGetByIdAndTypeIdApiArg = {
  id: number;
  typeId: number;
};
export type GetApiMyVmProjectListApiResponse =
  /** status 200 Success */ VmProjectList[];
export type GetApiMyVmProjectListApiArg = void;
export type PostApiMyVmProjectCreateApiResponse = unknown;
export type PostApiMyVmProjectCreateApiArg = {
  createVmProject: CreateVmProject;
};
export type PutApiMyVmProjectEditApiResponse = unknown;
export type PutApiMyVmProjectEditApiArg = {
  editVmProject: EditVmProject;
};
export type DeleteApiMyVmProjectDeleteByIdApiResponse = unknown;
export type DeleteApiMyVmProjectDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyVmSnapshotListByVmIdApiResponse =
  /** status 200 Success */ VmSnapshotResponse[];
export type GetApiMyVmSnapshotListByVmIdApiArg = {
  vmId: number;
};
export type GetApiMyVmSnapshotGetByIdApiResponse =
  /** status 200 Success */ VmSnapshotResponse;
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
export type PostApiMyPortalVoucherUseApiResponse = unknown;
export type PostApiMyPortalVoucherUseApiArg = {
  useVoucherModel: UseVoucherModel;
};
export type GetApiMyVpcHostListApiResponse =
  /** status 200 Success */ VpcListResponse[];
export type GetApiMyVpcHostListApiArg = void;
export type PostApiMyVpcHostCreateApiResponse = unknown;
export type PostApiMyVpcHostCreateApiArg = {
  createVpcHostModel: CreateVpcHostModel;
};
export type GetApiMyVpcNetworkListByVpcHostIdApiResponse =
  /** status 200 Success */ VpcNetworkListResponse[];
export type GetApiMyVpcNetworkListByVpcHostIdApiArg = {
  vpcHostId: number;
};
export type PostApiMyVpcNetworkCreateApiResponse = unknown;
export type PostApiMyVpcNetworkCreateApiArg = {
  createVpcNetworkModel: CreateVpcNetworkModel;
};
export type GetApiMyPortalWalletListApiResponse =
  /** status 200 Success */ WalletTransactionListResponse[];
export type GetApiMyPortalWalletListApiArg = void;
export type GetApiMyPortalWalletGetBalanceApiResponse =
  /** status 200 Success */ number;
export type GetApiMyPortalWalletGetBalanceApiArg = void;
export type GetApiMyPortalWalletBalanceUsageApiResponse =
  /** status 200 Success */ BalanceUsageResponse[];
export type GetApiMyPortalWalletBalanceUsageApiArg = {
  period?: number;
};
export type GetApiMyWebHostListApiResponse =
  /** status 200 Success */ WebHostListResponse[];
export type GetApiMyWebHostListApiArg = void;
export type GetApiMyWebHostGetByIdApiResponse =
  /** status 200 Success */ GetWebHostResponse;
export type GetApiMyWebHostGetByIdApiArg = {
  id: number;
};
export type GetApiMyWebHostGetLoginSessionByIdApiResponse =
  /** status 200 Success */ GetLoginSessionResponse;
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
  roles?: number[] | null;
};
export type LoginModel = {
  email: string;
  password: string;
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
};
export type ForgotModel = {
  email: string;
};
export type ForgotConfirmModel = {
  email: string;
  confirmCode: number;
  password: string;
};
export type BareMetalListResponse = {
  id?: number;
  name?: string | null;
  status?: string | null;
  statusId?: number;
  bareMetalImage?: string | null;
  bareMetalMachine?: string | null;
  datacenter?: string | null;
  datacenterRack?: string | null;
  createDate?: string;
};
export type BareMetalResponse = {
  id?: number;
  name?: string | null;
  bareMetalImage?: string | null;
  bareMetalMachine?: string | null;
  datacenter?: string | null;
  datacenterRack?: string | null;
  status?: string | null;
  statusId?: number;
  physicalCpu?: number;
  physicalMemory?: number;
  hdd600GSas10K?: number;
  hdd1200GSas10K?: number;
  networkPort1G?: number;
  networkPort10G?: number;
};
export type CreateBareMetalModel = {
  name: string;
  password?: string | null;
  datacenterId: number;
  imageId: number;
  publicKey?: string | null;
  productBundleId?: number | null;
  isPredefined: boolean;
  customerProductTypeId: number;
  physicalCpu?: number | null;
  physicalMemory?: number | null;
  hdd600Sas10K?: number | null;
  hdd1200Sas10K?: number | null;
  networkPort1G?: number | null;
  networkPort10G?: number | null;
};
export type BareMetalImageListResponse = {
  id?: number;
  name?: string | null;
  osId?: number;
  os?: string | null;
};
export type BusinessUnitListResponse = {
  id?: number;
  name?: string | null;
};
export type CalculateMonthListResponse = {
  id?: number;
  name?: string | null;
};
export type SeriesModel = {
  name?: string | null;
  data?: number[] | null;
};
export type GetAnalyticResponse = {
  categories?: string[] | null;
  series?: SeriesModel[] | null;
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
  cdnId: number;
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
export type GetCdnCertResponse = {
  issuer?: string | null;
  commonName?: string | null;
  expirationDate?: string | null;
};
export type CreateCdnClientUserCertModel = {
  cdnId: number;
  keyPem: string;
  certPem: string;
};
export type CreateCdnEdgeCertModel = {
  cdnId: number;
};
export type CreateCdnEdgeUserCertModel = {
  cdnId: number;
  keyPem: string;
  certPem: string;
  bundleCertPem?: string | null;
};
export type CdnListResponse = {
  id?: number;
  zoneName?: string | null;
  zoneStatus?: string | null;
  zoneStatusId?: number;
  createDate?: string;
};
export type GetCdnResponse = {
  id?: number;
  zoneStatusId?: number;
  zoneTypeId?: number;
  zoneEdgeCertTypeId?: number;
  zoneClientCertTypeId?: number;
  isHsts?: boolean;
  isHttpsRedirect?: boolean;
  isNonWwwRedirect?: boolean;
};
export type GetCdnNsStatusResponse = {
  status?: boolean;
  ns?: string[] | null;
  cloudNs?: string[] | null;
};
export type CdnOverviewResponse = {
  id?: number;
  domainName?: string | null;
  statusId?: number;
  status?: string | null;
  createDate?: string;
};
export type CheckCdnModel = {
  zoneName: string;
};
export type CreateCdnModel = {
  zoneName: string;
};
export type ChangeCdnTypeModel = {
  id?: number;
  zoneTypeId?: number;
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
export type ChangeHttpsRedirectModel = {
  id?: number;
  isHttpsRedirect?: boolean;
};
export type ChangeNonWwwRedirectModel = {
  id?: number;
  isNonWwwRedirect?: boolean;
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
  cdnId: number;
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
export type ColocationListResponse = {
  id?: number;
  name?: string | null;
  datacenter?: string | null;
  status?: string | null;
  statusId?: number;
  datacenterId?: number;
  datacenterRackId?: number;
  datacenterRack?: string | null;
  createDate?: string;
};
export type GetColocationResponse = {
  id?: number;
  name?: string | null;
  datacenter?: string | null;
  status?: string | null;
  datacenterRack?: string | null;
  powerAmp?: number;
  network1G?: number;
  network10G?: number;
  ipv4Count?: number;
  rackUnitSpace?: number;
};
export type EquipmentModel = {
  equipmentId?: number;
  inventoryNumber?: number;
};
export type CreateColocationModel = {
  datacenterId: number;
  name: string;
  customerProductTypeId: number;
  equipmentModels: EquipmentModel[];
  rackUnitSpace?: number;
  networkPort1G?: number;
  networkPort10G?: number;
  powerAmp?: number;
  ipv4Count?: number;
};
export type CommissionListResponse = {
  id?: number;
  invoiceId?: number;
  totalPrice?: number;
  commissionPrice?: number;
  commissionDate?: string;
};
export type GetCustomerResponse = {
  id?: number;
  customerTypeId?: number;
  name?: string | null;
  nationalId?: string | null;
  phone?: string | null;
  address?: string | null;
  postalCode?: string | null;
};
export type EditCustomerModel = {
  name: string;
  nationalId: string;
  phone: string;
  address: string;
  postalCode: string;
};
export type CustomerProductBillResponseModel = {
  customerProductId?: number;
  product?: string | null;
  customerProduct?: string | null;
  customerProductPrice?: number;
  fromDate?: string;
  toDate?: string;
};
export type CustomerBillListResponse = {
  id?: number;
  calculateMonthId?: number;
  calculateMonth?: string | null;
  billDate?: string;
  netPrice?: number;
  vat?: number;
  totalPrice?: number;
  customerProductBillListResponse?: CustomerProductBillResponseModel[] | null;
};
export type CustomerBillShortListResponse = {
  id?: number;
  billDate?: string;
  totalPrice?: number;
};
export type CustomerProductBillItemModel = {
  customerProductItem?: string | null;
  duration?: number;
  price?: number;
  fromDate?: string;
  toDate?: string;
};
export type CustomerProductBillModel = {
  product?: string | null;
  customerProduct?: string | null;
  customerProductPrice?: number;
  fromDate?: string;
  toDate?: string;
  customerProductBillItems?: CustomerProductBillItemModel[] | null;
};
export type GetCustomerBillResponse = {
  id?: number;
  name?: string | null;
  billDate?: string;
  netPrice?: number;
  vat?: number;
  totalPrice?: number;
  customerProductBills?: CustomerProductBillModel[] | null;
};
export type GetCustomerProductItemBillResponse = {
  customerProductItem?: string | null;
  duration?: number;
  price?: number;
  fromDate?: string;
  toDate?: string;
};
export type GetCustomerProductResponse = {
  id?: number;
  product?: string | null;
  customerProduct?: string | null;
  customerProductPrice?: number;
  fromDate?: string;
  toDate?: string;
  customerProductBillItems?: GetCustomerProductItemBillResponse[] | null;
};
export type CustomerProductListResponse = {
  id?: number;
  name?: string | null;
  product?: string | null;
  productId?: number;
  customerProduct?: string | null;
  status?: string | null;
  createDate?: string;
};
export type CustomerProductShortListResponse = {
  id?: number;
  product?: string | null;
  customerProduct?: string | null;
  createDate?: string;
};
export type CustomerUserListResponse = {
  userId?: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  isActive?: boolean;
  hasTwoFactor?: boolean;
};
export type AccessTupleModel = {
  accessId?: number;
  hasAccess?: boolean;
};
export type RoleAccessListModel = {
  roleAccessTypeId?: number;
  roleId?: number;
  accessTuples?: AccessTupleModel[] | null;
};
export type CreateCustomerUserModel = {
  email: string;
  isSuperUser: boolean;
  isFinancialManager: boolean;
  isAccountManager: boolean;
  roleAccesses?: RoleAccessListModel[] | null;
};
export type ChangeCustomerUserResponse = {
  isSuperUser?: boolean;
  isFinancialManager?: boolean;
  isAccountManager?: boolean;
  roles?: number[] | null;
};
export type ChangeCustomerUserModel = {
  customerId?: number;
};
export type DashboardUsageResponse = {
  month?: string | null;
  count?: number;
};
export type DashboardFinancialResponse = {
  walletBalance?: number;
  paidInvoicePrice?: number;
  unpaidInvoiceCount?: number;
  activeServiceCount?: number;
};
export type DatacenterListResponse = {
  id?: number;
  name?: string | null;
  photoName?: string | null;
};
export type DatacenterIpListResponse = {
  id?: number;
  ip?: string | null;
  isV4?: boolean;
  isPrimary?: boolean;
};
export type DnsRecordListResponse = {
  id?: number;
  name?: string | null;
  type?: string | null;
  ttl?: string | null;
  value?: string | null;
  useProxy?: boolean;
};
export type GetDnsRecordResponse = {
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
  cdnId: number;
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
  cdnId: number;
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
  customerProductTypeId?: number;
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
export type EquipmentListResponse = {
  id?: number;
  name?: string | null;
  type?: string | null;
  typeId?: number;
  brand?: string | null;
  brandId?: number;
};
export type EquipmentBrandListResponse = {
  id?: number;
  name?: string | null;
};
export type EquipmentTypeListResponse = {
  id?: number;
  name?: string | null;
};
export type InvoiceListResponse = {
  id?: number;
  invoiceDate?: string;
  netPrice?: number;
  discount?: number;
  vat?: number;
  totalPrice?: number;
  invoicePrice?: number;
  invoiceStatusId?: number;
  invoiceStatus?: string | null;
};
export type UnPaidInvoiceResponse = {
  id?: number;
  customerName?: string | null;
  invoiceDate?: string;
  netPrice?: number;
  discount?: number;
  invoiceStatusId?: number;
  invoicePrice?: number;
  vat?: number;
};
export type InvoiceItemModel = {
  product?: string | null;
  quantity?: number;
  unitPrice?: number;
  price?: number;
};
export type GetInvoiceResponse = {
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
export type PayInvoiceResponse = {
  status?: boolean;
  location?: string | null;
};
export type PayInvoiceModel = {
  id?: number;
};
export type InvoiceSummaryResponse = {
  totalPaid?: number;
  totalUnpaid?: number;
};
export type IssueListResponse = {
  id?: number;
  issueSubject?: string | null;
  businessUnit?: string | null;
  issueStatus?: string | null;
  issueStatusId?: number;
  createDate?: string;
  modifyDate?: string | null;
};
export type IssueShortListResponse = {
  id?: number;
  issueSubject?: string | null;
  issueStatus?: string | null;
  createDate?: string;
  modifyDate?: string | null;
};
export type IssueItemModel = {
  id?: number;
  issueDate?: string;
  content?: string | null;
  user?: string | null;
  userId?: string;
  fileName?: string | null;
  fileSize?: number | null;
};
export type IssueItemListResponse = {
  issueId?: number;
  issueSubject?: string | null;
  businessUnit?: string | null;
  customerProduct?: string | null;
  issueStatusId?: number;
  createDate?: string;
  modifyDate?: string | null;
  issueItems?: IssueItemModel[] | null;
};
export type IssueSubjectListResponse = {
  id?: number;
  name?: string | null;
};
export type IssueSubjectSelectListModel = {
  productId?: number;
  businessUnitId?: number;
};
export type KubeDevOpsListResponse = {
  id?: number;
  name?: string | null;
  createDate?: string;
};
export type CreateKubeDevOpsModel = {
  kubeHostId?: number;
  name: string;
};
export type KubeHostListResponse = {
  id?: number;
  datacenter?: string | null;
  name?: string | null;
  status?: string | null;
  statusId?: number;
  createDate?: string;
  expireDate?: string | null;
};
export type GetKubeHostResponse = {
  id?: number;
  datacenter?: string | null;
  name?: string | null;
  cpu?: number;
  memory?: number;
  disk?: number;
  ipAddress?: string | null;
  status?: string | null;
  statusId?: number;
  createDate?: string;
  expireDate?: string | null;
};
export type GetKubeLoginResponse = {
  location?: string | null;
};
export type CreateKubeHostModel = {
  name: string;
  datacenterId: number;
  customerProductTypeId: number;
  isPredefined: boolean;
  productBundleId?: number | null;
};
export type EditKubeHostModel = {
  id?: number;
  cpu?: number;
  memory?: number;
  disk?: number;
};
export type KubeServiceListResponse = {
  id?: number;
  name?: string | null;
  cpu?: number;
  memory?: number;
  hdd?: number;
  autoScale?: boolean;
  createDate?: string;
};
export type CreateKubeServiceModel = {
  kubeHostId?: number;
  name: string;
  cpu?: number;
  memory?: number;
  autoScale?: boolean;
};
export type KubernetesListResponse = {
  id?: number;
  datacenter?: string | null;
  name?: string | null;
  status?: string | null;
  statusId?: number;
  createDate?: string;
};
export type GetKubernetesResponse = {
  id?: number;
  datacenter?: string | null;
  name?: string | null;
  masterNode?: number;
  workerNode?: number;
  status?: string | null;
  statusId?: number;
  customerProductType?: string | null;
  createDate?: string;
  modifyDate?: string;
  expireDate?: string | null;
};
export type CreateKubernetesModel = {
  clusterName: string;
  datacenterId: number;
  imageId: number;
  kubernetesVersionId: number;
  vmPassword: string;
  customerProductTypeId: number;
  isPredefined: boolean;
  productBundleId?: number | null;
  nodeCount?: number;
  cpu?: number | null;
  memory?: number | null;
  disk?: number | null;
};
export type KubernetesImageListResponse = {
  id?: number;
  name?: string | null;
  osId?: number;
  os?: string | null;
};
export type KubernetesNodeListResponse = {
  id?: number;
  datacenter?: string | null;
  name?: string | null;
  status?: string | null;
  kubernetesNodeType?: string | null;
  kubernetesNodeTypeId?: number;
  productTypeId?: number;
  productType?: string | null;
  hostId?: number;
  statusId?: number;
  ip?: string | null;
  vmProjectId?: number;
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
  id?: number;
  name?: string | null;
};
export type KubeUserListResponse = {
  id?: number;
  email?: string | null;
  userName?: string | null;
  createDate?: string;
};
export type KubeShortListResponse = {
  id?: number;
  name?: string | null;
};
export type CreateKubeUserModel = {
  email: string;
  username: string;
  password: string;
};
export type ChangeKubeUserPasswordModel = {
  id?: number;
  password: string;
};
export type KubeUserRoleListResponse = {
  id?: number;
  email?: string | null;
  userName?: string | null;
  createDate?: string;
};
export type CreateKubeUserRoleModel = {
  kubeHostId?: number;
  kubeUserId?: number;
};
export type KubeVolumeListResponse = {
  id?: number;
  name?: string | null;
  capacity?: number;
  createDate?: string;
};
export type CreateKubeVolumeModel = {
  kubeHostId?: number;
  name: string;
  capacity: number;
};
export type NotificationListResponse = {
  id?: number;
  content?: string | null;
  subject?: string | null;
  isRead?: boolean;
  notificationDate?: string;
};
export type PaymentListResponse = {
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
export type GetPaymentResponse = {
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
export type CreatePaymentResponse = {
  status?: boolean;
  location?: string | null;
};
export type CreatePaymentModel = {
  paymentProviderId?: number;
  amount: number;
};
export type ProductListResponse = {
  id?: number;
  name?: string | null;
  description?: string | null;
};
export type GetProductResponse = {
  id?: number;
  name?: string | null;
  description?: string | null;
  supplementaryDescription?: string | null;
};
export type ProductBundleConfiguration = {
  name?: string | null;
  quantity?: number;
};
export type ProductBundleListResponse = {
  id?: number;
  name?: string | null;
  description?: string | null;
  price?: number;
  configurations?: ProductBundleConfiguration[] | null;
};
export type ProductBundleVmListResponse = {
  id?: number;
  name?: string | null;
  price?: number;
  cpu?: number;
  memory?: number;
  disk?: number;
  ipv4?: number;
};
export type ProductBundleStorageListResponse = {
  id?: number;
  name?: string | null;
  price?: number;
  disk?: number;
};
export type ProductBundleWebListResponse = {
  id?: number;
  name?: string | null;
  price?: number;
  quantity?: number;
};
export type ProductItemListResponse = {
  id?: number;
  name?: string | null;
  price?: number;
};
export type VmSpec = {
  productItemId?: number;
  name?: string | null;
  quantity?: number;
};
export type MasterNodeModel = {
  kubernetesManagementItemId?: number;
  kubernetesManagementItemPrice?: number;
  masterNodeCount?: number;
  masterVmSpecs?: VmSpec[] | null;
};
export type KubernetesPriceResponse = {
  vmProductItemsPrice?: ProductItemListResponse[] | null;
  masterNodesInfo?: MasterNodeModel;
};
export type GetProfileResponse = {
  id?: string;
  phoneNumber?: string | null;
  phoneNumberConfirmed?: boolean;
  email?: string | null;
  emailConfirmed?: boolean;
  idConfirmed?: boolean;
  hasTwoFactor?: boolean;
  isLegal?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  nationalId?: string | null;
  birthDate?: string | null;
  address?: string | null;
};
export type GetNotificationStatusResponse = {
  id?: string;
  phoneNotify?: boolean;
  emailNotify?: boolean;
};
export type EditProfileResponse = {
  profileCompleted?: boolean;
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
  status?: string | null;
  statusId?: number;
  createDate?: string;
};
export type CreateRabbitHostModel = {
  name: string;
  username: string;
  password: string;
  datacenterId?: number;
  customerProductTypeId: number;
  isPredefined: boolean;
  productBundleId?: number | null;
  per1000Request?: number | null;
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
export type GetReferralResponse = {
  isJoined?: boolean;
  referralCode?: string | null;
  referralLink?: string | null;
  joinCode?: string | null;
};
export type JoinReferralModel = {
  referralCode: string;
};
export type RoleListResponse = {
  id?: number;
  name?: string | null;
};
export type RoleAccessListTuple = {
  accessId?: number;
  hasAccess?: boolean;
};
export type RoleAccessList = {
  roleId?: number;
  name?: string | null;
  description?: string | null;
  roleAccessTypeId?: number;
  hasAccess?: boolean;
  accesses?: RoleAccessListTuple[] | null;
};
export type RoleAccessListResponse = {
  isSuperUser?: boolean;
  isFinancialManager?: boolean;
  isAccountManager?: boolean;
  roleAccesses?: RoleAccessList[] | null;
};
export type EditRoleAccessModel = {
  email: string;
  isSuperUser: boolean;
  isFinancialManager: boolean;
  isAccountManager: boolean;
  roleAccesses?: RoleAccessListModel[] | null;
};
export type RoleAccessTypeListResponse = {
  id?: number;
  name?: string | null;
};
export type StorageHostListResponse = {
  id?: number;
  datacenter?: string | null;
  name?: string | null;
  status?: string | null;
  statusId?: number;
  isPublic?: boolean;
  public?: string | null;
  createDate?: string;
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
  customerProductTypeId: number;
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
  id?: number;
  accessKey?: string | null;
  createDate?: string;
};
export type CreateStorageUserResponse = {
  accessKey?: string | null;
  secretKey?: string | null;
};
export type CreateStorageUserModel = {
  storageHostId?: number;
};
export type VmListResponse = {
  id?: number;
  name?: string | null;
  status?: string | null;
  statusId?: number;
  datacenter?: string | null;
  operatingSystem?: string | null;
  ipv4?: string | null;
  vmProjectId?: number | null;
  vmProjectName?: string | null;
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
  publicKey?: string | null;
  datacenterId: number;
  imageId: number;
  customerProductTypeId: number;
  isPredefined: boolean;
  vmProjectId: number;
  productBundleId?: number | null;
  cpu?: number | null;
  memory?: number | null;
  disk?: number | null;
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
export type VmProjectList = {
  id?: number;
  name?: string | null;
  vmCount?: number;
  createDate?: string;
};
export type CreateVmProject = {
  name: string;
};
export type EditVmProject = {
  name: string;
  id: number;
};
export type VmSnapshotResponse = {
  id?: number;
  snapshotId?: number;
  name?: string | null;
  isActive?: boolean;
  isCreated?: boolean;
  datacenter?: string | null;
  operatingSystem?: string | null;
  description?: string | null;
  vmProjectId?: number | null;
  vmProjectName?: string | null;
  createDate?: string;
  modifiedDate?: string;
};
export type CreateSnapshotModel = {
  vmHostId?: number;
  snapshotName?: string | null;
  snapshotDescription?: string | null;
};
export type RevertSnapshotModel = {
  snapshotId?: number;
};
export type UseVoucherModel = {
  voucherCode: string;
};
export type VpcListResponse = {
  id?: number;
  name?: string | null;
  cpu?: number;
  memory?: number;
  disk?: number;
  ip?: number;
  createDate?: string;
};
export type CreateVpcHostModel = {
  name: string;
  datacenterId: number;
  customerProductTypeId: number;
  isPredefined: boolean;
  productBundleId?: number | null;
  cup?: number | null;
  memory?: number | null;
  disk?: number | null;
};
export type VpcNetworkListResponse = {
  id?: number;
  cidr?: string | null;
  createDate?: string;
};
export type CreateVpcNetworkModel = {
  vpcHostId?: number;
  cidr?: string | null;
};
export type WalletTransactionListResponse = {
  id?: number;
  transactionDate?: string;
  credit?: number;
  debit?: number;
  balance?: number;
  description?: string | null;
};
export type BalanceUsageResponse = {
  balance?: number;
  toDate?: string;
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
  customerProductTypeId: number;
  productBundleId?: number;
};
export type EditWebHostModel = {
  id?: number;
  productBundleId?: number;
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
export const {
  usePostApiMyAccountLoginMutation,
  usePostApiMyAccountTwoFactorLoginMutation,
  usePostApiMyAccountRegisterMutation,
  usePostApiMyAccountForgotMutation,
  usePostApiMyAccountForgotConfirmMutation,
  usePostApiMyAccountLogoutMutation,
  useGetApiMyBareMetalHostListQuery,
  useGetApiMyBareMetalHostGetByIdQuery,
  usePostApiMyBareMetalHostCreateMutation,
  useDeleteApiMyBareMetalHostDeleteByIdMutation,
  useGetApiMyBareMetalImageListByDatacenterIdQuery,
  useGetApiMyPortalBusinessUnitListQuery,
  useGetApiMyPortalCalculateMonthListQuery,
  useGetApiMyCdnAnalyticGetByCdnIdAndPeriodIdQuery,
  useGetApiMyCdnApiGatewayListByCdnIdQuery,
  useGetApiMyCdnApiGatewayGetByIdQuery,
  usePostApiMyCdnApiGatewayCreateMutation,
  usePutApiMyCdnApiGatewayEditMutation,
  useDeleteApiMyCdnApiGatewayDeleteByIdMutation,
  useGetApiMyCdnClientCertGetByCdnIdQuery,
  useGetApiMyCdnClientCertGetUserCertByCdnIdQuery,
  usePostApiMyCdnClientCertCreateUserCertMutation,
  useGetApiMyCdnEdgeCertGetByCdnIdQuery,
  useGetApiMyCdnEdgeCertGetUserCertByCdnIdQuery,
  usePostApiMyCdnEdgeCertCreateMutation,
  usePostApiMyCdnEdgeCertCreateUserCertMutation,
  useGetApiMyCdnHostListQuery,
  useGetApiMyCdnHostGetByIdQuery,
  useGetApiMyCdnHostGetNsStatusByIdQuery,
  useGetApiMyCdnHostOverviewByIdQuery,
  usePostApiMyCdnHostCheckZoneMutation,
  usePostApiMyCdnHostCreateMutation,
  useDeleteApiMyCdnHostDeleteByIdMutation,
  usePutApiMyCdnHostChangeCdnTypeMutation,
  usePutApiMyCdnHostChangeClientCertTypeMutation,
  usePutApiMyCdnHostChangeEdgeCertTypeMutation,
  usePutApiMyCdnHostChangeHstsMutation,
  usePutApiMyCdnHostChangeHttpsRedirectMutation,
  usePutApiMyCdnHostChangeNonWwwRedirectMutation,
  useGetApiMyCdnLoadBalanceListByCdnIdQuery,
  useGetApiMyCdnLoadBalanceGetByIdQuery,
  usePostApiMyCdnLoadBalanceCreateMutation,
  usePutApiMyCdnLoadBalanceEditMutation,
  useDeleteApiMyCdnLoadBalanceDeleteByIdMutation,
  useGetApiMyColocationHostListQuery,
  useGetApiMyColocationHostGetByIdQuery,
  usePostApiMyColocationHostCreateMutation,
  useDeleteApiMyColocationHostDeleteByIdMutation,
  useGetApiMyPortalCommissionListQuery,
  useGetApiMyPortalCustomerGetQuery,
  usePutApiMyPortalCustomerEditMutation,
  useGetApiMyPortalCustomerBillListQuery,
  useGetApiMyPortalCustomerBillShortListQuery,
  useGetApiMyPortalCustomerBillGetByIdQuery,
  useGetApiMyPortalCustomerBillGetCustomerProductByCustomerBillIdAndCustomerProductIdQuery,
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
  useGetApiMyDatacenterIpListByIdQuery,
  useDeleteApiMyDatacenterIpDeleteByIdMutation,
  useGetApiMyCdnDnsRecordListByCdnIdQuery,
  useGetApiMyCdnDnsRecordGetByIdQuery,
  usePostApiMyCdnDnsRecordCreateMutation,
  usePutApiMyCdnDnsRecordEditMutation,
  useDeleteApiMyCdnDnsRecordDeleteByIdMutation,
  usePutApiMyCdnDnsRecordChangeProxyStatusByIdMutation,
  useGetApiMyDomainHostListQuery,
  useGetApiMyDomainHostGetByIdQuery,
  useGetApiMyDomainHostGetStatusByIdQuery,
  usePostApiMyDomainHostGetPriceMutation,
  usePostApiMyDomainHostRegisterMutation,
  useDeleteApiMyDomainHostDeleteByIdMutation,
  usePutApiMyDomainHostChangeContactMutation,
  usePutApiMyDomainHostChangeNsMutation,
  usePostApiMyDomainHostResendVerificationByIdMutation,
  useGetApiMyColocationEquipmentListByTypeIdAndBrandIdQuery,
  useGetApiMyColocationEquipmentBrandListQuery,
  useGetApiMyColocationEquipmentTypeListQuery,
  useGetApiMyHomeIndexQuery,
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
  useGetApiMyKubesphereDevopsListByIdQuery,
  useGetApiMyKubesphereDevopsGetByIdQuery,
  usePostApiMyKubesphereDevopsCreateMutation,
  useDeleteApiMyKubesphereDevopsDeleteByIdMutation,
  useGetApiMyKubesphereHostListQuery,
  useGetApiMyKubesphereHostGetByIdQuery,
  useGetApiMyKubesphereHostGetLoginByIdQuery,
  usePostApiMyKubesphereHostCreateMutation,
  usePutApiMyKubesphereHostEditMutation,
  useDeleteApiMyKubesphereHostDeleteByIdMutation,
  useGetApiMyKubesphereServiceListByIdQuery,
  useGetApiMyKubesphereServiceGetByIdQuery,
  usePostApiMyKubesphereServiceCreateMutation,
  useDeleteApiMyKubesphereServiceDeleteByIdMutation,
  useGetApiMyKubernetesHostListQuery,
  useGetApiMyKubernetesHostGetByIdQuery,
  usePostApiMyKubernetesHostCreateMutation,
  useDeleteApiMyKubernetesHostDeleteByIdMutation,
  useGetApiMyKubernetesImageListByDatacenterIdQuery,
  useGetApiMyKubernetesNodeListByKubernetesHostIdQuery,
  usePostApiMyKubernetesNodeCreateMutation,
  usePutApiMyKubernetesNodeDeleteByIdMutation,
  useGetApiMyKubernetesVersionListQuery,
  useGetApiMyKubesphereUserListQuery,
  useGetApiMyKubesphereUserShortListQuery,
  usePostApiMyKubesphereUserCreateMutation,
  useDeleteApiMyKubesphereUserDeleteByIdMutation,
  usePostApiMyKubesphereUserChangePasswordMutation,
  useGetApiMyKubesphereUserRoleListByKubeHostIdQuery,
  usePostApiMyKubesphereUserRoleCreateMutation,
  useDeleteApiMyKubesphereUserRoleDeleteByIdMutation,
  useGetApiMyKubesphereVolumeListByIdQuery,
  useGetApiMyKubesphereVolumeGetByIdQuery,
  usePostApiMyKubesphereVolumeCreateMutation,
  useDeleteApiMyKubesphereVolumeDeleteByIdMutation,
  useGetApiMyPortalNotificationListQuery,
  useGetApiMyPortalNotificationShortListQuery,
  usePutApiMyPortalNotificationSeenByIdMutation,
  useGetApiMyPortalPaymentListQuery,
  useGetApiMyPortalPaymentGetByIdQuery,
  usePostApiMyPortalPaymentCreateMutation,
  usePostApiMyPortalPaymentPecCallBackMutation,
  usePostApiMyPortalPaymentSepCallBackMutation,
  useGetApiMyPortalProductListQuery,
  useGetApiMyPortalProductGetByIdQuery,
  useGetApiMyPortalProductBundleListByProductIdQuery,
  useGetApiMyPortalProductBundleVmListQuery,
  useGetApiMyPortalProductBundleStorageListQuery,
  useGetApiMyPortalProductBundleWebHostListQuery,
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
  useGetApiMyRabbitHostListQuery,
  useGetApiMyRabbitHostGetByIdQuery,
  usePostApiMyRabbitHostCreateMutation,
  usePutApiMyRabbitHostChangeServiceMutation,
  useDeleteApiMyRabbitHostDeleteByIdMutation,
  usePostApiMyRabbitHostChangeExchangeMutation,
  useGetApiMyRabbitUserListByRabbitHostIdQuery,
  usePostApiMyRabbitUserCreateMutation,
  useDeleteApiMyRabbitUserDeleteByIdMutation,
  usePostApiMyRabbitUserChangePasswordMutation,
  useGetApiMyPortalReferralGetQuery,
  usePostApiMyPortalReferralJoinMutation,
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
  useGetApiMyVmHostListByVmProjectIdQuery,
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
  useGetApiMyVmImageListByDatacenterIdQuery,
  useGetApiMyVmIsoListByDatacenterIdQuery,
  usePutApiMyVmIsoMountMutation,
  usePutApiMyVmIsoUnmountMutation,
  useGetApiMyVmKmsGetByIdAndTypeIdQuery,
  useGetApiMyVmProjectListQuery,
  usePostApiMyVmProjectCreateMutation,
  usePutApiMyVmProjectEditMutation,
  useDeleteApiMyVmProjectDeleteByIdMutation,
  useGetApiMyVmSnapshotListByVmIdQuery,
  useGetApiMyVmSnapshotGetByIdQuery,
  usePostApiMyVmSnapshotCreateMutation,
  usePutApiMyVmSnapshotRevertMutation,
  useDeleteApiMyVmSnapshotDeleteByIdMutation,
  usePostApiMyPortalVoucherUseMutation,
  useGetApiMyVpcHostListQuery,
  usePostApiMyVpcHostCreateMutation,
  useGetApiMyVpcNetworkListByVpcHostIdQuery,
  usePostApiMyVpcNetworkCreateMutation,
  useGetApiMyPortalWalletListQuery,
  useGetApiMyPortalWalletGetBalanceQuery,
  useGetApiMyPortalWalletBalanceUsageQuery,
  useGetApiMyWebHostListQuery,
  useGetApiMyWebHostGetByIdQuery,
  useGetApiMyWebHostGetLoginSessionByIdQuery,
  usePostApiMyWebHostCheckDomainMutation,
  usePostApiMyWebHostCreateMutation,
  usePutApiMyWebHostEditMutation,
  useDeleteApiMyWebHostDeleteByIdMutation,
  usePostApiMyPortalContactUsCreateMutation,
  usePostApiMyPortalNewsCreateMutation,
  usePostApiMyDomainWhoisGetMutation,
} = api;

