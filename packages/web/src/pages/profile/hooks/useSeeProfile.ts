import { Photo } from "@/__generated__/graphql";
import { useGenericSuspenseQuery } from "@/apollo/fetcher";
import { COMMENT_FRAGMENT, PHOTO_PROFILE_FRAGMENT } from "@/apollo/fragments";
import {
  gql,
  SuspenseQueryHookOptions,
  TypedDocumentNode,
} from "@apollo/client";

interface DataProps {
  seeProfile: {
    firstName: string;
    lastName: string;
    username: string;
    bio: string;
    avatar: string;
    photos: Photo[];
    totalFollowing: number;
    totalFollowers: number;
    isMe: boolean;
    isFollowing: boolean;
  };
}

interface VariablesProps {
  username: string;
}

export const SEE_PROFILE_QUERY: TypedDocumentNode<
  DataProps,
  VariablesProps
> = gql`
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

export const useSeeProfile = (options?: SuspenseQueryHookOptions) => {
  return useGenericSuspenseQuery(SEE_PROFILE_QUERY, { ...options });
};
