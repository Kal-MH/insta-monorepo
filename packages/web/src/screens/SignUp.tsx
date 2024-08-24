import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import { Password, Text } from "@insta-monorepo/design-system";

import LoginLayout, {
  authStatusType,
} from "@/components/common/layouts/LoginLayout";
import { FatLink } from "@/components/common/shared";
import AuthLayout from "@/components/auth/AuthLayout";
import FormBox from "@/components/auth/FormBox";
import LoginButton from "@/components/auth/LoginButton";
import BottomBox from "@/components/auth/BottomBox";
import { pageRoutes } from "@/apiRoutes";
import PageTitle from "@/components/common/PageTitle";

const SignUp = () => {
  return (
    <LoginLayout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <PageTitle title="Login" />
      <AuthLayout>
        <FormBox>
          <HeaderContainer>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
            <Subtitle>
              Sign up to see photos and videos from your friends.
            </Subtitle>
          </HeaderContainer>
          <form>
            <Text placeholder="Name" />
            <Text placeholder="Email" />
            <Text placeholder="Username" />
            <Password placeholder="Password" />
            <LoginButton>Sign up</LoginButton>
          </form>
        </FormBox>
        <BottomBox
          cta="Have an account?"
          linkText="Log in"
          link={pageRoutes.home}
        />
      </AuthLayout>
    </LoginLayout>
  );
};

export default SignUp;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;
