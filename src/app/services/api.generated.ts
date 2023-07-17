import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "src/app/services/baseQuery";
export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: (build) => ({
    postPortalAccountLogin: build.mutation<
      PostPortalAccountLoginApiResponse,
      PostPortalAccountLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/account/login`,
        method: "POST",
        body: queryArg.loginModel,
      }),
    }),
    postPortalAccountRegister: build.mutation<
      PostPortalAccountRegisterApiResponse,
      PostPortalAccountRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/account/register`,
        method: "POST",
        body: queryArg.registerModel,
      }),
    }),
    postPortalAccountForgot: build.mutation<
      PostPortalAccountForgotApiResponse,
      PostPortalAccountForgotApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/account/forgot`,
        method: "POST",
        body: queryArg.forgotModel,
      }),
    }),
    postPortalAccountForgotConfirm: build.mutation<
      PostPortalAccountForgotConfirmApiResponse,
      PostPortalAccountForgotConfirmApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/account/forgot-confirm`,
        method: "POST",
        body: queryArg.forgotConfirmModel,
      }),
    }),
    postPortalAccountLogout: build.mutation<
      PostPortalAccountLogoutApiResponse,
      PostPortalAccountLogoutApiArg
    >({
      query: () => ({ url: `/portal/account/logout`, method: "POST" }),
    }),
    getPortalCdnAnalyticGetByZoneNameAndPeriodId: build.query<
      GetPortalCdnAnalyticGetByZoneNameAndPeriodIdApiResponse,
      GetPortalCdnAnalyticGetByZoneNameAndPeriodIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/analytic/get/${queryArg.zoneName}/${queryArg.periodId}`,
      }),
    }),
    getPortalCdnApiGatewayListByZoneName: build.query<
      GetPortalCdnApiGatewayListByZoneNameApiResponse,
      GetPortalCdnApiGatewayListByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/api-gateway/list/${queryArg.zoneName}`,
      }),
    }),
    getPortalCdnApiGatewayGetById: build.query<
      GetPortalCdnApiGatewayGetByIdApiResponse,
      GetPortalCdnApiGatewayGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/api-gateway/get/${queryArg.id}`,
      }),
    }),
    postPortalCdnApiGatewayCreate: build.mutation<
      PostPortalCdnApiGatewayCreateApiResponse,
      PostPortalCdnApiGatewayCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/api-gateway/create`,
        method: "POST",
        body: queryArg.createApiGatewayModel,
      }),
    }),
    putPortalCdnApiGatewayEdit: build.mutation<
      PutPortalCdnApiGatewayEditApiResponse,
      PutPortalCdnApiGatewayEditApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/api-gateway/edit`,
        method: "PUT",
        body: queryArg.editApiGatewayModel,
      }),
    }),
    deletePortalCdnApiGatewayDeleteById: build.mutation<
      DeletePortalCdnApiGatewayDeleteByIdApiResponse,
      DeletePortalCdnApiGatewayDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/api-gateway/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getPortalPanelBillList: build.query<
      GetPortalPanelBillListApiResponse,
      GetPortalPanelBillListApiArg
    >({
      query: () => ({ url: `/portal/panel/bill/list` }),
    }),
    getPortalPanelBillGetById: build.query<
      GetPortalPanelBillGetByIdApiResponse,
      GetPortalPanelBillGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/portal/panel/bill/get/${queryArg.id}` }),
    }),
    getPortalPanelBillDownloadById: build.query<
      GetPortalPanelBillDownloadByIdApiResponse,
      GetPortalPanelBillDownloadByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/bill/download/${queryArg.id}`,
      }),
    }),
    getPortalPanelBusinessUnitList: build.query<
      GetPortalPanelBusinessUnitListApiResponse,
      GetPortalPanelBusinessUnitListApiArg
    >({
      query: () => ({ url: `/portal/panel/business-unit/list` }),
    }),
    getPortalPanelCalculateMonthList: build.query<
      GetPortalPanelCalculateMonthListApiResponse,
      GetPortalPanelCalculateMonthListApiArg
    >({
      query: () => ({ url: `/portal/panel/calculate-month/list` }),
    }),
    getPortalCdnCdnList: build.query<
      GetPortalCdnCdnListApiResponse,
      GetPortalCdnCdnListApiArg
    >({
      query: () => ({ url: `/portal/cdn/cdn/list` }),
    }),
    getPortalCdnCdnGetByZoneName: build.query<
      GetPortalCdnCdnGetByZoneNameApiResponse,
      GetPortalCdnCdnGetByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/cdn/get/${queryArg.zoneName}`,
      }),
    }),
    getPortalCdnCdnGetNsStatusByZoneName: build.query<
      GetPortalCdnCdnGetNsStatusByZoneNameApiResponse,
      GetPortalCdnCdnGetNsStatusByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/cdn/get-ns-status/${queryArg.zoneName}`,
      }),
    }),
    getPortalCdnCdnOverviewByZoneName: build.query<
      GetPortalCdnCdnOverviewByZoneNameApiResponse,
      GetPortalCdnCdnOverviewByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/cdn/overview/${queryArg.zoneName}`,
      }),
    }),
    postPortalCdnCdnCheckZone: build.mutation<
      PostPortalCdnCdnCheckZoneApiResponse,
      PostPortalCdnCdnCheckZoneApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/cdn/check-zone`,
        method: "POST",
        body: queryArg.checkCdnModel,
      }),
    }),
    postPortalCdnCdnCreate: build.mutation<
      PostPortalCdnCdnCreateApiResponse,
      PostPortalCdnCdnCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/cdn/create`,
        method: "POST",
        body: queryArg.createCdnModel,
      }),
    }),
    deletePortalCdnCdnDeleteById: build.mutation<
      DeletePortalCdnCdnDeleteByIdApiResponse,
      DeletePortalCdnCdnDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/cdn/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putPortalCdnCdnChangeCdnType: build.mutation<
      PutPortalCdnCdnChangeCdnTypeApiResponse,
      PutPortalCdnCdnChangeCdnTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/cdn/change-Cdn-type`,
        method: "PUT",
        body: queryArg.changeCdnTypeModel,
      }),
    }),
    putPortalCdnCdnChangeClientCertType: build.mutation<
      PutPortalCdnCdnChangeClientCertTypeApiResponse,
      PutPortalCdnCdnChangeClientCertTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/cdn/change-client-cert-type`,
        method: "PUT",
        body: queryArg.changeClientCertTypeModel,
      }),
    }),
    putPortalCdnCdnChangeEdgeCertType: build.mutation<
      PutPortalCdnCdnChangeEdgeCertTypeApiResponse,
      PutPortalCdnCdnChangeEdgeCertTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/cdn/change-edge-cert-type`,
        method: "PUT",
        body: queryArg.changeEdgeCertTypeModel,
      }),
    }),
    putPortalCdnCdnChangeHsts: build.mutation<
      PutPortalCdnCdnChangeHstsApiResponse,
      PutPortalCdnCdnChangeHstsApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/cdn/change-hsts`,
        method: "PUT",
        body: queryArg.changeHstsModel,
      }),
    }),
    putPortalCdnCdnChangeHttpsRedirect: build.mutation<
      PutPortalCdnCdnChangeHttpsRedirectApiResponse,
      PutPortalCdnCdnChangeHttpsRedirectApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/cdn/change-https-redirect`,
        method: "PUT",
        body: queryArg.changeHttpsRedirectModel,
      }),
    }),
    putPortalCdnCdnChangeNonWwwRedirect: build.mutation<
      PutPortalCdnCdnChangeNonWwwRedirectApiResponse,
      PutPortalCdnCdnChangeNonWwwRedirectApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/cdn/change-non-www-redirect`,
        method: "PUT",
        body: queryArg.changeNonWwwRedirectModel,
      }),
    }),
    getPortalCdnClientCertGetByZoneName: build.query<
      GetPortalCdnClientCertGetByZoneNameApiResponse,
      GetPortalCdnClientCertGetByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/client-cert/get/${queryArg.zoneName}`,
      }),
    }),
    getPortalCdnClientCertGetUserCertByZoneName: build.query<
      GetPortalCdnClientCertGetUserCertByZoneNameApiResponse,
      GetPortalCdnClientCertGetUserCertByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/client-cert/get-user-cert/${queryArg.zoneName}`,
      }),
    }),
    postPortalCdnClientCertCreateUserCert: build.mutation<
      PostPortalCdnClientCertCreateUserCertApiResponse,
      PostPortalCdnClientCertCreateUserCertApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/client-cert/create-user-cert`,
        method: "POST",
        body: queryArg.createCdnClientUserCertModel,
      }),
    }),
    getPortalCdnEdgeCertGetByZoneName: build.query<
      GetPortalCdnEdgeCertGetByZoneNameApiResponse,
      GetPortalCdnEdgeCertGetByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/edge-cert/get/${queryArg.zoneName}`,
      }),
    }),
    getPortalCdnEdgeCertGetUserCertByZoneName: build.query<
      GetPortalCdnEdgeCertGetUserCertByZoneNameApiResponse,
      GetPortalCdnEdgeCertGetUserCertByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/edge-cert/get-user-cert/${queryArg.zoneName}`,
      }),
    }),
    postPortalCdnEdgeCertCreate: build.mutation<
      PostPortalCdnEdgeCertCreateApiResponse,
      PostPortalCdnEdgeCertCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/edge-cert/create`,
        method: "POST",
        body: queryArg.createCdnEdgeCertModel,
      }),
    }),
    postPortalCdnEdgeCertCreateUserCert: build.mutation<
      PostPortalCdnEdgeCertCreateUserCertApiResponse,
      PostPortalCdnEdgeCertCreateUserCertApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/edge-cert/create-user-cert`,
        method: "POST",
        body: queryArg.createCdnEdgeUserCertModel,
      }),
    }),
    getPortalPanelCommissionList: build.query<
      GetPortalPanelCommissionListApiResponse,
      GetPortalPanelCommissionListApiArg
    >({
      query: () => ({ url: `/portal/panel/commission/list` }),
    }),
    getPortalPanelCustomerGet: build.query<
      GetPortalPanelCustomerGetApiResponse,
      GetPortalPanelCustomerGetApiArg
    >({
      query: () => ({ url: `/portal/panel/customer/get` }),
    }),
    putPortalPanelCustomerEdit: build.mutation<
      PutPortalPanelCustomerEditApiResponse,
      PutPortalPanelCustomerEditApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/customer/edit`,
        method: "PUT",
        body: queryArg.editCustomerModel,
      }),
    }),
    putPortalPanelCustomerEditCustomerType: build.mutation<
      PutPortalPanelCustomerEditCustomerTypeApiResponse,
      PutPortalPanelCustomerEditCustomerTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/customer/edit-customer-type`,
        method: "PUT",
        body: queryArg.editCustomerTypeModel,
      }),
    }),
    getPortalPanelDashboardGetUserAnalyticsByCategoryId: build.query<
      GetPortalPanelDashboardGetUserAnalyticsByCategoryIdApiResponse,
      GetPortalPanelDashboardGetUserAnalyticsByCategoryIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/dashboard/get-user-analytics/${queryArg.categoryId}`,
      }),
    }),
    getPortalPanelDashboardBillShortList: build.query<
      GetPortalPanelDashboardBillShortListApiResponse,
      GetPortalPanelDashboardBillShortListApiArg
    >({
      query: () => ({ url: `/portal/panel/dashboard/bill-short-list` }),
    }),
    getPortalPanelDashboardSupportShortList: build.query<
      GetPortalPanelDashboardSupportShortListApiResponse,
      GetPortalPanelDashboardSupportShortListApiArg
    >({
      query: () => ({ url: `/portal/panel/dashboard/support-short-list` }),
    }),
    getPortalVmDatacenterList: build.query<
      GetPortalVmDatacenterListApiResponse,
      GetPortalVmDatacenterListApiArg
    >({
      query: () => ({ url: `/portal/vm/datacenter/list` }),
    }),
    getPortalCdnDnsRecordListByZoneName: build.query<
      GetPortalCdnDnsRecordListByZoneNameApiResponse,
      GetPortalCdnDnsRecordListByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/dns-record/list/${queryArg.zoneName}`,
      }),
    }),
    getPortalCdnDnsRecordGetById: build.query<
      GetPortalCdnDnsRecordGetByIdApiResponse,
      GetPortalCdnDnsRecordGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/dns-record/get/${queryArg.id}`,
      }),
    }),
    postPortalCdnDnsRecordCreate: build.mutation<
      PostPortalCdnDnsRecordCreateApiResponse,
      PostPortalCdnDnsRecordCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/dns-record/create`,
        method: "POST",
        body: queryArg.createDnsRecordModel,
      }),
    }),
    putPortalCdnDnsRecordEdit: build.mutation<
      PutPortalCdnDnsRecordEditApiResponse,
      PutPortalCdnDnsRecordEditApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/dns-record/edit`,
        method: "PUT",
        body: queryArg.editDnsRecordModel,
      }),
    }),
    deletePortalCdnDnsRecordDeleteById: build.mutation<
      DeletePortalCdnDnsRecordDeleteByIdApiResponse,
      DeletePortalCdnDnsRecordDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/dns-record/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putPortalCdnDnsRecordChangeProxyStatusById: build.mutation<
      PutPortalCdnDnsRecordChangeProxyStatusByIdApiResponse,
      PutPortalCdnDnsRecordChangeProxyStatusByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/dns-record/change-proxy-status/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getPortalDomainList: build.query<
      GetPortalDomainListApiResponse,
      GetPortalDomainListApiArg
    >({
      query: () => ({ url: `/portal/domain/list` }),
    }),
    getPortalDomainGetById: build.query<
      GetPortalDomainGetByIdApiResponse,
      GetPortalDomainGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/portal/domain/get/${queryArg.id}` }),
    }),
    getPortalDomainGetStatusById: build.query<
      GetPortalDomainGetStatusByIdApiResponse,
      GetPortalDomainGetStatusByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/domain/get-status/${queryArg.id}`,
      }),
    }),
    postPortalDomainGetPrice: build.mutation<
      PostPortalDomainGetPriceApiResponse,
      PostPortalDomainGetPriceApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/domain/get-price`,
        method: "POST",
        body: queryArg.getPriceModel,
      }),
    }),
    postPortalDomainRegister: build.mutation<
      PostPortalDomainRegisterApiResponse,
      PostPortalDomainRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/domain/register`,
        method: "POST",
        body: queryArg.registerDomainModel,
      }),
    }),
    deletePortalDomainDeleteById: build.mutation<
      DeletePortalDomainDeleteByIdApiResponse,
      DeletePortalDomainDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/domain/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putPortalDomainChangeContact: build.mutation<
      PutPortalDomainChangeContactApiResponse,
      PutPortalDomainChangeContactApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/domain/change-contact`,
        method: "PUT",
        body: queryArg.changeContactModel,
      }),
    }),
    putPortalDomainChangeNs: build.mutation<
      PutPortalDomainChangeNsApiResponse,
      PutPortalDomainChangeNsApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/domain/change-ns`,
        method: "PUT",
        body: queryArg.changeNsModel,
      }),
    }),
    postPortalDomainResendVerificationById: build.mutation<
      PostPortalDomainResendVerificationByIdApiResponse,
      PostPortalDomainResendVerificationByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/domain/resend-verification/${queryArg.id}`,
        method: "POST",
      }),
    }),
    getPortalIndex: build.query<
      GetPortalIndexApiResponse,
      GetPortalIndexApiArg
    >({
      query: () => ({ url: `/portal/index` }),
    }),
    getPortalHandshake: build.query<
      GetPortalHandshakeApiResponse,
      GetPortalHandshakeApiArg
    >({
      query: () => ({ url: `/portal/handshake` }),
    }),
    getPortalPanelHostProductListByProductCategoryId: build.query<
      GetPortalPanelHostProductListByProductCategoryIdApiResponse,
      GetPortalPanelHostProductListByProductCategoryIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/host-product/list/${queryArg.productCategoryId}`,
      }),
    }),
    getPortalPanelInvoiceList: build.query<
      GetPortalPanelInvoiceListApiResponse,
      GetPortalPanelInvoiceListApiArg
    >({
      query: () => ({ url: `/portal/panel/invoice/list` }),
    }),
    getPortalPanelInvoiceGetById: build.query<
      GetPortalPanelInvoiceGetByIdApiResponse,
      GetPortalPanelInvoiceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/invoice/get/${queryArg.id}`,
      }),
    }),
    getPortalKubeDevopsListById: build.query<
      GetPortalKubeDevopsListByIdApiResponse,
      GetPortalKubeDevopsListByIdApiArg
    >({
      query: (queryArg) => ({ url: `/portal/kube/devops/list/${queryArg.id}` }),
    }),
    getPortalKubeDevopsGetById: build.query<
      GetPortalKubeDevopsGetByIdApiResponse,
      GetPortalKubeDevopsGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/portal/kube/devops/get/${queryArg.id}` }),
    }),
    postPortalKubeDevopsCreate: build.mutation<
      PostPortalKubeDevopsCreateApiResponse,
      PostPortalKubeDevopsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/devops/create`,
        method: "POST",
        body: queryArg.createKubeDevOpsModel,
      }),
    }),
    deletePortalKubeDevopsDeleteById: build.mutation<
      DeletePortalKubeDevopsDeleteByIdApiResponse,
      DeletePortalKubeDevopsDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/devops/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getPortalKubeServiceListById: build.query<
      GetPortalKubeServiceListByIdApiResponse,
      GetPortalKubeServiceListByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/service/list/${queryArg.id}`,
      }),
    }),
    getPortalKubeServiceGetById: build.query<
      GetPortalKubeServiceGetByIdApiResponse,
      GetPortalKubeServiceGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/portal/kube/service/get/${queryArg.id}` }),
    }),
    postPortalKubeServiceCreate: build.mutation<
      PostPortalKubeServiceCreateApiResponse,
      PostPortalKubeServiceCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/service/create`,
        method: "POST",
        body: queryArg.createKubeServiceModel,
      }),
    }),
    deletePortalKubeServiceDeleteById: build.mutation<
      DeletePortalKubeServiceDeleteByIdApiResponse,
      DeletePortalKubeServiceDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/service/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getPortalKubeNamespaceList: build.query<
      GetPortalKubeNamespaceListApiResponse,
      GetPortalKubeNamespaceListApiArg
    >({
      query: () => ({ url: `/portal/kube/namespace/list` }),
    }),
    getPortalKubeNamespaceGetById: build.query<
      GetPortalKubeNamespaceGetByIdApiResponse,
      GetPortalKubeNamespaceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/namespace/get/${queryArg.id}`,
      }),
    }),
    getPortalKubeNamespaceGetLoginSessionById: build.query<
      GetPortalKubeNamespaceGetLoginSessionByIdApiResponse,
      GetPortalKubeNamespaceGetLoginSessionByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/namespace/get-login-session/${queryArg.id}`,
      }),
    }),
    postPortalKubeNamespaceCreate: build.mutation<
      PostPortalKubeNamespaceCreateApiResponse,
      PostPortalKubeNamespaceCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/namespace/create`,
        method: "POST",
        body: queryArg.createKubeNamespaceModel,
      }),
    }),
    putPortalKubeNamespaceChangeService: build.mutation<
      PutPortalKubeNamespaceChangeServiceApiResponse,
      PutPortalKubeNamespaceChangeServiceApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/namespace/change-service`,
        method: "PUT",
        body: queryArg.editKubeNamespaceModel,
      }),
    }),
    deletePortalKubeNamespaceDeleteById: build.mutation<
      DeletePortalKubeNamespaceDeleteByIdApiResponse,
      DeletePortalKubeNamespaceDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/namespace/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getPortalKubeUserListByKubeHostId: build.query<
      GetPortalKubeUserListByKubeHostIdApiResponse,
      GetPortalKubeUserListByKubeHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/user/list/${queryArg.kubeHostId}`,
      }),
    }),
    postPortalKubeUserCreate: build.mutation<
      PostPortalKubeUserCreateApiResponse,
      PostPortalKubeUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/user/create`,
        method: "POST",
        body: queryArg.createKubeUserModel,
      }),
    }),
    deletePortalKubeUserDeleteById: build.mutation<
      DeletePortalKubeUserDeleteByIdApiResponse,
      DeletePortalKubeUserDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/user/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postPortalKubeUserChangePassword: build.mutation<
      PostPortalKubeUserChangePasswordApiResponse,
      PostPortalKubeUserChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/user/change-password`,
        method: "POST",
        body: queryArg.changeKubeUserPasswordModel,
      }),
    }),
    getPortalKubeUserRoleListByKubeHostId: build.query<
      GetPortalKubeUserRoleListByKubeHostIdApiResponse,
      GetPortalKubeUserRoleListByKubeHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/user-role/list/${queryArg.kubeHostId}`,
      }),
    }),
    postPortalKubeUserRoleCreate: build.mutation<
      PostPortalKubeUserRoleCreateApiResponse,
      PostPortalKubeUserRoleCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/user-role/create`,
        method: "POST",
        body: queryArg.createKubeUserRoleModel,
      }),
    }),
    deletePortalKubeUserRoleDeleteById: build.mutation<
      DeletePortalKubeUserRoleDeleteByIdApiResponse,
      DeletePortalKubeUserRoleDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/user-role/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getPortalKubeVolumeListById: build.query<
      GetPortalKubeVolumeListByIdApiResponse,
      GetPortalKubeVolumeListByIdApiArg
    >({
      query: (queryArg) => ({ url: `/portal/kube/volume/list/${queryArg.id}` }),
    }),
    getPortalKubeVolumeGetById: build.query<
      GetPortalKubeVolumeGetByIdApiResponse,
      GetPortalKubeVolumeGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/portal/kube/volume/get/${queryArg.id}` }),
    }),
    postPortalKubeVolumeCreate: build.mutation<
      PostPortalKubeVolumeCreateApiResponse,
      PostPortalKubeVolumeCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/volume/create`,
        method: "POST",
        body: queryArg.createKubeVolumeModel,
      }),
    }),
    deletePortalKubeVolumeDeleteById: build.mutation<
      DeletePortalKubeVolumeDeleteByIdApiResponse,
      DeletePortalKubeVolumeDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/volume/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getPortalKubeWorkspaceList: build.query<
      GetPortalKubeWorkspaceListApiResponse,
      GetPortalKubeWorkspaceListApiArg
    >({
      query: () => ({ url: `/portal/kube/workspace/list` }),
    }),
    getPortalKubeWorkspaceGetById: build.query<
      GetPortalKubeWorkspaceGetByIdApiResponse,
      GetPortalKubeWorkspaceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/workspace/get/${queryArg.id}`,
      }),
    }),
    getPortalKubeWorkspaceGetLoginSessionById: build.query<
      GetPortalKubeWorkspaceGetLoginSessionByIdApiResponse,
      GetPortalKubeWorkspaceGetLoginSessionByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/workspace/get-login-session/${queryArg.id}`,
      }),
    }),
    postPortalKubeWorkspaceCreate: build.mutation<
      PostPortalKubeWorkspaceCreateApiResponse,
      PostPortalKubeWorkspaceCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/workspace/create`,
        method: "POST",
        body: queryArg.createKubeWorkspaceModel,
      }),
    }),
    putPortalKubeWorkspaceChangeService: build.mutation<
      PutPortalKubeWorkspaceChangeServiceApiResponse,
      PutPortalKubeWorkspaceChangeServiceApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/workspace/change-service`,
        method: "PUT",
        body: queryArg.editKubeWorkspaceModel,
      }),
    }),
    deletePortalKubeWorkspaceDeleteById: build.mutation<
      DeletePortalKubeWorkspaceDeleteByIdApiResponse,
      DeletePortalKubeWorkspaceDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/kube/workspace/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getPortalCdnLoadBalanceListByZoneName: build.query<
      GetPortalCdnLoadBalanceListByZoneNameApiResponse,
      GetPortalCdnLoadBalanceListByZoneNameApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/load-balance/list/${queryArg.zoneName}`,
      }),
    }),
    getPortalCdnLoadBalanceGetById: build.query<
      GetPortalCdnLoadBalanceGetByIdApiResponse,
      GetPortalCdnLoadBalanceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/load-balance/get/${queryArg.id}`,
      }),
    }),
    postPortalCdnLoadBalanceCreate: build.mutation<
      PostPortalCdnLoadBalanceCreateApiResponse,
      PostPortalCdnLoadBalanceCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/load-balance/create`,
        method: "POST",
        body: queryArg.createLoadBalanceModel,
      }),
    }),
    putPortalCdnLoadBalanceEdit: build.mutation<
      PutPortalCdnLoadBalanceEditApiResponse,
      PutPortalCdnLoadBalanceEditApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/load-balance/edit`,
        method: "PUT",
        body: queryArg.editLoadBalanceModel,
      }),
    }),
    deletePortalCdnLoadBalanceDeleteById: build.mutation<
      DeletePortalCdnLoadBalanceDeleteByIdApiResponse,
      DeletePortalCdnLoadBalanceDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/cdn/load-balance/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getPortalPanelLogSmsReceiveByFromAndTextTo: build.query<
      GetPortalPanelLogSmsReceiveByFromAndTextToApiResponse,
      GetPortalPanelLogSmsReceiveByFromAndTextToApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/log-sms/receive/${queryArg["from"]}/${queryArg.text}/${queryArg.to}`,
      }),
    }),
    getPortalPanelNotificationList: build.query<
      GetPortalPanelNotificationListApiResponse,
      GetPortalPanelNotificationListApiArg
    >({
      query: () => ({ url: `/portal/panel/notification/list` }),
    }),
    getPortalPanelNotificationShortList: build.query<
      GetPortalPanelNotificationShortListApiResponse,
      GetPortalPanelNotificationShortListApiArg
    >({
      query: () => ({ url: `/portal/panel/notification/short-list` }),
    }),
    getPortalPanelOrderList: build.query<
      GetPortalPanelOrderListApiResponse,
      GetPortalPanelOrderListApiArg
    >({
      query: () => ({ url: `/portal/panel/order/list` }),
    }),
    getPortalPanelOrderGetById: build.query<
      GetPortalPanelOrderGetByIdApiResponse,
      GetPortalPanelOrderGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/portal/panel/order/get/${queryArg.id}` }),
    }),
    putPortalPanelOrderPaymentType: build.mutation<
      PutPortalPanelOrderPaymentTypeApiResponse,
      PutPortalPanelOrderPaymentTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/order/payment-type`,
        method: "PUT",
        body: queryArg.orderPaymentTypeModel,
      }),
    }),
    putPortalPanelOrderDuration: build.mutation<
      PutPortalPanelOrderDurationApiResponse,
      PutPortalPanelOrderDurationApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/order/duration`,
        method: "PUT",
        body: queryArg.orderDurationModel,
      }),
    }),
    putPortalPanelOrderVoucher: build.mutation<
      PutPortalPanelOrderVoucherApiResponse,
      PutPortalPanelOrderVoucherApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/order/voucher`,
        method: "PUT",
        body: queryArg.orderVoucherModel,
      }),
    }),
    postPortalPanelOrderPay: build.mutation<
      PostPortalPanelOrderPayApiResponse,
      PostPortalPanelOrderPayApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/order/pay`,
        method: "POST",
        body: queryArg.orderPayModel,
      }),
    }),
    getPortalPanelOrderPlanList: build.query<
      GetPortalPanelOrderPlanListApiResponse,
      GetPortalPanelOrderPlanListApiArg
    >({
      query: () => ({ url: `/portal/panel/order-plan/list` }),
    }),
    postPortalPanelOrderPlanOrder: build.mutation<
      PostPortalPanelOrderPlanOrderApiResponse,
      PostPortalPanelOrderPlanOrderApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/order-plan/order`,
        method: "POST",
        body: queryArg.createOrderPlanModel,
      }),
    }),
    getPortalPanelProductBundleListByProductCategoryId: build.query<
      GetPortalPanelProductBundleListByProductCategoryIdApiResponse,
      GetPortalPanelProductBundleListByProductCategoryIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/product-bundle/list/${queryArg.productCategoryId}`,
      }),
    }),
    getPortalPanelProductCategoryList: build.query<
      GetPortalPanelProductCategoryListApiResponse,
      GetPortalPanelProductCategoryListApiArg
    >({
      query: () => ({ url: `/portal/panel/product-category/list` }),
    }),
    getPortalPanelProfileGet: build.query<
      GetPortalPanelProfileGetApiResponse,
      GetPortalPanelProfileGetApiArg
    >({
      query: () => ({ url: `/portal/panel/profile/get` }),
    }),
    postPortalPanelProfileGetNotificationStatus: build.mutation<
      PostPortalPanelProfileGetNotificationStatusApiResponse,
      PostPortalPanelProfileGetNotificationStatusApiArg
    >({
      query: () => ({
        url: `/portal/panel/profile/get-notification-status`,
        method: "POST",
      }),
    }),
    putPortalPanelProfileEdit: build.mutation<
      PutPortalPanelProfileEditApiResponse,
      PutPortalPanelProfileEditApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/profile/edit`,
        method: "PUT",
        body: queryArg.editProfileModel,
      }),
    }),
    putPortalPanelProfileEditEmail: build.mutation<
      PutPortalPanelProfileEditEmailApiResponse,
      PutPortalPanelProfileEditEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/profile/edit-email`,
        method: "PUT",
        body: queryArg.editEmailModel,
      }),
    }),
    postPortalPanelProfileConfirmEmail: build.mutation<
      PostPortalPanelProfileConfirmEmailApiResponse,
      PostPortalPanelProfileConfirmEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/profile/confirm-email`,
        method: "POST",
        body: queryArg.confirmEmailModel,
      }),
    }),
    putPortalPanelProfileEditPhoneNumber: build.mutation<
      PutPortalPanelProfileEditPhoneNumberApiResponse,
      PutPortalPanelProfileEditPhoneNumberApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/profile/edit-phone-number`,
        method: "PUT",
        body: queryArg.editPhoneNumberModel,
      }),
    }),
    postPortalPanelProfileConfirmPhoneNumber: build.mutation<
      PostPortalPanelProfileConfirmPhoneNumberApiResponse,
      PostPortalPanelProfileConfirmPhoneNumberApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/profile/confirm-phone-number`,
        method: "POST",
        body: queryArg.confirmPhoneNumberModel,
      }),
    }),
    putPortalPanelProfileEditEmailNotification: build.mutation<
      PutPortalPanelProfileEditEmailNotificationApiResponse,
      PutPortalPanelProfileEditEmailNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/profile/edit-email-notification`,
        method: "PUT",
        body: queryArg.editEmailNotifyModel,
      }),
    }),
    putPortalPanelProfileEditPhoneNotification: build.mutation<
      PutPortalPanelProfileEditPhoneNotificationApiResponse,
      PutPortalPanelProfileEditPhoneNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/profile/edit-phone-notification`,
        method: "PUT",
        body: queryArg.editPhoneNotifyModel,
      }),
    }),
    postPortalPanelProfileChangePassword: build.mutation<
      PostPortalPanelProfileChangePasswordApiResponse,
      PostPortalPanelProfileChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/profile/change-password`,
        method: "POST",
        body: queryArg.changePasswordModel,
      }),
    }),
    getPortalRabbitRabbitHostList: build.query<
      GetPortalRabbitRabbitHostListApiResponse,
      GetPortalRabbitRabbitHostListApiArg
    >({
      query: () => ({ url: `/portal/rabbit/rabbit-host/list` }),
    }),
    getPortalRabbitRabbitHostGetById: build.query<
      GetPortalRabbitRabbitHostGetByIdApiResponse,
      GetPortalRabbitRabbitHostGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/rabbit/rabbit-host/get/${queryArg.id}`,
      }),
    }),
    postPortalRabbitRabbitHostCreate: build.mutation<
      PostPortalRabbitRabbitHostCreateApiResponse,
      PostPortalRabbitRabbitHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/rabbit/rabbit-host/create`,
        method: "POST",
        body: queryArg.createRabbitHostModel,
      }),
    }),
    putPortalRabbitRabbitHostChangeService: build.mutation<
      PutPortalRabbitRabbitHostChangeServiceApiResponse,
      PutPortalRabbitRabbitHostChangeServiceApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/rabbit/rabbit-host/change-service`,
        method: "PUT",
        body: queryArg.editRabbitHostModel,
      }),
    }),
    deletePortalRabbitRabbitHostDeleteById: build.mutation<
      DeletePortalRabbitRabbitHostDeleteByIdApiResponse,
      DeletePortalRabbitRabbitHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/rabbit/rabbit-host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postPortalRabbitRabbitHostChangeExchange: build.mutation<
      PostPortalRabbitRabbitHostChangeExchangeApiResponse,
      PostPortalRabbitRabbitHostChangeExchangeApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/rabbit/rabbit-host/change-exchange`,
        method: "POST",
        body: queryArg.changeExchangeModel,
      }),
    }),
    getPortalRabbitRabbitUserListByRabbitHostId: build.query<
      GetPortalRabbitRabbitUserListByRabbitHostIdApiResponse,
      GetPortalRabbitRabbitUserListByRabbitHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/rabbit/rabbit-user/list/${queryArg.rabbitHostId}`,
      }),
    }),
    postPortalRabbitRabbitUserCreate: build.mutation<
      PostPortalRabbitRabbitUserCreateApiResponse,
      PostPortalRabbitRabbitUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/rabbit/rabbit-user/create`,
        method: "POST",
        body: queryArg.createRabbitUserModel,
      }),
    }),
    deletePortalRabbitRabbitUserDeleteById: build.mutation<
      DeletePortalRabbitRabbitUserDeleteByIdApiResponse,
      DeletePortalRabbitRabbitUserDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/rabbit/rabbit-user/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postPortalRabbitRabbitUserChangePassword: build.mutation<
      PostPortalRabbitRabbitUserChangePasswordApiResponse,
      PostPortalRabbitRabbitUserChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/rabbit/rabbit-user/change-password`,
        method: "POST",
        body: queryArg.changeRabbitPasswordModel,
      }),
    }),
    getPortalPanelReferralGet: build.query<
      GetPortalPanelReferralGetApiResponse,
      GetPortalPanelReferralGetApiArg
    >({
      query: () => ({ url: `/portal/panel/referral/get` }),
    }),
    postPortalPanelReferralJoin: build.mutation<
      PostPortalPanelReferralJoinApiResponse,
      PostPortalPanelReferralJoinApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/referral/join`,
        method: "POST",
        body: queryArg.joinReferralModel,
      }),
    }),
    getPortalStorageStorageHostList: build.query<
      GetPortalStorageStorageHostListApiResponse,
      GetPortalStorageStorageHostListApiArg
    >({
      query: () => ({ url: `/portal/storage/storage-host/list` }),
    }),
    getPortalStorageStorageHostGetById: build.query<
      GetPortalStorageStorageHostGetByIdApiResponse,
      GetPortalStorageStorageHostGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/storage/storage-host/get/${queryArg.id}`,
      }),
    }),
    postPortalStorageStorageHostCreate: build.mutation<
      PostPortalStorageStorageHostCreateApiResponse,
      PostPortalStorageStorageHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/storage/storage-host/create`,
        method: "POST",
        body: queryArg.createStorageHostModel,
      }),
    }),
    putPortalStorageStorageHostEdit: build.mutation<
      PutPortalStorageStorageHostEditApiResponse,
      PutPortalStorageStorageHostEditApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/storage/storage-host/edit`,
        method: "PUT",
        body: queryArg.editStorageHostModel,
      }),
    }),
    deletePortalStorageStorageHostDeleteById: build.mutation<
      DeletePortalStorageStorageHostDeleteByIdApiResponse,
      DeletePortalStorageStorageHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/storage/storage-host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getPortalPanelSupportList: build.query<
      GetPortalPanelSupportListApiResponse,
      GetPortalPanelSupportListApiArg
    >({
      query: () => ({ url: `/portal/panel/support/list` }),
    }),
    postPortalPanelSupportCreate: build.mutation<
      PostPortalPanelSupportCreateApiResponse,
      PostPortalPanelSupportCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/support/create`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getPortalPanelSupportItemListBySupportId: build.query<
      GetPortalPanelSupportItemListBySupportIdApiResponse,
      GetPortalPanelSupportItemListBySupportIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/support-item/list/${queryArg.supportId}`,
      }),
    }),
    postPortalPanelSupportItemCreate: build.mutation<
      PostPortalPanelSupportItemCreateApiResponse,
      PostPortalPanelSupportItemCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/support-item/create`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getPortalPanelSupportItemDownloadById: build.query<
      GetPortalPanelSupportItemDownloadByIdApiResponse,
      GetPortalPanelSupportItemDownloadByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/support-item/download/${queryArg.id}`,
      }),
    }),
    getPortalPanelSupportSubjectList: build.query<
      GetPortalPanelSupportSubjectListApiResponse,
      GetPortalPanelSupportSubjectListApiArg
    >({
      query: () => ({ url: `/portal/panel/support-subject/list` }),
    }),
    postPortalPanelSupportSubjectSelectList: build.mutation<
      PostPortalPanelSupportSubjectSelectListApiResponse,
      PostPortalPanelSupportSubjectSelectListApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/support-subject/select-list`,
        method: "POST",
        body: queryArg.supportSubjectSelectListModel,
      }),
    }),
    getPortalPanelUserApiKeyList: build.query<
      GetPortalPanelUserApiKeyListApiResponse,
      GetPortalPanelUserApiKeyListApiArg
    >({
      query: () => ({ url: `/portal/panel/user-api-key/list` }),
    }),
    postPortalPanelUserApiKeyCreate: build.mutation<
      PostPortalPanelUserApiKeyCreateApiResponse,
      PostPortalPanelUserApiKeyCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/user-api-key/create`,
        method: "POST",
        body: queryArg.createUserApiKeyModel,
      }),
    }),
    deletePortalPanelUserApiKeyDeleteById: build.mutation<
      DeletePortalPanelUserApiKeyDeleteByIdApiResponse,
      DeletePortalPanelUserApiKeyDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/user-api-key/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getPortalVmVmList: build.query<
      GetPortalVmVmListApiResponse,
      GetPortalVmVmListApiArg
    >({
      query: () => ({ url: `/portal/vm/vm/list` }),
    }),
    getPortalVmVmGetById: build.query<
      GetPortalVmVmGetByIdApiResponse,
      GetPortalVmVmGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/portal/vm/vm/get/${queryArg.id}` }),
    }),
    postPortalVmVmCreate: build.mutation<
      PostPortalVmVmCreateApiResponse,
      PostPortalVmVmCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vm/create`,
        method: "POST",
        body: queryArg.createVmModel,
      }),
    }),
    putPortalVmVmEdit: build.mutation<
      PutPortalVmVmEditApiResponse,
      PutPortalVmVmEditApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vm/edit`,
        method: "PUT",
        body: queryArg.editVmModel,
      }),
    }),
    deletePortalVmVmDeleteById: build.mutation<
      DeletePortalVmVmDeleteByIdApiResponse,
      DeletePortalVmVmDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vm/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putPortalVmVmRebuild: build.mutation<
      PutPortalVmVmRebuildApiResponse,
      PutPortalVmVmRebuildApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vm/rebuild`,
        method: "PUT",
        body: queryArg.rebuildVmModel,
      }),
    }),
    putPortalVmVmConnectById: build.mutation<
      PutPortalVmVmConnectByIdApiResponse,
      PutPortalVmVmConnectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vm/connect/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putPortalVmVmDisconnectById: build.mutation<
      PutPortalVmVmDisconnectByIdApiResponse,
      PutPortalVmVmDisconnectByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vm/disconnect/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putPortalVmVmRebootById: build.mutation<
      PutPortalVmVmRebootByIdApiResponse,
      PutPortalVmVmRebootByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vm/reboot/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putPortalVmVmShutdownById: build.mutation<
      PutPortalVmVmShutdownByIdApiResponse,
      PutPortalVmVmShutdownByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vm/shutdown/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putPortalVmVmResetById: build.mutation<
      PutPortalVmVmResetByIdApiResponse,
      PutPortalVmVmResetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vm/reset/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putPortalVmVmStartById: build.mutation<
      PutPortalVmVmStartByIdApiResponse,
      PutPortalVmVmStartByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vm/start/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putPortalVmVmStopById: build.mutation<
      PutPortalVmVmStopByIdApiResponse,
      PutPortalVmVmStopByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vm/stop/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getPortalVmVmIpListByVmId: build.query<
      GetPortalVmVmIpListByVmIdApiResponse,
      GetPortalVmVmIpListByVmIdApiArg
    >({
      query: (queryArg) => ({ url: `/portal/vm/vm-ip/list/${queryArg.vmId}` }),
    }),
    postPortalVmVmIpCreate: build.mutation<
      PostPortalVmVmIpCreateApiResponse,
      PostPortalVmVmIpCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vm-ip/create`,
        method: "POST",
        body: queryArg.createVmIpModel,
      }),
    }),
    deletePortalVmVmIpDeleteById: build.mutation<
      DeletePortalVmVmIpDeleteByIdApiResponse,
      DeletePortalVmVmIpDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vm-ip/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postPortalVmVmKmsGet: build.mutation<
      PostPortalVmVmKmsGetApiResponse,
      PostPortalVmVmKmsGetApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vm-kms/get`,
        method: "POST",
        body: queryArg.getKmsModel,
      }),
    }),
    getPortalVmImageListByDatacenterId: build.query<
      GetPortalVmImageListByDatacenterIdApiResponse,
      GetPortalVmImageListByDatacenterIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/image/list/${queryArg.datacenterId}`,
      }),
    }),
    getPortalVmIsoListByDatacenterId: build.query<
      GetPortalVmIsoListByDatacenterIdApiResponse,
      GetPortalVmIsoListByDatacenterIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/iso/list/${queryArg.datacenterId}`,
      }),
    }),
    putPortalVmIsoMount: build.mutation<
      PutPortalVmIsoMountApiResponse,
      PutPortalVmIsoMountApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/iso/mount`,
        method: "PUT",
        body: queryArg.mountModel,
      }),
    }),
    putPortalVmIsoUnmount: build.mutation<
      PutPortalVmIsoUnmountApiResponse,
      PutPortalVmIsoUnmountApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/iso/unmount`,
        method: "PUT",
        body: queryArg.unmountModel,
      }),
    }),
    getPortalVmVpcHostList: build.query<
      GetPortalVmVpcHostListApiResponse,
      GetPortalVmVpcHostListApiArg
    >({
      query: () => ({ url: `/portal/vm/vpc-host/list` }),
    }),
    postPortalVmVpcHostCreate: build.mutation<
      PostPortalVmVpcHostCreateApiResponse,
      PostPortalVmVpcHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vpc-host/create`,
        method: "POST",
        body: queryArg.createVpcHostModel,
      }),
    }),
    getPortalVmVpcNetworkListByVpcHostId: build.query<
      GetPortalVmVpcNetworkListByVpcHostIdApiResponse,
      GetPortalVmVpcNetworkListByVpcHostIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vpc-network/list/${queryArg.vpcHostId}`,
      }),
    }),
    postPortalVmVpcNetworkCreate: build.mutation<
      PostPortalVmVpcNetworkCreateApiResponse,
      PostPortalVmVpcNetworkCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/vm/vpc-network/create`,
        method: "POST",
        body: queryArg.createVpcNetworkModel,
      }),
    }),
    getPortalPanelWalletList: build.query<
      GetPortalPanelWalletListApiResponse,
      GetPortalPanelWalletListApiArg
    >({
      query: () => ({ url: `/portal/panel/wallet/list` }),
    }),
    getPortalPanelWalletGetBalance: build.query<
      GetPortalPanelWalletGetBalanceApiResponse,
      GetPortalPanelWalletGetBalanceApiArg
    >({
      query: () => ({ url: `/portal/panel/wallet/get-balance` }),
    }),
    getPortalPanelWalletPaymentList: build.query<
      GetPortalPanelWalletPaymentListApiResponse,
      GetPortalPanelWalletPaymentListApiArg
    >({
      query: () => ({ url: `/portal/panel/wallet-payment/list` }),
    }),
    getPortalPanelWalletPaymentGetById: build.query<
      GetPortalPanelWalletPaymentGetByIdApiResponse,
      GetPortalPanelWalletPaymentGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/wallet-payment/get/${queryArg.id}`,
      }),
    }),
    postPortalPanelWalletPaymentCreate: build.mutation<
      PostPortalPanelWalletPaymentCreateApiResponse,
      PostPortalPanelWalletPaymentCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/wallet-payment/create`,
        method: "POST",
        body: queryArg.createWalletPaymentModel,
      }),
    }),
    postPortalPanelWalletPaymentPecCallBack: build.mutation<
      PostPortalPanelWalletPaymentPecCallBackApiResponse,
      PostPortalPanelWalletPaymentPecCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/wallet-payment/pec-call-back`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postPortalPanelWalletPaymentSepCallBack: build.mutation<
      PostPortalPanelWalletPaymentSepCallBackApiResponse,
      PostPortalPanelWalletPaymentSepCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/panel/wallet-payment/sep-call-back`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getPortalWebWebHostList: build.query<
      GetPortalWebWebHostListApiResponse,
      GetPortalWebWebHostListApiArg
    >({
      query: () => ({ url: `/portal/web/web-host/list` }),
    }),
    getPortalWebWebHostGetById: build.query<
      GetPortalWebWebHostGetByIdApiResponse,
      GetPortalWebWebHostGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/portal/web/web-host/get/${queryArg.id}` }),
    }),
    getPortalWebWebHostGetLoginSessionById: build.query<
      GetPortalWebWebHostGetLoginSessionByIdApiResponse,
      GetPortalWebWebHostGetLoginSessionByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/web/web-host/get-login-session/${queryArg.id}`,
      }),
    }),
    postPortalWebWebHostCheckDomain: build.mutation<
      PostPortalWebWebHostCheckDomainApiResponse,
      PostPortalWebWebHostCheckDomainApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/web/web-host/check-domain`,
        method: "POST",
        body: queryArg.checkWebHostDomainModel,
      }),
    }),
    postPortalWebWebHostCreate: build.mutation<
      PostPortalWebWebHostCreateApiResponse,
      PostPortalWebWebHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/web/web-host/create`,
        method: "POST",
        body: queryArg.createWebHostModel,
      }),
    }),
    putPortalWebWebHostEdit: build.mutation<
      PutPortalWebWebHostEditApiResponse,
      PutPortalWebWebHostEditApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/web/web-host/edit`,
        method: "PUT",
        body: queryArg.editWebHostModel,
      }),
    }),
    deletePortalWebWebHostDeleteById: build.mutation<
      DeletePortalWebWebHostDeleteByIdApiResponse,
      DeletePortalWebWebHostDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/web/web-host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postPortalDomainWhoisGet: build.mutation<
      PostPortalDomainWhoisGetApiResponse,
      PostPortalDomainWhoisGetApiArg
    >({
      query: (queryArg) => ({
        url: `/portal/domain/whois/get`,
        method: "POST",
        body: queryArg.getDomainWhoisModel,
      }),
    }),
  }),
});
export type PostPortalAccountLoginApiResponse =
  /** status 200 Success */ LoginResponse;
export type PostPortalAccountLoginApiArg = {
  loginModel: LoginModel;
};
export type PostPortalAccountRegisterApiResponse = unknown;
export type PostPortalAccountRegisterApiArg = {
  registerModel: RegisterModel;
};
export type PostPortalAccountForgotApiResponse = unknown;
export type PostPortalAccountForgotApiArg = {
  forgotModel: ForgotModel;
};
export type PostPortalAccountForgotConfirmApiResponse = unknown;
export type PostPortalAccountForgotConfirmApiArg = {
  forgotConfirmModel: ForgotConfirmModel;
};
export type PostPortalAccountLogoutApiResponse = unknown;
export type PostPortalAccountLogoutApiArg = void;
export type GetPortalCdnAnalyticGetByZoneNameAndPeriodIdApiResponse =
  /** status 200 Success */ GetAnalyticResponse;
export type GetPortalCdnAnalyticGetByZoneNameAndPeriodIdApiArg = {
  zoneName: string;
  periodId: number;
};
export type GetPortalCdnApiGatewayListByZoneNameApiResponse =
  /** status 200 Success */ ApiGatewayListResponse[];
export type GetPortalCdnApiGatewayListByZoneNameApiArg = {
  zoneName: string;
};
export type GetPortalCdnApiGatewayGetByIdApiResponse =
  /** status 200 Success */ GetApiGatewayResponse;
export type GetPortalCdnApiGatewayGetByIdApiArg = {
  id: number;
};
export type PostPortalCdnApiGatewayCreateApiResponse = unknown;
export type PostPortalCdnApiGatewayCreateApiArg = {
  createApiGatewayModel: CreateApiGatewayModel;
};
export type PutPortalCdnApiGatewayEditApiResponse = unknown;
export type PutPortalCdnApiGatewayEditApiArg = {
  editApiGatewayModel: EditApiGatewayModel;
};
export type DeletePortalCdnApiGatewayDeleteByIdApiResponse = unknown;
export type DeletePortalCdnApiGatewayDeleteByIdApiArg = {
  id: number;
};
export type GetPortalPanelBillListApiResponse =
  /** status 200 Success */ BillListResponse[];
export type GetPortalPanelBillListApiArg = void;
export type GetPortalPanelBillGetByIdApiResponse =
  /** status 200 Success */ GetBillResponse;
export type GetPortalPanelBillGetByIdApiArg = {
  id: number;
};
export type GetPortalPanelBillDownloadByIdApiResponse = unknown;
export type GetPortalPanelBillDownloadByIdApiArg = {
  id: number;
};
export type GetPortalPanelBusinessUnitListApiResponse =
  /** status 200 Success */ BusinessUnitListResponse[];
export type GetPortalPanelBusinessUnitListApiArg = void;
export type GetPortalPanelCalculateMonthListApiResponse =
  /** status 200 Success */ CalculateMonthListResponse[];
export type GetPortalPanelCalculateMonthListApiArg = void;
export type GetPortalCdnCdnListApiResponse =
  /** status 200 Success */ CdnListResponse[];
export type GetPortalCdnCdnListApiArg = void;
export type GetPortalCdnCdnGetByZoneNameApiResponse =
  /** status 200 Success */ GetCdnResponse;
export type GetPortalCdnCdnGetByZoneNameApiArg = {
  zoneName: string;
};
export type GetPortalCdnCdnGetNsStatusByZoneNameApiResponse =
  /** status 200 Success */ GetCdnNsStatusResponse;
export type GetPortalCdnCdnGetNsStatusByZoneNameApiArg = {
  zoneName: string;
};
export type GetPortalCdnCdnOverviewByZoneNameApiResponse =
  /** status 200 Success */ CdnOverviewResponse;
export type GetPortalCdnCdnOverviewByZoneNameApiArg = {
  zoneName: string;
};
export type PostPortalCdnCdnCheckZoneApiResponse = unknown;
export type PostPortalCdnCdnCheckZoneApiArg = {
  checkCdnModel: CheckCdnModel;
};
export type PostPortalCdnCdnCreateApiResponse = unknown;
export type PostPortalCdnCdnCreateApiArg = {
  createCdnModel: CreateCdnModel;
};
export type DeletePortalCdnCdnDeleteByIdApiResponse = unknown;
export type DeletePortalCdnCdnDeleteByIdApiArg = {
  id: number;
};
export type PutPortalCdnCdnChangeCdnTypeApiResponse = unknown;
export type PutPortalCdnCdnChangeCdnTypeApiArg = {
  changeCdnTypeModel: ChangeCdnTypeModel;
};
export type PutPortalCdnCdnChangeClientCertTypeApiResponse = unknown;
export type PutPortalCdnCdnChangeClientCertTypeApiArg = {
  changeClientCertTypeModel: ChangeClientCertTypeModel;
};
export type PutPortalCdnCdnChangeEdgeCertTypeApiResponse = unknown;
export type PutPortalCdnCdnChangeEdgeCertTypeApiArg = {
  changeEdgeCertTypeModel: ChangeEdgeCertTypeModel;
};
export type PutPortalCdnCdnChangeHstsApiResponse = unknown;
export type PutPortalCdnCdnChangeHstsApiArg = {
  changeHstsModel: ChangeHstsModel;
};
export type PutPortalCdnCdnChangeHttpsRedirectApiResponse = unknown;
export type PutPortalCdnCdnChangeHttpsRedirectApiArg = {
  changeHttpsRedirectModel: ChangeHttpsRedirectModel;
};
export type PutPortalCdnCdnChangeNonWwwRedirectApiResponse = unknown;
export type PutPortalCdnCdnChangeNonWwwRedirectApiArg = {
  changeNonWwwRedirectModel: ChangeNonWwwRedirectModel;
};
export type GetPortalCdnClientCertGetByZoneNameApiResponse =
  /** status 200 Success */ GetCdnCertResponse;
export type GetPortalCdnClientCertGetByZoneNameApiArg = {
  zoneName: string;
};
export type GetPortalCdnClientCertGetUserCertByZoneNameApiResponse =
  /** status 200 Success */ GetCdnCertResponse;
export type GetPortalCdnClientCertGetUserCertByZoneNameApiArg = {
  zoneName: string;
};
export type PostPortalCdnClientCertCreateUserCertApiResponse = unknown;
export type PostPortalCdnClientCertCreateUserCertApiArg = {
  createCdnClientUserCertModel: CreateCdnClientUserCertModel;
};
export type GetPortalCdnEdgeCertGetByZoneNameApiResponse =
  /** status 200 Success */ GetCdnCertResponse;
export type GetPortalCdnEdgeCertGetByZoneNameApiArg = {
  zoneName: string;
};
export type GetPortalCdnEdgeCertGetUserCertByZoneNameApiResponse =
  /** status 200 Success */ GetCdnCertResponse;
export type GetPortalCdnEdgeCertGetUserCertByZoneNameApiArg = {
  zoneName: string;
};
export type PostPortalCdnEdgeCertCreateApiResponse = unknown;
export type PostPortalCdnEdgeCertCreateApiArg = {
  createCdnEdgeCertModel: CreateCdnEdgeCertModel;
};
export type PostPortalCdnEdgeCertCreateUserCertApiResponse = unknown;
export type PostPortalCdnEdgeCertCreateUserCertApiArg = {
  createCdnEdgeUserCertModel: CreateCdnEdgeUserCertModel;
};
export type GetPortalPanelCommissionListApiResponse =
  /** status 200 Success */ CommissionListResponse;
export type GetPortalPanelCommissionListApiArg = void;
export type GetPortalPanelCustomerGetApiResponse =
  /** status 200 Success */ GetCustomerResponse;
export type GetPortalPanelCustomerGetApiArg = void;
export type PutPortalPanelCustomerEditApiResponse = unknown;
export type PutPortalPanelCustomerEditApiArg = {
  editCustomerModel: EditCustomerModel;
};
export type PutPortalPanelCustomerEditCustomerTypeApiResponse = unknown;
export type PutPortalPanelCustomerEditCustomerTypeApiArg = {
  editCustomerTypeModel: EditCustomerTypeModel;
};
export type GetPortalPanelDashboardGetUserAnalyticsByCategoryIdApiResponse =
  /** status 200 Success */ GetUserAnalyticsResponse[];
export type GetPortalPanelDashboardGetUserAnalyticsByCategoryIdApiArg = {
  categoryId: number;
};
export type GetPortalPanelDashboardBillShortListApiResponse =
  /** status 200 Success */ BillShortListResponse[];
export type GetPortalPanelDashboardBillShortListApiArg = void;
export type GetPortalPanelDashboardSupportShortListApiResponse =
  /** status 200 Success */ SupportShortListResponse[];
export type GetPortalPanelDashboardSupportShortListApiArg = void;
export type GetPortalVmDatacenterListApiResponse =
  /** status 200 Success */ DatacenterListResponse[];
export type GetPortalVmDatacenterListApiArg = void;
export type GetPortalCdnDnsRecordListByZoneNameApiResponse =
  /** status 200 Success */ DnsRecordListResponse[];
export type GetPortalCdnDnsRecordListByZoneNameApiArg = {
  zoneName: string;
};
export type GetPortalCdnDnsRecordGetByIdApiResponse =
  /** status 200 Success */ GetDnsRecordResponse;
export type GetPortalCdnDnsRecordGetByIdApiArg = {
  id: number;
};
export type PostPortalCdnDnsRecordCreateApiResponse = unknown;
export type PostPortalCdnDnsRecordCreateApiArg = {
  createDnsRecordModel: CreateDnsRecordModel;
};
export type PutPortalCdnDnsRecordEditApiResponse = unknown;
export type PutPortalCdnDnsRecordEditApiArg = {
  editDnsRecordModel: EditDnsRecordModel;
};
export type DeletePortalCdnDnsRecordDeleteByIdApiResponse = unknown;
export type DeletePortalCdnDnsRecordDeleteByIdApiArg = {
  id: number;
};
export type PutPortalCdnDnsRecordChangeProxyStatusByIdApiResponse = unknown;
export type PutPortalCdnDnsRecordChangeProxyStatusByIdApiArg = {
  id: number;
};
export type GetPortalDomainListApiResponse =
  /** status 200 Success */ DomainListResponse[];
export type GetPortalDomainListApiArg = void;
export type GetPortalDomainGetByIdApiResponse =
  /** status 200 Success */ GetDomainResponse;
export type GetPortalDomainGetByIdApiArg = {
  id: number;
};
export type GetPortalDomainGetStatusByIdApiResponse =
  /** status 200 Success */ GetDomainResponse;
export type GetPortalDomainGetStatusByIdApiArg = {
  id: number;
};
export type PostPortalDomainGetPriceApiResponse =
  /** status 200 Success */ GetProductPriceResponse;
export type PostPortalDomainGetPriceApiArg = {
  getPriceModel: GetPriceModel;
};
export type PostPortalDomainRegisterApiResponse =
  /** status 200 Success */ number;
export type PostPortalDomainRegisterApiArg = {
  registerDomainModel: RegisterDomainModel;
};
export type DeletePortalDomainDeleteByIdApiResponse = unknown;
export type DeletePortalDomainDeleteByIdApiArg = {
  id: number;
};
export type PutPortalDomainChangeContactApiResponse = unknown;
export type PutPortalDomainChangeContactApiArg = {
  changeContactModel: ChangeContactModel;
};
export type PutPortalDomainChangeNsApiResponse = unknown;
export type PutPortalDomainChangeNsApiArg = {
  changeNsModel: ChangeNsModel;
};
export type PostPortalDomainResendVerificationByIdApiResponse = unknown;
export type PostPortalDomainResendVerificationByIdApiArg = {
  id: number;
};
export type GetPortalIndexApiResponse = unknown;
export type GetPortalIndexApiArg = void;
export type GetPortalHandshakeApiResponse = unknown;
export type GetPortalHandshakeApiArg = void;
export type GetPortalPanelHostProductListByProductCategoryIdApiResponse =
  /** status 200 Success */ HostProductListResponse[];
export type GetPortalPanelHostProductListByProductCategoryIdApiArg = {
  productCategoryId: number;
};
export type GetPortalPanelInvoiceListApiResponse =
  /** status 200 Success */ InvoiceListResponse[];
export type GetPortalPanelInvoiceListApiArg = void;
export type GetPortalPanelInvoiceGetByIdApiResponse =
  /** status 200 Success */ GetInvoiceResponse;
export type GetPortalPanelInvoiceGetByIdApiArg = {
  id: number;
};
export type GetPortalKubeDevopsListByIdApiResponse =
  /** status 200 Success */ KubeDevOpsListResponse[];
export type GetPortalKubeDevopsListByIdApiArg = {
  id: number;
};
export type GetPortalKubeDevopsGetByIdApiResponse =
  /** status 200 Success */ KubeDevOpsListResponse;
export type GetPortalKubeDevopsGetByIdApiArg = {
  id: number;
};
export type PostPortalKubeDevopsCreateApiResponse = unknown;
export type PostPortalKubeDevopsCreateApiArg = {
  createKubeDevOpsModel: CreateKubeDevOpsModel;
};
export type DeletePortalKubeDevopsDeleteByIdApiResponse = unknown;
export type DeletePortalKubeDevopsDeleteByIdApiArg = {
  id: number;
};
export type GetPortalKubeServiceListByIdApiResponse =
  /** status 200 Success */ KubeServiceListResponse[];
export type GetPortalKubeServiceListByIdApiArg = {
  id: number;
};
export type GetPortalKubeServiceGetByIdApiResponse =
  /** status 200 Success */ KubeServiceListResponse;
export type GetPortalKubeServiceGetByIdApiArg = {
  id: number;
};
export type PostPortalKubeServiceCreateApiResponse = unknown;
export type PostPortalKubeServiceCreateApiArg = {
  createKubeServiceModel: CreateKubeServiceModel;
};
export type DeletePortalKubeServiceDeleteByIdApiResponse = unknown;
export type DeletePortalKubeServiceDeleteByIdApiArg = {
  id: number;
};
export type GetPortalKubeNamespaceListApiResponse =
  /** status 200 Success */ KubeNamespaceListResponse[];
export type GetPortalKubeNamespaceListApiArg = void;
export type GetPortalKubeNamespaceGetByIdApiResponse =
  /** status 200 Success */ GetKubeNamespaceResponse;
export type GetPortalKubeNamespaceGetByIdApiArg = {
  id: number;
};
export type GetPortalKubeNamespaceGetLoginSessionByIdApiResponse =
  /** status 200 Success */ GetLoginNamespaceResponse;
export type GetPortalKubeNamespaceGetLoginSessionByIdApiArg = {
  id: number;
};
export type PostPortalKubeNamespaceCreateApiResponse = unknown;
export type PostPortalKubeNamespaceCreateApiArg = {
  createKubeNamespaceModel: CreateKubeNamespaceModel;
};
export type PutPortalKubeNamespaceChangeServiceApiResponse = unknown;
export type PutPortalKubeNamespaceChangeServiceApiArg = {
  editKubeNamespaceModel: EditKubeNamespaceModel;
};
export type DeletePortalKubeNamespaceDeleteByIdApiResponse = unknown;
export type DeletePortalKubeNamespaceDeleteByIdApiArg = {
  id: number;
};
export type GetPortalKubeUserListByKubeHostIdApiResponse =
  /** status 200 Success */ KubeUserListResponse[];
export type GetPortalKubeUserListByKubeHostIdApiArg = {
  kubeHostId: number;
};
export type PostPortalKubeUserCreateApiResponse = unknown;
export type PostPortalKubeUserCreateApiArg = {
  createKubeUserModel: CreateKubeUserModel;
};
export type DeletePortalKubeUserDeleteByIdApiResponse = unknown;
export type DeletePortalKubeUserDeleteByIdApiArg = {
  id: number;
};
export type PostPortalKubeUserChangePasswordApiResponse = unknown;
export type PostPortalKubeUserChangePasswordApiArg = {
  changeKubeUserPasswordModel: ChangeKubeUserPasswordModel;
};
export type GetPortalKubeUserRoleListByKubeHostIdApiResponse =
  /** status 200 Success */ KubeUserRoleListResponse[];
export type GetPortalKubeUserRoleListByKubeHostIdApiArg = {
  kubeHostId: number;
};
export type PostPortalKubeUserRoleCreateApiResponse = unknown;
export type PostPortalKubeUserRoleCreateApiArg = {
  createKubeUserRoleModel: CreateKubeUserRoleModel;
};
export type DeletePortalKubeUserRoleDeleteByIdApiResponse = unknown;
export type DeletePortalKubeUserRoleDeleteByIdApiArg = {
  id: number;
};
export type GetPortalKubeVolumeListByIdApiResponse =
  /** status 200 Success */ KubeVolumeListResponse[];
export type GetPortalKubeVolumeListByIdApiArg = {
  id: number;
};
export type GetPortalKubeVolumeGetByIdApiResponse =
  /** status 200 Success */ KubeVolumeListResponse;
export type GetPortalKubeVolumeGetByIdApiArg = {
  id: number;
};
export type PostPortalKubeVolumeCreateApiResponse = unknown;
export type PostPortalKubeVolumeCreateApiArg = {
  createKubeVolumeModel: CreateKubeVolumeModel;
};
export type DeletePortalKubeVolumeDeleteByIdApiResponse = unknown;
export type DeletePortalKubeVolumeDeleteByIdApiArg = {
  id: number;
};
export type GetPortalKubeWorkspaceListApiResponse =
  /** status 200 Success */ KubeWorkspaceListResponse[];
export type GetPortalKubeWorkspaceListApiArg = void;
export type GetPortalKubeWorkspaceGetByIdApiResponse =
  /** status 200 Success */ GetKubeWorkspaceResponse;
export type GetPortalKubeWorkspaceGetByIdApiArg = {
  id: number;
};
export type GetPortalKubeWorkspaceGetLoginSessionByIdApiResponse =
  /** status 200 Success */ GetLoginKubeWorkspaceResponse;
export type GetPortalKubeWorkspaceGetLoginSessionByIdApiArg = {
  id: number;
};
export type PostPortalKubeWorkspaceCreateApiResponse = unknown;
export type PostPortalKubeWorkspaceCreateApiArg = {
  createKubeWorkspaceModel: CreateKubeWorkspaceModel;
};
export type PutPortalKubeWorkspaceChangeServiceApiResponse = unknown;
export type PutPortalKubeWorkspaceChangeServiceApiArg = {
  editKubeWorkspaceModel: EditKubeWorkspaceModel;
};
export type DeletePortalKubeWorkspaceDeleteByIdApiResponse = unknown;
export type DeletePortalKubeWorkspaceDeleteByIdApiArg = {
  id: number;
};
export type GetPortalCdnLoadBalanceListByZoneNameApiResponse =
  /** status 200 Success */ LoadBalanceListResponse[];
export type GetPortalCdnLoadBalanceListByZoneNameApiArg = {
  zoneName: string;
};
export type GetPortalCdnLoadBalanceGetByIdApiResponse =
  /** status 200 Success */ GetLoadBalanceResponse;
export type GetPortalCdnLoadBalanceGetByIdApiArg = {
  id: number;
};
export type PostPortalCdnLoadBalanceCreateApiResponse = unknown;
export type PostPortalCdnLoadBalanceCreateApiArg = {
  createLoadBalanceModel: CreateLoadBalanceModel;
};
export type PutPortalCdnLoadBalanceEditApiResponse = unknown;
export type PutPortalCdnLoadBalanceEditApiArg = {
  editLoadBalanceModel: EditLoadBalanceModel;
};
export type DeletePortalCdnLoadBalanceDeleteByIdApiResponse = unknown;
export type DeletePortalCdnLoadBalanceDeleteByIdApiArg = {
  id: number;
};
export type GetPortalPanelLogSmsReceiveByFromAndTextToApiResponse = unknown;
export type GetPortalPanelLogSmsReceiveByFromAndTextToApiArg = {
  from: string;
  text: string;
  to: string;
};
export type GetPortalPanelNotificationListApiResponse =
  /** status 200 Success */ NotificationListResponse[];
export type GetPortalPanelNotificationListApiArg = void;
export type GetPortalPanelNotificationShortListApiResponse =
  /** status 200 Success */ NotificationListResponse[];
export type GetPortalPanelNotificationShortListApiArg = void;
export type GetPortalPanelOrderListApiResponse =
  /** status 200 Success */ OrderListResponse[];
export type GetPortalPanelOrderListApiArg = void;
export type GetPortalPanelOrderGetByIdApiResponse =
  /** status 200 Success */ GetOrderResponse;
export type GetPortalPanelOrderGetByIdApiArg = {
  id: number;
};
export type PutPortalPanelOrderPaymentTypeApiResponse = unknown;
export type PutPortalPanelOrderPaymentTypeApiArg = {
  orderPaymentTypeModel: OrderPaymentTypeModel;
};
export type PutPortalPanelOrderDurationApiResponse = unknown;
export type PutPortalPanelOrderDurationApiArg = {
  orderDurationModel: OrderDurationModel;
};
export type PutPortalPanelOrderVoucherApiResponse = unknown;
export type PutPortalPanelOrderVoucherApiArg = {
  orderVoucherModel: OrderVoucherModel;
};
export type PostPortalPanelOrderPayApiResponse =
  /** status 200 Success */ OrderPayResponse;
export type PostPortalPanelOrderPayApiArg = {
  orderPayModel: OrderPayModel;
};
export type GetPortalPanelOrderPlanListApiResponse =
  /** status 200 Success */ OrderPlanListResponse[];
export type GetPortalPanelOrderPlanListApiArg = void;
export type PostPortalPanelOrderPlanOrderApiResponse = unknown;
export type PostPortalPanelOrderPlanOrderApiArg = {
  createOrderPlanModel: CreateOrderPlanModel;
};
export type GetPortalPanelProductBundleListByProductCategoryIdApiResponse =
  /** status 200 Success */ ProductBundleListResponse[];
export type GetPortalPanelProductBundleListByProductCategoryIdApiArg = {
  productCategoryId: number;
};
export type GetPortalPanelProductCategoryListApiResponse =
  /** status 200 Success */ ProductCategoryListResponse[];
export type GetPortalPanelProductCategoryListApiArg = void;
export type GetPortalPanelProfileGetApiResponse =
  /** status 200 Success */ GetProfileResponse;
export type GetPortalPanelProfileGetApiArg = void;
export type PostPortalPanelProfileGetNotificationStatusApiResponse =
  /** status 200 Success */ GetNotificationStatusResponse;
export type PostPortalPanelProfileGetNotificationStatusApiArg = void;
export type PutPortalPanelProfileEditApiResponse = unknown;
export type PutPortalPanelProfileEditApiArg = {
  editProfileModel: EditProfileModel;
};
export type PutPortalPanelProfileEditEmailApiResponse = unknown;
export type PutPortalPanelProfileEditEmailApiArg = {
  editEmailModel: EditEmailModel;
};
export type PostPortalPanelProfileConfirmEmailApiResponse = unknown;
export type PostPortalPanelProfileConfirmEmailApiArg = {
  confirmEmailModel: ConfirmEmailModel;
};
export type PutPortalPanelProfileEditPhoneNumberApiResponse = unknown;
export type PutPortalPanelProfileEditPhoneNumberApiArg = {
  editPhoneNumberModel: EditPhoneNumberModel;
};
export type PostPortalPanelProfileConfirmPhoneNumberApiResponse = unknown;
export type PostPortalPanelProfileConfirmPhoneNumberApiArg = {
  confirmPhoneNumberModel: ConfirmPhoneNumberModel;
};
export type PutPortalPanelProfileEditEmailNotificationApiResponse = unknown;
export type PutPortalPanelProfileEditEmailNotificationApiArg = {
  editEmailNotifyModel: EditEmailNotifyModel;
};
export type PutPortalPanelProfileEditPhoneNotificationApiResponse = unknown;
export type PutPortalPanelProfileEditPhoneNotificationApiArg = {
  editPhoneNotifyModel: EditPhoneNotifyModel;
};
export type PostPortalPanelProfileChangePasswordApiResponse = unknown;
export type PostPortalPanelProfileChangePasswordApiArg = {
  changePasswordModel: ChangePasswordModel;
};
export type GetPortalRabbitRabbitHostListApiResponse =
  /** status 200 Success */ RabbitHostListResponse[];
export type GetPortalRabbitRabbitHostListApiArg = void;
export type GetPortalRabbitRabbitHostGetByIdApiResponse =
  /** status 200 Success */ GetRabbitHostResponse;
export type GetPortalRabbitRabbitHostGetByIdApiArg = {
  id: number;
};
export type PostPortalRabbitRabbitHostCreateApiResponse = unknown;
export type PostPortalRabbitRabbitHostCreateApiArg = {
  createRabbitHostModel: CreateRabbitHostModel;
};
export type PutPortalRabbitRabbitHostChangeServiceApiResponse = unknown;
export type PutPortalRabbitRabbitHostChangeServiceApiArg = {
  editRabbitHostModel: EditRabbitHostModel;
};
export type DeletePortalRabbitRabbitHostDeleteByIdApiResponse = unknown;
export type DeletePortalRabbitRabbitHostDeleteByIdApiArg = {
  id: number;
};
export type PostPortalRabbitRabbitHostChangeExchangeApiResponse = unknown;
export type PostPortalRabbitRabbitHostChangeExchangeApiArg = {
  changeExchangeModel: ChangeExchangeModel;
};
export type GetPortalRabbitRabbitUserListByRabbitHostIdApiResponse =
  /** status 200 Success */ RabbitHostUserListResponse[];
export type GetPortalRabbitRabbitUserListByRabbitHostIdApiArg = {
  rabbitHostId: number;
};
export type PostPortalRabbitRabbitUserCreateApiResponse = unknown;
export type PostPortalRabbitRabbitUserCreateApiArg = {
  createRabbitUserModel: CreateRabbitUserModel;
};
export type DeletePortalRabbitRabbitUserDeleteByIdApiResponse = unknown;
export type DeletePortalRabbitRabbitUserDeleteByIdApiArg = {
  id: number;
};
export type PostPortalRabbitRabbitUserChangePasswordApiResponse = unknown;
export type PostPortalRabbitRabbitUserChangePasswordApiArg = {
  changeRabbitPasswordModel: ChangeRabbitPasswordModel;
};
export type GetPortalPanelReferralGetApiResponse =
  /** status 200 Success */ GetReferralResponse;
export type GetPortalPanelReferralGetApiArg = void;
export type PostPortalPanelReferralJoinApiResponse =
  /** status 200 Success */ JoinReferralResponse;
export type PostPortalPanelReferralJoinApiArg = {
  joinReferralModel: JoinReferralModel;
};
export type GetPortalStorageStorageHostListApiResponse =
  /** status 200 Success */ StorageHostListResponse[];
export type GetPortalStorageStorageHostListApiArg = void;
export type GetPortalStorageStorageHostGetByIdApiResponse =
  /** status 200 Success */ GetStorageHostResponse;
export type GetPortalStorageStorageHostGetByIdApiArg = {
  id: number;
};
export type PostPortalStorageStorageHostCreateApiResponse = unknown;
export type PostPortalStorageStorageHostCreateApiArg = {
  createStorageHostModel: CreateStorageHostModel;
};
export type PutPortalStorageStorageHostEditApiResponse = unknown;
export type PutPortalStorageStorageHostEditApiArg = {
  editStorageHostModel: EditStorageHostModel;
};
export type DeletePortalStorageStorageHostDeleteByIdApiResponse = unknown;
export type DeletePortalStorageStorageHostDeleteByIdApiArg = {
  id: number;
};
export type GetPortalPanelSupportListApiResponse =
  /** status 200 Success */ SupportListResponse[];
export type GetPortalPanelSupportListApiArg = void;
export type PostPortalPanelSupportCreateApiResponse = unknown;
export type PostPortalPanelSupportCreateApiArg = {
  body: {
    Content: string;
    BusinessUnitId: number;
    SupportSubjectId: number;
    HostProductId?: number;
    ProductCategoryId?: number;
    Attachment?: Blob;
  };
};
export type GetPortalPanelSupportItemListBySupportIdApiResponse =
  /** status 200 Success */ SupportItemListResponse;
export type GetPortalPanelSupportItemListBySupportIdApiArg = {
  supportId: number;
};
export type PostPortalPanelSupportItemCreateApiResponse = unknown;
export type PostPortalPanelSupportItemCreateApiArg = {
  body: {
    SupportId: number;
    Content: string;
    Attachment?: Blob;
  };
};
export type GetPortalPanelSupportItemDownloadByIdApiResponse = unknown;
export type GetPortalPanelSupportItemDownloadByIdApiArg = {
  id: number;
};
export type GetPortalPanelSupportSubjectListApiResponse =
  /** status 200 Success */ SupportSubjectListResponse[];
export type GetPortalPanelSupportSubjectListApiArg = void;
export type PostPortalPanelSupportSubjectSelectListApiResponse =
  /** status 200 Success */ SupportSubjectListResponse[];
export type PostPortalPanelSupportSubjectSelectListApiArg = {
  supportSubjectSelectListModel: SupportSubjectSelectListModel;
};
export type GetPortalPanelUserApiKeyListApiResponse =
  /** status 200 Success */ UserApiKeyListResponse[];
export type GetPortalPanelUserApiKeyListApiArg = void;
export type PostPortalPanelUserApiKeyCreateApiResponse = unknown;
export type PostPortalPanelUserApiKeyCreateApiArg = {
  createUserApiKeyModel: CreateUserApiKeyModel;
};
export type DeletePortalPanelUserApiKeyDeleteByIdApiResponse = unknown;
export type DeletePortalPanelUserApiKeyDeleteByIdApiArg = {
  id: number;
};
export type GetPortalVmVmListApiResponse =
  /** status 200 Success */ VmListResponse[];
export type GetPortalVmVmListApiArg = void;
export type GetPortalVmVmGetByIdApiResponse =
  /** status 200 Success */ GetVmResponse;
export type GetPortalVmVmGetByIdApiArg = {
  id: number;
};
export type PostPortalVmVmCreateApiResponse = /** status 200 Success */ number;
export type PostPortalVmVmCreateApiArg = {
  createVmModel: CreateVmModel;
};
export type PutPortalVmVmEditApiResponse = unknown;
export type PutPortalVmVmEditApiArg = {
  editVmModel: EditVmModel;
};
export type DeletePortalVmVmDeleteByIdApiResponse = unknown;
export type DeletePortalVmVmDeleteByIdApiArg = {
  id: number;
};
export type PutPortalVmVmRebuildApiResponse = unknown;
export type PutPortalVmVmRebuildApiArg = {
  rebuildVmModel: RebuildVmModel;
};
export type PutPortalVmVmConnectByIdApiResponse = unknown;
export type PutPortalVmVmConnectByIdApiArg = {
  id: number;
};
export type PutPortalVmVmDisconnectByIdApiResponse = unknown;
export type PutPortalVmVmDisconnectByIdApiArg = {
  id: number;
};
export type PutPortalVmVmRebootByIdApiResponse = unknown;
export type PutPortalVmVmRebootByIdApiArg = {
  id: number;
};
export type PutPortalVmVmShutdownByIdApiResponse = unknown;
export type PutPortalVmVmShutdownByIdApiArg = {
  id: number;
};
export type PutPortalVmVmResetByIdApiResponse = unknown;
export type PutPortalVmVmResetByIdApiArg = {
  id: number;
};
export type PutPortalVmVmStartByIdApiResponse = unknown;
export type PutPortalVmVmStartByIdApiArg = {
  id: number;
};
export type PutPortalVmVmStopByIdApiResponse = unknown;
export type PutPortalVmVmStopByIdApiArg = {
  id: number;
};
export type GetPortalVmVmIpListByVmIdApiResponse =
  /** status 200 Success */ VmIpListResponse[];
export type GetPortalVmVmIpListByVmIdApiArg = {
  vmId: number;
};
export type PostPortalVmVmIpCreateApiResponse = unknown;
export type PostPortalVmVmIpCreateApiArg = {
  createVmIpModel: CreateVmIpModel;
};
export type DeletePortalVmVmIpDeleteByIdApiResponse = unknown;
export type DeletePortalVmVmIpDeleteByIdApiArg = {
  id: number;
};
export type PostPortalVmVmKmsGetApiResponse = /** status 200 Success */ string;
export type PostPortalVmVmKmsGetApiArg = {
  getKmsModel: GetKmsModel;
};
export type GetPortalVmImageListByDatacenterIdApiResponse =
  /** status 200 Success */ ImageListResponse[];
export type GetPortalVmImageListByDatacenterIdApiArg = {
  datacenterId: number;
};
export type GetPortalVmIsoListByDatacenterIdApiResponse =
  /** status 200 Success */ IsoListResponse[];
export type GetPortalVmIsoListByDatacenterIdApiArg = {
  datacenterId: number;
};
export type PutPortalVmIsoMountApiResponse = unknown;
export type PutPortalVmIsoMountApiArg = {
  mountModel: MountModel;
};
export type PutPortalVmIsoUnmountApiResponse = unknown;
export type PutPortalVmIsoUnmountApiArg = {
  unmountModel: UnmountModel;
};
export type GetPortalVmVpcHostListApiResponse =
  /** status 200 Success */ VpcListResponse[];
export type GetPortalVmVpcHostListApiArg = void;
export type PostPortalVmVpcHostCreateApiResponse = unknown;
export type PostPortalVmVpcHostCreateApiArg = {
  createVpcHostModel: CreateVpcHostModel;
};
export type GetPortalVmVpcNetworkListByVpcHostIdApiResponse =
  /** status 200 Success */ VpcNetworkListResponse[];
export type GetPortalVmVpcNetworkListByVpcHostIdApiArg = {
  vpcHostId: number;
};
export type PostPortalVmVpcNetworkCreateApiResponse = unknown;
export type PostPortalVmVpcNetworkCreateApiArg = {
  createVpcNetworkModel: CreateVpcNetworkModel;
};
export type GetPortalPanelWalletListApiResponse =
  /** status 200 Success */ WalletListResponse[];
export type GetPortalPanelWalletListApiArg = void;
export type GetPortalPanelWalletGetBalanceApiResponse =
  /** status 200 Success */ number;
export type GetPortalPanelWalletGetBalanceApiArg = void;
export type GetPortalPanelWalletPaymentListApiResponse =
  /** status 200 Success */ WalletPaymentListResponse[];
export type GetPortalPanelWalletPaymentListApiArg = void;
export type GetPortalPanelWalletPaymentGetByIdApiResponse =
  /** status 200 Success */ WalletPaymentListResponse;
export type GetPortalPanelWalletPaymentGetByIdApiArg = {
  id: number;
};
export type PostPortalPanelWalletPaymentCreateApiResponse =
  /** status 200 Success */ CreateWalletPaymentResponse;
export type PostPortalPanelWalletPaymentCreateApiArg = {
  createWalletPaymentModel: CreateWalletPaymentModel;
};
export type PostPortalPanelWalletPaymentPecCallBackApiResponse = unknown;
export type PostPortalPanelWalletPaymentPecCallBackApiArg = {
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
export type PostPortalPanelWalletPaymentSepCallBackApiResponse = unknown;
export type PostPortalPanelWalletPaymentSepCallBackApiArg = {
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
export type GetPortalWebWebHostListApiResponse =
  /** status 200 Success */ WebHostListResponse[];
export type GetPortalWebWebHostListApiArg = void;
export type GetPortalWebWebHostGetByIdApiResponse =
  /** status 200 Success */ GetWebHostResponse;
export type GetPortalWebWebHostGetByIdApiArg = {
  id: number;
};
export type GetPortalWebWebHostGetLoginSessionByIdApiResponse =
  /** status 200 Success */ GetLoginSessionResponse;
export type GetPortalWebWebHostGetLoginSessionByIdApiArg = {
  id: number;
};
export type PostPortalWebWebHostCheckDomainApiResponse = unknown;
export type PostPortalWebWebHostCheckDomainApiArg = {
  checkWebHostDomainModel: CheckWebHostDomainModel;
};
export type PostPortalWebWebHostCreateApiResponse = unknown;
export type PostPortalWebWebHostCreateApiArg = {
  createWebHostModel: CreateWebHostModel;
};
export type PutPortalWebWebHostEditApiResponse = unknown;
export type PutPortalWebWebHostEditApiArg = {
  editWebHostModel: EditWebHostModel;
};
export type DeletePortalWebWebHostDeleteByIdApiResponse = unknown;
export type DeletePortalWebWebHostDeleteByIdApiArg = {
  id: number;
};
export type PostPortalDomainWhoisGetApiResponse = unknown;
export type PostPortalDomainWhoisGetApiArg = {
  getDomainWhoisModel: GetDomainWhoisModel;
};
export type LoginResponse = {
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
export type BillListResponse = {
  id?: number;
  billDate?: string;
  netPrice?: number;
  vat?: number;
  totalPrice?: number;
};
export type BillItemsModel = {
  productCategory?: string | null;
  userProduct?: string | null;
  createDate?: string;
  price?: number;
  duration?: number;
};
export type GetBillResponse = {
  id?: number;
  name?: string | null;
  billDate?: string;
  netPrice?: number;
  vat?: number;
  totalPrice?: number;
  billItems?: BillItemsModel[] | null;
};
export type BusinessUnitListResponse = {
  id?: number;
  name?: string | null;
};
export type CalculateMonthListResponse = {
  id?: number;
  name?: string | null;
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
export type GetCdnCertResponse = {
  issuer?: string | null;
  commonName?: string | null;
  expirationDate?: string | null;
};
export type CreateCdnClientUserCertModel = {
  zoneName: string;
  keyPem: string;
  certPem: string;
};
export type CreateCdnEdgeCertModel = {
  zoneName: string;
};
export type CreateCdnEdgeUserCertModel = {
  zoneName: string;
  keyPem: string;
  certPem: string;
  bundleCertPem?: string | null;
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
export type GetUserAnalyticsResponse = {
  data?: number[] | null;
  name?: string | null;
};
export type BillShortListResponse = {
  id?: number;
  billDate?: string;
  totalPrice?: number;
};
export type SupportShortListResponse = {
  id?: number;
  supportDate?: string;
  supportSubject?: string | null;
  supportStatus?: string | null;
};
export type DatacenterListResponse = {
  id?: number;
  name?: string | null;
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
  zoneName: string;
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
  zoneName: string;
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
export type HostProductListResponse = {
  id?: number;
  name?: string | null;
  productName?: string | null;
  status?: string | null;
  createDate?: string;
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
export type KubeNamespaceListResponse = {
  id?: number;
  datacenter?: string | null;
  name?: string | null;
  status?: string | null;
  statusId?: number;
  createDate?: string;
  expireDate?: string | null;
};
export type GetKubeNamespaceResponse = {
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
export type GetLoginNamespaceResponse = {
  location?: string | null;
};
export type CreateKubeNamespaceModel = {
  name: string;
  datacenterId?: number;
  productBundleId?: number;
};
export type EditKubeNamespaceModel = {
  id?: number;
  productBundleId?: number;
};
export type KubeUserListResponse = {
  id?: number;
  email?: string | null;
  userName?: string | null;
  createDate?: string;
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
  createDate?: string;
};
export type CreateKubeVolumeModel = {
  kubeHostId?: number;
  name: string;
  capacity: string;
};
export type KubeWorkspaceListResponse = {
  id?: number;
  datacenter?: string | null;
  name?: string | null;
  status?: string | null;
  statusId?: number;
  createDate?: string;
  expireDate?: string | null;
};
export type GetKubeWorkspaceResponse = {
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
export type GetLoginKubeWorkspaceResponse = {
  location?: string | null;
};
export type CreateKubeWorkspaceModel = {
  name: string;
  datacenterId?: number;
  productBundleId?: number;
};
export type EditKubeWorkspaceModel = {
  id?: number;
  productBundleId?: number;
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
  status?: string | null;
  statusId?: number;
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
  isPublic?: boolean;
  public?: string | null;
  createDate?: string;
  expireDate?: string | null;
};
export type CreateStorageHostModel = {
  name: string;
  isPublic?: boolean;
  datacenterId?: number;
  productBundleId?: number;
};
export type EditStorageHostModel = {
  id?: number;
  productBundleId?: number;
};
export type SupportListResponse = {
  id?: number;
  supportDate?: string;
  supportSubject?: string | null;
  businessUnit?: string | null;
  supportStatus?: string | null;
  supportStatusId?: number;
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
  hostProductId?: number;
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
  productBundleId: number;
  datacenterId: number;
  cpu?: number;
  memory?: number;
  disk?: number;
  ip?: number;
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
export type CreateWalletPaymentModel = {
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
export const {
  usePostPortalAccountLoginMutation,
  usePostPortalAccountRegisterMutation,
  usePostPortalAccountForgotMutation,
  usePostPortalAccountForgotConfirmMutation,
  usePostPortalAccountLogoutMutation,
  useGetPortalCdnAnalyticGetByZoneNameAndPeriodIdQuery,
  useGetPortalCdnApiGatewayListByZoneNameQuery,
  useGetPortalCdnApiGatewayGetByIdQuery,
  usePostPortalCdnApiGatewayCreateMutation,
  usePutPortalCdnApiGatewayEditMutation,
  useDeletePortalCdnApiGatewayDeleteByIdMutation,
  useGetPortalPanelBillListQuery,
  useGetPortalPanelBillGetByIdQuery,
  useGetPortalPanelBillDownloadByIdQuery,
  useGetPortalPanelBusinessUnitListQuery,
  useGetPortalPanelCalculateMonthListQuery,
  useGetPortalCdnCdnListQuery,
  useGetPortalCdnCdnGetByZoneNameQuery,
  useGetPortalCdnCdnGetNsStatusByZoneNameQuery,
  useGetPortalCdnCdnOverviewByZoneNameQuery,
  usePostPortalCdnCdnCheckZoneMutation,
  usePostPortalCdnCdnCreateMutation,
  useDeletePortalCdnCdnDeleteByIdMutation,
  usePutPortalCdnCdnChangeCdnTypeMutation,
  usePutPortalCdnCdnChangeClientCertTypeMutation,
  usePutPortalCdnCdnChangeEdgeCertTypeMutation,
  usePutPortalCdnCdnChangeHstsMutation,
  usePutPortalCdnCdnChangeHttpsRedirectMutation,
  usePutPortalCdnCdnChangeNonWwwRedirectMutation,
  useGetPortalCdnClientCertGetByZoneNameQuery,
  useGetPortalCdnClientCertGetUserCertByZoneNameQuery,
  usePostPortalCdnClientCertCreateUserCertMutation,
  useGetPortalCdnEdgeCertGetByZoneNameQuery,
  useGetPortalCdnEdgeCertGetUserCertByZoneNameQuery,
  usePostPortalCdnEdgeCertCreateMutation,
  usePostPortalCdnEdgeCertCreateUserCertMutation,
  useGetPortalPanelCommissionListQuery,
  useGetPortalPanelCustomerGetQuery,
  usePutPortalPanelCustomerEditMutation,
  usePutPortalPanelCustomerEditCustomerTypeMutation,
  useGetPortalPanelDashboardGetUserAnalyticsByCategoryIdQuery,
  useGetPortalPanelDashboardBillShortListQuery,
  useGetPortalPanelDashboardSupportShortListQuery,
  useGetPortalVmDatacenterListQuery,
  useGetPortalCdnDnsRecordListByZoneNameQuery,
  useGetPortalCdnDnsRecordGetByIdQuery,
  usePostPortalCdnDnsRecordCreateMutation,
  usePutPortalCdnDnsRecordEditMutation,
  useDeletePortalCdnDnsRecordDeleteByIdMutation,
  usePutPortalCdnDnsRecordChangeProxyStatusByIdMutation,
  useGetPortalDomainListQuery,
  useGetPortalDomainGetByIdQuery,
  useGetPortalDomainGetStatusByIdQuery,
  usePostPortalDomainGetPriceMutation,
  usePostPortalDomainRegisterMutation,
  useDeletePortalDomainDeleteByIdMutation,
  usePutPortalDomainChangeContactMutation,
  usePutPortalDomainChangeNsMutation,
  usePostPortalDomainResendVerificationByIdMutation,
  useGetPortalIndexQuery,
  useGetPortalHandshakeQuery,
  useGetPortalPanelHostProductListByProductCategoryIdQuery,
  useGetPortalPanelInvoiceListQuery,
  useGetPortalPanelInvoiceGetByIdQuery,
  useGetPortalKubeDevopsListByIdQuery,
  useGetPortalKubeDevopsGetByIdQuery,
  usePostPortalKubeDevopsCreateMutation,
  useDeletePortalKubeDevopsDeleteByIdMutation,
  useGetPortalKubeServiceListByIdQuery,
  useGetPortalKubeServiceGetByIdQuery,
  usePostPortalKubeServiceCreateMutation,
  useDeletePortalKubeServiceDeleteByIdMutation,
  useGetPortalKubeNamespaceListQuery,
  useGetPortalKubeNamespaceGetByIdQuery,
  useGetPortalKubeNamespaceGetLoginSessionByIdQuery,
  usePostPortalKubeNamespaceCreateMutation,
  usePutPortalKubeNamespaceChangeServiceMutation,
  useDeletePortalKubeNamespaceDeleteByIdMutation,
  useGetPortalKubeUserListByKubeHostIdQuery,
  usePostPortalKubeUserCreateMutation,
  useDeletePortalKubeUserDeleteByIdMutation,
  usePostPortalKubeUserChangePasswordMutation,
  useGetPortalKubeUserRoleListByKubeHostIdQuery,
  usePostPortalKubeUserRoleCreateMutation,
  useDeletePortalKubeUserRoleDeleteByIdMutation,
  useGetPortalKubeVolumeListByIdQuery,
  useGetPortalKubeVolumeGetByIdQuery,
  usePostPortalKubeVolumeCreateMutation,
  useDeletePortalKubeVolumeDeleteByIdMutation,
  useGetPortalKubeWorkspaceListQuery,
  useGetPortalKubeWorkspaceGetByIdQuery,
  useGetPortalKubeWorkspaceGetLoginSessionByIdQuery,
  usePostPortalKubeWorkspaceCreateMutation,
  usePutPortalKubeWorkspaceChangeServiceMutation,
  useDeletePortalKubeWorkspaceDeleteByIdMutation,
  useGetPortalCdnLoadBalanceListByZoneNameQuery,
  useGetPortalCdnLoadBalanceGetByIdQuery,
  usePostPortalCdnLoadBalanceCreateMutation,
  usePutPortalCdnLoadBalanceEditMutation,
  useDeletePortalCdnLoadBalanceDeleteByIdMutation,
  useGetPortalPanelLogSmsReceiveByFromAndTextToQuery,
  useGetPortalPanelNotificationListQuery,
  useGetPortalPanelNotificationShortListQuery,
  useGetPortalPanelOrderListQuery,
  useGetPortalPanelOrderGetByIdQuery,
  usePutPortalPanelOrderPaymentTypeMutation,
  usePutPortalPanelOrderDurationMutation,
  usePutPortalPanelOrderVoucherMutation,
  usePostPortalPanelOrderPayMutation,
  useGetPortalPanelOrderPlanListQuery,
  usePostPortalPanelOrderPlanOrderMutation,
  useGetPortalPanelProductBundleListByProductCategoryIdQuery,
  useGetPortalPanelProductCategoryListQuery,
  useGetPortalPanelProfileGetQuery,
  usePostPortalPanelProfileGetNotificationStatusMutation,
  usePutPortalPanelProfileEditMutation,
  usePutPortalPanelProfileEditEmailMutation,
  usePostPortalPanelProfileConfirmEmailMutation,
  usePutPortalPanelProfileEditPhoneNumberMutation,
  usePostPortalPanelProfileConfirmPhoneNumberMutation,
  usePutPortalPanelProfileEditEmailNotificationMutation,
  usePutPortalPanelProfileEditPhoneNotificationMutation,
  usePostPortalPanelProfileChangePasswordMutation,
  useGetPortalRabbitRabbitHostListQuery,
  useGetPortalRabbitRabbitHostGetByIdQuery,
  usePostPortalRabbitRabbitHostCreateMutation,
  usePutPortalRabbitRabbitHostChangeServiceMutation,
  useDeletePortalRabbitRabbitHostDeleteByIdMutation,
  usePostPortalRabbitRabbitHostChangeExchangeMutation,
  useGetPortalRabbitRabbitUserListByRabbitHostIdQuery,
  usePostPortalRabbitRabbitUserCreateMutation,
  useDeletePortalRabbitRabbitUserDeleteByIdMutation,
  usePostPortalRabbitRabbitUserChangePasswordMutation,
  useGetPortalPanelReferralGetQuery,
  usePostPortalPanelReferralJoinMutation,
  useGetPortalStorageStorageHostListQuery,
  useGetPortalStorageStorageHostGetByIdQuery,
  usePostPortalStorageStorageHostCreateMutation,
  usePutPortalStorageStorageHostEditMutation,
  useDeletePortalStorageStorageHostDeleteByIdMutation,
  useGetPortalPanelSupportListQuery,
  usePostPortalPanelSupportCreateMutation,
  useGetPortalPanelSupportItemListBySupportIdQuery,
  usePostPortalPanelSupportItemCreateMutation,
  useGetPortalPanelSupportItemDownloadByIdQuery,
  useGetPortalPanelSupportSubjectListQuery,
  usePostPortalPanelSupportSubjectSelectListMutation,
  useGetPortalPanelUserApiKeyListQuery,
  usePostPortalPanelUserApiKeyCreateMutation,
  useDeletePortalPanelUserApiKeyDeleteByIdMutation,
  useGetPortalVmVmListQuery,
  useGetPortalVmVmGetByIdQuery,
  usePostPortalVmVmCreateMutation,
  usePutPortalVmVmEditMutation,
  useDeletePortalVmVmDeleteByIdMutation,
  usePutPortalVmVmRebuildMutation,
  usePutPortalVmVmConnectByIdMutation,
  usePutPortalVmVmDisconnectByIdMutation,
  usePutPortalVmVmRebootByIdMutation,
  usePutPortalVmVmShutdownByIdMutation,
  usePutPortalVmVmResetByIdMutation,
  usePutPortalVmVmStartByIdMutation,
  usePutPortalVmVmStopByIdMutation,
  useGetPortalVmVmIpListByVmIdQuery,
  usePostPortalVmVmIpCreateMutation,
  useDeletePortalVmVmIpDeleteByIdMutation,
  usePostPortalVmVmKmsGetMutation,
  useGetPortalVmImageListByDatacenterIdQuery,
  useGetPortalVmIsoListByDatacenterIdQuery,
  usePutPortalVmIsoMountMutation,
  usePutPortalVmIsoUnmountMutation,
  useGetPortalVmVpcHostListQuery,
  usePostPortalVmVpcHostCreateMutation,
  useGetPortalVmVpcNetworkListByVpcHostIdQuery,
  usePostPortalVmVpcNetworkCreateMutation,
  useGetPortalPanelWalletListQuery,
  useGetPortalPanelWalletGetBalanceQuery,
  useGetPortalPanelWalletPaymentListQuery,
  useGetPortalPanelWalletPaymentGetByIdQuery,
  usePostPortalPanelWalletPaymentCreateMutation,
  usePostPortalPanelWalletPaymentPecCallBackMutation,
  usePostPortalPanelWalletPaymentSepCallBackMutation,
  useGetPortalWebWebHostListQuery,
  useGetPortalWebWebHostGetByIdQuery,
  useGetPortalWebWebHostGetLoginSessionByIdQuery,
  usePostPortalWebWebHostCheckDomainMutation,
  usePostPortalWebWebHostCreateMutation,
  usePutPortalWebWebHostEditMutation,
  useDeletePortalWebWebHostDeleteByIdMutation,
  usePostPortalDomainWhoisGetMutation,
} = api;

