import { memo } from "react";
import { CommonProps, LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";

type Props = {
  className?: string;
  src?: string;
  alt?: string;
  placeholderSrc?: string;
  onError?: React.ReactEventHandler<HTMLImageElement> | undefined;
} & CommonProps;

const LazyImg = ({ className, src, alt, placeholderSrc, onError }: Props) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      className={className + ""}
      effect="blur"
      placeholderSrc={placeholderSrc}
      onError={onError}
    />
  );
};

export default memo(LazyImg);
