import { useApi } from "@/hooks/useApi";
import { useDebounce } from "@/hooks/useDebounce";
import useFilteredSearchData from "@/hooks/useFilteredSearchData";
import { setQuery } from "@/store/reducers/search-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import "@/styles/scss/other/components/popup-search.scss";
import { SearchIcon, XIcon } from "lucide-react";
import React, { KeyboardEvent, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import SearchInput from "./shared/SearchInput";
import SearchResults from "./shared/SearchResults";

type Props = {
  setShowPopupSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const PopupSearch = ({ setShowPopupSearch }: Props) => {
  const searchRef = React.useRef<HTMLInputElement>(null);
  const { query } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  // custom hook to debounce query
  const debouncedQuery = useDebounce(query);

  const navigate = useNavigate();

  const { data, isError, isLoading } = useApi(
    `/search/multi?query=${debouncedQuery}&page=1`,
    [`query=${debouncedQuery}`]
  );

  // custom hook to filter search data
  const searchData = useFilteredSearchData(data)?.searchData;

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

  const searchResultClickHandler = useCallback(
    (item: any) => {
      navigate(`/${item.media_type}/${item.id}`);
      setShowPopupSearch(false);
    },
    [navigate, setShowPopupSearch]
  );

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
        className="popup-container"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowPopupSearch(false);
          }
        }}
      >
        <SearchInput
          noSearchInputClass
          placeholder="Search for a movie or tv show..."
          className={`popup flex items-center rounded-full border-2 border-blue-300 bg-gray-900 text-gray-200 ${
            !isLoading && !isError && searchData?.length > 0
              ? "absolute top-[22rem]"
              : ""
          }`}
          inputClassName="searchInput bg-gray-900 text-xl text-blue-200 outline-none"
          ref={searchRef}
          query={query}
          autoFocus
          setQuery={(query: string) => dispatch(setQuery(query))}
          searchQueryHandler={searchQueryHandler}
        >
          <button type="button" className="mx-1" onClick={searchClickHandler}>
            <SearchIcon />
          </button>
          <button type="button" className="mx-1" onClick={clearSearch}>
            <XIcon />
          </button>
        </SearchInput>

        <Spinner
          initial={false}
          className={`absolute left-1/2 top-[35rem] ${
            !isLoading && !isError ? "hidden" : "block"
          }`}
        />

        {!isLoading && !isError && searchData && searchData?.length !== 0 && (
          <div
            className={`popup absolute top-[27rem] flex flex-col items-center rounded-3xl border-2 border-blue-300 bg-gray-900 text-gray-200`}
          >
            <SearchResults
              searchData={searchData}
              searchResultHandler={searchResultClickHandler}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default memo(PopupSearch);
