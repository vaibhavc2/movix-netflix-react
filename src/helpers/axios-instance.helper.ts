import { API_BASE_URL } from "@/constants";
import sanitizedConfig from "@/env";
import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

// const { TMDB_TOKEN, PROXY_HOST, PROXY_PORT, PROXY_USERNAME, PROXY_PASSWORD } =
//   sanitizedConfig;

export const createAxiosInstance = () => {
  // const proxyUrl = `http://${PROXY_USERNAME}:${PROXY_PASSWORD}@${PROXY_HOST}:${PROXY_PORT}`;
  // const httpsAgent = new HttpsProxyAgent(proxyUrl);

  const instance = axios.create({
    baseURL: API_BASE_URL,
    // httpsAgent, // Set the httpsAgent for proxy support
    // proxy: {
    //   host: PROXY_HOST,
    //   port: PROXY_PORT,
    //   auth: {
    //     username: PROXY_USERNAME,
    //     password: PROXY_PASSWORD,
    //   },
    //   protocol: "http",
    // },
    // headers: {
    //   Authorization: `Bearer ${TMDB_TOKEN}`,
    //   "Content-Type": "application/json",
    //   Accept: "application/json",
    // },
  });

  instance.interceptors.response.use(
    (response) => {
      // Handle successful response
      const contentType = response.headers["content-type"];
      if (contentType && contentType.includes("application/json")) {
        return response.data;
      } else {
        // Handle non-JSON response
        return response;
      }
    },
    (error) => {
      // Handle error
      console.error(error);
      throw error;
    }
  );

  return instance;
};
