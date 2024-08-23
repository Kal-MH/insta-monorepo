import React from "react";
import { Navigate } from "react-router-dom";
import { pageRoutes } from "../../apiRoutes";
import { isLoggedInVar } from "../../apollo";

import { useReactiveVar } from "@apollo/client";

export const authStatusType = {
  NEED_LOGIN: "NEED_LOGIN",
  NEED_NOT_LOGIN: "NEED_NOT_LOGIN",
  COMMON: "COMMON",
};

interface LayoutProps {
  children: React.ReactNode;
  authStatus: string;
}

const LoginLayout = ({
  children,
  authStatus = authStatusType.COMMON,
}: LayoutProps) => {
  // TODO
  // - login여부 불러오기
  // - Login여부에 따라서 다르게 리턴하기
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  if (authStatus === authStatusType.NEED_LOGIN && !isLoggedIn) {
    return <Navigate to={pageRoutes.login} />;
  }

  return <>{children}</>;
};

export default LoginLayout;
