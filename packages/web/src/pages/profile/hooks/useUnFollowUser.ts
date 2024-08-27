import { useGenericMutation } from "@/apollo/fetcher";
import { gql } from "@apollo/client";

export const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
      error
    }
  }
`;

export const useUnFollowUser = (options: any) => {
  return useGenericMutation(UNFOLLOW_USER_MUTATION, { ...options });
};
