import LoginLayout, { authStatusType } from "@/components/layouts/LoginLayout";

import CommonLayout from "@/components/layouts/CommonLayout";

import { Photo as PhotoGraphqlType } from "@/__generated__/graphql";
import Photo from "@/pages/home/components/Photo";
import PageTitle from "@/components/PageTitle";
import { useSeeFeeds } from "./hooks/useSeeFeeds";
import { useState } from "react";
import PhotoModal from "./components/PhotoModal";
import useModal from "@/hooks/useModal";

const Home = () => {
  const { data } = useSeeFeeds();
  const [curPhotoId, setCurPhotoId] = useState<number | null>(null);
  const { isModalOpened, toggleIsModalOpened } = useModal(false);
  const handlePhotoClick = (photoId: number) => {
    setCurPhotoId(photoId);
    toggleIsModalOpened();
  };

  return (
    <LoginLayout authStatus={authStatusType.NEED_LOGIN}>
      <CommonLayout>
        <PageTitle title="Home" />
        <ul>
          {data?.seeFeeds?.map((photo: PhotoGraphqlType, idx: number) => (
            <Photo
              key={photo.id}
              photo={photo}
              onCommentClick={() => handlePhotoClick(idx)}
            />
          ))}
        </ul>
        {curPhotoId !== null && (
          <PhotoModal
            photo={data?.seeFeeds[curPhotoId]}
            isModalOpened={isModalOpened}
            onClose={toggleIsModalOpened}
          />
        )}
      </CommonLayout>
    </LoginLayout>
  );
};

export default Home;
