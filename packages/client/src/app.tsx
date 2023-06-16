import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { routes } from "./pages/routes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const router = createBrowserRouter(routes)
const queryClient = new QueryClient()

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  )
}

export default App
