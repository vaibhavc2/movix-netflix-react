import wretch from "wretch";

export const createWretchApi = (urlPath: string) => {
  return wretch(urlPath)
    .options({ credentials: "include", mode: "cors" })
    .errorType("json")
    .resolve((resolver) => resolver.json());
};
