import mockProducts from "../../data/products.json";
import type {
  Category,
  FetchProductsParams,
  PaginatedResponse,
  Product,
  SortOption,
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

export function sortProducts(items: Product[], sort: SortOption): Product[] {
  switch (sort) {
    case "name-asc":
      return items.sort((a, b) => a.title.localeCompare(b.title));
    case "price-asc":
      return items.sort((a, b) => a.price - b.price);
    case "price-desc":
      return items.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return items.sort(
        (a, b) => (b.rating ?? -Infinity) - (a.rating ?? -Infinity),
      );
    default:
      return items;
  }
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
      limit = 15,
      category = null,
      search = "",
      sort = "default",
    } = params;

    await generateDelay(300, 900);

    const filteredAndSortedProducts = sortProducts(
      filterProducts(products, search, category),
      sort,
    );
    const totalProducts = filteredAndSortedProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalProducts / limit));
    const start = (page - 1) * limit;

    return {
      data: filteredAndSortedProducts.slice(start, start + limit),
      total: totalProducts,
      page,
      limit,
      totalPages,
    };
  },
};
