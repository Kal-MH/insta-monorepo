import { Button, Avatar } from "@insta-monorepo/design-system";

import CommonLayout from "@/components/layouts/CommonLayout";
import { useSearchParams } from "react-router-dom";
import { useSearchPhoto } from "./hooks/useSearchPhoto";
import GridPhotos from "../profile/components/GridPhotos";
import styled from "styled-components";
import LoginLayout, { authStatusType } from "@/components/layouts/LoginLayout";

const Explore = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("tag");

  const { data } = useSearchPhoto({
    variables: {
      keyword,
    },
  });

  const firstPhoto = data?.searchPhoto[0];

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
          <GridPhotos photos={data?.searchPhoto} />
        </Container>
      </CommonLayout>
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
