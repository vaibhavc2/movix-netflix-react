import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PopupSearch from "@/components/PopupSearch";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";
import { useInitialConfApi } from "@/hooks/useInitialConfApi";
import { DetectDevice } from "@/utils/device/detectDevice.util";
import { memo, useState } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const [showPopupSearch, setShowPopupSearch] = useState(false);
  const isPC = !DetectDevice.isMobile();

  useInitialConfApi();
  if (isPC) useGlobalSearch({ setShowPopupSearch, showPopupSearch });

  return (
    <>
      {isPC && showPopupSearch && (
        <PopupSearch setShowPopupSearch={setShowPopupSearch} />
      )}
      <Header setShowPopupSearch={setShowPopupSearch} />
      <Outlet />
      <Footer />
    </>
  );
};

export default memo(RootLayout);
