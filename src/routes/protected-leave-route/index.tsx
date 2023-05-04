import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";

interface IProtectedLeaveRouteProps {
  component: JSX.Element;
}

export const ProtectedLeaveRoute: React.FC<IProtectedLeaveRouteProps> = ({
  component: Component,
}) => {
  const { accessToken } = useAppSelector((state) => state.authen.user);

  return (
    <>
      {!accessToken && Component}
      {accessToken && <Navigate to="/" />}
    </>
  );
};
