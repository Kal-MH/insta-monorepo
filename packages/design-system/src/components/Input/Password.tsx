import React, { forwardRef, useState } from "react";
import Input, { InputProps } from "./Input";

import { ConfigContext } from "../utils/config";
import "./Input.styles.scss";

const Password = forwardRef<HTMLInputElement | null, InputProps>(
  ({ ...props }, ref) => {
    const classPrefix = `${ConfigContext.prefix}-input-password`;

    //기능 확장
    // - toggle버튼으로 password 보였다가 안보였다가
    // const [visible, setVisible] = useState(false);

    return (
      <Input ref={ref} type="password" className={classPrefix} {...props} />
    );
  }
);
export default Password;
