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
  DatacenterListResponse,
  KubernetesPriceResponse,
  ProductBundleVmListResponse,
  usePostApiMyKubernetesCloudHostCreateMutation,
} from "src/app/services/api.generated";

export type kubernetesCloudCustomConfigType = {
  cpu: number;
  memory: number;
  disk: number;
  pods10: number;
};

type AddKubernetesCloudContextType = {
  dataCenter: DatacenterListResponse | null;
  setDataCenter: Dispatch<SetStateAction<DatacenterListResponse | null>>;
  serverConfig: ProductBundleVmListResponse | null;
  setServerConfig: Dispatch<SetStateAction<ProductBundleVmListResponse | null>>;
  serviceName: string;
  setServiceName: Dispatch<SetStateAction<string>>;
  submitHandler: () => void;
  submitLoading: boolean;
  isPredefined: boolean;
  setIsPredefined: (isPredefined: boolean) => void;
  customConfig: kubernetesCloudCustomConfigType;
  setCustomConfig: (customConfig: kubernetesCloudCustomConfigType) => void;
  productItemPrices: KubernetesPriceResponse | null;
  setProductItemPrices: Dispatch<
    SetStateAction<KubernetesPriceResponse | null>
  >;
};

export const AddKubernetesCloudContext =
  createContext<AddKubernetesCloudContextType>({
    //------main-------//
    dataCenter: null,
    setDataCenter: () => {},
    //-------------//
    serverConfig: null,
    setServerConfig: () => {},
    serviceName: "",
    setServiceName: () => {},
    submitHandler: () => {},
    submitLoading: false,
    isPredefined: false,
    setIsPredefined: (isPredefined) => {},
    customConfig: {
      cpu: 1,
      memory: 1,
      disk: 25,
      pods10: 10,
    },
    setCustomConfig: (customConfig) => {},
    productItemPrices: null,
    setProductItemPrices: () => {},
  });

type AddKubernetesCloudContextProviderPropsType = {
  children?: ReactNode;
};

const AddKubernetesCloudContextProvider: FC<
  AddKubernetesCloudContextProviderPropsType
> = ({ children }) => {
  const [dataCenter, setDataCenter] = useState<DatacenterListResponse | null>(
    null
  );
  const [serverConfig, setServerConfig] =
    useState<ProductBundleVmListResponse | null>(null);
  const [serviceName, setServiceName] = useState("");
  const [isPredefined, setIsPredefined] = useState(true);
  const [productItemPrices, setProductItemPrices] =
    useState<KubernetesPriceResponse | null>(null);

  const [customConfig, setCustomConfig] =
    useState<kubernetesCloudCustomConfigType>({
      cpu: 4,
      memory: 4,
      disk: 75,
      pods10: 10,
    });

  const navigate = useNavigate();

  const [createKubernetes, { isLoading: submitLoading }] =
    usePostApiMyKubernetesCloudHostCreateMutation();

  const submitHandler = () => {
    let validationErrorMessage = "";

    if (!dataCenter || !dataCenter.id) {
      validationErrorMessage = "لطفا مرکز داده را انتخاب کنید";
    } else if (isPredefined && (!serverConfig || !serverConfig.id)) {
      validationErrorMessage = "لطفا مشخصات سرویس را انتخاب کنید";
    } else if (!serviceName) {
      validationErrorMessage = "لطفا نام سرویس را انتخاب کنید";
    } else if (serviceName.length < 3) {
      validationErrorMessage = "نام سرویس نباید کمتر از سه حرف باشد";
    }

    if (validationErrorMessage) {
      return toast.error(validationErrorMessage);
    }

    createKubernetes({
      createKuberCloudHostModel: {
        name: serviceName,
        datacenterId: dataCenter!.id!,
        productBundleId: serverConfig?.id || 0,
        isPredefined: isPredefined,
        cpu: customConfig.cpu,
        memory: customConfig.memory,
        disk: customConfig.disk,
        tenPods: customConfig.pods10,
        hostProjectId: null,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("سرویس namespace شما با موفقیت ایجاد شد");
        navigate("/kubernetes-cloud");
      })
      .catch((err) => {});
  };

  return (
    <AddKubernetesCloudContext.Provider
      value={{
        dataCenter,
        setDataCenter,
        serverConfig,
        setServerConfig,
        serviceName,
        setServiceName,
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
    </AddKubernetesCloudContext.Provider>
  );
};

export default AddKubernetesCloudContextProvider;
