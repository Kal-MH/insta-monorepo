import {
  ApolloCache,
  gql,
  useApolloClient,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useParams } from "react-router-dom";
import { PHOTO_FRAGMENT } from "@/apollo/fragments";
import CommonLayout from "@/components/layouts/CommonLayout";
import styled from "styled-components";
import LoginLayout, { authStatusType } from "@/components/layouts/LoginLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  MutationResponse,
  Photo as PhotoGraphqlProps,
  UnfollowUserResult,
  User as UserGraphqlProps,
} from "@/__generated__/graphql";
import { Button, Avatar } from "@insta-monorepo/design-system";
import useUser from "@/hooks/useUser";
import PageTitle from "@/components/PageTitle";
import { FatText } from "@/components/shared";

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Profile = () => {
  const { username } = useParams();
  const userData = useUser();
  const client = useApolloClient();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
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
        unfollowUser: { ok },
      },
    } = result;

    if (!ok) return;

    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return false;
        },
        totalFollowers(prev) {
          return prev - 1;
        },
      },
    });

    //나의 팔로잉 리스트에서 제거
    const { me } = userData;

    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing: (prev) => prev - 1,
      },
    });
  };

  const followUserCompleted = (data: { followUser: MutationResponse }) => {
    const {
      followUser: { ok },
    } = data;

    if (!ok) return;

    const { cache } = client;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev) {
          return true;
        },
        totalFollowers(prev) {
          return prev + 1;
        },
      },
    });

    //나의 팔로잉 리스트에 추가
    const { me } = userData;
    cache.modify({
      id: `User:${me.username}`,
      fields: {
        totalFollowing: (prev) => prev + 1,
      },
    });
  };

  const [followUserMutation] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    onCompleted: followUserCompleted,
  });

  const [unFollowUserMutation] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    update: unFollowUserUpdate,
  });

  const getButton = (profiles: UserGraphqlProps) => {
    const { isMe, isFollowing } = profiles;

    if (isMe) {
      return <ProfileBtn>Edit Profile</ProfileBtn>;
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
        <div>
          <Header>
            <ProfileAvatar
              src={data?.seeProfile?.avatar}
              alt="profile"
              placeholder="/profile.png"
              size={160}
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
          <Grid>
            {data?.seeProfile?.photos.map((photo: PhotoGraphqlProps) => (
              <Photo key={photo.id} bg={photo.file}>
                <Icons>
                  <Icon>
                    <FontAwesomeIcon icon={faHeart} />
                    {photo.likes}
                  </Icon>
                  <Icon>
                    <FontAwesomeIcon icon={faComment} />
                    {photo.commentNumber}
                  </Icon>
                </Icons>
              </Photo>
            ))}
          </Grid>
        </div>
      </CommonLayout>
    </LoginLayout>
  );
};

export default Profile;

interface PhotoProps {
  bg: string;
}

const Header = styled.div`
  display: flex;
`;

const ProfileAvatar = styled(Avatar)`
  margin-left: 50px;
  margin-right: 110px;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
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
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div<PhotoProps>`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileBtn = styled(Button)`
  margin-left: 10px;
  margin-top: 0px;
  padding: 5px 10px !important;
  cursor: pointer;
`;
