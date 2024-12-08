import { FC, createContext, ReactNode, useState } from "react";

type EditServerContextType = {
  serverId: number | null;
  setServerId: (id: number | null) => void;
  datacenterId: number | null;
  setDatacenterId: (id: number | null) => void;
  hypervisorId: number | null;
  setHypervisorId: (id: number | null) => void;
};

export const EditServerContext = createContext<EditServerContextType>({
  serverId: null,
  setServerId: (id) => {},
  datacenterId: null,
  setDatacenterId: (id) => {},
  hypervisorId: null,
  setHypervisorId: (id) => {},
});

type EditServerContextProviderPropsType = {
  children?: ReactNode;
};

const EditServerContextProvider: FC<EditServerContextProviderPropsType> = ({
  children,
}) => {
  const [serverId, setServerId] = useState<number | null>(null);
  const [datacenterId, setDatacenterId] = useState<number | null>(null);
  const [hypervisorId, setHypervisorId] = useState<number | null>(null);

  return (
    <EditServerContext.Provider
      value={{
        serverId,
        setServerId,
        datacenterId,
        setDatacenterId,
        hypervisorId,
        setHypervisorId,
      }}
    >
      {children}
    </EditServerContext.Provider>
  );
};

export default EditServerContextProvider;
