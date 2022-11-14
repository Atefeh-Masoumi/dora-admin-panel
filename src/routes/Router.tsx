import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
const OrderDetails = lazy(() => import("src/pages/order/OrderDetails"));
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
const Cart = lazy(() => import("src/pages/Cart"));

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route
            path="/"
            element={mainTemplate(Home, { pageTitle: "داشبورد" })}
          />
          <Route
            path="/profile"
            element={mainTemplate(Profile, {
              pageTitle: "حساب کاربری",
            })}
          />
          <Route
            path="/setting"
            element={mainTemplate(Setting, {
              pageTitle: "تنظیمات",
            })}
          />
          <Route
            path="/referral"
            element={mainTemplate(Referral, {
              pageTitle: "کد معرف",
            })}
          />
          <Route
            path="/referral/:id"
            element={callbackTemplate(ReferralCallBack)}
          />
          <Route
            path="/services"
            element={mainTemplate(Services, {
              pageTitle: "سرویس های من",
            })}
          />
          <Route
            path="/sales"
            element={mainTemplate(Sales, {
              link: {
                text: "بازگشت به داشبورد",
                url: "/",
              },
              hideSidebar: true,
            })}
          />
          <Route
            path="/notification"
            element={mainTemplate(Notification, {
              pageTitle: "مرکز اطلاع رسانی",
            })}
          />
          {/* ======================================= CART ======================================= */}
          <Route
            path="/cart"
            element={mainTemplate(Cart, {
              pageTitle: "سبد خرید",
            })}
          />
          <Route
            path="/cart/:id"
            element={mainTemplate(OrderDetails, {
              link: {
                text: "بازگشت به سبد خرید",
                url: "/cart",
              },
              hideSidebar: true,
            })}
          />
          {/* ======================================= SUPPORT ======================================= */}
          <Route
            path="/support"
            element={mainTemplate(Support, {
              pageTitle: "مرکز پشتیبانی",
            })}
          />
          <Route
            path="/support/addTicket"
            element={mainTemplate(AddTicket, {
              link: {
                text: "بازگشت به مرکز پشتیبانی",
                url: "/support",
              },
              hideSidebar: true,
            })}
          />
          <Route
            path="/support/:id"
            element={mainTemplate(Detail, {
              link: {
                text: "بازگشت به مرکز پشتیبانی",
                url: "/support",
              },
              hideSidebar: true,
            })}
          />
          {/* ======================================= WALLET ======================================= */}
          <Route
            path="/wallet"
            element={mainTemplate(Wallet, {
              pageTitle: "گزارش کیف پول",
            })}
          />
          <Route
            path="/wallet/bills"
            element={mainTemplate(UserBills, { pageTitle: "گزارش مصرف" })}
          />
          <Route
            path="/wallet/report"
            element={mainTemplate(Transactions, {
              pageTitle: "گزارش پرداخت ها",
            })}
          />
          <Route
            path="/wallet/:id"
            element={mainTemplate(Transactions, {
              pageTitle: "گزارش پرداخت ها",
            })}
          />
          <Route
            path="/wallet/salesInvoice"
            element={mainTemplate(Invoices, {
              pageTitle: "فاکتور های فروش",
            })}
          />
          <Route
            path="/wallet/bills/:id"
            element={mainTemplate(Bill, {
              link: {
                text: "بازگشت به گزارش مصرف",
                url: "/wallet/bills",
              },
              hideSidebar: true,
            })}
          />
          <Route
            path="/wallet/salesInvoice/:id"
            element={mainTemplate(Invoice, {
              link: {
                text: "بازگشت به فاکتور‌های فروش",
                url: "/wallet/salesInvoice",
              },
              hideSidebar: true,
            })}
          />
          {/* ======================================= CDN ======================================= */}
          <Route
            path="/cdn"
            element={mainTemplate(DomainManagement, {
              pageTitle: "مدیریت دامنه ها",
            })}
          />
          <Route
            path="/cdn/sslTslSettings"
            element={mainTemplate(CDN, {
              pageTitle: "تنظیمات SSL/TSL",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/loadBalanceSettings"
            element={mainTemplate(CDN, {
              pageTitle: "تنظیمات Load Balance",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/dnsRecordSettings"
            element={mainTemplate(CDN, {
              pageTitle: "تنظیمات DNS Record",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/apiGatewaySettings"
            element={mainTemplate(CDN, {
              pageTitle: "تنظیمات API Gateway",
              RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/addDomain"
            element={mainTemplate(AddDomain, {
              link: { text: "بازگشت به مدیریت دامنه ها", url: "/cdn" },
              hideSidebar: true,
            })}
          />
          {/* ======================================= CLOUD ======================================= */}
          <Route
            path="/payment/:id"
            element={callbackTemplate(PaymentCallBack)}
          />
          {/* ======================================= CLOUD ======================================= */}
          <Route
            path="/cloud"
            element={mainTemplate(CloudManagement, {
              pageTitle: "مدیریت سرور ابری",
            })}
          />
          <Route
            path="/cloud/addCloudServer"
            element={mainTemplate(
              AddCloudServer,
              {
                link: {
                  text: "بازگشت به مدیریت سرور ابری",
                  url: "/cloud",
                },
                hideSidebar: true,
              },
              AddServerContextProvider
            )}
          />
          <Route
            path="/cloud/:id"
            element={mainTemplate(
              EditCloudServer,
              {
                link: {
                  text: "بازگشت به مدیریت سرور ابری",
                  url: "/cloud",
                },
                hideSidebar: true,
              },
              EditServerContextProvider
            )}
          />
        </Route>
        <Route
          path="*"
          element={mainTemplate(NotFound, {
            pageTitle: " موردی یافت نشد!",
          })}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
