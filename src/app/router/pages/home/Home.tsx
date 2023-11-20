// import { tmdbAPI } from "@/api/tmdb.api";
// import { getGenres } from "@/store/reducers/home-slice";
// import { useAppDispatch, useAppSelector } from "@/store/store";
// import { useCallback, useEffect } from "react";

import "@/styles/scss/other/pages/home.scss";
import HeroBanner from "./hero/HeroBanner";

const Home = () => {
  // const dispatch = useAppDispatch();
  // const genres = useAppSelector((state) => state.home.genres);

  // useEffect(() => {
  //   apiTesting();
  // }, []);

  // const apiTesting = useCallback(async () => {
  //   const data = await tmdbAPI.fetchData("/movie/popular", {});
  //   // console.log(data);
  //   dispatch(getGenres(data));
  // }, [tmdbAPI]);

  return (
    <>
      <HeroBanner />
    </>
  );
};

export default Home;
