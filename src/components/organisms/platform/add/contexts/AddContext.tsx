import { FC, createContext, ReactNode, useState } from "react";
import {
  DatacenterListResponse,
  ProductBundleListResponse,
} from "src/app/services/api.generated";

export type addWorkspaceStepsType = 1 | 2 | 3;

type AddWorkspaceContextType = {
  step: addWorkspaceStepsType;
  setStep: (step: addWorkspaceStepsType) => void;
  dataCenter: DatacenterListResponse | null;
  setDataCenter: (dataCenter: DatacenterListResponse | null) => void;
  serverConfig: ProductBundleListResponse | null;
  setServerConfig: (osConfig: ProductBundleListResponse | null) => void;
  name: string;
  setName: (name: string) => void;
};

export const AddWorkspaceContext = createContext<AddWorkspaceContextType>({
  step: 1,
  setStep: (step) => {},
  dataCenter: null,
  setDataCenter: (dataCenter) => {},
  serverConfig: null,
  setServerConfig: (productBundle) => {},
  name: "",
  setName: (name) => {},
});

type AddWorkspaceContextProviderPropsType = {
  children?: ReactNode;
};

const AddWorkspaceContextProvider: FC<AddWorkspaceContextProviderPropsType> = ({
  children,
}) => {
  const [step, setStep] = useState<addWorkspaceStepsType>(1);
  const [dataCenter, setDataCenter] = useState<DatacenterListResponse | null>(
    null
  );
  const [serverConfig, setServerConfig] =
    useState<ProductBundleListResponse | null>(null);
  const [name, setName] = useState("");

  return (
    <AddWorkspaceContext.Provider
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
    </AddWorkspaceContext.Provider>
  );
};

export default AddWorkspaceContextProvider;
