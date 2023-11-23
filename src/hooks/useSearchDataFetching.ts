import { tmdbAPI } from "@/api/tmdb.api";
import { INITIAL_SEARCH_DATA } from "@/constants";
import { useCallback, useEffect, useState } from "react";

export const useSearchDataFetching = ({
  data,
  query,
  pageNum,
  setLoading,
  setError,
  setData,
  setPageNum,
}: FetchSearchDataParams) => {
  const [secondPageData, setSecondPageData] = useState(false);

  const fetchInitialPageData = useCallback(async () => {
    try {
      const pageData = await tmdbAPI.fetchData(
        `/search/multi?query=${query}&page=1`
      );
      setData(pageData);
      setLoading(false);
      setError(false);
    } catch (error: any) {
      setLoading(false);
      setError(true);
      setData(INITIAL_SEARCH_DATA);
    }
  }, [query, setLoading, setError, setData, setPageNum]);

  useEffect(() => {
    fetchInitialPageData();
    setSecondPageData(true);
    return () => setSecondPageData(true);
  }, [query]);

  // don't use useCallback here: caching causes problems
  const fetchNextPageData = async () => {
    try {
      let pageData: SearchDataType;
      if (secondPageData) {
        pageData = await tmdbAPI.fetchData(
          `/search/multi?query=${query}&page=2`
        );
        setPageNum(2);
      } else {
        pageData = await tmdbAPI.fetchData(
          `/search/multi?query=${query}&page=${pageNum}`
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

  return fetchNextPageData;
};
