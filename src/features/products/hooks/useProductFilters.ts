import { useReducer } from "react";
import type { Category, SortOption } from "../../../types/product.type";
import { useDebounce } from "../../../hooks/useDebounce";

type ProductFilterState = {
  search: string;
  category: Category | null;
  sort: SortOption;
  page: number;
};

type FilterAction =
  | { type: "searchChanged"; value: string }
  | { type: "categorySelected"; value: Category | null }
  | { type: "sortSelected"; value: SortOption }
  | { type: "pageChanged"; value: number }
  | { type: "filtersCleared" };

const defaultFilter: ProductFilterState = {
  search: "",
  category: null,
  sort: "default",
  page: 1,
};

function filterReducer(
  state: ProductFilterState,
  action: FilterAction,
): ProductFilterState {
  switch (action.type) {
    case "searchChanged":
      return { ...state, search: action.value, page: 1 };
    case "categorySelected":
      return { ...state, category: action.value, page: 1 };
    case "sortSelected":
      return { ...state, sort: action.value };
    case "pageChanged":
      return { ...state, page: action.value };
    case "filtersCleared":
      return { ...defaultFilter };
    default:
      return state;
  }
}

export function useProductFilters() {
  const [filters, dispatch] = useReducer(filterReducer, defaultFilter);
  const debouncedSearch = useDebounce(filters.search, 300).trim();

  const setSearch = (value: string) =>
    dispatch({ type: "searchChanged", value });
  const setCategory = (value: Category | null) =>
    dispatch({ type: "categorySelected", value });
  const setSort = (value: SortOption) =>
    dispatch({ type: "sortSelected", value });
  const setPage = (value: number) => dispatch({ type: "pageChanged", value });
  const clearFilters = () => dispatch({ type: "filtersCleared" });

  return {
    ...filters,
    debouncedSearch,
    setSearch,
    setCategory,
    setSort,
    setPage,
    clearFilters,
  };
}
