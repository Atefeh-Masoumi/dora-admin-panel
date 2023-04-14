import { FC, createContext, ReactNode, useState } from "react";

export type addZoneStepsType = 1 | 2 | 3 | 4;

type AddZoneContextType = {
  step: addZoneStepsType;
  setStep: (step: addZoneStepsType) => void;
  domainName: string;
  setDomainName: (domainName: string) => void;
  term: boolean;
  setTerm: (term: boolean) => void;
};

export const AddZoneContext = createContext<AddZoneContextType>({
  step: 1,
  setStep: (step) => {},
  domainName: "",
  setDomainName: (domainName) => {},
  term: false,
  setTerm: (term) => {},
});

type AddZoneContextProviderPropsType = {
  children?: ReactNode;
};

const AddZoneContextProvider: FC<AddZoneContextProviderPropsType> = ({
  children,
}) => {
  const [step, setStep] = useState<addZoneStepsType>(1);
  const [domainName, setDomainName] = useState("");
  const [term, setTerm] = useState(false);

  return (
    <AddZoneContext.Provider
      value={{
        step,
        setStep,
        domainName,
        setDomainName,
        term,
        setTerm,
      }}
    >
      {children}
    </AddZoneContext.Provider>
  );
};

export default AddZoneContextProvider;
