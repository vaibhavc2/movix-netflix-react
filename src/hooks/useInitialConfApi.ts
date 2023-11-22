import { tmdbAPI } from "@/api/tmdb.api";
import { setApiConfig, setGenres } from "@/store/reducers/home-slice";
import { useAppDispatch } from "@/store/store";
import { useCallback, useEffect } from "react";

export const useInitialConfApi = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = useCallback(() => {
    tmdbAPI.fetchData("/configuration").then((res: any) => {
      const url = {
        backdrop: res?.images?.secure_base_url + "original",
        poster: res?.images?.secure_base_url + "original",
        profile: res?.images?.secure_base_url + "original",
      };

      dispatch(setApiConfig(url));
    });
  }, [tmdbAPI.fetchData, setApiConfig, dispatch]);

  const genresCall = useCallback(async () => {
    let promises = Array<Promise<any>>();
    let endPoints = ["tv", "movie"];
    const allGenres: any = {};

    endPoints.forEach((url) => {
      promises.push(tmdbAPI.fetchData(`/genre/${url}/list`));
    });

    const data: any = await Promise.all(promises);
    data.map(({ genres }: any) => {
      return genres.map((item: any) => (allGenres[item.id] = item));
    });

    dispatch(setGenres(allGenres));
  }, [tmdbAPI.fetchData, setGenres, dispatch]);
};
