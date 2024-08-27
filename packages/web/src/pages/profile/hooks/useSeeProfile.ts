import { useGenericQuery } from "@/apollo/fetcher";
import { PHOTO_FRAGMENT } from "@/apollo/fragments";
import { gql, QueryHookOptions } from "@apollo/client";

export const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

export const useSeeProfile = (options?: QueryHookOptions) => {
  return useGenericQuery(SEE_PROFILE_QUERY, { ...options });
};
