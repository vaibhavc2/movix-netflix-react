import MobileDetect from "mobile-detect";

function detectDevice() {
  let type = new MobileDetect(window.navigator.userAgent);

  if (
    type.os() === "iOS" ||
    type.os() === "AndroidOS" ||
    type.os() === "BlackBerryOS" ||
    type.os() === "WindowsMobileOS" ||
    type.os() === "WindowsPhoneOS" ||
    type.os() === "iPadOS"
  )
    return true;

  return false;
}

export class DetectDevice {
  static isMobile() {
    return detectDevice();
  }
}
