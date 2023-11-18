import { useCallback, useEffect } from "react";
import { tmdbAPI } from "../../../../api/tmdb.api";
import { getGenres } from "../../../../store/reducers/home-slice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";

const Home = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector((state) => state.home.genres);

  useEffect(() => {
    apiTesting();
  }, []);

  const apiTesting = useCallback(async () => {
    const data = await tmdbAPI.fetchData("/movie/popular", {});
    // console.log(data);
    dispatch(getGenres(data));
  }, [tmdbAPI]);

  return (
    <>
      <div className="m-10 text-center text-slate-50">HOME Page</div>
      <div className="m-10 text-center text-slate-50">
        {genres?.results?.map((genre: any) => (
          <div key={genre.id}>{genre.title}</div>
        ))}
      </div>
    </>
  );
};

export default Home;
