import { Heart, X } from "lucide-react";
import type { Product } from "../../../types/product.type";
import { useFavourites } from "../../favourites";

type Props = { product: Product | null; onClose: () => void };

const ProductDetail = ({ product, onClose }: Props) => {
  const { isFavourite, toggle } = useFavourites();
  if (!product) return;
  const favouriteProduct = isFavourite(product.id);
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-700 shadow backdrop-blur hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="aspect-video bg-slate-100">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-xs font-medium text-white">
              {product.category}
            </span>
            {product.rating !== undefined && (
              <span className="text-xs text-amber-600">
                ★ {product.rating.toFixed(1)}
              </span>
            )}
          </div>
          <h2 className="text-xl font-semibold text-slate-900">
            {product.title}
          </h2>
          <p className="mt-3 text-sm text-slate-600">{product.description}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-2xl font-semibold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            <button
              type="button"
              onClick={() => toggle(product)}
              className={
                "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition " +
                (favouriteProduct
                  ? "border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
                  : "bg-slate-900 text-white hover:bg-slate-800")
              }
            >
              <Heart
                className={
                  "h-4 w-4 " +
                  (favouriteProduct ? "fill-rose-500 text-rose-500" : "")
                }
              />
              {favouriteProduct ? "Favorited" : "Add to favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
