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
    getApiMyBareMetalList: build.query<
      GetApiMyBareMetalListApiResponse,
      GetApiMyBareMetalListApiArg
    >({
      query: () => ({ url: `/api/my/bare-metal/list` }),
    }),
    getApiMyBareMetalGetById: build.query<
      GetApiMyBareMetalGetByIdApiResponse,
      GetApiMyBareMetalGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/bare-metal/get/${queryArg.id}` }),
    }),
    postApiMyBareMetalCreate: build.mutation<
      PostApiMyBareMetalCreateApiResponse,
      PostApiMyBareMetalCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/bare-metal/create`,
        method: "POST",
        body: queryArg.createBareMetalModel,
      }),
    }),
    deleteApiMyBareMetalDelete: build.mutation<
      DeleteApiMyBareMetalDeleteApiResponse,
      DeleteApiMyBareMetalDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/bare-metal/delete`,
        method: "DELETE",
        params: { id: queryArg.id },
      }),
    }),
    getApiMyCloudBusinessUnitList: build.query<
      GetApiMyCloudBusinessUnitListApiResponse,
      GetApiMyCloudBusinessUnitListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/business-unit/list` }),
    }),
    getApiMyCloudCalculateMonthList: build.query<
      GetApiMyCloudCalculateMonthListApiResponse,
      GetApiMyCloudCalculateMonthListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/calculate-month/list` }),
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
    getApiMyColocationList: build.query<
      GetApiMyColocationListApiResponse,
      GetApiMyColocationListApiArg
    >({
      query: () => ({ url: `/api/my/colocation/list` }),
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
    deleteApiMyColocationDeleteById: build.mutation<
      DeleteApiMyColocationDeleteByIdApiResponse,
      DeleteApiMyColocationDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/colocation/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyCloudCommissionList: build.query<
      GetApiMyCloudCommissionListApiResponse,
      GetApiMyCloudCommissionListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/commission/list` }),
    }),
    getApiMyCloudCustomerGet: build.query<
      GetApiMyCloudCustomerGetApiResponse,
      GetApiMyCloudCustomerGetApiArg
    >({
      query: () => ({ url: `/api/my/cloud/customer/get` }),
    }),
    getApiMyCloudCustomerGetCustomerType: build.query<
      GetApiMyCloudCustomerGetCustomerTypeApiResponse,
      GetApiMyCloudCustomerGetCustomerTypeApiArg
    >({
      query: () => ({ url: `/api/my/cloud/customer/get-customer-type` }),
    }),
    putApiMyCloudCustomerEdit: build.mutation<
      PutApiMyCloudCustomerEditApiResponse,
      PutApiMyCloudCustomerEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/customer/edit`,
        method: "PUT",
        body: queryArg.editCustomerModel,
      }),
    }),
    putApiMyCloudCustomerEditCustomerType: build.mutation<
      PutApiMyCloudCustomerEditCustomerTypeApiResponse,
      PutApiMyCloudCustomerEditCustomerTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/customer/edit-customer-type`,
        method: "PUT",
        body: queryArg.editCustomerTypeModel,
      }),
    }),
    getApiMyCloudBillList: build.query<
      GetApiMyCloudBillListApiResponse,
      GetApiMyCloudBillListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/bill/list` }),
    }),
    getApiMyCloudBillBillShortList: build.query<
      GetApiMyCloudBillBillShortListApiResponse,
      GetApiMyCloudBillBillShortListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/bill/bill-short-list` }),
    }),
    getApiMyCloudBillGetById: build.query<
      GetApiMyCloudBillGetByIdApiResponse,
      GetApiMyCloudBillGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/cloud/bill/get/${queryArg.id}` }),
    }),
    getApiMyCloudBillDownloadById: build.query<
      GetApiMyCloudBillDownloadByIdApiResponse,
      GetApiMyCloudBillDownloadByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/bill/download/${queryArg.id}`,
      }),
    }),
    getApiMyCloudCustomerProductListByProductId: build.query<
      GetApiMyCloudCustomerProductListByProductIdApiResponse,
      GetApiMyCloudCustomerProductListByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/customer-product/list/${queryArg.productId}`,
      }),
    }),
    postApiMyCloudCustomerProductTransfer: build.mutation<
      PostApiMyCloudCustomerProductTransferApiResponse,
      PostApiMyCloudCustomerProductTransferApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/customer-product/transfer`,
        method: "POST",
        body: queryArg.customerProductTransferModel,
      }),
    }),
    postApiMyCloudCustomerUserChangeUserCustomer: build.mutation<
      PostApiMyCloudCustomerUserChangeUserCustomerApiResponse,
      PostApiMyCloudCustomerUserChangeUserCustomerApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/customer-user/change-user-customer`,
        method: "POST",
        body: queryArg.changeUserCustomerModel,
      }),
    }),
    getApiMyCloudDashboardUsageByCategoryId: build.query<
      GetApiMyCloudDashboardUsageByCategoryIdApiResponse,
      GetApiMyCloudDashboardUsageByCategoryIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/dashboard/usage/${queryArg.categoryId}`,
      }),
    }),
    getApiMyCloudDashboardTickets: build.query<
      GetApiMyCloudDashboardTicketsApiResponse,
      GetApiMyCloudDashboardTicketsApiArg
    >({
      query: () => ({ url: `/api/my/cloud/dashboard/tickets` }),
    }),
    getApiMyCloudDashboardActiveServices: build.query<
      GetApiMyCloudDashboardActiveServicesApiResponse,
      GetApiMyCloudDashboardActiveServicesApiArg
    >({
      query: () => ({ url: `/api/my/cloud/dashboard/active-services` }),
    }),
    getApiMyCloudDashboardFinancial: build.query<
      GetApiMyCloudDashboardFinancialApiResponse,
      GetApiMyCloudDashboardFinancialApiArg
    >({
      query: () => ({ url: `/api/my/cloud/dashboard/financial` }),
    }),
    getApiMyDatacenterList: build.query<
      GetApiMyDatacenterListApiResponse,
      GetApiMyDatacenterListApiArg
    >({
      query: () => ({ url: `/api/my/datacenter/list` }),
    }),
    getApiMyDatacenterIpListByProductIdAndId: build.query<
      GetApiMyDatacenterIpListByProductIdAndIdApiResponse,
      GetApiMyDatacenterIpListByProductIdAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/datacenter/ip/list/${queryArg.productId}/${queryArg.id}`,
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
    getApiMyDomainList: build.query<
      GetApiMyDomainListApiResponse,
      GetApiMyDomainListApiArg
    >({
      query: () => ({ url: `/api/my/domain/list` }),
    }),
    getApiMyDomainGetById: build.query<
      GetApiMyDomainGetByIdApiResponse,
      GetApiMyDomainGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/domain/get/${queryArg.id}` }),
    }),
    getApiMyDomainGetStatusById: build.query<
      GetApiMyDomainGetStatusByIdApiResponse,
      GetApiMyDomainGetStatusByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/get-status/${queryArg.id}`,
      }),
    }),
    postApiMyDomainGetPrice: build.mutation<
      PostApiMyDomainGetPriceApiResponse,
      PostApiMyDomainGetPriceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/get-price`,
        method: "POST",
        body: queryArg.getPriceModel,
      }),
    }),
    postApiMyDomainRegister: build.mutation<
      PostApiMyDomainRegisterApiResponse,
      PostApiMyDomainRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/register`,
        method: "POST",
        body: queryArg.registerDomainModel,
      }),
    }),
    deleteApiMyDomainDeleteById: build.mutation<
      DeleteApiMyDomainDeleteByIdApiResponse,
      DeleteApiMyDomainDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putApiMyDomainChangeContact: build.mutation<
      PutApiMyDomainChangeContactApiResponse,
      PutApiMyDomainChangeContactApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/change-contact`,
        method: "PUT",
        body: queryArg.changeContactModel,
      }),
    }),
    putApiMyDomainChangeNs: build.mutation<
      PutApiMyDomainChangeNsApiResponse,
      PutApiMyDomainChangeNsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/change-ns`,
        method: "PUT",
        body: queryArg.changeNsModel,
      }),
    }),
    postApiMyDomainResendVerificationById: build.mutation<
      PostApiMyDomainResendVerificationByIdApiResponse,
      PostApiMyDomainResendVerificationByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/domain/resend-verification/${queryArg.id}`,
        method: "POST",
      }),
    }),
    getApiMyFinancial: build.query<
      GetApiMyFinancialApiResponse,
      GetApiMyFinancialApiArg
    >({
      query: () => ({ url: `/api/my/financial` }),
    }),
    getApiMyHomeIndex: build.query<
      GetApiMyHomeIndexApiResponse,
      GetApiMyHomeIndexApiArg
    >({
      query: () => ({ url: `/api/my/home/index` }),
    }),
    getApiMyCloudInvoiceList: build.query<
      GetApiMyCloudInvoiceListApiResponse,
      GetApiMyCloudInvoiceListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/invoice/list` }),
    }),
    getApiMyCloudInvoiceGetById: build.query<
      GetApiMyCloudInvoiceGetByIdApiResponse,
      GetApiMyCloudInvoiceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/invoice/get/${queryArg.id}`,
      }),
    }),
    postApiMyCloudInvoicePay: build.mutation<
      PostApiMyCloudInvoicePayApiResponse,
      PostApiMyCloudInvoicePayApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/invoice/pay`,
        method: "POST",
        body: queryArg.payInvoiceModel,
      }),
    }),
    getApiMyCloudInvoiceUnpaid: build.query<
      GetApiMyCloudInvoiceUnpaidApiResponse,
      GetApiMyCloudInvoiceUnpaidApiArg
    >({
      query: () => ({ url: `/api/my/cloud/invoice/unpaid` }),
    }),
    getApiMyCloudIssueList: build.query<
      GetApiMyCloudIssueListApiResponse,
      GetApiMyCloudIssueListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/issue/list` }),
    }),
    getApiMyCloudIssueShortList: build.query<
      GetApiMyCloudIssueShortListApiResponse,
      GetApiMyCloudIssueShortListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/issue/short-list` }),
    }),
    postApiMyCloudIssueCreate: build.mutation<
      PostApiMyCloudIssueCreateApiResponse,
      PostApiMyCloudIssueCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/issue/create`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiMyCloudIssueItemListByIssueId: build.query<
      GetApiMyCloudIssueItemListByIssueIdApiResponse,
      GetApiMyCloudIssueItemListByIssueIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/issue-item/list/${queryArg.issueId}`,
      }),
    }),
    postApiMyCloudIssueItemCreate: build.mutation<
      PostApiMyCloudIssueItemCreateApiResponse,
      PostApiMyCloudIssueItemCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/issue-item/create`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiMyCloudIssueItemDownloadById: build.query<
      GetApiMyCloudIssueItemDownloadByIdApiResponse,
      GetApiMyCloudIssueItemDownloadByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/issue-item/download/${queryArg.id}`,
      }),
    }),
    getApiMyCloudIssueSubjectList: build.query<
      GetApiMyCloudIssueSubjectListApiResponse,
      GetApiMyCloudIssueSubjectListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/issue-subject/list` }),
    }),
    postApiMyCloudIssueSubjectSelectList: build.mutation<
      PostApiMyCloudIssueSubjectSelectListApiResponse,
      PostApiMyCloudIssueSubjectSelectListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/issue-subject/select-list`,
        method: "POST",
        body: queryArg.issueSubjectSelectListModel,
      }),
    }),
    getApiMyPlatformDevopsListById: build.query<
      GetApiMyPlatformDevopsListByIdApiResponse,
      GetApiMyPlatformDevopsListByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/devops/list/${queryArg.id}`,
      }),
    }),
    getApiMyPlatformDevopsGetById: build.query<
      GetApiMyPlatformDevopsGetByIdApiResponse,
      GetApiMyPlatformDevopsGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/devops/get/${queryArg.id}`,
      }),
    }),
    postApiMyPlatformDevopsCreate: build.mutation<
      PostApiMyPlatformDevopsCreateApiResponse,
      PostApiMyPlatformDevopsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/devops/create`,
        method: "POST",
        body: queryArg.createKubeDevOpsModel,
      }),
    }),
    deleteApiMyPlatformDevopsDeleteById: build.mutation<
      DeleteApiMyPlatformDevopsDeleteByIdApiResponse,
      DeleteApiMyPlatformDevopsDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/devops/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyPlatformNamespaceList: build.query<
      GetApiMyPlatformNamespaceListApiResponse,
      GetApiMyPlatformNamespaceListApiArg
    >({
      query: () => ({ url: `/api/my/platform/namespace/list` }),
    }),
    getApiMyPlatformNamespaceGetById: build.query<
      GetApiMyPlatformNamespaceGetByIdApiResponse,
      GetApiMyPlatformNamespaceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/namespace/get/${queryArg.id}`,
      }),
    }),
    getApiMyPlatformNamespaceGetLoginById: build.query<
      GetApiMyPlatformNamespaceGetLoginByIdApiResponse,
      GetApiMyPlatformNamespaceGetLoginByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/namespace/get-login/${queryArg.id}`,
      }),
    }),
    postApiMyPlatformNamespaceCreate: build.mutation<
      PostApiMyPlatformNamespaceCreateApiResponse,
      PostApiMyPlatformNamespaceCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/namespace/create`,
        method: "POST",
        body: queryArg.createKubeHostModel,
      }),
    }),
    putApiMyPlatformNamespaceEdit: build.mutation<
      PutApiMyPlatformNamespaceEditApiResponse,
      PutApiMyPlatformNamespaceEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/namespace/edit`,
        method: "PUT",
        body: queryArg.editKubeHostModel,
      }),
    }),
    deleteApiMyPlatformNamespaceDeleteById: build.mutation<
      DeleteApiMyPlatformNamespaceDeleteByIdApiResponse,
      DeleteApiMyPlatformNamespaceDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/namespace/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyPlatformServiceListById: build.query<
      GetApiMyPlatformServiceListByIdApiResponse,
      GetApiMyPlatformServiceListByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/service/list/${queryArg.id}`,
      }),
    }),
    getApiMyPlatformServiceGetById: build.query<
      GetApiMyPlatformServiceGetByIdApiResponse,
      GetApiMyPlatformServiceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/service/get/${queryArg.id}`,
      }),
    }),
    postApiMyPlatformServiceCreate: build.mutation<
      PostApiMyPlatformServiceCreateApiResponse,
      PostApiMyPlatformServiceCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/service/create`,
        method: "POST",
        body: queryArg.createKubeServiceModel,
      }),
    }),
    deleteApiMyPlatformServiceDeleteById: build.mutation<
      DeleteApiMyPlatformServiceDeleteByIdApiResponse,
      DeleteApiMyPlatformServiceDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/service/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyPlatformKubernetesList: build.query<
      GetApiMyPlatformKubernetesListApiResponse,
      GetApiMyPlatformKubernetesListApiArg
    >({
      query: () => ({ url: `/api/my/platform/kubernetes/list` }),
    }),
    getApiMyPlatformKubernetesGetById: build.query<
      GetApiMyPlatformKubernetesGetByIdApiResponse,
      GetApiMyPlatformKubernetesGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/kubernetes/get/${queryArg.id}`,
      }),
    }),
    getApiMyPlatformKubernetesImagesByDatacenterId: build.query<
      GetApiMyPlatformKubernetesImagesByDatacenterIdApiResponse,
      GetApiMyPlatformKubernetesImagesByDatacenterIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/kubernetes/images/${queryArg.datacenterId}`,
      }),
    }),
    getApiMyPlatformKubernetesVersions: build.query<
      GetApiMyPlatformKubernetesVersionsApiResponse,
      GetApiMyPlatformKubernetesVersionsApiArg
    >({
      query: () => ({ url: `/api/my/platform/kubernetes/versions` }),
    }),
    postApiMyPlatformKubernetesCreate: build.mutation<
      PostApiMyPlatformKubernetesCreateApiResponse,
      PostApiMyPlatformKubernetesCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/kubernetes/create`,
        method: "POST",
        body: queryArg.createClusterModel,
      }),
    }),
    putApiMyPlatformKubernetesRemoveNode: build.mutation<
      PutApiMyPlatformKubernetesRemoveNodeApiResponse,
      PutApiMyPlatformKubernetesRemoveNodeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/kubernetes/remove-node`,
        method: "PUT",
        body: queryArg.removeClusterNodeModel,
      }),
    }),
    deleteApiMyPlatformKubernetesDeleteById: build.mutation<
      DeleteApiMyPlatformKubernetesDeleteByIdApiResponse,
      DeleteApiMyPlatformKubernetesDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/kubernetes/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyPlatformUserList: build.query<
      GetApiMyPlatformUserListApiResponse,
      GetApiMyPlatformUserListApiArg
    >({
      query: () => ({ url: `/api/my/platform/user/list` }),
    }),
    getApiMyPlatformUserShortList: build.query<
      GetApiMyPlatformUserShortListApiResponse,
      GetApiMyPlatformUserShortListApiArg
    >({
      query: () => ({ url: `/api/my/platform/user/short-list` }),
    }),
    postApiMyPlatformUserCreate: build.mutation<
      PostApiMyPlatformUserCreateApiResponse,
      PostApiMyPlatformUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/user/create`,
        method: "POST",
        body: queryArg.createKubeUserModel,
      }),
    }),
    deleteApiMyPlatformUserDeleteById: build.mutation<
      DeleteApiMyPlatformUserDeleteByIdApiResponse,
      DeleteApiMyPlatformUserDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/user/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyPlatformUserChangePassword: build.mutation<
      PostApiMyPlatformUserChangePasswordApiResponse,
      PostApiMyPlatformUserChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/user/change-password`,
        method: "POST",
        body: queryArg.changeKubeUserPasswordModel,
      }),
    }),
    getApiMyPlatformUserRoleListByKubeHostId: build.query<
      GetApiMyPlatformUserRoleListByKubeHostIdApiResponse,
      GetApiMyPlatformUserRoleListByKubeHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/user-role/list/${queryArg.kubeHostId}`,
      }),
    }),
    postApiMyPlatformUserRoleCreate: build.mutation<
      PostApiMyPlatformUserRoleCreateApiResponse,
      PostApiMyPlatformUserRoleCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/user-role/create`,
        method: "POST",
        body: queryArg.createKubeUserRoleModel,
      }),
    }),
    deleteApiMyPlatformUserRoleDeleteById: build.mutation<
      DeleteApiMyPlatformUserRoleDeleteByIdApiResponse,
      DeleteApiMyPlatformUserRoleDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/user-role/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyPlatformVolumeListById: build.query<
      GetApiMyPlatformVolumeListByIdApiResponse,
      GetApiMyPlatformVolumeListByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/volume/list/${queryArg.id}`,
      }),
    }),
    getApiMyPlatformVolumeGetById: build.query<
      GetApiMyPlatformVolumeGetByIdApiResponse,
      GetApiMyPlatformVolumeGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/volume/get/${queryArg.id}`,
      }),
    }),
    postApiMyPlatformVolumeCreate: build.mutation<
      PostApiMyPlatformVolumeCreateApiResponse,
      PostApiMyPlatformVolumeCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/volume/create`,
        method: "POST",
        body: queryArg.createKubeVolumeModel,
      }),
    }),
    deleteApiMyPlatformVolumeDeleteById: build.mutation<
      DeleteApiMyPlatformVolumeDeleteByIdApiResponse,
      DeleteApiMyPlatformVolumeDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/platform/volume/delete/${queryArg.id}`,
        method: "DELETE",
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
    getApiMyCloudNotificationList: build.query<
      GetApiMyCloudNotificationListApiResponse,
      GetApiMyCloudNotificationListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/notification/list` }),
    }),
    getApiMyCloudNotificationShortList: build.query<
      GetApiMyCloudNotificationShortListApiResponse,
      GetApiMyCloudNotificationShortListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/notification/short-list` }),
    }),
    putApiMyCloudNotificationSeenById: build.mutation<
      PutApiMyCloudNotificationSeenByIdApiResponse,
      PutApiMyCloudNotificationSeenByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/notification/seen/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiMyCloudPaymentList: build.query<
      GetApiMyCloudPaymentListApiResponse,
      GetApiMyCloudPaymentListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/payment/list` }),
    }),
    getApiMyCloudPaymentGetById: build.query<
      GetApiMyCloudPaymentGetByIdApiResponse,
      GetApiMyCloudPaymentGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/payment/get/${queryArg.id}`,
      }),
    }),
    postApiMyCloudPaymentCreate: build.mutation<
      PostApiMyCloudPaymentCreateApiResponse,
      PostApiMyCloudPaymentCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/payment/create`,
        method: "POST",
        body: queryArg.createPaymentModel,
      }),
    }),
    postApiMyCloudPaymentPecCallBack: build.mutation<
      PostApiMyCloudPaymentPecCallBackApiResponse,
      PostApiMyCloudPaymentPecCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/payment/pec-call-back`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postApiMyCloudPaymentSepCallBack: build.mutation<
      PostApiMyCloudPaymentSepCallBackApiResponse,
      PostApiMyCloudPaymentSepCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/payment/sep-call-back`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiMyCloudProductList: build.query<
      GetApiMyCloudProductListApiResponse,
      GetApiMyCloudProductListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/product/list` }),
    }),
    getApiMyCloudProductBundleListByProductId: build.query<
      GetApiMyCloudProductBundleListByProductIdApiResponse,
      GetApiMyCloudProductBundleListByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/product-bundle/list/${queryArg.productId}`,
      }),
    }),
    getApiMyCloudProductBundleVmList: build.query<
      GetApiMyCloudProductBundleVmListApiResponse,
      GetApiMyCloudProductBundleVmListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/product-bundle/vm-list` }),
    }),
    getApiMyCloudProductBundleStorageList: build.query<
      GetApiMyCloudProductBundleStorageListApiResponse,
      GetApiMyCloudProductBundleStorageListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/product-bundle/storage-list` }),
    }),
    getApiMyCloudProductBundleWebHostList: build.query<
      GetApiMyCloudProductBundleWebHostListApiResponse,
      GetApiMyCloudProductBundleWebHostListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/product-bundle/web-host-list` }),
    }),
    getApiMyCloudProductItemListByProductId: build.query<
      GetApiMyCloudProductItemListByProductIdApiResponse,
      GetApiMyCloudProductItemListByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/product-item/list/${queryArg.productId}`,
      }),
    }),
    getApiMyAccountProfileGet: build.query<
      GetApiMyAccountProfileGetApiResponse,
      GetApiMyAccountProfileGetApiArg
    >({
      query: () => ({ url: `/api/my/account/profile/get` }),
    }),
    getApiMyAccountProfileGetNotificationStatus: build.query<
      GetApiMyAccountProfileGetNotificationStatusApiResponse,
      GetApiMyAccountProfileGetNotificationStatusApiArg
    >({
      query: () => ({ url: `/api/my/account/profile/get-notification-status` }),
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
    getApiMyAccountReferralGet: build.query<
      GetApiMyAccountReferralGetApiResponse,
      GetApiMyAccountReferralGetApiArg
    >({
      query: () => ({ url: `/api/my/account/referral/get` }),
    }),
    postApiMyAccountReferralJoin: build.mutation<
      PostApiMyAccountReferralJoinApiResponse,
      PostApiMyAccountReferralJoinApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/referral/join`,
        method: "POST",
        body: queryArg.joinReferralModel,
      }),
    }),
    getApiMyAccountRoleRoleAccessTypes: build.query<
      GetApiMyAccountRoleRoleAccessTypesApiResponse,
      GetApiMyAccountRoleRoleAccessTypesApiArg
    >({
      query: () => ({ url: `/api/my/account/role/role-access-types` }),
    }),
    getApiMyAccountRoleRoles: build.query<
      GetApiMyAccountRoleRolesApiResponse,
      GetApiMyAccountRoleRolesApiArg
    >({
      query: () => ({ url: `/api/my/account/role/roles` }),
    }),
    postApiMyAccountRoleGetUserAccessEntities: build.mutation<
      PostApiMyAccountRoleGetUserAccessEntitiesApiResponse,
      PostApiMyAccountRoleGetUserAccessEntitiesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/role/get-user-access-entities`,
        method: "POST",
        body: queryArg.getUserAccessEntityModel,
      }),
    }),
    postApiMyAccountRoleCreateUserAccess: build.mutation<
      PostApiMyAccountRoleCreateUserAccessApiResponse,
      PostApiMyAccountRoleCreateUserAccessApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/role/create-user-access`,
        method: "POST",
        body: queryArg.setUserAccessModel,
      }),
    }),
    putApiMyAccountRoleEditUserAccess: build.mutation<
      PutApiMyAccountRoleEditUserAccessApiResponse,
      PutApiMyAccountRoleEditUserAccessApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/role/edit-user-access`,
        method: "PUT",
        body: queryArg.setUserAccessModel,
      }),
    }),
    deleteApiMyAccountRoleRemoveCustomerUser: build.mutation<
      DeleteApiMyAccountRoleRemoveCustomerUserApiResponse,
      DeleteApiMyAccountRoleRemoveCustomerUserApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/role/remove-customer-user`,
        method: "DELETE",
        body: queryArg.removeCustomerUserModel,
      }),
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
    postApiMyVmHostList: build.mutation<
      PostApiMyVmHostListApiResponse,
      PostApiMyVmHostListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/host/list`,
        method: "POST",
        body: queryArg.vmListModel,
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
    postApiMyVmKmsGet: build.mutation<
      PostApiMyVmKmsGetApiResponse,
      PostApiMyVmKmsGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/kms/get`,
        method: "POST",
        body: queryArg.getKmsModel,
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
    postApiMyAccountVoucherUse: build.mutation<
      PostApiMyAccountVoucherUseApiResponse,
      PostApiMyAccountVoucherUseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/voucher/use`,
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
    getApiMyCloudWalletGetBalance: build.query<
      GetApiMyCloudWalletGetBalanceApiResponse,
      GetApiMyCloudWalletGetBalanceApiArg
    >({
      query: () => ({ url: `/api/my/cloud/wallet/get-balance` }),
    }),
    getApiMyCloudWalletList: build.query<
      GetApiMyCloudWalletListApiResponse,
      GetApiMyCloudWalletListApiArg
    >({
      query: () => ({ url: `/api/my/cloud/wallet/list` }),
    }),
    getApiMyWebList: build.query<
      GetApiMyWebListApiResponse,
      GetApiMyWebListApiArg
    >({
      query: () => ({ url: `/api/my/web/list` }),
    }),
    getApiMyWebGetById: build.query<
      GetApiMyWebGetByIdApiResponse,
      GetApiMyWebGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/web/get/${queryArg.id}` }),
    }),
    getApiMyWebGetLoginSessionById: build.query<
      GetApiMyWebGetLoginSessionByIdApiResponse,
      GetApiMyWebGetLoginSessionByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/web/get-login-session/${queryArg.id}`,
      }),
    }),
    postApiMyWebCheckDomain: build.mutation<
      PostApiMyWebCheckDomainApiResponse,
      PostApiMyWebCheckDomainApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/web/check-domain`,
        method: "POST",
        body: queryArg.checkWebHostDomainModel,
      }),
    }),
    postApiMyWebCreate: build.mutation<
      PostApiMyWebCreateApiResponse,
      PostApiMyWebCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/web/create`,
        method: "POST",
        body: queryArg.createWebHostModel,
      }),
    }),
    putApiMyWebEdit: build.mutation<
      PutApiMyWebEditApiResponse,
      PutApiMyWebEditApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/web/edit`,
        method: "PUT",
        body: queryArg.editWebHostModel,
      }),
    }),
    deleteApiMyWebDeleteById: build.mutation<
      DeleteApiMyWebDeleteByIdApiResponse,
      DeleteApiMyWebDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/web/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyCloudContactUsCreate: build.mutation<
      PostApiMyCloudContactUsCreateApiResponse,
      PostApiMyCloudContactUsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/contact-us/create`,
        method: "POST",
        body: queryArg.createContactUsModel,
      }),
    }),
    postApiMyCloudNewsCreate: build.mutation<
      PostApiMyCloudNewsCreateApiResponse,
      PostApiMyCloudNewsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/cloud/news/create`,
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
export type PostApiMyAccountRegisterApiResponse = unknown;
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
export type GetApiMyBareMetalListApiResponse =
  /** status 200 Success */ BareMetalListResponse[];
export type GetApiMyBareMetalListApiArg = void;
export type GetApiMyBareMetalGetByIdApiResponse =
  /** status 200 Success */ BareMetalResponse;
export type GetApiMyBareMetalGetByIdApiArg = {
  id: number;
};
export type PostApiMyBareMetalCreateApiResponse = unknown;
export type PostApiMyBareMetalCreateApiArg = {
  createBareMetalModel: CreateBareMetalModel;
};
export type DeleteApiMyBareMetalDeleteApiResponse = unknown;
export type DeleteApiMyBareMetalDeleteApiArg = {
  id?: number;
};
export type GetApiMyCloudBusinessUnitListApiResponse =
  /** status 200 Success */ BusinessUnitListResponse[];
export type GetApiMyCloudBusinessUnitListApiArg = void;
export type GetApiMyCloudCalculateMonthListApiResponse =
  /** status 200 Success */ CalculateMonthListResponse[];
export type GetApiMyCloudCalculateMonthListApiArg = void;
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
export type GetApiMyColocationListApiResponse =
  /** status 200 Success */ CoLocationListResponse[];
export type GetApiMyColocationListApiArg = void;
export type PostApiMyColocationCreateApiResponse =
  /** status 200 Success */ number;
export type PostApiMyColocationCreateApiArg = {
  createColocationModel: CreateColocationModel;
};
export type DeleteApiMyColocationDeleteByIdApiResponse = unknown;
export type DeleteApiMyColocationDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyCloudCommissionListApiResponse =
  /** status 200 Success */ CommissionListResponse;
export type GetApiMyCloudCommissionListApiArg = void;
export type GetApiMyCloudCustomerGetApiResponse =
  /** status 200 Success */ GetCustomerResponse;
export type GetApiMyCloudCustomerGetApiArg = void;
export type GetApiMyCloudCustomerGetCustomerTypeApiResponse =
  /** status 200 Success */ number;
export type GetApiMyCloudCustomerGetCustomerTypeApiArg = void;
export type PutApiMyCloudCustomerEditApiResponse = unknown;
export type PutApiMyCloudCustomerEditApiArg = {
  editCustomerModel: EditCustomerModel;
};
export type PutApiMyCloudCustomerEditCustomerTypeApiResponse = unknown;
export type PutApiMyCloudCustomerEditCustomerTypeApiArg = {
  editCustomerTypeModel: EditCustomerTypeModel;
};
export type GetApiMyCloudBillListApiResponse =
  /** status 200 Success */ CustomerBillListResponse[];
export type GetApiMyCloudBillListApiArg = void;
export type GetApiMyCloudBillBillShortListApiResponse =
  /** status 200 Success */ CustomerBillShortListResponse[];
export type GetApiMyCloudBillBillShortListApiArg = void;
export type GetApiMyCloudBillGetByIdApiResponse =
  /** status 200 Success */ GetCustomerBillResponse;
export type GetApiMyCloudBillGetByIdApiArg = {
  id: number;
};
export type GetApiMyCloudBillDownloadByIdApiResponse = unknown;
export type GetApiMyCloudBillDownloadByIdApiArg = {
  id: number;
};
export type GetApiMyCloudCustomerProductListByProductIdApiResponse =
  /** status 200 Success */ CustomerProductListResponse[];
export type GetApiMyCloudCustomerProductListByProductIdApiArg = {
  productId: number;
};
export type PostApiMyCloudCustomerProductTransferApiResponse = unknown;
export type PostApiMyCloudCustomerProductTransferApiArg = {
  customerProductTransferModel: CustomerProductTransferModel;
};
export type PostApiMyCloudCustomerUserChangeUserCustomerApiResponse =
  /** status 200 Success */ ChangeUserCustomerResponse;
export type PostApiMyCloudCustomerUserChangeUserCustomerApiArg = {
  changeUserCustomerModel: ChangeUserCustomerModel;
};
export type GetApiMyCloudDashboardUsageByCategoryIdApiResponse =
  /** status 200 Success */ DashboardUsageResponse[];
export type GetApiMyCloudDashboardUsageByCategoryIdApiArg = {
  categoryId: number;
};
export type GetApiMyCloudDashboardTicketsApiResponse =
  /** status 200 Success */ IssueShortListDashboardResponse[];
export type GetApiMyCloudDashboardTicketsApiArg = void;
export type GetApiMyCloudDashboardActiveServicesApiResponse =
  /** status 200 Success */ CustomerShortListResponse[];
export type GetApiMyCloudDashboardActiveServicesApiArg = void;
export type GetApiMyCloudDashboardFinancialApiResponse =
  /** status 200 Success */ ReportDashboardFinancialResponse;
export type GetApiMyCloudDashboardFinancialApiArg = void;
export type GetApiMyDatacenterListApiResponse =
  /** status 200 Success */ DatacenterListResponse[];
export type GetApiMyDatacenterListApiArg = void;
export type GetApiMyDatacenterIpListByProductIdAndIdApiResponse =
  /** status 200 Success */ DatacenterIpListResponse[];
export type GetApiMyDatacenterIpListByProductIdAndIdApiArg = {
  productId: number;
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
export type GetApiMyDomainListApiResponse =
  /** status 200 Success */ DomainListResponse[];
export type GetApiMyDomainListApiArg = void;
export type GetApiMyDomainGetByIdApiResponse =
  /** status 200 Success */ GetDomainResponse;
export type GetApiMyDomainGetByIdApiArg = {
  id: number;
};
export type GetApiMyDomainGetStatusByIdApiResponse =
  /** status 200 Success */ GetDomainResponse;
export type GetApiMyDomainGetStatusByIdApiArg = {
  id: number;
};
export type PostApiMyDomainGetPriceApiResponse =
  /** status 200 Success */ GetProductPriceResponse;
export type PostApiMyDomainGetPriceApiArg = {
  getPriceModel: GetPriceModel;
};
export type PostApiMyDomainRegisterApiResponse =
  /** status 200 Success */ number;
export type PostApiMyDomainRegisterApiArg = {
  registerDomainModel: RegisterDomainModel;
};
export type DeleteApiMyDomainDeleteByIdApiResponse = unknown;
export type DeleteApiMyDomainDeleteByIdApiArg = {
  id: number;
};
export type PutApiMyDomainChangeContactApiResponse = unknown;
export type PutApiMyDomainChangeContactApiArg = {
  changeContactModel: ChangeContactModel;
};
export type PutApiMyDomainChangeNsApiResponse = unknown;
export type PutApiMyDomainChangeNsApiArg = {
  changeNsModel: ChangeNsModel;
};
export type PostApiMyDomainResendVerificationByIdApiResponse = unknown;
export type PostApiMyDomainResendVerificationByIdApiArg = {
  id: number;
};
export type GetApiMyFinancialApiResponse =
  /** status 200 Success */ FinancialDashboardFinancialResponse;
export type GetApiMyFinancialApiArg = void;
export type GetApiMyHomeIndexApiResponse = unknown;
export type GetApiMyHomeIndexApiArg = void;
export type GetApiMyCloudInvoiceListApiResponse =
  /** status 200 Success */ InvoiceListResponse[];
export type GetApiMyCloudInvoiceListApiArg = void;
export type GetApiMyCloudInvoiceGetByIdApiResponse =
  /** status 200 Success */ GetInvoiceResponse;
export type GetApiMyCloudInvoiceGetByIdApiArg = {
  id: number;
};
export type PostApiMyCloudInvoicePayApiResponse = unknown;
export type PostApiMyCloudInvoicePayApiArg = {
  payInvoiceModel: PayInvoiceModel;
};
export type GetApiMyCloudInvoiceUnpaidApiResponse =
  /** status 200 Success */ UnPaidInvoiceResponse[];
export type GetApiMyCloudInvoiceUnpaidApiArg = void;
export type GetApiMyCloudIssueListApiResponse =
  /** status 200 Success */ IssueListResponse[];
export type GetApiMyCloudIssueListApiArg = void;
export type GetApiMyCloudIssueShortListApiResponse =
  /** status 200 Success */ IssueShortListResponse[];
export type GetApiMyCloudIssueShortListApiArg = void;
export type PostApiMyCloudIssueCreateApiResponse = unknown;
export type PostApiMyCloudIssueCreateApiArg = {
  body: {
    Content: string;
    BusinessUnitId: number;
    IssueSubjectId: number;
    CustomerProductId?: number;
    ProductId?: number;
    Attachment?: Blob;
  };
};
export type GetApiMyCloudIssueItemListByIssueIdApiResponse =
  /** status 200 Success */ IssueItemListResponse;
export type GetApiMyCloudIssueItemListByIssueIdApiArg = {
  issueId: number;
};
export type PostApiMyCloudIssueItemCreateApiResponse = unknown;
export type PostApiMyCloudIssueItemCreateApiArg = {
  body: {
    IssueId: number;
    Content: string;
    Attachment?: Blob;
  };
};
export type GetApiMyCloudIssueItemDownloadByIdApiResponse = unknown;
export type GetApiMyCloudIssueItemDownloadByIdApiArg = {
  id: number;
};
export type GetApiMyCloudIssueSubjectListApiResponse =
  /** status 200 Success */ IssueSubjectListResponse[];
export type GetApiMyCloudIssueSubjectListApiArg = void;
export type PostApiMyCloudIssueSubjectSelectListApiResponse =
  /** status 200 Success */ IssueSubjectListResponse[];
export type PostApiMyCloudIssueSubjectSelectListApiArg = {
  issueSubjectSelectListModel: IssueSubjectSelectListModel;
};
export type GetApiMyPlatformDevopsListByIdApiResponse =
  /** status 200 Success */ KubeDevOpsListResponse[];
export type GetApiMyPlatformDevopsListByIdApiArg = {
  id: number;
};
export type GetApiMyPlatformDevopsGetByIdApiResponse =
  /** status 200 Success */ KubeDevOpsListResponse;
export type GetApiMyPlatformDevopsGetByIdApiArg = {
  id: number;
};
export type PostApiMyPlatformDevopsCreateApiResponse = unknown;
export type PostApiMyPlatformDevopsCreateApiArg = {
  createKubeDevOpsModel: CreateKubeDevOpsModel;
};
export type DeleteApiMyPlatformDevopsDeleteByIdApiResponse = unknown;
export type DeleteApiMyPlatformDevopsDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyPlatformNamespaceListApiResponse =
  /** status 200 Success */ KubeHostListResponse[];
export type GetApiMyPlatformNamespaceListApiArg = void;
export type GetApiMyPlatformNamespaceGetByIdApiResponse =
  /** status 200 Success */ GetKubeHostResponse;
export type GetApiMyPlatformNamespaceGetByIdApiArg = {
  id: number;
};
export type GetApiMyPlatformNamespaceGetLoginByIdApiResponse =
  /** status 200 Success */ GetKubeLoginResponse;
export type GetApiMyPlatformNamespaceGetLoginByIdApiArg = {
  id: number;
};
export type PostApiMyPlatformNamespaceCreateApiResponse = unknown;
export type PostApiMyPlatformNamespaceCreateApiArg = {
  createKubeHostModel: CreateKubeHostModel;
};
export type PutApiMyPlatformNamespaceEditApiResponse = unknown;
export type PutApiMyPlatformNamespaceEditApiArg = {
  editKubeHostModel: EditKubeHostModel;
};
export type DeleteApiMyPlatformNamespaceDeleteByIdApiResponse = unknown;
export type DeleteApiMyPlatformNamespaceDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyPlatformServiceListByIdApiResponse =
  /** status 200 Success */ KubeServiceListResponse[];
export type GetApiMyPlatformServiceListByIdApiArg = {
  id: number;
};
export type GetApiMyPlatformServiceGetByIdApiResponse =
  /** status 200 Success */ KubeServiceListResponse;
export type GetApiMyPlatformServiceGetByIdApiArg = {
  id: number;
};
export type PostApiMyPlatformServiceCreateApiResponse = unknown;
export type PostApiMyPlatformServiceCreateApiArg = {
  createKubeServiceModel: CreateKubeServiceModel;
};
export type DeleteApiMyPlatformServiceDeleteByIdApiResponse = unknown;
export type DeleteApiMyPlatformServiceDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyPlatformKubernetesListApiResponse =
  /** status 200 Success */ GetKubernetesHostResponse[];
export type GetApiMyPlatformKubernetesListApiArg = void;
export type GetApiMyPlatformKubernetesGetByIdApiResponse =
  /** status 200 Success */ GetKubernetesHostResponse;
export type GetApiMyPlatformKubernetesGetByIdApiArg = {
  id: number;
};
export type GetApiMyPlatformKubernetesImagesByDatacenterIdApiResponse =
  /** status 200 Success */ ImageListResponse[];
export type GetApiMyPlatformKubernetesImagesByDatacenterIdApiArg = {
  datacenterId: number;
};
export type GetApiMyPlatformKubernetesVersionsApiResponse = unknown;
export type GetApiMyPlatformKubernetesVersionsApiArg = void;
export type PostApiMyPlatformKubernetesCreateApiResponse = unknown;
export type PostApiMyPlatformKubernetesCreateApiArg = {
  createClusterModel: CreateClusterModel;
};
export type PutApiMyPlatformKubernetesRemoveNodeApiResponse = unknown;
export type PutApiMyPlatformKubernetesRemoveNodeApiArg = {
  removeClusterNodeModel: RemoveClusterNodeModel;
};
export type DeleteApiMyPlatformKubernetesDeleteByIdApiResponse = unknown;
export type DeleteApiMyPlatformKubernetesDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyPlatformUserListApiResponse =
  /** status 200 Success */ KubeUserListResponse[];
export type GetApiMyPlatformUserListApiArg = void;
export type GetApiMyPlatformUserShortListApiResponse =
  /** status 200 Success */ KubeShortListResponse[];
export type GetApiMyPlatformUserShortListApiArg = void;
export type PostApiMyPlatformUserCreateApiResponse = unknown;
export type PostApiMyPlatformUserCreateApiArg = {
  createKubeUserModel: CreateKubeUserModel;
};
export type DeleteApiMyPlatformUserDeleteByIdApiResponse = unknown;
export type DeleteApiMyPlatformUserDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyPlatformUserChangePasswordApiResponse = unknown;
export type PostApiMyPlatformUserChangePasswordApiArg = {
  changeKubeUserPasswordModel: ChangeKubeUserPasswordModel;
};
export type GetApiMyPlatformUserRoleListByKubeHostIdApiResponse =
  /** status 200 Success */ KubeUserRoleListResponse[];
export type GetApiMyPlatformUserRoleListByKubeHostIdApiArg = {
  kubeHostId: number;
};
export type PostApiMyPlatformUserRoleCreateApiResponse = unknown;
export type PostApiMyPlatformUserRoleCreateApiArg = {
  createKubeUserRoleModel: CreateKubeUserRoleModel;
};
export type DeleteApiMyPlatformUserRoleDeleteByIdApiResponse = unknown;
export type DeleteApiMyPlatformUserRoleDeleteByIdApiArg = {
  id: number;
};
export type GetApiMyPlatformVolumeListByIdApiResponse =
  /** status 200 Success */ KubeVolumeListResponse[];
export type GetApiMyPlatformVolumeListByIdApiArg = {
  id: number;
};
export type GetApiMyPlatformVolumeGetByIdApiResponse =
  /** status 200 Success */ KubeVolumeListResponse;
export type GetApiMyPlatformVolumeGetByIdApiArg = {
  id: number;
};
export type PostApiMyPlatformVolumeCreateApiResponse = unknown;
export type PostApiMyPlatformVolumeCreateApiArg = {
  createKubeVolumeModel: CreateKubeVolumeModel;
};
export type DeleteApiMyPlatformVolumeDeleteByIdApiResponse = unknown;
export type DeleteApiMyPlatformVolumeDeleteByIdApiArg = {
  id: number;
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
export type GetApiMyCloudNotificationListApiResponse =
  /** status 200 Success */ NotificationListResponse[];
export type GetApiMyCloudNotificationListApiArg = void;
export type GetApiMyCloudNotificationShortListApiResponse =
  /** status 200 Success */ NotificationListResponse[];
export type GetApiMyCloudNotificationShortListApiArg = void;
export type PutApiMyCloudNotificationSeenByIdApiResponse = unknown;
export type PutApiMyCloudNotificationSeenByIdApiArg = {
  id: number;
};
export type GetApiMyCloudPaymentListApiResponse =
  /** status 200 Success */ PaymentListResponse[];
export type GetApiMyCloudPaymentListApiArg = void;
export type GetApiMyCloudPaymentGetByIdApiResponse =
  /** status 200 Success */ GetPaymentResponse;
export type GetApiMyCloudPaymentGetByIdApiArg = {
  id: number;
};
export type PostApiMyCloudPaymentCreateApiResponse =
  /** status 200 Success */ CreatePaymentResponse;
export type PostApiMyCloudPaymentCreateApiArg = {
  createPaymentModel: CreatePaymentModel;
};
export type PostApiMyCloudPaymentPecCallBackApiResponse = unknown;
export type PostApiMyCloudPaymentPecCallBackApiArg = {
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
export type PostApiMyCloudPaymentSepCallBackApiResponse = unknown;
export type PostApiMyCloudPaymentSepCallBackApiArg = {
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
export type GetApiMyCloudProductListApiResponse =
  /** status 200 Success */ ProductListResponse[];
export type GetApiMyCloudProductListApiArg = void;
export type GetApiMyCloudProductBundleListByProductIdApiResponse =
  /** status 200 Success */ ProductBundleListResponse[];
export type GetApiMyCloudProductBundleListByProductIdApiArg = {
  productId: number;
};
export type GetApiMyCloudProductBundleVmListApiResponse =
  /** status 200 Success */ VmSpecListResponse[];
export type GetApiMyCloudProductBundleVmListApiArg = void;
export type GetApiMyCloudProductBundleStorageListApiResponse =
  /** status 200 Success */ StorageSpecResponse[];
export type GetApiMyCloudProductBundleStorageListApiArg = void;
export type GetApiMyCloudProductBundleWebHostListApiResponse =
  /** status 200 Success */ WebHostSpecResponse[];
export type GetApiMyCloudProductBundleWebHostListApiArg = void;
export type GetApiMyCloudProductItemListByProductIdApiResponse =
  /** status 200 Success */ ProductItemListResponse[];
export type GetApiMyCloudProductItemListByProductIdApiArg = {
  productId: number;
};
export type GetApiMyAccountProfileGetApiResponse =
  /** status 200 Success */ GetProfileResponse;
export type GetApiMyAccountProfileGetApiArg = void;
export type GetApiMyAccountProfileGetNotificationStatusApiResponse =
  /** status 200 Success */ GetNotificationStatusResponse;
export type GetApiMyAccountProfileGetNotificationStatusApiArg = void;
export type PutApiMyAccountProfileEditApiResponse = unknown;
export type PutApiMyAccountProfileEditApiArg = {
  editProfileModel: EditProfileModel;
};
export type PutApiMyAccountProfileEditEmailApiResponse = unknown;
export type PutApiMyAccountProfileEditEmailApiArg = {
  editEmailModel: EditEmailModel;
};
export type PostApiMyAccountProfileConfirmEmailApiResponse = unknown;
export type PostApiMyAccountProfileConfirmEmailApiArg = {
  confirmEmailModel: ConfirmEmailModel;
};
export type PutApiMyAccountProfileEditPhoneNumberApiResponse = unknown;
export type PutApiMyAccountProfileEditPhoneNumberApiArg = {
  editPhoneNumberModel: EditPhoneNumberModel;
};
export type PostApiMyAccountProfileConfirmPhoneNumberApiResponse = unknown;
export type PostApiMyAccountProfileConfirmPhoneNumberApiArg = {
  confirmPhoneNumberModel: ConfirmPhoneNumberModel;
};
export type PutApiMyAccountProfileEditEmailNotificationApiResponse = unknown;
export type PutApiMyAccountProfileEditEmailNotificationApiArg = {
  editEmailNotifyModel: EditEmailNotifyModel;
};
export type PutApiMyAccountProfileEditPhoneNotificationApiResponse = unknown;
export type PutApiMyAccountProfileEditPhoneNotificationApiArg = {
  editPhoneNotifyModel: EditPhoneNotifyModel;
};
export type PostApiMyAccountProfileChangePasswordApiResponse = unknown;
export type PostApiMyAccountProfileChangePasswordApiArg = {
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
export type GetApiMyAccountReferralGetApiResponse =
  /** status 200 Success */ GetReferralResponse;
export type GetApiMyAccountReferralGetApiArg = void;
export type PostApiMyAccountReferralJoinApiResponse =
  /** status 200 Success */ JoinReferralResponse;
export type PostApiMyAccountReferralJoinApiArg = {
  joinReferralModel: JoinReferralModel;
};
export type GetApiMyAccountRoleRoleAccessTypesApiResponse =
  /** status 200 Success */ GetAccessTypeResponse[];
export type GetApiMyAccountRoleRoleAccessTypesApiArg = void;
export type GetApiMyAccountRoleRolesApiResponse =
  /** status 200 Success */ GetAccessTypeResponse[];
export type GetApiMyAccountRoleRolesApiArg = void;
export type PostApiMyAccountRoleGetUserAccessEntitiesApiResponse =
  /** status 200 Success */ UserEntityAccessResponse[];
export type PostApiMyAccountRoleGetUserAccessEntitiesApiArg = {
  getUserAccessEntityModel: GetUserAccessEntityModel;
};
export type PostApiMyAccountRoleCreateUserAccessApiResponse =
  /** status 200 Success */ BaseResponse;
export type PostApiMyAccountRoleCreateUserAccessApiArg = {
  setUserAccessModel: SetUserAccessModel;
};
export type PutApiMyAccountRoleEditUserAccessApiResponse = unknown;
export type PutApiMyAccountRoleEditUserAccessApiArg = {
  setUserAccessModel: SetUserAccessModel;
};
export type DeleteApiMyAccountRoleRemoveCustomerUserApiResponse =
  /** status 200 Success */ BaseResponse;
export type DeleteApiMyAccountRoleRemoveCustomerUserApiArg = {
  removeCustomerUserModel: RemoveCustomerUserModel;
};
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
export type PostApiMyVmHostListApiResponse =
  /** status 200 Success */ VmListResponse[];
export type PostApiMyVmHostListApiArg = {
  vmListModel: VmListModel;
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
export type PostApiMyVmKmsGetApiResponse = /** status 200 Success */ string;
export type PostApiMyVmKmsGetApiArg = {
  getKmsModel: GetKmsModel;
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
export type PostApiMyAccountVoucherUseApiResponse =
  /** status 200 Success */ string;
export type PostApiMyAccountVoucherUseApiArg = {
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
export type GetApiMyCloudWalletGetBalanceApiResponse =
  /** status 200 Success */ number;
export type GetApiMyCloudWalletGetBalanceApiArg = void;
export type GetApiMyCloudWalletListApiResponse =
  /** status 200 Success */ WalletTransactionListResponse[];
export type GetApiMyCloudWalletListApiArg = void;
export type GetApiMyWebListApiResponse =
  /** status 200 Success */ WebHostListResponse[];
export type GetApiMyWebListApiArg = void;
export type GetApiMyWebGetByIdApiResponse =
  /** status 200 Success */ GetWebHostResponse;
export type GetApiMyWebGetByIdApiArg = {
  id: number;
};
export type GetApiMyWebGetLoginSessionByIdApiResponse =
  /** status 200 Success */ GetLoginSessionResponse;
export type GetApiMyWebGetLoginSessionByIdApiArg = {
  id: number;
};
export type PostApiMyWebCheckDomainApiResponse = unknown;
export type PostApiMyWebCheckDomainApiArg = {
  checkWebHostDomainModel: CheckWebHostDomainModel;
};
export type PostApiMyWebCreateApiResponse = unknown;
export type PostApiMyWebCreateApiArg = {
  createWebHostModel: CreateWebHostModel;
};
export type PutApiMyWebEditApiResponse = unknown;
export type PutApiMyWebEditApiArg = {
  editWebHostModel: EditWebHostModel;
};
export type DeleteApiMyWebDeleteByIdApiResponse = unknown;
export type DeleteApiMyWebDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyCloudContactUsCreateApiResponse = unknown;
export type PostApiMyCloudContactUsCreateApiArg = {
  createContactUsModel: CreateContactUsModel;
};
export type PostApiMyCloudNewsCreateApiResponse = unknown;
export type PostApiMyCloudNewsCreateApiArg = {
  createNewsLetterModel: CreateNewsLetterModel;
};
export type PostApiMyDomainWhoisGetApiResponse = unknown;
export type PostApiMyDomainWhoisGetApiArg = {
  getDomainWhoisModel: GetDomainWhoisModel;
};
export type LoginResponse = {
  accessToken?: string | null;
  userId?: string;
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
  datacenterId?: number;
  datacenterRackId?: number;
  datacenterRack?: string | null;
};
export type CreateColocationModel = {
  datacenterId: number;
  name: string;
  customerProductTypeId: number;
  equipmentIds: number[];
  inventoryNumber?: number;
  rackUnitSpace?: number;
  networkPort1G?: number;
  networkPort10G?: number;
  powerAmp?: number;
  ipv4Count?: number;
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
  customerProduct?: string | null;
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
export type IssueShortListDashboardResponse = {
  id?: number;
  issueSubject?: string | null;
  issueStatusId?: number;
  createDate?: string;
};
export type CustomerShortListResponse = {
  id?: number;
  productName?: string | null;
  serviceName?: string | null;
  createDate?: string;
};
export type ReportDashboardFinancialResponse = {
  walletBalance?: number;
  paidInvoicePrice?: number;
  unpaidInvoiceCount?: number;
  activeServiceCount?: number;
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
export type FinancialDashboardFinancialResponse = {
  walletDecimal?: number;
  unPaidInvoicePrice?: number;
  paidInvoicePrice?: number;
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
export type PayInvoiceModel = {
  id?: number;
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
export type ImageListResponse = {
  id?: number;
  name?: string | null;
  osId?: number;
  os?: string | null;
};
export type CreateClusterModel = {
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
export type RemoveClusterNodeModel = {
  id?: number;
  customerProductId?: number;
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
};
export type ProductBundleListResponse = {
  id?: number;
  name?: string | null;
  description?: string | null;
  price?: number;
};
export type VmSpecListResponse = {
  id?: number;
  name?: string | null;
  price?: number;
  cpu?: number;
  memory?: number;
  disk?: number;
  ipv4?: number;
};
export type StorageSpecResponse = {
  id?: number;
  name?: string | null;
  price?: number;
  disk?: number;
};
export type WebHostSpecResponse = {
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
export type AccessTupleModel = {
  accessId?: number;
  hasAccess?: boolean;
};
export type UserEntityAccessResponse = {
  id?: number;
  title?: string | null;
  description?: string | null;
  hasAccess?: boolean;
  accesses?: AccessTupleModel[] | null;
};
export type GetUserAccessEntityModel = {
  userId?: string | null;
};
export type BaseResponse = {
  status?: boolean;
  message?: string | null;
};
export type EntityAccessModel = {
  accessType?: number;
  entityId?: number;
  accessTuples?: AccessTupleModel[] | null;
};
export type SetUserAccessModel = {
  userEmail: string;
  isSuperUser: boolean;
  isFinancialManager: boolean;
  isAccountManager: boolean;
  entityAccesses?: EntityAccessModel[] | null;
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
export type VmListModel = {
  vmProjectId?: number;
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
export type GetKmsModel = {
  id?: number;
  typeId?: number;
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
  name?: string | null;
};
export type EditVmProject = {
  name?: string | null;
  id?: number;
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
  usePostApiMyAccountRegisterMutation,
  usePostApiMyAccountForgotMutation,
  usePostApiMyAccountForgotConfirmMutation,
  usePostApiMyAccountLogoutMutation,
  useGetApiMyCdnAnalyticGetByCdnIdAndPeriodIdQuery,
  useGetApiMyCdnApiGatewayListByCdnIdQuery,
  useGetApiMyCdnApiGatewayGetByIdQuery,
  usePostApiMyCdnApiGatewayCreateMutation,
  usePutApiMyCdnApiGatewayEditMutation,
  useDeleteApiMyCdnApiGatewayDeleteByIdMutation,
  useGetApiMyBareMetalListQuery,
  useGetApiMyBareMetalGetByIdQuery,
  usePostApiMyBareMetalCreateMutation,
  useDeleteApiMyBareMetalDeleteMutation,
  useGetApiMyCloudBusinessUnitListQuery,
  useGetApiMyCloudCalculateMonthListQuery,
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
  useGetApiMyColocationListQuery,
  usePostApiMyColocationCreateMutation,
  useDeleteApiMyColocationDeleteByIdMutation,
  useGetApiMyCloudCommissionListQuery,
  useGetApiMyCloudCustomerGetQuery,
  useGetApiMyCloudCustomerGetCustomerTypeQuery,
  usePutApiMyCloudCustomerEditMutation,
  usePutApiMyCloudCustomerEditCustomerTypeMutation,
  useGetApiMyCloudBillListQuery,
  useGetApiMyCloudBillBillShortListQuery,
  useGetApiMyCloudBillGetByIdQuery,
  useGetApiMyCloudBillDownloadByIdQuery,
  useGetApiMyCloudCustomerProductListByProductIdQuery,
  usePostApiMyCloudCustomerProductTransferMutation,
  usePostApiMyCloudCustomerUserChangeUserCustomerMutation,
  useGetApiMyCloudDashboardUsageByCategoryIdQuery,
  useGetApiMyCloudDashboardTicketsQuery,
  useGetApiMyCloudDashboardActiveServicesQuery,
  useGetApiMyCloudDashboardFinancialQuery,
  useGetApiMyDatacenterListQuery,
  useGetApiMyDatacenterIpListByProductIdAndIdQuery,
  useDeleteApiMyDatacenterIpDeleteByIdMutation,
  useGetApiMyCdnDnsRecordListByCdnIdQuery,
  useGetApiMyCdnDnsRecordGetByIdQuery,
  usePostApiMyCdnDnsRecordCreateMutation,
  usePutApiMyCdnDnsRecordEditMutation,
  useDeleteApiMyCdnDnsRecordDeleteByIdMutation,
  usePutApiMyCdnDnsRecordChangeProxyStatusByIdMutation,
  useGetApiMyDomainListQuery,
  useGetApiMyDomainGetByIdQuery,
  useGetApiMyDomainGetStatusByIdQuery,
  usePostApiMyDomainGetPriceMutation,
  usePostApiMyDomainRegisterMutation,
  useDeleteApiMyDomainDeleteByIdMutation,
  usePutApiMyDomainChangeContactMutation,
  usePutApiMyDomainChangeNsMutation,
  usePostApiMyDomainResendVerificationByIdMutation,
  useGetApiMyFinancialQuery,
  useGetApiMyHomeIndexQuery,
  useGetApiMyCloudInvoiceListQuery,
  useGetApiMyCloudInvoiceGetByIdQuery,
  usePostApiMyCloudInvoicePayMutation,
  useGetApiMyCloudInvoiceUnpaidQuery,
  useGetApiMyCloudIssueListQuery,
  useGetApiMyCloudIssueShortListQuery,
  usePostApiMyCloudIssueCreateMutation,
  useGetApiMyCloudIssueItemListByIssueIdQuery,
  usePostApiMyCloudIssueItemCreateMutation,
  useGetApiMyCloudIssueItemDownloadByIdQuery,
  useGetApiMyCloudIssueSubjectListQuery,
  usePostApiMyCloudIssueSubjectSelectListMutation,
  useGetApiMyPlatformDevopsListByIdQuery,
  useGetApiMyPlatformDevopsGetByIdQuery,
  usePostApiMyPlatformDevopsCreateMutation,
  useDeleteApiMyPlatformDevopsDeleteByIdMutation,
  useGetApiMyPlatformNamespaceListQuery,
  useGetApiMyPlatformNamespaceGetByIdQuery,
  useGetApiMyPlatformNamespaceGetLoginByIdQuery,
  usePostApiMyPlatformNamespaceCreateMutation,
  usePutApiMyPlatformNamespaceEditMutation,
  useDeleteApiMyPlatformNamespaceDeleteByIdMutation,
  useGetApiMyPlatformServiceListByIdQuery,
  useGetApiMyPlatformServiceGetByIdQuery,
  usePostApiMyPlatformServiceCreateMutation,
  useDeleteApiMyPlatformServiceDeleteByIdMutation,
  useGetApiMyPlatformKubernetesListQuery,
  useGetApiMyPlatformKubernetesGetByIdQuery,
  useGetApiMyPlatformKubernetesImagesByDatacenterIdQuery,
  useGetApiMyPlatformKubernetesVersionsQuery,
  usePostApiMyPlatformKubernetesCreateMutation,
  usePutApiMyPlatformKubernetesRemoveNodeMutation,
  useDeleteApiMyPlatformKubernetesDeleteByIdMutation,
  useGetApiMyPlatformUserListQuery,
  useGetApiMyPlatformUserShortListQuery,
  usePostApiMyPlatformUserCreateMutation,
  useDeleteApiMyPlatformUserDeleteByIdMutation,
  usePostApiMyPlatformUserChangePasswordMutation,
  useGetApiMyPlatformUserRoleListByKubeHostIdQuery,
  usePostApiMyPlatformUserRoleCreateMutation,
  useDeleteApiMyPlatformUserRoleDeleteByIdMutation,
  useGetApiMyPlatformVolumeListByIdQuery,
  useGetApiMyPlatformVolumeGetByIdQuery,
  usePostApiMyPlatformVolumeCreateMutation,
  useDeleteApiMyPlatformVolumeDeleteByIdMutation,
  useGetApiMyCdnLoadBalanceListByCdnIdQuery,
  useGetApiMyCdnLoadBalanceGetByIdQuery,
  usePostApiMyCdnLoadBalanceCreateMutation,
  usePutApiMyCdnLoadBalanceEditMutation,
  useDeleteApiMyCdnLoadBalanceDeleteByIdMutation,
  useGetApiMyCloudNotificationListQuery,
  useGetApiMyCloudNotificationShortListQuery,
  usePutApiMyCloudNotificationSeenByIdMutation,
  useGetApiMyCloudPaymentListQuery,
  useGetApiMyCloudPaymentGetByIdQuery,
  usePostApiMyCloudPaymentCreateMutation,
  usePostApiMyCloudPaymentPecCallBackMutation,
  usePostApiMyCloudPaymentSepCallBackMutation,
  useGetApiMyCloudProductListQuery,
  useGetApiMyCloudProductBundleListByProductIdQuery,
  useGetApiMyCloudProductBundleVmListQuery,
  useGetApiMyCloudProductBundleStorageListQuery,
  useGetApiMyCloudProductBundleWebHostListQuery,
  useGetApiMyCloudProductItemListByProductIdQuery,
  useGetApiMyAccountProfileGetQuery,
  useGetApiMyAccountProfileGetNotificationStatusQuery,
  usePutApiMyAccountProfileEditMutation,
  usePutApiMyAccountProfileEditEmailMutation,
  usePostApiMyAccountProfileConfirmEmailMutation,
  usePutApiMyAccountProfileEditPhoneNumberMutation,
  usePostApiMyAccountProfileConfirmPhoneNumberMutation,
  usePutApiMyAccountProfileEditEmailNotificationMutation,
  usePutApiMyAccountProfileEditPhoneNotificationMutation,
  usePostApiMyAccountProfileChangePasswordMutation,
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
  useGetApiMyAccountReferralGetQuery,
  usePostApiMyAccountReferralJoinMutation,
  useGetApiMyAccountRoleRoleAccessTypesQuery,
  useGetApiMyAccountRoleRolesQuery,
  usePostApiMyAccountRoleGetUserAccessEntitiesMutation,
  usePostApiMyAccountRoleCreateUserAccessMutation,
  usePutApiMyAccountRoleEditUserAccessMutation,
  useDeleteApiMyAccountRoleRemoveCustomerUserMutation,
  useGetApiMyStorageHostListQuery,
  useGetApiMyStorageHostGetByIdQuery,
  usePostApiMyStorageHostCreateMutation,
  usePutApiMyStorageHostEditMutation,
  useDeleteApiMyStorageHostDeleteByIdMutation,
  useGetApiMyStorageUserListByStorageHostIdQuery,
  usePostApiMyStorageUserCreateMutation,
  useDeleteApiMyStorageUserDeleteByIdMutation,
  usePostApiMyVmHostListMutation,
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
  usePostApiMyVmKmsGetMutation,
  useGetApiMyVmImageListByDatacenterIdQuery,
  useGetApiMyVmIsoListByDatacenterIdQuery,
  usePutApiMyVmIsoMountMutation,
  usePutApiMyVmIsoUnmountMutation,
  useGetApiMyVmProjectListQuery,
  usePostApiMyVmProjectCreateMutation,
  usePutApiMyVmProjectEditMutation,
  useDeleteApiMyVmProjectDeleteByIdMutation,
  usePostApiMyAccountVoucherUseMutation,
  useGetApiMyVpcHostListQuery,
  usePostApiMyVpcHostCreateMutation,
  useGetApiMyVpcNetworkListByVpcHostIdQuery,
  usePostApiMyVpcNetworkCreateMutation,
  useGetApiMyCloudWalletGetBalanceQuery,
  useGetApiMyCloudWalletListQuery,
  useGetApiMyWebListQuery,
  useGetApiMyWebGetByIdQuery,
  useGetApiMyWebGetLoginSessionByIdQuery,
  usePostApiMyWebCheckDomainMutation,
  usePostApiMyWebCreateMutation,
  usePutApiMyWebEditMutation,
  useDeleteApiMyWebDeleteByIdMutation,
  usePostApiMyCloudContactUsCreateMutation,
  usePostApiMyCloudNewsCreateMutation,
  usePostApiMyDomainWhoisGetMutation,
} = api;
