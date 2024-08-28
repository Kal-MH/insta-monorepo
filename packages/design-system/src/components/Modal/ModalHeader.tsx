import React from "react";
import classnames from "classnames";
import { ConfigContext } from "../utils/config";

interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
  headerStyle?: React.CSSProperties;
}

const ModalHeader = ({
  children,
  className,
  headerStyle,
}: ModalHeaderProps) => {
  const { prefix } = ConfigContext;
  const classPrefix = `${prefix}-modal--header`;
  const classNames = classnames(classPrefix, className);
  return (
    <div className={classNames} style={{ ...headerStyle }}>
      {children}
    </div>
  );
};

export default ModalHeader;
