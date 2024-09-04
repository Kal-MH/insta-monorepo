import { useParams } from "react-router-dom";
import CommonLayout from "@/components/layouts/CommonLayout";
import LoginLayout, { authStatusType } from "@/components/layouts/LoginLayout";
import PageTitle from "@/components/PageTitle";
import ApiErrorBoundary from "@/components/error/ApiErrorBoundary";
import { Suspense } from "react";
import ProfileWithPhoto from "./components/ProfileWithPhoto";
import SkeletonGrid from "../explore/components/SkeletonGrid";
import { SEE_PROFILE_QUERY } from "./hooks/useSeeProfile";

const Profile = () => {
  const { username } = useParams();

  return (
    <LoginLayout authStatus={authStatusType.NEED_LOGIN}>
      <CommonLayout>
        <PageTitle title={`${username}'s Profile`} />
        <ApiErrorBoundary query={SEE_PROFILE_QUERY}>
          <Suspense fallback={<SkeletonGrid />}>
            <ProfileWithPhoto username={username as string} />
          </Suspense>
        </ApiErrorBoundary>
      </CommonLayout>
    </LoginLayout>
  );
};

export default Profile;
