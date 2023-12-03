import { tmdbAPI } from "@/api/tmdb.api";
import { INITIAL_SEARCH_DATA } from "@/constants";
import {
  setMovieSelectedGenres,
  setMovieSortedBy,
  setTVSelectedGenres,
  setTVSortedBy,
} from "@/store/reducers/explore-slice";
import { useAppDispatch } from "@/store/store";
import { useEffect, useState } from "react";

export const useExploreDataFetching = ({
  data,
  pageNum,
  setLoading,
  setError,
  setData,
  setPageNum,
  mediaType,
  filters,
}: FetchExploreDataParams) => {
  const [secondPageData, setSecondPageData] = useState(false);
  const dispatch = useAppDispatch();
  const setMovieGenres = (gen: string[]) =>
    dispatch(setMovieSelectedGenres(gen));
  const setTVGenres = (gen: string[]) => dispatch(setTVSelectedGenres(gen));
  const setMovieSortby = (sort: SortValue | null) =>
    dispatch(setMovieSortedBy(sort));
  const setTVSortby = (sort: SortValue | null) => dispatch(setTVSortedBy(sort));

  const fetchInitialPageData = async () => {
    try {
      const pageData = await tmdbAPI.fetchData(
        `/discover/${mediaType}`,
        filters
      );
      setData(pageData);
      setLoading(false);
      setError(false);
    } catch (error: any) {
      setLoading(false);
      setError(true);
      setData(INITIAL_SEARCH_DATA);
    }
  };

  useEffect(() => {
    filters = {};
    setData(INITIAL_SEARCH_DATA);
    setPageNum(2);
    fetchInitialPageData();
  }, [mediaType]);

  // don't use useCallback here: caching causes problems
  const fetchNextPageData = async () => {
    try {
      let pageData: SearchDataType;
      if (secondPageData) {
        pageData = await tmdbAPI.fetchData(
          `/discover/${mediaType}?page=2`,
          filters
        );
        setPageNum(2);
      } else {
        pageData = await tmdbAPI.fetchData(
          `/discover/${mediaType}?page=${pageNum}`,
          filters
        );
      }
      if (data?.results) {
        setData((prevData: SearchDataType) => {
          return {
            ...prevData,
            results: [...prevData.results, ...pageData.results],
          };
        });
        setPageNum((pageNum) => pageNum + 1);
        setSecondPageData(false);
      }
      setLoading(false);
      setError(false);
    } catch (error: any) {
      setLoading(false);
      setError(true);
    }
  };

  const onChange = (selectedItems: any, action: any) => {
    if (action.name === "sortby") {
      if (mediaType === "movie") setMovieSortby(selectedItems);
      else setTVSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      if (mediaType === "movie") setMovieGenres(selectedItems);
      else setTVGenres(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g: any) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    setPageNum(1);
    fetchInitialPageData();
  };

  return { fetchNextPageData, onChange };
};
