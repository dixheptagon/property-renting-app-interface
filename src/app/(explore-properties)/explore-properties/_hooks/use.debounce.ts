import { useState, useEffect } from "react";

/**
 * Hook untuk debounce value
 * @param value - Nilai yang ingin di-debounce
 * @param delay - Delay dalam ms (default: 500)
 * @returns Nilai yang sudah di-debounce
 */
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (debouncedValue === value) return;

    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
