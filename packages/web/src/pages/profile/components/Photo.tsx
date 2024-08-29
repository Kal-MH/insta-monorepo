import useLazyLoadImage from "@/hooks/useLazyLoadImage";
import styled from "styled-components";

interface PhotoProps {
  src: string;
  alt: string;
  placeholder: string;
}

const Photo = ({ src, alt, placeholder }: PhotoProps) => {
  const { loaded, imageRef } = useLazyLoadImage();
  return <Image ref={imageRef} src={loaded ? src : placeholder} alt={alt} />;
};

export default Photo;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
