import { FC, createContext, ReactNode, useState } from "react";
import {
  DatacenterListResponse,
  ProductBundleListResponse,
} from "src/app/services/api.generated";

export type addWebHostStepsType = 1 | 2 | 3 | 4;

type AddWebHostContextType = {
  step: addWebHostStepsType;
  setStep: (step: addWebHostStepsType) => void;
  domainName: string;
  setDomainName: (domainName: string) => void;
  dataCenter: DatacenterListResponse | null;
  setDataCenter: (dataCenter: DatacenterListResponse | null) => void;
  serverConfig: ProductBundleListResponse | null;
  setServerConfig: (osConfig: ProductBundleListResponse | null) => void;
  term: boolean;
  setTerm: (term: boolean) => void;
};

export const AddWebHostContext = createContext<AddWebHostContextType>({
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

type AddWebHostContextProviderPropsType = {
  children?: ReactNode;
};

const AddWebHostContextProvider: FC<AddWebHostContextProviderPropsType> = ({
  children,
}) => {
  const [step, setStep] = useState<addWebHostStepsType>(1);
  const [domainName, setDomainName] = useState("");
  const [dataCenter, setDataCenter] = useState<DatacenterListResponse | null>(
    null
  );
  const [serverConfig, setServerConfig] =
    useState<ProductBundleListResponse | null>(null);
  const [term, setTerm] = useState(false);

  return (
    <AddWebHostContext.Provider
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
    </AddWebHostContext.Provider>
  );
};

export default AddWebHostContextProvider;
