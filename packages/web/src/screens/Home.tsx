import LoginLayout, {
  authStatusType,
} from "../components/common/layouts/LoginLayout";

import PageTitle from "@/components/common/PageTitle";
import CommonLayout from "@/components/common/layouts/CommonLayout";
import { gql, useQuery } from "@apollo/client";

import { Photo as PhotoGraphqlType } from "@/__generated__/graphql";
import Photo from "@/components/feed/Photo";

export const FEED_QUERY = gql`
  query seeFeeds {
    seeFeeds {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      createdAt
      isMine
      isLiked
    }
  }
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <LoginLayout authStatus={authStatusType.NEED_LOGIN}>
      <CommonLayout>
        <PageTitle title="Home" />
        {data?.seeFeeds?.map((photo: PhotoGraphqlType) => (
          <Photo
            key={photo.id}
            id={photo.id}
            user={photo.user}
            file={photo.file}
            isLiked={photo.isLiked}
            likes={photo.likes}
          />
        ))}
      </CommonLayout>
    </LoginLayout>
  );
};

export default Home;
