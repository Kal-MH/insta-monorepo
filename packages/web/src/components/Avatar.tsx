import styled from "styled-components";

interface AvatarProps {
  url?: string;
  lg?: boolean;
}

function Avatar({ url = "", lg = false }: AvatarProps) {
  return (
    <SAvatar
      style={{
        width: lg ? "30px" : "25px",
        height: lg ? "30px" : "25px",
      }}
    >
      {url !== "" ? <Img src={url} /> : null}
    </SAvatar>
  );
}
export default Avatar;

const SAvatar = styled.div`
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;
