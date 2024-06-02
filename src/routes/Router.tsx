import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  MainTemplate,
  MainTemplatePropsType,
} from "src/components/templates/MainTemplate";
import PageLoading from "src/components/atoms/PageLoading";
import { PrivateRoute } from "./PrivateRoute";
import { DomainSelect } from "src/components/organisms/cdn/edit/DomainSelect";
import AddZoneContextProvider from "src/components/organisms/cdn/add/contexts/AddContext";
import AddServerContextProvider from "src/components/organisms/vm/add/contexts/AddVmContext";
import EditServerContextProvider from "src/components/organisms/vm/edit/rebuild/contexts/EditServerContext";
import AddWebContextProvider from "src/components/organisms/web/add/contexts/AddWebContext";
import EditWebContextProvider from "src/components/organisms/web/edit/contexts/EditWebContext";
import AddDomainContextProvider from "src/components/organisms/domain/add/contexts/AddContext";
import EditDomainContextProvider from "src/components/organisms/domain/edit/contexts/EditContext";
import AddStorageContextProvider from "src/components/organisms/storage/add/contexts/AddStorageContext";
import EditStorageContextProvider from "src/components/organisms/storage/edit/contexts/EditStorageContext";

import {
  CallBackTemplate,
  CallBackTemplatePropsType,
} from "src/components/templates/CallBackTemplate";
import { AddKubernetesContextProvider } from "src/components/organisms/kubernetes/add/contexts/AddKubernetesContext";
import { BACK_URL_HINTS_ENUM } from "src/constant/backUrlHintsEnum";

const Home = lazy(() => import("src/pages/Home"));
const NotFound = lazy(() => import("src/pages/404"));

const Login = lazy(() => import("src/pages/account/Login"));
const TwoFactorLogin = lazy(() => import("src/pages/account/TwoFactorLogin"));
const Signup = lazy(() => import("src/pages/account/Signup"));
const Forget = lazy(() => import("src/pages/account/forget"));

const Sales = lazy(() => import("src/pages/portal/account/sales/Index"));
const Profile = lazy(() => import("src/pages/portal/account/profile/Index"));
const Setting = lazy(() => import("src/pages/portal/account/setting/Index"));
const Notification = lazy(
  () => import("src/pages/portal/account/notification/Index")
);
const CustomerProducts = lazy(
  () => import("src/pages/portal/financial/customerProduct/Index")
);
const Supports = lazy(() => import("src/pages/portal/support/Index"));
const Support = lazy(() => import("src/pages/portal/support/Support"));
const AddSupport = lazy(() => import("src/pages/portal/support/AddSupport"));

const Referrals = lazy(() => import("src/pages/portal/account/referral/Index"));
const Referral = lazy(
  () => import("src/pages/portal/account/referral/Referral")
);
const Calculator = lazy(() => import("src/pages/portal/calculator"));

const Wallet = lazy(
  () => import("src/pages/portal/financial/walletTransaction/Index")
);
const Payments = lazy(() => import("src/pages/portal/financial/payment/Index"));
const Payment = lazy(
  () => import("src/pages/portal/financial/payment/PaymentCallBack")
);
const Bills = lazy(
  () => import("src/pages/portal/financial/customerBill/Index")
);
const Bill = lazy(() => import("src/pages/portal/financial/customerBill/Bill"));
const Invoices = lazy(() => import("src/pages/portal/financial/invoice/Index"));
const Invoice = lazy(
  () => import("src/pages/portal/financial/invoice/Invoice")
);

const CdnIndex = lazy(() => import("src/pages/cdn/Index"));
const AddZone = lazy(() => import("src/pages/cdn/AddCdn"));
const EditZone = lazy(() => import("src/pages/cdn/EditZone"));

const VmProjectIndex = lazy(() => import("src/pages/vm/VmProjectIndex"));
const VmIndex = lazy(() => import("src/pages/vm/Index"));
const AddVm = lazy(() => import("src/pages/vm/AddVm"));
const EditVm = lazy(() => import("src/pages/vm/EditVm"));

const WebIndex = lazy(() => import("src/pages/web/Index"));
const AddWeb = lazy(() => import("src/pages/web/AddWeb"));
const EditWeb = lazy(() => import("src/pages/web/EditWeb"));

const DomainIndex = lazy(() => import("src/pages/domain/Index"));
const AddDomain = lazy(() => import("src/pages/domain/AddDomain"));
const EditDomain = lazy(() => import("src/pages/domain/EditDomain"));

const StorageIndex = lazy(() => import("src/pages/storage/Index"));
const AddStorageService = lazy(() => import("src/pages/storage/AddStorage"));
const EditStorageService = lazy(() => import("src/pages/storage/EditStorage"));

const PlatformIndex = lazy(() => import("src/pages/kubernetes/Index"));
const AddKubernetes = lazy(() => import("src/pages/kubernetes/AddKubernetes"));
const EditKubernetes = lazy(
  () => import("src/pages/kubernetes/EditKubernetes")
);
const AddNodeKubernetes = lazy(
  () => import("src/pages/kubernetes/AddNodeKubernetes")
);

const mainTemplate = (
  PageComponent: FC<any>,
  templateProps?: Omit<MainTemplatePropsType, "children">,
  PageComponentWrapper?: FC<any>
) => (
  <MainTemplate {...templateProps}>
    <Suspense fallback={<PageLoading />}>
      {PageComponentWrapper ? (
        <PageComponentWrapper>
          <PageComponent />
        </PageComponentWrapper>
      ) : (
        <PageComponent />
      )}
    </Suspense>
  </MainTemplate>
);

const callbackTemplate = (
  PageComponent: FC<any>,
  templateProps?: CallBackTemplatePropsType
) => (
  <CallBackTemplate {...templateProps}>
    <Suspense fallback={<PageLoading />}>
      <PageComponent />
    </Suspense>
  </CallBackTemplate>
);

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/two-factor-login" element={<TwoFactorLogin />} />
        <Route path="/account/signup" element={<Signup />} />
        <Route path="/account/forget" element={<Forget />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route
            path="/"
            element={mainTemplate(Home, { pageTitle: "داشبورد" })}
          />
          <Route
            path="/portal/calculator"
            element={mainTemplate(Calculator, {
              pageTitle: "ماشین حساب",
            })}
          />
          <Route
            path="/portal/profile"
            element={mainTemplate(Profile, {
              pageTitle: "مدیریت اکانت",
            })}
          />
          <Route
            path="/portal/setting"
            element={mainTemplate(Setting, {
              pageTitle: "تنظیمات",
            })}
          />
          <Route
            path="/portal/referral"
            element={mainTemplate(Referrals, {
              pageTitle: "کد معرف",
            })}
          />
          <Route
            path="/portal/referral/:id"
            element={callbackTemplate(Referral)}
          />
          <Route path="/referral/:id" element={callbackTemplate(Referral)} />
          <Route
            path="/portal/customer-products"
            element={mainTemplate(CustomerProducts, {
              pageTitle: "سرویس های من",
            })}
          />
          <Route
            path="/portal/sales"
            element={mainTemplate(Sales, {
              link: {
                text: "بازگشت به داشبورد",
                url: "/",
              },
              hideSidebar: false,
            })}
          />
          <Route
            path="/portal/notifications"
            element={mainTemplate(Notification, {
              pageTitle: "مرکز اطلاع رسانی",
            })}
          />

          {/* ======================================= SUPPORT ======================================= */}
          <Route
            path="/portal/supports"
            element={mainTemplate(Supports, {
              pageTitle: "مرکز پشتیبانی",
            })}
          />
          <Route
            path="/portal/support/:id"
            element={mainTemplate(Support, {
              link: {
                text: "بازگشت به مرکز پشتیبانی",
                url: "/portal/supports",
              },
              hideSidebar: true,
            })}
          />
          <Route
            path="/portal/support/add-ticket"
            element={mainTemplate(AddSupport, {
              link: {
                text: "بازگشت به مرکز پشتیبانی",
                url: "/portal/supports",
              },
              hideSidebar: true,
            })}
          />
          {/* ======================================= Wallet ======================================= */}
          <Route path="/portal" element={<Navigate to="/portal/wallet" />} />
          <Route
            path="/portal/wallet"
            element={mainTemplate(Wallet, {
              pageTitle: "گزارش کیف پول",
            })}
          />
          <Route
            path="/portal/wallet/invoice"
            element={mainTemplate(Invoices, {
              pageTitle: "فاکتور های فروش",
            })}
          />
          <Route
            path="/portal/wallet/invoice/:id"
            element={mainTemplate(Invoice, {
              link: {
                text: "بازگشت به فاکتور‌های فروش",
                url: "/portal/wallet/invoice",
              },
              hideSidebar: false,
            })}
          />
          <Route
            path="/portal/wallet/payment"
            element={mainTemplate(Payments, {
              pageTitle: "گزارش پرداخت ها",
            })}
          />
          <Route
            path="/portal/wallet/payment/:id"
            element={mainTemplate(Payment, {
              pageTitle: "گزارش پرداخت ها",
            })}
          />
          <Route
            path="/portal/wallet/bill"
            element={mainTemplate(Bills, {
              pageTitle: "گزارش محاسبات",
            })}
          />
          <Route
            path="/portal/wallet/bill/:id"
            element={mainTemplate(Bill, {
              link: {
                text: "بازگشت به گزارش محاسبات",
                url: "/portal/wallet/bill",
              },
              hideSidebar: false,
            })}
          />
          {/* ======================================= CDN ======================================= */}
          <Route
            path="/cdn"
            element={mainTemplate(CdnIndex, {
              pageTitle: "مدیریت دامنه ها",
            })}
          />
          <Route
            path="/cdn/add-domain"
            element={mainTemplate(
              AddZone,
              {
                link: { text: "بازگشت به مدیریت دامنه ها", url: "/cdn" },
                hideSidebar: false,
              },
              AddZoneContextProvider
            )}
          />
          <Route
            path="/cdn/overview"
            element={mainTemplate(EditZone, {
              pageTitle: "مشخصات دامنه",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/analytics"
            element={mainTemplate(EditZone, {
              pageTitle: "آنالیز ترافیک",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/dns-record-settings"
            element={mainTemplate(EditZone, {
              pageTitle: "تنظیمات DNS Record",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/ssl-tls-settings"
            element={mainTemplate(EditZone, {
              pageTitle: "تنظیمات",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/load-balance-settings"
            element={mainTemplate(EditZone, {
              pageTitle: "تنظیمات Load Balance",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/api-gateway-settings"
            element={mainTemplate(EditZone, {
              pageTitle: "تنظیمات API Gateway",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/add-domain"
            element={mainTemplate(AddZone, {
              link: { text: "بازگشت به مدیریت دامنه ها", url: "/cdn" },
              hideSidebar: false,
            })}
          />
          {/* ======================================= VM ======================================= */}
          {/* <Route
            path="/vm"
            element={mainTemplate(VmIndex, {
              pageTitle: "مدیریت سرور ابری",
            })}
          /> */}
          <Route
            path="/vm"
            element={mainTemplate(VmProjectIndex, {
              pageTitle: "لیست پروژه‌ها",
            })}
          />
          <Route
            path="/vm/:projectId/list"
            element={mainTemplate(VmIndex, {
              pageTitle: "مدیریت سرور ابری",
            })}
          />
          <Route
            path="/vm/:projectId/add-vm"
            element={mainTemplate(
              AddVm,
              {
                link: {
                  text: "بازگشت به مدیریت سرور ابری",
                  url: "/vm",
                },
                hideSidebar: true,
              },
              AddServerContextProvider
            )}
          />
          <Route
            path="/vm/:id"
            element={mainTemplate(
              EditVm,
              {
                link: {
                  text: "بازگشت به مدیریت سرور ابری",
                  url: "/vm",
                },
                hideSidebar: false,
              },
              EditServerContextProvider
            )}
          />
          {/* ======================================= Kubernetes ======================================= */}
          <Route
            path="/kubernetes"
            element={mainTemplate(PlatformIndex, {
              pageTitle: "مدیریت سرویس کوبرنتیز",
            })}
          />
          <Route
            path="/kubernetes/add"
            element={mainTemplate(
              AddKubernetes,
              {
                link: {
                  text: "بازگشت به مدیریت سرویس کوبرنتیز",
                  url: "/kubernetes",
                },
                hideSidebar: true,
              },
              AddKubernetesContextProvider
            )}
          />
          <Route
            path="/kubernetes/:id"
            element={mainTemplate(
              EditKubernetes,
              {
                link: {
                  text: "بازگشت به مدیریت سرویس کوبرنتیز",
                  url: "/kubernetes",
                },
                hideSidebar: false,
              },
              AddKubernetesContextProvider
            )}
          />
          <Route
            path="/kubernetes/:id/add-node"
            element={mainTemplate(
              AddNodeKubernetes,
              {
                link: {
                  text: "بازگشت ویرایش هاست کوبرنتیز",
                  url: BACK_URL_HINTS_ENUM.ADD_NODE,
                },
                hideSidebar: false,
              },
              AddKubernetesContextProvider
            )}
          />
          {/* ======================================= WEB ======================================= */}
          <Route
            path="/web"
            element={mainTemplate(WebIndex, {
              pageTitle: "مدیریت هاستینگ ابری",
            })}
          />
          <Route
            path="/web/addWeb"
            element={mainTemplate(
              AddWeb,
              {
                link: {
                  text: "بازگشت به مدیریت هاستینگ ابری",
                  url: "/web",
                },
                hideSidebar: true,
              },
              AddWebContextProvider
            )}
          />
          <Route
            path="/web/:id"
            element={mainTemplate(
              EditWeb,
              {
                link: {
                  text: "بازگشت به مدیریت هاستینگ ابری",
                  url: "/web",
                },
                hideSidebar: false,
              },
              EditWebContextProvider
            )}
          />
          {/* ======================================= Domain ======================================= */}
          <Route
            path="/domain"
            element={mainTemplate(DomainIndex, {
              pageTitle: "مدیریت ثبت/تمدید دامنه",
            })}
          />
          <Route
            path="/domain/registerDomain"
            element={mainTemplate(
              AddDomain,
              {
                link: {
                  text: "بازگشت به مدیریت ثبت/تمدید دامنه",
                  url: "/domain",
                },
                hideSidebar: true,
              },
              AddDomainContextProvider
            )}
          />
          <Route
            path="/domain/:id"
            element={mainTemplate(
              EditDomain,
              {
                link: {
                  text: "بازگشت به مدیریت ثبت/تمدید دامنه",
                  url: "/domain",
                },
                hideSidebar: false,
              },
              EditDomainContextProvider
            )}
          />
          {/* ======================================= Storage ======================================= */}
          <Route
            path="/storage"
            element={mainTemplate(StorageIndex, {
              pageTitle: "مدیریت سرویس فضای ابری",
            })}
          />
          <Route
            path="/storage/addStorageService"
            element={mainTemplate(
              AddStorageService,
              {
                link: {
                  text: "بازگشت به مدیریت سرویس فضای ابری",
                  url: "/storage",
                },
                hideSidebar: true,
              },
              AddStorageContextProvider
            )}
          />
          <Route
            path="/storage/:id"
            element={mainTemplate(
              EditStorageService,
              {
                link: {
                  text: "بازگشت به مدیریت سرویس فضای ابری",
                  url: "/storage",
                },
                hideSidebar: false,
              },
              EditStorageContextProvider
            )}
          />

          <Route
            path="*"
            element={mainTemplate(NotFound, {
              pageTitle: " موردی یافت نشد!",
            })}
          />
        </Route>
        <Route path="*" element={<Navigate to="/account/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
