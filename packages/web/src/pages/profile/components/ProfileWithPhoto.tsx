import styled from "styled-components";
import { Avatar } from "@insta-monorepo/design-system";
import { FatText } from "@/components/shared";
import { useSeeProfile } from "../hooks/useSeeProfile";
import FollowButton from "./FollowButton";
import GridPhotos from "./GridPhotos";

interface ProfileWithPhotoProps {
  username: string;
}

const ProfileWithPhoto = ({ username }: ProfileWithPhotoProps) => {
  const { data } = useSeeProfile({
    variables: {
      username,
    },
  });
  return (
    <Container>
      <Header>
        <ProfileAvatar
          src={data?.seeProfile?.avatar}
          alt="profile"
          placeholder="/profile.png"
          size="clamp(120px, 20vw, 16rem)"
        />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile ? (
              <FollowButton
                isMe={data?.seeProfile?.isMe}
                isFollowing={data?.seeProfile?.isFollowing}
                username={username as string}
              />
            ) : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName}
              {"  "}
              {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <PhotoContainer>
        <GridPhotos photos={data?.seeProfile?.photos} />
      </PhotoContainer>
    </Container>
  );
};

export default ProfileWithPhoto;

const Header = styled.div`
  display: flex;
  padding-left: 5%;
`;

const Container = styled.div`
  width: 100%;
  max-width: 930px;
  padding: 45px 16px;
`;

const ProfileAvatar = styled(Avatar)`
  width: 100%;
  height: 100%;
`;
const Column = styled.div`
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Username = styled.h3`
  font-size: clamp(2.2rem, 2vw, 2.8rem);
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: clamp(1.2rem, 1.5vw, 1.6rem);
  display: flex;
  align-items: center;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: clamp(1.4rem, 1.6vw, 1.8rem);
`;
const Name = styled(FatText)`
  font-size: clamp(1.4rem, 1.6vw, 2rem);
`;

const PhotoContainer = styled.div`
  padding-bottom: 45px;
`;
