import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./Error";

interface RootErrorBoundary {
  children: React.ReactNode;
}

const RootErrorBoundary = ({ children }: RootErrorBoundary) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
  );
};

export default RootErrorBoundary;
