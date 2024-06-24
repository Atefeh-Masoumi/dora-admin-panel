import { FC, createContext, ReactNode, useState } from "react";

export type addVpcStepsType = 1 | 2 | 3;
type extObjectType = {
  //TODO : Need Change
  id: number | "";
  name: string;
  price: number;
};

type AddVpcContextType = {
  //TODO : Need Change
  //   step: addDomainStepsType;
  //   setStep: (step: addVpcStepsType) => void;
  //   domainName: string;
  //   setDomainName: (domainName: string) => void;
  //   ext: string;
  //   setExt: (ext: string) => void;
  //   productId: number;
  //   setProductId: (ext: number) => void;
  //   authCode: string;
  //   setAuthCode: (ext: string) => void;
  //   name: string;
  //   setName: (name: string) => void;
  //   country: string;
  //   setCountry: (country: string) => void;
  //   province: string;
  //   setProvince: (province: string) => void;
  //   city: string;
  //   setCity: (city: string) => void;
  //   street: string;
  //   setStreet: (street: string) => void;
  //   postalCode: string;
  //   setPostalCode: (postalCode: string) => void;
  //   voice: string;
  //   setVoice: (voice: string) => void;
  //   ns1: string;
  //   setNs1: (ns1: string) => void;
  //   ns2: string;
  //   setNs2: (ns2: string) => void;
  //   autoRenewal: boolean;
  //   setAutoRenewal: (autoRenewal: boolean) => void;
  //   activeCdn: boolean;
  //   setActiveCdn: (activeCdn: boolean) => void;
  //   term: boolean;
  //   setTerm: (term: boolean) => void;
  //   extObject: extObjectType;
  //   setExtObject: (extObject: extObjectType) => void;
};

export const AddVpcContext = createContext<AddVpcContextType>({
  //TODO : Need Change
  //   step: 1,
  //   setStep: (step) => {},
  //   domainName: "",
  //   setDomainName: (domainName) => {},
  //   ext: "",
  //   setExt: (ext) => {},
  //   productId: 1,
  //   setProductId: (productId) => {},
  //   authCode: "",
  //   setAuthCode: (authCode) => {},
  //   name: "",
  //   setName: (name) => {},
  //   country: "",
  //   setCountry: (country) => {},
  //   province: "",
  //   setProvince: (province) => {},
  //   city: "",
  //   setCity: (city) => {},
  //   street: "",
  //   setStreet: (street) => {},
  //   postalCode: "",
  //   setPostalCode: (postalCode) => {},
  //   voice: "",
  //   setVoice: (voice) => {},
  //   ns1: "",
  //   setNs1: (ns1) => {},
  //   ns2: "",
  //   setNs2: (ns2) => {},
  //   autoRenewal: true,
  //   setAutoRenewal: (autoRenewal) => {},
  //   activeCdn: true,
  //   setActiveCdn: (activeCdn) => {},
  //   term: false,
  //   setTerm: (term) => {},
  //   extObject: {
  //     id: "",
  //     name: "",
  //     price: 0,
  //   },
  //   setExtObject: (extObject) => {},
});

type AddVpcContextProviderPropsType = {
  children?: ReactNode;
};

const defaultExtObject: extObjectType = {
  id: "",
  name: "",
  price: 0,
};

const AddVpcContextProvider: FC<AddVpcContextProviderPropsType> = ({
  children,
}) => {
  //TODO : Need Change

  //   const [step, setStep] = useState<addVpcStepsType>(1);
  //   const [domainName, setDomainName] = useState("");
  //   const [ext, setExt] = useState("com");
  //   const [productId, setProductId] = useState(10);
  //   const [authCode, setAuthCode] = useState("Auth Code");
  //   const [name, setName] = useState("");
  //   const [country, setCountry] = useState("Iran");
  //   const [province, setProvince] = useState("Tehran");
  //   const [city, setCity] = useState("Tehran");
  //   const [street, setStreet] = useState("");
  //   const [postalCode, setPostalCode] = useState("");
  //   const [voice, setVoice] = useState("");
  //   const [ns1, setNs1] = useState("asia.dorsa.cloud");
  //   const [ns2, setNs2] = useState("mobin.dorsa.cloud");
  //   const [autoRenewal, setAutoRenewal] = useState(true);
  //   const [activeCdn, setActiveCdn] = useState(true);
  //   const [term, setTerm] = useState(false);
  //   const [extObject, setExtObject] = useState<extObjectType>(defaultExtObject);

  return (
    <AddVpcContext.Provider
      value={
        {
          // step,
          // setStep,
          // domainName,
          // setDomainName,
          // ext,
          // setExt,
          // productId,
          // setProductId,
          // authCode,
          // setAuthCode,
          // name,
          // setName,
          // country,
          // setCountry,
          // province,
          // setProvince,
          // city,
          // setCity,
          // street,
          // setStreet,
          // postalCode,
          // setPostalCode,
          // voice,
          // setVoice,
          // ns1,
          // setNs1,
          // ns2,
          // setNs2,
          // autoRenewal,
          // setAutoRenewal,
          // activeCdn,
          // setActiveCdn,
          // term,
          // setTerm,
          // extObject,
          // setExtObject,
        }
      }
    >
      {children}
    </AddVpcContext.Provider>
  );
};

export default AddVpcContextProvider;
