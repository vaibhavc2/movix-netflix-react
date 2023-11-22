import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useInitialConfApi } from "@/hooks/useInitialConfApi";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  useInitialConfApi();

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
