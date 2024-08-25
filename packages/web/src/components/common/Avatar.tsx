import styled from "styled-components";

function Avatar({ url = "" }) {
  return <SAvatar>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
}
export default Avatar;

const SAvatar = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 15px;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;
