import RootLayout from "@/app/router/layouts/RootLayout";
import { memo } from "react";
import RootErrorBoundary from "./RootErrorBoundary";

const StandardErrorBoundary = () => {
  return (
    <>
      <RootLayout>
        <RootErrorBoundary />
      </RootLayout>
    </>
  );
};

export default memo(StandardErrorBoundary);
