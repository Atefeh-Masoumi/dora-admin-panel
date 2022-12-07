import { FC, createContext, ReactNode, useState } from "react";
import {
  DatacenterListResponse,
  ImageListResponse,
  ProductBundleListResponse,
} from "src/app/services/api.generated";

export type addServerStepsType = 1 | 2 | 3 | 4;

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
  const [serverConfig, setServerConfig] = useState<ProductBundleListResponse | null>(null);
  const [serverName, setServerName] = useState("");
  const [serverPassword, setServerPassword] = useState("");

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
      }}
    >
      {children}
    </AddServerContext.Provider>
  );
};

export default AddServerContextProvider;
