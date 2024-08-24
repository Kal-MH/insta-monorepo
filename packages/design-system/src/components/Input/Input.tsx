import React, { forwardRef, useEffect, useState } from "react";

import "./Input.styles.scss";
import { ConfigContext } from "../utils/config";
import classNames from "classnames";

export type InputType =
  | "email"
  | "number"
  | "text"
  | "password"
  | "date"
  | "time"
  | "datetime"
  | "url"
  | "tel";
export type InputSizeType = "tiny" | "small" | "normal" | "large" | "xlarge";
export type StatusType = "normal" | "error" | "invalid";

export interface InputEvent {
  onInput?: React.KeyboardEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

export interface InputProps extends InputEvent {
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  label?: string;
  labelColor?: string;
  name?: string;
  size?: InputSizeType;
  status?: StatusType;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  autoCapitalize?: string;
  autoCorrect?: string;
  style?: React.CSSProperties;
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
}

interface Props {
  type?: InputType;
}

const { prefix } = ConfigContext;

const Input = forwardRef<HTMLInputElement, InputProps & Props>(
  (
    {
      value,
      defaultValue,
      placeholder,
      label,
      labelColor,
      name,
      type,
      size = "normal",
      status,
      disabled,
      loading,
      autoFocus,
      autoComplete,
      autoCorrect,
      autoCapitalize,
      onInput,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      onChange,
      onPressEnter,
      className = "",
      style,
      inputClassName = "",
      inputStyle,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const classPrefix = `${prefix}-input`;

    useEffect(() => {
      setCurrentValue(value);
    }, [value]);

    const classes = classNames(
      classPrefix,
      `${classPrefix}--size-${size}`,
      {
        [`${classPrefix}--disabled`]: disabled,
        [`${classPrefix}--focused`]: focused,
        [`${classPrefix}--${status}`]: status,
      },
      inputClassName
    );

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) {
        onPressEnter?.(event);
      }
      onKeyDown?.(event);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (value !== undefined) setCurrentValue(event.target.value);
      onChange?.(event);
    };

    return (
      <input
        ref={ref}
        value={currentValue}
        className={classes}
        type={type}
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        autoComplete={autoComplete}
        onInput={onInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onKeyPress={onKeyPress}
        onKeyUp={onKeyUp}
        onChange={handleChange}
        style={{ ...inputStyle }}
        {...props}
      />
    );
  }
);

export default Input;
