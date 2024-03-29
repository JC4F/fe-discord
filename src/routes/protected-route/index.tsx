import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";

interface IProtectedRouteProps {
  component: JSX.Element;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  component: Component,
}) => {
  const { accessToken } = useAppSelector((state) => state.authen.user);

  return (
    <>
      {accessToken && Component}
      {!accessToken && <Navigate to="/login" />}
    </>
  );
};
