import { Photo as PhotoGraphqlType } from "@/__generated__/graphql";
import Photo from "@/pages/home/components/Photo";
import { useSeeFeeds } from "../hooks/useSeeFeeds";
import { useState, useTransition } from "react";
import PhotoModal from "./PhotoModal";
import useModal from "@/hooks/useModal";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import styled from "styled-components";

const LIMIT = 3;

const PhotoList = () => {
  const { data, fetchMore } = useSeeFeeds({ variables: { limit: LIMIT } });
  const [feeds, setFeeds] = useState<PhotoGraphqlType[]>(data?.seeFeeds || []);
  const [curPhotoId, setCurPhotoId] = useState<number | null>(null);
  const { isModalOpened, toggleIsModalOpened } = useModal(false);
  const handlePhotoClick = (photoId: number) => {
    setCurPhotoId(photoId);
    toggleIsModalOpened();
  };

  const [_, startTransition] = useTransition();

  const refetchHandler = async () => {
    startTransition(() => {
      fetchMore({
        variables: {
          lastId: feeds[feeds.length - 1]?.id,
          limit: LIMIT,
        },
      }).then((nextData) => {
        setFeeds([...feeds, ...nextData.data?.seeFeeds]);
        if (nextData.data?.seeFeeds.length < LIMIT) {
          setLoadFinished(true);
        }
      });
    });
  };

  const { targetRef, setLoadFinished } = useInfiniteScroll(refetchHandler);

  return (
    <>
      <div>
        <Ul>
          {feeds.map((photo: PhotoGraphqlType, idx: number) => (
            <Li key={photo.id}>
              <Photo
                photo={photo}
                onCommentClick={() => handlePhotoClick(idx)}
              />
            </Li>
          ))}
          <li>
            <div ref={targetRef}></div>
          </li>
        </Ul>
      </div>
      {curPhotoId !== null && (
        <PhotoModal
          photo={data?.seeFeeds[curPhotoId]}
          isModalOpened={isModalOpened}
          onClose={toggleIsModalOpened}
        />
      )}
    </>
  );
};

export default PhotoList;

const Ul = styled.ul`
  padding: 45px 10px;
`;

const Li = styled.li`
  padding-bottom: 60px;
`;
