import RootLayout from "@/app/router/layouts/RootLayout";
import { memo } from "react";
import { FallbackProps } from "react-error-boundary";
import ContentWrapper from "../ContentWrapper";

type Props = {} & FallbackProps;

const StandardFallback = ({ resetErrorBoundary }: Props) => {
  return (
    <>
      <RootLayout>
        <ContentWrapper>
          <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Something went wrong...!</h1>
            <p className="text-xl">Please try again by Refreshing.</p>
            <button
              type="button"
              className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
              onClick={resetErrorBoundary}
            />
          </div>
        </ContentWrapper>
      </RootLayout>
    </>
  );
};
export default memo(StandardFallback);
