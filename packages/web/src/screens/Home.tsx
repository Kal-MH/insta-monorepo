import LoginLayout, {
  authStatusType,
} from "../components/common/layouts/LoginLayout";

import { logUserOut } from "../apollo";
import styled from "styled-components";
import PageTitle from "@/components/common/PageTitle";
import CommonLayout from "@/components/common/layouts/CommonLayout";

const Home = () => {
  return (
    <LoginLayout authStatus={authStatusType.NEED_LOGIN}>
      <CommonLayout>
        <PageTitle title="Home" />
        <Title>Welcome! InstaClone Coding</Title>
        <button onClick={() => logUserOut()}>Login out now!</button>
      </CommonLayout>
    </LoginLayout>
  );
};

export default Home;

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;
