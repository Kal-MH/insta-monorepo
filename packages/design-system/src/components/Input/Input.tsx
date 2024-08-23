import React from "react";
import styled from "styled-components";

interface SInputProps {
  width?: string;
  padding?: string;
  backgroundColor?: string;
  border?: string;
  margin?: string;
  fontSize?: string;
}

interface InputProps extends SInputProps {
  type?: string;
  placeholder?: string;
}

const Input = ({
  type,
  placeholder,
  width,
  padding,
  backgroundColor,
  border,
  margin,
  fontSize,
  ...props
}: InputProps) => {
  return (
    <SInput
      type={type}
      placeholder={placeholder}
      width={width}
      padding={padding}
      backgroundColor={backgroundColor}
      border={border}
      margin={margin}
      fontSize={fontSize}
      {...props}
    />
  );
};
export default Input;

const SInput = styled.input<SInputProps>`
  width: ${(props) => props.width || "100%"};
  border-radius: 3px;
  padding: ${(props) => props.padding || "7px"};
  background-color: ${(props) => props.backgroundColor || "#fafafa"};
  border: ${(props) => props.border || "0.5px solid rgb(219, 219, 219)"};
  margin: ${(props) => props.margin};
  box-sizing: border-box;
  font-size: ${(props) => props.fontSize};
  &::placeholder {
    font-size: ${(props) => props.fontSize};
  }
`;
