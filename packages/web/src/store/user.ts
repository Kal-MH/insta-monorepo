import { User } from "@/__generated__/graphql";
import { makeVar, useReactiveVar } from "@apollo/client";
import Cookies from "js-cookie";

export const TOKEN = "token";

type UserType = {
  me: User;
};

export const isLoggedInVar = makeVar(Boolean(Cookies.get(TOKEN)));
export const userVar = makeVar({} as UserType);

export const useUserStore = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const user = useReactiveVar(userVar);

  return {
    isLoggedIn,
    user,
    setIsLoggedIn: (isLoggedIn: boolean) => {
      isLoggedInVar(isLoggedIn);
    },
    setUser: (user: any) => {
      userVar(user);
    },
  };
};
