import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { ConfigContext } from "../utils/config";
import classnames from "classnames";

import "./Modal.styles.scss";
import CloseBtn from "./CloseBtn";

interface ModalProps {
  children: React.ReactNode;
  defaultVisible?: boolean;
  open?: boolean;
  onClose?(): void;
  className?: string;
  contentStyle?: React.CSSProperties;
}

const Modal = ({
  children,
  open = true,
  onClose,
  className = "",
  contentStyle,
}: ModalProps) => {
  const targetRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { prefix } = ConfigContext;
  const classPrefix = `${prefix}-modal`;
  const classNames = classnames(classPrefix, className);

  const dimStyle = {
    display: open ? "block" : "none",
    zIndex: 1000,
  };

  const handleClick = () => {
    console.log("click target");
  };
  const handleOutsideClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (
      targetRef.current &&
      !targetRef.current.contains(e.target as HTMLElement)
    ) {
      onClose && onClose();
    }
  };

  const el = document.createElement("div");
  const newChildElement = React.cloneElement(<div>{children}</div>, {
    ref: targetRef,
    onClick: (e: any) => {
      e.stopPropagation();
      // handleClick();
    },
  });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  });

  return ReactDOM.createPortal(
    <div
      ref={wrapperRef}
      className={`${classPrefix}--dim`}
      style={{ ...dimStyle }}
      onClick={handleOutsideClick}
    >
      {onClose && (
        <button className={`${classPrefix}-close-btn`} onClick={onClose}>
          <CloseBtn width={"20px"} height={"20px"} fill="white" />
        </button>
      )}
      <div
        className={classNames}
        style={{ ...contentStyle, display: "inline-block" }}
        onClick={(e) => e.stopPropagation()}
      >
        {newChildElement}
      </div>
    </div>,
    el
  );
};

export default Modal;
