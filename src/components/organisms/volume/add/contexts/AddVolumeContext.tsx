import { FC, createContext, ReactNode, useState } from "react";
import { ProductBundleBlockStorageListResponse } from "src/app/services/api.generated";

export type VolumeCustomConfigType = {
  disk: number;
};

type AddVolumeContextType = {
  volumeName: string;
  setVolumeName: (name: string) => void;
  isPredefined: boolean;
  setIsPredefined: (isPredefined: boolean) => void;
  predefinedConfig: ProductBundleBlockStorageListResponse | null;
  setPredefinedConfig: (config: ProductBundleBlockStorageListResponse | null) => void;
  customConfig: VolumeCustomConfigType;
  setCustomConfig: (config: VolumeCustomConfigType) => void;
};

export const AddVolumeContext = createContext<AddVolumeContextType>({
  volumeName: "",
  setVolumeName: () => {},
  isPredefined: true,
  setIsPredefined: () => {},
  predefinedConfig: null,
  setPredefinedConfig: () => {},
  customConfig: { disk: 50 },
  setCustomConfig: () => {},
});

type AddVolumeContextProviderPropsType = {
  children?: ReactNode;
};

const AddVolumeContextProvider: FC<AddVolumeContextProviderPropsType> = ({
  children,
}) => {
  const [volumeName, setVolumeName] = useState("");
  const [isPredefined, setIsPredefined] = useState(true);
  const [predefinedConfig, setPredefinedConfig] = useState<ProductBundleBlockStorageListResponse | null>(null);
  const [customConfig, setCustomConfig] = useState<VolumeCustomConfigType>({
    disk: 50,
  });

  return (
    <AddVolumeContext.Provider
      value={{
        volumeName,
        setVolumeName,
        isPredefined,
        setIsPredefined,
        predefinedConfig,
        setPredefinedConfig,
        customConfig,
        setCustomConfig,
      }}
    >
      {children}
    </AddVolumeContext.Provider>
  );
};

export default AddVolumeContextProvider; 