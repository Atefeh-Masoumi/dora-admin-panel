import { FC, createContext, ReactNode, useState } from "react";
import {
  ProductBundleVmListResponse,
  VmNetworkShortListResponse,
} from "src/app/services/api.generated";


export type vmCustomConfigType = {
  cpu?: number | undefined;
  memory?: number | undefined;
};

type AddBckupVMContextType = {
  serverConfig: ProductBundleVmListResponse | null;
  setServerConfig: (osConfig: ProductBundleVmListResponse | null) => void;
  serverName: string;
  setServerName: (name: string) => void;
  isPredefined: boolean;
  setIsPredefined: (isPredefined: boolean) => void;
  //-------------for custom config---------------//
  customConfig: vmCustomConfigType;
  setCustomConfig: (customConfig: vmCustomConfigType) => void;
  // Network settings
  usePublicIpV4: boolean;
  setUsePublicIpV4: (value: boolean) => void;
  usePublicIpV6: boolean;
  setUsePublicIpV6: (value: boolean) => void;
  usePrivateNetwork: boolean;
  setUsePrivateNetwork: (value: boolean) => void;
  selectedNetwork: VmNetworkShortListResponse | null;
  setSelectedNetwork: (network: VmNetworkShortListResponse | null) => void;
  ipAddress: string | null;
  setIpAddress: (ip: string | null) => void;
  usedFirewall: boolean;
  setUsedFirewall: (value: boolean) => void;
  vmFirewallId: number | null;
  setVmFirewallId: (value: number | null) => void;
  useExistingFirewall: boolean;
  setUseExistingFirewall: (value: boolean) => void;
  allowRemoteAccess: boolean;
  setAllowRemoteAccess: (value: boolean) => void;
  allowHttpAccess: boolean;
  setAllowHttpAccess: (value: boolean) => void;
  allowHttpsAccess: boolean;
  setAllowHttpsAccess: (value: boolean) => void;
  remoteAccessIp: string | null;
  setRemoteAccessIp: (ip: string | null) => void;
};

export const AddBckupVMContext = createContext<AddBckupVMContextType>({
  serverConfig: null,
  setServerConfig: (osConfig) => {},
  serverName: "",
  setServerName: (name) => {},
  isPredefined: false,
  setIsPredefined: (isPredefined) => {},
  customConfig: {
    cpu: undefined,
    memory: undefined,
  },
  setCustomConfig: (customConfig) => {},
  usePublicIpV4: true,
  setUsePublicIpV4: () => {},
  usePublicIpV6: false,
  setUsePublicIpV6: () => {},
  usePrivateNetwork: false,
  setUsePrivateNetwork: () => {},
  selectedNetwork: null,
  setSelectedNetwork: () => {},
  ipAddress: null,
  setIpAddress: () => {},
  usedFirewall: false,
  setUsedFirewall: () => {},
  vmFirewallId: null,
  setVmFirewallId: () => {},
  useExistingFirewall: true,
  setUseExistingFirewall: () => {},
  allowRemoteAccess: true,
  setAllowRemoteAccess: () => {},
  allowHttpAccess: true,
  setAllowHttpAccess: () => {},
  allowHttpsAccess: true,
  setAllowHttpsAccess: () => {},
  remoteAccessIp: null,
  setRemoteAccessIp: () => {},
});

type AddServerContextProviderPropsType = {
  children?: ReactNode;
};

const AddBckupVMContextProvider: FC<AddServerContextProviderPropsType> = ({
  children,
}) => {
  const [serverConfig, setServerConfig] =
    useState<ProductBundleVmListResponse | null>(null);
  const [serverName, setServerName] = useState("");
  const [isPredefined, setIsPredefined] = useState(true);
  const [customConfig, setCustomConfig] = useState<vmCustomConfigType>({
    cpu: 1,
    memory: 1,
  });
  const [usePublicIpV4, setUsePublicIpV4] = useState<boolean>(true);
  const [usePublicIpV6, setUsePublicIpV6] = useState<boolean>(false);
  const [usePrivateNetwork, setUsePrivateNetwork] = useState<boolean>(false);
  const [selectedNetwork, setSelectedNetwork] =
    useState<VmNetworkShortListResponse | null>(null);
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [usedFirewall, setUsedFirewall] = useState<boolean>(false);
  const [vmFirewallId, setVmFirewallId] = useState<number | null>(null);
  const [useExistingFirewall, setUseExistingFirewall] = useState<boolean>(true);
  const [allowRemoteAccess, setAllowRemoteAccess] = useState<boolean>(true);
  const [allowHttpAccess, setAllowHttpAccess] = useState<boolean>(true);
  const [allowHttpsAccess, setAllowHttpsAccess] = useState<boolean>(true);
  const [remoteAccessIp, setRemoteAccessIp] = useState<string | null>(
    "0.0.0.0/0"
  );
  return (
    <AddBckupVMContext.Provider
      value={{
        serverConfig,
        setServerConfig,
        serverName,
        setServerName,
        isPredefined,
        setIsPredefined,
        customConfig,
        setCustomConfig,
        usePublicIpV4,
        setUsePublicIpV4,
        usePublicIpV6,
        setUsePublicIpV6,
        usePrivateNetwork,
        setUsePrivateNetwork,
        selectedNetwork,
        setSelectedNetwork,
        ipAddress,
        setIpAddress,
        usedFirewall,
        setUsedFirewall,
        vmFirewallId,
        setVmFirewallId,
        useExistingFirewall,
        setUseExistingFirewall,
        allowRemoteAccess,
        setAllowRemoteAccess,
        allowHttpAccess,
        setAllowHttpAccess,
        allowHttpsAccess,
        setAllowHttpsAccess,
        remoteAccessIp,
        setRemoteAccessIp,
      }}
    >
      {children}
    </AddBckupVMContext.Provider>
  );
};

export default AddBckupVMContextProvider;
