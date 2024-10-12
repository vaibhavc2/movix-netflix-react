import wretch from "wretch";
import QueryStringAddon from "wretch/addons/queryString";
import sanitizedConfig from "../env";
// import { HttpsProxyAgent } from "https-proxy-agent/dist";

const { TMDB_TOKEN } = sanitizedConfig;

export const createWretchApi = (urlPath: string) => {
  // create the proxy agent
  // Construct the proxy agent URL with authentication
  // const proxyUrl = `http://${PROXY_USERNAME}:${PROXY_PASSWORD}@${PROXY_HOST}:${PROXY_PORT}`;
  // console.log("proxyUrl", proxyUrl);

  // Create the proxy agent using the URL format
  // const proxyAgent = new HttpsProxyAgent(proxyUrl);
  // const proxyAgent = new HttpsProxyAgent({
  //   host: PROXY_HOST,
  //   port: String(PROXY_PORT),
  //   auth: `${PROXY_USERNAME}:${PROXY_PASSWORD}`,
  //   protocol: "http://",
  //   rejectUnauthorized: false,
  // } as URL);
  const proxyAgent = undefined;
  return (
    wretch(urlPath)
      // query string addon
      .addon(QueryStringAddon)
      // Set the fetch options to use the proxy agent if available
      .polyfills({
        fetch: (url: string, options: any) =>
          fetch(url, { ...options, agent: proxyAgent }),
      })
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
