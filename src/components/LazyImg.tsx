import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";

type Props = {
  className?: string;
  src?: string;
  alt?: string;
  placeholderSrc?: string;
};

const LazyImg = ({ className, src, alt, placeholderSrc }: Props) => {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      className={className + ""}
      effect="blur"
      placeholderSrc={placeholderSrc}
    />
  );
};

export default LazyImg;
