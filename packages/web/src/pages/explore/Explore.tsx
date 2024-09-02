import { Button, Avatar } from "@insta-monorepo/design-system";

import CommonLayout from "@/components/layouts/CommonLayout";
import { useSearchParams } from "react-router-dom";
import { useSearchPhoto } from "./hooks/useSearchPhoto";
import GridPhotos from "../profile/components/GridPhotos";
import styled from "styled-components";
import LoginLayout, { authStatusType } from "@/components/layouts/LoginLayout";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useState } from "react";

const LIMIT = 8;

const Explore = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("tag");

  const { data, fetchMore } = useSearchPhoto({
    variables: {
      keyword,
      limit: LIMIT,
    },
  });

  const firstPhoto = data?.searchPhoto[0];
  const [photos, setPhotos] = useState(data?.searchPhoto || []);
  const { targetRef, setLoadFinished } = useInfiniteScroll(async () => {
    const nextData = await fetchMore({
      variables: {
        lastId: photos[photos.length - 1]?.id,
        limit: LIMIT,
      },
    });

    setPhotos([...photos, ...nextData.data?.searchPhoto]);
    if (nextData.data?.searchPhoto.length < LIMIT) {
      setLoadFinished(true);
    }
  });

  return (
    <LoginLayout authStatus={authStatusType.NEED_LOGIN}>
      <CommonLayout>
        <Container>
          <ProfileContainer>
            <ProfileAvatar>
              <Avatar
                src={firstPhoto?.user?.avatar}
                alt="profile"
                placeholder="/profile.png"
                size="clamp(120px, 20vw, 16rem)"
              />
            </ProfileAvatar>
            <DescriptionContainer>
              <Keyword>#{keyword}</Keyword>
              <Button size="large">팔로우</Button>
            </DescriptionContainer>
          </ProfileContainer>
          <PhotoContainer>
            <GridPhotos photos={photos} />
            <div ref={targetRef} />
          </PhotoContainer>
        </Container>
      </CommonLayout>
    </LoginLayout>
  );
};

export default Explore;

const Container = styled.div`
  width: 100%;
  max-width: 930px;
  padding: 45px 16px;
`;

const ProfileContainer = styled.div`
  display: flex;
`;

const ProfileAvatar = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
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
`;

const Keyword = styled.h3`
  font-size: 28px;
  font-size: clamp(2.2rem, 2vw, 2.8rem);
  font-weight: 400;
`;

const PhotoContainer = styled.div`
  padding-bottom: 45px;
`;
