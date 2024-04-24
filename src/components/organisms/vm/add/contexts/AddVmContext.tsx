import { FC, createContext, ReactNode, useState } from "react";
import {
  DatacenterListResponse,
  ImageListResponse,
  ProductBundleListResponse,
} from "src/app/services/api.generated";

export type addServerStepsType = 1 | 2 | 3 | 4;

export type vmCustomConfigType = {
  cpu: number | null;
  memory: number | null;
  disk: number | null;
  IPV4: number | null;
};

type AddServerContextType = {
  step: addServerStepsType;
  setStep: (step: addServerStepsType) => void;
  dataCenter: DatacenterListResponse | null;
  setDataCenter: (dataCenter: DatacenterListResponse | null) => void;
  osVersion: ImageListResponse | null;
  setOsVersion: (osVersion: ImageListResponse | null) => void;
  serverConfig: ProductBundleListResponse | null;
  setServerConfig: (osConfig: ProductBundleListResponse | null) => void;
  serverName: string;
  setServerName: (name: string) => void;
  serverPassword: string;
  setServerPassword: (password: string) => void;
  isPredefined: boolean;
  setIsPredefined: (isPredefined: boolean) => void;
  //-------------for custom config---------------//
  customConfig: vmCustomConfigType;
  setCustomConfig: (customConfig: vmCustomConfigType) => void;
};

export const AddServerContext = createContext<AddServerContextType>({
  step: 1,
  setStep: (step) => {},
  dataCenter: null,
  setDataCenter: (dataCenter) => {},
  osVersion: null,
  setOsVersion: (osVersion) => {},
  serverConfig: null,
  setServerConfig: (osConfig) => {},
  serverName: "",
  setServerName: (name) => {},
  serverPassword: "",
  setServerPassword: (password) => {},
  isPredefined: false,
  setIsPredefined: (isPredefined) => {},
  customConfig: {
    cpu: null,
    memory: null,
    disk: null,
    IPV4: 1,
  },
  setCustomConfig: (customConfig) => {},
});

type AddServerContextProviderPropsType = {
  children?: ReactNode;
};

const AddServerContextProvider: FC<AddServerContextProviderPropsType> = ({
  children,
}) => {
  const [step, setStep] = useState<addServerStepsType>(1);
  const [dataCenter, setDataCenter] = useState<DatacenterListResponse | null>(
    null
  );
  const [osVersion, setOsVersion] = useState<ImageListResponse | null>(null);
  const [serverConfig, setServerConfig] =
    useState<ProductBundleListResponse | null>(null);
  const [serverName, setServerName] = useState("");
  const [serverPassword, setServerPassword] = useState("");
  const [isPredefined, setIsPredefined] = useState(true);
  const [customConfig, setCustomConfig] = useState<vmCustomConfigType>({
    cpu: 4,
    memory: 25,
    disk: 300,
    IPV4: 1,
  });

  return (
    <AddServerContext.Provider
      value={{
        step,
        setStep,
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
        isPredefined,
        setIsPredefined,
        customConfig,
        setCustomConfig,
      }}
    >
      {children}
    </AddServerContext.Provider>
  );
};

export default AddServerContextProvider;
