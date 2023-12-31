import avatar from "@/assets/avatar.png";
import ContentWrapper from "@/components/ContentWrapper";
import GoogleSearchLink from "@/components/GoogleSearchLink";
import LazyImg from "@/components/LazyImg";
import { strID } from "@/helpers/str-id.helper";
import { useLoadingSkeleton } from "@/hooks/useLoadingSkeleton";
import { useAppSelector } from "@/store/store";
import { memo, useCallback, useMemo } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

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
          <ScrollContainer className="listItems">
            {data &&
              data?.map((item: any, index) => (
                <div className="listItem" key={item.id + "-" + index}>
                  <div className="profileImg hover:border-2 hover:border-slate-200">
                    <GoogleSearchLink searchQuery={item.name}>
                      <LazyImg
                        src={
                          item.profile_path
                            ? `${url.profile}${item.profile_path}`
                            : avatar
                        }
                        alt={item.name}
                        onError={(e) => {
                          e.preventDefault();
                          e.currentTarget.src = avatar;
                        }}
                      />
                    </GoogleSearchLink>
                  </div>
                  <div className="textBlock">
                    <GoogleSearchLink searchQuery={item.name}>
                      <div className="name hover:underline">{item.name}</div>
                    </GoogleSearchLink>
                    <GoogleSearchLink
                      searchQuery={`${item.name} playing role of ${item.character}`}
                    >
                      <div className="character hover:underline">
                        {item.character}
                      </div>
                    </GoogleSearchLink>
                  </div>
                </div>
              ))}
          </ScrollContainer>
        ) : (
          <div className="castSkeleton">{loadingSkeleton}</div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default memo(Cast);
