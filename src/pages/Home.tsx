import { useState } from "react";
import { PAGE_SIZE } from "../constants/products";
import { useProductFilters } from "../features/products/hooks/useProductFilters";
import { useProductsQuery } from "../features/products/hooks/useProductsQuery";
import Navbar from "./Navbar";
import type { Product } from "../types/product.type";
import ProductFilters from "../features/products/components/ProductFilters";
import Products from "../features/products/components/Products";
import { FavouritePanel } from "../features/favourites";
import ProductDetail from "../features/products/components/ProductDetail";

const Home = () => {
  const filters = useProductFilters();
  const query = useProductsQuery({
    page: filters.page,
    limit: PAGE_SIZE,
    search: filters.debouncedSearch,
    category: filters.category,
    sort: filters.sort,
  });

  const [panelOpen, setPanelOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onOpenFavorites={() => setPanelOpen(true)} />
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
        <ProductFilters
          search={filters.search}
          onSearchChange={filters.setSearch}
          category={filters.category}
          onCategoryChange={filters.setCategory}
          sort={filters.sort}
          onSortChange={filters.setSort}
        />
        <Products
          query={query}
          page={filters.page}
          onPageChange={filters.setPage}
          onOpenProduct={setOpenProduct}
        />
      </div>
      <FavouritePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        onOpenProduct={(product) => {
          setPanelOpen(false);
          setOpenProduct(product);
        }}
      />
      <ProductDetail
        product={openProduct}
        onClose={() => setOpenProduct(null)}
      />
    </div>
  );
};

export default Home;
