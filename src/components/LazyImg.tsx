import { ComponentProps } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyImg = ({ className, src, alt }: ComponentProps<"img">) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      className={className + ""}
      effect="blur"
    />
  );
};

export default LazyImg;
