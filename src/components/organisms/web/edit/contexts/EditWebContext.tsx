import { FC, createContext, ReactNode, useState } from "react";
import { ProductBundleListResponse } from "src/app/services/api.generated";

type editWebContextType = {
  serverId: number | null;
  setServerId: (id: number | null) => void;
  serverConfig: ProductBundleListResponse | null;
  setServerConfig: (osConfig: ProductBundleListResponse | null) => void;
};

export const EditWebContext = createContext<editWebContextType>({
  serverId: null,
  setServerId: (id) => {},
  serverConfig: null,
  setServerConfig: (productBundle) => {},
});

type EditWebContextProviderPropsType = {
  children?: ReactNode;
};

const EditWebContextProvider: FC<EditWebContextProviderPropsType> = ({
  children,
}) => {
  const [serverId, setServerId] = useState<number | null>(null);
  const [serverConfig, setServerConfig] =
    useState<ProductBundleListResponse | null>(null);

  return (
    <EditWebContext.Provider
      value={{
        serverId,
        setServerId,
        serverConfig,
        setServerConfig,
      }}
    >
      {children}
    </EditWebContext.Provider>
  );
};

export default EditWebContextProvider;
