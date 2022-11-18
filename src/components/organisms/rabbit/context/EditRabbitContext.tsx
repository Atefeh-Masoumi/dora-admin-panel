import { FC, createContext, ReactNode, useState } from "react";

type EditRabbitContextType = {
  serverId: number | null;
  setServerId: (id: number | null) => void;
  dataCenter: number | null;
  setDataCenter: (id: number | null) => void;
};

export const EditRabbitContext = createContext<EditRabbitContextType>({
  serverId: null,
  setServerId: (id) => {},
  dataCenter: null,
  setDataCenter: (id) => {},
});

type EditRabbitContextProviderPropsType = {
  children?: ReactNode;
};

const EditRabbitContextProvider: FC<EditRabbitContextProviderPropsType> = ({
  children,
}) => {
  const [serverId, setServerId] = useState<number | null>(null);
  const [dataCenter, setDataCenter] = useState<number | null>(null);

  return (
    <EditRabbitContext.Provider
      value={{
        serverId,
        setServerId,
        dataCenter,
        setDataCenter,
      }}
    >
      {children}
    </EditRabbitContext.Provider>
  );
};

export default EditRabbitContextProvider;
