import PosterFallback from "@/assets/no-poster.png";
import { useApi } from "@/hooks/useApi";
import { useDebounce } from "@/hooks/useDebounce";
import { setQuery } from "@/store/reducers/search-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import "@/styles/scss/other/components/popup-search.scss";
import { SearchIcon, XIcon } from "lucide-react";
import React, { KeyboardEvent, memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LazyImg from "./LazyImg";
import Spinner from "./Spinner";
import SearchInput from "./shared/SearchInput";

type Props = {
  setShowPopupSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const PopupSearch = ({ setShowPopupSearch }: Props) => {
  const searchRef = React.useRef<HTMLInputElement>(null);
  const { query } = useAppSelector((state) => state.search);
  const { url } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();

  // custom hook to debounce query
  const debouncedQuery = useDebounce(query);

  const navigate = useNavigate();

  const { data, isError, isLoading } = useApi(
    `/search/multi?query=${debouncedQuery}&page=1`,
    [`query=${debouncedQuery}`]
  );

  const searchData = useMemo(() => {
    return data?.results?.filter((item: any) => {
      if (item.media_type !== "movie" && item.media_type !== "tv") return null;
      return item;
    });
  }, [data?.results]);

  const searchQueryHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.key === "Enter" && debouncedQuery.length > 0) {
        navigate(`/search/${debouncedQuery}`);
        setShowPopupSearch(false);
      }
    },
    [debouncedQuery, navigate, setShowPopupSearch]
  );

  const searchClickHandler = useCallback(() => {
    if (debouncedQuery.length > 0) {
      navigate(`/search/${debouncedQuery}`);
      setShowPopupSearch(false);
    }
  }, [debouncedQuery, navigate, setShowPopupSearch]);

  const clearSearch = () => {
    if (query.length === 0) setShowPopupSearch(false);
    else {
      dispatch(setQuery(""));
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  };

  return (
    <>
      <div
        className="popup-container px-10"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowPopupSearch(false);
          }
        }}
      >
        <div
          className={`popup mx-10 flex items-center rounded-full border-2 border-blue-300 bg-gray-900 text-gray-200 ${
            !isLoading && !isError && data?.results?.length > 0
              ? "absolute top-[22rem]"
              : ""
          }`}
        >
          <SearchInput
            onlyInput
            placeholder="Search for a movie or tv show..."
            inputClassName="searchInput bg-gray-900 text-xl text-blue-200 outline-none"
            ref={searchRef}
            query={query}
            autoFocus
            setQuery={(query: string) => dispatch(setQuery(query))}
            searchQueryHandler={searchQueryHandler}
          />
          <button type="button" className="mx-1" onClick={searchClickHandler}>
            <SearchIcon />
          </button>
          <button type="button" className="mx-1" onClick={clearSearch}>
            <XIcon />
          </button>
        </div>

        <Spinner
          initial={false}
          className={`absolute left-1/2 top-[35rem] ${
            !isLoading && !isError ? "hidden" : "block"
          }`}
        />

        <div
          className={`popup absolute top-[27rem] flex flex-col items-center rounded-3xl border-2 border-blue-300 bg-gray-900 text-gray-200 ${
            !isLoading && !isError && data?.results?.length > 0
              ? "block"
              : "hidden"
          }`}
        >
          {!isLoading &&
            !isError &&
            data?.results?.length > 0 &&
            searchData?.map((item: any, index: number) => {
              if (index > 4) return null;

              return (
                <div
                  key={String(index) + "-" + String(item.id)}
                  className="popup-item w-full cursor-pointer"
                  onClick={() => {
                    navigate(`/${item.media_type}/${item.id}`);
                    setShowPopupSearch(false);
                  }}
                >
                  <div
                    className={`flex w-full items-center border-gray-600 py-3 ${
                      data?.results?.length > 4 && index > 0 ? "border-t-2" : ""
                    }`}
                  >
                    <LazyImg
                      src={`${url.poster}${item.poster_path}`}
                      alt={item.title || item.name}
                      fallbackSrc={PosterFallback}
                      className="w-10 shadow-md shadow-slate-100 transition-all"
                      width={"2.5rem"}
                    />
                    <div className="popup-item__info ml-5">
                      <div className="popup-item__info__title text-lg hover:underline">
                        {item.name || item.title}
                      </div>
                      <div className="popup-item__info__type text-xs hover:underline">
                        {item.media_type === "movie" ? "(Movie)" : "(TV Show)"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default memo(PopupSearch);
