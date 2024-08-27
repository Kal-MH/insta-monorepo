import React from "react";
import { ConfigContext } from "../utils/config";
import classnames from "classnames";

import "./Divider.styles.scss";

interface DividerProps {
  type?: "horizontal" | "vertical";
  className?: string;
  style?: React.CSSProperties;
}

const { prefix } = ConfigContext;

const Divider = ({
  type = "horizontal",
  className,
  style,
  ...props
}: DividerProps) => {
  const classPrefix = `${prefix}-divider`;
  const classNames = classnames(
    `${classPrefix}`,
    `${classPrefix}--${type}`,
    className
  );
  return <hr className={classNames} style={{ ...style }} {...props} />;
};

export default Divider;
