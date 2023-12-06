import { setIsMobile, setIsPC } from "@/store/reducers/device-slice";
import { useAppDispatch } from "@/store/store";
import { useCallback, useEffect } from "react";

export const useDetectDevice = () => {
  const dispatch = useAppDispatch();

  useEffect(
    useCallback(() => {
      const userAgent =
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;

      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      );

      if (mobile) {
        dispatch(setIsMobile(true));
        dispatch(setIsPC(false));
      } else {
        dispatch(setIsMobile(false));
        dispatch(setIsPC(true));
      }
    }, [setIsMobile, setIsPC]),
    []
  );
};
