import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../../../services/product-api";
import type { FetchProductsParams } from "../../../types/product.type";

export function useProductsQuery(params: FetchProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => api.fetchProducts(params),
    placeholderData: keepPreviousData,
  });
}
