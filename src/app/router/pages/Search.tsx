import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NoResults from "@/assets/no-results.png";
import ContentWrapper from "@/components/ContentWrapper";
import LazyImg from "@/components/LazyImg";
import MovieCard from "@/components/MovieCard";
import Spinner from "@/components/Spinner";
import { INITIAL_SEARCH_DATA, SITE_NAME } from "@/constants";
import { useSearchDataFetching } from "@/hooks/infinite-data-fetch/useSearchDataFetching";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import "@/styles/scss/other/pages/search.scss";
import InfiniteScroll from "react-infinite-scroll-component";

const Search = () => {
  const [pageNum, setPageNum] = useState<number>(2); // page number '1' is already fetched in fetchInitialPageData in useSearchDataFetching.tsx
  const [data, setData] = useState<SearchDataType>(INITIAL_SEARCH_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [dynamicTitle, setDynamicTitle] = useState("");

  const { query } = useParams<{ query: string }>(); // get query from url
  const stringQuery = String(query); // convert query to string

  useDocumentTitle(dynamicTitle);

  // change title dynamically
  useEffect(() => {
    setDynamicTitle(`${SITE_NAME} - Search '${stringQuery}'`);
  }, [stringQuery]);

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
      {!loading && !error && (
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
                      if (
                        item.media_type !== "movie" &&
                        item.media_type !== "tv"
                      )
                        return null;
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
            <div className="resultNotFound flex flex-col">
              <div>
                <LazyImg className="w-28" src={NoResults} alt="No Results" />
              </div>
              <div>Sorry, Results not Found!</div>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};
export default memo(Search);
