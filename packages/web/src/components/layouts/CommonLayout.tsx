import styled from "styled-components";
import { ReactNode } from "react";
import Header from "../Header";

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
