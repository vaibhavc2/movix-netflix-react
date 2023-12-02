import { useApi } from "@/hooks/useApi";
import { useNavigate, useParams } from "react-router-dom";

import "@/styles/scss/other/pages/details.scss";
import { memo, useEffect } from "react";
import Recommendation from "./carousels/Recommendation";
import Similar from "./carousels/Similar";
import Cast from "./cast/Cast";
import DetailsBanner from "./details-banner/DetailsBanner";
import VideosSection from "./videos-section/VideosSection";

// title of the page is set dynamically in another component: DetailsBanner.tsx

const Details = () => {
  const { mediaType, id } = useParams();
  const navigate = useNavigate();

  // ?IMP handling invalid url when using dynamic routes
  useEffect(() => {
    if (mediaType !== "movie" && mediaType !== "tv") navigate("/404");
  }, [mediaType]);

  const {
    data: videos,
    isLoading: videoIsLoading,
    isError: videoIsError,
  } = useApi(`/${mediaType}/${id}/videos`, [
    `details-${mediaType}-${id}-videos`,
  ]);

  const {
    data: credits,
    isLoading: crewIsLoading,
    isError: crewIsError,
  } = useApi(`/${mediaType}/${id}/credits`, [
    `details-${mediaType}-${id}-credits`,
  ]);

  const loadingStates = {
    videoIsLoading,
    videoIsError,
    crewIsLoading,
    crewIsError,
  };

  return (
    <div>
      <DetailsBanner
        video={videos?.results?.[0]}
        crew={credits?.crew}
        loadingStates={loadingStates}
      />
      <Cast
        data={credits?.cast}
        isLoading={crewIsLoading}
        isError={crewIsError}
      />
      <VideosSection
        data={videos}
        isLoading={videoIsLoading}
        isError={videoIsError}
      />
      <Similar mediaType={String(mediaType)} id={String(id)} />
      <Recommendation mediaType={String(mediaType)} id={String(id)} />
    </div>
  );
};

export default memo(Details);
