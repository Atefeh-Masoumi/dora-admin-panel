import { FC, createContext, ReactNode, useState } from "react";
import { ProductBundleListResponse } from "src/app/services/api.generated";

type editNamespaceContextType = {
  serverId: number | null;
  setServerId: (id: number | null) => void;
  serverConfig: ProductBundleListResponse | null;
  setServerConfig: (osConfig: ProductBundleListResponse | null) => void;
};

export const EditNamespaceContext = createContext<editNamespaceContextType>({
  serverId: null,
  setServerId: (id) => { },
  serverConfig: null,
  setServerConfig: (productBundle) => { },
});

type EditNamespaceContextProviderPropsType = {
  children?: ReactNode;
};

const EditNamespaceContextProvider: FC<EditNamespaceContextProviderPropsType> = ({
  children,
}) => {
  const [serverId, setServerId] = useState<number | null>(null);
  const [serverConfig, setServerConfig] = useState<ProductBundleListResponse | null>(null);

  return (
    <EditNamespaceContext.Provider
      value={{
        serverId,
        setServerId,
        serverConfig,
        setServerConfig,
      }}
    >
      {children}
    </EditNamespaceContext.Provider>
  );
};

export default EditNamespaceContextProvider;
