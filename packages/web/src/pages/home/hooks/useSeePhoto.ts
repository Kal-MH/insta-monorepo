import { useGenericQuery } from "@/apollo/fetcher";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "@/apollo/fragments";
import { gql, SuspenseQueryHookOptions } from "@apollo/client";

export const SEE_PHOTO_QUERY = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
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

export const useSeePhoto = (options?: SuspenseQueryHookOptions) => {
  return useGenericQuery(SEE_PHOTO_QUERY, { ...options });
};
