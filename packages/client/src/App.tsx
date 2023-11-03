import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainLayout } from "./layout/MainLayout";
import { FormPage } from "./pages/FormPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <FormPage />
      </MainLayout>
    </QueryClientProvider>
  );
}

export default App;
