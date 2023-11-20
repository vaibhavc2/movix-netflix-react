import ContentWrapper from "@/components/ContentWrapper";
import LazyImg from "@/components/LazyImg";
import { IMAGE_URL } from "@/constants";
import { useApi } from "@/hooks/useApi";
import { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const [background, setBackground] = useState<string>();
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  // call the api to get the upcoming movies
  const { data, isLoading, isError } = useApi("/movie/upcoming", [
    "upcoming-movies",
  ]);

  // select a random bg-image from the upcoming movies
  useEffect(
    useCallback(() => {
      setBackground(
        IMAGE_URL +
          String(data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path)
      );
    }, [background, setBackground, data]),
    [data]
  );

  const searchQueryHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <>
      <div className="heroBanner">
        {!isError && !isLoading && (
          <div className="backdrop-img">
            <LazyImg src={background} alt="upcoming-movies-random-image" />
          </div>
        )}

        <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome.</span>
            <span className="subTitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </span>

            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
                onChange={(e) => setQuery(e.currentTarget.value)}
                onKeyUp={(e) => searchQueryHandler(e)}
              />
              <button>Search</button>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </>
  );
};
export default HeroBanner;
