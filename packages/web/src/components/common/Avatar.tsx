import styled from "styled-components";

interface AvatarProps {
  url?: string;
  lg?: boolean;
}

function Avatar({ url = "", lg = false }: AvatarProps) {
  return <SAvatar lg={lg}>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
}
export default Avatar;

interface SAvatar {
  lg: boolean;
}

const SAvatar = styled.div<SAvatar>`
  width: ${(props) => (props.lg ? "30px" : "25px")};
  height: ${(props) => (props.lg ? "30px" : "25px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;
