import CommonLayout from "@/components/layouts/CommonLayout";
import { useSearchParams } from "react-router-dom";
import { SEARCH_PHOTO_QUERY } from "./hooks/useSearchPhoto";
import LoginLayout, { authStatusType } from "@/components/layouts/LoginLayout";
import ApiErrorBoundary from "@/components/error/ApiErrorBoundary";
import PhotoList from "./components/PhotoList";

const Explore = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("tag");

  return (
    <LoginLayout authStatus={authStatusType.NEED_LOGIN}>
      <CommonLayout>
        <ApiErrorBoundary query={SEARCH_PHOTO_QUERY}>
          <PhotoList keyword={keyword as string} />
        </ApiErrorBoundary>
      </CommonLayout>
    </LoginLayout>
  );
};

export default Explore;
