import styled from "styled-components";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AuthLayout from "@/components/auth/AuthLayout";
import FormBox from "@/components/auth/FormBox";
import { Password, Text } from "@insta-monorepo/design-system";
import Separator from "@/components/auth/Separator";
import BottomBox from "@/components/auth/BottomBox";

import { pageRoutes } from "@/apiRoutes";
import LoginButton from "@/components/auth/LoginButton";
import PageTitle from "@/components/common/PageTitle";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmitValid = (data) => {
    console.log(data);
  };
  const onSubmitInvalid = (data) => {
    console.log(data, "invalid");
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <Text
            {...register("username", {
              required: "Username is required",
              minLength: 5,
            })}
            name="username"
            placeholder="Username"
          />
          <Password
            {...register("password", {
              required: "Password is required.",
            })}
            name="password"
            placeholder="Password"
          />
          <LoginButton>Log In</LoginButton>
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={pageRoutes.signup}
      />
    </AuthLayout>
  );
};

export default Login;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;
