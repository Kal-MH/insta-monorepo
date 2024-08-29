import { Avatar, Modal, ModalContent } from "@insta-monorepo/design-system";
import { Comment as CommentGraphqlType, Photo } from "@/__generated__/graphql";
import styled from "styled-components";
import { FatText } from "@/components/shared";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import LikesAction from "./LikesAction";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PhotoModalProps {
  photo: Photo;
  isModalOpened: boolean;
  onClose: () => void;
}

const PhotoModal = ({ photo, isModalOpened, onClose }: PhotoModalProps) => {
  const { id, file, user, isLiked, likes } = photo;

  return (
    <Modal open={isModalOpened} onClose={onClose}>
      <ModalContent>
        <Container>
          <LeftContainer>
            <img src={file} alt="photo" />
          </LeftContainer>
          <RightContainer>
            <Header>
              <Link to={`/users/${user.username}`}>
                <AvatarContainer>
                  <Avatar
                    src={photo.user.avatar as string}
                    alt="avatar"
                    placeholder="/profile.png"
                    size={34}
                  />
                </AvatarContainer>
              </Link>
              <Link to={`/users/${user.username}`}>
                <Username>{photo.user.username}</Username>
              </Link>
            </Header>
            <Content>
              <Caption>
                <Comment
                  author={photo.user.username}
                  payload={photo.caption || ""}
                />
              </Caption>
              <Comments
                photoId={photo.id}
                comments={(photo.comments as CommentGraphqlType[]) || []}
              />
            </Content>
            <Footer>
              <PhotoActionContainer>
                <PhotoActions>
                  <LikesAction photoId={id} isLiked={isLiked} />
                  <PhotoAction>
                    <FontAwesomeIcon icon={faComment} />
                  </PhotoAction>
                </PhotoActions>
                <LikesText>{`좋아요 ${likes}개`}</LikesText>
              </PhotoActionContainer>
              <CommentFormContainer>
                <CommentForm photoId={photo.id} />
              </CommentFormContainer>
            </Footer>
          </RightContainer>
        </Container>
      </ModalContent>
    </Modal>
  );
};

export default PhotoModal;

const Container = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  background-color: black;
  max-height: 855px;
  max-width: 855px;
  aspect-ratio: 1 / 1;
  flex-basis: 855px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    height: 100%;
    object-fit: contain;
  }
`;
const RightContainer = styled.div`
  min-width: 370px;
  max-height: 855px;
  background-color: white;

  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);

  padding: 0 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  a {
    display: flex;
    align-items: center;
  }
`;

const AvatarContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(45deg, #fcb045, #fd1d1d, #833ab4);

  padding: 3px;
  border-radius: 50%;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 10px 15px;

  max-height: 500px;
  overflow-y: auto;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Caption = styled.div`
  line-height: 1;
  margin-bottom: 30px;
`;

const Footer = styled.div`
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.0975);
`;

const PhotoActionContainer = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;

  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  cursor: pointer;
  margin-right: 10px;
`;

const LikesText = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const CommentFormContainer = styled.div`
  padding-left: 15px;
  padding-bottom: 10px;

  border-top: 1px solid ${(props) => props.theme.borderColor};
  div {
    margin-top: 0;
    border: none;
  }
`;
