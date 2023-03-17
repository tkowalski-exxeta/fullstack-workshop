// import { MainLayout } from "layout/main-layout"
import type { RouteObject } from "react-router-dom"
import "./App.css"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "admin",
        children: [
          {
            path: "questionnaire",
            children: [
              { path: "/", element: <QuestionnaireMain /> },
              { path: "/:id", element: <QuestionnaireDetails /> },
            ],
          },
        ],
      },
      {
        path: "user",
        children: [
          {path: "form/:id", element: <FormDisplay /> }
        ]
      }
    ],
  },
]
