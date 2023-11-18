import { createWretchApi } from "../../helpers/wretch-api.helper";

class ProductsAPI {
  private api;
  public queryKey;

  constructor() {
    this.api = createWretchApi("/api");
    this.queryKey = ["products"];
  }

  getAllProducts = async () => {
    try {
      const data = await this.api.get("/products");
      return data;
    } catch (error: any) {
      const message =
        typeof error.message === "object" &&
        Object.keys(error.message).length > 0
          ? JSON.stringify(error.message)
          : error.response.statusText;
      console.error(`${error.status}: ${message}`);
    }
  };

  searchProducts = async (keyword: string) => {
    try {
      const data = await this.api.get(`/products/?search=${keyword}`);
      return data;
    } catch (error: any) {
      const message =
        typeof error.message === "object" &&
        Object.keys(error.message).length > 0
          ? JSON.stringify(error.message)
          : error.response.statusText;
      console.error(`${error.status}: ${message}`);
    }
  };
}

export const productsAPI = new ProductsAPI();
