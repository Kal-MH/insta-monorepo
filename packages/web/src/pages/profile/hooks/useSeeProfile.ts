import { useGenericQuery } from "@/apollo/fetcher";
import { COMMENT_FRAGMENT, PHOTO_PROFILE_FRAGMENT } from "@/apollo/fragments";
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
        ...PhotoProfileFragment
        comments {
          ...CommentFragment
        }
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_PROFILE_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export const useSeeProfile = (options?: QueryHookOptions) => {
  return useGenericQuery(SEE_PROFILE_QUERY, { ...options });
};
