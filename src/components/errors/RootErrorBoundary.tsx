import { HomeIcon, RefreshCwIcon } from "lucide-react";
import { memo, useCallback } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import ContentWrapper from "../ContentWrapper";

const RootErrorBoundary = () => {
  const error = useRouteError();
  if (error) console.error(error);

  const navigate = useNavigate();

  const resetErrorBoundary = useCallback(
    (location?: string) => {
      if (location) navigate(location);
      else window.location.reload();
    },
    [navigate]
  );
  return (
    <ContentWrapper>
      <div className="flex min-h-screen flex-col items-center justify-center text-center text-white">
        <div className="text-[5rem]">❌</div>
        <h1 className="mb-40 mt-10 text-3xl font-bold">
          Something went wrong...!
        </h1>
        <div className="mb-10">
          <div className="text-xl">Please try again by Refreshing.</div>
          <small>If the problem persists, please try again later.</small>
        </div>
        <button
          type="button"
          className="mt-4 flex w-40 items-center justify-center rounded-md bg-blue-500 py-2 text-xl text-white transition-all duration-300 ease-in-out hover:bg-blue-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
          onClick={() => resetErrorBoundary()}
        >
          <RefreshCwIcon className="scale-75" />
          <div>Reload</div>
        </button>
        <button
          type="button"
          className="mt-4 flex w-40 items-center justify-center rounded-md bg-green-500 py-2 text-xl text-white transition-all duration-300 ease-in-out hover:bg-green-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200"
          onClick={() => resetErrorBoundary("/")}
        >
          <HomeIcon className="scale-75" />
          <div>Home</div>
        </button>
      </div>
    </ContentWrapper>
  );
};

export default memo(RootErrorBoundary);
