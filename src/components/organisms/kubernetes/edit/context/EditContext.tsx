import { FC, createContext, ReactNode, useState } from "react";
import { ProductBundleListResponse } from "src/app/services/api.generated";

type editWorkspaceContextType = {
  serverId: number | null;
  setServerId: (id: number | null) => void;
  serverConfig: ProductBundleListResponse | null;
  setServerConfig: (osConfig: ProductBundleListResponse | null) => void;
};

export const EditWorkspaceContext = createContext<editWorkspaceContextType>({
  serverId: null,
  setServerId: (id) => {},
  serverConfig: null,
  setServerConfig: (productBundle) => {},
});

type EditWorkspaceContextProviderPropsType = {
  children?: ReactNode;
};

const EditWorkspaceContextProvider: FC<
  EditWorkspaceContextProviderPropsType
> = ({ children }) => {
  const [serverId, setServerId] = useState<number | null>(null);
  const [serverConfig, setServerConfig] =
    useState<ProductBundleListResponse | null>(null);

  return (
    <EditWorkspaceContext.Provider
      value={{
        serverId,
        setServerId,
        serverConfig,
        setServerConfig,
      }}
    >
      {children}
    </EditWorkspaceContext.Provider>
  );
};

export default EditWorkspaceContextProvider;
