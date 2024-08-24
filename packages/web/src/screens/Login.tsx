import styled from "styled-components";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AuthLayout from "@/components/auth/AuthLayout";
import FormBox from "@/components/auth/FormBox";
import LoginInput from "@/components/auth/LoginInput";
import Separator from "@/components/auth/Separator";
import BottomBox from "@/components/auth/BottomBox";

import { pageRoutes } from "@/apiRoutes";
import LoginButton from "@/components/auth/LoginButton";
import React, { useState } from "react";
import PageTitle from "@/components/common/PageTitle";

const Login = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameError("");
    setUsername(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === "") {
      setUsernameError("Not empty pls.");
    }
    if (username.length < 10) {
      setUsernameError("too short");
    }
    console.log("hello");
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit}>
          <LoginInput
            type="text"
            placeholder="Username"
            onChange={onUsernameChange}
          />
          <LoginInput type="password" placeholder="Password" />
          <LoginButton disabled={username === ""}>Log In</LoginButton>
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
