import styled from "styled-components";
import { CreateCommentResult } from "@/__generated__/graphql";

import { Button, TextArea } from "@insta-monorepo/design-system";

import { ApolloCache, gql, useMutation } from "@apollo/client";
import { set, SubmitHandler, useForm } from "react-hook-form";
import useUser from "@/hooks/useUser";
import { ChangeEvent, useState } from "react";

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
  const [show, setShow] = useState(false);
  const { register, handleSubmit, setValue, getValues } = useForm<FormProps>();
  const { onChange, ...rest } = register("payload", { required: true });

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setShow(() => e.target.value.length > 0);
    onChange(e);
  };

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
          return [newCacheComment, ...prev];
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
        <PostCommentForm onSubmit={handleSubmit(onValid)}>
          {/* <PostCommentInput
            {...register("payload", { required: true })}
            type="text"
            placeholder="Write a comment..."
          /> */}
          <PostCommentTextArea
            placeholder="Write a comment..."
            resizeType="none"
            onChange={handleCommentChange}
            {...rest}
          />
          {show && (
            <PostCommentButton htmlType="submit">게시</PostCommentButton>
          )}
        </PostCommentForm>
      </PostCommentContainer>
    </>
  );
};

export default CommentForm;

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  /* padding-bottom: 10px; */
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

const PostCommentForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const PostCommentTextArea = styled(TextArea)`
  border: none;
  width: 100%;
  height: 30px;
  font-size: 12px;

  &::placeholder {
    font-size: 12px;
  }

  &:focus {
    outline: none;
  }
`;

const PostCommentButton = styled(Button)`
  border: none;
  outline: none;

  width: 60px !important;
  height: 30px;
`;
