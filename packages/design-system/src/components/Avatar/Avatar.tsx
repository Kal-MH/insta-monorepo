import React, { forwardRef, useState } from "react";
import classnames from "classnames";
import "./Avatar.styles.scss";
import { ConfigContext } from "../utils/config";

export type AvatarShapeType = "circle" | "round" | "square";

export interface AvatarProps {
  src?: string;
  alt?: string;
  placeholder?: string;
  shape?: AvatarShapeType;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  mode?: "cover" | "fill" | "contain";
}

const { prefix } = ConfigContext;

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      size = 25,
      alt,
      placeholder,
      shape = "circle",
      src,
      className,
      style,
      mode = "cover",
    },
    ref
  ) => {
    const [loaded, setLoaded] = useState(false);

    const classPrefix = `${prefix}-avatar`;
    const classNames = classnames(
      `${classPrefix}`,
      `${classPrefix}--shape-${shape}`,
      className
    );

    const avatarStyle = {
      width: size,
      height: size,
    };

    let children = null;

    const handleLoaded = () => {
      setLoaded(true);
    };

    if (src) {
      children = (
        <img
          ref={(img) => {
            if (!img) return;

            img.onload = handleLoaded;
            if (img.complete) {
              handleLoaded();
            }
          }}
          src={src}
          alt={alt}
          className={classnames(`${classPrefix}--img`, {
            [`${classPrefix}--img--loaded`]: loaded,
          })}
          style={{ ...avatarStyle, objectFit: mode }}
        />
      );
    } else if (placeholder) {
      children = (
        <img
          ref={(img) => {
            if (!img) return;

            img.onload = handleLoaded;
            if (img.complete) {
              handleLoaded();
            }
          }}
          src={placeholder}
          alt={alt}
          className={classnames(`${classPrefix}-img`, {
            [`${classPrefix}-img--loaded`]: loaded,
          })}
          style={{ ...avatarStyle, objectFit: mode }}
        />
      );
    }
    return (
      <div
        ref={ref}
        className={classNames}
        style={{ ...avatarStyle, ...style }}
      >
        {children}
      </div>
    );
  }
);

export default Avatar;
