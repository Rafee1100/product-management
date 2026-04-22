import React from "react";
import type { Category, SortOption } from "../../../types/product.type";
import { CATEGORIES } from "../../../constants/products";
import SearchBar from "../../../components/ui/SearchBar";
import Filter from "../../../components/ui/Filter";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  category: Category | null;
  onCategoryChange: (category: Category | null) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
};

const categoryOptions = CATEGORIES.map((c) => ({ value: c, label: c }));

const ProductFilters = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}: Props) => {
  return (
    <div className="mb-5 flex flex-col gap-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-md">
          <SearchBar value={search} onChange={onSearchChange} />
        </div>
      </div>
      <Filter
        options={categoryOptions}
        selected={category}
        onChange={onCategoryChange}
        ariaLabel="Category"
        id="category-select"
      />
    </div>
  );
};

export default ProductFilters;
