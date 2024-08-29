import styled from "styled-components";
import { ReactNode } from "react";
import Sidebar from "../Sidebar";

interface LayoutProps {
  children: ReactNode;
}

function CommonLayout({ children }: LayoutProps) {
  return (
    <>
      <Content>{children}</Content>
      <Sidebar />
    </>
  );
}

export default CommonLayout;

const Content = styled.main`
  min-width: 930px;
  padding: 0 16px;

  margin: 0 auto;
  margin-top: 45px;
  margin-left: ${(props) => props.theme.navWidth.max};
  display: flex;
  justify-content: center;

  @media ${(props) => props.theme.device.tablet} {
    margin-left: ${(props) => props.theme.navWidth.min};
  }
`;
