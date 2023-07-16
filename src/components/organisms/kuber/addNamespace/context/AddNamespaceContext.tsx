import { FC, createContext, ReactNode, useState } from "react";
import {
  DatacenterListResponse,
  ProductBundleListResponse,
} from "src/app/services/api.generated";

export type addNamespaceStepsType = 1 | 2 | 3;

type AddNamespaceContextType = {
  step: addNamespaceStepsType;
  setStep: (step: addNamespaceStepsType) => void;
  dataCenter: DatacenterListResponse | null;
  setDataCenter: (dataCenter: DatacenterListResponse | null) => void;
  serverConfig: ProductBundleListResponse | null;
  setServerConfig: (osConfig: ProductBundleListResponse | null) => void;
  name: string;
  setName: (name: string) => void;
};

export const AddNamespaceContext = createContext<AddNamespaceContextType>({
  step: 1,
  setStep: (step) => {},
  dataCenter: null,
  setDataCenter: (dataCenter) => {},
  serverConfig: null,
  setServerConfig: (productBundle) => {},
  name: "",
  setName: (name) => {},
});

type AddNamespaceContextProviderPropsType = {
  children?: ReactNode;
};

const AddNamespaceContextProvider: FC<AddNamespaceContextProviderPropsType> = ({
  children,
}) => {
  const [step, setStep] = useState<addNamespaceStepsType>(1);
  const [dataCenter, setDataCenter] = useState<DatacenterListResponse | null>(
    null
  );
  const [serverConfig, setServerConfig] =
    useState<ProductBundleListResponse | null>(null);
  const [name, setName] = useState("");

  return (
    <AddNamespaceContext.Provider
      value={{
        step,
        setStep,
        dataCenter,
        setDataCenter,
        serverConfig,
        setServerConfig,
        name,
        setName,
      }}
    >
      {children}
    </AddNamespaceContext.Provider>
  );
};

export default AddNamespaceContextProvider;
