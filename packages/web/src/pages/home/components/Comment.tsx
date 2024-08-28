import PropTypes from "prop-types";
import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import { ApolloCache, gql, useMutation } from "@apollo/client";
import { DeleteCommentResult } from "@/__generated__/graphql";
import { FatText } from "@/components/shared";
import { Avatar } from "@insta-monorepo/design-system";

interface CommentProps {
  id?: Number;
  photoId?: Number;
  isMine?: boolean;
  author: string;
  payload: string;
  avatar?: string;
}

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const Comment = ({
  id,
  photoId,
  isMine,
  author,
  payload,
  avatar,
}: CommentProps) => {
  const updateDeleteComment = (
    cache: ApolloCache<DeleteCommentResult>,
    result: any
  ) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;

    if (!ok) return;

    cache.evict({ id: `Comment:${id}` });
    cache.modify({
      id: `Photo:${photoId}`,
      fields: {
        commentsNumber(prev) {
          return prev - 1;
        },
      },
    });
    cache.gc();
  };

  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });
  const handleDeleteBtnClick = () => {
    deleteCommentMutation();
  };
  return (
    <CommentContainer>
      {avatar && (
        <AvatarContainer>
          <Link to={`/users/${author}`}>
            <Avatar
              size={30}
              src={avatar as string}
              placeholder="/profile.png"
            />
          </Link>
        </AvatarContainer>
      )}
      <div>
        <Link to={`/users/${author}`}>
          <FatText>{author}</FatText>
        </Link>
        <CommentCaption>
          {payload.split(" ").map((word, index) =>
            /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w-]+/.test(word) ? (
              <React.Fragment key={index}>
                <Link to={`/hashtags/${word}`}>{word} </Link>
              </React.Fragment>
            ) : (
              <React.Fragment key={index}>{word} </React.Fragment>
            )
          )}
        </CommentCaption>
      </div>
      {isMine ? (
        <CommentDeleteBtn onClick={handleDeleteBtnClick}>❌</CommentDeleteBtn>
      ) : null}
    </CommentContainer>
  );
};

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Comment;

const AvatarContainer = styled.div`
  margin-right: 10px;
  display: inline-block;
`;

const CommentContainer = styled.div`
  margin-bottom: 7px;
  display: flex;
  align-items: center;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  white-space: pre-line;
  line-height: 1.4;

  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CommentDeleteBtn = styled.button`
  background-color: transparent;
  border: none;
  font-size: 10px;
  cursor: pointer;
`;
