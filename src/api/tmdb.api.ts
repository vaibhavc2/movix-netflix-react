import { API_BASE_URL } from "../constants";
import { createWretchApi } from "../helpers/wretch-api.helper";
import { printErrorMessage } from "../utils/debug/print-error-message.util";

class TMDBAPI {
  private api;
  // public queryKey;

  constructor() {
    this.api = createWretchApi(API_BASE_URL);
    // this.queryKey = ["tmdb"]; // change this acc to fetchData function
  }

  fetchData = async (url: string, params: any) => {
    try {
      const data = await this.api.query(params).get(url);
      return data;
    } catch (error: any) {
      printErrorMessage(error, "TMDBAPI.fetchData");
    }
  };
}

export const tmdbAPI = new TMDBAPI();
