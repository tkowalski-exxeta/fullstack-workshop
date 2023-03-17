import "./App.css"
import { QuestionnaireDetails } from "./questionnaire/Questionnaire"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/:id",
    element: <QuestionnaireDetails />,
  },
]);


export function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  )
}
