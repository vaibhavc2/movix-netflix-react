import React, { useCallback } from "react";

export const useEndPoint = (
  setEndPoint: React.Dispatch<React.SetStateAction<string>>
) => {
  const onTabChange = useCallback(
    (tab: string) => {
      if (tab === "Movies") {
        setEndPoint("movie");
      } else {
        setEndPoint("tv");
      }
    },
    [setEndPoint]
  );

  return { onTabChange };
};
