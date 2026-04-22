import { useCallback, useEffect, useRef, useState } from "react";

function readFromStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const initialValueRef = useRef(initialValue);
  initialValueRef.current = initialValue;

  const [storedValue, setStoredValue] = useState<T>(() =>
    readFromStorage(key, initialValue),
  );
  const setToStorage = useCallback(
    (next: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          console.log(`Failed to set localStorage for key "${key}"`);
        }
        return resolved;
      });
    },
    [key],
  );

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key || event.storageArea !== localStorage) return;
      setStoredValue(readFromStorage(key, initialValueRef.current));
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key]);

  return [storedValue, setToStorage] as const;
}
