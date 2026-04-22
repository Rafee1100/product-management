import { X } from "lucide-react";
import type { Product } from "../../../types/product.type";

type Props = {
  product: Product;
  onOpen: (product: Product) => void;
  onRemove: (product: Product) => void;
};

const FavouriteItem = ({ product, onOpen, onRemove }: Props) => {
  return (
    <div className="flex gap-3 rounded-lg border border-slate-200 p-2 hover:bg-slate-50">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="flex min-w-0 flex-1 gap-3 rounded text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
      >
        <img
          src={product.image}
          alt=""
          loading="lazy"
          className="h-16 w-16 flex-none rounded bg-slate-100 object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-medium text-slate-900">
            {product.title}
          </p>
          <p className="text-xs text-slate-500">{product.category}</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            ${product.price.toFixed(2)} USD
          </p>
        </div>
      </button>
      <button
        type="button"
        onClick={() => onRemove(product)}
        aria-label={`Remove ${product.title} from favorites`}
        className="self-start rounded p-1 text-rose-500 hover:bg-rose-50"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default FavouriteItem;
