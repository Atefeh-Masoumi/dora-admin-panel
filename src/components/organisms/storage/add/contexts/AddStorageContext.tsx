import { FC, createContext, ReactNode, useState } from "react";
import {
  DatacenterListResponse,
  ProductBundleListResponse,
} from "src/app/services/api.generated";

export type addStorageStepsType = 1 | 2 | 3;

type AddStorageContextType = {
  step: addStorageStepsType;
  setStep: (step: addStorageStepsType) => void;
  dataCenter: DatacenterListResponse | null;
  setDataCenter: (dataCenter: DatacenterListResponse | null) => void;
  serverConfig: ProductBundleListResponse | null;
  setServerConfig: (osConfig: ProductBundleListResponse | null) => void;
  name: string;
  setName: (name: string) => void;
  isPublic: boolean;
  setIsPublic: (isPublic: boolean) => void;
};

export const AddStorageContext = createContext<AddStorageContextType>({
  step: 1,
  setStep: (step) => {},
  dataCenter: null,
  setDataCenter: (dataCenter) => {},
  serverConfig: null,
  setServerConfig: (productBundle) => {},
  name: "",
  setName: (name) => {},
  isPublic: true,
  setIsPublic: (isPublic) => {},
});

type AddStorageContextProviderPropsType = {
  children?: ReactNode;
};

const AddStorageContextProvider: FC<AddStorageContextProviderPropsType> = ({
  children,
}) => {
  const [step, setStep] = useState<addStorageStepsType>(1);
  const [dataCenter, setDataCenter] = useState<DatacenterListResponse | null>(
    null
  );
  const [serverConfig, setServerConfig] =
    useState<ProductBundleListResponse | null>(null);
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  return (
    <AddStorageContext.Provider
      value={{
        step,
        setStep,
        dataCenter,
        setDataCenter,
        serverConfig,
        setServerConfig,
        name,
        setName,
        isPublic,
        setIsPublic,
      }}
    >
      {children}
    </AddStorageContext.Provider>
  );
};

export default AddStorageContextProvider;
