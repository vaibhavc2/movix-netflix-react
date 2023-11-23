import avatar from "@/assets/avatar.png";
import ContentWrapper from "@/components/ContentWrapper";
import LazyImg from "@/components/LazyImg";
import { strID } from "@/helpers/str-id.helper";
import { useLoadingSkeleton } from "@/hooks/useLoadingSkeleton";
import { useAppSelector } from "@/store/store";
import { memo, useCallback, useMemo } from "react";

type Props = {
  data: any[];
  isLoading: boolean;
  isError: boolean;
};

const Cast = ({ data, isLoading, isError }: Props) => {
  const { url } = useAppSelector((state) => state.home);
  const makeSkeleton = useLoadingSkeleton();

  const skeletonItem = useCallback(
    (value: any, key: number) => (
      <div className="skItem" key={key + "-" + value + strID(key)}>
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    ),
    []
  );

  const loadingSkeleton = useMemo(
    () => makeSkeleton(skeletonItem, 6),
    [skeletonItem]
  );

  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!isLoading && !isError ? (
          <div className="listItems">
            {data &&
              data?.map((item: any, index) => (
                <div className="listItem" key={item.id + "-" + index}>
                  <div className="profileImg">
                    <LazyImg
                      src={
                        item.profile_path
                          ? `${url.profile}${item.profile_path}`
                          : avatar
                      }
                      alt={item.name}
                      placeholder={avatar}
                    />
                  </div>
                  <div className="textBlock">
                    <div className="name">{item.name}</div>
                    <div className="character">{item.character}</div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="castSkeleton">{loadingSkeleton}</div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default memo(Cast);
