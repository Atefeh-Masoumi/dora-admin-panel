import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  MainTemplate,
  MainTemplatePropsType,
} from "src/components/templates/MainTemplate";
import PageLoading from "src/components/atoms/PageLoading";
import { PrivateRoute } from "./PrivateRoute";
import { DomainSelect } from "src/components/organisms/cdn/DomainSelect";
import AddServerContextProvider from "src/context/AddServerContext";
import EditServerContextProvider from "src/context/EditServerContext";
import AddRabbitContextProvider from "src/components/organisms/rabbit/addService/context/AddRabbitContext";
import EditRabbitContextProvider from "src/components/organisms/rabbit/editService/context/EditRabbitContext";
import {
  CallBackTemplate,
  CallBackTemplatePropsType,
} from "src/components/templates/CallBackTemplate";

const Home = lazy(() => import("src/pages/Home"));
const Profile = lazy(() => import("src/pages/portal/Profile"));
const Setting = lazy(() => import("src/pages/portal/Setting"));
const Referral = lazy(() => import("src/pages/portal/referral/Referral"));
const Services = lazy(() => import("src/pages/portal/UserServices"));
const Sales = lazy(() => import("src/pages/portal/Sales"));
const Notification = lazy(() => import("src/pages/portal/Notification"));
const Support = lazy(() => import("src/pages/portal/support"));
const AddTicket = lazy(() => import("src/pages/portal/support/AddTicket"));
const Detail = lazy(() => import("src/pages/portal/support/Detail"));
const Wallet = lazy(() => import("src/pages/portal/Wallet"));
const Invoices = lazy(() => import("src/pages/portal/invocie/Invoices"));
const Invoice = lazy(() => import("src/pages/portal/invocie/Invoice"));
const Bill = lazy(() => import("src/pages/portal/userBill/Bill"));
const UserBills = lazy(() => import("src/pages/portal/userBill/UserBills"));
const PaymentCallBack = lazy(() => import("src/pages/portal/payment/PaymentCallBack"));
const Transactions = lazy(() => import("src/pages/portal/payment/Transactions"));
const Login = lazy(() => import("src/pages/auth/Login"));
const Signup = lazy(() => import("src/pages/auth/Signup"));
const Forget = lazy(() => import("src/pages/auth/forget"));
const NotFound = lazy(() => import("src/pages/404"));
const AddDomain = lazy(() => import("src/pages/cdn/AddDomain"));
const Domains = lazy(() => import("src/pages/cdn/Domains"));
const DomainManagement = lazy(() => import("src/pages/cdn/DomainManagement"));
const CloudManagement = lazy(() => import("src/pages/cloud/CloudManagement"));
const AddCloudServer = lazy(() => import("src/pages/cloud/AddCloudServer"));
const EditCloudServer = lazy(() => import("src/pages/cloud/EditCloudServer"));
const ReferralCallBack = lazy(() => import("src/pages/portal/referral/ReferralCallBack"));
const PaymentDetails = lazy(() => import("src/pages/portal/order/PaymentDetails"));
const Cart = lazy(() => import("src/pages/portal/order/Cart"));
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
          <Route path="/" element={<Navigate to="/dash" />} />
          <Route
            path="/dash"
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
            element={mainTemplate(Services, {
              pageTitle: "سرویس های من",
            })}
          />
          <Route
            path="/dash/portal/sales"
            element={mainTemplate(Sales, {
              link: {
                text: "بازگشت به داشبورد",
                url: "/dash",
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
          {/* ======================================= CART ======================================= */}
          <Route
            path="/dash/portal/order"
            element={mainTemplate(Cart, {
              pageTitle: "سبد خرید",
            })}
          />
          <Route
            path="/dash/portal/order/:id"
            element={mainTemplate(PaymentDetails, {
              link: {
                text: "بازگشت به سبد خرید",
                url: "/dash/portal/order",
              },
              hideSidebar: true,
            })}
          />
          {/* ======================================= SUPPORT ======================================= */}
          <Route
            path="/dash/portal/support"
            element={mainTemplate(Support, {
              pageTitle: "مرکز پشتیبانی",
            })}
          />
          <Route
            path="/dash/portal/support/addTicket"
            element={mainTemplate(AddTicket, {
              link: {
                text: "بازگشت به مرکز پشتیبانی",
                url: "/dash/portal/support",
              },
              hideSidebar: true,
            })}
          />
          <Route
            path="/dash/portal/support/:id"
            element={mainTemplate(Detail, {
              link: {
                text: "بازگشت به مرکز پشتیبانی",
                url: "/dash/portal/support",
              },
              hideSidebar: true,
            })}
          />
          {/* ======================================= WALLET ======================================= */}
          <Route
            path="/dash/portal/billing/wallet"
            element={mainTemplate(Wallet, {
              pageTitle: "گزارش کیف پول",
            })}
          />
          <Route
            path="/dash/portal/billing/user-bill"
            element={mainTemplate(UserBills, { pageTitle: "گزارش مصرف" })}
          />
          <Route
            path="/dash/portal/billing/user-bill/:id"
            element={mainTemplate(Bill, {
              link: {
                text: "بازگشت به گزارش مصرف",
                url: "/dash/portal/billing/user-bill",
              },
              hideSidebar: true,
            })}
          />
          <Route
            path="/dash/portal/billing/payment"
            element={mainTemplate(Transactions, {
              pageTitle: "گزارش پرداخت ها",
            })}
          />
          <Route
            path="/dash/portal/billing/payment:id"
            element={mainTemplate(Transactions, {
              pageTitle: "گزارش پرداخت ها",
            })}
          />
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
            element={mainTemplate(DomainManagement, {
              pageTitle: "مدیریت دامنه ها",
            })}
          />
          <Route
            path="/dash/cdn/sslTslSettings"
            element={mainTemplate(Domains, {
              pageTitle: "تنظیمات SSL/TSL",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/dash/cdn/loadBalanceSettings"
            element={mainTemplate(Domains, {
              pageTitle: "تنظیمات Load Balance",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/dash/cdn/dnsRecordSettings"
            element={mainTemplate(Domains, {
              pageTitle: "تنظیمات DNS Record",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/dash/cdn/apiGatewaySettings"
            element={mainTemplate(Domains, {
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
            path="/dash/payment/:id"
            element={callbackTemplate(PaymentCallBack)}
          />
          {/* ======================================= CLOUD ======================================= */}
          <Route
            path="/dash/cloud"
            element={mainTemplate(CloudManagement, {
              pageTitle: "مدیریت سرور ابری",
            })}
          />
          <Route
            path="/dash/cloud/addCloudServer"
            element={mainTemplate(
              AddCloudServer,
              {
                link: {
                  text: "بازگشت به مدیریت سرور ابری",
                  url: "/dash/cloud",
                },
                hideSidebar: true,
              },
              AddServerContextProvider
            )}
          />
          <Route
            path="/dash/cloud/:id"
            element={mainTemplate(
              EditCloudServer,
              {
                link: {
                  text: "بازگشت به مدیریت سرور ابری",
                  url: "/dash/cloud",
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
