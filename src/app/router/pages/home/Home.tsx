import { BASE_TITLE } from "@/constants";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import "@/styles/scss/other/pages/home.scss";
import { memo } from "react";
import HeroBanner from "./hero/HeroBanner";
import Popular from "./popular/Popular";
import TopRated from "./top-rated/TopRated";
import Trending from "./trending/Trending";

const Home = () => {
  useDocumentTitle(BASE_TITLE + " | Home");
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default memo(Home);
