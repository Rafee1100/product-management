import { Heart } from "lucide-react";
import type { Product } from "../../../types/product.type";

type Props = {
  product: Product;
  isFavourite: boolean;
  onToggleFavorite: (product: Product) => void;
  onOpen: (product: Product) => void;
};

const ProductCard = ({
  product,
  isFavourite,
  onToggleFavorite,
  onOpen,
}: Props) => {

  return (
    <div
      onClick={() => onOpen(product)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product);
          }}
          aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow backdrop-blur hover:bg-white"
        >
          <Heart
            className={
              "h-4 w-4 " +
              (isFavourite ? "fill-rose-500 text-rose-500" : "text-slate-500")
            }
          />
        </button>
        <span className="absolute left-2 top-2 rounded-full bg-slate-900/80 px-2 py-0.5 text-xs font-medium text-white">
          {product.category}
        </span>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="line-clamp-2 min-h-10 text-sm font-semibold text-slate-900">
          {product.title}
        </h3>
        <p className="line-clamp-2 text-xs text-slate-500">
          {product.description}
        </p>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-base font-semibold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          {product.rating !== undefined && (
            <span className="text-xs text-amber-600">
              ★ {product.rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
