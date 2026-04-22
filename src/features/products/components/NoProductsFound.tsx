import { SearchX } from "lucide-react";

interface NoProductsFoundProps {
  onClearFilters: () => void;
}

export function NoProductsFound({ onClearFilters }: NoProductsFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-xl border border-dashed border-slate-200 bg-white">
      <div className="mb-3 text-slate-400">
        <SearchX className="h-8 w-8" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">
        No products found
      </h3>
      <p className="mt-1 text-sm text-slate-500 max-w-sm">
        Try adjusting your search or clearing the filters.
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Clear filters
      </button>
    </div>
  );
}
