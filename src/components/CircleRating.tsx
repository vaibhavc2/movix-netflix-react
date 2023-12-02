import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "@/styles/scss/other/components/circle-rating.scss";
import { memo } from "react";

const CircleRating = ({ rating }: { rating: string }) => {
  const ratingNumber = Number(rating);
  return (
    <div className="circleRating">
      <CircularProgressbar
        value={ratingNumber}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor:
            ratingNumber < 5 ? "red" : ratingNumber < 7 ? "orange" : "green",
        })}
      />
    </div>
  );
};

export default memo(CircleRating);
