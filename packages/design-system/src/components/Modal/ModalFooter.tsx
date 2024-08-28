import React from "react";
import classnames from "classnames";
import { ConfigContext } from "../utils/config";

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
  footerStyle?: React.CSSProperties;
}

const ModalFooter = ({
  children,
  className,
  footerStyle,
}: ModalFooterProps) => {
  const { prefix } = ConfigContext;
  const classPrefix = `${prefix}-modal--footer`;
  const classNames = classnames(classPrefix, className);
  return (
    <div className={classNames} style={{ ...footerStyle }}>
      {children}
    </div>
  );
};

export default ModalFooter;
