import styled from "styled-components";

import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Photo as PhotoGraphqlType } from "@/__generated__/graphql";

import { Link } from "react-router-dom";
import { FatText } from "@/components/shared";
import { Avatar } from "@insta-monorepo/design-system";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import LikesAction from "./LikesAction";
import useLazyLoadImage from "@/hooks/useLazyLoadImage";

interface PhotoProps {
  photo: PhotoGraphqlType;
  onCommentClick: () => void;
}

const Photo = ({ photo, onCommentClick }: PhotoProps) => {
  const { id, user, file, isLiked, likes, commentNumber } = photo;
  const { loaded, imageRef } = useLazyLoadImage();

  return (
    <>
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
        <PhotoFile>
          <img
            ref={imageRef}
            src={loaded ? file : "/profile.png"}
            alt="photo"
          />
        </PhotoFile>
        <PhotoDescription>
          <PhotoActions>
            <div>
              <LikesAction photoId={id} isLiked={isLiked} />
              <PhotoAction>
                <FontAwesomeIcon icon={faComment} />
              </PhotoAction>
            </div>
          </PhotoActions>
          <LikesText>{`좋아요 ${likes}개`}</LikesText>
          <CommentContainer>
            <Comment
              author={photo.user.username}
              payload={photo.caption || ""}
            />
            {commentNumber > 0 && (
              <>
                <CommentClickBtn onClick={onCommentClick}>
                  댓글 {commentNumber}개 모두 보기
                </CommentClickBtn>
              </>
            )}
            <CommentForm photoId={photo.id} />
          </CommentContainer>
        </PhotoDescription>
      </PhotoContainer>
    </>
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

const PhotoFile = styled.div`
  max-width: 615px;
  max-height: 855px;
  aspect-ratio: 1 / 1;
  /* background-color: black; */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

const CommentContainer = styled.div`
  margin-top: 5px;
`;

const CommentClickBtn = styled.button`
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);

  border: none;
  outline: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
`;

const LikesText = styled(FatText)`
  margin-top: 15px;
  display: block;
`;
