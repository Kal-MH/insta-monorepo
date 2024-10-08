import styled from "styled-components";
import Cookies from "js-cookie";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AuthLayout from "@/pages/auth/components/layouts/AuthLayout";
import FormBox from "@/pages/auth/components/FormBox";
import { Button, Password, Text } from "@insta-monorepo/design-system";
import Separator from "./components/Separator";
import BottomBox from "@/pages/auth/components/BottomBox";

import { pageRoutes } from "@/apiRoutes";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "@/pages/auth/components/FormError";
import { LoginResult } from "@/__generated__/graphql";
import LoginLayout, { authStatusType } from "@/components/layouts/LoginLayout";
import { useLocation } from "react-router-dom";
import PageTitle from "@/components/PageTitle";
import { useLogin } from "./hooks/useLogin";
import { TOKEN, useUserStore } from "@/store/user";
import useModal from "@/hooks/useModal";
import AvailableUser from "./components/AvailableUser";

interface FormProps {
  username: string;
  password: string;
  result?: string;
}

interface LoginMutationResult {
  login: LoginResult;
}

const Login = () => {
  const location = useLocation();
  const { setIsLoggedIn } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    setError,
    clearErrors,
  } = useForm<FormProps>({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });

  const { isModalOpened, toggleIsModalOpened } = useModal();
  const handleAvailableUserClick = (username: string, password: string) => {
    setValue("username", username, { shouldValidate: true });
    setValue("password", password, { shouldValidate: true });
  };

  const { onChange: unOnChange, ...unRest } = register("username", {
    required: "Username is required",
    minLength: {
      value: 5,
      message: "Username should be longer than 5 chars.",
    },
  });

  const { onChange: pOnChange, ...pRest } = register("password", {
    required: "Password is required.",
  });

  const onCompleted = (data: LoginMutationResult) => {
    const {
      login: { ok, token, error },
    } = data;

    if (!ok) {
      return setError("result", {
        message: error as string,
      });
    }

    if (token) {
      Cookies.set(TOKEN, token);
      setIsLoggedIn(true);
    }
  };

  const [login, { loading }] = useLogin({ onCompleted });

  const onSubmitValid: SubmitHandler<FormProps> = (data) => {
    const { username, password } = data;
    login({
      variables: {
        username,
        password,
      },
    });
  };

  const clearLoginResultError = () => {
    clearErrors("result");
  };

  return (
    <LoginLayout authStatus={authStatusType.NEED_NOT_LOGIN}>
      <AuthLayout>
        <PageTitle title="Login" />
        <FormBox>
          <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <Notification>{location?.state?.message}</Notification>
          <form onSubmit={handleSubmit(onSubmitValid)}>
            <Text
              onChange={(e) => {
                clearLoginResultError();
                unOnChange?.(e);
              }}
              {...unRest}
              name="username"
              placeholder="Username"
              status={errors?.username?.message ? "error" : undefined}
            />
            <FormError errorMsg={errors?.username?.message} />
            <Password
              onChange={(e) => {
                clearLoginResultError();
                pOnChange?.(e);
              }}
              {...pRest}
              name="password"
              placeholder="Password"
              status={errors?.password?.message ? "error" : undefined}
            />
            <FormError errorMsg={errors?.password?.message} />
            <LoginButton htmlType="submit" disabled={!isValid || loading}>
              {loading ? "...loading" : "Log In"}
            </LoginButton>
            <FormError errorMsg={errors?.result?.message} />
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
        <AvailableUserContainer>
          <button onClick={() => toggleIsModalOpened()}>AvailableUser</button>
          {isModalOpened && (
            <AvailableUser
              isModalOpened={isModalOpened}
              onClose={toggleIsModalOpened}
              onClick={handleAvailableUserClick}
            />
          )}
        </AvailableUserContainer>
      </AuthLayout>
    </LoginLayout>
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

const Notification = styled.div`
  color: #2ecc71;
`;

const LoginButton = styled(Button)`
  margin-top: 12px;
`;

const AvailableUserContainer = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: center;

  button {
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    color: ${(props) => props.theme.accent};

    &:hover {
      text-decoration: underline;
    }
  }
`;
