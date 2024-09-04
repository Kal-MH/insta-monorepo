import React, { ReactNode } from "react";

interface SBaseBoxProps {
  children: ReactNode;
  backgroundColor?: string;
  border?: string;
  width?: string;
  style?: React.CSSProperties;
}

const BaseBox = ({
  children,
  backgroundColor,
  border,
  width,
  style,
  ...props
}: SBaseBoxProps) => {
  const styleObj = {
    backgroundColor: backgroundColor || "white",
    border: border || "1px solid black",
    width: width || "100%",
  };

  return (
    <div style={{ ...styleObj, ...style }} {...props}>
      {children}
    </div>
  );
};

export default BaseBox;
