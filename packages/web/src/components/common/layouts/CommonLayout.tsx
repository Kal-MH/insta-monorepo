import styled from "styled-components";
import Header from "../Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function CommonLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}

export default CommonLayout;

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 930px;
  width: 100%;
`;
