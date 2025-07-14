import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
  useEffect,
} from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  VmImageListResponse,
  DatacenterListResponse,
  KubernetesPriceResponse,
  useGetApiMyPortalProductBundleKuberClusterListQuery,
  usePostApiMyKubernetesClusterByProjectIdHostCreateMutation,
  useGetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountQuery,
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
  selectedOs: VmImageListResponse | null;
  setSelectedOs: Dispatch<SetStateAction<VmImageListResponse | null>>;
  predefinedConfig: any | null;
  setPredefinedConfig: Dispatch<SetStateAction<any | null>>;
  serverName: string;
  setServerName: Dispatch<SetStateAction<string>>;
  serverPassword: string;
  setServerPassword: Dispatch<SetStateAction<string>>;
  nodeQuantity: number;
  setNodeQuantity: Dispatch<SetStateAction<number>>;
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
  rows: any | undefined;
  kubernetesPriceIsLoading: boolean;
};

export const AddKubernetesContext = createContext<AddKubernetesContextType>({
  //------main-------//
  selectedOs: null,
  setSelectedOs: () => {},
  nodeQuantity: 2,
  setNodeQuantity: () => {},
  kubernetesVersion: null,
  setKubernetesVersion: () => {},

  //-------------//
  predefinedConfig: null,
  setPredefinedConfig: () => {},
  serverName: "",
  setServerName: () => {},
  serverPassword: "",
  setServerPassword: () => {},
  submitHandler: () => {},
  submitLoading: false,
  isPredefined: true,
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
  rows: undefined,
  kubernetesPriceIsLoading: false,
});

type AddKubernetesContextProviderPropsType = {
  children?: ReactNode;
};

export const AddKubernetesContextProvider: FC<
  AddKubernetesContextProviderPropsType
> = ({ children }) => {
  const [selectedOs, setSelectedOs] =
    useState<VmImageListResponse | null>(null);
  const [predefinedConfig, setPredefinedConfig] =
    useState<any | null>(null);
  const [kubernetesVersion, setKubernetesVersion] =
    useState<DatacenterListResponse | null>(null);
  const [nodeQuantity, setNodeQuantity] = useState(2);
  const [serverName, setServerName] = useState("");
  const [serverPassword, setServerPassword] = useState("");
  const [isPredefined, setIsPredefined] = useState(true);
  const [productItemPrices, setProductItemPrices] =
    useState<KubernetesPriceResponse | null>(null);

  const [customConfig, setCustomConfig] = useState<kubernetesCustomConfigType>({
    cpu: 1,
    memory: 1,
    disk: 25,
    ipV4: 1,
  });

  const navigate = useNavigate();
  const { projectId } = useParams();

  const { data: rows } = useGetApiMyPortalProductBundleKuberClusterListQuery();
  const { data: kubernetesPriceData, isLoading: kubernetesPriceIsLoading } = 
    useGetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountQuery(
      { workerNodeCount: nodeQuantity },
      { skip: isPredefined && !predefinedConfig?.id }
    );
  const [createKubernetes, { isLoading: submitLoading }] =
    usePostApiMyKubernetesClusterByProjectIdHostCreateMutation();

  useEffect(() => {
    if (kubernetesPriceData) {
      setProductItemPrices(kubernetesPriceData);
    }
  }, [kubernetesPriceData]);

  const submitHandler = () => {
    let errMessage = "";

    if (!selectedOs) {
      errMessage = "لطفا ورژن سیستم عامل را انتخاب کنید";
    } else if (!kubernetesVersion) {
      errMessage = "لطفا ورژن کوبرنتیز خود را مشخص کنید";
    } else if (isPredefined && (!predefinedConfig || !predefinedConfig.id)) {
      errMessage = "لطفا مشخصات سرور را انتخاب کنید";
    } else if (!serverName) {
      errMessage = "لطفا نام سرویس را انتخاب کنید";
    } else if (serverName.length < 5) {
      errMessage = "نام سرور نباید کمتر از پنج حرف باشد";
    } else if (!passwordValidationRegex.test(serverPassword)) {
      errMessage =
        "رمز عبور باید حداقل ۸ حرف باشد و ترکیبی از حروف بزرگ و کوچک و عدد و یک کارکتر خاص باشد";
    }

    if (errMessage) {
      return toast.error(errMessage);
    }

    createKubernetes({
      projectId: Number(projectId),
      createKuberClusterModel: {
        clusterName: serverName,
        vmImageId: selectedOs?.id!,
        kubernetesVersionId: kubernetesVersion?.id!,
        password: serverPassword,
        isPredefined,
        productBundleId: predefinedConfig?.id,
        nodeCount: nodeQuantity,
        cpu: isPredefined ? null : customConfig.cpu,
        memory: isPredefined ? null : customConfig.memory,
        disk: isPredefined ? null : customConfig.disk,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("کلاستر کوبرنتیز شما با موفقیت ایجاد شد");
        navigate(`/kubernetes-cluster/${projectId}`);
      })
      .catch((err: any) => {});
  };

  return (
    <AddKubernetesContext.Provider
      value={{
        kubernetesVersion,
        setKubernetesVersion,
        selectedOs,
        setSelectedOs,
        predefinedConfig,
        setPredefinedConfig,
        serverName,
        setServerName,
        serverPassword,
        setServerPassword,
        nodeQuantity,
        setNodeQuantity,
        submitHandler,
        submitLoading,
        isPredefined,
        setIsPredefined,
        customConfig,
        setCustomConfig,
        productItemPrices,
        setProductItemPrices,
        rows,
        kubernetesPriceIsLoading,
      }}
    >
      {children}
    </AddKubernetesContext.Provider>
  );
};
