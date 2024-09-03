import React from "react";
import classnames from "classnames";
import { ConfigContext } from "../utils/config";

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
  contentStyle?: React.CSSProperties;
}

const ModalContent = ({
  children,
  className,
  contentStyle,
}: ModalContentProps) => {
  const { prefix } = ConfigContext;
  const classPrefix = `${prefix}-modal--content`;
  const classNames = classnames(classPrefix, className);
  return (
    <div className={classNames} style={{ ...contentStyle }}>
      {children}
    </div>
  );
};

export default ModalContent;
