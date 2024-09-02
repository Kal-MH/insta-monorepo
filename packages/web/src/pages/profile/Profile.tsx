import { ApolloCache, useApolloClient } from "@apollo/client";
import { useParams } from "react-router-dom";
import CommonLayout from "@/components/layouts/CommonLayout";
import styled from "styled-components";
import LoginLayout, { authStatusType } from "@/components/layouts/LoginLayout";
import {
  MutationResponse,
  UnfollowUserResult,
  User as UserGraphqlProps,
} from "@/__generated__/graphql";
import { Button, Avatar } from "@insta-monorepo/design-system";
import PageTitle from "@/components/PageTitle";
import { FatText } from "@/components/shared";
import { useSeeProfile } from "./hooks/useSeeProfile";
import { useFollowUser } from "./hooks/useFollowUser";
import { useUnFollowUser } from "./hooks/useUnFollowUser";
import toast from "react-hot-toast";
import GridPhotos from "./components/GridPhotos";
import { useUserStore } from "@/store/user";

const Profile = () => {
  const { username } = useParams();
  const { user } = useUserStore();
  const client = useApolloClient();
  const { data, loading } = useSeeProfile({
    variables: {
      username,
    },
  });

  const unFollowUserUpdate = (
    cache: ApolloCache<UnfollowUserResult>,
    result: any
  ) => {
    const {
      data: {
        unfollowUser: { ok, error },
      },
    } = result;

    if (!ok) {
      return toast.error(error);
    }

    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing() {
          return false;
        },
        totalFollowers(prev) {
          return prev - 1;
        },
      },
    });

    //나의 팔로잉 리스트에서 제거
    const { me } = user;

    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing: (prev) => prev - 1,
      },
    });
  };

  const followUserCompleted = (data: { followUser: MutationResponse }) => {
    const {
      followUser: { ok, error },
    } = data;

    if (!ok) {
      return toast.error(error as string);
    }

    const { cache } = client;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing() {
          return true;
        },
        totalFollowers(prev) {
          return prev + 1;
        },
      },
    });

    //나의 팔로잉 리스트에 추가
    const { me } = user;
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing: (prev) => prev + 1,
      },
    });

    toast.success("팔로우 추가!");
  };

  const [followUserMutation] = useFollowUser({
    variables: {
      username,
    },
    onCompleted: followUserCompleted,
  });

  const [unFollowUserMutation] = useUnFollowUser({
    variables: {
      username,
    },
    update: unFollowUserUpdate,
  });

  const getButton = (profiles: UserGraphqlProps) => {
    const { isMe, isFollowing } = profiles;

    if (isMe) {
      //TODO: Edit Profile
      // return <ProfileBtn>Edit Profile</ProfileBtn>;
      return null;
    }
    if (isFollowing) {
      return (
        <ProfileBtn
          onClick={() => {
            unFollowUserMutation();
          }}
        >
          Unfollow
        </ProfileBtn>
      );
    } else {
      return (
        <ProfileBtn
          onClick={() => {
            followUserMutation();
          }}
        >
          Follow
        </ProfileBtn>
      );
    }
  };

  return (
    <LoginLayout authStatus={authStatusType.NEED_LOGIN}>
      <CommonLayout>
        <PageTitle
          title={
            loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile`
          }
        />
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
                {data?.seeProfile ? getButton(data.seeProfile) : null}
              </Row>
              <Row>
                <List>
                  <Item>
                    <span>
                      <Value>{data?.seeProfile?.totalFollowers}</Value>{" "}
                      followers
                    </span>
                  </Item>
                  <Item>
                    <span>
                      <Value>{data?.seeProfile?.totalFollowing}</Value>{" "}
                      following
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
      </CommonLayout>
    </LoginLayout>
  );
};

export default Profile;

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

const ProfileBtn = styled(Button)`
  margin-left: 10px;
  margin-top: 0px;
  padding: 5px 10px !important;
  cursor: pointer;
`;

const PhotoContainer = styled.div`
  padding-bottom: 45px;
`;
