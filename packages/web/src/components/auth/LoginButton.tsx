import styled from "styled-components";
import { ReactNode } from "react";
import { Button } from "@insta-monorepo/design-system";

const SButton = styled(Button)`
  color: white;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
`;

interface SButtonProps {
  children: ReactNode;
  disabled?: boolean;
}

const LoginButton = ({ children, disabled, ...props }: SButtonProps) => {
  return (
    <SButton type="submit" disabled={disabled} {...props}>
      {children}
    </SButton>
  );
};

export default LoginButton;
