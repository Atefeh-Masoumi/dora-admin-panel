import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  MainTemplate,
  MainTemplatePropsType,
} from "src/components/templates/MainTemplate";
import PageLoading from "src/components/atoms/PageLoading";
import { PrivateRoute } from "./PrivateRoute";
import { DomainSelect } from "src/components/organisms/cdn/edit/DomainSelect";
import AddZoneContextProvider from "src/components/organisms/cdn/add/context/AddZoneContext";
import AddServerContextProvider from "src/components/organisms/vm/add/contexts/AddVmContext";
import EditServerContextProvider from "src/components/organisms/vm/edit/contexts/EditServerContext";
import AddRabbitContextProvider from "src/components/organisms/rabbit/add/context/AddRabbitContext";
import EditRabbitContextProvider from "src/components/organisms/rabbit/edit/context/EditRabbitContext";
import AddWebHostContextProvider from "src/components/organisms/web/add/context/AddWebHostContext";
import EditWebHostContextProvider from "src/components/organisms/web/edit/context/EditWebContext";
import AddDomainContextProvider from "src/components/organisms/domain/add/context/AddDomainContext";
import EditDomainContextProvider from "src/components/organisms/domain/edit/context/EditDomainContext";
import AddStorageContextProvider from "src/components/organisms/storage/add/context/AddStorageContext";
import EditStorageContextProvider from "src/components/organisms/storage/edit/context/EditStorageContext";
import AddWorkspaceContext from "src/components/organisms/kubernetes/add/context/AddWorkspaceContext";
import EditWorkspaceContext from "src/components/organisms/kubernetes/edit/context/EditWorkspaceContext";

import {
  CallBackTemplate,
  CallBackTemplatePropsType,
} from "src/components/templates/CallBackTemplate";
import { ServiceUsers } from "src/pages/kubernetes/Users";

const Home = lazy(() => import("src/pages/Home"));
const NotFound = lazy(() => import("src/pages/404"));

const Login = lazy(() => import("src/pages/account/Login"));
const Signup = lazy(() => import("src/pages/account/Signup"));
const Forget = lazy(() => import("src/pages/account/forget"));

const Sales = lazy(() => import("src/pages/portal/sales/Index"));
const Profile = lazy(() => import("src/pages/portal/profile/Index"));
const Setting = lazy(() => import("src/pages/portal/setting/Index"));
const Notification = lazy(() => import("src/pages/portal/notification/Index"));
const HostProducts = lazy(() => import("src/pages/portal/hostProduct/Index"));
const Supports = lazy(() => import("src/pages/portal/support/Index"));
const Support = lazy(() => import("src/pages/portal/support/Support"));
const AddSupport = lazy(() => import("src/pages/portal/support/AddSupport"));
const Orders = lazy(() => import("src/pages/portal/order/Index"));
const Order = lazy(() => import("src/pages/portal/order/Order"));
const Referrals = lazy(() => import("src/pages/portal/referral/Index"));
const Referral = lazy(() => import("src/pages/portal/referral/Referral"));
const Calculator = lazy(() => import("src/pages/portal/calculator"));

const Wallet = lazy(() => import("src/pages/portal/wallet/Index"));
const Payments = lazy(() => import("src/pages/portal/walletPayment/Index"));
const Payment = lazy(
  () => import("src/pages/portal/walletPayment/PaymentCallBack")
);
const Bills = lazy(() => import("src/pages/portal/bill/Index"));
const Bill = lazy(() => import("src/pages/portal/bill/Bill"));
const Invoices = lazy(() => import("src/pages/portal/invoice/Index"));
const Invoice = lazy(() => import("src/pages/portal/invoice/Invoice"));

const CdnIndex = lazy(() => import("src/pages/cdn/Index"));
const AddZone = lazy(() => import("src/pages/cdn/AddZone"));
const EditZone = lazy(() => import("src/pages/cdn/EditZone"));

const VmIndex = lazy(() => import("src/pages/vm/Index"));
const AddVm = lazy(() => import("src/pages/vm/AddVm"));
const EditVm = lazy(() => import("src/pages/vm/EditVm"));

const RabbitIndex = lazy(() => import("src/pages/rabbit/Index"));
const AddRabbitService = lazy(
  () => import("src/pages/rabbit/AddRabbitService")
);
const EditRabbitService = lazy(
  () => import("src/pages/rabbit/EditRabbitService")
);

const WebIndex = lazy(() => import("src/pages/web/Index"));
const AddWebHost = lazy(() => import("src/pages/web/AddWebHost"));
const EditWebHost = lazy(() => import("src/pages/web/EditWebHost"));

const DomainIndex = lazy(() => import("src/pages/domain/Index"));
const AddDomain = lazy(() => import("src/pages/domain/AddDomain"));
const EditDomain = lazy(() => import("src/pages/domain/EditDomain"));

const StorageIndex = lazy(() => import("src/pages/storage/Index"));
const AddStorageService = lazy(
  () => import("src/pages/storage/AddStorageService")
);
const EditStorageService = lazy(
  () => import("src/pages/storage/EditStorageService")
);

const KubeIndex = lazy(() => import("src/pages/kubernetes/Index"));
const AddWorkspace = lazy(() => import("src/pages/kubernetes/AddWorkspace"));
const EditWorkspace = lazy(() => import("src/pages/kubernetes/EditWorkspace"));

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
              pageTitle: "حساب کاربری",
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
            path="/portal/host-products"
            element={mainTemplate(HostProducts, {
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
          {/* ======================================= Order ======================================= */}
          <Route
            path="/portal/orders"
            element={mainTemplate(Orders, {
              pageTitle: "سبد خرید",
            })}
          />
          <Route
            path="/portal/order/:id"
            element={mainTemplate(Order, {
              link: {
                text: "بازگشت به سبد خرید",
                url: "/portal/orders",
              },
              hideSidebar: false,
            })}
          />
          {/* ======================================= SUPPORT ======================================= */}
          <Route
            path="/portal/support"
            element={mainTemplate(Supports, {
              pageTitle: "مرکز پشتیبانی",
            })}
          />
          <Route
            path="/portal/support/:id"
            element={mainTemplate(Support, {
              link: {
                text: "بازگشت به مرکز پشتیبانی",
                url: "/portal/support",
              },
              hideSidebar: false,
            })}
          />
          <Route
            path="/portal/support/add-ticket"
            element={mainTemplate(AddSupport, {
              link: {
                text: "بازگشت به مرکز پشتیبانی",
                url: "/portal/support",
              },
              hideSidebar: false,
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
            path="/portal/wallet/invoices"
            element={mainTemplate(Invoices, {
              pageTitle: "فاکتور های فروش",
            })}
          />
          <Route
            path="/portal/wallet/invoice/:id"
            element={mainTemplate(Invoice, {
              link: {
                text: "بازگشت به فاکتور‌های فروش",
                url: "/portal/wallet/invoices",
              },
              hideSidebar: false,
            })}
          />
          <Route
            path="/portal/wallet/payments"
            element={mainTemplate(Payments, {
              pageTitle: "گزارش پرداخت ها",
            })}
          />
          <Route
            path="/portal/payment/:id"
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
          <Route
            path="/vm"
            element={mainTemplate(VmIndex, {
              pageTitle: "مدیریت سرور ابری",
            })}
          />
          <Route
            path="/vm/add-vm"
            element={mainTemplate(
              AddVm,
              {
                link: {
                  text: "بازگشت به مدیریت سرور ابری",
                  url: "/vm",
                },
                hideSidebar: false,
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
          {/* ======================================= RabbitMQ ======================================= */}
          <Route
            path="/rabbit"
            element={mainTemplate(RabbitIndex, {
              pageTitle: "مدیریت سرویس RabbitMQ",
            })}
          />
          <Route
            path="/rabbit/addRabbitService"
            element={mainTemplate(
              AddRabbitService,
              {
                link: {
                  text: "بازگشت به مدیریت سرویس RabbitMQ",
                  url: "/rabbit",
                },
                hideSidebar: false,
              },
              AddRabbitContextProvider
            )}
          />
          <Route
            path="/rabbit/:id"
            element={mainTemplate(
              EditRabbitService,
              {
                link: {
                  text: "بازگشت به مدیریت سرویس RabbitMQ",
                  url: "/rabbit",
                },
                hideSidebar: false,
              },
              EditRabbitContextProvider
            )}
          />
          {/* ======================================= Kubernetes ======================================= */}
          <Route
            path="/kubernetes"
            element={mainTemplate(KubeIndex, {
              pageTitle: "مدیریت سرویس کوبرنتیز",
            })}
          />
          <Route
            path="/kubernetes/users"
            element={mainTemplate(ServiceUsers, {
              pageTitle: "شناسه های کاربری",
            })}
          />
          <Route
            path="/kubernetes/add-kubernetes"
            element={mainTemplate(
              AddWorkspace,
              {
                link: {
                  text: "بازگشت به مدیریت سرویس کوبرنتیز",
                  url: "/kubernetes",
                },
                hideSidebar: false,
              },
              AddWorkspaceContext
            )}
          />
          <Route
            path="/kubernetes/:id"
            element={mainTemplate(
              EditWorkspace,
              {
                link: {
                  text: "بازگشت به مدیریت سرویس کوبرنتیز",
                  url: "/kubernetes",
                },
                hideSidebar: false,
              },
              EditWorkspaceContext
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
            path="/web/addWebHost"
            element={mainTemplate(
              AddWebHost,
              {
                link: {
                  text: "بازگشت به مدیریت هاستینگ ابری",
                  url: "/web",
                },
                hideSidebar: false,
              },
              AddWebHostContextProvider
            )}
          />
          <Route
            path="/web/:id"
            element={mainTemplate(
              EditWebHost,
              {
                link: {
                  text: "بازگشت به مدیریت هاستینگ ابری",
                  url: "/web",
                },
                hideSidebar: false,
              },
              EditWebHostContextProvider
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
                hideSidebar: false,
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
                hideSidebar: false,
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
