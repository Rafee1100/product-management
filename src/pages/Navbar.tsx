import { Heart, Hexagon } from "lucide-react";
import { useFavourites } from "../features/favourites";

type Props = { onOpenFavorites: () => void };

const Navbar = ({ onOpenFavorites }: Props) => {
  const { count } = useFavourites();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2">
          <Hexagon className="h-6 w-6 text-orange-600" />
          <h1 className="text-lg font-semibold text-slate-900">
            Product Dashboard
          </h1>
        </div>
        <button
          type="button"
          onClick={onOpenFavorites}
          aria-label={`Open favorites (${count})`}
          className="relative inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          <Heart className="h-4 w-4 text-rose-500" />
          <span className="hidden sm:inline">Favorites</span>
          {count > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-orange-600 px-1 text-xs font-semibold text-white">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
