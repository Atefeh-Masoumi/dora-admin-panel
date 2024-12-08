import { FC, createContext, ReactNode, useState } from "react";
import {
  DatacenterListResponse,
  ProductBundleWebListResponse,
} from "src/app/services/api.generated";

export type addWebStepsType = 1 | 2 | 3 | 4;

type AddWebContextType = {
  step: addWebStepsType;
  setStep: (step: addWebStepsType) => void;
  domainName: string;
  setDomainName: (domainName: string) => void;
  dataCenter: DatacenterListResponse | null;
  setDataCenter: (dataCenter: DatacenterListResponse | null) => void;
  serverConfig: ProductBundleWebListResponse | null;
  setServerConfig: (osConfig: ProductBundleWebListResponse | null) => void;
  term: boolean;
  setTerm: (term: boolean) => void;
};

export const AddWebContext = createContext<AddWebContextType>({
  step: 1,
  setStep: (step) => {},
  domainName: "",
  setDomainName: (domainName) => {},
  dataCenter: null,
  setDataCenter: (dataCenter) => {},
  serverConfig: null,
  setServerConfig: (serverConfig) => {},
  term: false,
  setTerm: (term) => {},
});

type AddWebContextProviderPropsType = {
  children?: ReactNode;
};

const AddWebContextProvider: FC<AddWebContextProviderPropsType> = ({
  children,
}) => {
  const [step, setStep] = useState<addWebStepsType>(1);
  const [domainName, setDomainName] = useState("");
  const [dataCenter, setDataCenter] = useState<DatacenterListResponse | null>(
    null
  );
  const [serverConfig, setServerConfig] =
    useState<ProductBundleWebListResponse | null>(null);
  const [term, setTerm] = useState(false);

  return (
    <AddWebContext.Provider
      value={{
        step,
        setStep,
        domainName,
        setDomainName,
        dataCenter,
        setDataCenter,
        serverConfig,
        setServerConfig,
        term,
        setTerm,
      }}
    >
      {children}
    </AddWebContext.Provider>
  );
};

export default AddWebContextProvider;
