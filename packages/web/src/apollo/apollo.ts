import { TOKEN } from "@/store/user";
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  DefaultContext,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import Cookies from "js-cookie";

const DARK_MODE = "DARK_MODE";
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_SERVER_DOMAIN_URL,
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext((context: DefaultContext) => ({
    headers: {
      ...context.headers,
      token: Cookies.get(TOKEN),
    },
  }));
  return forward(operation);
});

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (networkError) {
//     toast.error("Please check your internet connection.", {
//       position: "bottom-center",
//     });
//     return;
//   }
//   if (graphQLErrors) {
//     toast.error(graphQLErrors[0].message, {
//       position: "bottom-center",
//     });
//     return;
//   }
// });

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
    },
  }),
});

// export const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   cache: new InMemoryCache(),
// });
