# Product Management Dashboard

A React + TypeScript project for browsing, searching, filtering, and favouriting products. Built as a submission for the frontend coding challenge described in [CHALLENGE.md](CHALLENGE.md).

**Tech stack:** React 19 · TypeScript · Vite · Tailwind CSS · TanStack Query · lucide-react

This project is live on: https://product-management-woad-five.vercel.app

---

## Getting Started

### Prerequisites

- **Node.js** 20 or later
- **pnpm** 9 or later (the repository uses a pnpm lockfile; `npm` or `yarn` will also work if you regenerate their lockfile)

### Setup

```bash
# Clone the repository
git clone https://github.com/Rafee1100/product-management.git
cd product-management

# Install dependencies
pnpm install

# Start the dev server on http://localhost:5173
pnpm dev
```

### Available scripts

| Command        | Purpose                                  |
| -------------- | ---------------------------------------- |
| `pnpm dev`     | Start the Vite dev server with HMR       |
| `pnpm build`   | Type-check and produce a production bundle |
| `pnpm preview` | Preview the production build locally     |
| `pnpm lint`    | Run ESLint over the project              |

---

## Data Source

As per Challenge  **Option B**, product data lives in a local JSON file at [`data/products.json`](data/products.json). A thin service layer ([`src/services/product-api.ts`](src/services/product-api.ts)) wraps it in an async, paginated interface and simulates 300–900ms of network latency, so the UI consumes it exactly as it would a real HTTP API. Swapping to a real backend later would be a single-file change.

---

## Architecture

### Folder layout

```
src/
├── components/ui/        # Design-system primitives (SearchBar, Filter, Dropdown, Pagination, LoadingSkeleton)
├── constants/            # Constant values across the system
├── features/
│   ├── products/         # Product list, card, detail modal, filters, hooks
│   └── favourites/       # Favourites context, provider, side panel, item row
├── hooks/                # Cross-cutting hooks (useDebounce, useLocalStorage)
├── lib/                  # Third-party client config (React Query)
├── pages/                # Route-level composition layout (Home, Navbar)
├── services/             # Data-access layer (mock API)
└── types/                # Shared TypeScript types
data/
└── products.json         # Mock dataset
```

### Key technical choices

- **Feature-based folders.** Each feature (`products`, `favourites`) owns its components, hooks, and (where relevant) context. This keeps module surface area small and makes future extraction into a separate package straightforward.

- **TanStack Query for data fetching.** Provides caching, request deduping, and a single place to manage loading / error / success states for the products list. Configured centrally in [`src/lib/queryClient.ts`](src/lib/queryClient.ts).

- **`useReducer` for filter state.** Search, category, and page interact (changing the search resets the page to 1, clearing filters resets all three), so a single reducer with discriminated-union actions is cleaner than orchestrating multiple `useState`s. See [`useProductFilters`](src/features/products/hooks/useProductFilters.ts).

- **Context + `useLocalStorage` for favourites.** Favourites need to be readable from anywhere in the tree and must persist across refreshes (Challenge §3B). `FavouritesProvider` reads/writes `localStorage` and also listens for the native `storage` event, so favourites stay in sync across browser tabs.

- **Debounced search.** A 300ms debounce in [`useDebounce`](src/hooks/useDebounce.ts) prevents every keystroke from triggering a query.

- **Responsive design.** Filter renders as pills on `sm+` and a dropdown on mobile. The favourites panel is a bottom sheet on mobile and a side drawer on desktop. The product grid steps from 1 → 4 columns as the viewport widens.

---

## Notes

- The mock API adds artificial latency so loading states are visible during development.
- Favourites are keyed by product id; toggling from any surface (card, detail modal, panel) stays consistent.
- Pagination falls back to a single page when a filter narrows the dataset.

---

## What I'd add with more time

- **Tests.** I pulled in `vitest` but didn't get to write any. The reducer in `useProductFilters`, `filterProducts` in the service, and the `useDebounce` / `useLocalStorage` hooks are the obvious first targets. After that, a small end-to-end flow: search something, favourite it, refresh the page, confirm it's still there.

- **Error state.** Loading and empty results are covered, but a failed fetch isn't. If the request blew up today the UI would just sit there quietly. `QueryStatus.ERROR` is already sitting in [`src/constants/statuses.ts`](src/constants/statuses.ts) waiting to be used; an error card with a retry button is a quick fix.

- **Filters in the URL.** Right now the filter state only lives in memory, so you can't share a filtered view and the back button doesn't undo a filter change. Putting `search`, `category`, and `page` into query params would fix both.

- **Product detail as a real route.** The detail view is a modal today, which means refreshing closes it and there's no way to link someone to a specific product. Moving it to `/products/:id` would make it refresh-safe and shareable.

- **Smarter pagination.** Fine for this dataset, but the control renders every page number as a button. Once the dataset is large enough, it'd need a windowed view (`1 … 5 6 7 … 42`) or just an infinite scroll.
