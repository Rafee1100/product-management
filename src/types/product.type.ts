export type Category = "Electronics" | "Fashion" | "Home" | "Books" | "Sports";

export type SortOption =
  | "default"
  | "name-asc"
  | "price-asc"
  | "price-desc"
  | "rating-desc";

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: Category;
  rating?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FetchProductsParams {
  page?: number;
  limit?: number;
  category?: Category | null;
  search?: string;
  sort?: SortOption;
}
