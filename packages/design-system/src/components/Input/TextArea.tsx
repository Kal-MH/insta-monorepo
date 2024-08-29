import React, { forwardRef, useEffect, useRef, useState } from "react";

import "./TextArea.styles.scss";
import { ConfigContext } from "../utils/config";
import classnames from "classnames";

export type TextareaAlignType = "left" | "center" | "right";
export type TextareaResizeType = "vertical" | "horizontal" | "both" | "none";
export type StatusType = "normal" | "error" | "invalid";

export interface TextAreaEvent {
  onInput?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onPaste?: React.ClipboardEventHandler<HTMLTextAreaElement>;
}

interface TextAreaProps extends TextAreaEvent {
  defaultValue?: string | number;
  placeholder?: string;
  label?: string;
  name?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  align?: TextareaAlignType;
  resizeType?: TextareaResizeType;
  rows?: number;
  autoSize?: boolean;
  status?: StatusType;
  loading?: boolean;
  containerClassName?: string;
  style?: React.CSSProperties;
  textareaClassName?: string;
  textareaStyle?: React.CSSProperties;
}

const { prefix } = ConfigContext;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      defaultValue,
      placeholder,
      label,
      name,
      autoFocus,
      disabled,
      readonly,
      align,
      resizeType = "vertical",
      rows = 1,
      autoSize = false,
      status,
      loading,
      onInput,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      onChange,
      onPressEnter,
      onPaste,
      containerClassName = "",
      style,
      textareaClassName = "",
      textareaStyle,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [resizeStyle, setResizeStyle] = useState<React.CSSProperties>({});

    const classPrefix = `${prefix}-textarea`;
    const textareaClassNames = classnames(classPrefix, textareaClassName, {
      [`${classPrefix}--${status}`]: status,
      [`${classPrefix}--focused`]: focused,
      [`${classPrefix}--disabled`]: disabled,
    });

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(false);
      onBlur?.(e);
    };

    const resize = () => {};

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.keyCode === 13) {
        onPressEnter?.(event);
      }
      onKeyDown?.(event);
      resize();
    };

    // useEffect(() => {
    //   resize();
    // }, [textareaRef, autoSize]);

    return (
      <div
        className={classnames(`${classPrefix}--container`, containerClassName)}
      >
        <textarea
          ref={ref}
          className={textareaClassNames}
          defaultValue={defaultValue}
          name={name}
          placeholder={placeholder}
          rows={rows}
          autoFocus={autoFocus}
          disabled={disabled || readonly}
          onInput={onInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          onChange={onChange}
          onPaste={onPaste}
          style={{
            ...textareaStyle,
            textAlign: align,
            resize: resizeType,
          }}
          {...props}
        />
      </div>
    );
  }
);
export default TextArea;
