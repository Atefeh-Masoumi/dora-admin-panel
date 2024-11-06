import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

let navigateFunction: (path: string) => void;

export const NavigateSetter = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigateFunction = navigate;
  }, [navigate]);
  return null;
};

export const navigateTo = (path: string) => {
  if (navigateFunction) {
    navigateFunction(path);
  }
};
