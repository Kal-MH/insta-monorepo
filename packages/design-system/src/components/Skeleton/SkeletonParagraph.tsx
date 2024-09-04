import React from "react";
import { ConfigContext } from "../utils/config";
import "./Skeleton.styles.scss";

interface SkeletonParagraphProps {
  line?: number;
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
}

const SkeletonParagraph = ({
  line = 3,
  width,
  height,
  className,
  style,
  ...props
}: SkeletonParagraphProps) => {
  const { prefix } = ConfigContext;
  const classPrefix = `${prefix}-skeleton`;

  const sizeStyle = {
    width: "100%",
    height: "16px",
    marginBottom: "4px",
  };
  return (
    <div className={className} style={{ width, height, ...style }} {...props}>
      {Array.from({ length: line }).map((_, index) =>
        index !== line - 1 ? (
          <div key={index} className={classPrefix} style={sizeStyle} />
        ) : (
          <div
            key={index}
            className={classPrefix}
            style={{ width: "70%", height: "16px" }}
          />
        )
      )}
    </div>
  );
};

export default SkeletonParagraph;
