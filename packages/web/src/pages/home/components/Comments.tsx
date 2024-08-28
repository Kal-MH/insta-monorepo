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
        />
      ))}
    </CommentsContainer>
  );
};

Comments.propTypes = {
  // author: PropTypes.string.isRequired,
  // caption: PropTypes.string,
  // commentNumber: PropTypes.number.isRequired,
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

const CommentsContainer = styled.div`
  /* margin-top: 20px; */
`;
const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;
