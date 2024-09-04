import styled from "styled-components";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useState, useTransition } from "react";
import { useSearchPhoto } from "../hooks/useSearchPhoto";
import GridPhotos from "@/pages/profile/components/GridPhotos";
import { Avatar } from "@insta-monorepo/design-system";
import FollowButton from "@/pages/profile/components/FollowButton";
import { Link } from "react-router-dom";

interface PhotoListProps {
  keyword: string;
}

const LIMIT = 8;

const PhotoList = ({ keyword }: PhotoListProps) => {
  const { data, fetchMore } = useSearchPhoto({
    variables: {
      keyword,
      limit: LIMIT,
    },
  });

  const firstPhoto = data?.searchPhoto[0];
  const [photos, setPhotos] = useState(data?.searchPhoto || []);

  const [_, startTransition] = useTransition();

  const refetchHandler = async () => {
    startTransition(() => {
      fetchMore({
        variables: {
          lastId: photos[photos.length - 1]?.id,
          limit: LIMIT,
        },
      }).then((nextData) => {
        setPhotos([...photos, ...nextData.data?.searchPhoto]);
        if (nextData.data?.searchPhoto.length < LIMIT) {
          setLoadFinished(true);
        }
      });
    });
  };
  const { targetRef, setLoadFinished } = useInfiniteScroll(refetchHandler);

  return (
    <Container>
      <ProfileContainer>
        <ProfileAvatar>
          <Link to={`/${firstPhoto?.user?.username}`}>
            <Avatar
              src={firstPhoto?.user?.avatar as string}
              alt="profile"
              placeholder="/profile.png"
              size="clamp(120px, 20vw, 16rem)"
            />
          </Link>
        </ProfileAvatar>
        <DescriptionContainer>
          <Keyword>#{keyword}</Keyword>
          <FollowButton
            isMe={firstPhoto?.user?.isMe as boolean}
            isFollowing={firstPhoto?.user?.isFollowing as boolean}
            username={firstPhoto?.user?.username as string}
          />
        </DescriptionContainer>
      </ProfileContainer>
      <PhotoContainer>
        <GridPhotos photos={photos} />
        <div ref={targetRef} />
      </PhotoContainer>
    </Container>
  );
};

export default PhotoList;

const ProfileContainer = styled.div`
  display: flex;
`;

const ProfileAvatar = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const DescriptionContainer = styled.div`
  flex: 2;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;

  @media ${({ theme }) => theme.device.mobile} {
    flex: 1;
  }

  button {
    height: 3rem;
    margin-left: 0;
  }
`;

const Keyword = styled.h3`
  font-size: 28px;
  font-size: clamp(2.2rem, 2vw, 2.8rem);
  font-weight: 400;
`;

const Container = styled.div`
  width: 100%;
  max-width: 930px;
  padding: 45px 16px;
`;

const PhotoContainer = styled.div`
  padding-bottom: 45px;
`;
