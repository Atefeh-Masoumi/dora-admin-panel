import { FC, createContext, ReactNode, useState } from "react";

type EditServerContextType = {
  serverId: number | null;
  setServerId: (id: number | null) => void;
  dataCenter: number | null;
  setDataCenter: (id: number | null) => void;
};

export const EditServerContext = createContext<EditServerContextType>({
  serverId: null,
  setServerId: (id) => {},
  dataCenter: null,
  setDataCenter: (id) => {},
});

type EditServerContextProviderPropsType = {
  children?: ReactNode;
};

const EditServerContextProvider: FC<EditServerContextProviderPropsType> = ({
  children,
}) => {
  const [serverId, setServerId] = useState<number | null>(null);
  const [dataCenter, setDataCenter] = useState<number | null>(null);

  return (
    <EditServerContext.Provider
      value={{
        serverId,
        setServerId,
        dataCenter,
        setDataCenter,
      }}
    >
      {children}
    </EditServerContext.Provider>
  );
};

export default EditServerContextProvider;
