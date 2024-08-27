import styled from "styled-components";

import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import {
  Comment as CommentGraphqlType,
  Photo as PhotoGraphqlType,
  ToggleLikeResult,
} from "@/__generated__/graphql";
import { ApolloCache, gql, useMutation } from "@apollo/client";

import Comments from "./Comments";
import { Link } from "react-router-dom";
import { FatText } from "@/components/shared";
import Likes from "./Likes";
import { Avatar } from "@insta-monorepo/design-system";

interface PhotoProps {
  photo: PhotoGraphqlType;
}

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Photo = ({ photo }: PhotoProps) => {
  const { id, user, file, caption, isLiked, likes, commentNumber, comments } =
    photo;

  const updateToggleLike = (
    cache: ApolloCache<ToggleLikeResult>,
    result: any
  ) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;

    if (!ok) return;

    const photoId = `Photo:${id}`;
    cache.modify({
      id: photoId,
      fields: {
        isLiked(prev) {
          return !prev;
        },
        likes: (prev) => {
          if (isLiked) {
            //isLiked from props
            return prev - 1;
          }
          return prev + 1;
        },
      },
    });
  };

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });

  return (
    <PhotoContainer>
      <PhotoHeader>
        <Link to={`/users/${user.username}`}>
          <Avatar
            size={30}
            src={user.avatar as string}
            placeholder="/profile.png"
          />
        </Link>
        <Link to={`/users/${user.username}`}>
          <Username>{user.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoDescription>
        <PhotoActions>
          <div>
            <PhotoAction
              onClick={() => {
                toggleLikeMutation();
              }}
            >
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            {/* <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction> */}
          </div>
          {/* <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div> */}
        </PhotoActions>
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        <Comments
          photoId={id}
          author={user.username}
          caption={caption as string}
          commentNumber={commentNumber}
          comments={comments as CommentGraphqlType[]}
        />
      </PhotoDescription>
    </PhotoContainer>
  );
};

export default Photo;

const PhotoContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  max-width: 615px;
`;
const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  /* max-width: 615px; */
  width: 100%;
  object-fit: contain;
`;

const PhotoDescription = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  cursor: pointer;
  margin-right: 10px;
`;
