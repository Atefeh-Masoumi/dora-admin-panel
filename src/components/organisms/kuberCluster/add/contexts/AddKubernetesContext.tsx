import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  DatacenterImageListResponse,
  DatacenterListResponse,
  KubernetesPriceResponse,
  ProductBundleVmListResponse,
  usePostApiMyKubernetesClusterHostCreateMutation,
} from "src/app/services/api.generated";
import { passwordValidationRegex } from "src/utils/regexUtils";

export type kubernetesCustomConfigType = {
  cpu: number;
  memory: number;
  disk: number;
  ipV4: number;
};

type AddKubernetesContextType = {
  kubernetesVersion: DatacenterListResponse | null;
  setKubernetesVersion: Dispatch<SetStateAction<DatacenterListResponse | null>>;
  dataCenter: DatacenterListResponse | null;
  setDataCenter: Dispatch<SetStateAction<DatacenterListResponse | null>>;
  osVersion: DatacenterImageListResponse | null;
  setOsVersion: Dispatch<SetStateAction<DatacenterImageListResponse | null>>;
  serverConfig: ProductBundleVmListResponse | null;
  setServerConfig: Dispatch<SetStateAction<ProductBundleVmListResponse | null>>;
  serverName: string;
  setServerName: Dispatch<SetStateAction<string>>;
  serverPassword: string;
  setServerPassword: Dispatch<SetStateAction<string>>;
  workersCount: number;
  setWorkersCount: Dispatch<SetStateAction<number>>;
  submitHandler: () => void;
  submitLoading: boolean;
  isPredefined: boolean;
  setIsPredefined: (isPredefined: boolean) => void;
  customConfig: kubernetesCustomConfigType;
  setCustomConfig: (customConfig: kubernetesCustomConfigType) => void;
  productItemPrices: KubernetesPriceResponse | null;
  setProductItemPrices: Dispatch<
    SetStateAction<KubernetesPriceResponse | null>
  >;
};

export const AddKubernetesContext = createContext<AddKubernetesContextType>({
  //------main-------//
  dataCenter: null,
  setDataCenter: () => {},
  osVersion: null,
  setOsVersion: () => {},
  workersCount: 3,
  setWorkersCount: () => {},
  kubernetesVersion: null,
  setKubernetesVersion: () => {},

  //-------------//
  serverConfig: null,
  setServerConfig: () => {},
  serverName: "",
  setServerName: () => {},
  serverPassword: "",
  setServerPassword: () => {},
  submitHandler: () => {},
  submitLoading: false,
  isPredefined: false,
  setIsPredefined: (isPredefined) => {},
  customConfig: {
    cpu: 1,
    memory: 1,
    disk: 25,
    ipV4: 1,
  },
  setCustomConfig: (customConfig) => {},
  productItemPrices: null,
  setProductItemPrices: () => {},
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
  const [osVersion, setOsVersion] =
    useState<DatacenterImageListResponse | null>(null);
  const [serverConfig, setServerConfig] =
    useState<ProductBundleVmListResponse | null>(null);
  const [serverName, setServerName] = useState("");
  const [serverPassword, setServerPassword] = useState("");
  const [isPredefined, setIsPredefined] = useState(true);
  const [productItemPrices, setProductItemPrices] =
    useState<KubernetesPriceResponse | null>(null);

  const [customConfig, setCustomConfig] = useState<kubernetesCustomConfigType>({
    cpu: 4,
    memory: 4,
    disk: 75,
    ipV4: 1,
  });

  const navigate = useNavigate();

  const [createKubernetes, { isLoading: submitLoading }] =
    usePostApiMyKubernetesClusterHostCreateMutation();

  const submitHandler = () => {
    let validationErrorMessage = "";

    if (!dataCenter || !dataCenter.id) {
      validationErrorMessage = "لطفا مرکز داده را انتخاب کنید";
    } else if (!osVersion || !osVersion.id) {
      validationErrorMessage = "لطفا ورژن سیستم عامل را انتخاب کنید";
    } else if (!kubernetesVersion) {
      validationErrorMessage = "لطفا ورژن کوبرنتیز خود را مشخص کنید";
    } else if (isPredefined && (!serverConfig || !serverConfig.id)) {
      validationErrorMessage = "لطفا مشخصات سرور را انتخاب کنید";
    } else if (!serverName) {
      validationErrorMessage = "لطفا نام سرور را انتخاب کنید";
    } else if (serverName.length < 3) {
      validationErrorMessage = "نام سرور نباید کمتر از سه حرف باشد";
    } else if (!passwordValidationRegex.test(serverPassword)) {
      validationErrorMessage = "رمز عبور نامعتبر است";
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
        nodeCount: workersCount,
        productBundleId: serverConfig?.id || 0,
        isPredefined: isPredefined,
        cpu: customConfig.cpu,
        memory: customConfig.memory,
        disk: customConfig.disk,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("سرویس کوبرنتیز شما با موفقیت ایجاد شد");
        navigate("/kubernetes-cluster");
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
        isPredefined,
        setIsPredefined,
        customConfig,
        setCustomConfig,
        productItemPrices,
        setProductItemPrices,
      }}
    >
      {children}
    </AddKubernetesContext.Provider>
  );
};
