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
  width: 100%;
  overflow: hidden;

  @media ${(props) => props.theme.device.mobile} {
    flex-direction: column;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  box-sizing: border-box;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
