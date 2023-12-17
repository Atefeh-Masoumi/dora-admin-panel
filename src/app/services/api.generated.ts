import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "src/app/services/baseQuery";
export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: (build) => ({
    postApiAccountLogin: build.mutation<
      PostApiAccountLoginApiResponse,
      PostApiAccountLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/login`,
        method: "POST",
        body: queryArg.loginModel,
      }),
    }),
    postApiAccountRegister: build.mutation<
      PostApiAccountRegisterApiResponse,
      PostApiAccountRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/register`,
        method: "POST",
        body: queryArg.registerModel,
      }),
    }),
    postApiAccountForgot: build.mutation<
      PostApiAccountForgotApiResponse,
      PostApiAccountForgotApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/forgot`,
        method: "POST",
        body: queryArg.forgotModel,
      }),
    }),
    postApiAccountForgotConfirm: build.mutation<
      PostApiAccountForgotConfirmApiResponse,
      PostApiAccountForgotConfirmApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/forgot-confirm`,
        method: "POST",
        body: queryArg.forgotConfirmModel,
      }),
    }),
    postApiAccountLogout: build.mutation<
      PostApiAccountLogoutApiResponse,
      PostApiAccountLogoutApiArg
    >({
      query: () => ({ url: `/api/account/logout`, method: "POST" }),
    }),
    getApiCdnAnalyticGetByCdnIdAndPeriodId: build.query<
      GetApiCdnAnalyticGetByCdnIdAndPeriodIdApiResponse,
      GetApiCdnAnalyticGetByCdnIdAndPeriodIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/analytic/get/${queryArg.cdnId}/${queryArg.periodId}`,
      }),
    }),
    getApiCdnApiGatewayListByCdnId: build.query<
      GetApiCdnApiGatewayListByCdnIdApiResponse,
      GetApiCdnApiGatewayListByCdnIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/api-gateway/list/${queryArg.cdnId}`,
      }),
    }),
    getApiCdnApiGatewayGetById: build.query<
      GetApiCdnApiGatewayGetByIdApiResponse,
      GetApiCdnApiGatewayGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/cdn/api-gateway/get/${queryArg.id}` }),
    }),
    postApiCdnApiGatewayCreate: build.mutation<
      PostApiCdnApiGatewayCreateApiResponse,
      PostApiCdnApiGatewayCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/api-gateway/create`,
        method: "POST",
        body: queryArg.createApiGatewayModel,
      }),
    }),
    putApiCdnApiGatewayEdit: build.mutation<
      PutApiCdnApiGatewayEditApiResponse,
      PutApiCdnApiGatewayEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/api-gateway/edit`,
        method: "PUT",
        body: queryArg.editApiGatewayModel,
      }),
    }),
    deleteApiCdnApiGatewayDeleteById: build.mutation<
      DeleteApiCdnApiGatewayDeleteByIdApiResponse,
      DeleteApiCdnApiGatewayDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/api-gateway/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiBareMetalList: build.query<
      GetApiBareMetalListApiResponse,
      GetApiBareMetalListApiArg
    >({
      query: () => ({ url: `/api/bare-metal/list` }),
    }),
    getApiBareMetalGetById: build.query<
      GetApiBareMetalGetByIdApiResponse,
      GetApiBareMetalGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/bare-metal/get/${queryArg.id}` }),
    }),
    postApiBareMetalCreate: build.mutation<
      PostApiBareMetalCreateApiResponse,
      PostApiBareMetalCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/bare-metal/create`,
        method: "POST",
        body: queryArg.createBareMetalModel,
      }),
    }),
    deleteApiBareMetalDelete: build.mutation<
      DeleteApiBareMetalDeleteApiResponse,
      DeleteApiBareMetalDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/bare-metal/delete`,
        method: "DELETE",
        params: { id: queryArg.id },
      }),
    }),
    getApiCloudBusinessUnitList: build.query<
      GetApiCloudBusinessUnitListApiResponse,
      GetApiCloudBusinessUnitListApiArg
    >({
      query: () => ({ url: `/api/cloud/business-unit/list` }),
    }),
    getApiCloudCalculateMonthList: build.query<
      GetApiCloudCalculateMonthListApiResponse,
      GetApiCloudCalculateMonthListApiArg
    >({
      query: () => ({ url: `/api/cloud/calculate-month/list` }),
    }),
    getApiCdnClientCertGetByCdnId: build.query<
      GetApiCdnClientCertGetByCdnIdApiResponse,
      GetApiCdnClientCertGetByCdnIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/client-cert/get/${queryArg.cdnId}`,
      }),
    }),
    getApiCdnClientCertGetUserCertByCdnId: build.query<
      GetApiCdnClientCertGetUserCertByCdnIdApiResponse,
      GetApiCdnClientCertGetUserCertByCdnIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/client-cert/get-user-cert/${queryArg.cdnId}`,
      }),
    }),
    postApiCdnClientCertCreateUserCert: build.mutation<
      PostApiCdnClientCertCreateUserCertApiResponse,
      PostApiCdnClientCertCreateUserCertApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/client-cert/create-user-cert`,
        method: "POST",
        body: queryArg.createCdnClientUserCertModel,
      }),
    }),
    getApiCdnEdgeCertGetByCdnId: build.query<
      GetApiCdnEdgeCertGetByCdnIdApiResponse,
      GetApiCdnEdgeCertGetByCdnIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/edge-cert/get/${queryArg.cdnId}`,
      }),
    }),
    getApiCdnEdgeCertGetUserCertByCdnId: build.query<
      GetApiCdnEdgeCertGetUserCertByCdnIdApiResponse,
      GetApiCdnEdgeCertGetUserCertByCdnIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/edge-cert/get-user-cert/${queryArg.cdnId}`,
      }),
    }),
    postApiCdnEdgeCertCreate: build.mutation<
      PostApiCdnEdgeCertCreateApiResponse,
      PostApiCdnEdgeCertCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/edge-cert/create`,
        method: "POST",
        body: queryArg.createCdnEdgeCertModel,
      }),
    }),
    postApiCdnEdgeCertCreateUserCert: build.mutation<
      PostApiCdnEdgeCertCreateUserCertApiResponse,
      PostApiCdnEdgeCertCreateUserCertApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/edge-cert/create-user-cert`,
        method: "POST",
        body: queryArg.createCdnEdgeUserCertModel,
      }),
    }),
    getApiCdnHostList: build.query<
      GetApiCdnHostListApiResponse,
      GetApiCdnHostListApiArg
    >({
      query: () => ({ url: `/api/cdn/host/list` }),
    }),
    getApiCdnHostGetById: build.query<
      GetApiCdnHostGetByIdApiResponse,
      GetApiCdnHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/cdn/host/get/${queryArg.id}` }),
    }),
    getApiCdnHostGetNsStatusById: build.query<
      GetApiCdnHostGetNsStatusByIdApiResponse,
      GetApiCdnHostGetNsStatusByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/host/get-ns-status/${queryArg.id}`,
      }),
    }),
    getApiCdnHostOverviewById: build.query<
      GetApiCdnHostOverviewByIdApiResponse,
      GetApiCdnHostOverviewByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/cdn/host/overview/${queryArg.id}` }),
    }),
    postApiCdnHostCheckZone: build.mutation<
      PostApiCdnHostCheckZoneApiResponse,
      PostApiCdnHostCheckZoneApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/host/check-zone`,
        method: "POST",
        body: queryArg.checkCdnModel,
      }),
    }),
    postApiCdnHostCreate: build.mutation<
      PostApiCdnHostCreateApiResponse,
      PostApiCdnHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/host/create`,
        method: "POST",
        body: queryArg.createCdnModel,
      }),
    }),
    deleteApiCdnHostDeleteById: build.mutation<
      DeleteApiCdnHostDeleteByIdApiResponse,
      DeleteApiCdnHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putApiCdnHostChangeCdnType: build.mutation<
      PutApiCdnHostChangeCdnTypeApiResponse,
      PutApiCdnHostChangeCdnTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/host/change-Cdn-type`,
        method: "PUT",
        body: queryArg.changeCdnTypeModel,
      }),
    }),
    putApiCdnHostChangeClientCertType: build.mutation<
      PutApiCdnHostChangeClientCertTypeApiResponse,
      PutApiCdnHostChangeClientCertTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/host/change-client-cert-type`,
        method: "PUT",
        body: queryArg.changeClientCertTypeModel,
      }),
    }),
    putApiCdnHostChangeEdgeCertType: build.mutation<
      PutApiCdnHostChangeEdgeCertTypeApiResponse,
      PutApiCdnHostChangeEdgeCertTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/host/change-edge-cert-type`,
        method: "PUT",
        body: queryArg.changeEdgeCertTypeModel,
      }),
    }),
    putApiCdnHostChangeHsts: build.mutation<
      PutApiCdnHostChangeHstsApiResponse,
      PutApiCdnHostChangeHstsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/host/change-hsts`,
        method: "PUT",
        body: queryArg.changeHstsModel,
      }),
    }),
    putApiCdnHostChangeHttpsRedirect: build.mutation<
      PutApiCdnHostChangeHttpsRedirectApiResponse,
      PutApiCdnHostChangeHttpsRedirectApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/host/change-https-redirect`,
        method: "PUT",
        body: queryArg.changeHttpsRedirectModel,
      }),
    }),
    putApiCdnHostChangeNonWwwRedirect: build.mutation<
      PutApiCdnHostChangeNonWwwRedirectApiResponse,
      PutApiCdnHostChangeNonWwwRedirectApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/host/change-non-www-redirect`,
        method: "PUT",
        body: queryArg.changeNonWwwRedirectModel,
      }),
    }),
    getApiColocationList: build.query<
      GetApiColocationListApiResponse,
      GetApiColocationListApiArg
    >({
      query: () => ({ url: `/api/colocation/list` }),
    }),
    postApiColocationCreate: build.mutation<
      PostApiColocationCreateApiResponse,
      PostApiColocationCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/colocation/create`,
        method: "POST",
        body: queryArg.createColocationModel,
      }),
    }),
    deleteApiColocationDeleteById: build.mutation<
      DeleteApiColocationDeleteByIdApiResponse,
      DeleteApiColocationDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/colocation/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiCloudCommissionList: build.query<
      GetApiCloudCommissionListApiResponse,
      GetApiCloudCommissionListApiArg
    >({
      query: () => ({ url: `/api/cloud/commission/list` }),
    }),
    getApiCloudCustomerGet: build.query<
      GetApiCloudCustomerGetApiResponse,
      GetApiCloudCustomerGetApiArg
    >({
      query: () => ({ url: `/api/cloud/customer/get` }),
    }),
    getApiCloudCustomerGetCustomerType: build.query<
      GetApiCloudCustomerGetCustomerTypeApiResponse,
      GetApiCloudCustomerGetCustomerTypeApiArg
    >({
      query: () => ({ url: `/api/cloud/customer/get-customer-type` }),
    }),
    putApiCloudCustomerEdit: build.mutation<
      PutApiCloudCustomerEditApiResponse,
      PutApiCloudCustomerEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/customer/edit`,
        method: "PUT",
        body: queryArg.editCustomerModel,
      }),
    }),
    putApiCloudCustomerEditCustomerType: build.mutation<
      PutApiCloudCustomerEditCustomerTypeApiResponse,
      PutApiCloudCustomerEditCustomerTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/customer/edit-customer-type`,
        method: "PUT",
        body: queryArg.editCustomerTypeModel,
      }),
    }),
    getApiCloudBillList: build.query<
      GetApiCloudBillListApiResponse,
      GetApiCloudBillListApiArg
    >({
      query: () => ({ url: `/api/cloud/bill/list` }),
    }),
    getApiCloudBillBillShortList: build.query<
      GetApiCloudBillBillShortListApiResponse,
      GetApiCloudBillBillShortListApiArg
    >({
      query: () => ({ url: `/api/cloud/bill/bill-short-list` }),
    }),
    getApiCloudBillGetById: build.query<
      GetApiCloudBillGetByIdApiResponse,
      GetApiCloudBillGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/cloud/bill/get/${queryArg.id}` }),
    }),
    getApiCloudBillDownloadById: build.query<
      GetApiCloudBillDownloadByIdApiResponse,
      GetApiCloudBillDownloadByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/cloud/bill/download/${queryArg.id}` }),
    }),
    getApiCloudCustomerProductListByProductId: build.query<
      GetApiCloudCustomerProductListByProductIdApiResponse,
      GetApiCloudCustomerProductListByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/customer-product/list/${queryArg.productId}`,
      }),
    }),
    postApiCloudCustomerProductTransfer: build.mutation<
      PostApiCloudCustomerProductTransferApiResponse,
      PostApiCloudCustomerProductTransferApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/customer-product/transfer`,
        method: "POST",
        body: queryArg.customerProductTransferModel,
      }),
    }),
    postApiCloudCustomerUserChangeUserCustomer: build.mutation<
      PostApiCloudCustomerUserChangeUserCustomerApiResponse,
      PostApiCloudCustomerUserChangeUserCustomerApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/customer-user/change-user-customer`,
        method: "POST",
        body: queryArg.changeUserCustomerModel,
      }),
    }),
    getApiCloudDashboardUsageByCategoryId: build.query<
      GetApiCloudDashboardUsageByCategoryIdApiResponse,
      GetApiCloudDashboardUsageByCategoryIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/dashboard/usage/${queryArg.categoryId}`,
      }),
    }),
    getApiDatacenterList: build.query<
      GetApiDatacenterListApiResponse,
      GetApiDatacenterListApiArg
    >({
      query: () => ({ url: `/api/datacenter/list` }),
    }),
    getApiDatacenterIpListByProductIdAndId: build.query<
      GetApiDatacenterIpListByProductIdAndIdApiResponse,
      GetApiDatacenterIpListByProductIdAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/datacenter/ip/list/${queryArg.productId}/${queryArg.id}`,
      }),
    }),
    deleteApiDatacenterIpDeleteById: build.mutation<
      DeleteApiDatacenterIpDeleteByIdApiResponse,
      DeleteApiDatacenterIpDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/datacenter/ip/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiCdnDnsRecordListByCdnId: build.query<
      GetApiCdnDnsRecordListByCdnIdApiResponse,
      GetApiCdnDnsRecordListByCdnIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/dns-record/list/${queryArg.cdnId}`,
      }),
    }),
    getApiCdnDnsRecordGetById: build.query<
      GetApiCdnDnsRecordGetByIdApiResponse,
      GetApiCdnDnsRecordGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/cdn/dns-record/get/${queryArg.id}` }),
    }),
    postApiCdnDnsRecordCreate: build.mutation<
      PostApiCdnDnsRecordCreateApiResponse,
      PostApiCdnDnsRecordCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/dns-record/create`,
        method: "POST",
        body: queryArg.createDnsRecordModel,
      }),
    }),
    putApiCdnDnsRecordEdit: build.mutation<
      PutApiCdnDnsRecordEditApiResponse,
      PutApiCdnDnsRecordEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/dns-record/edit`,
        method: "PUT",
        body: queryArg.editDnsRecordModel,
      }),
    }),
    deleteApiCdnDnsRecordDeleteById: build.mutation<
      DeleteApiCdnDnsRecordDeleteByIdApiResponse,
      DeleteApiCdnDnsRecordDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/dns-record/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putApiCdnDnsRecordChangeProxyStatusById: build.mutation<
      PutApiCdnDnsRecordChangeProxyStatusByIdApiResponse,
      PutApiCdnDnsRecordChangeProxyStatusByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/dns-record/change-proxy-status/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiDomainList: build.query<
      GetApiDomainListApiResponse,
      GetApiDomainListApiArg
    >({
      query: () => ({ url: `/api/domain/list` }),
    }),
    getApiDomainGetById: build.query<
      GetApiDomainGetByIdApiResponse,
      GetApiDomainGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/domain/get/${queryArg.id}` }),
    }),
    getApiDomainGetStatusById: build.query<
      GetApiDomainGetStatusByIdApiResponse,
      GetApiDomainGetStatusByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/domain/get-status/${queryArg.id}` }),
    }),
    postApiDomainGetPrice: build.mutation<
      PostApiDomainGetPriceApiResponse,
      PostApiDomainGetPriceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/domain/get-price`,
        method: "POST",
        body: queryArg.getPriceModel,
      }),
    }),
    postApiDomainRegister: build.mutation<
      PostApiDomainRegisterApiResponse,
      PostApiDomainRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/api/domain/register`,
        method: "POST",
        body: queryArg.registerDomainModel,
      }),
    }),
    deleteApiDomainDeleteById: build.mutation<
      DeleteApiDomainDeleteByIdApiResponse,
      DeleteApiDomainDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/domain/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putApiDomainChangeContact: build.mutation<
      PutApiDomainChangeContactApiResponse,
      PutApiDomainChangeContactApiArg
    >({
      query: (queryArg) => ({
        url: `/api/domain/change-contact`,
        method: "PUT",
        body: queryArg.changeContactModel,
      }),
    }),
    putApiDomainChangeNs: build.mutation<
      PutApiDomainChangeNsApiResponse,
      PutApiDomainChangeNsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/domain/change-ns`,
        method: "PUT",
        body: queryArg.changeNsModel,
      }),
    }),
    postApiDomainResendVerificationById: build.mutation<
      PostApiDomainResendVerificationByIdApiResponse,
      PostApiDomainResendVerificationByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/domain/resend-verification/${queryArg.id}`,
        method: "POST",
      }),
    }),
    getApiHomeIndex: build.query<
      GetApiHomeIndexApiResponse,
      GetApiHomeIndexApiArg
    >({
      query: () => ({ url: `/api/home/index` }),
    }),
    getApiCloudInvoiceList: build.query<
      GetApiCloudInvoiceListApiResponse,
      GetApiCloudInvoiceListApiArg
    >({
      query: () => ({ url: `/api/cloud/invoice/list` }),
    }),
    getApiCloudInvoiceGetById: build.query<
      GetApiCloudInvoiceGetByIdApiResponse,
      GetApiCloudInvoiceGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/cloud/invoice/get/${queryArg.id}` }),
    }),
    getApiPlatformDevopsListById: build.query<
      GetApiPlatformDevopsListByIdApiResponse,
      GetApiPlatformDevopsListByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/devops/list/${queryArg.id}`,
      }),
    }),
    getApiPlatformDevopsGetById: build.query<
      GetApiPlatformDevopsGetByIdApiResponse,
      GetApiPlatformDevopsGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/platform/devops/get/${queryArg.id}` }),
    }),
    postApiPlatformDevopsCreate: build.mutation<
      PostApiPlatformDevopsCreateApiResponse,
      PostApiPlatformDevopsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/devops/create`,
        method: "POST",
        body: queryArg.createKubeDevOpsModel,
      }),
    }),
    deleteApiPlatformDevopsDeleteById: build.mutation<
      DeleteApiPlatformDevopsDeleteByIdApiResponse,
      DeleteApiPlatformDevopsDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/devops/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiPlatformNamespaceList: build.query<
      GetApiPlatformNamespaceListApiResponse,
      GetApiPlatformNamespaceListApiArg
    >({
      query: () => ({ url: `/api/platform/namespace/list` }),
    }),
    getApiPlatformNamespaceGetById: build.query<
      GetApiPlatformNamespaceGetByIdApiResponse,
      GetApiPlatformNamespaceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/namespace/get/${queryArg.id}`,
      }),
    }),
    getApiPlatformNamespaceGetLoginById: build.query<
      GetApiPlatformNamespaceGetLoginByIdApiResponse,
      GetApiPlatformNamespaceGetLoginByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/namespace/get-login/${queryArg.id}`,
      }),
    }),
    postApiPlatformNamespaceCreate: build.mutation<
      PostApiPlatformNamespaceCreateApiResponse,
      PostApiPlatformNamespaceCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/namespace/create`,
        method: "POST",
        body: queryArg.createKubeHostModel,
      }),
    }),
    putApiPlatformNamespaceEdit: build.mutation<
      PutApiPlatformNamespaceEditApiResponse,
      PutApiPlatformNamespaceEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/namespace/edit`,
        method: "PUT",
        body: queryArg.editKubeHostModel,
      }),
    }),
    deleteApiPlatformNamespaceDeleteById: build.mutation<
      DeleteApiPlatformNamespaceDeleteByIdApiResponse,
      DeleteApiPlatformNamespaceDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/namespace/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiPlatformServiceListById: build.query<
      GetApiPlatformServiceListByIdApiResponse,
      GetApiPlatformServiceListByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/service/list/${queryArg.id}`,
      }),
    }),
    getApiPlatformServiceGetById: build.query<
      GetApiPlatformServiceGetByIdApiResponse,
      GetApiPlatformServiceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/service/get/${queryArg.id}`,
      }),
    }),
    postApiPlatformServiceCreate: build.mutation<
      PostApiPlatformServiceCreateApiResponse,
      PostApiPlatformServiceCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/service/create`,
        method: "POST",
        body: queryArg.createKubeServiceModel,
      }),
    }),
    deleteApiPlatformServiceDeleteById: build.mutation<
      DeleteApiPlatformServiceDeleteByIdApiResponse,
      DeleteApiPlatformServiceDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/service/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiPlatformKubernetesList: build.query<
      GetApiPlatformKubernetesListApiResponse,
      GetApiPlatformKubernetesListApiArg
    >({
      query: () => ({ url: `/api/platform/kubernetes/list` }),
    }),
    getApiPlatformKubernetesGetById: build.query<
      GetApiPlatformKubernetesGetByIdApiResponse,
      GetApiPlatformKubernetesGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/kubernetes/get/${queryArg.id}`,
      }),
    }),
    postApiPlatformKubernetesCreate: build.mutation<
      PostApiPlatformKubernetesCreateApiResponse,
      PostApiPlatformKubernetesCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/kubernetes/create`,
        method: "POST",
        body: queryArg.createClusterModel,
      }),
    }),
    putApiPlatformKubernetesEdit: build.mutation<
      PutApiPlatformKubernetesEditApiResponse,
      PutApiPlatformKubernetesEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/kubernetes/edit`,
        method: "PUT",
        body: queryArg.editClusterModel,
      }),
    }),
    deleteApiPlatformKubernetesDeleteById: build.mutation<
      DeleteApiPlatformKubernetesDeleteByIdApiResponse,
      DeleteApiPlatformKubernetesDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/kubernetes/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiPlatformUserList: build.query<
      GetApiPlatformUserListApiResponse,
      GetApiPlatformUserListApiArg
    >({
      query: () => ({ url: `/api/platform/user/list` }),
    }),
    getApiPlatformUserShortList: build.query<
      GetApiPlatformUserShortListApiResponse,
      GetApiPlatformUserShortListApiArg
    >({
      query: () => ({ url: `/api/platform/user/short-list` }),
    }),
    postApiPlatformUserCreate: build.mutation<
      PostApiPlatformUserCreateApiResponse,
      PostApiPlatformUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/user/create`,
        method: "POST",
        body: queryArg.createKubeUserModel,
      }),
    }),
    deleteApiPlatformUserDeleteById: build.mutation<
      DeleteApiPlatformUserDeleteByIdApiResponse,
      DeleteApiPlatformUserDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/user/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiPlatformUserChangePassword: build.mutation<
      PostApiPlatformUserChangePasswordApiResponse,
      PostApiPlatformUserChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/user/change-password`,
        method: "POST",
        body: queryArg.changeKubeUserPasswordModel,
      }),
    }),
    getApiPlatformUserRoleListByKubeHostId: build.query<
      GetApiPlatformUserRoleListByKubeHostIdApiResponse,
      GetApiPlatformUserRoleListByKubeHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/user-role/list/${queryArg.kubeHostId}`,
      }),
    }),
    postApiPlatformUserRoleCreate: build.mutation<
      PostApiPlatformUserRoleCreateApiResponse,
      PostApiPlatformUserRoleCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/user-role/create`,
        method: "POST",
        body: queryArg.createKubeUserRoleModel,
      }),
    }),
    deleteApiPlatformUserRoleDeleteById: build.mutation<
      DeleteApiPlatformUserRoleDeleteByIdApiResponse,
      DeleteApiPlatformUserRoleDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/user-role/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiPlatformVolumeListById: build.query<
      GetApiPlatformVolumeListByIdApiResponse,
      GetApiPlatformVolumeListByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/volume/list/${queryArg.id}`,
      }),
    }),
    getApiPlatformVolumeGetById: build.query<
      GetApiPlatformVolumeGetByIdApiResponse,
      GetApiPlatformVolumeGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/platform/volume/get/${queryArg.id}` }),
    }),
    postApiPlatformVolumeCreate: build.mutation<
      PostApiPlatformVolumeCreateApiResponse,
      PostApiPlatformVolumeCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/volume/create`,
        method: "POST",
        body: queryArg.createKubeVolumeModel,
      }),
    }),
    deleteApiPlatformVolumeDeleteById: build.mutation<
      DeleteApiPlatformVolumeDeleteByIdApiResponse,
      DeleteApiPlatformVolumeDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/platform/volume/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiCdnLoadBalanceListByCdnId: build.query<
      GetApiCdnLoadBalanceListByCdnIdApiResponse,
      GetApiCdnLoadBalanceListByCdnIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/load-balance/list/${queryArg.cdnId}`,
      }),
    }),
    getApiCdnLoadBalanceGetById: build.query<
      GetApiCdnLoadBalanceGetByIdApiResponse,
      GetApiCdnLoadBalanceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/load-balance/get/${queryArg.id}`,
      }),
    }),
    postApiCdnLoadBalanceCreate: build.mutation<
      PostApiCdnLoadBalanceCreateApiResponse,
      PostApiCdnLoadBalanceCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/load-balance/create`,
        method: "POST",
        body: queryArg.createLoadBalanceModel,
      }),
    }),
    putApiCdnLoadBalanceEdit: build.mutation<
      PutApiCdnLoadBalanceEditApiResponse,
      PutApiCdnLoadBalanceEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/load-balance/edit`,
        method: "PUT",
        body: queryArg.editLoadBalanceModel,
      }),
    }),
    deleteApiCdnLoadBalanceDeleteById: build.mutation<
      DeleteApiCdnLoadBalanceDeleteByIdApiResponse,
      DeleteApiCdnLoadBalanceDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cdn/load-balance/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiCloudNotificationList: build.query<
      GetApiCloudNotificationListApiResponse,
      GetApiCloudNotificationListApiArg
    >({
      query: () => ({ url: `/api/cloud/notification/list` }),
    }),
    getApiCloudNotificationShortList: build.query<
      GetApiCloudNotificationShortListApiResponse,
      GetApiCloudNotificationShortListApiArg
    >({
      query: () => ({ url: `/api/cloud/notification/short-list` }),
    }),
    getApiCloudPaymentList: build.query<
      GetApiCloudPaymentListApiResponse,
      GetApiCloudPaymentListApiArg
    >({
      query: () => ({ url: `/api/cloud/payment/list` }),
    }),
    getApiCloudPaymentGetById: build.query<
      GetApiCloudPaymentGetByIdApiResponse,
      GetApiCloudPaymentGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/cloud/payment/get/${queryArg.id}` }),
    }),
    postApiCloudPaymentCreate: build.mutation<
      PostApiCloudPaymentCreateApiResponse,
      PostApiCloudPaymentCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/payment/create`,
        method: "POST",
        body: queryArg.createPaymentModel,
      }),
    }),
    postApiCloudPaymentPecCallBack: build.mutation<
      PostApiCloudPaymentPecCallBackApiResponse,
      PostApiCloudPaymentPecCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/payment/pec-call-back`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postApiCloudPaymentSepCallBack: build.mutation<
      PostApiCloudPaymentSepCallBackApiResponse,
      PostApiCloudPaymentSepCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/payment/sep-call-back`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiCloudProductList: build.query<
      GetApiCloudProductListApiResponse,
      GetApiCloudProductListApiArg
    >({
      query: () => ({ url: `/api/cloud/product/list` }),
    }),
    getApiCloudProductBundleListByProductId: build.query<
      GetApiCloudProductBundleListByProductIdApiResponse,
      GetApiCloudProductBundleListByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/product-bundle/list/${queryArg.productId}`,
      }),
    }),
    getApiCloudProductItemListByProductId: build.query<
      GetApiCloudProductItemListByProductIdApiResponse,
      GetApiCloudProductItemListByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/product-item/list/${queryArg.productId}`,
      }),
    }),
    getApiAccountProfileGet: build.query<
      GetApiAccountProfileGetApiResponse,
      GetApiAccountProfileGetApiArg
    >({
      query: () => ({ url: `/api/account/profile/get` }),
    }),
    getApiAccountProfileGetNotificationStatus: build.query<
      GetApiAccountProfileGetNotificationStatusApiResponse,
      GetApiAccountProfileGetNotificationStatusApiArg
    >({
      query: () => ({ url: `/api/account/profile/get-notification-status` }),
    }),
    putApiAccountProfileEdit: build.mutation<
      PutApiAccountProfileEditApiResponse,
      PutApiAccountProfileEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/profile/edit`,
        method: "PUT",
        body: queryArg.editProfileModel,
      }),
    }),
    putApiAccountProfileEditEmail: build.mutation<
      PutApiAccountProfileEditEmailApiResponse,
      PutApiAccountProfileEditEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/profile/edit-email`,
        method: "PUT",
        body: queryArg.editEmailModel,
      }),
    }),
    postApiAccountProfileConfirmEmail: build.mutation<
      PostApiAccountProfileConfirmEmailApiResponse,
      PostApiAccountProfileConfirmEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/profile/confirm-email`,
        method: "POST",
        body: queryArg.confirmEmailModel,
      }),
    }),
    putApiAccountProfileEditPhoneNumber: build.mutation<
      PutApiAccountProfileEditPhoneNumberApiResponse,
      PutApiAccountProfileEditPhoneNumberApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/profile/edit-phone-number`,
        method: "PUT",
        body: queryArg.editPhoneNumberModel,
      }),
    }),
    postApiAccountProfileConfirmPhoneNumber: build.mutation<
      PostApiAccountProfileConfirmPhoneNumberApiResponse,
      PostApiAccountProfileConfirmPhoneNumberApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/profile/confirm-phone-number`,
        method: "POST",
        body: queryArg.confirmPhoneNumberModel,
      }),
    }),
    putApiAccountProfileEditEmailNotification: build.mutation<
      PutApiAccountProfileEditEmailNotificationApiResponse,
      PutApiAccountProfileEditEmailNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/profile/edit-email-notification`,
        method: "PUT",
        body: queryArg.editEmailNotifyModel,
      }),
    }),
    putApiAccountProfileEditPhoneNotification: build.mutation<
      PutApiAccountProfileEditPhoneNotificationApiResponse,
      PutApiAccountProfileEditPhoneNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/profile/edit-phone-notification`,
        method: "PUT",
        body: queryArg.editPhoneNotifyModel,
      }),
    }),
    postApiAccountProfileChangePassword: build.mutation<
      PostApiAccountProfileChangePasswordApiResponse,
      PostApiAccountProfileChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/profile/change-password`,
        method: "POST",
        body: queryArg.changePasswordModel,
      }),
    }),
    getApiRabbitHostList: build.query<
      GetApiRabbitHostListApiResponse,
      GetApiRabbitHostListApiArg
    >({
      query: () => ({ url: `/api/rabbit/host/list` }),
    }),
    getApiRabbitHostGetById: build.query<
      GetApiRabbitHostGetByIdApiResponse,
      GetApiRabbitHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/rabbit/host/get/${queryArg.id}` }),
    }),
    postApiRabbitHostCreate: build.mutation<
      PostApiRabbitHostCreateApiResponse,
      PostApiRabbitHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/rabbit/host/create`,
        method: "POST",
        body: queryArg.createRabbitHostModel,
      }),
    }),
    putApiRabbitHostChangeService: build.mutation<
      PutApiRabbitHostChangeServiceApiResponse,
      PutApiRabbitHostChangeServiceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/rabbit/host/change-service`,
        method: "PUT",
        body: queryArg.editRabbitHostModel,
      }),
    }),
    deleteApiRabbitHostDeleteById: build.mutation<
      DeleteApiRabbitHostDeleteByIdApiResponse,
      DeleteApiRabbitHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/rabbit/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiRabbitHostChangeExchange: build.mutation<
      PostApiRabbitHostChangeExchangeApiResponse,
      PostApiRabbitHostChangeExchangeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/rabbit/host/change-exchange`,
        method: "POST",
        body: queryArg.changeExchangeModel,
      }),
    }),
    getApiRabbitUserListByRabbitHostId: build.query<
      GetApiRabbitUserListByRabbitHostIdApiResponse,
      GetApiRabbitUserListByRabbitHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/rabbit/user/list/${queryArg.rabbitHostId}`,
      }),
    }),
    postApiRabbitUserCreate: build.mutation<
      PostApiRabbitUserCreateApiResponse,
      PostApiRabbitUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/rabbit/user/create`,
        method: "POST",
        body: queryArg.createRabbitUserModel,
      }),
    }),
    deleteApiRabbitUserDeleteById: build.mutation<
      DeleteApiRabbitUserDeleteByIdApiResponse,
      DeleteApiRabbitUserDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/rabbit/user/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiRabbitUserChangePassword: build.mutation<
      PostApiRabbitUserChangePasswordApiResponse,
      PostApiRabbitUserChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/rabbit/user/change-password`,
        method: "POST",
        body: queryArg.changeRabbitPasswordModel,
      }),
    }),
    getApiAccountReferralGet: build.query<
      GetApiAccountReferralGetApiResponse,
      GetApiAccountReferralGetApiArg
    >({
      query: () => ({ url: `/api/account/referral/get` }),
    }),
    postApiAccountReferralJoin: build.mutation<
      PostApiAccountReferralJoinApiResponse,
      PostApiAccountReferralJoinApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/referral/join`,
        method: "POST",
        body: queryArg.joinReferralModel,
      }),
    }),
    getApiAccountRoleRoleAccessTypes: build.query<
      GetApiAccountRoleRoleAccessTypesApiResponse,
      GetApiAccountRoleRoleAccessTypesApiArg
    >({
      query: () => ({ url: `/api/account/role/role-access-types` }),
    }),
    getApiAccountRoleRoles: build.query<
      GetApiAccountRoleRolesApiResponse,
      GetApiAccountRoleRolesApiArg
    >({
      query: () => ({ url: `/api/account/role/roles` }),
    }),
    postApiAccountRoleGetUserAccessEntities: build.mutation<
      PostApiAccountRoleGetUserAccessEntitiesApiResponse,
      PostApiAccountRoleGetUserAccessEntitiesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/role/get-user-access-entities`,
        method: "POST",
        body: queryArg.getUserAccessEntityModel,
      }),
    }),
    postApiAccountRoleCreateUserAccess: build.mutation<
      PostApiAccountRoleCreateUserAccessApiResponse,
      PostApiAccountRoleCreateUserAccessApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/role/create-user-access`,
        method: "POST",
        body: queryArg.setUserAccessModel,
      }),
    }),
    putApiAccountRoleEditUserAccess: build.mutation<
      PutApiAccountRoleEditUserAccessApiResponse,
      PutApiAccountRoleEditUserAccessApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/role/edit-user-access`,
        method: "PUT",
        body: queryArg.setUserAccessModel,
      }),
    }),
    deleteApiAccountRoleRemoveCustomerUser: build.mutation<
      DeleteApiAccountRoleRemoveCustomerUserApiResponse,
      DeleteApiAccountRoleRemoveCustomerUserApiArg
    >({
      query: (queryArg) => ({
        url: `/api/account/role/remove-customer-user`,
        method: "DELETE",
        body: queryArg.removeCustomerUserModel,
      }),
    }),
    getApiStorageHostList: build.query<
      GetApiStorageHostListApiResponse,
      GetApiStorageHostListApiArg
    >({
      query: () => ({ url: `/api/storage/host/list` }),
    }),
    getApiStorageHostGetById: build.query<
      GetApiStorageHostGetByIdApiResponse,
      GetApiStorageHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/storage/host/get/${queryArg.id}` }),
    }),
    postApiStorageHostCreate: build.mutation<
      PostApiStorageHostCreateApiResponse,
      PostApiStorageHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/storage/host/create`,
        method: "POST",
        body: queryArg.createStorageHostModel,
      }),
    }),
    putApiStorageHostEdit: build.mutation<
      PutApiStorageHostEditApiResponse,
      PutApiStorageHostEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/storage/host/edit`,
        method: "PUT",
        body: queryArg.editStorageHostModel,
      }),
    }),
    deleteApiStorageHostDeleteById: build.mutation<
      DeleteApiStorageHostDeleteByIdApiResponse,
      DeleteApiStorageHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/storage/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiStorageUserListByStorageHostId: build.query<
      GetApiStorageUserListByStorageHostIdApiResponse,
      GetApiStorageUserListByStorageHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/storage/user/list/${queryArg.storageHostId}`,
      }),
    }),
    postApiStorageUserCreate: build.mutation<
      PostApiStorageUserCreateApiResponse,
      PostApiStorageUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/storage/user/create`,
        method: "POST",
        body: queryArg.createStorageUserModel,
      }),
    }),
    deleteApiStorageUserDeleteById: build.mutation<
      DeleteApiStorageUserDeleteByIdApiResponse,
      DeleteApiStorageUserDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/storage/user/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiCloudSupportList: build.query<
      GetApiCloudSupportListApiResponse,
      GetApiCloudSupportListApiArg
    >({
      query: () => ({ url: `/api/cloud/support/list` }),
    }),
    getApiCloudSupportShortList: build.query<
      GetApiCloudSupportShortListApiResponse,
      GetApiCloudSupportShortListApiArg
    >({
      query: () => ({ url: `/api/cloud/support/short-list` }),
    }),
    postApiCloudSupportCreate: build.mutation<
      PostApiCloudSupportCreateApiResponse,
      PostApiCloudSupportCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/support/create`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiCloudSupportItemListBySupportId: build.query<
      GetApiCloudSupportItemListBySupportIdApiResponse,
      GetApiCloudSupportItemListBySupportIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/support-item/list/${queryArg.supportId}`,
      }),
    }),
    postApiCloudSupportItemCreate: build.mutation<
      PostApiCloudSupportItemCreateApiResponse,
      PostApiCloudSupportItemCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/support-item/create`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiCloudSupportItemDownloadById: build.query<
      GetApiCloudSupportItemDownloadByIdApiResponse,
      GetApiCloudSupportItemDownloadByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/support-item/download/${queryArg.id}`,
      }),
    }),
    getApiCloudSupportSubjectList: build.query<
      GetApiCloudSupportSubjectListApiResponse,
      GetApiCloudSupportSubjectListApiArg
    >({
      query: () => ({ url: `/api/cloud/support-subject/list` }),
    }),
    postApiCloudSupportSubjectSelectList: build.mutation<
      PostApiCloudSupportSubjectSelectListApiResponse,
      PostApiCloudSupportSubjectSelectListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/cloud/support-subject/select-list`,
        method: "POST",
        body: queryArg.supportSubjectSelectListModel,
      }),
    }),
    getApiVmHostList: build.query<
      GetApiVmHostListApiResponse,
      GetApiVmHostListApiArg
    >({
      query: () => ({ url: `/api/vm/host/list` }),
    }),
    getApiVmHostGetById: build.query<
      GetApiVmHostGetByIdApiResponse,
      GetApiVmHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/vm/host/get/${queryArg.id}` }),
    }),
    postApiVmHostCreate: build.mutation<
      PostApiVmHostCreateApiResponse,
      PostApiVmHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/host/create`,
        method: "POST",
        body: queryArg.createVmModel,
      }),
    }),
    putApiVmHostEdit: build.mutation<
      PutApiVmHostEditApiResponse,
      PutApiVmHostEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/host/edit`,
        method: "PUT",
        body: queryArg.editVmModel,
      }),
    }),
    deleteApiVmHostDeleteById: build.mutation<
      DeleteApiVmHostDeleteByIdApiResponse,
      DeleteApiVmHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putApiVmHostRebuild: build.mutation<
      PutApiVmHostRebuildApiResponse,
      PutApiVmHostRebuildApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/host/rebuild`,
        method: "PUT",
        body: queryArg.rebuildVmModel,
      }),
    }),
    putApiVmHostConnectById: build.mutation<
      PutApiVmHostConnectByIdApiResponse,
      PutApiVmHostConnectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/host/connect/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiVmHostDisconnectById: build.mutation<
      PutApiVmHostDisconnectByIdApiResponse,
      PutApiVmHostDisconnectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/host/disconnect/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiVmHostRebootById: build.mutation<
      PutApiVmHostRebootByIdApiResponse,
      PutApiVmHostRebootByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/host/reboot/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiVmHostShutdownById: build.mutation<
      PutApiVmHostShutdownByIdApiResponse,
      PutApiVmHostShutdownByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/host/shutdown/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiVmHostResetById: build.mutation<
      PutApiVmHostResetByIdApiResponse,
      PutApiVmHostResetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/host/reset/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiVmHostStartById: build.mutation<
      PutApiVmHostStartByIdApiResponse,
      PutApiVmHostStartByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/host/start/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiVmHostStopById: build.mutation<
      PutApiVmHostStopByIdApiResponse,
      PutApiVmHostStopByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/host/stop/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    postApiVmKmsGet: build.mutation<
      PostApiVmKmsGetApiResponse,
      PostApiVmKmsGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/kms/get`,
        method: "POST",
        body: queryArg.getKmsModel,
      }),
    }),
    getApiVmImageListByDatacenterId: build.query<
      GetApiVmImageListByDatacenterIdApiResponse,
      GetApiVmImageListByDatacenterIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/image/list/${queryArg.datacenterId}`,
      }),
    }),
    getApiVmIsoListByDatacenterId: build.query<
      GetApiVmIsoListByDatacenterIdApiResponse,
      GetApiVmIsoListByDatacenterIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/iso/list/${queryArg.datacenterId}`,
      }),
    }),
    putApiVmIsoMount: build.mutation<
      PutApiVmIsoMountApiResponse,
      PutApiVmIsoMountApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/iso/mount`,
        method: "PUT",
        body: queryArg.mountModel,
      }),
    }),
    putApiVmIsoUnmount: build.mutation<
      PutApiVmIsoUnmountApiResponse,
      PutApiVmIsoUnmountApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vm/iso/unmount`,
        method: "PUT",
        body: queryArg.unmountModel,
      }),
    }),
    getApiVpcHostList: build.query<
      GetApiVpcHostListApiResponse,
      GetApiVpcHostListApiArg
    >({
      query: () => ({ url: `/api/vpc/host/list` }),
    }),
    postApiVpcHostCreate: build.mutation<
      PostApiVpcHostCreateApiResponse,
      PostApiVpcHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vpc/host/create`,
        method: "POST",
        body: queryArg.createVpcHostModel,
      }),
    }),
    getApiVpcNetworkListByVpcHostId: build.query<
      GetApiVpcNetworkListByVpcHostIdApiResponse,
      GetApiVpcNetworkListByVpcHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vpc/network/list/${queryArg.vpcHostId}`,
      }),
    }),
    postApiVpcNetworkCreate: build.mutation<
      PostApiVpcNetworkCreateApiResponse,
      PostApiVpcNetworkCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/vpc/network/create`,
        method: "POST",
        body: queryArg.createVpcNetworkModel,
      }),
    }),
    getApiCloudWalletGetBalance: build.query<
      GetApiCloudWalletGetBalanceApiResponse,
      GetApiCloudWalletGetBalanceApiArg
    >({
      query: () => ({ url: `/api/cloud/wallet/get-balance` }),
    }),
    getApiCloudWalletList: build.query<
      GetApiCloudWalletListApiResponse,
      GetApiCloudWalletListApiArg
    >({
      query: () => ({ url: `/api/cloud/wallet/list` }),
    }),
    getApiWebList: build.query<GetApiWebListApiResponse, GetApiWebListApiArg>({
      query: () => ({ url: `/api/web/list` }),
    }),
    getApiWebGetById: build.query<
      GetApiWebGetByIdApiResponse,
      GetApiWebGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/web/get/${queryArg.id}` }),
    }),
    getApiWebGetLoginSessionById: build.query<
      GetApiWebGetLoginSessionByIdApiResponse,
      GetApiWebGetLoginSessionByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/web/get-login-session/${queryArg.id}`,
      }),
    }),
    postApiWebCheckDomain: build.mutation<
      PostApiWebCheckDomainApiResponse,
      PostApiWebCheckDomainApiArg
    >({
      query: (queryArg) => ({
        url: `/api/web/check-domain`,
        method: "POST",
        body: queryArg.checkWebHostDomainModel,
      }),
    }),
    postApiWebCreate: build.mutation<
      PostApiWebCreateApiResponse,
      PostApiWebCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/web/create`,
        method: "POST",
        body: queryArg.createWebHostModel,
      }),
    }),
    putApiWebEdit: build.mutation<
      PutApiWebEditApiResponse,
      PutApiWebEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/web/edit`,
        method: "PUT",
        body: queryArg.editWebHostModel,
      }),
    }),
    deleteApiWebDeleteById: build.mutation<
      DeleteApiWebDeleteByIdApiResponse,
      DeleteApiWebDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/web/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiDomainWhoisGet: build.mutation<
      PostApiDomainWhoisGetApiResponse,
      PostApiDomainWhoisGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/domain/whois/get`,
        method: "POST",
        body: queryArg.getDomainWhoisModel,
      }),
    }),
  }),
});
export type PostApiAccountLoginApiResponse =
  /** status 200 Success */ LoginResponse;
export type PostApiAccountLoginApiArg = {
  loginModel: LoginModel;
};
export type PostApiAccountRegisterApiResponse = unknown;
export type PostApiAccountRegisterApiArg = {
  registerModel: RegisterModel;
};
export type PostApiAccountForgotApiResponse = unknown;
export type PostApiAccountForgotApiArg = {
  forgotModel: ForgotModel;
};
export type PostApiAccountForgotConfirmApiResponse = unknown;
export type PostApiAccountForgotConfirmApiArg = {
  forgotConfirmModel: ForgotConfirmModel;
};
export type PostApiAccountLogoutApiResponse = unknown;
export type PostApiAccountLogoutApiArg = void;
export type GetApiCdnAnalyticGetByCdnIdAndPeriodIdApiResponse =
  /** status 200 Success */ GetAnalyticResponse;
export type GetApiCdnAnalyticGetByCdnIdAndPeriodIdApiArg = {
  cdnId: number;
  periodId: number;
};
export type GetApiCdnApiGatewayListByCdnIdApiResponse =
  /** status 200 Success */ ApiGatewayListResponse[];
export type GetApiCdnApiGatewayListByCdnIdApiArg = {
  cdnId: number;
};
export type GetApiCdnApiGatewayGetByIdApiResponse =
  /** status 200 Success */ GetApiGatewayResponse;
export type GetApiCdnApiGatewayGetByIdApiArg = {
  id: number;
};
export type PostApiCdnApiGatewayCreateApiResponse = unknown;
export type PostApiCdnApiGatewayCreateApiArg = {
  createApiGatewayModel: CreateApiGatewayModel;
};
export type PutApiCdnApiGatewayEditApiResponse = unknown;
export type PutApiCdnApiGatewayEditApiArg = {
  editApiGatewayModel: EditApiGatewayModel;
};
export type DeleteApiCdnApiGatewayDeleteByIdApiResponse = unknown;
export type DeleteApiCdnApiGatewayDeleteByIdApiArg = {
  id: number;
};
export type GetApiBareMetalListApiResponse =
  /** status 200 Success */ BareMetalListResponse[];
export type GetApiBareMetalListApiArg = void;
export type GetApiBareMetalGetByIdApiResponse =
  /** status 200 Success */ BareMetalResponse;
export type GetApiBareMetalGetByIdApiArg = {
  id: number;
};
export type PostApiBareMetalCreateApiResponse = unknown;
export type PostApiBareMetalCreateApiArg = {
  createBareMetalModel: CreateBareMetalModel;
};
export type DeleteApiBareMetalDeleteApiResponse = unknown;
export type DeleteApiBareMetalDeleteApiArg = {
  id?: number;
};
export type GetApiCloudBusinessUnitListApiResponse =
  /** status 200 Success */ BusinessUnitListResponse[];
export type GetApiCloudBusinessUnitListApiArg = void;
export type GetApiCloudCalculateMonthListApiResponse =
  /** status 200 Success */ CalculateMonthListResponse[];
export type GetApiCloudCalculateMonthListApiArg = void;
export type GetApiCdnClientCertGetByCdnIdApiResponse =
  /** status 200 Success */ GetCdnCertResponse;
export type GetApiCdnClientCertGetByCdnIdApiArg = {
  cdnId: number;
};
export type GetApiCdnClientCertGetUserCertByCdnIdApiResponse =
  /** status 200 Success */ GetCdnCertResponse;
export type GetApiCdnClientCertGetUserCertByCdnIdApiArg = {
  cdnId: number;
};
export type PostApiCdnClientCertCreateUserCertApiResponse = unknown;
export type PostApiCdnClientCertCreateUserCertApiArg = {
  createCdnClientUserCertModel: CreateCdnClientUserCertModel;
};
export type GetApiCdnEdgeCertGetByCdnIdApiResponse =
  /** status 200 Success */ GetCdnCertResponse;
export type GetApiCdnEdgeCertGetByCdnIdApiArg = {
  cdnId: number;
};
export type GetApiCdnEdgeCertGetUserCertByCdnIdApiResponse =
  /** status 200 Success */ GetCdnCertResponse;
export type GetApiCdnEdgeCertGetUserCertByCdnIdApiArg = {
  cdnId: number;
};
export type PostApiCdnEdgeCertCreateApiResponse = unknown;
export type PostApiCdnEdgeCertCreateApiArg = {
  createCdnEdgeCertModel: CreateCdnEdgeCertModel;
};
export type PostApiCdnEdgeCertCreateUserCertApiResponse = unknown;
export type PostApiCdnEdgeCertCreateUserCertApiArg = {
  createCdnEdgeUserCertModel: CreateCdnEdgeUserCertModel;
};
export type GetApiCdnHostListApiResponse =
  /** status 200 Success */ CdnListResponse[];
export type GetApiCdnHostListApiArg = void;
export type GetApiCdnHostGetByIdApiResponse =
  /** status 200 Success */ GetCdnResponse;
export type GetApiCdnHostGetByIdApiArg = {
  id: number;
};
export type GetApiCdnHostGetNsStatusByIdApiResponse =
  /** status 200 Success */ GetCdnNsStatusResponse;
export type GetApiCdnHostGetNsStatusByIdApiArg = {
  id: number;
};
export type GetApiCdnHostOverviewByIdApiResponse =
  /** status 200 Success */ CdnOverviewResponse;
export type GetApiCdnHostOverviewByIdApiArg = {
  id: number;
};
export type PostApiCdnHostCheckZoneApiResponse = unknown;
export type PostApiCdnHostCheckZoneApiArg = {
  checkCdnModel: CheckCdnModel;
};
export type PostApiCdnHostCreateApiResponse = unknown;
export type PostApiCdnHostCreateApiArg = {
  createCdnModel: CreateCdnModel;
};
export type DeleteApiCdnHostDeleteByIdApiResponse = unknown;
export type DeleteApiCdnHostDeleteByIdApiArg = {
  id: number;
};
export type PutApiCdnHostChangeCdnTypeApiResponse = unknown;
export type PutApiCdnHostChangeCdnTypeApiArg = {
  changeCdnTypeModel: ChangeCdnTypeModel;
};
export type PutApiCdnHostChangeClientCertTypeApiResponse = unknown;
export type PutApiCdnHostChangeClientCertTypeApiArg = {
  changeClientCertTypeModel: ChangeClientCertTypeModel;
};
export type PutApiCdnHostChangeEdgeCertTypeApiResponse = unknown;
export type PutApiCdnHostChangeEdgeCertTypeApiArg = {
  changeEdgeCertTypeModel: ChangeEdgeCertTypeModel;
};
export type PutApiCdnHostChangeHstsApiResponse = unknown;
export type PutApiCdnHostChangeHstsApiArg = {
  changeHstsModel: ChangeHstsModel;
};
export type PutApiCdnHostChangeHttpsRedirectApiResponse = unknown;
export type PutApiCdnHostChangeHttpsRedirectApiArg = {
  changeHttpsRedirectModel: ChangeHttpsRedirectModel;
};
export type PutApiCdnHostChangeNonWwwRedirectApiResponse = unknown;
export type PutApiCdnHostChangeNonWwwRedirectApiArg = {
  changeNonWwwRedirectModel: ChangeNonWwwRedirectModel;
};
export type GetApiColocationListApiResponse =
  /** status 200 Success */ CoLocationListResponse[];
export type GetApiColocationListApiArg = void;
export type PostApiColocationCreateApiResponse =
  /** status 200 Success */ number;
export type PostApiColocationCreateApiArg = {
  createColocationModel: CreateColocationModel;
};
export type DeleteApiColocationDeleteByIdApiResponse = unknown;
export type DeleteApiColocationDeleteByIdApiArg = {
  id: number;
};
export type GetApiCloudCommissionListApiResponse =
  /** status 200 Success */ CommissionListResponse;
export type GetApiCloudCommissionListApiArg = void;
export type GetApiCloudCustomerGetApiResponse =
  /** status 200 Success */ GetCustomerResponse;
export type GetApiCloudCustomerGetApiArg = void;
export type GetApiCloudCustomerGetCustomerTypeApiResponse =
  /** status 200 Success */ number;
export type GetApiCloudCustomerGetCustomerTypeApiArg = void;
export type PutApiCloudCustomerEditApiResponse = unknown;
export type PutApiCloudCustomerEditApiArg = {
  editCustomerModel: EditCustomerModel;
};
export type PutApiCloudCustomerEditCustomerTypeApiResponse = unknown;
export type PutApiCloudCustomerEditCustomerTypeApiArg = {
  editCustomerTypeModel: EditCustomerTypeModel;
};
export type GetApiCloudBillListApiResponse =
  /** status 200 Success */ CustomerBillListResponse[];
export type GetApiCloudBillListApiArg = void;
export type GetApiCloudBillBillShortListApiResponse =
  /** status 200 Success */ CustomerBillShortListResponse[];
export type GetApiCloudBillBillShortListApiArg = void;
export type GetApiCloudBillGetByIdApiResponse =
  /** status 200 Success */ GetCustomerBillResponse;
export type GetApiCloudBillGetByIdApiArg = {
  id: number;
};
export type GetApiCloudBillDownloadByIdApiResponse = unknown;
export type GetApiCloudBillDownloadByIdApiArg = {
  id: number;
};
export type GetApiCloudCustomerProductListByProductIdApiResponse =
  /** status 200 Success */ CustomerProductListResponse[];
export type GetApiCloudCustomerProductListByProductIdApiArg = {
  productId: number;
};
export type PostApiCloudCustomerProductTransferApiResponse = unknown;
export type PostApiCloudCustomerProductTransferApiArg = {
  customerProductTransferModel: CustomerProductTransferModel;
};
export type PostApiCloudCustomerUserChangeUserCustomerApiResponse =
  /** status 200 Success */ ChangeUserCustomerResponse;
export type PostApiCloudCustomerUserChangeUserCustomerApiArg = {
  changeUserCustomerModel: ChangeUserCustomerModel;
};
export type GetApiCloudDashboardUsageByCategoryIdApiResponse =
  /** status 200 Success */ DashboardUsageResponse[];
export type GetApiCloudDashboardUsageByCategoryIdApiArg = {
  categoryId: number;
};
export type GetApiDatacenterListApiResponse =
  /** status 200 Success */ DatacenterListResponse[];
export type GetApiDatacenterListApiArg = void;
export type GetApiDatacenterIpListByProductIdAndIdApiResponse =
  /** status 200 Success */ DatacenterIpListResponse[];
export type GetApiDatacenterIpListByProductIdAndIdApiArg = {
  productId: number;
  id: number;
};
export type DeleteApiDatacenterIpDeleteByIdApiResponse = unknown;
export type DeleteApiDatacenterIpDeleteByIdApiArg = {
  id: number;
};
export type GetApiCdnDnsRecordListByCdnIdApiResponse =
  /** status 200 Success */ DnsRecordListResponse[];
export type GetApiCdnDnsRecordListByCdnIdApiArg = {
  cdnId: number;
};
export type GetApiCdnDnsRecordGetByIdApiResponse =
  /** status 200 Success */ GetDnsRecordResponse;
export type GetApiCdnDnsRecordGetByIdApiArg = {
  id: number;
};
export type PostApiCdnDnsRecordCreateApiResponse = unknown;
export type PostApiCdnDnsRecordCreateApiArg = {
  createDnsRecordModel: CreateDnsRecordModel;
};
export type PutApiCdnDnsRecordEditApiResponse = unknown;
export type PutApiCdnDnsRecordEditApiArg = {
  editDnsRecordModel: EditDnsRecordModel;
};
export type DeleteApiCdnDnsRecordDeleteByIdApiResponse = unknown;
export type DeleteApiCdnDnsRecordDeleteByIdApiArg = {
  id: number;
};
export type PutApiCdnDnsRecordChangeProxyStatusByIdApiResponse = unknown;
export type PutApiCdnDnsRecordChangeProxyStatusByIdApiArg = {
  id: number;
};
export type GetApiDomainListApiResponse =
  /** status 200 Success */ DomainListResponse[];
export type GetApiDomainListApiArg = void;
export type GetApiDomainGetByIdApiResponse =
  /** status 200 Success */ GetDomainResponse;
export type GetApiDomainGetByIdApiArg = {
  id: number;
};
export type GetApiDomainGetStatusByIdApiResponse =
  /** status 200 Success */ GetDomainResponse;
export type GetApiDomainGetStatusByIdApiArg = {
  id: number;
};
export type PostApiDomainGetPriceApiResponse =
  /** status 200 Success */ GetProductPriceResponse;
export type PostApiDomainGetPriceApiArg = {
  getPriceModel: GetPriceModel;
};
export type PostApiDomainRegisterApiResponse = /** status 200 Success */ number;
export type PostApiDomainRegisterApiArg = {
  registerDomainModel: RegisterDomainModel;
};
export type DeleteApiDomainDeleteByIdApiResponse = unknown;
export type DeleteApiDomainDeleteByIdApiArg = {
  id: number;
};
export type PutApiDomainChangeContactApiResponse = unknown;
export type PutApiDomainChangeContactApiArg = {
  changeContactModel: ChangeContactModel;
};
export type PutApiDomainChangeNsApiResponse = unknown;
export type PutApiDomainChangeNsApiArg = {
  changeNsModel: ChangeNsModel;
};
export type PostApiDomainResendVerificationByIdApiResponse = unknown;
export type PostApiDomainResendVerificationByIdApiArg = {
  id: number;
};
export type GetApiHomeIndexApiResponse = unknown;
export type GetApiHomeIndexApiArg = void;
export type GetApiCloudInvoiceListApiResponse =
  /** status 200 Success */ InvoiceListResponse[];
export type GetApiCloudInvoiceListApiArg = void;
export type GetApiCloudInvoiceGetByIdApiResponse =
  /** status 200 Success */ GetInvoiceResponse;
export type GetApiCloudInvoiceGetByIdApiArg = {
  id: number;
};
export type GetApiPlatformDevopsListByIdApiResponse =
  /** status 200 Success */ KubeDevOpsListResponse[];
export type GetApiPlatformDevopsListByIdApiArg = {
  id: number;
};
export type GetApiPlatformDevopsGetByIdApiResponse =
  /** status 200 Success */ KubeDevOpsListResponse;
export type GetApiPlatformDevopsGetByIdApiArg = {
  id: number;
};
export type PostApiPlatformDevopsCreateApiResponse = unknown;
export type PostApiPlatformDevopsCreateApiArg = {
  createKubeDevOpsModel: CreateKubeDevOpsModel;
};
export type DeleteApiPlatformDevopsDeleteByIdApiResponse = unknown;
export type DeleteApiPlatformDevopsDeleteByIdApiArg = {
  id: number;
};
export type GetApiPlatformNamespaceListApiResponse =
  /** status 200 Success */ KubeHostListResponse[];
export type GetApiPlatformNamespaceListApiArg = void;
export type GetApiPlatformNamespaceGetByIdApiResponse =
  /** status 200 Success */ GetKubeHostResponse;
export type GetApiPlatformNamespaceGetByIdApiArg = {
  id: number;
};
export type GetApiPlatformNamespaceGetLoginByIdApiResponse =
  /** status 200 Success */ GetKubeLoginResponse;
export type GetApiPlatformNamespaceGetLoginByIdApiArg = {
  id: number;
};
export type PostApiPlatformNamespaceCreateApiResponse = unknown;
export type PostApiPlatformNamespaceCreateApiArg = {
  createKubeHostModel: CreateKubeHostModel;
};
export type PutApiPlatformNamespaceEditApiResponse = unknown;
export type PutApiPlatformNamespaceEditApiArg = {
  editKubeHostModel: EditKubeHostModel;
};
export type DeleteApiPlatformNamespaceDeleteByIdApiResponse = unknown;
export type DeleteApiPlatformNamespaceDeleteByIdApiArg = {
  id: number;
};
export type GetApiPlatformServiceListByIdApiResponse =
  /** status 200 Success */ KubeServiceListResponse[];
export type GetApiPlatformServiceListByIdApiArg = {
  id: number;
};
export type GetApiPlatformServiceGetByIdApiResponse =
  /** status 200 Success */ KubeServiceListResponse;
export type GetApiPlatformServiceGetByIdApiArg = {
  id: number;
};
export type PostApiPlatformServiceCreateApiResponse = unknown;
export type PostApiPlatformServiceCreateApiArg = {
  createKubeServiceModel: CreateKubeServiceModel;
};
export type DeleteApiPlatformServiceDeleteByIdApiResponse = unknown;
export type DeleteApiPlatformServiceDeleteByIdApiArg = {
  id: number;
};
export type GetApiPlatformKubernetesListApiResponse =
  /** status 200 Success */ GetKubernetesHostResponse[];
export type GetApiPlatformKubernetesListApiArg = void;
export type GetApiPlatformKubernetesGetByIdApiResponse =
  /** status 200 Success */ GetKubernetesHostResponse;
export type GetApiPlatformKubernetesGetByIdApiArg = {
  id: number;
};
export type PostApiPlatformKubernetesCreateApiResponse = unknown;
export type PostApiPlatformKubernetesCreateApiArg = {
  createClusterModel: CreateClusterModel;
};
export type PutApiPlatformKubernetesEditApiResponse = unknown;
export type PutApiPlatformKubernetesEditApiArg = {
  editClusterModel: EditClusterModel;
};
export type DeleteApiPlatformKubernetesDeleteByIdApiResponse = unknown;
export type DeleteApiPlatformKubernetesDeleteByIdApiArg = {
  id: number;
};
export type GetApiPlatformUserListApiResponse =
  /** status 200 Success */ KubeUserListResponse[];
export type GetApiPlatformUserListApiArg = void;
export type GetApiPlatformUserShortListApiResponse =
  /** status 200 Success */ KubeShortListResponse[];
export type GetApiPlatformUserShortListApiArg = void;
export type PostApiPlatformUserCreateApiResponse = unknown;
export type PostApiPlatformUserCreateApiArg = {
  createKubeUserModel: CreateKubeUserModel;
};
export type DeleteApiPlatformUserDeleteByIdApiResponse = unknown;
export type DeleteApiPlatformUserDeleteByIdApiArg = {
  id: number;
};
export type PostApiPlatformUserChangePasswordApiResponse = unknown;
export type PostApiPlatformUserChangePasswordApiArg = {
  changeKubeUserPasswordModel: ChangeKubeUserPasswordModel;
};
export type GetApiPlatformUserRoleListByKubeHostIdApiResponse =
  /** status 200 Success */ KubeUserRoleListResponse[];
export type GetApiPlatformUserRoleListByKubeHostIdApiArg = {
  kubeHostId: number;
};
export type PostApiPlatformUserRoleCreateApiResponse = unknown;
export type PostApiPlatformUserRoleCreateApiArg = {
  createKubeUserRoleModel: CreateKubeUserRoleModel;
};
export type DeleteApiPlatformUserRoleDeleteByIdApiResponse = unknown;
export type DeleteApiPlatformUserRoleDeleteByIdApiArg = {
  id: number;
};
export type GetApiPlatformVolumeListByIdApiResponse =
  /** status 200 Success */ KubeVolumeListResponse[];
export type GetApiPlatformVolumeListByIdApiArg = {
  id: number;
};
export type GetApiPlatformVolumeGetByIdApiResponse =
  /** status 200 Success */ KubeVolumeListResponse;
export type GetApiPlatformVolumeGetByIdApiArg = {
  id: number;
};
export type PostApiPlatformVolumeCreateApiResponse = unknown;
export type PostApiPlatformVolumeCreateApiArg = {
  createKubeVolumeModel: CreateKubeVolumeModel;
};
export type DeleteApiPlatformVolumeDeleteByIdApiResponse = unknown;
export type DeleteApiPlatformVolumeDeleteByIdApiArg = {
  id: number;
};
export type GetApiCdnLoadBalanceListByCdnIdApiResponse =
  /** status 200 Success */ LoadBalanceListResponse[];
export type GetApiCdnLoadBalanceListByCdnIdApiArg = {
  cdnId: number;
};
export type GetApiCdnLoadBalanceGetByIdApiResponse =
  /** status 200 Success */ GetLoadBalanceResponse;
export type GetApiCdnLoadBalanceGetByIdApiArg = {
  id: number;
};
export type PostApiCdnLoadBalanceCreateApiResponse = unknown;
export type PostApiCdnLoadBalanceCreateApiArg = {
  createLoadBalanceModel: CreateLoadBalanceModel;
};
export type PutApiCdnLoadBalanceEditApiResponse = unknown;
export type PutApiCdnLoadBalanceEditApiArg = {
  editLoadBalanceModel: EditLoadBalanceModel;
};
export type DeleteApiCdnLoadBalanceDeleteByIdApiResponse = unknown;
export type DeleteApiCdnLoadBalanceDeleteByIdApiArg = {
  id: number;
};
export type GetApiCloudNotificationListApiResponse =
  /** status 200 Success */ NotificationListResponse[];
export type GetApiCloudNotificationListApiArg = void;
export type GetApiCloudNotificationShortListApiResponse =
  /** status 200 Success */ NotificationListResponse[];
export type GetApiCloudNotificationShortListApiArg = void;
export type GetApiCloudPaymentListApiResponse =
  /** status 200 Success */ PaymentListResponse[];
export type GetApiCloudPaymentListApiArg = void;
export type GetApiCloudPaymentGetByIdApiResponse =
  /** status 200 Success */ GetPaymentResponse;
export type GetApiCloudPaymentGetByIdApiArg = {
  id: number;
};
export type PostApiCloudPaymentCreateApiResponse =
  /** status 200 Success */ CreatePaymentResponse;
export type PostApiCloudPaymentCreateApiArg = {
  createPaymentModel: CreatePaymentModel;
};
export type PostApiCloudPaymentPecCallBackApiResponse = unknown;
export type PostApiCloudPaymentPecCallBackApiArg = {
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
export type PostApiCloudPaymentSepCallBackApiResponse = unknown;
export type PostApiCloudPaymentSepCallBackApiArg = {
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
export type GetApiCloudProductListApiResponse =
  /** status 200 Success */ ProductListResponse[];
export type GetApiCloudProductListApiArg = void;
export type GetApiCloudProductBundleListByProductIdApiResponse =
  /** status 200 Success */ ProductBundleListResponse[];
export type GetApiCloudProductBundleListByProductIdApiArg = {
  productId: number;
};
export type GetApiCloudProductItemListByProductIdApiResponse =
  /** status 200 Success */ ProductItemListResponse[];
export type GetApiCloudProductItemListByProductIdApiArg = {
  productId: number;
};
export type GetApiAccountProfileGetApiResponse =
  /** status 200 Success */ GetProfileResponse;
export type GetApiAccountProfileGetApiArg = void;
export type GetApiAccountProfileGetNotificationStatusApiResponse =
  /** status 200 Success */ GetNotificationStatusResponse;
export type GetApiAccountProfileGetNotificationStatusApiArg = void;
export type PutApiAccountProfileEditApiResponse = unknown;
export type PutApiAccountProfileEditApiArg = {
  editProfileModel: EditProfileModel;
};
export type PutApiAccountProfileEditEmailApiResponse = unknown;
export type PutApiAccountProfileEditEmailApiArg = {
  editEmailModel: EditEmailModel;
};
export type PostApiAccountProfileConfirmEmailApiResponse = unknown;
export type PostApiAccountProfileConfirmEmailApiArg = {
  confirmEmailModel: ConfirmEmailModel;
};
export type PutApiAccountProfileEditPhoneNumberApiResponse = unknown;
export type PutApiAccountProfileEditPhoneNumberApiArg = {
  editPhoneNumberModel: EditPhoneNumberModel;
};
export type PostApiAccountProfileConfirmPhoneNumberApiResponse = unknown;
export type PostApiAccountProfileConfirmPhoneNumberApiArg = {
  confirmPhoneNumberModel: ConfirmPhoneNumberModel;
};
export type PutApiAccountProfileEditEmailNotificationApiResponse = unknown;
export type PutApiAccountProfileEditEmailNotificationApiArg = {
  editEmailNotifyModel: EditEmailNotifyModel;
};
export type PutApiAccountProfileEditPhoneNotificationApiResponse = unknown;
export type PutApiAccountProfileEditPhoneNotificationApiArg = {
  editPhoneNotifyModel: EditPhoneNotifyModel;
};
export type PostApiAccountProfileChangePasswordApiResponse = unknown;
export type PostApiAccountProfileChangePasswordApiArg = {
  changePasswordModel: ChangePasswordModel;
};
export type GetApiRabbitHostListApiResponse =
  /** status 200 Success */ RabbitHostListResponse[];
export type GetApiRabbitHostListApiArg = void;
export type GetApiRabbitHostGetByIdApiResponse =
  /** status 200 Success */ GetRabbitHostResponse;
export type GetApiRabbitHostGetByIdApiArg = {
  id: number;
};
export type PostApiRabbitHostCreateApiResponse = unknown;
export type PostApiRabbitHostCreateApiArg = {
  createRabbitHostModel: CreateRabbitHostModel;
};
export type PutApiRabbitHostChangeServiceApiResponse = unknown;
export type PutApiRabbitHostChangeServiceApiArg = {
  editRabbitHostModel: EditRabbitHostModel;
};
export type DeleteApiRabbitHostDeleteByIdApiResponse = unknown;
export type DeleteApiRabbitHostDeleteByIdApiArg = {
  id: number;
};
export type PostApiRabbitHostChangeExchangeApiResponse = unknown;
export type PostApiRabbitHostChangeExchangeApiArg = {
  changeExchangeModel: ChangeExchangeModel;
};
export type GetApiRabbitUserListByRabbitHostIdApiResponse =
  /** status 200 Success */ RabbitHostUserListResponse[];
export type GetApiRabbitUserListByRabbitHostIdApiArg = {
  rabbitHostId: number;
};
export type PostApiRabbitUserCreateApiResponse = unknown;
export type PostApiRabbitUserCreateApiArg = {
  createRabbitUserModel: CreateRabbitUserModel;
};
export type DeleteApiRabbitUserDeleteByIdApiResponse = unknown;
export type DeleteApiRabbitUserDeleteByIdApiArg = {
  id: number;
};
export type PostApiRabbitUserChangePasswordApiResponse = unknown;
export type PostApiRabbitUserChangePasswordApiArg = {
  changeRabbitPasswordModel: ChangeRabbitPasswordModel;
};
export type GetApiAccountReferralGetApiResponse =
  /** status 200 Success */ GetReferralResponse;
export type GetApiAccountReferralGetApiArg = void;
export type PostApiAccountReferralJoinApiResponse =
  /** status 200 Success */ JoinReferralResponse;
export type PostApiAccountReferralJoinApiArg = {
  joinReferralModel: JoinReferralModel;
};
export type GetApiAccountRoleRoleAccessTypesApiResponse =
  /** status 200 Success */ GetAccessTypeResponse[];
export type GetApiAccountRoleRoleAccessTypesApiArg = void;
export type GetApiAccountRoleRolesApiResponse =
  /** status 200 Success */ GetAccessTypeResponse[];
export type GetApiAccountRoleRolesApiArg = void;
export type PostApiAccountRoleGetUserAccessEntitiesApiResponse =
  /** status 200 Success */ UserEntityAccessResponse[];
export type PostApiAccountRoleGetUserAccessEntitiesApiArg = {
  getUserAccessEntityModel: GetUserAccessEntityModel;
};
export type PostApiAccountRoleCreateUserAccessApiResponse =
  /** status 200 Success */ BaseResponse;
export type PostApiAccountRoleCreateUserAccessApiArg = {
  setUserAccessModel: SetUserAccessModel;
};
export type PutApiAccountRoleEditUserAccessApiResponse = unknown;
export type PutApiAccountRoleEditUserAccessApiArg = {
  setUserAccessModel: SetUserAccessModel;
};
export type DeleteApiAccountRoleRemoveCustomerUserApiResponse =
  /** status 200 Success */ BaseResponse;
export type DeleteApiAccountRoleRemoveCustomerUserApiArg = {
  removeCustomerUserModel: RemoveCustomerUserModel;
};
export type GetApiStorageHostListApiResponse =
  /** status 200 Success */ StorageHostListResponse[];
export type GetApiStorageHostListApiArg = void;
export type GetApiStorageHostGetByIdApiResponse =
  /** status 200 Success */ GetStorageHostResponse;
export type GetApiStorageHostGetByIdApiArg = {
  id: number;
};
export type PostApiStorageHostCreateApiResponse = unknown;
export type PostApiStorageHostCreateApiArg = {
  createStorageHostModel: CreateStorageHostModel;
};
export type PutApiStorageHostEditApiResponse = unknown;
export type PutApiStorageHostEditApiArg = {
  editStorageHostModel: EditStorageHostModel;
};
export type DeleteApiStorageHostDeleteByIdApiResponse = unknown;
export type DeleteApiStorageHostDeleteByIdApiArg = {
  id: number;
};
export type GetApiStorageUserListByStorageHostIdApiResponse =
  /** status 200 Success */ StorageUserListResponse[];
export type GetApiStorageUserListByStorageHostIdApiArg = {
  storageHostId: number;
};
export type PostApiStorageUserCreateApiResponse =
  /** status 200 Success */ CreateStorageUserResponse;
export type PostApiStorageUserCreateApiArg = {
  createStorageUserModel: CreateStorageUserModel;
};
export type DeleteApiStorageUserDeleteByIdApiResponse = unknown;
export type DeleteApiStorageUserDeleteByIdApiArg = {
  id: number;
};
export type GetApiCloudSupportListApiResponse =
  /** status 200 Success */ SupportListResponse[];
export type GetApiCloudSupportListApiArg = void;
export type GetApiCloudSupportShortListApiResponse =
  /** status 200 Success */ SupportShortListResponse[];
export type GetApiCloudSupportShortListApiArg = void;
export type PostApiCloudSupportCreateApiResponse = unknown;
export type PostApiCloudSupportCreateApiArg = {
  body: {
    Content: string;
    BusinessUnitId: number;
    SupportSubjectId: number;
    CustomerProductId?: number;
    ProductId?: number;
    Attachment?: Blob;
  };
};
export type GetApiCloudSupportItemListBySupportIdApiResponse =
  /** status 200 Success */ SupportItemListResponse;
export type GetApiCloudSupportItemListBySupportIdApiArg = {
  supportId: number;
};
export type PostApiCloudSupportItemCreateApiResponse = unknown;
export type PostApiCloudSupportItemCreateApiArg = {
  body: {
    SupportId: number;
    Content: string;
    Attachment?: Blob;
  };
};
export type GetApiCloudSupportItemDownloadByIdApiResponse = unknown;
export type GetApiCloudSupportItemDownloadByIdApiArg = {
  id: number;
};
export type GetApiCloudSupportSubjectListApiResponse =
  /** status 200 Success */ SupportSubjectListResponse[];
export type GetApiCloudSupportSubjectListApiArg = void;
export type PostApiCloudSupportSubjectSelectListApiResponse =
  /** status 200 Success */ SupportSubjectListResponse[];
export type PostApiCloudSupportSubjectSelectListApiArg = {
  supportSubjectSelectListModel: SupportSubjectSelectListModel;
};
export type GetApiVmHostListApiResponse =
  /** status 200 Success */ VmListResponse[];
export type GetApiVmHostListApiArg = void;
export type GetApiVmHostGetByIdApiResponse =
  /** status 200 Success */ GetVmResponse;
export type GetApiVmHostGetByIdApiArg = {
  id: number;
};
export type PostApiVmHostCreateApiResponse = /** status 200 Success */ number;
export type PostApiVmHostCreateApiArg = {
  createVmModel: CreateVmModel;
};
export type PutApiVmHostEditApiResponse = unknown;
export type PutApiVmHostEditApiArg = {
  editVmModel: EditVmModel;
};
export type DeleteApiVmHostDeleteByIdApiResponse = unknown;
export type DeleteApiVmHostDeleteByIdApiArg = {
  id: number;
};
export type PutApiVmHostRebuildApiResponse = unknown;
export type PutApiVmHostRebuildApiArg = {
  rebuildVmModel: RebuildVmModel;
};
export type PutApiVmHostConnectByIdApiResponse = unknown;
export type PutApiVmHostConnectByIdApiArg = {
  id: number;
};
export type PutApiVmHostDisconnectByIdApiResponse = unknown;
export type PutApiVmHostDisconnectByIdApiArg = {
  id: number;
};
export type PutApiVmHostRebootByIdApiResponse = unknown;
export type PutApiVmHostRebootByIdApiArg = {
  id: number;
};
export type PutApiVmHostShutdownByIdApiResponse = unknown;
export type PutApiVmHostShutdownByIdApiArg = {
  id: number;
};
export type PutApiVmHostResetByIdApiResponse = unknown;
export type PutApiVmHostResetByIdApiArg = {
  id: number;
};
export type PutApiVmHostStartByIdApiResponse = unknown;
export type PutApiVmHostStartByIdApiArg = {
  id: number;
};
export type PutApiVmHostStopByIdApiResponse = unknown;
export type PutApiVmHostStopByIdApiArg = {
  id: number;
};
export type PostApiVmKmsGetApiResponse = /** status 200 Success */ string;
export type PostApiVmKmsGetApiArg = {
  getKmsModel: GetKmsModel;
};
export type GetApiVmImageListByDatacenterIdApiResponse =
  /** status 200 Success */ ImageListResponse[];
export type GetApiVmImageListByDatacenterIdApiArg = {
  datacenterId: number;
};
export type GetApiVmIsoListByDatacenterIdApiResponse =
  /** status 200 Success */ IsoListResponse[];
export type GetApiVmIsoListByDatacenterIdApiArg = {
  datacenterId: number;
};
export type PutApiVmIsoMountApiResponse = unknown;
export type PutApiVmIsoMountApiArg = {
  mountModel: MountModel;
};
export type PutApiVmIsoUnmountApiResponse = unknown;
export type PutApiVmIsoUnmountApiArg = {
  unmountModel: UnmountModel;
};
export type GetApiVpcHostListApiResponse =
  /** status 200 Success */ VpcListResponse[];
export type GetApiVpcHostListApiArg = void;
export type PostApiVpcHostCreateApiResponse = unknown;
export type PostApiVpcHostCreateApiArg = {
  createVpcHostModel: CreateVpcHostModel;
};
export type GetApiVpcNetworkListByVpcHostIdApiResponse =
  /** status 200 Success */ VpcNetworkListResponse[];
export type GetApiVpcNetworkListByVpcHostIdApiArg = {
  vpcHostId: number;
};
export type PostApiVpcNetworkCreateApiResponse = unknown;
export type PostApiVpcNetworkCreateApiArg = {
  createVpcNetworkModel: CreateVpcNetworkModel;
};
export type GetApiCloudWalletGetBalanceApiResponse =
  /** status 200 Success */ number;
export type GetApiCloudWalletGetBalanceApiArg = void;
export type GetApiCloudWalletListApiResponse =
  /** status 200 Success */ WalletTransactionListResponse[];
export type GetApiCloudWalletListApiArg = void;
export type GetApiWebListApiResponse =
  /** status 200 Success */ WebHostListResponse[];
export type GetApiWebListApiArg = void;
export type GetApiWebGetByIdApiResponse =
  /** status 200 Success */ GetWebHostResponse;
export type GetApiWebGetByIdApiArg = {
  id: number;
};
export type GetApiWebGetLoginSessionByIdApiResponse =
  /** status 200 Success */ GetLoginSessionResponse;
export type GetApiWebGetLoginSessionByIdApiArg = {
  id: number;
};
export type PostApiWebCheckDomainApiResponse = unknown;
export type PostApiWebCheckDomainApiArg = {
  checkWebHostDomainModel: CheckWebHostDomainModel;
};
export type PostApiWebCreateApiResponse = unknown;
export type PostApiWebCreateApiArg = {
  createWebHostModel: CreateWebHostModel;
};
export type PutApiWebEditApiResponse = unknown;
export type PutApiWebEditApiArg = {
  editWebHostModel: EditWebHostModel;
};
export type DeleteApiWebDeleteByIdApiResponse = unknown;
export type DeleteApiWebDeleteByIdApiArg = {
  id: number;
};
export type PostApiDomainWhoisGetApiResponse = unknown;
export type PostApiDomainWhoisGetApiArg = {
  getDomainWhoisModel: GetDomainWhoisModel;
};
export type LoginResponse = {
  accessToken?: string | null;
  expiration?: string;
  userTitle?: string | null;
  roles?: number[] | null;
  isSuperUser?: boolean;
  isFinancialManager?: boolean;
  isAccountManager?: boolean;
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
};
export type ForgotModel = {
  email: string;
};
export type ForgotConfirmModel = {
  email: string;
  confirmCode: string;
  password: string;
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
export type BareMetalListResponse = {
  id?: number;
  name?: string | null;
  bareMetalImage?: string | null;
  bareMetalMachine?: string | null;
  datacenter?: string | null;
  datacenterRack?: string | null;
};
export type BareMetalResponse = {
  id?: number;
  name?: string | null;
  bareMetalImage?: string | null;
  bareMetalMachine?: string | null;
  datacenter?: string | null;
  datacenterRack?: string | null;
  physicalCpu?: number;
  physicalMemory?: number;
  hdd600GSas10K?: number;
  hdd1200GSas10K?: number;
  networkPort1G?: number;
  networkPort10G?: number;
};
export type CreateBareMetalModel = {
  name: string;
  password: string;
  imageId: number;
  publicKey?: string | null;
  productBundleId?: number | null;
  isPredefined: boolean;
  customerProductTypeId: number;
  datacenterRackId: number;
  bareMetalMachineId: number;
  physicalCpu?: number | null;
  physicalMemory?: number | null;
  hdd600Sas10K?: number | null;
  hdd1200Sas10K?: number | null;
  networkPort1G?: number | null;
  networkPort10G?: number | null;
  datacenterId?: number;
};
export type BusinessUnitListResponse = {
  id?: number;
  name?: string | null;
};
export type CalculateMonthListResponse = {
  id?: number;
  name?: string | null;
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
export type CoLocationListResponse = {
  id?: number;
  name?: string | null;
  datacenter?: string | null;
  datacenterRackId?: number;
  datacenterRack?: string | null;
};
export type CreateColocationModel = {
  datacenterId: number;
  name: string;
  customerProductTypeId: number;
  equipmentIds: number[];
  isPredefined: boolean;
  productBundleId?: number | null;
  rackUnitSpace?: number | null;
  networkPort1G?: number | null;
  networkPort10G?: number | null;
  powerAmp?: number | null;
  ipv4Count?: number | null;
};
export type CommissionListResponse = {
  id?: number;
  orderId?: number;
  totalPrice?: number;
  commissionPrice?: number;
  commissionDate?: string;
};
export type GetCustomerResponse = {
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
export type EditCustomerTypeModel = {
  isLegal?: boolean;
};
export type CustomerBillListResponse = {
  id?: number;
  billDate?: string;
  netPrice?: number;
  vat?: number;
  totalPrice?: number;
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
export type CustomerProductListResponse = {
  id?: number;
  name?: string | null;
  product?: string | null;
  status?: string | null;
  createDate?: string;
};
export type CustomerProductTransferModel = {
  customerProductId?: number;
  customerId?: number;
};
export type ChangeUserCustomerResponse = {
  roles?: number[] | null;
  isSuperUser?: boolean;
  isFinancialManager?: boolean;
  isAccountManager?: boolean;
};
export type ChangeUserCustomerModel = {
  customerId?: number;
};
export type DashboardUsageResponse = {
  data?: number[] | null;
  name?: string | null;
};
export type DatacenterListResponse = {
  id?: number;
  name?: string | null;
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
  activeCdn: boolean;
  customerProductTypeId: number;
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
  invoiceStatusId?: number;
  invoiceStatus?: string | null;
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
  datacenterId?: number;
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
export type VmProductItemModel = {
  cpu?: number;
  memory?: number;
  disk?: number;
};
export type GetKubernetesHostResponse = {
  id?: number;
  datacenter?: string | null;
  name?: string | null;
  status?: string | null;
  statusId?: number;
  createDate?: string;
  expireDate?: string | null;
  nodes?: VmProductItemModel[] | null;
};
export type NodeSpecs = {
  quantity?: number;
  cpu?: number;
  memory?: number;
  disk?: number;
};
export type CreateClusterModel = {
  clusterName: string;
  datacenterId: number;
  imageId: number;
  vmPassword: string;
  customerProductTypeId: number;
  workerNodes?: NodeSpecs;
  masterNodes?: NodeSpecs;
};
export type EditClusterModel = {
  id?: number;
  masterNodeCount?: number;
  workerNodeCount?: number;
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
export type NotificationListResponse = {
  id?: number;
  content?: string | null;
  subject?: string | null;
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
  orderPlanId?: number | null;
  voucherCode?: string | null;
};
export type ProductListResponse = {
  id?: number;
  name?: string | null;
};
export type ProductBundleListResponse = {
  id?: number;
  name?: string | null;
  description?: string | null;
  price?: number;
};
export type ProductItemListResponse = {
  id?: number;
  name?: string | null;
  price?: number;
};
export type GetProfileResponse = {
  id?: string;
  phoneNumber?: string | null;
  phoneNumberConfirmed?: boolean;
  email?: string | null;
  emailConfirmed?: boolean;
  idConfirmed?: boolean;
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
  joinCode?: string | null;
  referralCode?: string | null;
  referralLink?: string | null;
};
export type JoinReferralResponse = {
  status?: boolean;
  message?: string | null;
};
export type JoinReferralModel = {
  referralCode: string;
};
export type GetAccessTypeResponse = {
  id?: number;
  name?: string | null;
};
export type AccessTuple = {
  accessId?: number;
  hasAccess?: boolean;
};
export type UserEntityAccessResponse = {
  id?: number;
  title?: string | null;
  description?: string | null;
  hasAccess?: boolean;
  accesses?: AccessTuple[] | null;
};
export type GetUserAccessEntityModel = {
  userId?: string | null;
};
export type BaseResponse = {
  status?: boolean;
  message?: string | null;
};
export type EntityAccess = {
  accessType?: number;
  entityId?: number;
  accessTuples?: AccessTuple[] | null;
};
export type SetUserAccessModel = {
  userEmail: string;
  isSuperUser: boolean;
  isFinancialManager: boolean;
  isAccountManager: boolean;
  entityAccesses?: EntityAccess[] | null;
};
export type RemoveCustomerUserModel = {
  userId?: string;
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
  isPublic?: boolean;
  datacenterId?: number;
  customerProductTypeId: number;
  storageHostTypeId?: number;
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
export type SupportListResponse = {
  id?: number;
  supportDate?: string;
  supportSubject?: string | null;
  businessUnit?: string | null;
  supportStatus?: string | null;
  supportStatusId?: number;
};
export type SupportShortListResponse = {
  id?: number;
  supportDate?: string;
  supportSubject?: string | null;
  supportStatus?: string | null;
};
export type SupportItemModel = {
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
  transaction?: SupportItemModel[] | null;
};
export type SupportSubjectListResponse = {
  id?: number;
  name?: string | null;
};
export type SupportSubjectSelectListModel = {
  productId?: number;
  businessUnitId?: number;
};
export type VmListResponse = {
  id?: number;
  name?: string | null;
  status?: string | null;
  statusId?: number;
  datacenter?: string | null;
  operatingSystem?: string | null;
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
  publicKey?: string | null;
  datacenterId: number;
  imageId: number;
  customerProductTypeId: number;
  isPredefined: boolean;
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
export type GetKmsModel = {
  id?: number;
  typeId?: number;
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
  isPredefined: boolean;
  productBundleId?: number | null;
  basicPackage?: boolean | null;
  startupPackage?: boolean | null;
  advancedPackage?: boolean | null;
  companyPackage?: boolean | null;
};
export type EditWebHostModel = {
  id?: number;
  productBundleId?: number;
};
export type GetDomainWhoisModel = {
  domainName: string;
  ext: string;
};
export const {
  usePostApiAccountLoginMutation,
  usePostApiAccountRegisterMutation,
  usePostApiAccountForgotMutation,
  usePostApiAccountForgotConfirmMutation,
  usePostApiAccountLogoutMutation,
  useGetApiCdnAnalyticGetByCdnIdAndPeriodIdQuery,
  useGetApiCdnApiGatewayListByCdnIdQuery,
  useGetApiCdnApiGatewayGetByIdQuery,
  usePostApiCdnApiGatewayCreateMutation,
  usePutApiCdnApiGatewayEditMutation,
  useDeleteApiCdnApiGatewayDeleteByIdMutation,
  useGetApiBareMetalListQuery,
  useGetApiBareMetalGetByIdQuery,
  usePostApiBareMetalCreateMutation,
  useDeleteApiBareMetalDeleteMutation,
  useGetApiCloudBusinessUnitListQuery,
  useGetApiCloudCalculateMonthListQuery,
  useGetApiCdnClientCertGetByCdnIdQuery,
  useGetApiCdnClientCertGetUserCertByCdnIdQuery,
  usePostApiCdnClientCertCreateUserCertMutation,
  useGetApiCdnEdgeCertGetByCdnIdQuery,
  useGetApiCdnEdgeCertGetUserCertByCdnIdQuery,
  usePostApiCdnEdgeCertCreateMutation,
  usePostApiCdnEdgeCertCreateUserCertMutation,
  useGetApiCdnHostListQuery,
  useGetApiCdnHostGetByIdQuery,
  useGetApiCdnHostGetNsStatusByIdQuery,
  useGetApiCdnHostOverviewByIdQuery,
  usePostApiCdnHostCheckZoneMutation,
  usePostApiCdnHostCreateMutation,
  useDeleteApiCdnHostDeleteByIdMutation,
  usePutApiCdnHostChangeCdnTypeMutation,
  usePutApiCdnHostChangeClientCertTypeMutation,
  usePutApiCdnHostChangeEdgeCertTypeMutation,
  usePutApiCdnHostChangeHstsMutation,
  usePutApiCdnHostChangeHttpsRedirectMutation,
  usePutApiCdnHostChangeNonWwwRedirectMutation,
  useGetApiColocationListQuery,
  usePostApiColocationCreateMutation,
  useDeleteApiColocationDeleteByIdMutation,
  useGetApiCloudCommissionListQuery,
  useGetApiCloudCustomerGetQuery,
  useGetApiCloudCustomerGetCustomerTypeQuery,
  usePutApiCloudCustomerEditMutation,
  usePutApiCloudCustomerEditCustomerTypeMutation,
  useGetApiCloudBillListQuery,
  useGetApiCloudBillBillShortListQuery,
  useGetApiCloudBillGetByIdQuery,
  useGetApiCloudBillDownloadByIdQuery,
  useGetApiCloudCustomerProductListByProductIdQuery,
  usePostApiCloudCustomerProductTransferMutation,
  usePostApiCloudCustomerUserChangeUserCustomerMutation,
  useGetApiCloudDashboardUsageByCategoryIdQuery,
  useGetApiDatacenterListQuery,
  useGetApiDatacenterIpListByProductIdAndIdQuery,
  useDeleteApiDatacenterIpDeleteByIdMutation,
  useGetApiCdnDnsRecordListByCdnIdQuery,
  useGetApiCdnDnsRecordGetByIdQuery,
  usePostApiCdnDnsRecordCreateMutation,
  usePutApiCdnDnsRecordEditMutation,
  useDeleteApiCdnDnsRecordDeleteByIdMutation,
  usePutApiCdnDnsRecordChangeProxyStatusByIdMutation,
  useGetApiDomainListQuery,
  useGetApiDomainGetByIdQuery,
  useGetApiDomainGetStatusByIdQuery,
  usePostApiDomainGetPriceMutation,
  usePostApiDomainRegisterMutation,
  useDeleteApiDomainDeleteByIdMutation,
  usePutApiDomainChangeContactMutation,
  usePutApiDomainChangeNsMutation,
  usePostApiDomainResendVerificationByIdMutation,
  useGetApiHomeIndexQuery,
  useGetApiCloudInvoiceListQuery,
  useGetApiCloudInvoiceGetByIdQuery,
  useGetApiPlatformDevopsListByIdQuery,
  useGetApiPlatformDevopsGetByIdQuery,
  usePostApiPlatformDevopsCreateMutation,
  useDeleteApiPlatformDevopsDeleteByIdMutation,
  useGetApiPlatformNamespaceListQuery,
  useGetApiPlatformNamespaceGetByIdQuery,
  useGetApiPlatformNamespaceGetLoginByIdQuery,
  usePostApiPlatformNamespaceCreateMutation,
  usePutApiPlatformNamespaceEditMutation,
  useDeleteApiPlatformNamespaceDeleteByIdMutation,
  useGetApiPlatformServiceListByIdQuery,
  useGetApiPlatformServiceGetByIdQuery,
  usePostApiPlatformServiceCreateMutation,
  useDeleteApiPlatformServiceDeleteByIdMutation,
  useGetApiPlatformKubernetesListQuery,
  useGetApiPlatformKubernetesGetByIdQuery,
  usePostApiPlatformKubernetesCreateMutation,
  usePutApiPlatformKubernetesEditMutation,
  useDeleteApiPlatformKubernetesDeleteByIdMutation,
  useGetApiPlatformUserListQuery,
  useGetApiPlatformUserShortListQuery,
  usePostApiPlatformUserCreateMutation,
  useDeleteApiPlatformUserDeleteByIdMutation,
  usePostApiPlatformUserChangePasswordMutation,
  useGetApiPlatformUserRoleListByKubeHostIdQuery,
  usePostApiPlatformUserRoleCreateMutation,
  useDeleteApiPlatformUserRoleDeleteByIdMutation,
  useGetApiPlatformVolumeListByIdQuery,
  useGetApiPlatformVolumeGetByIdQuery,
  usePostApiPlatformVolumeCreateMutation,
  useDeleteApiPlatformVolumeDeleteByIdMutation,
  useGetApiCdnLoadBalanceListByCdnIdQuery,
  useGetApiCdnLoadBalanceGetByIdQuery,
  usePostApiCdnLoadBalanceCreateMutation,
  usePutApiCdnLoadBalanceEditMutation,
  useDeleteApiCdnLoadBalanceDeleteByIdMutation,
  useGetApiCloudNotificationListQuery,
  useGetApiCloudNotificationShortListQuery,
  useGetApiCloudPaymentListQuery,
  useGetApiCloudPaymentGetByIdQuery,
  usePostApiCloudPaymentCreateMutation,
  usePostApiCloudPaymentPecCallBackMutation,
  usePostApiCloudPaymentSepCallBackMutation,
  useGetApiCloudProductListQuery,
  useGetApiCloudProductBundleListByProductIdQuery,
  useGetApiCloudProductItemListByProductIdQuery,
  useGetApiAccountProfileGetQuery,
  useGetApiAccountProfileGetNotificationStatusQuery,
  usePutApiAccountProfileEditMutation,
  usePutApiAccountProfileEditEmailMutation,
  usePostApiAccountProfileConfirmEmailMutation,
  usePutApiAccountProfileEditPhoneNumberMutation,
  usePostApiAccountProfileConfirmPhoneNumberMutation,
  usePutApiAccountProfileEditEmailNotificationMutation,
  usePutApiAccountProfileEditPhoneNotificationMutation,
  usePostApiAccountProfileChangePasswordMutation,
  useGetApiRabbitHostListQuery,
  useGetApiRabbitHostGetByIdQuery,
  usePostApiRabbitHostCreateMutation,
  usePutApiRabbitHostChangeServiceMutation,
  useDeleteApiRabbitHostDeleteByIdMutation,
  usePostApiRabbitHostChangeExchangeMutation,
  useGetApiRabbitUserListByRabbitHostIdQuery,
  usePostApiRabbitUserCreateMutation,
  useDeleteApiRabbitUserDeleteByIdMutation,
  usePostApiRabbitUserChangePasswordMutation,
  useGetApiAccountReferralGetQuery,
  usePostApiAccountReferralJoinMutation,
  useGetApiAccountRoleRoleAccessTypesQuery,
  useGetApiAccountRoleRolesQuery,
  usePostApiAccountRoleGetUserAccessEntitiesMutation,
  usePostApiAccountRoleCreateUserAccessMutation,
  usePutApiAccountRoleEditUserAccessMutation,
  useDeleteApiAccountRoleRemoveCustomerUserMutation,
  useGetApiStorageHostListQuery,
  useGetApiStorageHostGetByIdQuery,
  usePostApiStorageHostCreateMutation,
  usePutApiStorageHostEditMutation,
  useDeleteApiStorageHostDeleteByIdMutation,
  useGetApiStorageUserListByStorageHostIdQuery,
  usePostApiStorageUserCreateMutation,
  useDeleteApiStorageUserDeleteByIdMutation,
  useGetApiCloudSupportListQuery,
  useGetApiCloudSupportShortListQuery,
  usePostApiCloudSupportCreateMutation,
  useGetApiCloudSupportItemListBySupportIdQuery,
  usePostApiCloudSupportItemCreateMutation,
  useGetApiCloudSupportItemDownloadByIdQuery,
  useGetApiCloudSupportSubjectListQuery,
  usePostApiCloudSupportSubjectSelectListMutation,
  useGetApiVmHostListQuery,
  useGetApiVmHostGetByIdQuery,
  usePostApiVmHostCreateMutation,
  usePutApiVmHostEditMutation,
  useDeleteApiVmHostDeleteByIdMutation,
  usePutApiVmHostRebuildMutation,
  usePutApiVmHostConnectByIdMutation,
  usePutApiVmHostDisconnectByIdMutation,
  usePutApiVmHostRebootByIdMutation,
  usePutApiVmHostShutdownByIdMutation,
  usePutApiVmHostResetByIdMutation,
  usePutApiVmHostStartByIdMutation,
  usePutApiVmHostStopByIdMutation,
  usePostApiVmKmsGetMutation,
  useGetApiVmImageListByDatacenterIdQuery,
  useGetApiVmIsoListByDatacenterIdQuery,
  usePutApiVmIsoMountMutation,
  usePutApiVmIsoUnmountMutation,
  useGetApiVpcHostListQuery,
  usePostApiVpcHostCreateMutation,
  useGetApiVpcNetworkListByVpcHostIdQuery,
  usePostApiVpcNetworkCreateMutation,
  useGetApiCloudWalletGetBalanceQuery,
  useGetApiCloudWalletListQuery,
  useGetApiWebListQuery,
  useGetApiWebGetByIdQuery,
  useGetApiWebGetLoginSessionByIdQuery,
  usePostApiWebCheckDomainMutation,
  usePostApiWebCreateMutation,
  usePutApiWebEditMutation,
  useDeleteApiWebDeleteByIdMutation,
  usePostApiDomainWhoisGetMutation,
} = api;

