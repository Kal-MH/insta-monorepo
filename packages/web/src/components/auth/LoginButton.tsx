import { ReactNode } from "react";
import { Button } from "@insta-monorepo/design-system";

interface SButtonProps {
  children: ReactNode;
  disabled?: boolean;
}

const LoginButton = ({ children, disabled, ...props }: SButtonProps) => {
  return (
    <Button htmlType="submit" disabled={disabled} {...props}>
      {children}
    </Button>
  );
};

export default LoginButton;
