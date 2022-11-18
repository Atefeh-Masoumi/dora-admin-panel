import { FC, createContext, ReactNode, useState } from "react";
import {
  DatacenterListResponse,
  ProductBundleListResponse,
} from "src/app/services/api.generated";

export type addRabbitStepsType = 1 | 2 | 3;

type AddRabbitContextType = {
  step: addRabbitStepsType;
  setStep: (step: addRabbitStepsType) => void;
  dataCenter: DatacenterListResponse | null;
  setDataCenter: (dataCenter: DatacenterListResponse | null) => void;
  serverConfig: ProductBundleListResponse | null;
  setServerConfig: (osConfig: ProductBundleListResponse | null) => void;
  name: string;
  setName: (name: string) => void;
  serverUsername: string;
  setServerUsername: (username: string) => void;
  serverPassword: string;
  setServerPassword: (password: string) => void;
};

export const AddRabbitContext = createContext<AddRabbitContextType>({
  step: 1,
  setStep: (step) => { },
  dataCenter: null,
  setDataCenter: (dataCenter) => { },
  serverConfig: null,
  setServerConfig: (osConfig) => { },
  name: "",
  setName: (name) => { },
  serverUsername: "",
  setServerUsername: (username) => { },
  serverPassword: "",
  setServerPassword: (password) => { },
});

type AddRabbitContextProviderPropsType = {
  children?: ReactNode;
};

const AddRabbitContextProvider: FC<AddRabbitContextProviderPropsType> = ({
  children,
}) => {
  const [step, setStep] = useState<addRabbitStepsType>(1);
  const [dataCenter, setDataCenter] = useState<DatacenterListResponse | null>(null);
  const [serverConfig, setServerConfig] = useState<ProductBundleListResponse | null>(null);
  const [name, setName] = useState("");
  const [serverUsername, setServerUsername] = useState("");
  const [serverPassword, setServerPassword] = useState("");

  return (
    <AddRabbitContext.Provider
      value={{
        step,
        setStep,
        dataCenter,
        setDataCenter,
        serverConfig,
        setServerConfig,
        name,
        setName,
        serverUsername,
        setServerUsername,
        serverPassword,
        setServerPassword,
      }}
    >
      {children}
    </AddRabbitContext.Provider>
  );
};

export default AddRabbitContextProvider;
