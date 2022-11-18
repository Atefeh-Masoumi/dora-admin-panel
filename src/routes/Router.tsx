import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  MainTemplate,
  MainTemplatePropsType,
} from "src/components/templates/MainTemplate";
import PageLoading from "src/components/atoms/PageLoading";
import { PrivateRoute } from "./PrivateRoute";
import { DomainSelect } from "src/components/organisms/cdn/DomainSelect";
import AddServerContextProvider from "src/components/organisms/vm/addVm/contexts/AddServerContext";
import EditServerContextProvider from "src/components/organisms/vm/editVm/contexts/EditServerContext";
import AddRabbitContextProvider from "src/components/organisms/rabbit/addService/context/AddRabbitContext";
import EditRabbitContextProvider from "src/components/organisms/rabbit/editService/context/EditRabbitContext";
import {
  CallBackTemplate,
  CallBackTemplatePropsType,
} from "src/components/templates/CallBackTemplate";

const Home = lazy(() => import("src/pages/Home"));
const NotFound = lazy(() => import("src/pages/404"));

const Login = lazy(() => import("src/pages/account/Login"));
const Signup = lazy(() => import("src/pages/account/Signup"));
const Forget = lazy(() => import("src/pages/account/forget"));

const Profile = lazy(() => import("src/pages/portal/Profile"));
const Setting = lazy(() => import("src/pages/portal/Setting"));
const Sales = lazy(() => import("src/pages/portal/Sales"));
const Notification = lazy(() => import("src/pages/portal/Notification"));

const Supports = lazy(() => import("src/pages/portal/support/Supports"));
const Support = lazy(() => import("src/pages/portal/support/Support"));
const AddSupport = lazy(() => import("src/pages/portal/support/AddSupport"));

const Wallet = lazy(() => import("src/pages/portal/Wallet"));
const UserServices = lazy(() => import("src/pages/portal/UserServices"));

const Payments = lazy(() => import("src/pages/portal/payment/Payments"));
const Payment = lazy(() => import("src/pages/portal/payment/Payment"));

const Referral = lazy(() => import("src/pages/portal/referral/Referral"));
const ReferralCallBack = lazy(() => import("src/pages/portal/referral/ReferralCallBack"));

const UserBill = lazy(() => import("src/pages/portal/userBill/UserBill"));
const UserBills = lazy(() => import("src/pages/portal/userBill/UserBills"));

const Orders = lazy(() => import("src/pages/portal/order/Orders"));
const Order = lazy(() => import("src/pages/portal/order/Order"));

const Invoices = lazy(() => import("src/pages/portal/invocie/Invoices"));
const Invoice = lazy(() => import("src/pages/portal/invocie/Invoice"));

const Domains = lazy(() => import("src/pages/cdn/Domains"));
const Domain = lazy(() => import("src/pages/cdn/Domain"));
const AddDomain = lazy(() => import("src/pages/cdn/AddDomain"));

const VmManagement = lazy(() => import("src/pages/vm/VmManagement"));
const AddVm = lazy(() => import("src/pages/vm/AddVm"));
const EditVm = lazy(() => import("src/pages/vm/EditVm"));

const RabbitManagement = lazy(() => import("src/pages/rabbit/RabbitManagement"));
const AddRabbitService = lazy(() => import("src/pages/rabbit/AddRabbitService"));
const EditRabbitService = lazy(() => import("src/pages/rabbit/EditRabbitService"));

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
        <Route path="/dash/account/login" element={<Login />} />
        <Route path="/dash/account/signup" element={<Signup />} />
        <Route path="/dash/account/forget" element={<Forget />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to="/dash/index" />} />
          <Route
            path="/dash/index"
            element={mainTemplate(Home, { pageTitle: "داشبورد" })}
          />
          <Route
            path="/dash/portal/profile"
            element={mainTemplate(Profile, {
              pageTitle: "حساب کاربری",
            })}
          />
          <Route
            path="/dash/portal/setting"
            element={mainTemplate(Setting, {
              pageTitle: "تنظیمات",
            })}
          />
          <Route
            path="/dash/portal/referral"
            element={mainTemplate(Referral, {
              pageTitle: "کد معرف",
            })}
          />
          <Route
            path="/dash/portal/referral/:id"
            element={callbackTemplate(ReferralCallBack)}
          />
          <Route
            path="/dash/portal/user-service"
            element={mainTemplate(UserServices, {
              pageTitle: "سرویس های من",
            })}
          />
          <Route
            path="/dash/portal/sales"
            element={mainTemplate(Sales, {
              link: {
                text: "بازگشت به داشبورد",
                url: "/dash/index",
              },
              hideSidebar: true,
            })}
          />
          <Route
            path="/dash/portal/notification"
            element={mainTemplate(Notification, {
              pageTitle: "مرکز اطلاع رسانی",
            })}
          />
          {/* ======================================= Order ======================================= */}
          <Route
            path="/dash/portal/order"
            element={mainTemplate(Orders, {
              pageTitle: "سبد خرید",
            })}
          />
          <Route
            path="/dash/portal/order/:id"
            element={mainTemplate(Order, {
              link: {
                text: "بازگشت به سبد خرید",
                url: "/dash/portal/order",
              },
              hideSidebar: true,
            })}
          />
          {/* ======================================= SUPPORT ======================================= */}
          <Route
            path="/dash/portal/supports"
            element={mainTemplate(Supports, {
              pageTitle: "مرکز پشتیبانی",
            })}
          />
          <Route
            path="/dash/portal/support/:id"
            element={mainTemplate(Support, {
              link: {
                text: "بازگشت به مرکز پشتیبانی",
                url: "/dash/portal/supports",
              },
              hideSidebar: true,
            })}
          />
          <Route
            path="/dash/portal/support/AddSupport"
            element={mainTemplate(AddSupport, {
              link: {
                text: "بازگشت به مرکز پشتیبانی",
                url: "/dash/portal/supports",
              },
              hideSidebar: true,
            })}
          />
          {/* ======================================= Payment ======================================= */}
          <Route
            path="/dash/portal/billing/payment"
            element={mainTemplate(Payments, {
              pageTitle: "گزارش پرداخت ها",
            })}
          />
          <Route
            path="/dash/portal/billing/payment:id"
            element={mainTemplate(Payment, {
              pageTitle: "گزارش پرداخت ها",
            })}
          />
          <Route
            path="/dash/payment/:id"
            element={mainTemplate(Payment, {
              pageTitle: "گزارش پرداخت ها",
            })}
          />
          {/* ======================================= Wallet ======================================= */}
          <Route
            path="/dash/portal/billing/wallet"
            element={mainTemplate(Wallet, {
              pageTitle: "گزارش کیف پول",
            })}
          />
          {/* ======================================= UserBill ======================================= */}
          <Route
            path="/dash/portal/billing/user-bill"
            element={mainTemplate(UserBills, {
              pageTitle: "گزارش مصرف"
            })}
          />
          <Route
            path="/dash/portal/billing/user-bill/:id"
            element={mainTemplate(UserBill, {
              link: {
                text: "بازگشت به گزارش مصرف",
                url: "/dash/portal/billing/user-bill",
              },
              hideSidebar: true,
            })}
          />
          {/* ======================================= Invoice ======================================= */}
          <Route
            path="/dash/portal/billing/invoice"
            element={mainTemplate(Invoices, {
              pageTitle: "فاکتور های فروش",
            })}
          />
          <Route
            path="/dash/portal/billing/invoice/:id"
            element={mainTemplate(Invoice, {
              link: {
                text: "بازگشت به فاکتور‌های فروش",
                url: "/dash/portal/billing/invoice",
              },
              hideSidebar: true,
            })}
          />
          {/* ======================================= CDN ======================================= */}
          <Route
            path="/dash/cdn"
            element={mainTemplate(Domains, {
              pageTitle: "مدیریت دامنه ها",
            })}
          />
          <Route
            path="/dash/cdn/sslTslSettings"
            element={mainTemplate(Domain, {
              pageTitle: "تنظیمات SSL/TSL",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/dash/cdn/loadBalanceSettings"
            element={mainTemplate(Domain, {
              pageTitle: "تنظیمات Load Balance",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/dash/cdn/dnsRecordSettings"
            element={mainTemplate(Domain, {
              pageTitle: "تنظیمات DNS Record",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/dash/cdn/apiGatewaySettings"
            element={mainTemplate(Domain, {
              pageTitle: "تنظیمات API Gateway",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/dash/cdn/addDomain"
            element={mainTemplate(AddDomain, {
              link: { text: "بازگشت به مدیریت دامنه ها", url: "/cdn" },
              hideSidebar: true,
            })}
          />
          {/* ======================================= CLOUD ======================================= */}
          <Route
            path="/dash/vm"
            element={mainTemplate(VmManagement, {
              pageTitle: "مدیریت سرور ابری",
            })}
          />
          <Route
            path="/dash/vm/addVm"
            element={mainTemplate(
              AddVm,
              {
                link: {
                  text: "بازگشت به مدیریت سرور ابری",
                  url: "/dash/vm",
                },
                hideSidebar: true,
              },
              AddServerContextProvider
            )}
          />
          <Route
            path="/dash/vm/:id"
            element={mainTemplate(
              EditVm,
              {
                link: {
                  text: "بازگشت به مدیریت سرور ابری",
                  url: "/dash/vm",
                },
                hideSidebar: true,
              },
              EditServerContextProvider
            )}
          />
          {/* ======================================= RabbitMQ ======================================= */}
          <Route
            path="/dash/rabbit"
            element={mainTemplate(RabbitManagement, {
              pageTitle: "مدیریت سرویس RabbitMQ",
            })}
          />
          <Route
            path="/dash/rabbit/addRabbitService"
            element={mainTemplate(
              AddRabbitService,
              {
                link: {
                  text: "بازگشت به مدیریت سرویس RabbitMQ",
                  url: "/dash/rabbit",
                },
                hideSidebar: true,
              },
              AddRabbitContextProvider
            )}
          />
          <Route
            path="/dash/rabbit/:id"
            element={mainTemplate(
              EditRabbitService,
              {
                link: {
                  text: "بازگشت به مدیریت سرویس RabbitMQ",
                  url: "/dash/rabbit",
                },
                hideSidebar: true,
              },
              EditRabbitContextProvider
            )}
          />
          <Route
            path="*"
            element={mainTemplate(NotFound, {
              pageTitle: " موردی یافت نشد!",
            })}
          />
        </Route>
        <Route path="*" element={<Navigate to="/dash/account/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
