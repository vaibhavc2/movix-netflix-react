import { API_BASE_URL } from "@/constants";
import { createWretchApi } from "@/helpers/wretch-api.helper";
import { printErrorMessage } from "@/utils/debug/print-error-message.util";

class TMDBAPI {
  private api;
  // public queryKey: any;

  constructor() {
    this.api = createWretchApi(API_BASE_URL);
  }

  fetchData = async (url: string, params?: any) => {
    // this.queryKey = queryKey;

    try {
      if (params) {
        const data = await this.api.query(params).get(url);
        return data;
      } else {
        const data = await this.api.get(url);
        return data;
      }
    } catch (error: any) {
      // debugging
      printErrorMessage(error, "TMDBAPI.fetchData");

      // message to display to user
      return "Something went wrong!";
    }
  };
}

export const tmdbAPI = new TMDBAPI();
