import { memo, useCallback, useMemo, useState } from "react";

import YoutubeFallback from "@/assets/youtube-fallback.jpg";
import ContentWrapper from "@/components/ContentWrapper";
import LazyImg from "@/components/LazyImg";
import VideoPopup from "@/components/VideoPopup";
import { YOUTUBE_BASE_URL } from "@/constants";
import { strID } from "@/helpers/str-id.helper";
import { useLoadingSkeleton } from "@/hooks/useLoadingSkeleton";
import { useAppSelector } from "@/store/store";
import { PlayIcon } from "../play-icon/PlayIcon";

type Props = {
  data: any;
  isLoading: boolean;
  isError: boolean;
};

const VideosSection = ({ data, isLoading, isError }: Props) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const makeSkeleton = useLoadingSkeleton();
  const { isMobile } = useAppSelector((state) => state.device);

  const skeletonItem = useCallback((value: any, key: number) => {
    return (
      <div className="skItem" key={key + "-" + value + strID(key)}>
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  }, []);

  const loadingSkeleton = useMemo(
    () => makeSkeleton(skeletonItem, 4),
    [skeletonItem]
  );

  return (
    <div className="videosSection">
      <ContentWrapper>
        {!isLoading && !isError ? (
          <>
            {data && data?.results?.length > 0 && (
              <div className="sectionHeading">Official Videos</div>
            )}
            <div className="videos">
              {data &&
                data?.results?.map((video: any, index: number) => (
                  <div
                    key={String(video.id) + "-" + String(index)}
                    className="videoItem"
                    onClick={() => {
                      setShow(true);
                      setVideoId(video.key);
                    }}
                  >
                    <div className="videoThumbnail">
                      <LazyImg
                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                        alt={video.name}
                        placeholderSrc={YoutubeFallback}
                        onError={(e) => {
                          e.preventDefault();
                          e.currentTarget.src = YoutubeFallback;
                        }}
                      />

                      {isMobile ? (
                        <a
                          href={`${YOUTUBE_BASE_URL}${video.key}`}
                          target="_blank"
                        >
                          <PlayIcon />
                        </a>
                      ) : (
                        <PlayIcon />
                      )}
                    </div>

                    <div className="videoTitle">{video.name}</div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className="videoSkeleton">{loadingSkeleton}</div>
        )}
      </ContentWrapper>

      {!isLoading && !isError && !isMobile ? (
        <VideoPopup
          show={show}
          setShow={setShow}
          setVideoId={setVideoId}
          videoId={videoId}
        />
      ) : null}
    </div>
  );
};

export default memo(VideosSection);
