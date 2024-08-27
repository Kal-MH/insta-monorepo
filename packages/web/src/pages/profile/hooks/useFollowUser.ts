import { useGenericMutation } from "@/apollo/fetcher";
import { gql, QueryHookOptions } from "@apollo/client";

export const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
      error
    }
  }
`;

export const useFollowUser = (options: QueryHookOptions) => {
  return useGenericMutation(FOLLOW_USER_MUTATION, { ...options });
};
