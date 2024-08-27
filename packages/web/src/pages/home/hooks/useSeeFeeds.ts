import { useGenericQuery } from "@/apollo/fetcher";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "@/apollo/fragments";
import { gql, QueryHookOptions } from "@apollo/client";

export const FEED_QUERY = gql`
  query seeFeeds {
    seeFeeds {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      likes
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export const useSeeFeeds = (options?: QueryHookOptions) => {
  return useGenericQuery(FEED_QUERY, { ...options });
};
