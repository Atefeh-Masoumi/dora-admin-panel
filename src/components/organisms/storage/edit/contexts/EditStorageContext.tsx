import { FC, createContext, ReactNode, useState } from "react";
import { ProductBundleStorageListResponse } from "src/app/services/api.generated";

type editStorageContextType = {
  serverId: number | null;
  setServerId: (id: number | null) => void;
  serverConfig: ProductBundleStorageListResponse | null;
  setServerConfig: (osConfig: ProductBundleStorageListResponse | null) => void;
};

export const EditStorageContext = createContext<editStorageContextType>({
  serverId: null,
  setServerId: (id) => {},
  serverConfig: null,
  setServerConfig: (productBundle) => {},
});

type EditStorageContextProviderPropsType = {
  children?: ReactNode;
};

const EditStorageContextProvider: FC<EditStorageContextProviderPropsType> = ({
  children,
}) => {
  const [serverId, setServerId] = useState<number | null>(null);
  const [serverConfig, setServerConfig] =
    useState<ProductBundleStorageListResponse | null>(null);

  return (
    <EditStorageContext.Provider
      value={{
        serverId,
        setServerId,
        serverConfig,
        setServerConfig,
      }}
    >
      {children}
    </EditStorageContext.Provider>
  );
};

export default EditStorageContextProvider;
