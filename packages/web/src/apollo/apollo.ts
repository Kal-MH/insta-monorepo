import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  DefaultContext,
  InMemoryCache,
  makeVar,
} from "@apollo/client";

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  window.location.reload();
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  window.location.reload();
};

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext((context: DefaultContext) => ({
    headers: {
      ...context.headers,
      token: localStorage.getItem(TOKEN),
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
