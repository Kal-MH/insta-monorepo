import React from "react";

import { Outlet } from "react-router-dom";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import RootErrorBoundary from "@/components/common/RootErrorBoundary";
import { darkModeVar } from "@/apollo";
import { darkTheme, GlobalStyles, lightTheme } from "@/styles";
import client from "@/client";
import { HelmetProvider } from "react-helmet-async";

const CommonLayout = () => {
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <>
      <RootErrorBoundary>
        <ApolloProvider client={client}>
          <HelmetProvider>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
              <GlobalStyles />
              <Outlet />
            </ThemeProvider>
          </HelmetProvider>
        </ApolloProvider>
      </RootErrorBoundary>
    </>
  );
};
export default CommonLayout;
