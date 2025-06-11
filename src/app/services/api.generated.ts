import { api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
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
    postApiMyAccountProfileEnableTotp: build.mutation<
      PostApiMyAccountProfileEnableTotpApiResponse,
      PostApiMyAccountProfileEnableTotpApiArg
    >({
      query: () => ({
        url: `/api/my/account/profile/enable-totp`,
        method: "POST",
      }),
    }),
    postApiMyAccountProfileEnableTotpConfirm: build.mutation<
      PostApiMyAccountProfileEnableTotpConfirmApiResponse,
      PostApiMyAccountProfileEnableTotpConfirmApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/profile/enable-totp-confirm`,
        method: "POST",
        body: queryArg.totpTwoFactorModel,
      }),
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
    postApiMyAccountProfileDisableTotp: build.mutation<
      PostApiMyAccountProfileDisableTotpApiResponse,
      PostApiMyAccountProfileDisableTotpApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/profile/disable-totp`,
        method: "POST",
        body: queryArg.totpTwoFactorModel,
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
    getApiMyAccountCustomerUserList: build.query<
      GetApiMyAccountCustomerUserListApiResponse,
      GetApiMyAccountCustomerUserListApiArg
    >({
      query: () => ({ url: `/api/my/account/customer-user/list` }),
    }),
    getApiMyAccountCustomerUserGetById: build.query<
      GetApiMyAccountCustomerUserGetByIdApiResponse,
      GetApiMyAccountCustomerUserGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/customer-user/get/${queryArg.id}`,
      }),
    }),
    deleteApiMyAccountCustomerUserDeleteById: build.mutation<
      DeleteApiMyAccountCustomerUserDeleteByIdApiResponse,
      DeleteApiMyAccountCustomerUserDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/customer-user/delete/${queryArg.id}`,
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
    getApiMyAccountLoginGoogleUrl: build.query<
      GetApiMyAccountLoginGoogleUrlApiResponse,
      GetApiMyAccountLoginGoogleUrlApiArg
    >({
      query: () => ({ url: `/api/my/account/login-google-url` }),
    }),
    getApiMyAccountLoginGoogleCallback: build.query<
      GetApiMyAccountLoginGoogleCallbackApiResponse,
      GetApiMyAccountLoginGoogleCallbackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/account/login-google-callback`,
        params: {
          code: queryArg.code,
        },
      }),
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
    getApiMyBareMetalImageList: build.query<
      GetApiMyBareMetalImageListApiResponse,
      GetApiMyBareMetalImageListApiArg
    >({
      query: () => ({ url: `/api/my/bare-metal/image/list` }),
    }),
    getApiMyBareMetalByProjectIdHostList: build.query<
      GetApiMyBareMetalByProjectIdHostListApiResponse,
      GetApiMyBareMetalByProjectIdHostListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/bare-metal/${queryArg.projectId}/host/list`,
      }),
    }),
    getApiMyBareMetalByProjectIdHostGetAndId: build.query<
      GetApiMyBareMetalByProjectIdHostGetAndIdApiResponse,
      GetApiMyBareMetalByProjectIdHostGetAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/bare-metal/${queryArg.projectId}/host/get/${queryArg.id}`,
      }),
    }),
    deleteApiMyBareMetalByProjectIdHostDeleteAndId: build.mutation<
      DeleteApiMyBareMetalByProjectIdHostDeleteAndIdApiResponse,
      DeleteApiMyBareMetalByProjectIdHostDeleteAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/bare-metal/${queryArg.projectId}/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyBareMetalByProjectIdHostCreate: build.mutation<
      PostApiMyBareMetalByProjectIdHostCreateApiResponse,
      PostApiMyBareMetalByProjectIdHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/bare-metal/${queryArg.projectId}/host/create`,
        method: "POST",
        body: queryArg.createBareMetalModel,
      }),
    }),
    getApiMyColocationByProjectIdHostList: build.query<
      GetApiMyColocationByProjectIdHostListApiResponse,
      GetApiMyColocationByProjectIdHostListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/colocation/${queryArg.projectId}/host/list`,
      }),
    }),
    getApiMyColocationByProjectIdHostGetAndId: build.query<
      GetApiMyColocationByProjectIdHostGetAndIdApiResponse,
      GetApiMyColocationByProjectIdHostGetAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/colocation/${queryArg.projectId}/host/get/${queryArg.id}`,
      }),
    }),
    deleteApiMyColocationByProjectIdHostDeleteAndId: build.mutation<
      DeleteApiMyColocationByProjectIdHostDeleteAndIdApiResponse,
      DeleteApiMyColocationByProjectIdHostDeleteAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/colocation/${queryArg.projectId}/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyColocationByProjectIdHostCreate: build.mutation<
      PostApiMyColocationByProjectIdHostCreateApiResponse,
      PostApiMyColocationByProjectIdHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/colocation/${queryArg.projectId}/host/create`,
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
    getApiMyDnsCdnByProjectIdWebHostList: build.query<
      GetApiMyDnsCdnByProjectIdWebHostListApiResponse,
      GetApiMyDnsCdnByProjectIdWebHostListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/web-host/list`,
      }),
    }),
    getApiMyDnsCdnByProjectIdWebHostGetLoginSessionAndId: build.query<
      GetApiMyDnsCdnByProjectIdWebHostGetLoginSessionAndIdApiResponse,
      GetApiMyDnsCdnByProjectIdWebHostGetLoginSessionAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/web-host/get-login-session/${queryArg.id}`,
      }),
    }),
    getApiMyDnsCdnByProjectIdWebHostGetAndId: build.query<
      GetApiMyDnsCdnByProjectIdWebHostGetAndIdApiResponse,
      GetApiMyDnsCdnByProjectIdWebHostGetAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/web-host/get/${queryArg.id}`,
      }),
    }),
    putApiMyDnsCdnByProjectIdWebHostEditAndId: build.mutation<
      PutApiMyDnsCdnByProjectIdWebHostEditAndIdApiResponse,
      PutApiMyDnsCdnByProjectIdWebHostEditAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/web-host/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editWebHostModel,
      }),
    }),
    deleteApiMyDnsCdnByProjectIdWebHostDeleteAndId: build.mutation<
      DeleteApiMyDnsCdnByProjectIdWebHostDeleteAndIdApiResponse,
      DeleteApiMyDnsCdnByProjectIdWebHostDeleteAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/web-host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyDnsCdnByProjectIdWebHostCreate: build.mutation<
      PostApiMyDnsCdnByProjectIdWebHostCreateApiResponse,
      PostApiMyDnsCdnByProjectIdWebHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/web-host/create`,
        method: "POST",
        body: queryArg.createWebHostModel,
      }),
    }),
    postApiMyDnsCdnByProjectIdWebHostCheckDomain: build.mutation<
      PostApiMyDnsCdnByProjectIdWebHostCheckDomainApiResponse,
      PostApiMyDnsCdnByProjectIdWebHostCheckDomainApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/web-host/check-domain`,
        method: "POST",
        body: queryArg.checkWebHostDomainModel,
      }),
    }),
    getApiMyDnsCdnByProjectIdHostList: build.query<
      GetApiMyDnsCdnByProjectIdHostListApiResponse,
      GetApiMyDnsCdnByProjectIdHostListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/list`,
      }),
    }),
    getApiMyDnsCdnByProjectIdHostGetNsAndId: build.query<
      GetApiMyDnsCdnByProjectIdHostGetNsAndIdApiResponse,
      GetApiMyDnsCdnByProjectIdHostGetNsAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/get-ns/${queryArg.id}`,
      }),
    }),
    getApiMyDnsCdnByProjectIdHostGetAnalyticAndId: build.query<
      GetApiMyDnsCdnByProjectIdHostGetAnalyticAndIdApiResponse,
      GetApiMyDnsCdnByProjectIdHostGetAnalyticAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/get-analytic/${queryArg.id}`,
        body: queryArg.getAnalyticModel,
      }),
    }),
    getApiMyDnsCdnByProjectIdHostGetAndId: build.query<
      GetApiMyDnsCdnByProjectIdHostGetAndIdApiResponse,
      GetApiMyDnsCdnByProjectIdHostGetAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/get/${queryArg.id}`,
      }),
    }),
    deleteApiMyDnsCdnByProjectIdHostDeleteAndId: build.mutation<
      DeleteApiMyDnsCdnByProjectIdHostDeleteAndIdApiResponse,
      DeleteApiMyDnsCdnByProjectIdHostDeleteAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyDnsCdnByProjectIdHostCreate: build.mutation<
      PostApiMyDnsCdnByProjectIdHostCreateApiResponse,
      PostApiMyDnsCdnByProjectIdHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/create`,
        method: "POST",
        body: queryArg.createDnsCdnModel,
      }),
    }),
    postApiMyDnsCdnByProjectIdHostCheck: build.mutation<
      PostApiMyDnsCdnByProjectIdHostCheckApiResponse,
      PostApiMyDnsCdnByProjectIdHostCheckApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/check`,
        method: "POST",
        body: queryArg.checkDnsCdnModel,
      }),
    }),
    putApiMyDnsCdnByProjectIdHostChangeOriginCertTypeAndId: build.mutation<
      PutApiMyDnsCdnByProjectIdHostChangeOriginCertTypeAndIdApiResponse,
      PutApiMyDnsCdnByProjectIdHostChangeOriginCertTypeAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/change-origin-cert-type/${queryArg.id}`,
        method: "PUT",
        body: queryArg.changeOriginCertTypeModel,
      }),
    }),
    putApiMyDnsCdnByProjectIdHostChangeNonWwwRedirectAndId: build.mutation<
      PutApiMyDnsCdnByProjectIdHostChangeNonWwwRedirectAndIdApiResponse,
      PutApiMyDnsCdnByProjectIdHostChangeNonWwwRedirectAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/change-non-www-redirect/${queryArg.id}`,
        method: "PUT",
        body: queryArg.changeNonWwwRedirectModel,
      }),
    }),
    putApiMyDnsCdnByProjectIdHostChangeHttpsRedirectAndId: build.mutation<
      PutApiMyDnsCdnByProjectIdHostChangeHttpsRedirectAndIdApiResponse,
      PutApiMyDnsCdnByProjectIdHostChangeHttpsRedirectAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/change-https-redirect/${queryArg.id}`,
        method: "PUT",
        body: queryArg.changeHttpsRedirectModel,
      }),
    }),
    putApiMyDnsCdnByProjectIdHostChangeHstsAndId: build.mutation<
      PutApiMyDnsCdnByProjectIdHostChangeHstsAndIdApiResponse,
      PutApiMyDnsCdnByProjectIdHostChangeHstsAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/change-hsts/${queryArg.id}`,
        method: "PUT",
        body: queryArg.changeHstsModel,
      }),
    }),
    putApiMyDnsCdnByProjectIdHostChangeEdgeCertTypeAndId: build.mutation<
      PutApiMyDnsCdnByProjectIdHostChangeEdgeCertTypeAndIdApiResponse,
      PutApiMyDnsCdnByProjectIdHostChangeEdgeCertTypeAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/change-edge-cert-type/${queryArg.id}`,
        method: "PUT",
        body: queryArg.changeEdgeCertTypeModel,
      }),
    }),
    putApiMyDnsCdnByProjectIdHostChangeCdnTypeAndId: build.mutation<
      PutApiMyDnsCdnByProjectIdHostChangeCdnTypeAndIdApiResponse,
      PutApiMyDnsCdnByProjectIdHostChangeCdnTypeAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/change-cdn-type/${queryArg.id}`,
        method: "PUT",
        body: queryArg.changeCdnTypeModel,
      }),
    }),
    postApiMyDnsCdnByProjectIdDomainResendVerificationAndId: build.mutation<
      PostApiMyDnsCdnByProjectIdDomainResendVerificationAndIdApiResponse,
      PostApiMyDnsCdnByProjectIdDomainResendVerificationAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/domain/resend-verification/${queryArg.id}`,
        method: "POST",
      }),
    }),
    postApiMyDnsCdnByProjectIdDomainRegister: build.mutation<
      PostApiMyDnsCdnByProjectIdDomainRegisterApiResponse,
      PostApiMyDnsCdnByProjectIdDomainRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/domain/register`,
        method: "POST",
        body: queryArg.registerDomainModel,
      }),
    }),
    getApiMyDnsCdnByProjectIdDomainList: build.query<
      GetApiMyDnsCdnByProjectIdDomainListApiResponse,
      GetApiMyDnsCdnByProjectIdDomainListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/domain/list`,
      }),
    }),
    getApiMyDnsCdnByProjectIdDomainGetStatusAndId: build.query<
      GetApiMyDnsCdnByProjectIdDomainGetStatusAndIdApiResponse,
      GetApiMyDnsCdnByProjectIdDomainGetStatusAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/domain/get-status/${queryArg.id}`,
      }),
    }),
    getApiMyDnsCdnByProjectIdDomainGetAndId: build.query<
      GetApiMyDnsCdnByProjectIdDomainGetAndIdApiResponse,
      GetApiMyDnsCdnByProjectIdDomainGetAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/domain/get/${queryArg.id}`,
      }),
    }),
    deleteApiMyDnsCdnByProjectIdDomainDeleteAndId: build.mutation<
      DeleteApiMyDnsCdnByProjectIdDomainDeleteAndIdApiResponse,
      DeleteApiMyDnsCdnByProjectIdDomainDeleteAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/domain/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyDnsCdnByProjectIdDomainCheckDomain: build.mutation<
      PostApiMyDnsCdnByProjectIdDomainCheckDomainApiResponse,
      PostApiMyDnsCdnByProjectIdDomainCheckDomainApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/domain/check-domain`,
        method: "POST",
        body: queryArg.checkDomainModel,
      }),
    }),
    putApiMyDnsCdnByProjectIdDomainChangeNsAndId: build.mutation<
      PutApiMyDnsCdnByProjectIdDomainChangeNsAndIdApiResponse,
      PutApiMyDnsCdnByProjectIdDomainChangeNsAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/domain/change-ns/${queryArg.id}`,
        method: "PUT",
        body: queryArg.changeNsModel,
      }),
    }),
    putApiMyDnsCdnByProjectIdDomainChangeContactAndId: build.mutation<
      PutApiMyDnsCdnByProjectIdDomainChangeContactAndIdApiResponse,
      PutApiMyDnsCdnByProjectIdDomainChangeContactAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/domain/change-contact/${queryArg.id}`,
        method: "PUT",
        body: queryArg.changeContactModel,
      }),
    }),
    getApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordList: build.query<
      GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordListApiResponse,
      GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/dns-record/list`,
      }),
    }),
    getApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordGetId: build.query<
      GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordGetIdApiResponse,
      GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordGetIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/dns-record/get/${queryArg.id}`,
      }),
    }),
    putApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordEditId: build.mutation<
      PutApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordEditIdApiResponse,
      PutApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordEditIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/dns-record/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editDnsRecordModel,
      }),
    }),
    deleteApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordDeleteId:
      build.mutation<
        DeleteApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordDeleteIdApiResponse,
        DeleteApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordDeleteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/dns-record/delete/${queryArg.id}`,
          method: "DELETE",
        }),
      }),
    postApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordCreate:
      build.mutation<
        PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordCreateApiResponse,
        PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/dns-record/create`,
          method: "POST",
          body: queryArg.createDnsRecordModel,
        }),
      }),
    putApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordChangeProxyId:
      build.mutation<
        PutApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordChangeProxyIdApiResponse,
        PutApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordChangeProxyIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/dns-record/change-proxy/${queryArg.id}`,
          method: "PUT",
        }),
      }),
    getApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteList: build.query<
      GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteListApiResponse,
      GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/cdn-route/list`,
      }),
    }),
    getApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteGetId: build.query<
      GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteGetIdApiResponse,
      GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteGetIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/cdn-route/get/${queryArg.id}`,
      }),
    }),
    putApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteEditId: build.mutation<
      PutApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteEditIdApiResponse,
      PutApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteEditIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/cdn-route/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editCdnRouteModel,
      }),
    }),
    deleteApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteDeleteId:
      build.mutation<
        DeleteApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteDeleteIdApiResponse,
        DeleteApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteDeleteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/cdn-route/delete/${queryArg.id}`,
          method: "DELETE",
        }),
      }),
    getApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertGetUserCert:
      build.query<
        GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertGetUserCertApiResponse,
        GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertGetUserCertApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/origin-cert/get-user-cert`,
        }),
      }),
    getApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertGet: build.query<
      GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertGetApiResponse,
      GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/origin-cert/get`,
      }),
    }),
    postApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertCreateUserCert:
      build.mutation<
        PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertCreateUserCertApiResponse,
        PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertCreateUserCertApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/origin-cert/create-user-cert`,
          method: "POST",
          body: queryArg.createCdnOriginUserCertModel,
        }),
      }),
    getApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertGetUserCert:
      build.query<
        GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertGetUserCertApiResponse,
        GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertGetUserCertApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/edge-cert/get-user-cert`,
        }),
      }),
    getApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertGet: build.query<
      GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertGetApiResponse,
      GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/edge-cert/get`,
      }),
    }),
    postApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertCreateUserCert:
      build.mutation<
        PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertCreateUserCertApiResponse,
        PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertCreateUserCertApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/edge-cert/create-user-cert`,
          method: "POST",
          body: queryArg.createCdnEdgeUserCertModel,
        }),
      }),
    postApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertCreate: build.mutation<
      PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertCreateApiResponse,
      PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/dns-cdn/${queryArg.projectId}/host/${queryArg.dnsCdnHostId}/edge-cert/create`,
        method: "POST",
      }),
    }),
    getApiMyFinancialWalletCommissionList: build.query<
      GetApiMyFinancialWalletCommissionListApiResponse,
      GetApiMyFinancialWalletCommissionListApiArg
    >({
      query: () => ({ url: `/api/my/financial/wallet-commission/list` }),
    }),
    getApiMyFinancialWalletListDownload: build.query<
      GetApiMyFinancialWalletListDownloadApiResponse,
      GetApiMyFinancialWalletListDownloadApiArg
    >({
      query: () => ({ url: `/api/my/financial/wallet/list-download` }),
    }),
    getApiMyFinancialWalletList: build.query<
      GetApiMyFinancialWalletListApiResponse,
      GetApiMyFinancialWalletListApiArg
    >({
      query: () => ({ url: `/api/my/financial/wallet/list` }),
    }),
    getApiMyFinancialWalletUsageReportByPeriod: build.query<
      GetApiMyFinancialWalletUsageReportByPeriodApiResponse,
      GetApiMyFinancialWalletUsageReportByPeriodApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/wallet/usage-report/${queryArg.period}`,
      }),
    }),
    getApiMyFinancialWalletGetBalance: build.query<
      GetApiMyFinancialWalletGetBalanceApiResponse,
      GetApiMyFinancialWalletGetBalanceApiArg
    >({
      query: () => ({ url: `/api/my/financial/wallet/get-balance` }),
    }),
    postApiMyFinancialVoucherUse: build.mutation<
      PostApiMyFinancialVoucherUseApiResponse,
      PostApiMyFinancialVoucherUseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/voucher/use`,
        method: "POST",
        body: queryArg.useVoucherModel,
      }),
    }),
    getApiMyFinancialReferralListByReferralId: build.query<
      GetApiMyFinancialReferralListByReferralIdApiResponse,
      GetApiMyFinancialReferralListByReferralIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/referral/list/${queryArg.referralId}`,
      }),
    }),
    getApiMyFinancialReferralGet: build.query<
      GetApiMyFinancialReferralGetApiResponse,
      GetApiMyFinancialReferralGetApiArg
    >({
      query: () => ({ url: `/api/my/financial/referral/get` }),
    }),
    getApiMyFinancialPaymentProviderList: build.query<
      GetApiMyFinancialPaymentProviderListApiResponse,
      GetApiMyFinancialPaymentProviderListApiArg
    >({
      query: () => ({ url: `/api/my/financial/payment-provider/list` }),
    }),
    postApiMyFinancialPaymentSepCallBack: build.mutation<
      PostApiMyFinancialPaymentSepCallBackApiResponse,
      PostApiMyFinancialPaymentSepCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/payment/sep-call-back`,
        method: "POST",
        body: queryArg.sepCallbackModel,
      }),
    }),
    postApiMyFinancialPaymentPecCallBack: build.mutation<
      PostApiMyFinancialPaymentPecCallBackApiResponse,
      PostApiMyFinancialPaymentPecCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/payment/pec-call-back`,
        method: "POST",
        body: queryArg.pecConfirmCallRequest,
      }),
    }),
    getApiMyFinancialPaymentListDownload: build.query<
      GetApiMyFinancialPaymentListDownloadApiResponse,
      GetApiMyFinancialPaymentListDownloadApiArg
    >({
      query: () => ({ url: `/api/my/financial/payment/list-download` }),
    }),
    getApiMyFinancialPaymentList: build.query<
      GetApiMyFinancialPaymentListApiResponse,
      GetApiMyFinancialPaymentListApiArg
    >({
      query: () => ({ url: `/api/my/financial/payment/list` }),
    }),
    getApiMyFinancialPaymentGetById: build.query<
      GetApiMyFinancialPaymentGetByIdApiResponse,
      GetApiMyFinancialPaymentGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/payment/get/${queryArg.id}`,
      }),
    }),
    postApiMyFinancialPaymentBfaCallBack: build.mutation<
      PostApiMyFinancialPaymentBfaCallBackApiResponse,
      PostApiMyFinancialPaymentBfaCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/payment/bfa-call-back`,
        method: "POST",
        body: queryArg.fanavaConfirmRequest,
      }),
    }),
    postApiMyFinancialPaymentCreate: build.mutation<
      PostApiMyFinancialPaymentCreateApiResponse,
      PostApiMyFinancialPaymentCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/payment/create`,
        method: "POST",
        body: queryArg.createPaymentModel,
      }),
    }),
    postApiMyFinancialPaymentBpmCallBack: build.mutation<
      PostApiMyFinancialPaymentBpmCallBackApiResponse,
      PostApiMyFinancialPaymentBpmCallBackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/payment/bpm-call-back`,
        method: "POST",
        body: queryArg.bpmConfirmCallRequest,
      }),
    }),
    postApiMyFinancialOfferPay: build.mutation<
      PostApiMyFinancialOfferPayApiResponse,
      PostApiMyFinancialOfferPayApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/offer/pay`,
        method: "POST",
        body: queryArg.orderOfferPayModel,
      }),
    }),
    getApiMyFinancialOfferList: build.query<
      GetApiMyFinancialOfferListApiResponse,
      GetApiMyFinancialOfferListApiArg
    >({
      query: () => ({ url: `/api/my/financial/offer/list` }),
    }),
    getApiMyFinancialOfferGetById: build.query<
      GetApiMyFinancialOfferGetByIdApiResponse,
      GetApiMyFinancialOfferGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/offer/get/${queryArg.id}`,
      }),
    }),
    getApiMyFinancialOrderShortList: build.query<
      GetApiMyFinancialOrderShortListApiResponse,
      GetApiMyFinancialOrderShortListApiArg
    >({
      query: () => ({ url: `/api/my/financial/order/short-list` }),
    }),
    getApiMyFinancialOrderListByProductId: build.query<
      GetApiMyFinancialOrderListByProductIdApiResponse,
      GetApiMyFinancialOrderListByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/order/list/${queryArg.productId}`,
      }),
    }),
    getApiMyFinancialInvoiceUnpaid: build.query<
      GetApiMyFinancialInvoiceUnpaidApiResponse,
      GetApiMyFinancialInvoiceUnpaidApiArg
    >({
      query: () => ({ url: `/api/my/financial/invoice/unpaid` }),
    }),
    getApiMyFinancialInvoiceSummary: build.query<
      GetApiMyFinancialInvoiceSummaryApiResponse,
      GetApiMyFinancialInvoiceSummaryApiArg
    >({
      query: () => ({ url: `/api/my/financial/invoice/summary` }),
    }),
    postApiMyFinancialInvoicePay: build.mutation<
      PostApiMyFinancialInvoicePayApiResponse,
      PostApiMyFinancialInvoicePayApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/invoice/pay`,
        method: "POST",
        body: queryArg.payInvoiceModel,
      }),
    }),
    getApiMyFinancialInvoiceListDownload: build.query<
      GetApiMyFinancialInvoiceListDownloadApiResponse,
      GetApiMyFinancialInvoiceListDownloadApiArg
    >({
      query: () => ({ url: `/api/my/financial/invoice/list-download` }),
    }),
    getApiMyFinancialInvoiceList: build.query<
      GetApiMyFinancialInvoiceListApiResponse,
      GetApiMyFinancialInvoiceListApiArg
    >({
      query: () => ({ url: `/api/my/financial/invoice/list` }),
    }),
    getApiMyFinancialInvoiceGetById: build.query<
      GetApiMyFinancialInvoiceGetByIdApiResponse,
      GetApiMyFinancialInvoiceGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/invoice/get/${queryArg.id}`,
      }),
    }),
    getApiMyFinancialCalculateMonthList: build.query<
      GetApiMyFinancialCalculateMonthListApiResponse,
      GetApiMyFinancialCalculateMonthListApiArg
    >({
      query: () => ({ url: `/api/my/financial/calculate-month/list` }),
    }),
    getApiMyFinancialBillShortList: build.query<
      GetApiMyFinancialBillShortListApiResponse,
      GetApiMyFinancialBillShortListApiArg
    >({
      query: () => ({ url: `/api/my/financial/bill/short-list` }),
    }),
    getApiMyFinancialBillListDownloadById: build.query<
      GetApiMyFinancialBillListDownloadByIdApiResponse,
      GetApiMyFinancialBillListDownloadByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/bill/list-download/${queryArg.id}`,
      }),
    }),
    getApiMyFinancialBillList: build.query<
      GetApiMyFinancialBillListApiResponse,
      GetApiMyFinancialBillListApiArg
    >({
      query: () => ({ url: `/api/my/financial/bill/list` }),
    }),
    getApiMyFinancialBillGetById: build.query<
      GetApiMyFinancialBillGetByIdApiResponse,
      GetApiMyFinancialBillGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/financial/bill/get/${queryArg.id}`,
      }),
    }),
    getApiMyHomeIndex: build.query<
      GetApiMyHomeIndexApiResponse,
      GetApiMyHomeIndexApiArg
    >({
      query: () => ({ url: `/api/my/home/index` }),
    }),
    getApiMyInfraDatacenterList: build.query<
      GetApiMyInfraDatacenterListApiResponse,
      GetApiMyInfraDatacenterListApiArg
    >({
      query: () => ({ url: `/api/my/infra/datacenter/list` }),
    }),
    getApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretList: build.query<
      GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretListApiResponse,
      GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/secret/list`,
      }),
    }),
    getApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretGetId:
      build.query<
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretGetIdApiResponse,
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretGetIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/secret/get/${queryArg.id}`,
        }),
      }),
    putApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretEditId:
      build.mutation<
        PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretEditIdApiResponse,
        PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretEditIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/secret/edit/${queryArg.id}`,
          method: "PUT",
          body: queryArg.editKuberSecretModel,
        }),
      }),
    deleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretDeleteId:
      build.mutation<
        DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretDeleteIdApiResponse,
        DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretDeleteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/secret/delete/${queryArg.id}`,
          method: "DELETE",
        }),
      }),
    postApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretCreate:
      build.mutation<
        PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretCreateApiResponse,
        PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/secret/create`,
          method: "POST",
          body: queryArg.createKuberSecretModel,
        }),
      }),
    getApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressList:
      build.query<
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressListApiResponse,
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressListApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/ingress/list`,
        }),
      }),
    putApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleEditId:
      build.mutation<
        PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleEditIdApiResponse,
        PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleEditIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/ingress/${queryArg.kuberIngressId}/rule/edit/${queryArg.id}`,
          method: "PUT",
          body: queryArg.editKuberIngressRuleModel,
        }),
      }),
    deleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleDeleteId:
      build.mutation<
        DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleDeleteIdApiResponse,
        DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleDeleteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/ingress/${queryArg.kuberIngressId}/rule/delete/${queryArg.id}`,
          method: "DELETE",
        }),
      }),
    postApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleCreate:
      build.mutation<
        PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleCreateApiResponse,
        PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/ingress/${queryArg.kuberIngressId}/rule/create`,
          method: "POST",
          body: queryArg.createKuberIngressRuleModel,
        }),
      }),
    getApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressGetId:
      build.query<
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressGetIdApiResponse,
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressGetIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/ingress/get/${queryArg.id}`,
        }),
      }),
    deleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressDeleteId:
      build.mutation<
        DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressDeleteIdApiResponse,
        DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressDeleteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/ingress/delete/${queryArg.id}`,
          method: "DELETE",
        }),
      }),
    postApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressCreate:
      build.mutation<
        PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressCreateApiResponse,
        PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/ingress/create`,
          method: "POST",
          body: queryArg.createKuberIngressModel,
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
    getApiMyKubernetesCloudByProjectIdHostList: build.query<
      GetApiMyKubernetesCloudByProjectIdHostListApiResponse,
      GetApiMyKubernetesCloudByProjectIdHostListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/list`,
      }),
    }),
    getApiMyKubernetesCloudByProjectIdHostGetAndId: build.query<
      GetApiMyKubernetesCloudByProjectIdHostGetAndIdApiResponse,
      GetApiMyKubernetesCloudByProjectIdHostGetAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/get/${queryArg.id}`,
      }),
    }),
    putApiMyKubernetesCloudByProjectIdHostEditAndId: build.mutation<
      PutApiMyKubernetesCloudByProjectIdHostEditAndIdApiResponse,
      PutApiMyKubernetesCloudByProjectIdHostEditAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editKuberHostModel,
      }),
    }),
    deleteApiMyKubernetesCloudByProjectIdHostDeleteAndId: build.mutation<
      DeleteApiMyKubernetesCloudByProjectIdHostDeleteAndIdApiResponse,
      DeleteApiMyKubernetesCloudByProjectIdHostDeleteAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyKubernetesCloudByProjectIdHostCreate: build.mutation<
      PostApiMyKubernetesCloudByProjectIdHostCreateApiResponse,
      PostApiMyKubernetesCloudByProjectIdHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/create`,
        method: "POST",
        body: queryArg.createKuberHostModel,
      }),
    }),
    getApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallList:
      build.query<
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallListApiResponse,
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallListApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/firewall/list`,
        }),
      }),
    deleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallDeleteId:
      build.mutation<
        DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallDeleteIdApiResponse,
        DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallDeleteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/firewall/delete/${queryArg.id}`,
          method: "DELETE",
        }),
      }),
    postApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallCreate:
      build.mutation<
        PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallCreateApiResponse,
        PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/firewall/create`,
          method: "POST",
          body: queryArg.createKuberFirewallModel,
        }),
      }),
    getApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployPortList:
      build.query<
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployPortListApiResponse,
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployPortListApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/deploy/port-list`,
        }),
      }),
    getApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployList: build.query<
      GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployListApiResponse,
      GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/deploy/list`,
      }),
    }),
    getApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployGetId:
      build.query<
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployGetIdApiResponse,
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployGetIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/deploy/get/${queryArg.id}`,
        }),
      }),
    putApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployEditId:
      build.mutation<
        PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployEditIdApiResponse,
        PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployEditIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/deploy/edit/${queryArg.id}`,
          method: "PUT",
          body: queryArg.editKuberDeployModel,
        }),
      }),
    getApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployKuberDeployIdEnvList:
      build.query<
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployKuberDeployIdEnvListApiResponse,
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployKuberDeployIdEnvListApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/deploy/${queryArg.kuberDeployId}/env/list`,
        }),
      }),
    getApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployKuberDeployIdEnvGetId:
      build.query<
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployKuberDeployIdEnvGetIdApiResponse,
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployKuberDeployIdEnvGetIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/deploy/${queryArg.kuberDeployId}/env/get/${queryArg.id}`,
        }),
      }),
    deleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployDeleteId:
      build.mutation<
        DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployDeleteIdApiResponse,
        DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployDeleteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/deploy/delete/${queryArg.id}`,
          method: "DELETE",
        }),
      }),
    postApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployCreate:
      build.mutation<
        PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployCreateApiResponse,
        PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/deploy/create`,
          method: "POST",
          body: queryArg.createKuberDeployModel,
        }),
      }),
    getApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapList:
      build.query<
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapListApiResponse,
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapListApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/configmap/list`,
        }),
      }),
    getApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapGetId:
      build.query<
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapGetIdApiResponse,
        GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapGetIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/configmap/get/${queryArg.id}`,
        }),
      }),
    putApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapEditId:
      build.mutation<
        PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapEditIdApiResponse,
        PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapEditIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/configmap/edit/${queryArg.id}`,
          method: "PUT",
          body: queryArg.editKuberConfigmapModel,
        }),
      }),
    deleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapDeleteId:
      build.mutation<
        DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapDeleteIdApiResponse,
        DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapDeleteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/configmap/delete/${queryArg.id}`,
          method: "DELETE",
        }),
      }),
    postApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapCreate:
      build.mutation<
        PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapCreateApiResponse,
        PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cloud/${queryArg.projectId}/host/${queryArg.kuberHostId}/configmap/create`,
          method: "POST",
          body: queryArg.createKuberConfigmapModel,
        }),
      }),
    getApiMyKubernetesClusterVersionList: build.query<
      GetApiMyKubernetesClusterVersionListApiResponse,
      GetApiMyKubernetesClusterVersionListApiArg
    >({
      query: () => ({ url: `/api/my/kubernetes/cluster/version/list` }),
    }),
    getApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeList:
      build.query<
        GetApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeListApiResponse,
        GetApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeListApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cluster/${queryArg.projectId}/host/${queryArg.kuberClusterHostId}/node/list`,
        }),
      }),
    deleteApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeDeleteId:
      build.mutation<
        DeleteApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeDeleteIdApiResponse,
        DeleteApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeDeleteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cluster/${queryArg.projectId}/host/${queryArg.kuberClusterHostId}/node/delete/${queryArg.id}`,
          method: "DELETE",
        }),
      }),
    postApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeCreate:
      build.mutation<
        PostApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeCreateApiResponse,
        PostApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeCreateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/kubernetes/cluster/${queryArg.projectId}/host/${queryArg.kuberClusterHostId}/node/create`,
          method: "POST",
          body: queryArg.createKubernetesNodeModel,
        }),
      }),
    getApiMyKubernetesClusterByProjectIdHostList: build.query<
      GetApiMyKubernetesClusterByProjectIdHostListApiResponse,
      GetApiMyKubernetesClusterByProjectIdHostListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cluster/${queryArg.projectId}/host/list`,
      }),
    }),
    getApiMyKubernetesClusterByProjectIdHostGetAndId: build.query<
      GetApiMyKubernetesClusterByProjectIdHostGetAndIdApiResponse,
      GetApiMyKubernetesClusterByProjectIdHostGetAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cluster/${queryArg.projectId}/host/get/${queryArg.id}`,
      }),
    }),
    deleteApiMyKubernetesClusterByProjectIdHostDeleteAndId: build.mutation<
      DeleteApiMyKubernetesClusterByProjectIdHostDeleteAndIdApiResponse,
      DeleteApiMyKubernetesClusterByProjectIdHostDeleteAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cluster/${queryArg.projectId}/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyKubernetesClusterByProjectIdHostCreate: build.mutation<
      PostApiMyKubernetesClusterByProjectIdHostCreateApiResponse,
      PostApiMyKubernetesClusterByProjectIdHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/kubernetes/cluster/${queryArg.projectId}/host/create`,
        method: "POST",
        body: queryArg.createKuberClusterModel,
      }),
    }),
    getApiMyStorageByProjectIdHostAndStorageHostIdKeyList: build.query<
      GetApiMyStorageByProjectIdHostAndStorageHostIdKeyListApiResponse,
      GetApiMyStorageByProjectIdHostAndStorageHostIdKeyListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/storage/${queryArg.projectId}/host/${queryArg.storageHostId}/key/list`,
      }),
    }),
    deleteApiMyStorageByProjectIdHostAndStorageHostIdKeyDeleteId:
      build.mutation<
        DeleteApiMyStorageByProjectIdHostAndStorageHostIdKeyDeleteIdApiResponse,
        DeleteApiMyStorageByProjectIdHostAndStorageHostIdKeyDeleteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/storage/${queryArg.projectId}/host/${queryArg.storageHostId}/key/delete/${queryArg.id}`,
          method: "DELETE",
        }),
      }),
    postApiMyStorageByProjectIdHostAndStorageHostIdKeyCreate: build.mutation<
      PostApiMyStorageByProjectIdHostAndStorageHostIdKeyCreateApiResponse,
      PostApiMyStorageByProjectIdHostAndStorageHostIdKeyCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/storage/${queryArg.projectId}/host/${queryArg.storageHostId}/key/create`,
        method: "POST",
      }),
    }),
    getApiMyStorageByProjectIdHostList: build.query<
      GetApiMyStorageByProjectIdHostListApiResponse,
      GetApiMyStorageByProjectIdHostListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/storage/${queryArg.projectId}/host/list`,
      }),
    }),
    getApiMyStorageByProjectIdHostGetAndId: build.query<
      GetApiMyStorageByProjectIdHostGetAndIdApiResponse,
      GetApiMyStorageByProjectIdHostGetAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/storage/${queryArg.projectId}/host/get/${queryArg.id}`,
      }),
    }),
    putApiMyStorageByProjectIdHostEditAndId: build.mutation<
      PutApiMyStorageByProjectIdHostEditAndIdApiResponse,
      PutApiMyStorageByProjectIdHostEditAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/storage/${queryArg.projectId}/host/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editStorageHostModel,
      }),
    }),
    deleteApiMyStorageByProjectIdHostDeleteAndId: build.mutation<
      DeleteApiMyStorageByProjectIdHostDeleteAndIdApiResponse,
      DeleteApiMyStorageByProjectIdHostDeleteAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/storage/${queryArg.projectId}/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyStorageByProjectIdHostCreate: build.mutation<
      PostApiMyStorageByProjectIdHostCreateApiResponse,
      PostApiMyStorageByProjectIdHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/storage/${queryArg.projectId}/host/create`,
        method: "POST",
        body: queryArg.createStorageHostModel,
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
    getApiMyPortalProductBundleVolumeList: build.query<
      GetApiMyPortalProductBundleVolumeListApiResponse,
      GetApiMyPortalProductBundleVolumeListApiArg
    >({
      query: () => ({ url: `/api/my/portal/product-bundle/volume-list` }),
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
    getApiMyPortalNotificationList: build.query<
      GetApiMyPortalNotificationListApiResponse,
      GetApiMyPortalNotificationListApiArg
    >({
      query: () => ({ url: `/api/my/portal/notification/list` }),
    }),
    postApiMyPortalIssueSubjectShortList: build.mutation<
      PostApiMyPortalIssueSubjectShortListApiResponse,
      PostApiMyPortalIssueSubjectShortListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/portal/issue-subject/short-list`,
        method: "POST",
        body: queryArg.issueSubjectShortListModel,
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
        body: queryArg.createIssueItemModel,
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
        body: queryArg.createIssueModel,
      }),
    }),
    getApiMyPortalCustomerLimitResourceUsages: build.query<
      GetApiMyPortalCustomerLimitResourceUsagesApiResponse,
      GetApiMyPortalCustomerLimitResourceUsagesApiArg
    >({
      query: () => ({ url: `/api/my/portal/customer-limit/resource-usages` }),
    }),
    getApiMyPortalBusinessUnitList: build.query<
      GetApiMyPortalBusinessUnitListApiResponse,
      GetApiMyPortalBusinessUnitListApiArg
    >({
      query: () => ({ url: `/api/my/portal/business-unit/list` }),
    }),
    getApiMyByProjectIdUserList: build.query<
      GetApiMyByProjectIdUserListApiResponse,
      GetApiMyByProjectIdUserListApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/${queryArg.projectId}/user/list` }),
    }),
    postApiMyByProjectIdUserEditAndId: build.mutation<
      PostApiMyByProjectIdUserEditAndIdApiResponse,
      PostApiMyByProjectIdUserEditAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/${queryArg.projectId}/user/edit/${queryArg.id}`,
        method: "POST",
        body: queryArg.editProjectUserModel,
      }),
    }),
    deleteApiMyByProjectIdUserDeleteAndId: build.mutation<
      DeleteApiMyByProjectIdUserDeleteAndIdApiResponse,
      DeleteApiMyByProjectIdUserDeleteAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/${queryArg.projectId}/user/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyByProjectIdUserCreate: build.mutation<
      PostApiMyByProjectIdUserCreateApiResponse,
      PostApiMyByProjectIdUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/${queryArg.projectId}/user/create`,
        method: "POST",
        body: queryArg.createProjectUserModel,
      }),
    }),
    getApiMyProjectList: build.query<
      GetApiMyProjectListApiResponse,
      GetApiMyProjectListApiArg
    >({
      query: () => ({ url: `/api/my/project/list` }),
    }),
    getApiMyProjectGetById: build.query<
      GetApiMyProjectGetByIdApiResponse,
      GetApiMyProjectGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/my/project/get/${queryArg.id}` }),
    }),
    deleteApiMyProjectDeleteById: build.mutation<
      DeleteApiMyProjectDeleteByIdApiResponse,
      DeleteApiMyProjectDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/project/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyCreate: build.mutation<
      PostApiMyCreateApiResponse,
      PostApiMyCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/create`,
        method: "POST",
        body: queryArg.createProjectModel,
      }),
    }),
    getApiMyVmByProjectIdVpcAndVpcHostIdNetworkAccessList: build.query<
      GetApiMyVmByProjectIdVpcAndVpcHostIdNetworkAccessListApiResponse,
      GetApiMyVmByProjectIdVpcAndVpcHostIdNetworkAccessListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/${queryArg.vpcHostId}/network-access/list`,
      }),
    }),
    postApiMyVmByProjectIdVpcAndVpcHostIdNetworkAccessCreate: build.mutation<
      PostApiMyVmByProjectIdVpcAndVpcHostIdNetworkAccessCreateApiResponse,
      PostApiMyVmByProjectIdVpcAndVpcHostIdNetworkAccessCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/${queryArg.vpcHostId}/network-access/create`,
        method: "POST",
        body: queryArg.createVpcNetworkAccessModel,
      }),
    }),
    deleteApiMyVmByProjectIdVpcAndVpcHostIdInterfaceRemoveId: build.mutation<
      DeleteApiMyVmByProjectIdVpcAndVpcHostIdInterfaceRemoveIdApiResponse,
      DeleteApiMyVmByProjectIdVpcAndVpcHostIdInterfaceRemoveIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/${queryArg.vpcHostId}/interface/remove/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyVmByProjectIdVpcAndVpcHostIdInterfaceList: build.query<
      GetApiMyVmByProjectIdVpcAndVpcHostIdInterfaceListApiResponse,
      GetApiMyVmByProjectIdVpcAndVpcHostIdInterfaceListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/${queryArg.vpcHostId}/interface/list`,
      }),
    }),
    postApiMyVmByProjectIdVpcAndVpcHostIdInterfaceCreate: build.mutation<
      PostApiMyVmByProjectIdVpcAndVpcHostIdInterfaceCreateApiResponse,
      PostApiMyVmByProjectIdVpcAndVpcHostIdInterfaceCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/${queryArg.vpcHostId}/interface/create`,
        method: "POST",
        body: queryArg.createVpcInterfaceModel,
      }),
    }),
    getApiMyVmByProjectIdVpcAndVpcHostIdNatList: build.query<
      GetApiMyVmByProjectIdVpcAndVpcHostIdNatListApiResponse,
      GetApiMyVmByProjectIdVpcAndVpcHostIdNatListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/${queryArg.vpcHostId}/nat/list`,
      }),
    }),
    getApiMyVmByProjectIdVpcAndVpcHostIdNatGetId: build.query<
      GetApiMyVmByProjectIdVpcAndVpcHostIdNatGetIdApiResponse,
      GetApiMyVmByProjectIdVpcAndVpcHostIdNatGetIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/${queryArg.vpcHostId}/nat/get/${queryArg.id}`,
      }),
    }),
    deleteApiMyVmByProjectIdVpcAndVpcHostIdNatDeleteSnat: build.mutation<
      DeleteApiMyVmByProjectIdVpcAndVpcHostIdNatDeleteSnatApiResponse,
      DeleteApiMyVmByProjectIdVpcAndVpcHostIdNatDeleteSnatApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/${queryArg.vpcHostId}/nat/delete-snat`,
        method: "DELETE",
      }),
    }),
    deleteApiMyVmByProjectIdVpcAndVpcHostIdNatDeleteId: build.mutation<
      DeleteApiMyVmByProjectIdVpcAndVpcHostIdNatDeleteIdApiResponse,
      DeleteApiMyVmByProjectIdVpcAndVpcHostIdNatDeleteIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/${queryArg.vpcHostId}/nat/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVmByProjectIdVpcAndVpcHostIdNatCreateSnat: build.mutation<
      PostApiMyVmByProjectIdVpcAndVpcHostIdNatCreateSnatApiResponse,
      PostApiMyVmByProjectIdVpcAndVpcHostIdNatCreateSnatApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/${queryArg.vpcHostId}/nat/create-snat`,
        method: "POST",
        body: queryArg.createVpcSnatModel,
      }),
    }),
    postApiMyVmByProjectIdVpcAndVpcHostIdNatCreateDnat: build.mutation<
      PostApiMyVmByProjectIdVpcAndVpcHostIdNatCreateDnatApiResponse,
      PostApiMyVmByProjectIdVpcAndVpcHostIdNatCreateDnatApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/${queryArg.vpcHostId}/nat/create-dnat`,
        method: "POST",
        body: queryArg.createVpcDnatModel,
      }),
    }),
    getApiMyVmByProjectIdVpcAndVpcHostIdIpList: build.query<
      GetApiMyVmByProjectIdVpcAndVpcHostIdIpListApiResponse,
      GetApiMyVmByProjectIdVpcAndVpcHostIdIpListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/${queryArg.vpcHostId}/ip/list`,
      }),
    }),
    deleteApiMyVmByProjectIdVpcAndVpcHostIdIpDeleteId: build.mutation<
      DeleteApiMyVmByProjectIdVpcAndVpcHostIdIpDeleteIdApiResponse,
      DeleteApiMyVmByProjectIdVpcAndVpcHostIdIpDeleteIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/${queryArg.vpcHostId}/ip/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVmByProjectIdVpcAndVpcHostIdIpCreate: build.mutation<
      PostApiMyVmByProjectIdVpcAndVpcHostIdIpCreateApiResponse,
      PostApiMyVmByProjectIdVpcAndVpcHostIdIpCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/${queryArg.vpcHostId}/ip/create`,
        method: "POST",
        body: queryArg.createVpcIpModel,
      }),
    }),
    getApiMyVmByProjectIdVpcShortList: build.query<
      GetApiMyVmByProjectIdVpcShortListApiResponse,
      GetApiMyVmByProjectIdVpcShortListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/short-list`,
      }),
    }),
    getApiMyVmByProjectIdVpcList: build.query<
      GetApiMyVmByProjectIdVpcListApiResponse,
      GetApiMyVmByProjectIdVpcListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/list`,
      }),
    }),
    getApiMyVmByProjectIdVpcGetAndId: build.query<
      GetApiMyVmByProjectIdVpcGetAndIdApiResponse,
      GetApiMyVmByProjectIdVpcGetAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/get/${queryArg.id}`,
      }),
    }),
    putApiMyVmByProjectIdVpcEditAndId: build.mutation<
      PutApiMyVmByProjectIdVpcEditAndIdApiResponse,
      PutApiMyVmByProjectIdVpcEditAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editVpcHostModel,
      }),
    }),
    deleteApiMyVmByProjectIdVpcDeleteAndId: build.mutation<
      DeleteApiMyVmByProjectIdVpcDeleteAndIdApiResponse,
      DeleteApiMyVmByProjectIdVpcDeleteAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVmByProjectIdVpcCreate: build.mutation<
      PostApiMyVmByProjectIdVpcCreateApiResponse,
      PostApiMyVmByProjectIdVpcCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/vpc/create`,
        method: "POST",
        body: queryArg.createVpcHostModel,
      }),
    }),
    getApiMyVmByProjectIdVolumeNodeGet: build.query<
      GetApiMyVmByProjectIdVolumeNodeGetApiResponse,
      GetApiMyVmByProjectIdVolumeNodeGetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/node/get`,
        params: {
          VmHostId: queryArg.vmHostId,
          VmVolumeHostId: queryArg.vmVolumeHostId,
        },
      }),
    }),
    putApiMyVmByProjectIdVolumeNodeDetachAndId: build.mutation<
      PutApiMyVmByProjectIdVolumeNodeDetachAndIdApiResponse,
      PutApiMyVmByProjectIdVolumeNodeDetachAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/node/detach/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    postApiMyVmByProjectIdVolumeNodeAttach: build.mutation<
      PostApiMyVmByProjectIdVolumeNodeAttachApiResponse,
      PostApiMyVmByProjectIdVolumeNodeAttachApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/node/attach`,
        method: "POST",
        body: queryArg.attachVolumeModel,
      }),
    }),
    getApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotShortList: build.query<
      GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotShortListApiResponse,
      GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotShortListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/${queryArg.vmVolumeHostId}/snapshot/short-list`,
      }),
    }),
    putApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotRevertId:
      build.mutation<
        PutApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotRevertIdApiResponse,
        PutApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotRevertIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/vm/${queryArg.projectId}/volume/${queryArg.vmVolumeHostId}/snapshot/revert/${queryArg.id}`,
          method: "PUT",
        }),
      }),
    getApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotList: build.query<
      GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotListApiResponse,
      GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/${queryArg.vmVolumeHostId}/snapshot/list`,
      }),
    }),
    getApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotGetId: build.query<
      GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotGetIdApiResponse,
      GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotGetIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/${queryArg.vmVolumeHostId}/snapshot/get/${queryArg.id}`,
      }),
    }),
    deleteApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotDeleteId:
      build.mutation<
        DeleteApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotDeleteIdApiResponse,
        DeleteApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotDeleteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/vm/${queryArg.projectId}/volume/${queryArg.vmVolumeHostId}/snapshot/delete/${queryArg.id}`,
          method: "DELETE",
        }),
      }),
    postApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotCreate: build.mutation<
      PostApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotCreateApiResponse,
      PostApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/${queryArg.vmVolumeHostId}/snapshot/create`,
        method: "POST",
        body: queryArg.createVolumeSnapshotModel,
      }),
    }),
    getApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupShortList: build.query<
      GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupShortListApiResponse,
      GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupShortListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/${queryArg.vmVolumeHostId}/backup/short-list`,
      }),
    }),
    postApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupRestoreId:
      build.mutation<
        PostApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupRestoreIdApiResponse,
        PostApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupRestoreIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/vm/${queryArg.projectId}/volume/${queryArg.vmVolumeHostId}/backup/restore/${queryArg.id}`,
          method: "POST",
        }),
      }),
    getApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupList: build.query<
      GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupListApiResponse,
      GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/${queryArg.vmVolumeHostId}/backup/list`,
      }),
    }),
    getApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupGetId: build.query<
      GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupGetIdApiResponse,
      GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupGetIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/${queryArg.vmVolumeHostId}/backup/get/${queryArg.id}`,
      }),
    }),
    deleteApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupDeleteId:
      build.mutation<
        DeleteApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupDeleteIdApiResponse,
        DeleteApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupDeleteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/my/vm/${queryArg.projectId}/volume/${queryArg.vmVolumeHostId}/backup/delete/${queryArg.id}`,
          method: "DELETE",
        }),
      }),
    postApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupCreate: build.mutation<
      PostApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupCreateApiResponse,
      PostApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/${queryArg.vmVolumeHostId}/backup/create`,
        method: "POST",
        body: queryArg.createVolumeBackupModel,
      }),
    }),
    getApiMyVmByProjectIdVolumeList: build.query<
      GetApiMyVmByProjectIdVolumeListApiResponse,
      GetApiMyVmByProjectIdVolumeListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/list`,
      }),
    }),
    getApiMyVmByProjectIdVolumeGetAndId: build.query<
      GetApiMyVmByProjectIdVolumeGetAndIdApiResponse,
      GetApiMyVmByProjectIdVolumeGetAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/get/${queryArg.id}`,
      }),
    }),
    putApiMyVmByProjectIdVolumeEditAndId: build.mutation<
      PutApiMyVmByProjectIdVolumeEditAndIdApiResponse,
      PutApiMyVmByProjectIdVolumeEditAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editVolumeHostModel,
      }),
    }),
    deleteApiMyVmByProjectIdVolumeDeleteAndId: build.mutation<
      DeleteApiMyVmByProjectIdVolumeDeleteAndIdApiResponse,
      DeleteApiMyVmByProjectIdVolumeDeleteAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVmByProjectIdVolumeCreate: build.mutation<
      PostApiMyVmByProjectIdVolumeCreateApiResponse,
      PostApiMyVmByProjectIdVolumeCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/volume/create`,
        method: "POST",
        body: queryArg.createVolumeHostModel,
      }),
    }),
    getApiMyVmByProjectIdNetworkNodeList: build.query<
      GetApiMyVmByProjectIdNetworkNodeListApiResponse,
      GetApiMyVmByProjectIdNetworkNodeListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/network/node/list`,
        params: {
          VmHostId: queryArg.vmHostId,
          VmNetworkId: queryArg.vmNetworkId,
        },
      }),
    }),
    putApiMyVmByProjectIdNetworkNodeDetachAndId: build.mutation<
      PutApiMyVmByProjectIdNetworkNodeDetachAndIdApiResponse,
      PutApiMyVmByProjectIdNetworkNodeDetachAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/network/node/detach/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    postApiMyVmByProjectIdNetworkNodeAttach: build.mutation<
      PostApiMyVmByProjectIdNetworkNodeAttachApiResponse,
      PostApiMyVmByProjectIdNetworkNodeAttachApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/network/node/attach`,
        method: "POST",
        body: queryArg.attachNetworkModel,
      }),
    }),
    getApiMyVmByProjectIdNetworkShortList: build.query<
      GetApiMyVmByProjectIdNetworkShortListApiResponse,
      GetApiMyVmByProjectIdNetworkShortListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/network/short-list`,
      }),
    }),
    getApiMyVmByProjectIdNetworkList: build.query<
      GetApiMyVmByProjectIdNetworkListApiResponse,
      GetApiMyVmByProjectIdNetworkListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/network/list`,
      }),
    }),
    deleteApiMyVmByProjectIdNetworkDeleteAndId: build.mutation<
      DeleteApiMyVmByProjectIdNetworkDeleteAndIdApiResponse,
      DeleteApiMyVmByProjectIdNetworkDeleteAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/network/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVmByProjectIdNetworkCreate: build.mutation<
      PostApiMyVmByProjectIdNetworkCreateApiResponse,
      PostApiMyVmByProjectIdNetworkCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/network/create`,
        method: "POST",
        body: queryArg.createVmNetworkModel,
      }),
    }),
    postApiMyVmByProjectIdLoadBalancerHostCreate: build.mutation<
      PostApiMyVmByProjectIdLoadBalancerHostCreateApiResponse,
      PostApiMyVmByProjectIdLoadBalancerHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/load-balancer/host/create`,
        method: "POST",
        body: queryArg.createVmLbModel,
      }),
    }),
    getApiMyVmByProjectIdKeyList: build.query<
      GetApiMyVmByProjectIdKeyListApiResponse,
      GetApiMyVmByProjectIdKeyListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/key/list`,
      }),
    }),
    deleteApiMyVmByProjectIdKeyDeleteAndId: build.mutation<
      DeleteApiMyVmByProjectIdKeyDeleteAndIdApiResponse,
      DeleteApiMyVmByProjectIdKeyDeleteAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/key/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVmByProjectIdKeyCreate: build.mutation<
      PostApiMyVmByProjectIdKeyCreateApiResponse,
      PostApiMyVmByProjectIdKeyCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/key/create`,
        method: "POST",
        body: queryArg.createVmKeyModel,
      }),
    }),
    getApiMyVmByProjectIdImageList: build.query<
      GetApiMyVmByProjectIdImageListApiResponse,
      GetApiMyVmByProjectIdImageListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/image/list`,
        params: {
          ProductId: queryArg.productId,
        },
      }),
    }),
    getApiMyVmByProjectIdHostAndVmHostIdVolumeList: build.query<
      GetApiMyVmByProjectIdHostAndVmHostIdVolumeListApiResponse,
      GetApiMyVmByProjectIdHostAndVmHostIdVolumeListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/volume/list`,
      }),
    }),
    getApiMyVmByProjectIdHostAndVmHostIdVolumeGetId: build.query<
      GetApiMyVmByProjectIdHostAndVmHostIdVolumeGetIdApiResponse,
      GetApiMyVmByProjectIdHostAndVmHostIdVolumeGetIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/volume/get/${queryArg.id}`,
      }),
    }),
    deleteApiMyVmByProjectIdHostAndVmHostIdVolumeDeleteId: build.mutation<
      DeleteApiMyVmByProjectIdHostAndVmHostIdVolumeDeleteIdApiResponse,
      DeleteApiMyVmByProjectIdHostAndVmHostIdVolumeDeleteIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/volume/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiMyVmByProjectIdHostAndVmHostIdSnapshotShortList: build.query<
      GetApiMyVmByProjectIdHostAndVmHostIdSnapshotShortListApiResponse,
      GetApiMyVmByProjectIdHostAndVmHostIdSnapshotShortListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/snapshot/short-list`,
      }),
    }),
    putApiMyVmByProjectIdHostAndVmHostIdSnapshotRevertId: build.mutation<
      PutApiMyVmByProjectIdHostAndVmHostIdSnapshotRevertIdApiResponse,
      PutApiMyVmByProjectIdHostAndVmHostIdSnapshotRevertIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/snapshot/revert/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiMyVmByProjectIdHostAndVmHostIdSnapshotList: build.query<
      GetApiMyVmByProjectIdHostAndVmHostIdSnapshotListApiResponse,
      GetApiMyVmByProjectIdHostAndVmHostIdSnapshotListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/snapshot/list`,
      }),
    }),
    getApiMyVmByProjectIdHostAndVmHostIdSnapshotGetId: build.query<
      GetApiMyVmByProjectIdHostAndVmHostIdSnapshotGetIdApiResponse,
      GetApiMyVmByProjectIdHostAndVmHostIdSnapshotGetIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/snapshot/get/${queryArg.id}`,
      }),
    }),
    deleteApiMyVmByProjectIdHostAndVmHostIdSnapshotDeleteId: build.mutation<
      DeleteApiMyVmByProjectIdHostAndVmHostIdSnapshotDeleteIdApiResponse,
      DeleteApiMyVmByProjectIdHostAndVmHostIdSnapshotDeleteIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/snapshot/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVmByProjectIdHostAndVmHostIdSnapshotCreate: build.mutation<
      PostApiMyVmByProjectIdHostAndVmHostIdSnapshotCreateApiResponse,
      PostApiMyVmByProjectIdHostAndVmHostIdSnapshotCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/snapshot/create`,
        method: "POST",
        body: queryArg.createVmHostSnapshotModel,
      }),
    }),
    getApiMyVmByProjectIdHostAndVmHostIdIpList: build.query<
      GetApiMyVmByProjectIdHostAndVmHostIdIpListApiResponse,
      GetApiMyVmByProjectIdHostAndVmHostIdIpListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/ip/list`,
      }),
    }),
    deleteApiMyVmByProjectIdHostAndVmHostIdIpDeleteId: build.mutation<
      DeleteApiMyVmByProjectIdHostAndVmHostIdIpDeleteIdApiResponse,
      DeleteApiMyVmByProjectIdHostAndVmHostIdIpDeleteIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/ip/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVmByProjectIdHostAndVmHostIdIpCreate: build.mutation<
      PostApiMyVmByProjectIdHostAndVmHostIdIpCreateApiResponse,
      PostApiMyVmByProjectIdHostAndVmHostIdIpCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/ip/create`,
        method: "POST",
        body: queryArg.createVmIpModel,
      }),
    }),
    getApiMyVmByProjectIdHostAndVmHostIdFirewallList: build.query<
      GetApiMyVmByProjectIdHostAndVmHostIdFirewallListApiResponse,
      GetApiMyVmByProjectIdHostAndVmHostIdFirewallListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/firewall/list`,
      }),
    }),
    getApiMyVmByProjectIdHostAndVmHostIdFirewallGetId: build.query<
      GetApiMyVmByProjectIdHostAndVmHostIdFirewallGetIdApiResponse,
      GetApiMyVmByProjectIdHostAndVmHostIdFirewallGetIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/firewall/get/${queryArg.id}`,
      }),
    }),
    deleteApiMyVmByProjectIdHostAndVmHostIdFirewallDeleteId: build.mutation<
      DeleteApiMyVmByProjectIdHostAndVmHostIdFirewallDeleteIdApiResponse,
      DeleteApiMyVmByProjectIdHostAndVmHostIdFirewallDeleteIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/firewall/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVmByProjectIdHostAndVmHostIdFirewallCreate: build.mutation<
      PostApiMyVmByProjectIdHostAndVmHostIdFirewallCreateApiResponse,
      PostApiMyVmByProjectIdHostAndVmHostIdFirewallCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/${queryArg.vmHostId}/firewall/create`,
        method: "POST",
        body: queryArg.createVmFirewallRuleModel,
      }),
    }),
    putApiMyVmByProjectIdHostStopAndId: build.mutation<
      PutApiMyVmByProjectIdHostStopAndIdApiResponse,
      PutApiMyVmByProjectIdHostStopAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/stop/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiMyVmByProjectIdHostStartAndId: build.mutation<
      PutApiMyVmByProjectIdHostStartAndIdApiResponse,
      PutApiMyVmByProjectIdHostStartAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/start/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiMyVmByProjectIdHostShutdownAndId: build.mutation<
      PutApiMyVmByProjectIdHostShutdownAndIdApiResponse,
      PutApiMyVmByProjectIdHostShutdownAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/shutdown/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiMyVmByProjectIdHostShortList: build.query<
      GetApiMyVmByProjectIdHostShortListApiResponse,
      GetApiMyVmByProjectIdHostShortListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/short-list`,
      }),
    }),
    putApiMyVmByProjectIdHostResetAndId: build.mutation<
      PutApiMyVmByProjectIdHostResetAndIdApiResponse,
      PutApiMyVmByProjectIdHostResetAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/reset/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    putApiMyVmByProjectIdHostRebuildAndId: build.mutation<
      PutApiMyVmByProjectIdHostRebuildAndIdApiResponse,
      PutApiMyVmByProjectIdHostRebuildAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/rebuild/${queryArg.id}`,
        method: "PUT",
        body: queryArg.rebuildVmModel,
      }),
    }),
    putApiMyVmByProjectIdHostRebootAndId: build.mutation<
      PutApiMyVmByProjectIdHostRebootAndIdApiResponse,
      PutApiMyVmByProjectIdHostRebootAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/reboot/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    getApiMyVmByProjectIdHostList: build.query<
      GetApiMyVmByProjectIdHostListApiResponse,
      GetApiMyVmByProjectIdHostListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/list`,
      }),
    }),
    getApiMyVmByProjectIdHostGetAnalyticAndId: build.query<
      GetApiMyVmByProjectIdHostGetAnalyticAndIdApiResponse,
      GetApiMyVmByProjectIdHostGetAnalyticAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/get-analytic/${queryArg.id}`,
        body: queryArg.getAnalyticModel,
      }),
    }),
    getApiMyVmByProjectIdHostGetAndId: build.query<
      GetApiMyVmByProjectIdHostGetAndIdApiResponse,
      GetApiMyVmByProjectIdHostGetAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/get/${queryArg.id}`,
      }),
    }),
    putApiMyVmByProjectIdHostEditAndId: build.mutation<
      PutApiMyVmByProjectIdHostEditAndIdApiResponse,
      PutApiMyVmByProjectIdHostEditAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.editVmModel,
      }),
    }),
    deleteApiMyVmByProjectIdHostDeleteAndId: build.mutation<
      DeleteApiMyVmByProjectIdHostDeleteAndIdApiResponse,
      DeleteApiMyVmByProjectIdHostDeleteAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/delete/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiMyVmByProjectIdHostCreate: build.mutation<
      PostApiMyVmByProjectIdHostCreateApiResponse,
      PostApiMyVmByProjectIdHostCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/create`,
        method: "POST",
        body: queryArg.createVmModel,
      }),
    }),
    getApiMyVmByProjectIdHostConsoleAndId: build.query<
      GetApiMyVmByProjectIdHostConsoleAndIdApiResponse,
      GetApiMyVmByProjectIdHostConsoleAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/my/vm/${queryArg.projectId}/host/console/${queryArg.id}`,
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
        body: queryArg.createWebsiteBolgCommentModel,
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
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type GetApiMyAccountUserLogApiResponse =
  /** status 200 OK */ UserLogResponseListPagedResponse;
export type GetApiMyAccountUserLogApiArg = {
  userId?: number;
  fromDate?: string;
  toDate?: string;
  pageNumber: number;
  pageSize: number;
};
export type GetApiMyAccountProfileGetNotificationStatusApiResponse =
  /** status 200 OK */ GetNotificationStatusResponse;
export type GetApiMyAccountProfileGetNotificationStatusApiArg = void;
export type GetApiMyAccountProfileGetApiResponse =
  /** status 200 OK */ GetProfileResponse;
export type GetApiMyAccountProfileGetApiArg = void;
export type PostApiMyAccountProfileEnableTotpApiResponse = unknown;
export type PostApiMyAccountProfileEnableTotpApiArg = void;
export type PostApiMyAccountProfileEnableTotpConfirmApiResponse = unknown;
export type PostApiMyAccountProfileEnableTotpConfirmApiArg = {
  totpTwoFactorModel: TotpTwoFactorModel;
};
export type PutApiMyAccountProfileEditTwoFactorApiResponse = unknown;
export type PutApiMyAccountProfileEditTwoFactorApiArg = {
  twoFactorModel: TwoFactorModel;
};
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
export type PostApiMyAccountProfileDisableTotpApiResponse = unknown;
export type PostApiMyAccountProfileDisableTotpApiArg = {
  totpTwoFactorModel: TotpTwoFactorModel;
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
export type GetApiMyAccountCustomerUserListApiResponse =
  /** status 200 OK */ CustomerUserListResponse[];
export type GetApiMyAccountCustomerUserListApiArg = void;
export type GetApiMyAccountCustomerUserGetByIdApiResponse =
  /** status 200 OK */ GetCustomerUserResponse;
export type GetApiMyAccountCustomerUserGetByIdApiArg = {
  id: number;
};
export type DeleteApiMyAccountCustomerUserDeleteByIdApiResponse = unknown;
export type DeleteApiMyAccountCustomerUserDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyAccountCustomerUserCreateApiResponse = unknown;
export type PostApiMyAccountCustomerUserCreateApiArg = {
  createCustomerUserModel: CreateCustomerUserModel;
};
export type PostApiMyAccountCustomerUserChangeCustomerApiResponse = unknown;
export type PostApiMyAccountCustomerUserChangeCustomerApiArg = {
  changeCustomerUserModel: ChangeCustomerUserModel;
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
export type PostApiMyAccountRegisterApiResponse =
  /** status 200 OK */ LoginResponse;
export type PostApiMyAccountRegisterApiArg = {
  registerModel: RegisterModel;
};
export type PostApiMyAccountLogoutApiResponse = unknown;
export type PostApiMyAccountLogoutApiArg = void;
export type GetApiMyAccountSsoUrlApiResponse =
  /** status 200 OK */ SsoLoginResponse;
export type GetApiMyAccountSsoUrlApiArg = void;
export type PostApiMyAccountSsoLoginApiResponse =
  /** status 200 OK */ LoginResponse;
export type PostApiMyAccountSsoLoginApiArg = {
  ssoLoginModel: SsoLoginModel;
};
export type GetApiMyAccountLoginGoogleUrlApiResponse = unknown;
export type GetApiMyAccountLoginGoogleUrlApiArg = void;
export type GetApiMyAccountLoginGoogleCallbackApiResponse =
  /** status 200 OK */ LoginResponse;
export type GetApiMyAccountLoginGoogleCallbackApiArg = {
  code: string;
};
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
export type GetApiMyBareMetalImageListApiResponse =
  /** status 200 OK */ BareMetalImageListResponse[];
export type GetApiMyBareMetalImageListApiArg = void;
export type GetApiMyBareMetalByProjectIdHostListApiResponse =
  /** status 200 OK */ BareMetalListResponse[];
export type GetApiMyBareMetalByProjectIdHostListApiArg = {
  projectId: number;
};
export type GetApiMyBareMetalByProjectIdHostGetAndIdApiResponse =
  /** status 200 OK */ BareMetalResponse;
export type GetApiMyBareMetalByProjectIdHostGetAndIdApiArg = {
  projectId: number;
  id: number;
};
export type DeleteApiMyBareMetalByProjectIdHostDeleteAndIdApiResponse = unknown;
export type DeleteApiMyBareMetalByProjectIdHostDeleteAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyBareMetalByProjectIdHostCreateApiResponse = unknown;
export type PostApiMyBareMetalByProjectIdHostCreateApiArg = {
  projectId: number;
  createBareMetalModel: CreateBareMetalModel;
};
export type GetApiMyColocationByProjectIdHostListApiResponse =
  /** status 200 OK */ ColocationListResponse[];
export type GetApiMyColocationByProjectIdHostListApiArg = {
  projectId: number;
};
export type GetApiMyColocationByProjectIdHostGetAndIdApiResponse =
  /** status 200 OK */ GetColocationResponse;
export type GetApiMyColocationByProjectIdHostGetAndIdApiArg = {
  projectId: number;
  id: number;
};
export type DeleteApiMyColocationByProjectIdHostDeleteAndIdApiResponse =
  unknown;
export type DeleteApiMyColocationByProjectIdHostDeleteAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyColocationByProjectIdHostCreateApiResponse = unknown;
export type PostApiMyColocationByProjectIdHostCreateApiArg = {
  projectId: number;
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
export type GetApiMyDnsCdnByProjectIdWebHostListApiResponse =
  /** status 200 OK */ WebHostListResponse[];
export type GetApiMyDnsCdnByProjectIdWebHostListApiArg = {
  projectId: number;
};
export type GetApiMyDnsCdnByProjectIdWebHostGetLoginSessionAndIdApiResponse =
  /** status 200 OK */ GetLoginSessionResponse;
export type GetApiMyDnsCdnByProjectIdWebHostGetLoginSessionAndIdApiArg = {
  projectId: number;
  id: number;
};
export type GetApiMyDnsCdnByProjectIdWebHostGetAndIdApiResponse =
  /** status 200 OK */ GetWebHostResponse;
export type GetApiMyDnsCdnByProjectIdWebHostGetAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PutApiMyDnsCdnByProjectIdWebHostEditAndIdApiResponse = unknown;
export type PutApiMyDnsCdnByProjectIdWebHostEditAndIdApiArg = {
  projectId: number;
  id: number;
  editWebHostModel: EditWebHostModel;
};
export type DeleteApiMyDnsCdnByProjectIdWebHostDeleteAndIdApiResponse = unknown;
export type DeleteApiMyDnsCdnByProjectIdWebHostDeleteAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyDnsCdnByProjectIdWebHostCreateApiResponse = unknown;
export type PostApiMyDnsCdnByProjectIdWebHostCreateApiArg = {
  projectId: number;
  createWebHostModel: CreateWebHostModel;
};
export type PostApiMyDnsCdnByProjectIdWebHostCheckDomainApiResponse = unknown;
export type PostApiMyDnsCdnByProjectIdWebHostCheckDomainApiArg = {
  projectId: number;
  checkWebHostDomainModel: CheckWebHostDomainModel;
};
export type GetApiMyDnsCdnByProjectIdHostListApiResponse =
  /** status 200 OK */ DnsCdnListResponse[];
export type GetApiMyDnsCdnByProjectIdHostListApiArg = {
  projectId: number;
};
export type GetApiMyDnsCdnByProjectIdHostGetNsAndIdApiResponse =
  /** status 200 OK */ GetNsResponse;
export type GetApiMyDnsCdnByProjectIdHostGetNsAndIdApiArg = {
  projectId: number;
  id: number;
};
export type GetApiMyDnsCdnByProjectIdHostGetAnalyticAndIdApiResponse =
  /** status 200 OK */ GetAnalyticResponse;
export type GetApiMyDnsCdnByProjectIdHostGetAnalyticAndIdApiArg = {
  projectId: number;
  id: number;
  getAnalyticModel: GetAnalyticModel;
};
export type GetApiMyDnsCdnByProjectIdHostGetAndIdApiResponse =
  /** status 200 OK */ GetDnsCdnResponse;
export type GetApiMyDnsCdnByProjectIdHostGetAndIdApiArg = {
  projectId: number;
  id: number;
};
export type DeleteApiMyDnsCdnByProjectIdHostDeleteAndIdApiResponse = unknown;
export type DeleteApiMyDnsCdnByProjectIdHostDeleteAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyDnsCdnByProjectIdHostCreateApiResponse = unknown;
export type PostApiMyDnsCdnByProjectIdHostCreateApiArg = {
  projectId: number;
  createDnsCdnModel: CreateDnsCdnModel;
};
export type PostApiMyDnsCdnByProjectIdHostCheckApiResponse = unknown;
export type PostApiMyDnsCdnByProjectIdHostCheckApiArg = {
  projectId: number;
  checkDnsCdnModel: CheckDnsCdnModel;
};
export type PutApiMyDnsCdnByProjectIdHostChangeOriginCertTypeAndIdApiResponse =
  unknown;
export type PutApiMyDnsCdnByProjectIdHostChangeOriginCertTypeAndIdApiArg = {
  projectId: number;
  id: number;
  changeOriginCertTypeModel: ChangeOriginCertTypeModel;
};
export type PutApiMyDnsCdnByProjectIdHostChangeNonWwwRedirectAndIdApiResponse =
  unknown;
export type PutApiMyDnsCdnByProjectIdHostChangeNonWwwRedirectAndIdApiArg = {
  projectId: number;
  id: number;
  changeNonWwwRedirectModel: ChangeNonWwwRedirectModel;
};
export type PutApiMyDnsCdnByProjectIdHostChangeHttpsRedirectAndIdApiResponse =
  unknown;
export type PutApiMyDnsCdnByProjectIdHostChangeHttpsRedirectAndIdApiArg = {
  projectId: number;
  id: number;
  changeHttpsRedirectModel: ChangeHttpsRedirectModel;
};
export type PutApiMyDnsCdnByProjectIdHostChangeHstsAndIdApiResponse = unknown;
export type PutApiMyDnsCdnByProjectIdHostChangeHstsAndIdApiArg = {
  projectId: number;
  id: number;
  changeHstsModel: ChangeHstsModel;
};
export type PutApiMyDnsCdnByProjectIdHostChangeEdgeCertTypeAndIdApiResponse =
  unknown;
export type PutApiMyDnsCdnByProjectIdHostChangeEdgeCertTypeAndIdApiArg = {
  projectId: number;
  id: number;
  changeEdgeCertTypeModel: ChangeEdgeCertTypeModel;
};
export type PutApiMyDnsCdnByProjectIdHostChangeCdnTypeAndIdApiResponse =
  unknown;
export type PutApiMyDnsCdnByProjectIdHostChangeCdnTypeAndIdApiArg = {
  projectId: number;
  id: number;
  changeCdnTypeModel: ChangeCdnTypeModel;
};
export type PostApiMyDnsCdnByProjectIdDomainResendVerificationAndIdApiResponse =
  unknown;
export type PostApiMyDnsCdnByProjectIdDomainResendVerificationAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyDnsCdnByProjectIdDomainRegisterApiResponse = unknown;
export type PostApiMyDnsCdnByProjectIdDomainRegisterApiArg = {
  projectId: number;
  registerDomainModel: RegisterDomainModel;
};
export type GetApiMyDnsCdnByProjectIdDomainListApiResponse =
  /** status 200 OK */ DomainListResponse[];
export type GetApiMyDnsCdnByProjectIdDomainListApiArg = {
  projectId: number;
};
export type GetApiMyDnsCdnByProjectIdDomainGetStatusAndIdApiResponse =
  /** status 200 OK */ DomainGetStatusResponse;
export type GetApiMyDnsCdnByProjectIdDomainGetStatusAndIdApiArg = {
  projectId: number;
  id: number;
};
export type GetApiMyDnsCdnByProjectIdDomainGetAndIdApiResponse =
  /** status 200 OK */ GetDomainResponse;
export type GetApiMyDnsCdnByProjectIdDomainGetAndIdApiArg = {
  projectId: number;
  id: number;
};
export type DeleteApiMyDnsCdnByProjectIdDomainDeleteAndIdApiResponse = unknown;
export type DeleteApiMyDnsCdnByProjectIdDomainDeleteAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyDnsCdnByProjectIdDomainCheckDomainApiResponse = unknown;
export type PostApiMyDnsCdnByProjectIdDomainCheckDomainApiArg = {
  projectId: number;
  checkDomainModel: CheckDomainModel;
};
export type PutApiMyDnsCdnByProjectIdDomainChangeNsAndIdApiResponse = unknown;
export type PutApiMyDnsCdnByProjectIdDomainChangeNsAndIdApiArg = {
  projectId: number;
  id: number;
  changeNsModel: ChangeNsModel;
};
export type PutApiMyDnsCdnByProjectIdDomainChangeContactAndIdApiResponse =
  unknown;
export type PutApiMyDnsCdnByProjectIdDomainChangeContactAndIdApiArg = {
  projectId: number;
  id: number;
  changeContactModel: ChangeContactModel;
};
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordListApiResponse =
  /** status 200 OK */ DnsRecordListResponse[];
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordListApiArg = {
  projectId: number;
  dnsCdnHostId: number;
};
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordGetIdApiResponse =
  /** status 200 OK */ GetDnsRecordResponse;
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordGetIdApiArg = {
  projectId: number;
  dnsCdnHostId: number;
  id: number;
};
export type PutApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordEditIdApiResponse =
  unknown;
export type PutApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordEditIdApiArg =
  {
    projectId: number;
    dnsCdnHostId: number;
    id: number;
    editDnsRecordModel: EditDnsRecordModel;
  };
export type DeleteApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordDeleteIdApiResponse =
  unknown;
export type DeleteApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordDeleteIdApiArg =
  {
    projectId: number;
    dnsCdnHostId: number;
    id: number;
  };
export type PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordCreateApiResponse =
  unknown;
export type PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordCreateApiArg =
  {
    projectId: number;
    dnsCdnHostId: number;
    createDnsRecordModel: CreateDnsRecordModel;
  };
export type PutApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordChangeProxyIdApiResponse =
  unknown;
export type PutApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordChangeProxyIdApiArg =
  {
    projectId: number;
    dnsCdnHostId: number;
    id: number;
  };
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteListApiResponse =
  /** status 200 OK */ CdnRouteListResponse[];
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteListApiArg = {
  projectId: number;
  dnsCdnHostId: number;
};
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteGetIdApiResponse =
  /** status 200 OK */ GetCdnRouteResponse;
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteGetIdApiArg = {
  projectId: number;
  dnsCdnHostId: number;
  id: number;
};
export type PutApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteEditIdApiResponse =
  unknown;
export type PutApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteEditIdApiArg = {
  projectId: number;
  dnsCdnHostId: number;
  id: number;
  editCdnRouteModel: EditCdnRouteModel;
};
export type DeleteApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteDeleteIdApiResponse =
  unknown;
export type DeleteApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteDeleteIdApiArg =
  {
    projectId: number;
    dnsCdnHostId: number;
    id: number;
  };
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertGetUserCertApiResponse =
  /** status 200 OK */ GetCdnCertResponse;
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertGetUserCertApiArg =
  {
    projectId: number;
    dnsCdnHostId: number;
  };
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertGetApiResponse =
  /** status 200 OK */ GetCdnCertResponse;
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertGetApiArg = {
  projectId: number;
  dnsCdnHostId: number;
};
export type PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertCreateUserCertApiResponse =
  unknown;
export type PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertCreateUserCertApiArg =
  {
    projectId: number;
    dnsCdnHostId: number;
    createCdnOriginUserCertModel: CreateCdnOriginUserCertModel;
  };
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertGetUserCertApiResponse =
  /** status 200 OK */ GetCdnCertResponse;
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertGetUserCertApiArg =
  {
    projectId: number;
    dnsCdnHostId: number;
  };
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertGetApiResponse =
  /** status 200 OK */ GetCdnCertResponse;
export type GetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertGetApiArg = {
  projectId: number;
  dnsCdnHostId: number;
};
export type PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertCreateUserCertApiResponse =
  unknown;
export type PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertCreateUserCertApiArg =
  {
    projectId: number;
    dnsCdnHostId: number;
    createCdnEdgeUserCertModel: CreateCdnEdgeUserCertModel;
  };
export type PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertCreateApiResponse =
  unknown;
export type PostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertCreateApiArg =
  {
    projectId: number;
    dnsCdnHostId: number;
  };
export type GetApiMyFinancialWalletCommissionListApiResponse =
  /** status 200 OK */ WalletCommissionListResponse[];
export type GetApiMyFinancialWalletCommissionListApiArg = void;
export type GetApiMyFinancialWalletListDownloadApiResponse =
  /** status 200 OK */ Blob;
export type GetApiMyFinancialWalletListDownloadApiArg = void;
export type GetApiMyFinancialWalletListApiResponse =
  /** status 200 OK */ WalletTransactionListResponse[];
export type GetApiMyFinancialWalletListApiArg = void;
export type GetApiMyFinancialWalletUsageReportByPeriodApiResponse =
  /** status 200 OK */ WalletUsageReportResponse[];
export type GetApiMyFinancialWalletUsageReportByPeriodApiArg = {
  period: number;
};
export type GetApiMyFinancialWalletGetBalanceApiResponse =
  /** status 200 OK */ number;
export type GetApiMyFinancialWalletGetBalanceApiArg = void;
export type PostApiMyFinancialVoucherUseApiResponse = unknown;
export type PostApiMyFinancialVoucherUseApiArg = {
  useVoucherModel: UseVoucherModel;
};
export type GetApiMyFinancialReferralListByReferralIdApiResponse =
  /** status 200 OK */ ReferralListResponse[];
export type GetApiMyFinancialReferralListByReferralIdApiArg = {
  referralId: number;
};
export type GetApiMyFinancialReferralGetApiResponse =
  /** status 200 OK */ GetReferralResponse;
export type GetApiMyFinancialReferralGetApiArg = void;
export type GetApiMyFinancialPaymentProviderListApiResponse =
  /** status 200 OK */ PaymentProviderListResponse[];
export type GetApiMyFinancialPaymentProviderListApiArg = void;
export type PostApiMyFinancialPaymentSepCallBackApiResponse = unknown;
export type PostApiMyFinancialPaymentSepCallBackApiArg = {
  sepCallbackModel: SepCallbackModel;
};
export type PostApiMyFinancialPaymentPecCallBackApiResponse = unknown;
export type PostApiMyFinancialPaymentPecCallBackApiArg = {
  pecConfirmCallRequest: PecConfirmCallRequest;
};
export type GetApiMyFinancialPaymentListDownloadApiResponse =
  /** status 200 OK */ Blob;
export type GetApiMyFinancialPaymentListDownloadApiArg = void;
export type GetApiMyFinancialPaymentListApiResponse =
  /** status 200 OK */ PaymentListResponse[];
export type GetApiMyFinancialPaymentListApiArg = void;
export type GetApiMyFinancialPaymentGetByIdApiResponse =
  /** status 200 OK */ GetPaymentResponse;
export type GetApiMyFinancialPaymentGetByIdApiArg = {
  id: number;
};
export type PostApiMyFinancialPaymentBfaCallBackApiResponse = unknown;
export type PostApiMyFinancialPaymentBfaCallBackApiArg = {
  fanavaConfirmRequest: FanavaConfirmRequest;
};
export type PostApiMyFinancialPaymentCreateApiResponse =
  /** status 200 OK */ CreatePaymentResponse;
export type PostApiMyFinancialPaymentCreateApiArg = {
  createPaymentModel: CreatePaymentModel;
};
export type PostApiMyFinancialPaymentBpmCallBackApiResponse = unknown;
export type PostApiMyFinancialPaymentBpmCallBackApiArg = {
  bpmConfirmCallRequest: BpmConfirmCallRequest;
};
export type PostApiMyFinancialOfferPayApiResponse =
  /** status 200 OK */ OrderOfferPayResponse;
export type PostApiMyFinancialOfferPayApiArg = {
  orderOfferPayModel: OrderOfferPayModel;
};
export type GetApiMyFinancialOfferListApiResponse =
  /** status 200 OK */ OfferListResponse[];
export type GetApiMyFinancialOfferListApiArg = void;
export type GetApiMyFinancialOfferGetByIdApiResponse =
  /** status 200 OK */ OfferGetResponse;
export type GetApiMyFinancialOfferGetByIdApiArg = {
  id: number;
};
export type GetApiMyFinancialOrderShortListApiResponse =
  /** status 200 OK */ OrderShortListResponse[];
export type GetApiMyFinancialOrderShortListApiArg = void;
export type GetApiMyFinancialOrderListByProductIdApiResponse =
  /** status 200 OK */ OrderListResponse[];
export type GetApiMyFinancialOrderListByProductIdApiArg = {
  productId: number;
};
export type GetApiMyFinancialInvoiceUnpaidApiResponse =
  /** status 200 OK */ UnPaidInvoiceResponse[];
export type GetApiMyFinancialInvoiceUnpaidApiArg = void;
export type GetApiMyFinancialInvoiceSummaryApiResponse =
  /** status 200 OK */ InvoiceSummaryResponse;
export type GetApiMyFinancialInvoiceSummaryApiArg = void;
export type PostApiMyFinancialInvoicePayApiResponse =
  /** status 200 OK */ PayInvoiceResponse;
export type PostApiMyFinancialInvoicePayApiArg = {
  payInvoiceModel: PayInvoiceModel;
};
export type GetApiMyFinancialInvoiceListDownloadApiResponse =
  /** status 200 OK */ Blob;
export type GetApiMyFinancialInvoiceListDownloadApiArg = void;
export type GetApiMyFinancialInvoiceListApiResponse =
  /** status 200 OK */ InvoiceListResponse[];
export type GetApiMyFinancialInvoiceListApiArg = void;
export type GetApiMyFinancialInvoiceGetByIdApiResponse =
  /** status 200 OK */ GetInvoiceResponse;
export type GetApiMyFinancialInvoiceGetByIdApiArg = {
  id: number;
};
export type GetApiMyFinancialCalculateMonthListApiResponse =
  /** status 200 OK */ CalculateMonthListResponse[];
export type GetApiMyFinancialCalculateMonthListApiArg = void;
export type GetApiMyFinancialBillShortListApiResponse =
  /** status 200 OK */ BillShortListResponse[];
export type GetApiMyFinancialBillShortListApiArg = void;
export type GetApiMyFinancialBillListDownloadByIdApiResponse =
  /** status 200 OK */ Blob;
export type GetApiMyFinancialBillListDownloadByIdApiArg = {
  id: number;
};
export type GetApiMyFinancialBillListApiResponse =
  /** status 200 OK */ BillListResponse[];
export type GetApiMyFinancialBillListApiArg = void;
export type GetApiMyFinancialBillGetByIdApiResponse =
  /** status 200 OK */ GetBillResponse;
export type GetApiMyFinancialBillGetByIdApiArg = {
  id: number;
};
export type GetApiMyHomeIndexApiResponse = unknown;
export type GetApiMyHomeIndexApiArg = void;
export type GetApiMyInfraDatacenterListApiResponse =
  /** status 200 OK */ DatacenterListResponse[];
export type GetApiMyInfraDatacenterListApiArg = void;
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretListApiResponse =
  /** status 200 OK */ KuberSecretListResponse[];
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretListApiArg =
  {
    projectId: number;
    kuberHostId: number;
  };
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretGetIdApiResponse =
  /** status 200 OK */ GetKuberSecretResponse;
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretGetIdApiArg =
  {
    projectId: number;
    kuberHostId: number;
    id: number;
  };
export type PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretEditIdApiResponse =
  unknown;
export type PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretEditIdApiArg =
  {
    projectId: number;
    kuberHostId: number;
    id: number;
    editKuberSecretModel: EditKuberSecretModel;
  };
export type DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretDeleteIdApiResponse =
  unknown;
export type DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretDeleteIdApiArg =
  {
    projectId: number;
    kuberHostId: number;
    id: number;
  };
export type PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretCreateApiResponse =
  unknown;
export type PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretCreateApiArg =
  {
    projectId: number;
    kuberHostId: number;
    createKuberSecretModel: CreateKuberSecretModel;
  };
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressListApiResponse =
  /** status 200 OK */ KuberIngressListResponse[];
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressListApiArg =
  {
    projectId: number;
    kuberHostId: number;
  };
export type PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleEditIdApiResponse =
  unknown;
export type PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleEditIdApiArg =
  {
    projectId: number;
    kuberHostId: number;
    kuberIngressId: number;
    id: number;
    editKuberIngressRuleModel: EditKuberIngressRuleModel;
  };
export type DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleDeleteIdApiResponse =
  unknown;
export type DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleDeleteIdApiArg =
  {
    projectId: number;
    kuberHostId: number;
    kuberIngressId: number;
    id: number;
  };
export type PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleCreateApiResponse =
  unknown;
export type PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleCreateApiArg =
  {
    projectId: number;
    kuberHostId: number;
    kuberIngressId: number;
    createKuberIngressRuleModel: CreateKuberIngressRuleModel;
  };
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressGetIdApiResponse =
  /** status 200 OK */ GetKuberIngressResponse;
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressGetIdApiArg =
  {
    projectId: number;
    kuberHostId: number;
    id: number;
  };
export type DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressDeleteIdApiResponse =
  unknown;
export type DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressDeleteIdApiArg =
  {
    projectId: number;
    kuberHostId: number;
    id: number;
  };
export type PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressCreateApiResponse =
  unknown;
export type PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressCreateApiArg =
  {
    projectId: number;
    kuberHostId: number;
    createKuberIngressModel: CreateKuberIngressModel;
  };
export type GetApiMyKubernetesCloudCategoryListApiResponse =
  /** status 200 OK */ KuberImageCategoryResponse[];
export type GetApiMyKubernetesCloudCategoryListApiArg = void;
export type GetApiMyKubernetesCloudImageListApiResponse =
  /** status 200 OK */ KuberImageResponse[];
export type GetApiMyKubernetesCloudImageListApiArg = void;
export type GetApiMyKubernetesCloudByProjectIdHostListApiResponse =
  /** status 200 OK */ KuberHostListResponse[];
export type GetApiMyKubernetesCloudByProjectIdHostListApiArg = {
  projectId: number;
};
export type GetApiMyKubernetesCloudByProjectIdHostGetAndIdApiResponse =
  /** status 200 OK */ KuberHostGetResponse;
export type GetApiMyKubernetesCloudByProjectIdHostGetAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PutApiMyKubernetesCloudByProjectIdHostEditAndIdApiResponse =
  unknown;
export type PutApiMyKubernetesCloudByProjectIdHostEditAndIdApiArg = {
  projectId: number;
  id: number;
  editKuberHostModel: EditKuberHostModel;
};
export type DeleteApiMyKubernetesCloudByProjectIdHostDeleteAndIdApiResponse =
  unknown;
export type DeleteApiMyKubernetesCloudByProjectIdHostDeleteAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyKubernetesCloudByProjectIdHostCreateApiResponse = unknown;
export type PostApiMyKubernetesCloudByProjectIdHostCreateApiArg = {
  projectId: number;
  createKuberHostModel: CreateKuberHostModel;
};
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallListApiResponse =
  /** status 200 OK */ KuberFirewallListResponse[];
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallListApiArg =
  {
    projectId: number;
    kuberHostId: number;
  };
export type DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallDeleteIdApiResponse =
  unknown;
export type DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallDeleteIdApiArg =
  {
    projectId: number;
    kuberHostId: number;
    id: number;
  };
export type PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallCreateApiResponse =
  unknown;
export type PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallCreateApiArg =
  {
    projectId: number;
    kuberHostId: number;
    createKuberFirewallModel: CreateKuberFirewallModel;
  };
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployPortListApiResponse =
  /** status 200 OK */ KuberDeployPortListResponse[];
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployPortListApiArg =
  {
    projectId: number;
    kuberHostId: number;
  };
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployListApiResponse =
  /** status 200 OK */ KuberDeployListResponse[];
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployListApiArg =
  {
    projectId: number;
    kuberHostId: number;
  };
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployGetIdApiResponse =
  /** status 200 OK */ GetKuberDeployResponse;
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployGetIdApiArg =
  {
    projectId: number;
    kuberHostId: number;
    id: number;
  };
export type PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployEditIdApiResponse =
  unknown;
export type PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployEditIdApiArg =
  {
    projectId: number;
    kuberHostId: number;
    id: number;
    editKuberDeployModel: EditKuberDeployModel;
  };
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployKuberDeployIdEnvListApiResponse =
  /** status 200 OK */ KuberDeployEnvListResponse[];
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployKuberDeployIdEnvListApiArg =
  {
    projectId: number;
    kuberHostId: number;
    kuberDeployId: number;
  };
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployKuberDeployIdEnvGetIdApiResponse =
  /** status 200 OK */ GetKuberDeployEnvResponse;
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployKuberDeployIdEnvGetIdApiArg =
  {
    projectId: number;
    kuberHostId: number;
    kuberDeployId: number;
    id: number;
  };
export type DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployDeleteIdApiResponse =
  unknown;
export type DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployDeleteIdApiArg =
  {
    projectId: number;
    kuberHostId: number;
    id: number;
  };
export type PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployCreateApiResponse =
  unknown;
export type PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployCreateApiArg =
  {
    projectId: number;
    kuberHostId: number;
    createKuberDeployModel: CreateKuberDeployModel;
  };
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapListApiResponse =
  /** status 200 OK */ KuberConfigListResponse[];
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapListApiArg =
  {
    projectId: number;
    kuberHostId: number;
  };
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapGetIdApiResponse =
  /** status 200 OK */ GetKuberConfigResponse;
export type GetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapGetIdApiArg =
  {
    projectId: number;
    kuberHostId: number;
    id: number;
  };
export type PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapEditIdApiResponse =
  unknown;
export type PutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapEditIdApiArg =
  {
    projectId: number;
    kuberHostId: number;
    id: number;
    editKuberConfigmapModel: EditKuberConfigmapModel;
  };
export type DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapDeleteIdApiResponse =
  unknown;
export type DeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapDeleteIdApiArg =
  {
    projectId: number;
    kuberHostId: number;
    id: number;
  };
export type PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapCreateApiResponse =
  unknown;
export type PostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapCreateApiArg =
  {
    projectId: number;
    kuberHostId: number;
    createKuberConfigmapModel: CreateKuberConfigmapModel;
  };
export type GetApiMyKubernetesClusterVersionListApiResponse =
  /** status 200 OK */ KuberClusterVersionListResponse[];
export type GetApiMyKubernetesClusterVersionListApiArg = void;
export type GetApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeListApiResponse =
  /** status 200 OK */ KubernetesNodeListResponse[];
export type GetApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeListApiArg =
  {
    projectId: number;
    kuberClusterHostId: number;
  };
export type DeleteApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeDeleteIdApiResponse =
  unknown;
export type DeleteApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeDeleteIdApiArg =
  {
    projectId: number;
    kuberClusterHostId: number;
    id: number;
  };
export type PostApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeCreateApiResponse =
  unknown;
export type PostApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeCreateApiArg =
  {
    projectId: number;
    kuberClusterHostId: number;
    createKubernetesNodeModel: CreateKubernetesNodeModel;
  };
export type GetApiMyKubernetesClusterByProjectIdHostListApiResponse =
  /** status 200 OK */ KuberClusterListResponse[];
export type GetApiMyKubernetesClusterByProjectIdHostListApiArg = {
  projectId: number;
};
export type GetApiMyKubernetesClusterByProjectIdHostGetAndIdApiResponse =
  /** status 200 OK */ GetKuberClusterResponse;
export type GetApiMyKubernetesClusterByProjectIdHostGetAndIdApiArg = {
  projectId: number;
  id: number;
};
export type DeleteApiMyKubernetesClusterByProjectIdHostDeleteAndIdApiResponse =
  unknown;
export type DeleteApiMyKubernetesClusterByProjectIdHostDeleteAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyKubernetesClusterByProjectIdHostCreateApiResponse =
  unknown;
export type PostApiMyKubernetesClusterByProjectIdHostCreateApiArg = {
  projectId: number;
  createKuberClusterModel: CreateKuberClusterModel;
};
export type GetApiMyStorageByProjectIdHostAndStorageHostIdKeyListApiResponse =
  /** status 200 OK */ StorageKeyListResponse[];
export type GetApiMyStorageByProjectIdHostAndStorageHostIdKeyListApiArg = {
  projectId: number;
  storageHostId: number;
};
export type DeleteApiMyStorageByProjectIdHostAndStorageHostIdKeyDeleteIdApiResponse =
  unknown;
export type DeleteApiMyStorageByProjectIdHostAndStorageHostIdKeyDeleteIdApiArg =
  {
    projectId: number;
    storageHostId: number;
    id: number;
  };
export type PostApiMyStorageByProjectIdHostAndStorageHostIdKeyCreateApiResponse =
  /** status 200 OK */ CreateStorageKeyResponse;
export type PostApiMyStorageByProjectIdHostAndStorageHostIdKeyCreateApiArg = {
  projectId: number;
  storageHostId: number;
};
export type GetApiMyStorageByProjectIdHostListApiResponse =
  /** status 200 OK */ StorageHostListResponse[];
export type GetApiMyStorageByProjectIdHostListApiArg = {
  projectId: number;
};
export type GetApiMyStorageByProjectIdHostGetAndIdApiResponse =
  /** status 200 OK */ GetStorageHostResponse;
export type GetApiMyStorageByProjectIdHostGetAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PutApiMyStorageByProjectIdHostEditAndIdApiResponse = unknown;
export type PutApiMyStorageByProjectIdHostEditAndIdApiArg = {
  projectId: number;
  id: number;
  editStorageHostModel: EditStorageHostModel;
};
export type DeleteApiMyStorageByProjectIdHostDeleteAndIdApiResponse = unknown;
export type DeleteApiMyStorageByProjectIdHostDeleteAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyStorageByProjectIdHostCreateApiResponse = unknown;
export type PostApiMyStorageByProjectIdHostCreateApiArg = {
  projectId: number;
  createStorageHostModel: CreateStorageHostModel;
};
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
export type GetApiMyPortalProductBundleVolumeListApiResponse =
  /** status 200 OK */ ProductBundleBlockStorageListResponse[];
export type GetApiMyPortalProductBundleVolumeListApiArg = void;
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
export type GetApiMyPortalNotificationShortListApiResponse =
  /** status 200 OK */ NotificationListResponse[];
export type GetApiMyPortalNotificationShortListApiArg = void;
export type PutApiMyPortalNotificationSeenByIdApiResponse = unknown;
export type PutApiMyPortalNotificationSeenByIdApiArg = {
  id: number;
};
export type GetApiMyPortalNotificationListApiResponse =
  /** status 200 OK */ NotificationListResponse[];
export type GetApiMyPortalNotificationListApiArg = void;
export type PostApiMyPortalIssueSubjectShortListApiResponse =
  /** status 200 OK */ IssueSubjectShortListResponse[];
export type PostApiMyPortalIssueSubjectShortListApiArg = {
  issueSubjectShortListModel: IssueSubjectShortListModel;
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
  createIssueItemModel: CreateIssueItemModel;
};
export type GetApiMyPortalIssueShortListApiResponse =
  /** status 200 OK */ IssueShortListResponse[];
export type GetApiMyPortalIssueShortListApiArg = void;
export type GetApiMyPortalIssueListApiResponse =
  /** status 200 OK */ IssueListResponse[];
export type GetApiMyPortalIssueListApiArg = void;
export type PostApiMyPortalIssueCreateApiResponse = unknown;
export type PostApiMyPortalIssueCreateApiArg = {
  createIssueModel: CreateIssueModel;
};
export type GetApiMyPortalCustomerLimitResourceUsagesApiResponse =
  /** status 200 OK */ ResourceUsageResponse;
export type GetApiMyPortalCustomerLimitResourceUsagesApiArg = void;
export type GetApiMyPortalBusinessUnitListApiResponse =
  /** status 200 OK */ BusinessUnitListResponse[];
export type GetApiMyPortalBusinessUnitListApiArg = void;
export type GetApiMyByProjectIdUserListApiResponse =
  /** status 200 OK */ ProjectUserListResponse[];
export type GetApiMyByProjectIdUserListApiArg = {
  projectId: number;
};
export type PostApiMyByProjectIdUserEditAndIdApiResponse = unknown;
export type PostApiMyByProjectIdUserEditAndIdApiArg = {
  projectId: number;
  id: number;
  editProjectUserModel: EditProjectUserModel;
};
export type DeleteApiMyByProjectIdUserDeleteAndIdApiResponse = unknown;
export type DeleteApiMyByProjectIdUserDeleteAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyByProjectIdUserCreateApiResponse = unknown;
export type PostApiMyByProjectIdUserCreateApiArg = {
  projectId: number;
  createProjectUserModel: CreateProjectUserModel;
};
export type GetApiMyProjectListApiResponse =
  /** status 200 OK */ ProjectListResponse[];
export type GetApiMyProjectListApiArg = void;
export type GetApiMyProjectGetByIdApiResponse =
  /** status 200 OK */ ProjectGetResponse;
export type GetApiMyProjectGetByIdApiArg = {
  id: number;
};
export type DeleteApiMyProjectDeleteByIdApiResponse = unknown;
export type DeleteApiMyProjectDeleteByIdApiArg = {
  id: number;
};
export type PostApiMyCreateApiResponse = unknown;
export type PostApiMyCreateApiArg = {
  createProjectModel: CreateProjectModel;
};
export type GetApiMyVmByProjectIdVpcAndVpcHostIdNetworkAccessListApiResponse =
  /** status 200 OK */ VpcPrivateNetworkRequestListResponse[];
export type GetApiMyVmByProjectIdVpcAndVpcHostIdNetworkAccessListApiArg = {
  projectId: number;
  vpcHostId: number;
};
export type PostApiMyVmByProjectIdVpcAndVpcHostIdNetworkAccessCreateApiResponse =
  unknown;
export type PostApiMyVmByProjectIdVpcAndVpcHostIdNetworkAccessCreateApiArg = {
  projectId: number;
  vpcHostId: number;
  createVpcNetworkAccessModel: CreateVpcNetworkAccessModel;
};
export type DeleteApiMyVmByProjectIdVpcAndVpcHostIdInterfaceRemoveIdApiResponse =
  unknown;
export type DeleteApiMyVmByProjectIdVpcAndVpcHostIdInterfaceRemoveIdApiArg = {
  projectId: number;
  vpcHostId: number;
  id: number;
};
export type GetApiMyVmByProjectIdVpcAndVpcHostIdInterfaceListApiResponse =
  /** status 200 OK */ VmNetworkListResponse[];
export type GetApiMyVmByProjectIdVpcAndVpcHostIdInterfaceListApiArg = {
  projectId: number;
  vpcHostId: number;
};
export type PostApiMyVmByProjectIdVpcAndVpcHostIdInterfaceCreateApiResponse =
  unknown;
export type PostApiMyVmByProjectIdVpcAndVpcHostIdInterfaceCreateApiArg = {
  projectId: number;
  vpcHostId: number;
  createVpcInterfaceModel: CreateVpcInterfaceModel;
};
export type GetApiMyVmByProjectIdVpcAndVpcHostIdNatListApiResponse =
  /** status 200 OK */ GetVpcNatResponse[];
export type GetApiMyVmByProjectIdVpcAndVpcHostIdNatListApiArg = {
  projectId: number;
  vpcHostId: number;
};
export type GetApiMyVmByProjectIdVpcAndVpcHostIdNatGetIdApiResponse =
  /** status 200 OK */ GetVpcNatResponse;
export type GetApiMyVmByProjectIdVpcAndVpcHostIdNatGetIdApiArg = {
  projectId: number;
  vpcHostId: number;
  id: number;
};
export type DeleteApiMyVmByProjectIdVpcAndVpcHostIdNatDeleteSnatApiResponse =
  unknown;
export type DeleteApiMyVmByProjectIdVpcAndVpcHostIdNatDeleteSnatApiArg = {
  projectId: number;
  vpcHostId: number;
};
export type DeleteApiMyVmByProjectIdVpcAndVpcHostIdNatDeleteIdApiResponse =
  unknown;
export type DeleteApiMyVmByProjectIdVpcAndVpcHostIdNatDeleteIdApiArg = {
  projectId: number;
  vpcHostId: number;
  id: number;
};
export type PostApiMyVmByProjectIdVpcAndVpcHostIdNatCreateSnatApiResponse =
  unknown;
export type PostApiMyVmByProjectIdVpcAndVpcHostIdNatCreateSnatApiArg = {
  projectId: number;
  vpcHostId: number;
  createVpcSnatModel: CreateVpcSnatModel;
};
export type PostApiMyVmByProjectIdVpcAndVpcHostIdNatCreateDnatApiResponse =
  unknown;
export type PostApiMyVmByProjectIdVpcAndVpcHostIdNatCreateDnatApiArg = {
  projectId: number;
  vpcHostId: number;
  createVpcDnatModel: CreateVpcDnatModel;
};
export type GetApiMyVmByProjectIdVpcAndVpcHostIdIpListApiResponse =
  /** status 200 OK */ VpcHostIpListResponse[];
export type GetApiMyVmByProjectIdVpcAndVpcHostIdIpListApiArg = {
  projectId: number;
  vpcHostId: number;
};
export type DeleteApiMyVmByProjectIdVpcAndVpcHostIdIpDeleteIdApiResponse =
  unknown;
export type DeleteApiMyVmByProjectIdVpcAndVpcHostIdIpDeleteIdApiArg = {
  projectId: number;
  vpcHostId: number;
  id: number;
};
export type PostApiMyVmByProjectIdVpcAndVpcHostIdIpCreateApiResponse = unknown;
export type PostApiMyVmByProjectIdVpcAndVpcHostIdIpCreateApiArg = {
  projectId: number;
  vpcHostId: number;
  createVpcIpModel: CreateVpcIpModel;
};
export type GetApiMyVmByProjectIdVpcShortListApiResponse =
  /** status 200 OK */ VpcShortListResponse[];
export type GetApiMyVmByProjectIdVpcShortListApiArg = {
  projectId: number;
};
export type GetApiMyVmByProjectIdVpcListApiResponse =
  /** status 200 OK */ VpcListResponse[];
export type GetApiMyVmByProjectIdVpcListApiArg = {
  projectId: number;
};
export type GetApiMyVmByProjectIdVpcGetAndIdApiResponse =
  /** status 200 OK */ VpcResponse;
export type GetApiMyVmByProjectIdVpcGetAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PutApiMyVmByProjectIdVpcEditAndIdApiResponse = unknown;
export type PutApiMyVmByProjectIdVpcEditAndIdApiArg = {
  projectId: number;
  id: number;
  editVpcHostModel: EditVpcHostModel;
};
export type DeleteApiMyVmByProjectIdVpcDeleteAndIdApiResponse = unknown;
export type DeleteApiMyVmByProjectIdVpcDeleteAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyVmByProjectIdVpcCreateApiResponse = unknown;
export type PostApiMyVmByProjectIdVpcCreateApiArg = {
  projectId: number;
  createVpcHostModel: CreateVpcHostModel;
};
export type GetApiMyVmByProjectIdVolumeNodeGetApiResponse =
  /** status 200 OK */ GetVmVolumeNodeResponse;
export type GetApiMyVmByProjectIdVolumeNodeGetApiArg = {
  vmHostId?: number;
  vmVolumeHostId?: number;
  projectId: number;
};
export type PutApiMyVmByProjectIdVolumeNodeDetachAndIdApiResponse = unknown;
export type PutApiMyVmByProjectIdVolumeNodeDetachAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyVmByProjectIdVolumeNodeAttachApiResponse = unknown;
export type PostApiMyVmByProjectIdVolumeNodeAttachApiArg = {
  projectId: number;
  attachVolumeModel: AttachVolumeModel;
};
export type GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotShortListApiResponse =
  /** status 200 OK */ VolumeSnapshotShortListResponse[];
export type GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotShortListApiArg =
  {
    projectId: number;
    vmVolumeHostId: number;
  };
export type PutApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotRevertIdApiResponse =
  unknown;
export type PutApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotRevertIdApiArg =
  {
    projectId: number;
    vmVolumeHostId: number;
    id: number;
  };
export type GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotListApiResponse =
  /** status 200 OK */ VolumeSnapshotResponse[];
export type GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotListApiArg = {
  projectId: number;
  vmVolumeHostId: number;
};
export type GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotGetIdApiResponse =
  /** status 200 OK */ VolumeSnapshotResponse;
export type GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotGetIdApiArg = {
  projectId: number;
  vmVolumeHostId: number;
  id: number;
};
export type DeleteApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotDeleteIdApiResponse =
  unknown;
export type DeleteApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotDeleteIdApiArg =
  {
    projectId: number;
    vmVolumeHostId: number;
    id: number;
  };
export type PostApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotCreateApiResponse =
  unknown;
export type PostApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotCreateApiArg =
  {
    projectId: number;
    vmVolumeHostId: number;
    createVolumeSnapshotModel: CreateVolumeSnapshotModel;
  };
export type GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupShortListApiResponse =
  /** status 200 OK */ VolumeBackupShortListResponse[];
export type GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupShortListApiArg =
  {
    projectId: number;
    vmVolumeHostId: number;
  };
export type PostApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupRestoreIdApiResponse =
  unknown;
export type PostApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupRestoreIdApiArg =
  {
    projectId: number;
    vmVolumeHostId: number;
    id: number;
  };
export type GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupListApiResponse =
  /** status 200 OK */ VolumeBackupListResponse[];
export type GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupListApiArg = {
  projectId: number;
  vmVolumeHostId: number;
};
export type GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupGetIdApiResponse =
  /** status 200 OK */ GetVolumeBackupResponse;
export type GetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupGetIdApiArg = {
  projectId: number;
  vmVolumeHostId: number;
  id: number;
};
export type DeleteApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupDeleteIdApiResponse =
  unknown;
export type DeleteApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupDeleteIdApiArg =
  {
    projectId: number;
    vmVolumeHostId: number;
    id: number;
  };
export type PostApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupCreateApiResponse =
  unknown;
export type PostApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupCreateApiArg = {
  projectId: number;
  vmVolumeHostId: number;
  createVolumeBackupModel: CreateVolumeBackupModel;
};
export type GetApiMyVmByProjectIdVolumeListApiResponse =
  /** status 200 OK */ VolumeListResponse[];
export type GetApiMyVmByProjectIdVolumeListApiArg = {
  projectId: number;
};
export type GetApiMyVmByProjectIdVolumeGetAndIdApiResponse =
  /** status 200 OK */ GetVolumeHostResponse;
export type GetApiMyVmByProjectIdVolumeGetAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PutApiMyVmByProjectIdVolumeEditAndIdApiResponse = unknown;
export type PutApiMyVmByProjectIdVolumeEditAndIdApiArg = {
  projectId: number;
  id: number;
  editVolumeHostModel: EditVolumeHostModel;
};
export type DeleteApiMyVmByProjectIdVolumeDeleteAndIdApiResponse = unknown;
export type DeleteApiMyVmByProjectIdVolumeDeleteAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyVmByProjectIdVolumeCreateApiResponse = unknown;
export type PostApiMyVmByProjectIdVolumeCreateApiArg = {
  projectId: number;
  createVolumeHostModel: CreateVolumeHostModel;
};
export type GetApiMyVmByProjectIdNetworkNodeListApiResponse =
  /** status 200 OK */ VmNetworkNodeListResponse[];
export type GetApiMyVmByProjectIdNetworkNodeListApiArg = {
  vmHostId?: number;
  vmNetworkId?: number;
  projectId: number;
};
export type PutApiMyVmByProjectIdNetworkNodeDetachAndIdApiResponse = unknown;
export type PutApiMyVmByProjectIdNetworkNodeDetachAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyVmByProjectIdNetworkNodeAttachApiResponse = unknown;
export type PostApiMyVmByProjectIdNetworkNodeAttachApiArg = {
  projectId: number;
  attachNetworkModel: AttachNetworkModel;
};
export type GetApiMyVmByProjectIdNetworkShortListApiResponse =
  /** status 200 OK */ VmNetworkShortListResponse[];
export type GetApiMyVmByProjectIdNetworkShortListApiArg = {
  projectId: number;
};
export type GetApiMyVmByProjectIdNetworkListApiResponse =
  /** status 200 OK */ VmNetworkListResponse[];
export type GetApiMyVmByProjectIdNetworkListApiArg = {
  projectId: number;
};
export type DeleteApiMyVmByProjectIdNetworkDeleteAndIdApiResponse = unknown;
export type DeleteApiMyVmByProjectIdNetworkDeleteAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyVmByProjectIdNetworkCreateApiResponse = unknown;
export type PostApiMyVmByProjectIdNetworkCreateApiArg = {
  projectId: number;
  createVmNetworkModel: CreateVmNetworkModel;
};
export type PostApiMyVmByProjectIdLoadBalancerHostCreateApiResponse = unknown;
export type PostApiMyVmByProjectIdLoadBalancerHostCreateApiArg = {
  projectId: number;
  createVmLbModel: CreateVmLbModel;
};
export type GetApiMyVmByProjectIdKeyListApiResponse =
  /** status 200 OK */ VmKeyListResponse[];
export type GetApiMyVmByProjectIdKeyListApiArg = {
  projectId: number;
};
export type DeleteApiMyVmByProjectIdKeyDeleteAndIdApiResponse = unknown;
export type DeleteApiMyVmByProjectIdKeyDeleteAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyVmByProjectIdKeyCreateApiResponse = unknown;
export type PostApiMyVmByProjectIdKeyCreateApiArg = {
  projectId: number;
  createVmKeyModel: CreateVmKeyModel;
};
export type GetApiMyVmByProjectIdImageListApiResponse =
  /** status 200 OK */ VmImageListResponse[];
export type GetApiMyVmByProjectIdImageListApiArg = {
  productId: number;
  projectId: number;
};
export type GetApiMyVmByProjectIdHostAndVmHostIdVolumeListApiResponse =
  /** status 200 OK */ VmHostVolumeListResponse[];
export type GetApiMyVmByProjectIdHostAndVmHostIdVolumeListApiArg = {
  projectId: number;
  vmHostId: number;
};
export type GetApiMyVmByProjectIdHostAndVmHostIdVolumeGetIdApiResponse =
  /** status 200 OK */ GetVmHostVolumeResponse;
export type GetApiMyVmByProjectIdHostAndVmHostIdVolumeGetIdApiArg = {
  projectId: number;
  vmHostId: number;
  id: number;
};
export type DeleteApiMyVmByProjectIdHostAndVmHostIdVolumeDeleteIdApiResponse =
  unknown;
export type DeleteApiMyVmByProjectIdHostAndVmHostIdVolumeDeleteIdApiArg = {
  projectId: number;
  vmHostId: number;
  id: number;
};
export type GetApiMyVmByProjectIdHostAndVmHostIdSnapshotShortListApiResponse =
  /** status 200 OK */ VmHostSnapshotShortListResponse[];
export type GetApiMyVmByProjectIdHostAndVmHostIdSnapshotShortListApiArg = {
  projectId: number;
  vmHostId: number;
};
export type PutApiMyVmByProjectIdHostAndVmHostIdSnapshotRevertIdApiResponse =
  unknown;
export type PutApiMyVmByProjectIdHostAndVmHostIdSnapshotRevertIdApiArg = {
  projectId: number;
  vmHostId: number;
  id: number;
};
export type GetApiMyVmByProjectIdHostAndVmHostIdSnapshotListApiResponse =
  /** status 200 OK */ VmHostSnapshotListResponse[];
export type GetApiMyVmByProjectIdHostAndVmHostIdSnapshotListApiArg = {
  projectId: number;
  vmHostId: number;
};
export type GetApiMyVmByProjectIdHostAndVmHostIdSnapshotGetIdApiResponse =
  /** status 200 OK */ GetVmHostSnapshotResponse;
export type GetApiMyVmByProjectIdHostAndVmHostIdSnapshotGetIdApiArg = {
  projectId: number;
  vmHostId: number;
  id: number;
};
export type DeleteApiMyVmByProjectIdHostAndVmHostIdSnapshotDeleteIdApiResponse =
  unknown;
export type DeleteApiMyVmByProjectIdHostAndVmHostIdSnapshotDeleteIdApiArg = {
  projectId: number;
  vmHostId: number;
  id: number;
};
export type PostApiMyVmByProjectIdHostAndVmHostIdSnapshotCreateApiResponse =
  unknown;
export type PostApiMyVmByProjectIdHostAndVmHostIdSnapshotCreateApiArg = {
  projectId: number;
  vmHostId: number;
  createVmHostSnapshotModel: CreateVmHostSnapshotModel;
};
export type GetApiMyVmByProjectIdHostAndVmHostIdIpListApiResponse =
  /** status 200 OK */ VmHostIpListResponse[];
export type GetApiMyVmByProjectIdHostAndVmHostIdIpListApiArg = {
  projectId: number;
  vmHostId: number;
};
export type DeleteApiMyVmByProjectIdHostAndVmHostIdIpDeleteIdApiResponse =
  unknown;
export type DeleteApiMyVmByProjectIdHostAndVmHostIdIpDeleteIdApiArg = {
  projectId: number;
  vmHostId: number;
  id: number;
};
export type PostApiMyVmByProjectIdHostAndVmHostIdIpCreateApiResponse = unknown;
export type PostApiMyVmByProjectIdHostAndVmHostIdIpCreateApiArg = {
  projectId: number;
  vmHostId: number;
  createVmIpModel: CreateVmIpModel;
};
export type GetApiMyVmByProjectIdHostAndVmHostIdFirewallListApiResponse =
  /** status 200 OK */ VmFirewallRuleListResponse[];
export type GetApiMyVmByProjectIdHostAndVmHostIdFirewallListApiArg = {
  projectId: number;
  vmHostId: number;
};
export type GetApiMyVmByProjectIdHostAndVmHostIdFirewallGetIdApiResponse =
  /** status 200 OK */ GetVmFirewallRuleResponse;
export type GetApiMyVmByProjectIdHostAndVmHostIdFirewallGetIdApiArg = {
  projectId: number;
  vmHostId: number;
  id: number;
};
export type DeleteApiMyVmByProjectIdHostAndVmHostIdFirewallDeleteIdApiResponse =
  unknown;
export type DeleteApiMyVmByProjectIdHostAndVmHostIdFirewallDeleteIdApiArg = {
  projectId: number;
  vmHostId: number;
  id: number;
};
export type PostApiMyVmByProjectIdHostAndVmHostIdFirewallCreateApiResponse =
  unknown;
export type PostApiMyVmByProjectIdHostAndVmHostIdFirewallCreateApiArg = {
  projectId: number;
  vmHostId: number;
  createVmFirewallRuleModel: CreateVmFirewallRuleModel;
};
export type PutApiMyVmByProjectIdHostStopAndIdApiResponse = unknown;
export type PutApiMyVmByProjectIdHostStopAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PutApiMyVmByProjectIdHostStartAndIdApiResponse = unknown;
export type PutApiMyVmByProjectIdHostStartAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PutApiMyVmByProjectIdHostShutdownAndIdApiResponse = unknown;
export type PutApiMyVmByProjectIdHostShutdownAndIdApiArg = {
  projectId: number;
  id: number;
};
export type GetApiMyVmByProjectIdHostShortListApiResponse =
  /** status 200 OK */ VmShortListResponse[];
export type GetApiMyVmByProjectIdHostShortListApiArg = {
  projectId: number;
};
export type PutApiMyVmByProjectIdHostResetAndIdApiResponse = unknown;
export type PutApiMyVmByProjectIdHostResetAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PutApiMyVmByProjectIdHostRebuildAndIdApiResponse = unknown;
export type PutApiMyVmByProjectIdHostRebuildAndIdApiArg = {
  projectId: number;
  id: number;
  rebuildVmModel: RebuildVmModel;
};
export type PutApiMyVmByProjectIdHostRebootAndIdApiResponse = unknown;
export type PutApiMyVmByProjectIdHostRebootAndIdApiArg = {
  projectId: number;
  id: number;
};
export type GetApiMyVmByProjectIdHostListApiResponse =
  /** status 200 OK */ VmListResponse[];
export type GetApiMyVmByProjectIdHostListApiArg = {
  projectId: number;
};
export type GetApiMyVmByProjectIdHostGetAnalyticAndIdApiResponse =
  /** status 200 OK */ GetAnalyticResponse;
export type GetApiMyVmByProjectIdHostGetAnalyticAndIdApiArg = {
  projectId: number;
  id: number;
  getAnalyticModel: GetAnalyticModel;
};
export type GetApiMyVmByProjectIdHostGetAndIdApiResponse =
  /** status 200 OK */ GetVmResponse;
export type GetApiMyVmByProjectIdHostGetAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PutApiMyVmByProjectIdHostEditAndIdApiResponse = unknown;
export type PutApiMyVmByProjectIdHostEditAndIdApiArg = {
  projectId: number;
  id: number;
  editVmModel: EditVmModel;
};
export type DeleteApiMyVmByProjectIdHostDeleteAndIdApiResponse = unknown;
export type DeleteApiMyVmByProjectIdHostDeleteAndIdApiArg = {
  projectId: number;
  id: number;
};
export type PostApiMyVmByProjectIdHostCreateApiResponse = unknown;
export type PostApiMyVmByProjectIdHostCreateApiArg = {
  projectId: number;
  createVmModel: CreateVmModel;
};
export type GetApiMyVmByProjectIdHostConsoleAndIdApiResponse =
  /** status 200 OK */ GetConsoleResponse;
export type GetApiMyVmByProjectIdHostConsoleAndIdApiArg = {
  projectId: number;
  id: number;
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
  /** status 200 OK */ GetWebsiteBolgCommentResponse[];
export type GetApiMyPortalWebsiteBlogCommentGetByIdApiArg = {
  id: number;
};
export type PostApiMyPortalWebsiteBlogCommentCreateApiResponse = unknown;
export type PostApiMyPortalWebsiteBlogCommentCreateApiArg = {
  createWebsiteBolgCommentModel: CreateWebsiteBolgCommentModel;
};
export type GetApiMyPortalWebsiteBlogListApiResponse =
  /** status 200 OK */ WebsiteBolgListResponse[];
export type GetApiMyPortalWebsiteBlogListApiArg = void;
export type GetApiMyPortalWebsiteBlogGetRandomArticlesByLinkApiResponse =
  /** status 200 OK */ GetWebsiteRandomArticleResponse[];
export type GetApiMyPortalWebsiteBlogGetRandomArticlesByLinkApiArg = {
  link: string;
};
export type GetApiMyPortalWebsiteBlogGetHeaderArticlesApiResponse =
  /** status 200 OK */ GetWebsiteHeaderArticleResponse[];
export type GetApiMyPortalWebsiteBlogGetHeaderArticlesApiArg = void;
export type GetApiMyPortalWebsiteBlogGetByLinkApiResponse =
  /** status 200 OK */ GetWebsiteBolgResponse;
export type GetApiMyPortalWebsiteBlogGetByLinkApiArg = {
  link: string;
};
export type GetApiMyPortalWebsiteAlarmListApiResponse =
  /** status 200 OK */ WebsiteAlarmListResponse[];
export type GetApiMyPortalWebsiteAlarmListApiArg = void;
export type UserLogResponse = {
  id?: number;
  userId?: number | null;
  activityDate?: string;
  source?: string | null;
  controller?: string | null;
  action?: string | null;
  userAgent?: string | null;
  userIp?: string | null;
  referrer?: string | null;
  data?: string | null;
};
export type UserLogResponseListPagedResponse = {
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  totalRecords?: number;
  data?: UserLogResponse[] | null;
};
export type GetNotificationStatusResponse = {
  id: number;
  phoneNotify: boolean;
  emailNotify: boolean;
};
export type GetProfileResponse = {
  id?: number;
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
export type ProblemDetails = {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
};
export type TotpTwoFactorModel = {
  code?: number;
};
export type TwoFactorModel = {
  twoFactorStatus?: boolean;
};
export type EditPhoneNumberModel = {
  phoneNumber?: string | null;
};
export type EditPhoneNotifyModel = {
  phoneNotify?: boolean;
};
export type EditEmailNotifyModel = {
  emailNotify?: boolean;
};
export type EditEmailModel = {
  email?: string | null;
};
export type EditProfileResponse = {
  profileCompleted: boolean;
};
export type EditProfileModel = {
  firstName?: string | null;
  lastName?: string | null;
  nationalId?: string | null;
  birthDate?: string;
  address?: string | null;
};
export type ConfirmPhoneNumberModel = {
  confirmCode?: string | null;
};
export type ConfirmEmailModel = {
  confirmCode?: string | null;
};
export type ChangePasswordModel = {
  currentPassword?: string | null;
  password?: string | null;
};
export type CustomerUserListResponse = {
  id: number;
  userId: number;
  user: string | null;
  email: string | null;
  phoneNumber: string | null;
  isSuperManager: boolean;
  isFinancialManager: boolean;
  isAccountManager: boolean;
  isProjectUser: boolean;
  isActive: boolean;
};
export type GetCustomerUserProjectListResponse = {
  project: string | null;
  userAccessType: string | null;
  createDate: string;
};
export type GetCustomerUserResponse = {
  id?: number;
  user: string | null;
  isSuperUser: boolean;
  isFinancialManager: boolean;
  isAccountManager: boolean;
  isProjectUser: boolean;
  projectList: GetCustomerUserProjectListResponse[] | null;
};
export type CreateCustomerUserModel = {
  userName?: string | null;
  isSuperUser?: boolean;
  isFinancialManager?: boolean;
  isAccountManager?: boolean;
};
export type ChangeCustomerUserModel = {
  customerId?: number;
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
  name?: string | null;
  nationalId?: string | null;
  phone?: string | null;
  postalCode?: string | null;
  address?: string | null;
  registrationDate?: string | null;
};
export type ConvertCustomerToLegalModel = {
  name?: string | null;
  nationalId?: string | null;
  phoneNumber?: string | null;
  postalCode?: string | null;
  address?: string | null;
  registrationDate?: string | null;
};
export type LoginResponse = {
  enableTwoFactor?: boolean;
  accessToken?: string | null;
  userId?: number;
  userTitle?: string | null;
  isSuperUser?: boolean;
  isFinancialManager?: boolean;
  isAccountManager?: boolean;
  profileCompleted?: boolean;
  captchaRequired?: boolean;
  roles?: number[] | null;
};
export type TwoFactorLoginModel = {
  email?: string | null;
  confirmCode?: number;
};
export type RegisterModel = {
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  password?: string | null;
  captchaKey?: string;
  captchaCode?: string | null;
  referralCode?: string | null;
};
export type SsoLoginResponse = {
  url: string | null;
};
export type SsoLoginModel = {
  code?: string | null;
};
export type LoginModel = {
  email?: string | null;
  password?: string | null;
  captchaKey?: string | null;
  captchaCode?: string | null;
};
export type ForgotConfirmModel = {
  email?: string | null;
  password?: string | null;
  confirmCode?: number;
};
export type ForgotModel = {
  email?: string | null;
  captchaKey?: string;
  captchaCode?: string | null;
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
export type BareMetalImageListResponse = {
  id: number;
  name: string | null;
  bareMetalHostImageOsId: number;
  bareMetalHostImageOs: string | null;
  status: boolean;
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
  productBundleId?: number;
  name?: string | null;
  imageId?: number;
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
  equipmentId?: number;
  inventoryNumber?: string | null;
};
export type CreateColocationModel = {
  name?: string | null;
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
  productBundleId?: number;
};
export type CreateWebHostModel = {
  domainName?: string | null;
  productBundleId?: number;
};
export type CheckWebHostDomainModel = {
  domainName?: string | null;
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
export type GetNsResponse = {
  status?: boolean;
  ns?: string[] | null;
  cloudNs?: string[] | null;
};
export type SeriesModel = {
  name?: string | null;
  data?: number[] | null;
};
export type GetAnalyticResponse = {
  categories?: string[] | null;
  series?: SeriesModel[] | null;
};
export type GetAnalyticModel = {
  periodId?: number;
};
export type GetDnsCdnResponse = {
  id: number;
  customerId?: number;
  zoneName: string | null;
  statusId: number;
  status: string | null;
  cdnTypeId: number;
  cdnEdgeCertTypeId: number;
  cdnOriginCertTypeId: number;
  isHsts: boolean;
  isHttpsRedirect: boolean;
  isNonWwwRedirect: boolean;
  createDate: string;
  modifyDate: string;
};
export type CreateDnsCdnModel = {
  zoneName?: string | null;
};
export type CheckDnsCdnModel = {
  zoneName?: string | null;
};
export type ChangeOriginCertTypeModel = {
  cdnHostOriginCertTypeId?: number;
};
export type ChangeNonWwwRedirectModel = {
  isNonWwwRedirect?: boolean;
};
export type ChangeHttpsRedirectModel = {
  isHttpsRedirect?: boolean;
};
export type ChangeHstsModel = {
  isHsts?: boolean;
};
export type ChangeEdgeCertTypeModel = {
  cdnEdgeCertTypeId?: number;
};
export type ChangeCdnTypeModel = {
  cdnTypeId?: number;
};
export type RegisterDomainModel = {
  domainName?: string | null;
  ext?: string | null;
  productId?: number;
  name?: string | null;
  country?: string | null;
  province?: string | null;
  city?: string | null;
  street?: string | null;
  postalCode?: string | null;
  voice?: string | null;
  email?: string | null;
  fax?: string | null;
  authCode?: string | null;
  ns1?: string | null;
  ns2?: string | null;
  autoRenewal?: boolean;
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
export type CheckDomainModel = {
  domainName?: string | null;
  ext?: string | null;
};
export type ChangeNsModel = {
  ns1?: string | null;
  ns2?: string | null;
};
export type ChangeContactModel = {
  name?: string | null;
  country?: string | null;
  province?: string | null;
  city?: string | null;
  street?: string | null;
  postalCode?: string | null;
  voice?: string | null;
  email?: string | null;
  fax?: string | null;
};
export type DnsRecordListResponse = {
  id?: number;
  name: string | null;
  type: string | null;
  ttl: number;
  value: string | null;
  useProxy?: boolean;
  isSystem: boolean;
  createDate: string;
};
export type GetDnsRecordResponse = {
  id?: number;
  name: string | null;
  type: string | null;
  ttl: number;
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
  isSystem?: boolean;
};
export type EditDnsRecordModel = {
  useProxy?: boolean;
  name?: string | null;
  type?: number;
  ttl?: number;
  value?: string | null;
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
  useProxy?: boolean;
  name?: string | null;
  type?: number;
  ttl?: number;
  value?: string | null;
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
  cdnLbPolicy: string | null;
  maxConnectionsPerServer?: number;
};
export type DestinationModel = {
  address?: string | null;
};
export type GetCdnRouteResponse = {
  id: number;
  dnsCdnHostId: number;
  host: string | null;
  maxConnectionsPerServer: number;
  cdnLbPolicyId: number;
  acceptDangerCert: boolean;
  destinations: DestinationModel[] | null;
};
export type EditCdnRouteModel = {
  host?: string | null;
  cdnLbPolicyId?: number;
  maxConnectionsPerServer?: number;
  acceptDangerCert?: boolean;
  destinations?: DestinationModel[] | null;
};
export type GetCdnCertResponse = {
  issuer?: string | null;
  commonName?: string | null;
  expirationDate?: string | null;
};
export type CreateCdnOriginUserCertModel = {
  keyPem?: string | null;
  certPem?: string | null;
};
export type CreateCdnEdgeUserCertModel = {
  keyPem?: string | null;
  certPem?: string | null;
};
export type WalletCommissionListResponse = {
  id?: number;
  totalPrice: number;
  amount: number;
  transactionDate: string;
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
  voucherCode?: string | null;
};
export type ReferralListResponse = {
  customer: string | null;
  commissionPercent: number;
  joinDate: string;
};
export type GetReferralResponse = {
  id: number;
  referralCode: string | null;
  referralLink: string | null;
};
export type PaymentProviderListResponse = {
  id?: number;
  name: string | null;
  status?: boolean;
  photoName?: string | null;
};
export type SepCallbackModel = {
  TerminalId?: number | null;
  state?: string | null;
  status?: number | null;
  RRN?: string | null;
  refNum?: string | null;
  resNum?: number | null;
  traceNo?: string | null;
  amount?: number | null;
  wage?: string | null;
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
  paymentStatus: string | null;
  paymentStatusId: number;
  paymentProvider: string | null;
  paymentProviderId: number;
  finalStatus: boolean;
  amount: number;
  rrn?: number | null;
  hashCardNumber?: string | null;
};
export type GetPaymentResponse = {
  id: number;
  transactionDate: string;
  paymentStatus: string | null;
  paymentStatusId: number;
  paymentProvider: string | null;
  paymentProviderId: number;
  finalStatus: boolean;
  amount: number;
  rrn?: number | null;
  hashCardNumber?: string | null;
};
export type FanavaConfirmRequest = {
  userId: string | null;
  refNum: string | null;
  token: string | null;
};
export type CreatePaymentResponse = {
  status: boolean;
  location: string | null;
  phoneNumber?: string | null;
  refId?: string | null;
};
export type CreatePaymentModel = {
  paymentProviderId?: number;
  amount?: number;
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
export type OrderShortListResponse = {
  id: number;
  name: string | null;
  product: string | null;
  order: string | null;
  createDate: string;
};
export type OrderListResponse = {
  id: number;
  name: string | null;
  product: string | null;
  productId: number;
  order: string | null;
  status: string | null;
  createDate: string;
};
export type UnPaidInvoiceResponse = {
  id: number;
  invoiceStatusId: number;
  customerName: string | null;
  netPrice: number;
  discount: number;
  invoicePrice: number;
  vat: number;
  invoiceDate: string;
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
  fromDate: string;
  toDate: string;
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
  fromDate: string;
  toDate: string;
  invoiceItems: InvoiceItemModel[] | null;
};
export type CalculateMonthListResponse = {
  id?: number;
  name: string | null;
};
export type BillShortListResponse = {
  id: number;
  billDate: string;
  totalPrice: number;
};
export type BillListResponse = {
  id: number;
  calculateMonthId: number;
  calculateMonth: string | null;
  fromDate: string;
  toDate: string;
  billDate: string;
  netPrice: number;
  vat: number;
  totalPrice: number;
};
export type BillIOrderItemModel = {
  orderItem: string | null;
  quantity: number;
  duration: number;
  price: number;
  fromDate: string;
  toDate: string;
};
export type BillOrderModel = {
  product: string | null;
  order: string | null;
  orderId: number;
  orderPrice: number;
  fromDate: string;
  toDate: string;
  orderItems?: BillIOrderItemModel[] | null;
};
export type GetBillResponse = {
  id: number;
  name: string | null;
  billDate: string;
  fromDate?: string | null;
  toDate?: string | null;
  netPrice: number;
  vat: number;
  totalPrice: number;
  billOrders?: BillOrderModel[] | null;
};
export type DatacenterListResponse = {
  id: number;
  name: string | null;
  photoName?: string | null;
};
export type SecretKeyValuePairsResponse = {
  id: number;
  key: string | null;
  value: string | null;
};
export type KuberSecretListResponse = {
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
export type GetKuberSecretResponse = {
  id: number;
  name: string | null;
  alias?: string | null;
  description?: string | null;
  secretTypeId: number;
  createDate: string;
  keyValuePairs: SecretKeyValuePairResponse[] | null;
};
export type EditKuberSecretModel = {
  alias?: string | null;
  description?: string | null;
  removeEnvIds?: number[] | null;
  envs?: {
    [key: string]: {
      [key: string]: string;
    };
  } | null;
};
export type CreateKuberSecretModel = {
  name: string | null;
  secretTypeId?: number;
  alias?: string | null;
  description?: string | null;
  envs: {
    [key: string]: string;
  } | null;
};
export type RulesModel = {
  id: number;
  path: string | null;
  serviceName: string | null;
  port: number;
};
export type KuberIngressListResponse = {
  id: number;
  name: string | null;
  domainName: string | null;
  protocolTypeId: number;
  kuberCloudSecretId?: number | null;
  ruleCount: number;
  rules: RulesModel[] | null;
  createDate: string;
  modifyDate: string;
};
export type EditKuberIngressRuleModel = {
  path?: string | null;
  kuberDeployPortId?: number;
};
export type CreateKuberIngressRuleItemModel = {
  path?: string | null;
  kuberCloudDeployPortId?: number;
};
export type CreateKuberIngressRuleModel = {
  rules?: CreateKuberIngressRuleItemModel[] | null;
};
export type RulesResponse = {
  id: number;
  path: string | null;
  serviceName: string | null;
  port: number;
  createDate: string;
  modifyDate: string;
};
export type GetKuberIngressResponse = {
  id: number;
  name: string | null;
  domainName: string | null;
  protocolTypeId: number;
  kuberCloudSecretId?: number | null;
  rules: RulesResponse[] | null;
  createDate: string;
  modifyDate: string;
};
export type CreateKuberIngressModel = {
  name?: string | null;
  domainName?: string | null;
  protocolTypeId?: number;
  secretId?: number | null;
  rules?: CreateKuberIngressRuleItemModel[] | null;
};
export type KuberImageCategoryResponse = {
  id: number;
  name: string | null;
};
export type KuberImageTagsResponse = {
  id: number;
  name: string | null;
};
export type KuberImagePortResponse = {
  id: number;
  name: string | null;
};
export type KuberImageKeyResponse = {
  id: number;
  name: string | null;
};
export type KuberImageResponse = {
  id: number;
  name: string | null;
  photoName: string | null;
  subtitle: string | null;
  description: string | null;
  path: string | null;
  categoryId: number;
  tags: KuberImageTagsResponse[] | null;
  ports: KuberImagePortResponse[] | null;
  keys: KuberImageKeyResponse[] | null;
};
export type KuberHostListResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  status: string | null;
  statusId: number;
  podInUse?: number;
  tenPods?: number;
  createDate: string;
};
export type KuberHostGetResponse = {
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
export type EditKuberHostModel = {
  cpu?: number;
  memory?: number;
  disk?: number;
  tenPods?: number;
};
export type CreateKuberHostModel = {
  name?: string | null;
  isPredefined?: boolean;
  productBundleId?: number;
  cpu?: number | null;
  memory?: number | null;
  disk?: number | null;
  tenPods?: number | null;
};
export type KuberFirewallListResponse = {
  id: number;
  sourceIp: string | null;
  protocol: string | null;
  targetPort: number;
  createDate?: string;
};
export type CreateKuberFirewallModel = {
  firewallProtocolId?: number;
  deployPortId?: number;
  sourceIp?: string | null;
  destinationIp?: string | null;
  description?: string | null;
};
export type DeployPortModel = {
  portId?: number;
  nodePort?: number;
  targetPort?: number;
};
export type KuberDeployPortListResponse = {
  id: number;
  name: string | null;
  image: string | null;
  createDate: string;
  ports?: DeployPortModel[] | null;
};
export type Port = {
  portId?: number;
  nodePort?: number;
  targetPort?: number;
};
export type KuberDeployListResponse = {
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
export type GetKuberDeployResponse = {
  id: number;
  name: string | null;
  image: string | null;
  replica: number;
  namespace: string | null;
  createDate: string;
  modifyDate: string;
  ports?: PortResponse[] | null;
};
export type EditKuberDeployModel = {
  envToDelete?: {
    [key: string]: number;
  } | null;
  replicaNumber?: number | null;
  keyValue?: {
    [key: string]: {
      [key: string]: string;
    };
  } | null;
};
export type EnvKeyValuePairResponse = {
  id?: number;
  key: string | null;
  value: string | null;
};
export type KuberDeployEnvListResponse = {
  envs: EnvKeyValuePairResponse[] | null;
};
export type GetKuberDeployEnvResponse = {
  id?: number;
  key: string | null;
  value: string | null;
  createDate: string;
  modifyDate: string;
};
export type CreateKuberDeployModel = {
  name?: string | null;
  imageTagId?: number;
  isPublic?: boolean;
  replicaNumber?: number;
  keyValue?: {
    [key: string]: {
      [key: string]: string;
    };
  } | null;
};
export type ConfigMapKeyValuePairsResponse = {
  id: number;
  key: string | null;
  value: string | null;
};
export type KuberConfigListResponse = {
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
export type GetKuberConfigResponse = {
  id: number;
  name: string | null;
  alias?: string | null;
  description?: string | null;
  createDate: string;
  keyValuePairs: KeyValuePairResponse[] | null;
};
export type EditKuberConfigmapModel = {
  alias?: string | null;
  description?: string | null;
  removeEnvIds?: number[] | null;
  envs?: {
    [key: string]: {
      [key: string]: string;
    };
  } | null;
};
export type CreateKuberConfigmapModel = {
  name?: string | null;
  alias?: string | null;
  description?: string | null;
  envs?: {
    [key: string]: string;
  } | null;
};
export type KuberClusterVersionListResponse = {
  id: number;
  name: string | null;
};
export type KubernetesNodeListResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  kuberClusterNodeType: string | null;
  kuberClusterNodeTypeId: number;
  vmHostId: number;
  status: string | null;
  statusId: number;
};
export type CreateKubernetesNodeModel = {
  kubernetesNodeTypeId?: number;
  isPredefined?: boolean;
  productBundleId?: number | null;
  vmPassword?: string | null;
  cpu?: number | null;
  memory?: number | null;
  disk?: number | null;
};
export type KuberClusterListResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  status: string | null;
  statusId: number;
  createDate: string;
};
export type GetKuberClusterResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  masterNode: number;
  workerNode: number;
  status: string | null;
  statusId: number;
  projectId: number;
  createDate: string;
  modifyDate: string;
};
export type CreateKuberClusterModel = {
  vmImageId?: number;
  kubernetesVersionId?: number;
  clusterName?: string | null;
  password?: string | null;
  isPredefined?: boolean;
  productBundleId?: number | null;
  nodeCount?: number;
  cpu?: number | null;
  memory?: number | null;
  disk?: number | null;
};
export type StorageKeyListResponse = {
  id: number;
  accessKey: string | null;
  createDate: string;
};
export type CreateStorageKeyResponse = {
  accessKey: string | null;
  secretKey: string | null;
};
export type StorageHostListResponse = {
  id: number;
  datacenter: string | null;
  customerId: number;
  customer: string | null;
  userName: string | null;
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
  volumeSize?: number;
};
export type CreateStorageHostModel = {
  name?: string | null;
  publicAccess?: boolean;
  isPredefined?: boolean;
  productBundleId?: number | null;
  disk?: number | null;
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
export type ProductBundleBlockStorageListResponse = {
  id: number;
  name: string | null;
  price: number;
  vDisk: number;
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
export type NotificationListResponse = {
  id: number;
  content: string | null;
  subject: string | null;
  isRead: boolean;
  notificationDate: string;
};
export type IssueSubjectShortListResponse = {
  id?: number;
  name: string | null;
};
export type IssueSubjectShortListModel = {
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
  userId: number;
  fileName?: string | null;
  fileSize?: number | null;
};
export type IssueItemListResponse = {
  issueId: number;
  issueSubject: string | null;
  businessUnit: string | null;
  order?: string | null;
  issueStatusId: number;
  createDate: string;
  modifyDate?: string | null;
  issueItems?: IssueItemModel[] | null;
};
export type CreateIssueItemModel = {
  issueId?: number;
  content?: string | null;
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
  content?: string | null;
  businessUnitId?: number;
  issueSubjectId?: number;
  issuePriorityId?: number;
  orderId?: number | null;
  productId?: number | null;
  attachment?: Blob | null;
};
export type ResourceUsageResponse = {
  maxCpuUsage?: number;
  currentCpuUsage?: number;
  maxMemoryUsage?: number;
  currentMemoryUsage?: number;
  maxDiskUsage?: number;
  currentDiskUsage?: number;
  maxFirewallRuleCount?: number;
  currentFirewallRuleCount?: number;
  maxIpCount?: number;
  currentIpCount?: number;
  maxVmCount?: number;
  currentVmCount?: number;
};
export type BusinessUnitListResponse = {
  id: number;
  name: string | null;
};
export type ProjectUserListResponse = {
  id?: number;
  user: string | null;
  userId: number;
  email: string | null;
  userAccessTypeId: number;
  createDate: string;
  modifyDate: string;
};
export type EditProjectUserModel = {
  userAccessTypeId?: number;
};
export type CreateProjectUserModel = {
  userName?: string | null;
  userAccessTypeId?: number;
};
export type ProjectListResponse = {
  id?: number;
  name: string | null;
  customer: string | null;
  customerId: number;
  datacenterId: number;
  datacenter: string | null;
  hypervisorId: number;
  hypervisor: string | null;
  isPublic: boolean;
  status: boolean;
};
export type ProjectGetResponse = {
  id: number;
  name: string | null;
  datacenterId: number;
  datacenterName: string | null;
  isPublic: boolean;
};
export type CreateProjectModel = {
  name?: string | null;
  datacenterId?: number;
  description?: string | null;
  isPublic?: boolean;
};
export type VpcPrivateNetworkRequestListResponse = {
  id?: number;
  vpcHost: string | null;
  vmNetwork: string | null;
  status: string | null;
  createDate?: string;
  modifyDate?: string;
  description?: string | null;
};
export type CreateVpcNetworkAccessModel = {
  vpcNetworkAccessId?: number;
};
export type VmNetworkListResponse = {
  id?: number;
  name: string | null;
  cidr: string | null;
  subnetMask: string | null;
  gatewayIp: string | null;
  statusId: number;
  status: string | null;
  createDate: string;
};
export type CreateVpcInterfaceModel = {
  vmNetworkId?: number;
};
export type GetVpcNatResponse = {
  id: number;
  natTypeId: number;
  natTypeName: string | null;
  name: string | null;
  sourceIp: string | null;
  destinationIp: string | null;
  destinationPort: number;
  translateIp: string | null;
  createDate: string;
};
export type CreateVpcSnatModel = {
  customerId?: number;
  userId?: number;
  projectId?: number;
  vpcNetworkId?: number | null;
  name?: string | null;
  sourceIp?: string | null;
  destinationIp?: string | null;
  destinationPort?: number | null;
  description?: string | null;
};
export type CreateVpcDnatModel = {
  vmNetworkId?: number;
  vpcHostIpId?: number;
  name?: string | null;
  sourceIp?: string | null;
  destinationIp?: string | null;
  destinationPort?: number;
};
export type VpcHostIpListResponse = {
  id: number;
  ipAddress: string | null;
  isV4?: boolean;
  isPrimary?: boolean;
  isFloating?: boolean;
};
export type CreateVpcIpModel = {
  useIpV4?: boolean;
};
export type VpcShortListResponse = {
  id: number;
  name: string | null;
};
export type VpcListResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  projectId: number;
  status: string | null;
  statusId: number;
  createDate: string;
};
export type VpcResponse = {
  id: number;
  datacenterId: number;
  snatEnabled?: boolean;
  datacenter: string | null;
  name: string | null;
  customer: string | null;
  userName: string | null;
  status: string | null;
  projectId?: number | null;
  statusId: number;
  createDate: string;
  modifyDate: string;
};
export type EditVpcHostModel = {
  productBundleId?: number;
};
export type CreateVpcHostModel = {
  name?: string | null;
  productBundleId?: number;
};
export type GetVmVolumeNodeResponse = {
  id: number;
  vmVolumeHostId?: number | null;
  vmVolumeHost?: string | null;
  vmHostId?: number | null;
  vmHost?: string | null;
  isConnected: boolean;
};
export type AttachVolumeModel = {
  vmHostId?: number;
  vmVolumeHostId?: number;
};
export type VolumeSnapshotShortListResponse = {
  id?: number;
  name: string | null;
};
export type VolumeSnapshotResponse = {
  id: number;
  name: string | null;
  statusId: number;
  status: string | null;
  description?: string | null;
  createDate: string;
};
export type CreateVolumeSnapshotModel = {
  name?: string | null;
  description?: string | null;
};
export type VolumeBackupShortListResponse = {
  id?: number;
  name: string | null;
};
export type VolumeBackupListResponse = {
  id: number;
  name: string | null;
  vmVolumeHost: string | null;
  statusId: number;
  status: string | null;
  createDate: string;
};
export type GetVolumeBackupResponse = {
  id: number;
  name: string | null;
  vmVolumeHost: string | null;
  status: string | null;
  createDate: string;
};
export type CreateVolumeBackupModel = {
  name?: string | null;
  description?: string | null;
};
export type VolumeListResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  status: string | null;
  statusId: number;
  volumeSize: number;
  createDate: string;
};
export type GetVolumeHostResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  size: number;
  status: string | null;
  statusId: number;
  volumeSize: number;
  createDate: string;
};
export type EditVolumeHostModel = {
  volumeSize?: number;
};
export type CreateVolumeHostModel = {
  name?: string | null;
  isPredefined?: boolean;
  productBundleId?: number | null;
  volumeSize?: number | null;
};
export type VmNetworkNodeListResponse = {
  id: number;
  vmNetworkId: number;
  vmHostId: number;
  vmHost: string | null;
  vmNetwork: string | null;
  ipAddress: string | null;
  isV4: boolean;
  status: string | null;
  statusId: number;
};
export type AttachNetworkModel = {
  vmHostId?: number;
  vmNetworkId?: number;
  isV4?: boolean;
  ipAddress?: string | null;
};
export type VmNetworkShortListResponse = {
  id?: number;
  name: string | null;
};
export type CreateVmNetworkModel = {
  name?: string | null;
  network?: string | null;
  prefix?: number;
};
export type VmLbProtocolEnum = 1 | 2 | 3;
export type VmLbListenerModel = {
  vmLbProtocolTypeId?: VmLbProtocolEnum;
  sourcePort?: number;
  destinationPort?: number;
  certificate?: string | null;
  privateKey?: string | null;
  vmLbPools: number[] | null;
};
export type CreateVmLbModel = {
  name: string | null;
  productBundleId: number;
  vmNetworkId: number;
  vmLbAlgorithmId: number;
  vmLbListeners: VmLbListenerModel[] | null;
};
export type VmKeyListResponse = {
  id: number;
  name: string | null;
  fingerPrint: string | null;
  createDate: string;
};
export type CreateVmKeyModel = {
  name?: string | null;
  publicKey?: string | null;
};
export type VmImageListResponse = {
  id: number;
  name: string | null;
  operatingSystemId: number;
  operatingSystem: string | null;
  status: boolean;
};
export type VmHostVolumeListResponse = {
  id: number;
  name: string | null;
  volumeSize: number;
  rootDisk: string | null;
  createDate: string;
};
export type GetVmHostVolumeResponse = {
  id: number;
  name: string | null;
  rootDisk: string | null;
  isRootDisk: boolean;
  volumeSize: number;
  createDate: string;
};
export type VmHostSnapshotShortListResponse = {
  id: number;
  name: string | null;
};
export type VmHostSnapshotListResponse = {
  id: number;
  name: string | null;
  statusId: number;
  status: string | null;
  description?: string | null;
  createDate: string;
};
export type GetVmHostSnapshotResponse = {
  id: number;
  name: string | null;
  vmSnapshotStatusId: number;
  vmSnapshotStatus: string | null;
  description?: string | null;
  createDate: string;
};
export type CreateVmHostSnapshotModel = {
  name?: string | null;
  description?: string | null;
};
export type VmHostIpListResponse = {
  id: number;
  ipAddress: string | null;
  isV4?: boolean;
  isPrimary?: boolean;
  isFloating?: boolean;
};
export type CreateVmIpModel = {
  useIpV4?: boolean;
};
export type VmFirewallRuleListResponse = {
  id: number;
  firewallProtocolType: string | null;
  isIngress: string | null;
  remoteIp: string | null;
  minPort: string | null;
  maxPort: string | null;
  isIpV4: boolean;
  createDate: string;
};
export type GetVmFirewallRuleResponse = {
  id: number;
  firewallProtocolId: number;
  isIngress: boolean;
  remoteIp: string | null;
  minPort: number;
  maxPort: number;
  isIpV4: boolean;
};
export type CreateVmFirewallRuleModel = {
  firewallProtocolId?: number;
  directionId?: number;
  remoteIp?: string | null;
  minPort?: number;
  maxPort?: number;
  isIpV4?: boolean;
};
export type VmShortListResponse = {
  id?: number;
  projectId?: number;
  name: string | null;
};
export type RebuildVmModel = {
  vmImageId?: number;
  name?: string | null;
  password?: string | null;
  vmKeyId?: number | null;
};
export type VmListResponse = {
  id: number;
  name: string | null;
  status: string | null;
  statusId: number;
  storageClassTypeId?: number;
  datacenter: string | null;
  operatingSystem: string | null;
  createDate?: string;
};
export type GetVmResponse = {
  datacenterId: number;
  name: string | null;
  operatingSystemId: number;
  operatingSystem: string | null;
  storageClassTypeId?: number;
  vmImage: string | null;
  vmImageId: number;
  projectId: number;
  hypervisorId: number;
  status: string | null;
  statusId: number;
  cpu: number;
  memory: number;
  disk: number;
  ipV4: number;
  ipV6: number;
  powerStatus?: string | null;
  networkStatus?: string | null;
  isCluster?: boolean;
  isMaster?: boolean;
  createDate: string;
  modifyDate: string;
};
export type EditVmModel = {
  cpu?: number;
  memory?: number;
  disk?: number;
};
export type CreateVmModel = {
  vmImageId?: number;
  storageClassTypeId?: number;
  name?: string | null;
  password?: string | null;
  vmKeyId?: number | null;
  isPredefined?: boolean;
  usedPublicIpV4?: boolean;
  usedPublicIpV6?: boolean;
  productBundleId?: number | null;
  cpu?: number | null;
  memory?: number | null;
  disk?: number | null;
  vmNetworkId?: number | null;
  ipAddress?: string | null;
};
export type GetConsoleResponse = {
  location: string | null;
  vmTypeId: number;
};
export type CreateNewsLetterModel = {
  email?: string | null;
};
export type CreateContactUsModel = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  content?: string | null;
};
export type GetWebsiteBolgCommentResponse = {
  id?: number;
  parentId?: number | null;
  name?: string | null;
  content?: string | null;
  createDate?: string;
};
export type CreateWebsiteBolgCommentModel = {
  websiteBlogId?: number;
  name?: string | null;
  email?: string | null;
  content?: string | null;
  parentId?: number | null;
};
export type WebsiteBolgListResponse = {
  link?: string | null;
  imageLink?: string | null;
  author?: string | null;
  title?: string | null;
  subtitle?: string | null;
  createDate?: string;
  webBolgTags?: string[] | null;
};
export type GetWebsiteRandomArticleResponse = {
  imageLink?: string | null;
  link?: string | null;
  author?: string | null;
  title?: string | null;
  subtitle?: string | null;
  createDate?: string;
};
export type GetWebsiteHeaderArticleResponse = {
  imageLink?: string | null;
  author?: string | null;
  title?: string | null;
  subtitle?: string | null;
  createDate?: string;
  webBolgTags?: string[] | null;
};
export type GetWebsiteBolgResponse = {
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
export type WebsiteAlarmListResponse = {
  subject?: string | null;
  link?: string | null;
};
export const {
  useGetApiMyAccountUserLogQuery,
  useGetApiMyAccountProfileGetNotificationStatusQuery,
  useGetApiMyAccountProfileGetQuery,
  usePostApiMyAccountProfileEnableTotpMutation,
  usePostApiMyAccountProfileEnableTotpConfirmMutation,
  usePutApiMyAccountProfileEditTwoFactorMutation,
  usePutApiMyAccountProfileEditPhoneNumberMutation,
  usePutApiMyAccountProfileEditPhoneNotificationMutation,
  usePutApiMyAccountProfileEditEmailNotificationMutation,
  usePutApiMyAccountProfileEditEmailMutation,
  usePutApiMyAccountProfileEditMutation,
  usePostApiMyAccountProfileDisableTotpMutation,
  usePostApiMyAccountProfileConfirmPhoneNumberMutation,
  usePostApiMyAccountProfileConfirmEmailMutation,
  usePostApiMyAccountProfileChangePasswordMutation,
  useGetApiMyAccountCustomerUserListQuery,
  useGetApiMyAccountCustomerUserGetByIdQuery,
  useDeleteApiMyAccountCustomerUserDeleteByIdMutation,
  usePostApiMyAccountCustomerUserCreateMutation,
  usePostApiMyAccountCustomerUserChangeCustomerMutation,
  useGetApiMyAccountCustomerGetQuery,
  usePutApiMyAccountCustomerEditMutation,
  usePutApiMyAccountCustomerConvertToLegalMutation,
  usePostApiMyAccountTwoFactorLoginMutation,
  usePostApiMyAccountRegisterMutation,
  usePostApiMyAccountLogoutMutation,
  useGetApiMyAccountSsoUrlQuery,
  usePostApiMyAccountSsoLoginMutation,
  useGetApiMyAccountLoginGoogleUrlQuery,
  useGetApiMyAccountLoginGoogleCallbackQuery,
  usePostApiMyAccountLoginMutation,
  usePostApiMyAccountForgotConfirmMutation,
  usePostApiMyAccountForgotMutation,
  useGetApiMyAccountCaptchaQuery,
  useGetApiMyAssetEquipmentTypeListQuery,
  useGetApiMyAssetEquipmentBrandListQuery,
  useGetApiMyAssetEquipmentListByTypeIdAndBrandIdQuery,
  useGetApiMyBareMetalImageListQuery,
  useGetApiMyBareMetalByProjectIdHostListQuery,
  useGetApiMyBareMetalByProjectIdHostGetAndIdQuery,
  useDeleteApiMyBareMetalByProjectIdHostDeleteAndIdMutation,
  usePostApiMyBareMetalByProjectIdHostCreateMutation,
  useGetApiMyColocationByProjectIdHostListQuery,
  useGetApiMyColocationByProjectIdHostGetAndIdQuery,
  useDeleteApiMyColocationByProjectIdHostDeleteAndIdMutation,
  usePostApiMyColocationByProjectIdHostCreateMutation,
  useGetApiMyDashboardUsageByCategoryIdQuery,
  useGetApiMyDashboardFinancialQuery,
  useGetApiMyDnsCdnByProjectIdWebHostListQuery,
  useGetApiMyDnsCdnByProjectIdWebHostGetLoginSessionAndIdQuery,
  useGetApiMyDnsCdnByProjectIdWebHostGetAndIdQuery,
  usePutApiMyDnsCdnByProjectIdWebHostEditAndIdMutation,
  useDeleteApiMyDnsCdnByProjectIdWebHostDeleteAndIdMutation,
  usePostApiMyDnsCdnByProjectIdWebHostCreateMutation,
  usePostApiMyDnsCdnByProjectIdWebHostCheckDomainMutation,
  useGetApiMyDnsCdnByProjectIdHostListQuery,
  useGetApiMyDnsCdnByProjectIdHostGetNsAndIdQuery,
  useGetApiMyDnsCdnByProjectIdHostGetAnalyticAndIdQuery,
  useGetApiMyDnsCdnByProjectIdHostGetAndIdQuery,
  useDeleteApiMyDnsCdnByProjectIdHostDeleteAndIdMutation,
  usePostApiMyDnsCdnByProjectIdHostCreateMutation,
  usePostApiMyDnsCdnByProjectIdHostCheckMutation,
  usePutApiMyDnsCdnByProjectIdHostChangeOriginCertTypeAndIdMutation,
  usePutApiMyDnsCdnByProjectIdHostChangeNonWwwRedirectAndIdMutation,
  usePutApiMyDnsCdnByProjectIdHostChangeHttpsRedirectAndIdMutation,
  usePutApiMyDnsCdnByProjectIdHostChangeHstsAndIdMutation,
  usePutApiMyDnsCdnByProjectIdHostChangeEdgeCertTypeAndIdMutation,
  usePutApiMyDnsCdnByProjectIdHostChangeCdnTypeAndIdMutation,
  usePostApiMyDnsCdnByProjectIdDomainResendVerificationAndIdMutation,
  usePostApiMyDnsCdnByProjectIdDomainRegisterMutation,
  useGetApiMyDnsCdnByProjectIdDomainListQuery,
  useGetApiMyDnsCdnByProjectIdDomainGetStatusAndIdQuery,
  useGetApiMyDnsCdnByProjectIdDomainGetAndIdQuery,
  useDeleteApiMyDnsCdnByProjectIdDomainDeleteAndIdMutation,
  usePostApiMyDnsCdnByProjectIdDomainCheckDomainMutation,
  usePutApiMyDnsCdnByProjectIdDomainChangeNsAndIdMutation,
  usePutApiMyDnsCdnByProjectIdDomainChangeContactAndIdMutation,
  useGetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordListQuery,
  useGetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordGetIdQuery,
  usePutApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordEditIdMutation,
  useDeleteApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordDeleteIdMutation,
  usePostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordCreateMutation,
  usePutApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdDnsRecordChangeProxyIdMutation,
  useGetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteListQuery,
  useGetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteGetIdQuery,
  usePutApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteEditIdMutation,
  useDeleteApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdCdnRouteDeleteIdMutation,
  useGetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertGetUserCertQuery,
  useGetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertGetQuery,
  usePostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdOriginCertCreateUserCertMutation,
  useGetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertGetUserCertQuery,
  useGetApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertGetQuery,
  usePostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertCreateUserCertMutation,
  usePostApiMyDnsCdnByProjectIdHostAndDnsCdnHostIdEdgeCertCreateMutation,
  useGetApiMyFinancialWalletCommissionListQuery,
  useGetApiMyFinancialWalletListDownloadQuery,
  useGetApiMyFinancialWalletListQuery,
  useGetApiMyFinancialWalletUsageReportByPeriodQuery,
  useGetApiMyFinancialWalletGetBalanceQuery,
  usePostApiMyFinancialVoucherUseMutation,
  useGetApiMyFinancialReferralListByReferralIdQuery,
  useGetApiMyFinancialReferralGetQuery,
  useGetApiMyFinancialPaymentProviderListQuery,
  usePostApiMyFinancialPaymentSepCallBackMutation,
  usePostApiMyFinancialPaymentPecCallBackMutation,
  useGetApiMyFinancialPaymentListDownloadQuery,
  useGetApiMyFinancialPaymentListQuery,
  useGetApiMyFinancialPaymentGetByIdQuery,
  usePostApiMyFinancialPaymentBfaCallBackMutation,
  usePostApiMyFinancialPaymentCreateMutation,
  usePostApiMyFinancialPaymentBpmCallBackMutation,
  usePostApiMyFinancialOfferPayMutation,
  useGetApiMyFinancialOfferListQuery,
  useGetApiMyFinancialOfferGetByIdQuery,
  useGetApiMyFinancialOrderShortListQuery,
  useGetApiMyFinancialOrderListByProductIdQuery,
  useGetApiMyFinancialInvoiceUnpaidQuery,
  useGetApiMyFinancialInvoiceSummaryQuery,
  usePostApiMyFinancialInvoicePayMutation,
  useGetApiMyFinancialInvoiceListDownloadQuery,
  useGetApiMyFinancialInvoiceListQuery,
  useGetApiMyFinancialInvoiceGetByIdQuery,
  useGetApiMyFinancialCalculateMonthListQuery,
  useGetApiMyFinancialBillShortListQuery,
  useGetApiMyFinancialBillListDownloadByIdQuery,
  useGetApiMyFinancialBillListQuery,
  useGetApiMyFinancialBillGetByIdQuery,
  useGetApiMyHomeIndexQuery,
  useGetApiMyInfraDatacenterListQuery,
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretListQuery,
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretGetIdQuery,
  usePutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretEditIdMutation,
  useDeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretDeleteIdMutation,
  usePostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdSecretCreateMutation,
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressListQuery,
  usePutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleEditIdMutation,
  useDeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleDeleteIdMutation,
  usePostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleCreateMutation,
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressGetIdQuery,
  useDeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressDeleteIdMutation,
  usePostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressCreateMutation,
  useGetApiMyKubernetesCloudCategoryListQuery,
  useGetApiMyKubernetesCloudImageListQuery,
  useGetApiMyKubernetesCloudByProjectIdHostListQuery,
  useGetApiMyKubernetesCloudByProjectIdHostGetAndIdQuery,
  usePutApiMyKubernetesCloudByProjectIdHostEditAndIdMutation,
  useDeleteApiMyKubernetesCloudByProjectIdHostDeleteAndIdMutation,
  usePostApiMyKubernetesCloudByProjectIdHostCreateMutation,
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallListQuery,
  useDeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallDeleteIdMutation,
  usePostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallCreateMutation,
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployPortListQuery,
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployListQuery,
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployGetIdQuery,
  usePutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployEditIdMutation,
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployKuberDeployIdEnvListQuery,
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployKuberDeployIdEnvGetIdQuery,
  useDeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployDeleteIdMutation,
  usePostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployCreateMutation,
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapListQuery,
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapGetIdQuery,
  usePutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapEditIdMutation,
  useDeleteApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapDeleteIdMutation,
  usePostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapCreateMutation,
  useGetApiMyKubernetesClusterVersionListQuery,
  useGetApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeListQuery,
  useDeleteApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeDeleteIdMutation,
  usePostApiMyKubernetesClusterByProjectIdHostAndKuberClusterHostIdNodeCreateMutation,
  useGetApiMyKubernetesClusterByProjectIdHostListQuery,
  useGetApiMyKubernetesClusterByProjectIdHostGetAndIdQuery,
  useDeleteApiMyKubernetesClusterByProjectIdHostDeleteAndIdMutation,
  usePostApiMyKubernetesClusterByProjectIdHostCreateMutation,
  useGetApiMyStorageByProjectIdHostAndStorageHostIdKeyListQuery,
  useDeleteApiMyStorageByProjectIdHostAndStorageHostIdKeyDeleteIdMutation,
  usePostApiMyStorageByProjectIdHostAndStorageHostIdKeyCreateMutation,
  useGetApiMyStorageByProjectIdHostListQuery,
  useGetApiMyStorageByProjectIdHostGetAndIdQuery,
  usePutApiMyStorageByProjectIdHostEditAndIdMutation,
  useDeleteApiMyStorageByProjectIdHostDeleteAndIdMutation,
  usePostApiMyStorageByProjectIdHostCreateMutation,
  useGetApiMyPortalPromotionRedirectLinkByCodeQuery,
  useGetApiMyPortalProductItemListByProductIdQuery,
  useGetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountQuery,
  useGetApiMyPortalProductBundleWebListQuery,
  useGetApiMyPortalProductBundleVpcListQuery,
  useGetApiMyPortalProductBundleVolumeListQuery,
  useGetApiMyPortalProductBundleVmListQuery,
  useGetApiMyPortalProductBundleStorageListQuery,
  useGetApiMyPortalProductBundleKuberClusterListQuery,
  useGetApiMyPortalProductBundleKuberCloudListQuery,
  useGetApiMyPortalProductBundleBareMetalListQuery,
  useGetApiMyPortalProductListQuery,
  useGetApiMyPortalProductGetByIdQuery,
  useGetApiMyPortalNotificationShortListQuery,
  usePutApiMyPortalNotificationSeenByIdMutation,
  useGetApiMyPortalNotificationListQuery,
  usePostApiMyPortalIssueSubjectShortListMutation,
  useGetApiMyPortalIssueSubjectListQuery,
  useGetApiMyPortalIssueItemListByIssueIdQuery,
  useGetApiMyPortalIssueItemDownloadByIdQuery,
  usePostApiMyPortalIssueItemCreateMutation,
  useGetApiMyPortalIssueShortListQuery,
  useGetApiMyPortalIssueListQuery,
  usePostApiMyPortalIssueCreateMutation,
  useGetApiMyPortalCustomerLimitResourceUsagesQuery,
  useGetApiMyPortalBusinessUnitListQuery,
  useGetApiMyByProjectIdUserListQuery,
  usePostApiMyByProjectIdUserEditAndIdMutation,
  useDeleteApiMyByProjectIdUserDeleteAndIdMutation,
  usePostApiMyByProjectIdUserCreateMutation,
  useGetApiMyProjectListQuery,
  useGetApiMyProjectGetByIdQuery,
  useDeleteApiMyProjectDeleteByIdMutation,
  usePostApiMyCreateMutation,
  useGetApiMyVmByProjectIdVpcAndVpcHostIdNetworkAccessListQuery,
  usePostApiMyVmByProjectIdVpcAndVpcHostIdNetworkAccessCreateMutation,
  useDeleteApiMyVmByProjectIdVpcAndVpcHostIdInterfaceRemoveIdMutation,
  useGetApiMyVmByProjectIdVpcAndVpcHostIdInterfaceListQuery,
  usePostApiMyVmByProjectIdVpcAndVpcHostIdInterfaceCreateMutation,
  useGetApiMyVmByProjectIdVpcAndVpcHostIdNatListQuery,
  useGetApiMyVmByProjectIdVpcAndVpcHostIdNatGetIdQuery,
  useDeleteApiMyVmByProjectIdVpcAndVpcHostIdNatDeleteSnatMutation,
  useDeleteApiMyVmByProjectIdVpcAndVpcHostIdNatDeleteIdMutation,
  usePostApiMyVmByProjectIdVpcAndVpcHostIdNatCreateSnatMutation,
  usePostApiMyVmByProjectIdVpcAndVpcHostIdNatCreateDnatMutation,
  useGetApiMyVmByProjectIdVpcAndVpcHostIdIpListQuery,
  useDeleteApiMyVmByProjectIdVpcAndVpcHostIdIpDeleteIdMutation,
  usePostApiMyVmByProjectIdVpcAndVpcHostIdIpCreateMutation,
  useGetApiMyVmByProjectIdVpcShortListQuery,
  useGetApiMyVmByProjectIdVpcListQuery,
  useGetApiMyVmByProjectIdVpcGetAndIdQuery,
  usePutApiMyVmByProjectIdVpcEditAndIdMutation,
  useDeleteApiMyVmByProjectIdVpcDeleteAndIdMutation,
  usePostApiMyVmByProjectIdVpcCreateMutation,
  useGetApiMyVmByProjectIdVolumeNodeGetQuery,
  usePutApiMyVmByProjectIdVolumeNodeDetachAndIdMutation,
  usePostApiMyVmByProjectIdVolumeNodeAttachMutation,
  useGetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotShortListQuery,
  usePutApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotRevertIdMutation,
  useGetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotListQuery,
  useGetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotGetIdQuery,
  useDeleteApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotDeleteIdMutation,
  usePostApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotCreateMutation,
  useGetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupShortListQuery,
  usePostApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupRestoreIdMutation,
  useGetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupListQuery,
  useGetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupGetIdQuery,
  useDeleteApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupDeleteIdMutation,
  usePostApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupCreateMutation,
  useGetApiMyVmByProjectIdVolumeListQuery,
  useGetApiMyVmByProjectIdVolumeGetAndIdQuery,
  usePutApiMyVmByProjectIdVolumeEditAndIdMutation,
  useDeleteApiMyVmByProjectIdVolumeDeleteAndIdMutation,
  usePostApiMyVmByProjectIdVolumeCreateMutation,
  useGetApiMyVmByProjectIdNetworkNodeListQuery,
  usePutApiMyVmByProjectIdNetworkNodeDetachAndIdMutation,
  usePostApiMyVmByProjectIdNetworkNodeAttachMutation,
  useGetApiMyVmByProjectIdNetworkShortListQuery,
  useGetApiMyVmByProjectIdNetworkListQuery,
  useDeleteApiMyVmByProjectIdNetworkDeleteAndIdMutation,
  usePostApiMyVmByProjectIdNetworkCreateMutation,
  usePostApiMyVmByProjectIdLoadBalancerHostCreateMutation,
  useGetApiMyVmByProjectIdKeyListQuery,
  useDeleteApiMyVmByProjectIdKeyDeleteAndIdMutation,
  usePostApiMyVmByProjectIdKeyCreateMutation,
  useGetApiMyVmByProjectIdImageListQuery,
  useGetApiMyVmByProjectIdHostAndVmHostIdVolumeListQuery,
  useGetApiMyVmByProjectIdHostAndVmHostIdVolumeGetIdQuery,
  useDeleteApiMyVmByProjectIdHostAndVmHostIdVolumeDeleteIdMutation,
  useGetApiMyVmByProjectIdHostAndVmHostIdSnapshotShortListQuery,
  usePutApiMyVmByProjectIdHostAndVmHostIdSnapshotRevertIdMutation,
  useGetApiMyVmByProjectIdHostAndVmHostIdSnapshotListQuery,
  useGetApiMyVmByProjectIdHostAndVmHostIdSnapshotGetIdQuery,
  useDeleteApiMyVmByProjectIdHostAndVmHostIdSnapshotDeleteIdMutation,
  usePostApiMyVmByProjectIdHostAndVmHostIdSnapshotCreateMutation,
  useGetApiMyVmByProjectIdHostAndVmHostIdIpListQuery,
  useDeleteApiMyVmByProjectIdHostAndVmHostIdIpDeleteIdMutation,
  usePostApiMyVmByProjectIdHostAndVmHostIdIpCreateMutation,
  useGetApiMyVmByProjectIdHostAndVmHostIdFirewallListQuery,
  useGetApiMyVmByProjectIdHostAndVmHostIdFirewallGetIdQuery,
  useDeleteApiMyVmByProjectIdHostAndVmHostIdFirewallDeleteIdMutation,
  usePostApiMyVmByProjectIdHostAndVmHostIdFirewallCreateMutation,
  usePutApiMyVmByProjectIdHostStopAndIdMutation,
  usePutApiMyVmByProjectIdHostStartAndIdMutation,
  usePutApiMyVmByProjectIdHostShutdownAndIdMutation,
  useGetApiMyVmByProjectIdHostShortListQuery,
  usePutApiMyVmByProjectIdHostResetAndIdMutation,
  usePutApiMyVmByProjectIdHostRebuildAndIdMutation,
  usePutApiMyVmByProjectIdHostRebootAndIdMutation,
  useGetApiMyVmByProjectIdHostListQuery,
  useGetApiMyVmByProjectIdHostGetAnalyticAndIdQuery,
  useGetApiMyVmByProjectIdHostGetAndIdQuery,
  usePutApiMyVmByProjectIdHostEditAndIdMutation,
  useDeleteApiMyVmByProjectIdHostDeleteAndIdMutation,
  usePostApiMyVmByProjectIdHostCreateMutation,
  useGetApiMyVmByProjectIdHostConsoleAndIdQuery,
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
} = injectedRtkApi;
