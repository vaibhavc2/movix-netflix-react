import wretch from "wretch";
import QueryStringAddon from "wretch/addons/queryString";
import sanitizedConfig from "../env";

const { TMDB_TOKEN } = sanitizedConfig;

export const createWretchApi = (urlPath: string) => {
  return (
    wretch(urlPath)
      // query string addon
      .addon(QueryStringAddon)
      // Authorization header
      .auth(`Bearer ${TMDB_TOKEN}`)
      // cors : here not needed
      // .options({ credentials: "include", mode: "cors" })
      // error handling
      .errorType("json")
      // json parsing
      .resolve((resolver) => resolver.json())
  );
};
