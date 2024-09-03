import styled from "styled-components";
import { Button } from "@insta-monorepo/design-system";
import {
  MutationResponse,
  UnfollowUserResult,
  User as UserGraphqlProps,
} from "@/__generated__/graphql";
import { ApolloCache } from "@apollo/client";
import toast from "react-hot-toast";
import { client } from "@/apollo/apollo";
import { useFollowUser } from "../hooks/useFollowUser";
import { useUnFollowUser } from "../hooks/useUnFollowUser";
import { useUserStore } from "@/store/user";

interface FollowButtonProps {
  isMe: boolean;
  isFollowing: boolean;
  username: string;
}

const FollowButton = ({ isMe, isFollowing, username }: FollowButtonProps) => {
  const { user } = useUserStore();

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

export default FollowButton;

const ProfileBtn = styled(Button)`
  margin-left: 10px;
  margin-top: 0px;
  padding: 5px 10px !important;
  cursor: pointer;
`;
