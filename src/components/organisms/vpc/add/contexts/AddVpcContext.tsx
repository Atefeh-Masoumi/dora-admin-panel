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
  HypervisorTypeListResponse,
  ProductBundleListResponse,
  usePostApiMyVpcHostCreateMutation,
} from "src/app/services/api.generated";

export type addVpcStepsType = 1 | 2 | 3;

type AddVpcContextType = {
  dataCenter: DatacenterListResponse | null;
  setDataCenter: Dispatch<SetStateAction<DatacenterListResponse | null>>;
  hypervisor: HypervisorTypeListResponse | null;
  setHypervisor: Dispatch<SetStateAction<HypervisorTypeListResponse | null>>;
  submitHandler: () => void;
  submitLoading: boolean;
  serverConfig: ProductBundleListResponse | null;
  setServerConfig: (osConfig: ProductBundleListResponse | null) => void;
};

export const AddVpcContext = createContext<AddVpcContextType>({
  dataCenter: null,
  setDataCenter: () => {},
  hypervisor: null,
  setHypervisor: () => {},
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
    useState<ProductBundleListResponse | null>(null);

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
        name: "Hello",
        datacenterId: dataCenter!.id!,
        productBundleId: 100,
        hypervisorTypeId: 100,
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
      }}
    >
      {children}
    </AddVpcContext.Provider>
  );
};

export default AddVpcContextProvider;
