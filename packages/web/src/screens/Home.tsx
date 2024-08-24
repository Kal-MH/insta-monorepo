import LoginLayout, {
  authStatusType,
} from "../components/common/layouts/LoginLayout";

import { logUserOut } from "../apollo";
import styled from "styled-components";
import PageTitle from "@/components/common/PageTitle";

const Home = () => {
  return (
    <LoginLayout authStatus={authStatusType.NEED_LOGIN}>
      <PageTitle title="Home" />
      <Title>Welcome! InstaClone Coding</Title>
      <button onClick={() => logUserOut()}>Login out now!</button>
    </LoginLayout>
  );
};

export default Home;

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;
