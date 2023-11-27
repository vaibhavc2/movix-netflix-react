import { memo, useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import Select from "react-select";

import "@/styles/scss/other/pages/explore.scss";

import NoResults from "@/assets/no-results.png";
import ContentWrapper from "@/components/ContentWrapper";
import MovieCard from "@/components/MovieCard";
import Spinner from "@/components/Spinner";
import { INITIAL_SEARCH_DATA, SITE_NAME, SORT_BY_DATA } from "@/constants";
import { useExploreDataFetching } from "@/hooks/infinite-data-fetch/useExploreDataFetching";
import { useApi } from "@/hooks/useApi";
import useDocumentTitle from "@/hooks/useDocumentTitle";

let filters = {};

const Explore = () => {
  const [data, setData] = useState<SearchDataType>(INITIAL_SEARCH_DATA);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState<any>([]);
  const [sortby, setSortby] = useState<any>([]);
  const [error, setError] = useState(false);
  const { mediaType } = useParams();
  const mediaTypeString = String(mediaType);
  const [dynamicTitle, setDynamicTitle] = useState("");

  useDocumentTitle(dynamicTitle);

  const { data: genresData } = useApi(`/genre/${mediaType}/list`, [
    `genre-${mediaType}`,
  ]);

  // change title dynamically
  useEffect(
    useCallback(() => {
      setDynamicTitle(
        `${SITE_NAME} - Explore ${
          mediaTypeString === "movie" ? "Movies" : "TV shows"
        }`
      );
    }, [setDynamicTitle, mediaTypeString]),
    [mediaTypeString]
  );

  const { onChange, fetchNextPageData } = useExploreDataFetching({
    data,
    pageNum,
    setLoading,
    setError,
    setData,
    setPageNum,
    mediaType: mediaTypeString,
    filters,
    setSortby,
    setGenre,
  });

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <div className="filters">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortby}
              options={SORT_BY_DATA}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD leading-6"
              classNamePrefix="react-select"
            />
          </div>
        </div>
        {loading && <Spinner initial={true} />}
        {!loading && !error && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || 0}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner initial={false} />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard
                      key={index}
                      data={item}
                      mediaType={mediaType}
                      fromSearch={false}
                    />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <div className="resultNotFound flex flex-col">
                <div>
                  <img className="w-28" src={NoResults} alt="No Results" />
                </div>
                <div>Sorry, Results not Found!</div>
              </div>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default memo(Explore);
