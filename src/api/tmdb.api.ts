import { API_BASE_URL } from "@/constants";
import { createWretchApi } from "@/helpers/wretch-api.helper";
import { printErrorMessage } from "@/utils/debug/print-error-message.util";

class TMDBAPI {
  private api;

  constructor() {
    this.api = createWretchApi(API_BASE_URL);
  }

  fetchData = async (url: string, params?: any) => {
    try {
      if (params) {
        const data = await this.api.query(params).get(url);
        return data as any;
      } else {
        const data = await this.api.get(url);
        return data as any;
      }
    } catch (error: any) {
      // debugging
      printErrorMessage(error, "TMDBAPI.fetchData");
      throw new Error(error);
    }
  };
}

export const tmdbAPI = new TMDBAPI();
