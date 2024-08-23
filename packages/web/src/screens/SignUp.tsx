import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import LoginLayout, {
  authStatusType,
} from "@/components/common/layouts/LoginLayout";
import { FatLink } from "@/components/common/shared";
import AuthLayout from "@/components/auth/AuthLayout";
import FormBox from "@/components/auth/FormBox";
import LoginInput from "@/components/auth/LoginInput";
import LoginButton from "@/components/auth/LoginButton";
import BottomBox from "@/components/auth/BottomBox";
import { pageRoutes } from "@/apiRoutes";

const SignUp = () => {
  return (
    <LoginLayout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <AuthLayout>
        <FormBox>
          <HeaderContainer>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
            <Subtitle>
              Sign up to see photos and videos from your friends.
            </Subtitle>
          </HeaderContainer>
          <form>
            <LoginInput type="text" placeholder="Name" />
            <LoginInput type="text" placeholder="Email" />
            <LoginInput type="text" placeholder="Username" />
            <LoginInput type="password" placeholder="Password" />
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
