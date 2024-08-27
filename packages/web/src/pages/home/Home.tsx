import LoginLayout, { authStatusType } from "@/components/layouts/LoginLayout";

import CommonLayout from "@/components/layouts/CommonLayout";

import { Photo as PhotoGraphqlType } from "@/__generated__/graphql";
import Photo from "@/pages/profile/components/Photo";
import PageTitle from "@/components/PageTitle";
import { useSeeFeeds } from "./hooks/useSeeFeeds";

const Home = () => {
  const { data } = useSeeFeeds();

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
