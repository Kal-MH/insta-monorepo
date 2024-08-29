import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;

export const PHOTO_PROFILE_FRAGMENT = gql`
  fragment PhotoProfileFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
    user {
      username
      avatar
    }
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;
