import { useMemo } from "react";

const useFilteredSearchData = (data: any) => {
  const searchData = useMemo(() => {
    return data?.results?.filter((item: any) => {
      if (item.media_type !== "movie" && item.media_type !== "tv") return null;
      return item;
    });
  }, [data?.results]);

  return { searchData };
};

export default useFilteredSearchData;
