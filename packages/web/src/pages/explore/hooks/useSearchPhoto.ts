import { useGenericQuery } from "@/apollo/fetcher";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "@/apollo/fragments";
import { gql, QueryHookOptions } from "@apollo/client";

export const SEARCH_PHOTO_QUERY = gql`
  query searchPhoto($keyword: String!, $lastId: Int, $limit: Int) {
    searchPhoto(keyword: $keyword, lastId: $lastId, limit: $limit) {
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
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export const useSearchPhoto = (options?: QueryHookOptions) => {
  return useGenericQuery(SEARCH_PHOTO_QUERY, { ...options });
};
