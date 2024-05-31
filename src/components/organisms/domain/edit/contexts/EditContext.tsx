import { FC, createContext, ReactNode, useState } from "react";

type EditDomainContextType = {
  domainId: number | null;
  setDomainId: (id: number | null) => void;
};

export const EditDomainContext = createContext<EditDomainContextType>({
  domainId: null,
  setDomainId: (id) => {},
});

type EditDomainContextProviderPropsType = {
  children?: ReactNode;
};

const EditDomainContextProvider: FC<EditDomainContextProviderPropsType> = ({
  children,
}) => {
  const [domainId, setDomainId] = useState<number | null>(null);

  return (
    <EditDomainContext.Provider
      value={{
        domainId,
        setDomainId,
      }}
    >
      {children}
    </EditDomainContext.Provider>
  );
};

export default EditDomainContextProvider;
