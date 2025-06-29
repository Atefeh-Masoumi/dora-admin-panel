import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLoading from "src/components/atoms/PageLoading";
import {
  MainTemplate,
  MainTemplatePropsType,
} from "src/components/templates/MainTemplate";
import { PrivateRoute } from "./PrivateRoute";
import { BACK_URL_HINTS_ENUM } from "src/constant/backUrlHintsEnum";
import { AddKubernetesContextProvider } from "src/components/organisms/kuberCluster/add/contexts/AddKubernetesContext";
import AddZoneContextProvider from "src/components/organisms/cdn/add/contexts/AddContext";
import AddDomainContextProvider from "src/components/organisms/domain/add/contexts/AddContext";
import EditDomainContextProvider from "src/components/organisms/domain/edit/contexts/EditContext";
import AddStorageContextProvider from "src/components/organisms/storage/add/contexts/AddStorageContext";
import AddKubernetesCloudContextProvider from "src/components/organisms/kubernetesCloud/add/context/AddKubernetesCloudContext";
import EditStorageContextProvider from "src/components/organisms/storage/edit/contexts/EditStorageContext";
import AddServerContextProvider from "src/components/organisms/vm/add/contexts/AddVmContext";
import AddWebContextProvider from "src/components/organisms/web/add/contexts/AddWebContext";
import EditWebContextProvider from "src/components/organisms/web/edit/contexts/EditWebContext";
import AddVpcContextProvider from "src/components/organisms/vpc/add/contexts/AddVpcContext";
import { NavigateSetter } from "src/utils/navigate";
import { EditVmWrapper } from "./VmRouteWraper";

const Home = lazy(() => import("src/pages/Home"));
const NotFound = lazy(() => import("src/pages/404"));
const Forbidden = lazy(() => import("src/pages/Forbidden"));

const Login = lazy(() => import("src/pages/account/Login"));
const TwoFactorLogin = lazy(() => import("src/pages/account/TwoFactorLogin"));
const Signup = lazy(() => import("src/pages/account/Signup"));
const Forget = lazy(() => import("src/pages/account/forget"));

const Account = lazy(() => import("src/pages/portal/account/Index"));
const Financial = lazy(() => import("src/pages/portal/financial/Index"));

const Sales = lazy(() => import("src/pages/portal/orderOffer/Sales"));
const CustomerProducts = lazy(
  () => import("src/pages/portal/customerProduct/Index")
);
const Supports = lazy(() => import("src/pages/portal/support/Index"));
const Support = lazy(() => import("src/pages/portal/support/Support"));
const AddSupport = lazy(() => import("src/pages/portal/support/AddSupport"));

const Calculator = lazy(() => import("src/pages/portal/calculator"));

const Wallet = lazy(
  () => import("src/pages/portal/financial/WalletTransactions")
);
const Payments = lazy(() => import("src/pages/portal/financial/Payments"));
const Payment = lazy(
  () => import("src/pages/portal/financial/PaymentCallBack")
);
const CustomerBills = lazy(
  () => import("src/pages/portal/financial/CustomerBills")
);
const Invoices = lazy(() => import("src/pages/portal/financial/Invoices"));
const Invoice = lazy(() => import("src/pages/portal/financial/Invoice"));

const CdnIndex = lazy(() => import("src/pages/cdn/DnsCdnList"));
const AddZone = lazy(() => import("src/pages/cdn/AddZone"));
const EditZone = lazy(() => import("src/pages/cdn/EditZone"));

const VmProjectIndex = lazy(() => import("src/pages/vm/VmProjectList"));
const VmIndex = lazy(() => import("src/pages/vm/VmList"));
const AddVm = lazy(() => import("src/pages/vm/AddVm"));
const EditVm = lazy(() => import("src/pages/vm/EditVm"));

const WebIndex = lazy(() => import("src/pages/web/Index"));
const AddWeb = lazy(() => import("src/pages/web/AddWeb"));
const EditWeb = lazy(() => import("src/pages/web/EditWeb"));

const DomainIndex = lazy(() => import("src/pages/domain/DomainList"));
const AddDomain = lazy(() => import("src/pages/domain/AddDomain"));
const EditDomain = lazy(() => import("src/pages/domain/EditDomain"));

const StorageIndex = lazy(() => import("src/pages/storage/StorageList"));
const AddStorageService = lazy(() => import("src/pages/storage/AddStorage"));
const EditStorageService = lazy(() => import("src/pages/storage/EditStorage"));

const KubernetesIndex = lazy(
  () => import("src/pages/KuberCluster/KubernetesList")
);
const AddKubernetes = lazy(
  () => import("src/pages/KuberCluster/AddKubernetes")
);
const EditKubernetes = lazy(
  () => import("src/pages/KuberCluster/EditKubernetes")
);
const AddNodeKubernetes = lazy(
  () => import("src/pages/KuberCluster/AddNodeKubernetes")
);

const VpcIndex = lazy(() => import("src/pages/vpc/VpcList"));
const AddVpc = lazy(() => import("src/pages/vpc/AddVpc"));
const VpcEditZone = lazy(() => import("src/pages/vpc/EditZone"));

const KubernetesCloud = lazy(
  () => import("src/pages/kuberCloud/KubernetesCloudList")
);
const AddNamespace = lazy(
  () => import("src/pages/kuberCloud/add/AddkubernetesCloud")
);
const EditKubernetesCloud = lazy(
  () => import("src/pages/kuberCloud/edit/EditKubernetesCloud")
);
const AddKubernetesCloudDeployment = lazy(
  () =>
    import("src/pages/kuberCloud/edit/deployment/AddKubernetesCloudDeployment")
);
const EditKubernetesCloudDeployment = lazy(
  () =>
    import("src/pages/kuberCloud/edit/deployment/EditKubernetesCloudDeployment")
);


export const  mainTemplate = (
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

const Router: FC = () => {
  return (
    <BrowserRouter>
      <NavigateSetter />
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
            path="/portal/account"
            element={mainTemplate(Account, {
              pageTitle: "مدیریت اکانت",
            })}
          />
          <Route
            path="/portal/financial"
            element={mainTemplate(Financial, {
              pageTitle: "مدیریت مالی",
            })}
          />
          {/* <Route
            path="/portal/referral"
            element={mainTemplate(Referrals, {
              pageTitle: "کد معرف",
            })}
          />
          <Route
            path="/portal/referral/:id"
            element={callbackTemplate(Referral)}
          /> */}
          {/* <Route path="/referral/:id" element={callbackTemplate(Referral)} /> */}
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
              hideSidebar: false,
            })}
          />
          <Route
            path="/portal/support/add-ticket"
            element={mainTemplate(AddSupport, {
              link: {
                text: "بازگشت به مرکز پشتیبانی",
                url: "/portal/supports",
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
            element={mainTemplate(CustomerBills, {
              pageTitle: "گزارش محاسبات",
            })}
          />
          {/* <Route
            path="/portal/wallet/bill/:id"
            element={mainTemplate(CustomerBill, {
              link: {
                text: "بازگشت به گزارش محاسبات",
                url: "/portal/financial/?tab=customer-bill",
              },
              hideSidebar: false,
            })}
          /> */}
          {/* ======================================= CDN ======================================= */}
          <Route
            path="/cdn"
            element={mainTemplate(CdnIndex, {
              pageTitle: "مدیریت زون‌ها",
            })}
          />
          <Route
            path="/cdn/add-zone"
            element={mainTemplate(
              AddZone,
              {
                link: { text: "بازگشت به مدیریت زون‌ها", url: "/cdn" },
                hideSidebar: false,
              },
              AddZoneContextProvider
            )}
          />
          <Route
            path="/cdn/:id/overview"
            element={mainTemplate(EditZone, {
              pageTitle: "مشخصات زون",
              // RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/:id/analytics"
            element={mainTemplate(EditZone, {
              pageTitle: "آنالیز ترافیک",
              // RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/:id/dns-record"
            element={mainTemplate(EditZone, {
              pageTitle: "تنظیمات DNS Record",
              // RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/:id/setting"
            element={mainTemplate(EditZone, {
              pageTitle: "تنظیمات",
              // RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/:id/load-balance"
            element={mainTemplate(EditZone, {
              pageTitle: "تنظیمات Load Balance",
              // RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/api-gateway-settings"
            element={mainTemplate(EditZone, {
              pageTitle: "تنظیمات API Gateway",
              // RightComponent: DomainSelect,
            })}
          />
          <Route
            path="/cdn/add-zone"
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
                  url: BACK_URL_HINTS_ENUM.ADD_VM,
                },
                hideSidebar: false,
              },
              AddServerContextProvider
            )}
          />
            <Route
            path="/vm/:projectId/:id/specification"
            element={<EditVmWrapper />}
          />
          <Route
            path="/vm/:projectId/:id/analytics"
            element={<EditVmWrapper />}
          />
          <Route
            path="/vm/:projectId/:id/ip"
            element={<EditVmWrapper />}
          />
          <Route
            path="/vm/:projectId/:id/rebuild"
            element={<EditVmWrapper />}
          />
          <Route
            path="/vm/:projectId/:id/config"
            element={<EditVmWrapper />}
          />
          <Route
            path="/vm/:projectId/:id/snapshot"
            element={<EditVmWrapper />}
          />
          <Route
            path="/vm/:projectId/:id/firewall"
            element={<EditVmWrapper />}
          />
          {/* ======================================= Kubernetes Cluster ======================================= */}
          <Route
            path="/kubernetes-cluster"
            element={mainTemplate(KubernetesIndex, {
              pageTitle: "مدیریت سرویس کلاستر کوبرنتیز",
            })}
          />
          <Route
            path="/kubernetes-cluster/add"
            element={mainTemplate(
              AddKubernetes,
              {
                link: {
                  text: "بازگشت به مدیریت سرویس کلاستر کوبرنتیز",
                  url: "/kubernetes-cluster",
                },
                hideSidebar: false,
              },
              AddKubernetesContextProvider
            )}
          />
          <Route
            path="/kubernetes-cluster/:id"
            element={mainTemplate(
              EditKubernetes,
              {
                link: {
                  text: "بازگشت به مدیریت سرویس کلاستر کوبرنتیز",
                  url: "/kubernetes-cluster",
                },
                hideSidebar: false,
              },
              AddKubernetesContextProvider
            )}
          />
          <Route
            path="/kubernetes-cluster/:id/add-node"
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
                hideSidebar: false,
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
          <Route
            path="/forbidden"
            element={mainTemplate(Forbidden, {
              pageTitle: " موردی یافت نشد!",
            })}
          />
        </Route>
        {/* ======================================= VPC ======================================= */}
        <Route
          path="/vpc"
          element={mainTemplate(VpcIndex, {
            pageTitle: "مدیریت ابر اختصاصی",
          })}
        />

        <Route
          path="/vpc/add"
          element={mainTemplate(
            AddVpc,
            {
              link: {
                text: "بازگشت به مدیریت ابر اختصاصی",
                url: "/vpc",
              },
              hideSidebar: false,
            },
            AddVpcContextProvider
          )}
        />
        <Route
          path="/vpc/:vpcId/overview"
          element={mainTemplate(VpcEditZone, {
            pageTitle: "مشخصات سرویس",
          })}
        />
        <Route
          path="/vpc/:vpcId/network"
          element={mainTemplate(VpcEditZone, {
            pageTitle: "مدیریت شبکه ها",
          })}
        />
        <Route
          path="/vpc/:vpcId/vpcVm"
          element={mainTemplate(VpcEditZone, {
            pageTitle: "مدیریت سرور ها",
          })}
        />
        <Route
          path="/vpc/:vpcId/nat"
          element={mainTemplate(VpcEditZone, {
            pageTitle: "مدیریت NAT",
          })}
        />
        <Route
          path="/vpc/:vpcId/ip"
          element={mainTemplate(VpcEditZone, {
            pageTitle: "مدیریت Public IP",
          })}
        />
        <Route
          path="/vpc/:vpcId/loadBalancer"
          element={mainTemplate(VpcEditZone, {
            pageTitle: "مدیریت Load Balance",
          })}
        />
        <Route
          path="/vm/:projectId/:type/add-vm"
          element={mainTemplate(AddVm, {
            pageTitle: "ایجاد سرور مجازی جدید",
          })}
        />
        {/* ======================================= KUBERNETES CLOUD ======================================= */}

        <Route
          path="/kubernetes-cloud"
          element={mainTemplate(KubernetesCloud, {
            pageTitle: "مدیریت کوبرنتیز ابری",
          })}
        />

        <Route
          path="/kubernetes-cloud/add"
          element={mainTemplate(
            AddNamespace,
            {
              link: {
                text: "بازگشت به مدیریت کوبرنتیز ابری",
                url: "/kubernetes-cloud",
              },
              hideSidebar: false,
            },
            AddKubernetesCloudContextProvider
          )}
        />

        <Route
          path="/kubernetes-cloud/:kubernetesCloudId/overview"
          element={mainTemplate(EditKubernetesCloud, {
            link: {
              text: "بازگشت به مدیریت کوبرنتیز ابری",
              url: "/kubernetes-cloud",
            },
            hideSidebar: false,
          })}
        />

        <Route
          path="/kubernetes-cloud/:kubernetesCloudId/deployment"
          element={mainTemplate(EditKubernetesCloud, {
            link: {
              text: "بازگشت به مدیریت کوبرنتیز ابری",
              url: "/kubernetes-cloud",
            },
            hideSidebar: false,
          })}
        />

        <Route
          path="/kubernetes-cloud/:kubernetesCloudId/configmap"
          element={mainTemplate(EditKubernetesCloud, {
            link: {
              text: "بازگشت به مدیریت کوبرنتیز ابری",
              url: "/kubernetes-cloud",
            },
            hideSidebar: false,
          })}
        />

        <Route
          path="/kubernetes-cloud/:kubernetesCloudId/secret"
          element={mainTemplate(EditKubernetesCloud, {
            link: {
              text: "بازگشت به مدیریت کوبرنتیز ابری",
              url: "/kubernetes-cloud",
            },
            hideSidebar: false,
          })}
        />

        <Route
          path="/kubernetes-cloud/:kubernetesCloudId/setting"
          element={mainTemplate(EditKubernetesCloud, {
            link: {
              text: "بازگشت به مدیریت کوبرنتیز ابری",
              url: "/kubernetes-cloud",
            },
            hideSidebar: false,
          })}
        />

        <Route
          path="/kubernetes-cloud/:kubernetesCloudId/ingress"
          element={mainTemplate(EditKubernetesCloud, {
            link: {
              text: "بازگشت به مدیریت کوبرنتیز ابری",
              url: "/kubernetes-cloud",
            },
            hideSidebar: false,
          })}
        />

        <Route
          path="/kubernetes-cloud/:kubernetesCloudId/firewall"
          element={mainTemplate(EditKubernetesCloud, {
            pageTitle: "مدیریت Firewall",
          })}
        />

        <Route
          path="/kubernetes-cloud/:kubernetesCloudId/deployment/add"
          element={mainTemplate(AddKubernetesCloudDeployment, {
            link: {
              text: "بازگشت به مدیریت deployment ها",
              url: BACK_URL_HINTS_ENUM.ADD_DEPLOYMENT,
            },
            hideSidebar: false,
          })}
        />
        <Route
          path="/kubernetes-cloud/:kubernetesCloudId/deployment/:deploymentId"
          element={mainTemplate(EditKubernetesCloudDeployment, {
            link: {
              text: "بازگشت به مدیریت Deployment ها",
              url: BACK_URL_HINTS_ENUM.ADD_DEPLOYMENT,
            },
            hideSidebar: false,
          })}
        />

        <Route
          path="/kubernetes-cloud/:kubernetesCloudId/deployment/:deploymentId/overview"
          element={mainTemplate(EditKubernetesCloudDeployment, {
            pageTitle: "مشخصات Deployment",
            // RightComponent: DomainSelect,
          })}
        />
        <Route
          path="/kubernetes-cloud/:kubernetesCloudId/deployment/:deploymentId/setting"
          element={mainTemplate(EditKubernetesCloudDeployment, {
            pageTitle: "تغییر مشخصات سخت افزاری",
          })}
        />
        <Route
          path="/kubernetes-cloud/:kubernetesCloudId/deployment/:deploymentId/gateway"
          element={mainTemplate(EditKubernetesCloudDeployment, {
            pageTitle: "Gateway",
          })}
        />
        <Route
          path="/kubernetes-cloud/:kubernetesCloudId/deployment/:deploymentId/monitoring"
          element={mainTemplate(EditKubernetesCloudDeployment, {
            pageTitle: "monitoring",
          })}
        />
        <Route path="*" element={<Navigate to="/account/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
