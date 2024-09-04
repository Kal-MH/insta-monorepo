import { SkeletonBox, SkeletonParagraph } from "@insta-monorepo/design-system";
import styled from "styled-components";

const SkeletonGrid = () => {
  return (
    <Container>
      <ParagraphContainer>
        <SkeletonParagraph />
      </ParagraphContainer>
      <Grid>
        {Array.from({ length: 9 }).map((_, idx) => (
          <SkeletonBox key={idx} />
        ))}
      </Grid>
    </Container>
  );
};

export default SkeletonGrid;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 20rem;
`;

const ParagraphContainer = styled.div`
  width: 60rem;

  @media ${({ theme }) => theme.device.mobile} {
    width: 40rem;
  }
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  max-width: 60rem;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 50px;
  grid-auto-rows: 20rem;

  @media ${({ theme }) => theme.device.mobile} {
    max-width: 40rem;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 15rem;
  }
`;
