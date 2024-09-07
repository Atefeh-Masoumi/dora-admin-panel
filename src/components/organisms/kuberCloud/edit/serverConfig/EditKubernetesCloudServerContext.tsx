import { FC, createContext, ReactNode, useState } from "react";

type EditKubernetesCloudServerContextType = {
  serverId: number | null;
  setServerId: (id: number | null) => void;
  dataCenter: number | null;
  setDataCenter: (id: number | null) => void;
};

export const EditKubernetesCloudServerContext =
  createContext<EditKubernetesCloudServerContextType>({
    serverId: null,
    setServerId: (id) => {},
    dataCenter: null,
    setDataCenter: (id) => {},
  });

type EditKubernetesCloudServerContextProviderPropsType = {
  children?: ReactNode;
};

const EditKubernetesCloudServerContextProvider: FC<
  EditKubernetesCloudServerContextProviderPropsType
> = ({ children }) => {
  const [serverId, setServerId] = useState<number | null>(null);
  const [dataCenter, setDataCenter] = useState<number | null>(null);

  return (
    <EditKubernetesCloudServerContext.Provider
      value={{
        serverId,
        setServerId,
        dataCenter,
        setDataCenter,
      }}
    >
      {children}
    </EditKubernetesCloudServerContext.Provider>
  );
};

export default EditKubernetesCloudServerContextProvider;
