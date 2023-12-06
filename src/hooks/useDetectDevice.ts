import { setIsMobile, setIsPC } from "@/store/reducers/device-slice";
import { useAppDispatch } from "@/store/store";
import MobileDetect from "mobile-detect";
import { useCallback, useEffect } from "react";

export const useDetectDevice = () => {
  const dispatch = useAppDispatch();

  useEffect(
    useCallback(() => {
      const type = new MobileDetect(window.navigator.userAgent);
      if (
        type.os() === "iOS" ||
        type.os() === "AndroidOS" ||
        type.os() === "BlackBerryOS" ||
        type.os() === "WindowsMobileOS" ||
        type.os() === "WindowsPhoneOS" ||
        type.os() === "iPadOS"
      ) {
        dispatch(setIsMobile(true));
        dispatch(setIsPC(false));
      } else {
        dispatch(setIsMobile(false));
        dispatch(setIsPC(true));
      }
    }, [MobileDetect, setIsMobile]),
    []
  );
};
