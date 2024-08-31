import styled from "styled-components";
import { ReactNode } from "react";
import Sidebar from "../Sidebar";

interface LayoutProps {
  children: ReactNode;
}

function CommonLayout({ children }: LayoutProps) {
  return (
    <>
      <Container>
        <Sidebar />
        <Content>{children}</Content>
      </Container>
    </>
  );
}

export default CommonLayout;

const Container = styled.main`
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  width: 100%;
  /* height: 100vh; */
  overflow: hidden;
`;

const Content = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  justify-content: center;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
