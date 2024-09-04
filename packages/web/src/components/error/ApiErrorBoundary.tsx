import { ErrorBoundary } from "react-error-boundary";

import { Button } from "@insta-monorepo/design-system";
import styled from "styled-components";
import { client } from "@/apollo/apollo";
import { DocumentNode } from "graphql";

interface ApiFallbackComponentProps {
  error: Error;
  resetErrorBoundary: (...args: any[]) => void;
}

interface ApiErrorBoundaryProps {
  children: React.ReactNode;
  query: DocumentNode;
}

const ApiFallbackComponent = ({
  resetErrorBoundary,
}: ApiFallbackComponentProps) => {
  return (
    <Container>
      <ErrorButton onClick={resetErrorBoundary}>다시하기!</ErrorButton>
    </Container>
  );
};

const ApiErrorBoundary = ({ children, query }: ApiErrorBoundaryProps) => {
  const handleRefetch = async () => {
    await client.refetchQueries({ include: [query] });
  };
  return (
    <ErrorBoundary
      FallbackComponent={ApiFallbackComponent}
      onReset={handleRefetch}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ApiErrorBoundary;

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorButton = styled(Button)`
  width: 100px;
`;
