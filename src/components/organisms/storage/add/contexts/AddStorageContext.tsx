import { FC, createContext, ReactNode, useState } from "react";
import {
  DatacenterListResponse,
  ProductBundleListResponse,
} from "src/app/services/api.generated";

export type addStorageStepsType = 1 | 2 | 3;

export type StorageCustomConfigType = {
  disk: number | null;
};

type AddStorageContextType = {
  step: addStorageStepsType;
  setStep: (step: addStorageStepsType) => void;
  dataCenter: DatacenterListResponse | null;
  setDataCenter: (dataCenter: DatacenterListResponse | null) => void;
  serverConfig: ProductBundleListResponse | null;
  setServerConfig: (osConfig: ProductBundleListResponse | null) => void;
  name: string;
  setName: (name: string) => void;
  isPredefined: boolean;
  setIsPredefined: (isPredefined: boolean) => void;
  //------------------for custom config-----------------//
  customConfig: StorageCustomConfigType;
  setCustomConfig: (customConfig: StorageCustomConfigType) => void;
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
  isPredefined: false,
  setIsPredefined: (isPredefined) => {},
  customConfig: {
    disk: null,
  },
  setCustomConfig: (customConfig) => {},
});

type AddStorageContextProviderPropsType = {
  children?: ReactNode;
};

const AddStorageContextProvider: FC<AddStorageContextProviderPropsType> = ({
  children,
}) => {
  const [step, setStep] = useState<addStorageStepsType>(1);
  const [isPredefined, setIsPredefined] = useState<boolean>(true);
  const [dataCenter, setDataCenter] = useState<DatacenterListResponse | null>(
    null
  );
  const [serverConfig, setServerConfig] =
    useState<ProductBundleListResponse | null>(null);
  const [name, setName] = useState("");
  const [customConfig, setCustomConfig] = useState<StorageCustomConfigType>({
    disk: 500,
  });

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
        isPredefined,
        setIsPredefined,
        customConfig,
        setCustomConfig,
      }}
    >
      {children}
    </AddStorageContext.Provider>
  );
};

export default AddStorageContextProvider;
