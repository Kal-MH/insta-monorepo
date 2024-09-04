import { SkeletonBox, SkeletonParagraph } from "@insta-monorepo/design-system";
import styled from "styled-components";

const SkeletonPhoto = () => {
  return (
    <Container>
      <Box />
      <Paragraph />
    </Container>
  );
};

export default SkeletonPhoto;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled(SkeletonBox)`
  width: 55rem;
  height: 30rem;
  margin-bottom: 2rem;
  @media ${({ theme }) => theme.device.mobile} {
    width: 40rem;
  }
`;

const Paragraph = styled(SkeletonParagraph)`
  width: 55rem;

  @media ${({ theme }) => theme.device.mobile} {
    width: 40rem;
  }
`;
