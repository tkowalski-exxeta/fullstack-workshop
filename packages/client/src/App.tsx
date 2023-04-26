import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "pages/routes";

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

export function App() {
  return (
    <div className="h-screen w-screen">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}
