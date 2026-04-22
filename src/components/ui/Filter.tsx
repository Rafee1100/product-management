import { type ReactNode } from "react";
import Dropdown from "./Dropdown";

type Props<T extends string> = {
  options: readonly { value: T; label: string }[];
  selected: T | null;
  onChange: (value: T | null) => void;
  allLabel?: string;
  ariaLabel?: string;
  id?: string;
};

const Filter = <T extends string>({
  options,
  selected,
  onChange,
  allLabel = "All",
  ariaLabel,
  id,
}: Props<T>) => {
  const filterOptions = [{ value: "" as const, label: allLabel }, ...options];
  return (
    <>
      <div className="hidden flex-wrap gap-2 sm:flex">
        <Pill active={selected === null} onClick={() => onChange(null)}>
          {allLabel}
        </Pill>
        {options.map((option) => (
          <Pill
            key={option.value}
            active={selected === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Pill>
        ))}
      </div>
      <div className="sm:hidden">
        <Dropdown
          id={id}
          value={selected ?? ""}
          onChange={(v) => onChange((v || null) as T | null)}
          options={filterOptions}
          ariaLabel={ariaLabel}
        />
      </div>
    </>
  );
};

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        "rounded-full px-3 py-1 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 " +
        (active
          ? "bg-orange-600 text-white shadow-sm"
          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50")
      }
    >
      {children}
    </button>
  );
}

export default Filter;
