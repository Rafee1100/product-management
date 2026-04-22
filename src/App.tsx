import { QueryClientProvider } from "@tanstack/react-query";
import { FavouritesProvider } from "./features/favourites";
import Home from "./pages/Home";
import { queryClient } from "./lib/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavouritesProvider>
        <Home />
      </FavouritesProvider>
    </QueryClientProvider>
  );
}

export default App;
