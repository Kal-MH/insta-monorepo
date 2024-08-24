import styled from "styled-components";
import { Input } from "@insta-monorepo/design-system";
import React, { forwardRef } from "react";

interface LoginInputProps {
  type: string;
  name?: string;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(
  ({ type, name, placeholder, onChange }, ref) => {
    return (
      <SLoginInput
        ref={ref}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
      />
    );
  }
);

const SLoginInput = styled(Input)`
  margin-top: 5px;

  &::placeholder {
    font-size: 12px;
  }
`;

export default LoginInput;
