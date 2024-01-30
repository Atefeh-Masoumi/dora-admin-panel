import {
  FC,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  DatacenterListResponse,
  ImageListResponse,
  ProductBundleListResponse,
  VmSpecListResponse,
  usePostApiMyKubernetesHostCreateMutation,
} from "src/app/services/api.generated";
import { CUSTOMER_PRODUCT_TYPE_ENUM } from "src/constant/customerProductTypeEnum";
import { passwordValidationRegex } from "src/utils/regexUtils";

type AddKubernetesContextType = {
  kubernetesVersion: DatacenterListResponse | null;
  setKubernetesVersion: Dispatch<SetStateAction<DatacenterListResponse | null>>;
  dataCenter: DatacenterListResponse | null;
  setDataCenter: Dispatch<SetStateAction<DatacenterListResponse | null>>;
  osVersion: ImageListResponse | null;
  setOsVersion: Dispatch<SetStateAction<ImageListResponse | null>>;
  serverConfig: ProductBundleListResponse | null;
  setServerConfig: Dispatch<SetStateAction<VmSpecListResponse | null>>;
  serverName: string;
  setServerName: Dispatch<SetStateAction<string>>;
  serverPassword: string;
  setServerPassword: Dispatch<SetStateAction<string>>;
  workersCount: number;
  setWorkersCount: Dispatch<SetStateAction<number>>;
  submitHandler: () => void;
  submitLoading: boolean;
  paymentType: CUSTOMER_PRODUCT_TYPE_ENUM | null;
  setPaymentType: Dispatch<SetStateAction<CUSTOMER_PRODUCT_TYPE_ENUM | null>>;
};

export const AddKubernetesContext = createContext<AddKubernetesContextType>({
  kubernetesVersion: null,
  setKubernetesVersion: () => {},
  dataCenter: null,
  setDataCenter: () => {},
  osVersion: null,
  setOsVersion: () => {},
  serverConfig: null,
  setServerConfig: () => {},
  serverName: "",
  setServerName: () => {},
  serverPassword: "",
  setServerPassword: () => {},
  workersCount: 3,
  setWorkersCount: () => {},
  submitHandler: () => {},
  submitLoading: false,
  paymentType: null,
  setPaymentType: () => {},
});

type AddKubernetesContextProviderPropsType = {
  children?: ReactNode;
};

export const AddKubernetesContextProvider: FC<
  AddKubernetesContextProviderPropsType
> = ({ children }) => {
  const [dataCenter, setDataCenter] = useState<DatacenterListResponse | null>(
    null
  );
  const [kubernetesVersion, setKubernetesVersion] =
    useState<DatacenterListResponse | null>(null);
  const [workersCount, setWorkersCount] = useState(3);
  const [osVersion, setOsVersion] = useState<ImageListResponse | null>(null);
  const [serverConfig, setServerConfig] = useState<VmSpecListResponse | null>(
    null
  );
  const [serverName, setServerName] = useState("");
  const [serverPassword, setServerPassword] = useState("");
  const [paymentType, setPaymentType] =
    useState<CUSTOMER_PRODUCT_TYPE_ENUM | null>(null);

  const navigate = useNavigate();

  const [createKubernetes, { isLoading: submitLoading }] =
    usePostApiMyKubernetesHostCreateMutation();

  const submitHandler = () => {
    console.log("first");
    let validationErrorMessage = "";

    if (!dataCenter || !dataCenter.id) {
      validationErrorMessage = "لطفا مرکز داده را انتخاب کنید";
    } else if (!osVersion || !osVersion.id) {
      validationErrorMessage = "لطفا ورژن سیستم عامل را انتخاب کنید";
    } else if (!kubernetesVersion) {
      validationErrorMessage = "لطفا ورژن کوبرنتیز خود را مشخص کنید";
    } else if (!serverConfig || !serverConfig.id) {
      validationErrorMessage = "لطفا مشخصات سرور را انتخاب کنید";
    } else if (!serverName) {
      validationErrorMessage = "لطفا نام سرور را انتخاب کنید";
    } else if (serverName.length < 3) {
      validationErrorMessage = "نام سرور نباید کمتر از سه حرف باشد";
    } else if (!passwordValidationRegex.test(serverPassword)) {
      validationErrorMessage = "رمز عبور نامعتبر است";
    } else if (!paymentType) {
      validationErrorMessage = "لطفا نوع پرداخت را مشخص کنید";
    } 

    if (validationErrorMessage) {
      return toast.error(validationErrorMessage);
    }

    createKubernetes({
      createKubernetesModel: {
        clusterName: serverName,
        datacenterId: dataCenter!.id!,
        imageId: osVersion!.id!,
        kubernetesVersionId: kubernetesVersion!.id!,
        vmPassword: serverPassword,
        customerProductTypeId: paymentType!,
        nodeCount: workersCount,
        productBundleId: serverConfig?.id || 0,
        isPredefined: true,
        cpu: null,
        memory: null,
        disk: null,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("سرویس کوبرنتیز شما با موفقیت ایجاد شد");
        navigate("/kubernetes");
      })
      .catch((err) => {});
  };

  return (
    <AddKubernetesContext.Provider
      value={{
        kubernetesVersion,
        setKubernetesVersion,
        dataCenter,
        setDataCenter,
        osVersion,
        setOsVersion,
        serverConfig,
        setServerConfig,
        serverName,
        setServerName,
        serverPassword,
        setServerPassword,
        workersCount,
        setWorkersCount,
        submitHandler,
        submitLoading,
        paymentType,
        setPaymentType,
      }}
    >
      {children}
    </AddKubernetesContext.Provider>
  );
};
