import LoginLayout, { authStatusType } from "@/components/layouts/LoginLayout";

import CommonLayout from "@/components/layouts/CommonLayout";

import PageTitle from "@/components/PageTitle";

import ApiErrorBoundary from "@/components/error/ApiErrorBoundary";
import PhotoList from "./components/PhotoList";
import { FEED_QUERY } from "./hooks/useSeeFeeds";
import { Suspense } from "react";
import SkeletonPhoto from "./components/SkeletonPhoto";

const Home = () => {
  return (
    <LoginLayout authStatus={authStatusType.NEED_LOGIN}>
      <CommonLayout>
        <PageTitle title="Home" />
        <ApiErrorBoundary query={FEED_QUERY}>
          <Suspense fallback={<SkeletonPhoto />}>
            <PhotoList />
          </Suspense>
        </ApiErrorBoundary>
      </CommonLayout>
    </LoginLayout>
  );
};

export default Home;
