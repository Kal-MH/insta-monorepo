import React from "react";
import classnames from "classnames";
import { ConfigContext } from "../utils/config";
import "./Skeleton.styles.scss";

interface SkeletonBoxProps {
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
}

const SkeletonBox = ({ width, height, className, style }: SkeletonBoxProps) => {
  const { prefix } = ConfigContext;
  const classPrefix = `${prefix}-skeleton`;
  const classNames = classnames(classPrefix, className);

  return <div className={classNames} style={{ width, height, ...style }} />;
};

export default SkeletonBox;
