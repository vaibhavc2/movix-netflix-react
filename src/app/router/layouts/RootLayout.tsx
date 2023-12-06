import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PopupSearch from "@/components/PopupSearch";
import { useDetectDevice } from "@/hooks/useDetectDevice";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";
import { useInitialConfApi } from "@/hooks/useInitialConfApi";
import { useAppSelector } from "@/store/store";
import React, { memo, useState } from "react";
import { Outlet } from "react-router-dom";

interface Props {
  children: typeof Outlet | React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  const [showPopupSearch, setShowPopupSearch] = useState(false);
  const { isPC } = useAppSelector((state) => state.device);

  useDetectDevice(); // custom hook to detect device
  useInitialConfApi(); // custom hook to fetch initial configs

  if (isPC) useGlobalSearch({ setShowPopupSearch, showPopupSearch });

  return (
    <>
      {isPC && showPopupSearch && (
        <PopupSearch setShowPopupSearch={setShowPopupSearch} />
      )}
      <Header setShowPopupSearch={setShowPopupSearch} />
      {children}
      <Footer />
    </>
  );
};

export default memo(RootLayout);
