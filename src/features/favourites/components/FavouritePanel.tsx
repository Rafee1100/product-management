import { Heart, Trash2, X } from "lucide-react";
import type { Product } from "../../../types/product.type";
import { useFavourites } from "../FavouritesContext";
import FavouriteItem from "./FavouriteItem";

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenProduct: (product: Product) => void;
};

const FavouritePanel = ({ open, onClose, onOpenProduct }: Props) => {
  const { items, toggle, clear, count } = useFavourites();
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          aria-hidden
          className="fixed inset-0 z-30 bg-slate-900/40"
        />
      )}
      <aside
        aria-label="Favorites"
        aria-hidden={!open}
        className={
          "fixed z-40 bg-white shadow-xl transition-transform duration-200 ease-out " +
          "inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl " +
          "md:inset-y-0 md:right-0 md:left-auto md:w-96 md:max-h-none md:rounded-none " +
          (open
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-full md:translate-y-0 md:translate-x-full")
        }
      >
        <div className="flex h-full max-h-[85vh] flex-col md:h-screen md:max-h-none">
          <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500" />
              <h2 className="text-base font-semibold text-slate-900">
                Favorites ({count})
              </h2>
            </div>
            <div className="flex items-center gap-1">
              {count > 0 && (
                <button
                  type="button"
                  onClick={clear}
                  className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-slate-500 hover:text-rose-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded p-1 text-slate-500 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <p className="mt-6 text-center text-sm text-slate-500">
                No favorites yet. Tap the heart on any product.
              </p>
            ) : (
              <ul className="space-y-3">
                {items.map((product) => (
                  <FavouriteItem
                    key={product.id}
                    product={product}
                    onOpen={onOpenProduct}
                    onRemove={toggle}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default FavouritePanel;
