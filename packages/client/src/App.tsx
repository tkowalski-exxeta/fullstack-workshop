
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MainLayout } from "./layout/main-layout"
import { FormPage } from "./pages/FormPage"

const queryClient = new QueryClient()

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
          <MainLayout>
            <FormPage />
          </MainLayout>
      </QueryClientProvider>
    </div>
  )
}

export default App
