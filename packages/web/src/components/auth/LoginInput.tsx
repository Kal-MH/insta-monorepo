import styled from "styled-components";
import { Input } from "@insta-monorepo/design-system";
import React from "react";

interface LoginInputProps {
  type: string;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const LoginInput = ({ type, placeholder, onChange }: LoginInputProps) => {
  return (
    <SLoginInput onChange={onChange} type={type} placeholder={placeholder} />
  );
};

const SLoginInput = styled(Input)`
  margin-top: 5px;

  &::placeholder {
    font-size: 12px;
  }
`;

export default LoginInput;
