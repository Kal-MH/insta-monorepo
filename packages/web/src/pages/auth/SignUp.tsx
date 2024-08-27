import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import { Button, Password, Text } from "@insta-monorepo/design-system";

import LoginLayout, { authStatusType } from "@/components/layouts/LoginLayout";
import FormBox from "@/pages/auth/components/FormBox";
import BottomBox from "@/pages/auth/components/BottomBox";
import { pageRoutes } from "@/apiRoutes";
import { CreateAccountResult } from "@/__generated__/graphql";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "@/pages/auth/components/FormError";
import { ChangeEvent } from "react";
import PageTitle from "@/components/PageTitle";
import AuthLayout from "./components/layouts/AuthLayout";
import { FatLink } from "@/components/shared";
import { useCreateAccount } from "./hooks/useCreateAccount";

interface CreateAccountMutationResult {
  createAccount: CreateAccountResult;
}

interface FormProps {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  result?: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm<FormProps>({
    mode: "onChange",
  });

  const { onChange: fnOnChange, ...fnRest } = register("firstName", {
    required: "First Name is required.",
  });

  const { onChange: lnOnChange, ...lnRest } = register("lastName");

  const { onChange: unOnChange, ...unRest } = register("username", {
    required: "Username is required.",
  });

  const { onChange: eOnChange, ...eRest } = register("email", {
    required: "Email is required.",
  });

  const { onChange: pOnChange, ...pRest } = register("password", {
    required: "Password is required.",
  });

  const onCompleted = (data: CreateAccountMutationResult) => {
    const { username, password } = getValues();

    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error as string,
      });
      return;
    }
    navigate(pageRoutes.login, {
      state: {
        message: "Account created. Please log in.",
        username,
        password,
      },
    });
  };

  const [createAccount, { loading }] = useCreateAccount({ onCompleted });
  const onSubmitValid: SubmitHandler<FormProps> = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };

  const clearResultErrors = (
    e: ChangeEvent<HTMLInputElement>,
    fn: Function
  ) => {
    clearErrors("result");
    fn?.(e);
  };

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
          <form onSubmit={handleSubmit(onSubmitValid)}>
            <Text
              {...fnRest}
              onChange={(e) => clearResultErrors(e, fnOnChange)}
              placeholder="First Name"
            />
            <Text
              {...lnRest}
              onChange={(e) => clearResultErrors(e, lnOnChange)}
              placeholder="Last Name"
            />
            <Text
              {...unRest}
              onChange={(e) => clearResultErrors(e, unOnChange)}
              placeholder="Username"
            />
            <Text
              {...eRest}
              onChange={(e) => clearResultErrors(e, eOnChange)}
              placeholder="Email"
            />
            <Password
              {...pRest}
              onChange={(e) => clearResultErrors(e, pOnChange)}
              placeholder="Password"
            />
            <SignupButton htmlType="submit" disabled={!isValid || loading}>
              {loading ? "Loading..." : "Sign up"}
            </SignupButton>
            <FormError errorMsg={errors?.result?.message} />
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

const SignupButton = styled(Button)`
  margin-top: 12px;
`;
