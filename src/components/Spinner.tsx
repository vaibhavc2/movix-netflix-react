import "@/styles/scss/other/components/spinner.scss";
import { memo } from "react";

type Props = {
  initial?: boolean;
  className?: string;
};

const Spinner = ({ initial, className }: Props) => {
  return (
    <div className={`loadingSpinner ${initial ? "initial" : ""} ${className}`}>
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  );
};

export default memo(Spinner);
