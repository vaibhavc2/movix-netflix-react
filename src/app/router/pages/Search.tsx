import { memo, useState } from "react";
import { useParams } from "react-router-dom";

import ContentWrapper from "@/components/ContentWrapper";
import MovieCard from "@/components/MovieCard";
import Spinner from "@/components/Spinner";
import {
  initialSearchData,
  useSearchDataFetching,
} from "@/hooks/useSearchDataFetching";
import "@/styles/scss/other/pages/search.scss";
import InfiniteScroll from "react-infinite-scroll-component";

const Search = () => {
  const [pageNum, setPageNum] = useState<number>(2); // page number '1' is already fetched in fetchInitialPageData in useSearchDataFetching.tsx
  const [data, setData] = useState<SearchDataType>(initialSearchData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(true);

  const { query } = useParams<{ query: string }>(); // get query from url
  const stringQuery = String(query); // convert query to string

  const fetchNextPageData = useSearchDataFetching({
    data,
    query: stringQuery,
    pageNum,
    setLoading,
    setError,
    setData,
    setPageNum,
  });

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {(!loading || error) && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              {data && (
                <>
                  <div className="pageTitle">
                    {`Search ${
                      data.total_results > 1 ? "results" : "result"
                    } of '${stringQuery}'`}
                  </div>

                  <InfiniteScroll
                    className="content"
                    dataLength={data.results.length}
                    next={fetchNextPageData}
                    hasMore={data.total_pages >= pageNum}
                    loader={<Spinner initial={false} />}
                  >
                    {data.results.map((item, index) => {
                      if (item.media_type === "") return null;
                      return (
                        <MovieCard
                          key={index}
                          data={item}
                          fromSearch={true}
                          mediaType={item.media_type}
                        />
                      );
                    })}
                  </InfiniteScroll>
                </>
              )}
            </>
          ) : (
            <div className="resultNotFound">
              <span>Sorry, Results not Found!</span>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};
export default memo(Search);
