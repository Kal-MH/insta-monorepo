import React, { forwardRef } from "react";
import styled from "styled-components";
import classNames from "classnames";

import { ConfigContext } from "../utils/config";

import "./Button.styles.scss";

export type ButtonType = "basic" | "danger";
export type ButtonHtmlType = "button" | "submit" | "reset";
export type ButtonSizeType = "small" | "normal" | "large";

export interface ButtonProps {
  children?: React.ReactNode;
  htmlType?: ButtonHtmlType;
  type?: ButtonType;
  size?: ButtonSizeType;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: React.CSSProperties;
}

const { prefix } = ConfigContext;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      htmlType,
      type = "basic",
      size = "normal",
      disabled,
      onClick,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const classPrefix = `${prefix}-button`;
    const classes = classNames(
      classPrefix,
      `${classPrefix}--type-${type}`,
      `${classPrefix}--size-${size}`,
      className
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        className={classes}
        type={htmlType}
        style={style}
        disabled={disabled}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
