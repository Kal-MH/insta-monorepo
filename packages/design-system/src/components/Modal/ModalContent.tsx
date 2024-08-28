import React from "react";
import classnames from "classnames";
import { ConfigContext } from "../utils/config";

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
  footerStyle?: React.CSSProperties;
}

const ModalContent = ({
  children,
  className,
  footerStyle,
}: ModalContentProps) => {
  const { prefix } = ConfigContext;
  const classPrefix = `${prefix}-modal--content`;
  const classNames = classnames(classPrefix, className);
  return (
    <div className={classNames} style={{ ...footerStyle }}>
      {children}
    </div>
  );
};

export default ModalContent;
