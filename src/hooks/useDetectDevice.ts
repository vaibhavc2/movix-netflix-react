import MobileDetect from "mobile-detect";
import { useCallback, useEffect, useState } from "react";

export const useDetectDevice = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPC, setIsPC] = useState(false);

  useEffect(
    useCallback(() => {
      let type = new MobileDetect(window.navigator.userAgent);
      if (
        type.os() === "iOS" ||
        type.os() === "AndroidOS" ||
        type.os() === "BlackBerryOS" ||
        type.os() === "WindowsMobileOS" ||
        type.os() === "WindowsPhoneOS" ||
        type.os() === "iPadOS"
      ) {
        setIsMobile(true);
        setIsPC(false);
      } else {
        setIsMobile(false);
        setIsPC(true);
      }
    }, [MobileDetect, setIsMobile]),
    []
  );

  return { isMobile, isPC };
};
