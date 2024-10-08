import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Photo as PhotoGraphqlProps } from "@/__generated__/graphql";
import useModal from "@/hooks/useModal";
import PhotoModal from "@/pages/home/components/PhotoModal";
import { useState } from "react";
import Photo from "./Photo";

interface GridPhotosProps {
  photos: PhotoGraphqlProps[];
}

const GridPhotos = ({ photos = [] }: GridPhotosProps) => {
  const [curPhotoIdx, setCurPhotoIdx] = useState<number | null>(null);
  const { isModalOpened, toggleIsModalOpened } = useModal(false);

  const handlePhotoClick = (idx: number) => {
    setCurPhotoIdx(idx);
    toggleIsModalOpened();
  };

  return (
    <>
      <Grid>
        {photos.map((photo: PhotoGraphqlProps, idx) => (
          <PhotoContainer key={photo.id} onClick={() => handlePhotoClick(idx)}>
            <Photo
              src={photo.file}
              alt="photo"
              placeholder="https://via.placeholder.com/512x512"
            />
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
          </PhotoContainer>
        ))}
      </Grid>
      {curPhotoIdx !== null && (
        <PhotoModal
          photo={photos[curPhotoIdx]}
          isModalOpened={isModalOpened}
          onClose={toggleIsModalOpened}
        />
      )}
    </>
  );
};

export default GridPhotos;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 50px;
  grid-auto-rows: 29rem;

  @media ${({ theme }) => theme.device.tablet} {
    grid-auto-rows: 29vw;
  }

  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 40vw;
  }
`;

const PhotoContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const Icons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
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
