import { SeeFeedsResult } from "@/__generated__/graphql";
import { useGenericQuery } from "@/apollo/fetcher";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "@/apollo/fragments";
import {
  gql,
  SuspenseQueryHookOptions,
  TypedDocumentNode,
} from "@apollo/client";

interface DataProps {
  seeFeeds: SeeFeedsResult;
}

interface VariablesProps {
  lastId?: number;
  limit: number;
}

export const FEED_QUERY: TypedDocumentNode<DataProps, VariablesProps> = gql`
  query seeFeeds($lastId: Int, $limit: Int) {
    seeFeeds(lastId: $lastId, limit: $limit) {
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

export const useSeeFeeds = (options?: SuspenseQueryHookOptions) => {
  return useGenericQuery(FEED_QUERY, { ...options });
};
