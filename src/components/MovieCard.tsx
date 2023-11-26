import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import "@/styles/scss/other/components/movie-card.scss";

import PosterFallback from "@/assets/no-poster.png";
import { useAppSelector } from "@/store/store";
import CircleRating from "./CircleRating";
import Genres from "./Genres";
import LazyImg from "./LazyImg";

type Props = {
  data: any;
  fromSearch: boolean;
  mediaType?: string;
};

const MovieCard = ({ data, fromSearch, mediaType }: Props) => {
  const { url } = useAppSelector((state) => state.home);
  const navigate = useNavigate();
  return (
    <div
      className="movieCard"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        <LazyImg
          className="posterImg"
          src={`${url.poster}${data.poster_path}`}
          alt={data.title || data.name}
          onError={(e) => {
            e.preventDefault();
            e.currentTarget.src = PosterFallback;
          }}
        />
        {!fromSearch && (
          <>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
