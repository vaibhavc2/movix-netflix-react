import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex h-screen flex-col justify-between">
      {/* From React Router Dom */}
      <Outlet />
    </div>
  );
};

export default RootLayout;
