import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  MainTemplate,
  MainTemplatePropsType,
} from "src/components/templates/MainTemplate";
import PageLoading from "src/components/atoms/PageLoading";
import { PrivateRoute } from "./PrivateRoute";
import { DomainSelect } from "src/components/organisms/CDN/DomainSelect";
import AddServerContextProvider from "src/context/AddServerContext";
import EditServerContextProvider from "src/context/EditServerContext";
import {
  CallBackTemplate,
  CallBackTemplatePropsType,
} from "src/components/templates/CallBackTemplate";

const Home = lazy(() => import("src/pages/Home"));
const Profile = lazy(() => import("src/pages/Profile"));
const Setting = lazy(() => import("src/pages/Setting"));
const Referral = lazy(() => import("src/pages/Referral"));
const Services = lazy(() => import("src/pages/Services"));
const Sales = lazy(() => import("src/pages/Sales"));
const Notification = lazy(() => import("src/pages/Notification"));
const Support = lazy(() => import("src/pages/support"));
const AddTicket = lazy(() => import("src/pages/support/AddTicket"));
const Detail = lazy(() => import("src/pages/support/Detail"));
const Wallet = lazy(() => import("src/pages/wallet"));
const Invoices = lazy(() => import("src/pages/wallet/Invoices"));
const Invoice = lazy(() => import("src/pages/wallet/Invoice"));
const Bill = lazy(() => import("src/pages/wallet/Bill"));
const UserBills = lazy(() => import("src/pages/wallet/UserBills"));
const Transactions = lazy(() => import("src/pages/wallet/Transactions"));
const Login = lazy(() => import("src/pages/auth/Login"));
const Signup = lazy(() => import("src/pages/auth/Signup"));
const Forget = lazy(() => import("src/pages/auth/forget"));
const NotFound = lazy(() => import("src/pages/404"));
const AddDomain = lazy(() => import("src/pages/CDN/AddDomain"));
const CDN = lazy(() => import("src/pages/CDN/CDN"));
const DomainManagement = lazy(() => import("src/pages/CDN/DomainManagement"));
const CloudManagement = lazy(() => import("src/pages/cloud/CloudManagement"));
const AddCloudServer = lazy(() => import("src/pages/cloud/AddCloudServer"));
const EditCloudServer = lazy(() => import("src/pages/cloud/EditCloudServer"));
const PaymentCallBack = lazy(() => import("src/pages/PaymentCallBack"));
const ReferralCallBack = lazy(() => import("src/pages/ReferralCallBack"));
const PaymentDetails = lazy(() => import("src/pages/cart/PaymentDetails"));
const Cart = lazy(() => import("src/pages/cart/Cart"));

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
            element={mainTemplate(CDN, {
              pageTitle: "تنظیمات SSL/TSL",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/dash/cdn/loadBalanceSettings"
            element={mainTemplate(CDN, {
              pageTitle: "تنظیمات Load Balance",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/dash/cdn/dnsRecordSettings"
            element={mainTemplate(CDN, {
              pageTitle: "تنظیمات DNS Record",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/dash/cdn/apiGatewaySettings"
            element={mainTemplate(CDN, {
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
