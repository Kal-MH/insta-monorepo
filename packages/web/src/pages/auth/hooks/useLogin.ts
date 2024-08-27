import { useGenericMutation } from "@/apollo/fetcher";
import { gql, QueryHookOptions } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export const useLogin = (options: QueryHookOptions) => {
  return useGenericMutation(LOGIN_MUTATION, { ...options });
};
