import PropTypes from "prop-types";
import styled from "styled-components";
import Comment from "./Comment";
import { Comment as CommentGraphqlType } from "@/__generated__/graphql";

interface CommentsProps {
  photoId: Number;
  comments: CommentGraphqlType[];
}

const Comments = ({ photoId, comments }: CommentsProps) => {
  return (
    <CommentsContainer>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          photoId={photoId}
          isMine={comment.isMine}
          author={comment.user.username}
          payload={comment.payload}
          avatar={comment.user.avatar || ""}
          createdAt={comment.createdAt}
        />
      ))}
    </CommentsContainer>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }),
      payload: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default Comments;

const CommentsContainer = styled.div``;
