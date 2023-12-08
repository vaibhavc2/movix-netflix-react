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
        document.body.classList.add("overflow-hidden");
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setShowPopupSearch(false);
        document.body.classList.remove("overflow-hidden");
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
