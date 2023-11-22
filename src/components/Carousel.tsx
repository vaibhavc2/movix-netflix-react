import { memo, useCallback, useMemo, useRef } from "react";
import {
  BsFillArrowLeftCircleFill as LeftArrow,
  BsFillArrowRightCircleFill as RightArrow,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import PosterFallback from "@/assets/no-poster.png";
import ContentWrapper from "./ContentWrapper";
import LazyImg from "./LazyImg";

import { useAppSelector } from "@/store/store";
import "@/styles/scss/other/components/carousel.scss";
import dayjs from "dayjs";
import CircleRating from "./CircleRating";
import Genres from "./Genres";

type Props = {
  data: any[];
  isLoading: boolean;
  isError: boolean;
  endPoint?: string;
};

const Carousel = ({ data, isLoading, isError, endPoint }: Props) => {
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);
  const { url } = useAppSelector((state) => state.home);

  const navigation = useCallback(
    (direction: string) => {
      const carousel = carouselRef.current;

      if (carousel) {
        let scrollAmount = carousel.offsetWidth + 20;
        if (direction === "left") {
          scrollAmount = carousel.scrollLeft - scrollAmount;
        } else {
          scrollAmount = carousel.scrollLeft + scrollAmount;
        }

        carousel.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    },
    [carouselRef?.current]
  );

  const skeletonItem = useCallback((value: any, key: number) => {
    return (
      <div
        className="skeletonItem"
        key={String(key) + "-" + "xxxx" + "-" + String(value)}
      >
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  }, []);

  const skeletonItems = useMemo(() => {
    const n = 5;

    return [...Array(n)].map((e, i) => skeletonItem(e, i));
  }, [skeletonItem]);

  return (
    <div className="carousel">
      <ContentWrapper>
        <LeftArrow
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <RightArrow
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />

        {!isLoading && !isError ? (
          <div className="carouselItems" ref={carouselRef}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? `${url.poster}${item.poster_path}`
                : PosterFallback;
              return (
                <div
                  className="carouselItem"
                  key={item.id}
                  onClick={() =>
                    navigate(`/${item.media_type || endPoint}/${item.id}`)
                  }
                >
                  <div className="posterBlock">
                    <LazyImg src={`${posterUrl}`} alt={item.title} />
                    <CircleRating
                      rating={Number(item.vote_average).toFixed(1)}
                    />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <div className="title">{item.title || item.name}</div>
                    <div className="date">
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">{skeletonItems}</div>
        )}
      </ContentWrapper>
    </div>
  );
};
export default memo(Carousel);
