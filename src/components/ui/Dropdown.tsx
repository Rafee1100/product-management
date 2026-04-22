interface DropdownOption<T extends string> {
  value: T;
  label: string;
}

interface DropdownProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: readonly DropdownOption<T>[];
  id?: string;
  ariaLabel?: string;
  className?: string;
}

const Dropdown = <T extends string>({
  value,
  onChange,
  options,
  id,
  ariaLabel,
  className,
}: DropdownProps<T>) => {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      aria-label={ariaLabel}
      className={
        "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:outline-none " +
        (className ?? "")
      }
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
