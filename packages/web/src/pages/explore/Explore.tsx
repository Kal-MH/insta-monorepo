import { Button, Avatar } from "@insta-monorepo/design-system";

import CommonLayout from "@/components/layouts/CommonLayout";
import { useSearchParams } from "react-router-dom";
import { useSearchPhoto } from "./hooks/useSearchPhoto";
import GridPhotos from "../profile/components/GridPhotos";
import styled from "styled-components";
import LoginLayout, { authStatusType } from "@/components/layouts/LoginLayout";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { useState } from "react";

const LIMIT = 6;

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
            <ProfileAvatar
              src={firstPhoto?.user?.avatar}
              alt="profile"
              placeholder="/profile.png"
              size={160}
            />
            <DescriptionContainer>
              <Keyword>#{keyword}</Keyword>
              <Button size="large">팔로우</Button>
            </DescriptionContainer>
          </ProfileContainer>
          <GridPhotos photos={photos} />
        </Container>
      </CommonLayout>
      <div ref={targetRef} />
    </LoginLayout>
  );
};

export default Explore;

const Container = styled.div`
  width: 100%;
  max-width: 930px;
  padding: 0 16px;
`;

const ProfileContainer = styled.div`
  display: flex;
`;

const ProfileAvatar = styled(Avatar)`
  margin-left: 50px;
  margin-right: 110px;
`;

const DescriptionContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`;

const Keyword = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
