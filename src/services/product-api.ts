import mockProducts from "../../data/products.json";
import { PAGE_SIZE } from "../constants/products";
import type {
  Category,
  FetchProductsParams,
  PaginatedResponse,
  Product,
} from "../types/product.type";

const products = mockProducts as Product[];

export function filterProducts(
  items: Product[],
  query: string,
  category: Category | null,
): Product[] {
  const filterQuery = query.trim().toLowerCase();
  return items.filter((p) => {
    const matchesQuery =
      filterQuery.length === 0 ||
      p.title.toLowerCase().includes(filterQuery) ||
      p.description.toLowerCase().includes(filterQuery);
    const matchesCategory = !category || p.category === category;
    return matchesQuery && matchesCategory;
  });
}

function generateDelay(min: number, max: number) {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export const api = {
  async fetchProducts(
    params: FetchProductsParams,
  ): Promise<PaginatedResponse<Product>> {
    const {
      page = 1,
      limit = PAGE_SIZE,
      category = null,
      search = "",
    } = params;

    await generateDelay(300, 900);

    const filteredProducts = filterProducts(products, search, category);
    const totalProducts = filteredProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalProducts / limit));
    const start = (page - 1) * limit;

    return {
      data: filteredProducts.slice(start, start + limit),
      total: totalProducts,
      page,
      limit,
      totalPages,
    };
  },
};
