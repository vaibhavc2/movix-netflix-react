import { tmdbAPI } from "@/api/tmdb.api";
import { useQuery } from "@tanstack/react-query";

export const useApi = (url: any, queryKey: any, params?: any) => {
  const query = useQuery({
    queryKey,
    queryFn: async () => {
      return (await tmdbAPI.fetchData(url, params)) as any;
    },
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    // throwOnError: true,
  });

  return query;
};
