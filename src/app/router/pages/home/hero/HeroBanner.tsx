import BannerImageFallback from "@/assets/banner-image-fallback.jpg";
import ContentWrapper from "@/components/ContentWrapper";
import LazyImg from "@/components/LazyImg";
import SearchInput from "@/components/shared/SearchInput";
import { useApi } from "@/hooks/useApi";
import { useInputRef } from "@/hooks/useInputRef";
import { useScrollEvent } from "@/hooks/useScrollEvent";
import { useSearchClickHandler } from "@/hooks/useSearchClickHandler";
import { setQuery } from "@/store/reducers/search-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { DetectDevice } from "@/utils/device/detectDevice.util";
import { KeyboardEvent, memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let focusMainSearch: () => void;

const HeroBanner = () => {
  const [background, setBackground] = useState<string>();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMainSearch, setShowMainSearch] = useState(true);
  const { query } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const controlSearchVisibility = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 200) {
      if (currentScrollY > lastScrollY && DetectDevice.isMobile()) {
        setShowMainSearch(false);
      }
    } else {
      setShowMainSearch(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY, setLastScrollY]);

  // add scroll event listener using custom hook
  useScrollEvent(controlSearchVisibility);

  const navigate = useNavigate();
  const { ref, focus } = useInputRef();
  const { url } = useAppSelector((state) => state.home);

  focusMainSearch = focus;

  const searchClickHandler = useSearchClickHandler(query);

  // call the api to get the upcoming movies
  const { data, isLoading, isError } = useApi("/movie/upcoming", [
    "upcoming-movies",
  ]);

  // select a random bg-image from the upcoming movies
  useEffect(
    useCallback(() => {
      setBackground(
        url.backdrop +
          String(data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path)
      );
    }, [background, setBackground, data]),
    [data]
  );

  const searchQueryHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <div className="heroBanner">
        {!isError && !isLoading && (
          <div className="backdrop-img">
            <LazyImg
              src={background}
              alt=""
              onError={(e) => {
                e.preventDefault();
                e.currentTarget.src = BannerImageFallback;
              }}
            />
          </div>
        )}

        <div className="opacity-layer"></div>

        <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title font-serif !font-normal !tracking-wide">
              Welcome.
            </span>
            <span className="subTitle font-serif !font-normal !tracking-wide">
              Millions of movies, TV shows and people to discover. Explore now.
            </span>

            {showMainSearch && (
              <SearchInput
                placeholder="Search for a movie or tv show..."
                className="text-gray-900"
                query={query}
                setQuery={(query: string) => dispatch(setQuery(query))}
                inputRef={ref}
                searchQueryHandler={searchQueryHandler}
              >
                <button type="button" onClick={searchClickHandler}>
                  Search
                </button>
              </SearchInput>
            )}
          </div>
        </ContentWrapper>
      </div>
    </>
  );
};
export default memo(HeroBanner);

export { focusMainSearch };
