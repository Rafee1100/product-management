import type { UseQueryResult } from "@tanstack/react-query";
import type { PaginatedResponse, Product } from "../../../types/product.type";
import LoadingSkeleton from "../../../components/ui/LoadingSkeleton";
import ProductCard from "./ProductCard";
import { Pagination } from "../../../components/ui/Pagination";
import { useFavourites } from "../../favourites";
import { QueryStatus } from "../../../constants/statuses";
import { NoProductsFound } from "./NoProductsFound";

type Props = {
  query: UseQueryResult<PaginatedResponse<Product>, Error>;
  page: number;
  onPageChange: (page: number) => void;
  onOpenProduct: (product: Product) => void;
  onClearFilters: () => void;
};

const Products = ({
  query,
  page,
  onPageChange,
  onOpenProduct,
  onClearFilters,
}: Props) => {
  const { isFavourite, toggle } = useFavourites();
  const { data, status } = query;
  const products = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalItems = data?.total ?? 0;

  if (status === QueryStatus.PENDING) {
    return <LoadingSkeleton />;
  }

  if (products.length === 0) {
    return <NoProductsFound onClearFilters={onClearFilters} />;
  }
  return (
    <>
      <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
        <p>
          {totalItems} product{totalItems === 1 ? "" : "s"} · page {page} of{" "}
          {totalPages}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavourite={isFavourite(product.id)}
            onToggleFavorite={toggle}
            onOpen={onOpenProduct}
          />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default Products;
