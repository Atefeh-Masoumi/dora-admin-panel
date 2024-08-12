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
  HypervisorTypeListResponse,
  ProductBundleVpcListResponse,
  usePostApiMyVpcHostCreateMutation,
} from "src/app/services/api.generated";
import { NetworkItemsType } from "../steps/SelectVpcNetwork";
import { HYPERVISOR_ENUM } from "src/types/hypervisorEnum";

export type addVpcStepsType = 1 | 2 | 3;

const defaultNetworkList: NetworkItemsType[] = [
  {
    id: 34,
    gatewayCidr: "192.168.1.1/24",
    name: "network1",
  },
  {
    id: 23,
    gatewayCidr: "192.168.2.1/24",
    name: "network2",
  },
];

type AddVpcContextType = {
  dataCenter: DatacenterListResponse | null;
  setDataCenter: Dispatch<SetStateAction<DatacenterListResponse | null>>;
  hypervisor: HypervisorTypeListResponse | null;
  setHypervisor: Dispatch<SetStateAction<HypervisorTypeListResponse | null>>;
  name: string | null;
  setName: Dispatch<SetStateAction<string | null>>;
  selectedNetworkList: NetworkItemsType[] | null;
  setSelectedNetworkList: any;
  submitHandler: () => void;
  submitLoading: boolean;
  serverConfig: ProductBundleVpcListResponse | null;
  setServerConfig: (osConfig: ProductBundleVpcListResponse | null) => void;
};

export const AddVpcContext = createContext<AddVpcContextType>({
  dataCenter: null,
  setDataCenter: () => {},
  hypervisor: null,
  setHypervisor: () => {},
  name: null,
  setName: () => {},
  selectedNetworkList: null,
  setSelectedNetworkList: () => {},
  submitHandler: () => {},
  submitLoading: false,
  serverConfig: null,
  setServerConfig: (productBundle) => {},
});

type AddVpcContextProviderPropsType = {
  children?: ReactNode;
};

const AddVpcContextProvider: FC<AddVpcContextProviderPropsType> = ({
  children,
}) => {
  const [dataCenter, setDataCenter] = useState<DatacenterListResponse | null>(
    null
  );
  const [hypervisor, setHypervisor] =
    useState<HypervisorTypeListResponse | null>(null);
  const [serverConfig, setServerConfig] =
    useState<ProductBundleVpcListResponse | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [selectedNetworkList, setSelectedNetworkList] =
    useState<NetworkItemsType[]>(defaultNetworkList);

  const navigate = useNavigate();
  const [createVpc, { isLoading: submitLoading }] =
    usePostApiMyVpcHostCreateMutation();

  const submitHandler = () => {
    let validationErrorMessage = "";
    if (!dataCenter || !dataCenter.id) {
      validationErrorMessage = "لطفا مرکز داده را انتخاب کنید";
    }

    if (validationErrorMessage) {
      return toast.error(validationErrorMessage);
    }

    createVpc({
      createVpcHostModel: {
        name: name as string,
        datacenterId: Number(dataCenter?.id),
        productBundleId: Number(serverConfig?.id),
        hypervisorTypeId: HYPERVISOR_ENUM.VM,
        defaultNetworks: selectedNetworkList,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("ابر اختصاصی شما با موفقیت ایجاد شد");
        navigate("/vpc");
      })
      .catch((err) => {});
  };

  return (
    <AddVpcContext.Provider
      value={{
        dataCenter,
        setDataCenter,
        hypervisor,
        setHypervisor,
        submitHandler,
        submitLoading,
        setServerConfig,
        serverConfig,
        name,
        setName,
        selectedNetworkList,
        setSelectedNetworkList,
      }}
    >
      {children}
    </AddVpcContext.Provider>
  );
};

export default AddVpcContextProvider;
