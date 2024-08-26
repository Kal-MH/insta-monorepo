import LoginLayout, {
  authStatusType,
} from "../components/common/layouts/LoginLayout";

import PageTitle from "@/components/common/PageTitle";
import CommonLayout from "@/components/common/layouts/CommonLayout";
import { gql, useQuery } from "@apollo/client";

import { Photo as PhotoGraphqlType } from "@/__generated__/graphql";
import Photo from "@/components/feed/Photo";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "@/apollo/fragments";

export const FEED_QUERY = gql`
  query seeFeeds {
    seeFeeds {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      likes
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <LoginLayout authStatus={authStatusType.NEED_LOGIN}>
      <CommonLayout>
        <PageTitle title="Home" />
        {data?.seeFeeds?.map((photo: PhotoGraphqlType) => (
          <Photo key={photo.id} photo={photo} />
        ))}
      </CommonLayout>
    </LoginLayout>
  );
};

export default Home;
