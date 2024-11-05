import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "src/app/hooks";

export const PrivateRoute: FC = () => {
  const token = useAppSelector((state) => state.auth?.accessToken);

  return token ? <Outlet /> : <Navigate to="/account/login" />;
};
