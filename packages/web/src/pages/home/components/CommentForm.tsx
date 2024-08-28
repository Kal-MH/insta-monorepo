import styled from "styled-components";
import { CreateCommentResult } from "@/__generated__/graphql";

import { ApolloCache, gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import useUser from "@/hooks/useUser";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

interface CommentFormProps {
  photoId: Number;
}

interface FormProps {
  payload: string;
}

const CommentForm = ({ photoId }: CommentFormProps) => {
  const userData = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm<FormProps>();

  const createCommentUpdate = (
    cache: ApolloCache<CreateCommentResult>,
    result: any
  ) => {
    const { payload } = getValues();
    setValue("payload", "");

    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    if (!ok || !userData?.me) return;

    const newComment = {
      __typename: "Comment",
      createdAt: Date.now() + "",
      id,
      isMine: true,
      payload,
      user: {
        ...userData.me,
      },
    };

    const newCacheComment = cache.writeFragment({
      data: newComment,
      fragment: gql`
        fragment CreateCommentQuery on Comment {
          id
          createdAt
          isMine
          payload
          user {
            username
            avatar
          }
        }
      `,
    });

    cache.modify({
      id: `Photo:${photoId}`,
      fields: {
        comments(prev) {
          return [...prev, newCacheComment];
        },
        commentNumber(prev) {
          return prev + 1;
        },
      },
    });
  };

  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );

  const onValid: SubmitHandler<FormProps> = (data) => {
    const { payload } = data;

    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
  };

  return (
    <>
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            {...register("payload", { required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </PostCommentContainer>
    </>
  );
};

export default CommentForm;

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;
