import { FC, createContext, ReactNode, useState } from "react";

type EditWebHostContextType = {
  webHostId: number | null;
  setWebHostId: (id: number | null) => void;
};

export const EditWebHostContext = createContext<EditWebHostContextType>({
  webHostId: null,
  setWebHostId: (id) => { },
});

type EditWebHostContextProviderPropsType = {
  children?: ReactNode;
};

const EditWebHostContextProvider: FC<EditWebHostContextProviderPropsType> = ({
  children,
}) => {
  const [webHostId, setWebHostId] = useState<number | null>(null);

  return (
    <EditWebHostContext.Provider
      value={{
        webHostId,
        setWebHostId,
      }}
    >
      {children}
    </EditWebHostContext.Provider>
  );
};

export default EditWebHostContextProvider;
