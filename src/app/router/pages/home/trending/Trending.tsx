import Carousel from "@/components/Carousel";
import ContentWrapper from "@/components/ContentWrapper";
import SwitchTabs from "@/components/SwitchTabs";
import { useApi } from "@/hooks/useApi";
import { memo, useCallback, useState } from "react";

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");

  const { data, isLoading, isError } = useApi(`/trending/all/${endPoint}`, [
    `trending-${endPoint}`,
  ]);

  const onTabChange = useCallback(
    (tab: string) => {
      setEndPoint(tab.toLowerCase());
    },
    [setEndPoint]
  );

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel data={data?.results} isLoading={isLoading} isError={isError} />
    </div>
  );
};
export default memo(Trending);
