import StandardFallback from "@/components/errors/StandardFallback";
import { store } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary FallbackComponent={StandardFallback}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          {/* devtools are disabled in production by default */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
