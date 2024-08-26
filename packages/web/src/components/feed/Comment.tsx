import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../common/shared";
import React from "react";
import { Link } from "react-router-dom";
import { ApolloCache, gql, useMutation } from "@apollo/client";
import { DeleteCommentResult } from "@/__generated__/graphql";

interface CommentProps {
  id?: Number;
  photoId?: Number;
  isMine?: boolean;
  author: string;
  payload: string;
}

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const Comment = ({ id, photoId, isMine, author, payload }: CommentProps) => {
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
      <FatText>{author}</FatText>
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

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
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
`;
