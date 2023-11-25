import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import { useApi } from "@/hooks/useApi";
import { useAppSelector } from "@/store/store";

import PosterFallback from "@/assets/no-poster.png";
import CircleRating from "@/components/CircleRating";
import ContentWrapper from "@/components/ContentWrapper";
import Genres from "@/components/Genres";
import GoogleSearchLink from "@/components/GoogleSearchLink";
import LazyImg from "@/components/LazyImg";
import VideoPopup from "@/components/VideoPopup";
import { SITE_NAME, YOUTUBE_BASE_URL } from "@/constants";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { DetectDevice } from "@/utils/device/detectDevice.util";
import { memo, useEffect, useState } from "react";
import { PlayIcon } from "../play-icon/PlayIcon";

type Props = {
  video: any;
  crew: any;
  loadingStates: {
    videoIsLoading: boolean;
    videoIsError: boolean;
    crewIsLoading: boolean;
    crewIsError: boolean;
  };
};

const DetailsBanner = ({ video, crew, loadingStates }: Props) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [headTitle, setHeadTitle] = useState("");
  const [dynamicTitle, setDynamicTitle] = useState("");

  const { mediaType, id } = useParams();
  const { url } = useAppSelector((state) => state.home);
  const { videoIsLoading, videoIsError, crewIsLoading, crewIsError } =
    loadingStates;

  const { data, isLoading, isError } = useApi(`/${mediaType}/${id}`, [
    `details-${mediaType}-${id}`,
  ]);

  // change title dynamically
  useDocumentTitle(dynamicTitle);

  // set head title for search query
  useEffect(() => {
    if (!isLoading && !isError && data) {
      setHeadTitle(
        `${data.title || data.name} (${dayjs(
          data.release_date || data.first_air_date
        ).format("YYYY")})`
      );
    }
  }, [data, isLoading, isError]);

  // change title dynamically
  useEffect(() => {
    setDynamicTitle(`${SITE_NAME} | ${headTitle}`);
  }, [headTitle]);

  useEffect(() => {
    setDynamicTitle(`${SITE_NAME} | Details`);
  }, []);

  const _genres: number[] = data?.genres?.map(
    (genre: { id: number }) => genre.id
  );

  const directors = crew?.filter((member: any) => member.job === "Director");
  const writers = crew?.filter(
    (member: any) =>
      member.job === "Writer" ||
      member.job === "Screenplay" ||
      member.job === "Story"
  );

  const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!isLoading && !isError ? (
        <>
          {data && (
            <>
              <div className="backdrop-img">
                <LazyImg src={`${url.backdrop}${data.backdrop_path}`} alt="" />
              </div>

              <div className="opacity-layer"></div>

              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <GoogleSearchLink searchQuery={headTitle}>
                        <LazyImg
                          className="posterImg"
                          src={`${url.poster}${data.poster_path}`}
                          alt=""
                        />
                      </GoogleSearchLink>
                    ) : (
                      <GoogleSearchLink searchQuery={headTitle}>
                        <LazyImg
                          className="posterImg"
                          src={PosterFallback}
                          alt=""
                        />
                      </GoogleSearchLink>
                    )}
                  </div>

                  <div className="right">
                    <GoogleSearchLink searchQuery={headTitle}>
                      <div className="title hover:underline">{headTitle}</div>
                    </GoogleSearchLink>
                    <div className="subtitle">{data.tagline}</div>

                    <Genres data={_genres} />

                    <div className="row">
                      <div className="cursor-default">
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                      </div>
                      {DetectDevice.isMobile() ? (
                        <>
                          <a
                            href={`${YOUTUBE_BASE_URL}${video?.key}`}
                            target="_blank"
                          >
                            <div
                              className="playbtn"
                              onClick={() => {
                                setShow(true);
                                setVideoId(video?.key);
                              }}
                            >
                              <PlayIcon />
                              <span className="text">Watch Trailer</span>
                            </div>
                          </a>
                        </>
                      ) : (
                        <div
                          className="playbtn"
                          onClick={() => {
                            setShow(true);
                            setVideoId(video?.key);
                          }}
                        >
                          <PlayIcon />
                          <span className="text">Watch Trailer</span>
                        </div>
                      )}
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>

                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">RunTime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {!crewIsLoading && !crewIsError ? (
                      <>
                        <div className="crew">
                          {directors?.length > 0 && (
                            <div className="info">
                              <span className="text bold">
                                {directors?.length > 1
                                  ? "Directors"
                                  : "Director"}
                                :{" "}
                              </span>
                              <span className="text">
                                {directors?.map((d: any, i: number) => (
                                  <GoogleSearchLink
                                    searchQuery={`${d.name} ${
                                      mediaType === "movie"
                                        ? "movies"
                                        : "tv shows"
                                    }`}
                                    key={i}
                                  >
                                    <span key={i}>
                                      {d.name}
                                      {i < directors?.length - 1 ? ", " : ""}
                                    </span>
                                  </GoogleSearchLink>
                                ))}
                              </span>
                            </div>
                          )}
                          {writers?.length > 0 && (
                            <div className="info">
                              <span className="text bold">
                                {writers?.length > 1 ? "Writers" : "Writer"}:{" "}
                              </span>
                              <span className="text">
                                {writers?.map((w: any, i: number) => (
                                  <GoogleSearchLink
                                    searchQuery={`${w.name} ${
                                      mediaType === "movie"
                                        ? "movies"
                                        : "tv shows"
                                    }`}
                                    key={i}
                                  >
                                    <span key={i}>
                                      {w.name}
                                      {i < writers?.length - 1 ? ", " : ""}
                                    </span>
                                  </GoogleSearchLink>
                                ))}
                              </span>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                      </>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          {data?.created_by?.length > 1
                            ? "Creators"
                            : "Creator"}
                          :{" "}
                        </span>
                        <span className="text">
                          {data.created_by?.map((w: any, i: number) => (
                            <GoogleSearchLink
                              searchQuery={`${w.name} ${
                                mediaType === "movie" ? "movies" : "tv shows"
                              }`}
                              key={i}
                            >
                              <span key={i}>
                                {w.name}
                                {i < data.created_by?.length - 1 ? ", " : ""}
                              </span>
                            </GoogleSearchLink>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {!videoIsLoading &&
                !videoIsError &&
                !DetectDevice.isMobile() ? (
                  <VideoPopup
                    show={show}
                    setShow={setShow}
                    setVideoId={setVideoId}
                    videoId={videoId}
                  />
                ) : null}
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default memo(DetailsBanner);
