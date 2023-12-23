import { FC, createContext, ReactNode, useState } from "react";
import { ProductBundleListResponse } from "src/app/services/api.generated";

type editRabbitContextType = {
  serverId: number | null;
  setServerId: (id: number | null) => void;
  serverConfig: ProductBundleListResponse | null;
  setServerConfig: (osConfig: ProductBundleListResponse | null) => void;
};

export const EditRabbitContext = createContext<editRabbitContextType>({
  serverId: null,
  setServerId: (id) => {},
  serverConfig: null,
  setServerConfig: (productBundle) => {},
});

type EditRabbitContextProviderPropsType = {
  children?: ReactNode;
};

const EditRabbitContextProvider: FC<EditRabbitContextProviderPropsType> = ({
  children,
}) => {
  const [serverId, setServerId] = useState<number | null>(null);
  const [serverConfig, setServerConfig] =
    useState<ProductBundleListResponse | null>(null);

  return (
    <EditRabbitContext.Provider
      value={{
        serverId,
        setServerId,
        serverConfig,
        setServerConfig,
      }}
    >
      {children}
    </EditRabbitContext.Provider>
  );
};

export default EditRabbitContextProvider;
