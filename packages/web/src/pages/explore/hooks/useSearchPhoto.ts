import { Photo } from "@/__generated__/graphql";
import { useGenericQuery } from "@/apollo/fetcher";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "@/apollo/fragments";
import {
  gql,
  SuspenseQueryHookOptions,
  TypedDocumentNode,
} from "@apollo/client";

interface DataProps {
  searchPhoto: Photo[];
}

interface VariablesProps {
  lastId?: number;
  limit?: number;
  keyword: string;
}

export const SEARCH_PHOTO_QUERY: TypedDocumentNode<
  DataProps,
  VariablesProps
> = gql`
  query searchPhoto($keyword: String!, $lastId: Int, $limit: Int) {
    searchPhoto(keyword: $keyword, lastId: $lastId, limit: $limit) {
      ...PhotoFragment
      user {
        username
        avatar
        isMe
        isFollowing
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

export const useSearchPhoto = (options?: SuspenseQueryHookOptions) => {
  return useGenericQuery(SEARCH_PHOTO_QUERY, { ...options });
};
