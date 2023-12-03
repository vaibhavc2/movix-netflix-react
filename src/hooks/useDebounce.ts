import { useCallback, useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    useCallback(() => {
      const handler = setTimeout(() => {
        console.log("debounce");
        setDebouncedValue(value);
      }, delay);

      return () => {
        console.log("clear");
        clearTimeout(handler);
      };
    }, [value, delay]),
    [value, delay]
  );

  return debouncedValue;
};
