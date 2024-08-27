import React from "react";
import { Navigate } from "react-router-dom";
import { pageRoutes } from "../../apiRoutes";
import { isLoggedInVar } from "../../apollo/apollo";

import { useReactiveVar } from "@apollo/client";

export const authStatusType = {
  NEED_LOGIN: "NEED_LOGIN",
  NEED_NOT_LOGIN: "NEED_NOT_LOGIN",
  COMMON: "COMMON",
};

interface LayoutProps {
  children: React.ReactNode;
  authStatus?: string;
}

const LoginLayout = ({
  children,
  authStatus = authStatusType.COMMON,
}: LayoutProps) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  if (authStatus === authStatusType.NEED_LOGIN && !isLoggedIn) {
    return <Navigate to={pageRoutes.login} />;
  }

  if (authStatus === authStatusType.NEED_NOT_LOGIN && isLoggedIn) {
    return <Navigate to={pageRoutes.home} />;
  }

  return <>{children}</>;
};

export default LoginLayout;
