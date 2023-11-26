import { useCallback, useEffect } from "react";

export const useScrollEvent = (callback: () => void) => {
  useEffect(
    useCallback(() => {
      window.addEventListener("scroll", callback);
      return () => window.removeEventListener("scroll", callback);
    }, [callback]),
    [callback]
  );
};
