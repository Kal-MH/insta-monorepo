import { forwardRef } from "react";
import Input, { InputProps } from "./Input";

import "./Input.styles.scss";

const Text = forwardRef<HTMLInputElement | null, InputProps>(
  ({ ...props }, ref) => {
    return <Input ref={ref} type="text" {...props} />;
  }
);
export default Text;
