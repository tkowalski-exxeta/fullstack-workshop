import "./App.css"
import { QuestionnaireDetails, QuestionnaireMain } from "./questionnaire/Questionnaire"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuestionnaireMain />,
  },
  {
    path: "/:id",
    element: <QuestionnaireDetails />,
  },
])
const queryClient = new QueryClient();

export function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  )
}
