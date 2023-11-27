import { useCallback, useEffect } from "react";

type Props = {
  showPopupSearch: boolean;
  setShowPopupSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useGlobalSearch = ({
  showPopupSearch,
  setShowPopupSearch,
}: Props) => {
  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setShowPopupSearch(true);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setShowPopupSearch(false);
      }
    },
    [showPopupSearch, setShowPopupSearch]
  );

  useEffect(
    useCallback(() => {
      addEventListener("keydown", keyDownHandler);
      return () => {
        removeEventListener("keydown", keyDownHandler);
      };
    }, [])
  );
};
