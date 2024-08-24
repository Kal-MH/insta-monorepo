import React from "react";
import LoginLayout, {
  authStatusType,
} from "../components/common/layouts/LoginLayout";

import { darkModeVar } from "../apollo";
import styled from "styled-components";
import PageTitle from "@/components/common/PageTitle";

const Home = () => {
  return (
    <LoginLayout authStatus={authStatusType.NEED_LOGIN}>
      <PageTitle title="Login" />
      <Title>Hello world!</Title>
      <button onClick={() => darkModeVar(true)}>dark on</button>
      <button onClick={() => darkModeVar(false)}>dark off</button>
    </LoginLayout>
  );
};

export default Home;

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;
