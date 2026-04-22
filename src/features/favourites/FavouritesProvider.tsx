import { type ReactNode } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { Product } from "../../types/product.type";
import { FavoritesContext } from "./FavouritesContext";

type Props = {
  children: ReactNode;
};

const STORAGE_KEY = "favorites";

const FavouritesProvider = ({ children }: Props) => {
  const [favouriteProducts, setFavouriteProducts] = useLocalStorage<Product[]>(
    STORAGE_KEY,
    [],
  );

  const isFavourite = (id: string) =>
    favouriteProducts.some((product) => product.id === id);

  const toggle = (product: Product) => {
    setFavouriteProducts((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product],
    );
  };

  const clear = () => setFavouriteProducts([]);

  const value = {
    items: favouriteProducts,
    count: favouriteProducts.length,
    isFavourite,
    toggle,
    clear,
  };
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavouritesProvider;
