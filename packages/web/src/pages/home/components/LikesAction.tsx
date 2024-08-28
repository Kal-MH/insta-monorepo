import styled from "styled-components";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { useToggleLike } from "../hooks/useTogleLike";
import { ApolloCache } from "@apollo/client";
import { ToggleLikeResult } from "@/__generated__/graphql";

interface LikesActionProps {
  photoId: number;
  isLiked: boolean;
  onClick?: () => void;
}

const LikesAction = ({ photoId, isLiked, onClick }: LikesActionProps) => {
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

    const cachePhotoId = `Photo:${photoId}`;
    cache.modify({
      id: cachePhotoId,
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

  const [toggleLikeMutation] = useToggleLike({
    variables: {
      id: photoId,
    },
    update: updateToggleLike,
  });

  return (
    <PhotoAction
      onClick={() => {
        onClick?.();
        toggleLikeMutation();
      }}
    >
      <FontAwesomeIcon
        style={{ color: isLiked ? "tomato" : "inherit" }}
        icon={isLiked ? SolidHeart : faHeart}
      />
    </PhotoAction>
  );
};
export default LikesAction;

const PhotoAction = styled.div`
  cursor: pointer;
  margin-right: 10px;
`;
