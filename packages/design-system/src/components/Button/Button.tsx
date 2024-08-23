import React from "react";
import styled from "styled-components";

interface SButtonProps {
  color?: string;
  margin?: string;
  backgroundColor?: string;
  padding?: string;
  fontWeight?: string;
  width?: string;
}

interface ButtonProps extends SButtonProps {
  type: string;
}

function Button({
  type,
  color,
  margin,
  backgroundColor,
  padding,
  fontWeight,
  width,
  ...props
}) {
  return (
    <SButton
      type={type}
      color={color}
      margin={margin}
      backgroundColor={backgroundColor}
      padding={padding}
      fontWeight={fontWeight}
      width={width}
      {...props}
    />
  );
}
export default Button;

const SButton = styled.button<SButtonProps>`
  border: none;
  border-radius: 3px;
  color: ${(props) => props.color || "black"};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.backgroundColor};
  text-align: center;
  padding: ${(props) => props.padding};
  font-weight: ${(props) => props.fontWeight};
  width: ${(props) => props.width};
`;
