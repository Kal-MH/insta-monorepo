import { Outlet } from "react-router-dom";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar } from "@/apollo/apollo";
import { darkTheme, GlobalStyles, lightTheme } from "@/styles";
import { HelmetProvider } from "react-helmet-async";
import RootErrorBoundary from "../error/RootErrorBoundary";
import { Toaster } from "react-hot-toast";

const ProviderLayout = () => {
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <>
      <RootErrorBoundary>
        <ApolloProvider client={client}>
          <HelmetProvider>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
              <GlobalStyles />
              <Outlet />
              <Toaster toastOptions={{ duration: 2000 }} />
            </ThemeProvider>
          </HelmetProvider>
        </ApolloProvider>
      </RootErrorBoundary>
    </>
  );
};
export default ProviderLayout;
