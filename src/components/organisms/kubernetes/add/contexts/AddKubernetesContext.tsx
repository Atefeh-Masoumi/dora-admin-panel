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
  useGetApiMyCloudCustomerGetCustomerTypeQuery,
  usePostApiMyKubernetesHostCreateMutation,
} from "src/app/services/api.generated";
import { CUSTOMER_PRODUCT_TYPE_ENUM } from "src/constant/customerProductTypeEnum";
import { CUSTOMER_TYPE_ENUM } from "src/constant/customerTypeEnum";
// import { CUSTOMER_PRODUCT_TYPE_ENUM } from "src/types/customerProductTypeEnum";

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

  const { data: customerType } = useGetApiMyCloudCustomerGetCustomerTypeQuery();

  const submitHandler = () => {
    if (
      !dataCenter ||
      !kubernetesVersion ||
      !osVersion ||
      !workersCount ||
      !serverConfig ||
      !serverName ||
      !serverPassword
    )
      return;

    createKubernetes({
      createKubernetesModel: {
        clusterName: serverName,
        datacenterId: dataCenter.id!,
        imageId: osVersion.id!,
        kubernetesVersionId: kubernetesVersion.id!,
        vmPassword: serverPassword,
        customerProductTypeId:
          customerType === CUSTOMER_TYPE_ENUM.POST_PAID
            ? CUSTOMER_PRODUCT_TYPE_ENUM.PAY_AS_YOU_GO
            : paymentType || 0,
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
