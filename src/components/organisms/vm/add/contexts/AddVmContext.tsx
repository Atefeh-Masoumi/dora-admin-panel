import { FC, createContext, ReactNode, useState } from "react";
import {
  VmImageListResponse,
  ProductBundleVmListResponse,
} from "src/app/services/api.generated";

export type addServerStepsType = 1 | 2 | 3 | 4;

export type vmCustomConfigType = {
  cpu: number | null;
  memory: number | null;
  disk: number | null;
  IPV4: number | null;
};

type AddServerContextType = {
  step: addServerStepsType;
  setStep: (step: addServerStepsType) => void;
  dataCenter: VmImageListResponse | null;
  setDataCenter: (dataCenter: VmImageListResponse | null) => void;
  osVersion: VmImageListResponse | null;
  setOsVersion: (osVersion: VmImageListResponse | null) => void;
  serverConfig: ProductBundleVmListResponse | null;
  setServerConfig: (osConfig: ProductBundleVmListResponse | null) => void;
  serverName: string;
  setServerName: (name: string) => void;
  serverPassword: string;
  setServerPassword: (password: string) => void;
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
};

export const AddServerContext = createContext<AddServerContextType>({
  step: 1,
  setStep: (step) => {},
  dataCenter: null,
  setDataCenter: (dataCenter) => {},
  osVersion: null,
  setOsVersion: (osVersion) => {},
  serverConfig: null,
  setServerConfig: (osConfig) => {},
  serverName: "",
  setServerName: (name) => {},
  serverPassword: "",
  setServerPassword: (password) => {},
  isPredefined: false,
  setIsPredefined: (isPredefined) => {},
  customConfig: {
    cpu: null,
    memory: null,
    disk: null,
    IPV4: 1,
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
});

type AddServerContextProviderPropsType = {
  children?: ReactNode;
};

const AddServerContextProvider: FC<AddServerContextProviderPropsType> = ({
  children,
}) => {
  const [step, setStep] = useState<addServerStepsType>(1);
  const [dataCenter, setDataCenter] = useState<VmImageListResponse | null>(
    null
  );
  const [osVersion, setOsVersion] =
    useState<VmImageListResponse | null>(null);
  const [serverConfig, setServerConfig] =
    useState<ProductBundleVmListResponse | null>(null);
  const [serverName, setServerName] = useState("");
  const [serverPassword, setServerPassword] = useState("");
  const [isPredefined, setIsPredefined] = useState(true);
  const [customConfig, setCustomConfig] = useState<vmCustomConfigType>({
    cpu: 1,
    memory: 1,
    disk: 25,
    IPV4: 1,
  });
  const [usePublicIpV4, setUsePublicIpV4] = useState<boolean>(true);
  const [usePublicIpV6, setUsePublicIpV6] = useState<boolean>(false);
  const [usePrivateNetwork, setUsePrivateNetwork] = useState<boolean>(false);
  const [selectedNetwork, setSelectedNetwork] =
    useState<VmNetworkShortListResponse | null>(null);
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [usedFirewall, setUsedFirewall] = useState<boolean>(false);
  const [vmFirewallId, setVmFirewallId] = useState<number | null>(null);

  return (
    <AddServerContext.Provider
      value={{
        step,
        setStep,
        dataCenter,
        setDataCenter,
        osVersion,
        setOsVersion,
        serverConfig,
        setServerConfig,
        serverName,
        setServerName,
        serverPassword,
        setServerPassword,
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
      }}
    >
      {children}
    </AddServerContext.Provider>
  );
};

export default AddServerContextProvider;
