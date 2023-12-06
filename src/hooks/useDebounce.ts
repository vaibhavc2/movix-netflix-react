import { useCallback, useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    useCallback(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]),
    [value, delay]
  );

  return debouncedValue;
};
