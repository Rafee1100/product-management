import { createContext, useContext } from "react";
import type { Product } from "../../types/product.type";

export interface FavoritesContextValue {
  items: Product[];
  count: number;
  isFavourite: (id: string) => boolean;
  toggle: (product: Product) => void;
  clear: () => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);

export function useFavourites(): FavoritesContextValue {
  const favouriteContext = useContext(FavoritesContext);
  if (!favouriteContext) {
    throw new Error("useFavourites must be used within a FavoritesProvider");
  }
  return favouriteContext;
}
