import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";

interface IProtectedRouteProps {
  component: React.FC<any>; // || React.ComponentType<any>
  routeProps?: any;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  component: Component,
  ...routeProps
}) => {
  const user = useAppSelector((state) => state.authen.user.accessToken);
  if (!user) {
    return <Navigate to="/login" />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...routeProps} />;
};
