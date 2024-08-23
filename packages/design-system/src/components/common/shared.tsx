import React, { ReactNode } from "react";
import styled from "styled-components";

interface SBaseBoxProps {
  children: ReactNode;
  backgroundColor?: string;
  border?: string;
  width?: string;
}

const BaseBox = ({
  children,
  backgroundColor,
  border,
  width,
  ...props
}: SBaseBoxProps) => {
  return (
    <SBaseBox
      backgroundColor={backgroundColor}
      border={border}
      width={width}
      {...props}
    >
      {children}
    </SBaseBox>
  );
};

export default BaseBox;

const SBaseBox = styled.div<SBaseBoxProps>`
  background-color: ${(props) => props.backgroundColor || "white"};
  border: ${(props) => props.border || "1px solid black"};
  width: ${(props) => props.width || "100%"};
`;
