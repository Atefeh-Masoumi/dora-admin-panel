import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  MainTemplate,
  MainTemplatePropsType,
} from "src/components/templates/MainTemplate";
import PageLoading from "src/components/atoms/PageLoading";
import { PrivateRoute } from "./PrivateRoute";
import { DomainSelect } from "src/components/organisms/cdn/editZone/DomainSelect";
import AddServerContextProvider from "src/components/organisms/vm/addVm/contexts/AddServerContext";
import EditServerContextProvider from "src/components/organisms/vm/editVm/contexts/EditServerContext";
import AddRabbitContextProvider from "src/components/organisms/rabbit/addService/context/AddRabbitContext";
import EditRabbitContextProvider from "src/components/organisms/rabbit/editService/context/EditRabbitContext";
import AddWebHostContextProvider from "src/components/organisms/web/addService/context/AddWebHostContext";
import AddDomainContextProvider from "src/components/organisms/domain/addDomain/context/AddDomainContext";
import EditDomainContextProvider from "src/components/organisms/domain/editDomain/context/EditDomainContext";

import {
  CallBackTemplate,
  CallBackTemplatePropsType,
} from "src/components/templates/CallBackTemplate";

const Home = lazy(() => import("src/pages/Home"));
const NotFound = lazy(() => import("src/pages/404"));

const Login = lazy(() => import("src/pages/account/Login"));
const Signup = lazy(() => import("src/pages/account/Signup"));
const Forget = lazy(() => import("src/pages/account/forget"));

const Sales = lazy(() => import("src/pages/portal/sales/Index"));
const Profile = lazy(() => import("src/pages/portal/profile/Index"));
const Setting = lazy(() => import("src/pages/portal/setting/Index"));
const Notification = lazy(() => import("src/pages/portal/notification/Index"));
const UserServices = lazy(() => import("src/pages/portal/userService/Index"));
const Supports = lazy(() => import("src/pages/portal/support/Index"));
const Support = lazy(() => import("src/pages/portal/support/Support"));
const AddSupport = lazy(() => import("src/pages/portal/support/AddSupport"));
const Orders = lazy(() => import("src/pages/portal/order/Inex"));
const Order = lazy(() => import("src/pages/portal/order/Order"));
const Referrals = lazy(() => import("src/pages/portal/referral/Index"));
const Referral = lazy(() => import("src/pages/portal/referral/Referral"));

const Wallet = lazy(() => import("src/pages/portal/billing/wallet/Index"));
const Payments = lazy(() => import("src/pages/portal/billing/payment/Index"));
const Payment = lazy(() => import("src/pages/portal/billing/payment/PaymentCallBack"));
const UserBills = lazy(() => import("src/pages/portal/billing/userBill/Index"));
const UserBill = lazy(() => import("src/pages/portal/billing/userBill/UserBill"));
const Invoices = lazy(() => import("src/pages/portal/billing/invocie/Inex"));
const Invoice = lazy(() => import("src/pages/portal/billing/invocie/Invoice"));

const ZoneIndex = lazy(() => import("src/pages/cdn/Index"));
const AddZone = lazy(() => import("src/pages/cdn/AddZone"));
const EditZone = lazy(() => import("src/pages/cdn/EditZone"));

const VmIndex = lazy(() => import("src/pages/vm/Index"));
const AddVm = lazy(() => import("src/pages/vm/AddVm"));
const EditVm = lazy(() => import("src/pages/vm/EditVm"));

const RabbitIndex = lazy(() => import("src/pages/rabbit/Index"));
const AddRabbitService = lazy(() => import("src/pages/rabbit/AddRabbitService"));
const EditRabbitService = lazy(() => import("src/pages/rabbit/EditRabbitService"));

const WebIndex = lazy(() => import("src/pages/web/Index"));
const AddWebHost = lazy(() => import("src/pages/web/AddWebHost"));

const DomainIndex = lazy(() => import("src/pages/domain/Index"));
const AddDomain = lazy(() => import("src/pages/domain/AddDomain"));
const EditDomain = lazy(() => import("src/pages/domain/EditDomain"));

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
          <Route
            path="/referral/:id"
            element={callbackTemplate(Referral)}
          />
          <Route
            path="/portal/user-services"
            element={mainTemplate(UserServices, {
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
              hideSidebar: true,
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
              hideSidebar: true,
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
            path="/portal/support/AddSupport"
            element={mainTemplate(AddSupport, {
              link: {
                text: "بازگشت به مرکز پشتیبانی",
                url: "/portal/supports",
              },
              hideSidebar: true,
            })}
          />
          {/* ======================================= Wallet ======================================= */}
          <Route path="/portal/billing" element={<Navigate to="/portal/billing/wallet" />} />
          <Route
            path="/portal/billing/wallet"
            element={mainTemplate(Wallet, {
              pageTitle: "گزارش کیف پول",
            })}
          />
          <Route
            path="/portal/billing/invoices"
            element={mainTemplate(Invoices, {
              pageTitle: "فاکتور های فروش",
            })}
          />
          <Route
            path="/portal/billing/invoice/:id"
            element={mainTemplate(Invoice, {
              link: {
                text: "بازگشت به فاکتور‌های فروش",
                url: "/portal/billing/invoices",
              },
              hideSidebar: true,
            })}
          />
          <Route
            path="/portal/billing/payments"
            element={mainTemplate(Payments, {
              pageTitle: "گزارش پرداخت ها",
            })}
          />
          <Route
            path="/portal/billing/payment/:id"
            element={mainTemplate(Payment, {
              pageTitle: "گزارش پرداخت ها",
            })}
          />
          <Route
            path="/portal/billing/user-bills"
            element={mainTemplate(UserBills, {
              pageTitle: "گزارش محاسبات"
            })}
          />
          <Route
            path="/portal/billing/user-bill/:id"
            element={mainTemplate(UserBill, {
              link: {
                text: "بازگشت به گزارش محاسبات",
                url: "/portal/billing/user-bills",
              },
              hideSidebar: true,
            })}
          />
          {/* ======================================= CDN ======================================= */}
          <Route
            path="/cdn"
            element={mainTemplate(ZoneIndex, {
              pageTitle: "مدیریت دامنه ها",
            })}
          />
          <Route
            path="/cdn/overview"
            element={mainTemplate(EditZone, {
              pageTitle: "مشخصات دامنه",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/dnsRecordSettings"
            element={mainTemplate(EditZone, {
              pageTitle: "تنظیمات DNS Record",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/sslTslSettings"
            element={mainTemplate(EditZone, {
              pageTitle: "تنظیمات SSL/TSL",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/loadBalanceSettings"
            element={mainTemplate(EditZone, {
              pageTitle: "تنظیمات Load Balance",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/apiGatewaySettings"
            element={mainTemplate(EditZone, {
              pageTitle: "تنظیمات API Gateway",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/addDomain"
            element={mainTemplate(AddZone, {
              link: { text: "بازگشت به مدیریت دامنه ها", url: "/cdn" },
              hideSidebar: true,
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
            path="/vm/addVm"
            element={mainTemplate(AddVm, {
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
                hideSidebar: true,
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
                hideSidebar: true,
              }, AddRabbitContextProvider
            )}
          />
          <Route
            path="/rabbit/:id"
            element={mainTemplate(EditRabbitService, {
              link: {
                text: "بازگشت به مدیریت سرویس RabbitMQ",
                url: "/rabbit",
              },
              hideSidebar: true,
            }, EditRabbitContextProvider
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
                hideSidebar: true,
              }, AddWebHostContextProvider
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
              }, AddDomainContextProvider
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
                hideSidebar: true,
              },
              EditDomainContextProvider
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
