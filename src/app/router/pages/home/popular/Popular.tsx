import Carousel from "@/components/Carousel";
import ContentWrapper from "@/components/ContentWrapper";
import SwitchTabs from "@/components/SwitchTabs";
import { useApi } from "@/hooks/useApi";
import { useState } from "react";

const Popular = () => {
  const [endPoint, setEndPoint] = useState("movie");

  const { data, isLoading, isError } = useApi(`/${endPoint}/popular`, [
    `popular-${endPoint}`,
  ]);

  const onTabChange = (tab: string) => {
    if (tab === "Movies") {
      setEndPoint("movie");
    } else {
      setEndPoint("tv");
    }
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>

      <Carousel
        data={data?.results}
        isLoading={isLoading}
        isError={isError}
        endPoint={endPoint}
      />
    </div>
  );
};
export default Popular;
