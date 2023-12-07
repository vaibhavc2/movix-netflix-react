import { memo, useCallback } from "react";
import { CommonProps, LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";

type Props = {
  className?: string;
  src?: string;
  alt?: string;
  placeholderSrc?: string;
  fallbackSrc?: string;
  onError?: React.ReactEventHandler<HTMLImageElement> | undefined;
  width?: string | number;
  height?: string | number;
} & CommonProps;

const LazyImg = ({
  className,
  src,
  alt,
  placeholderSrc,
  onError,
  width,
  height,
  fallbackSrc,
}: Props) => {
  const errorHandler = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      e.preventDefault();
      e.currentTarget.src = fallbackSrc || "";
    },
    [fallbackSrc]
  );

  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      className={className + ""}
      effect="blur"
      placeholderSrc={placeholderSrc}
      onError={onError || errorHandler}
      width={width || "100%"}
      height={height || "100%"}
    />
  );
};

export default memo(LazyImg);
