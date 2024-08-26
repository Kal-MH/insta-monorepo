import styled from "styled-components";
import { FatText } from "../common/shared";
import Avatar from "@/components/common/Avatar";

import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import {
  Photo as PhotoGraphqlType,
  ToggleLikeResult,
  User,
} from "@/__generated__/graphql";
import { ApolloCache, gql, useMutation } from "@apollo/client";

import PropTypes from "prop-types";

interface PhotoProps {
  id: Number;
  user: User;
  file: string;
  isLiked: boolean;
  likes: Number;
}

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Photo = ({ id, user, file, isLiked, likes }: PhotoProps) => {
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

    const fragmentId = `Photo:${id}`;
    const fragment = gql`
      fragment isLikedAndLikes on Photo {
        isLiked
        likes
      }
    `;

    const cacheResult: PhotoGraphqlType | null = cache.readFragment({
      id: fragmentId,
      fragment,
    });

    if (cacheResult && "isLiked" in cacheResult && "likes" in cacheResult) {
      const { isLiked: cacheIsLiked, likes: cacheLikes } = cacheResult;

      cache.writeFragment({
        id: fragmentId,
        fragment,
        data: {
          isLiked: !cacheIsLiked,
          likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1,
        },
      });
    }
  };

  const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });

  return (
    <PhotoContainer>
      <PhotoHeader>
        <Avatar lg url={user.avatar as string} />
        <Username>{user.username}</Username>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
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
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
};

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

const PhotoData = styled.div`
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

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;
