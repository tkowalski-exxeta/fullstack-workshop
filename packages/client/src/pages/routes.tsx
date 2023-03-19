import { MainLayout } from "layout/main-layout"
import {
  QuestionnaireMain,
  QuestionnaireDetails,
} from "questionnaire/Questionnaire"
import { Link, RouteObject } from "react-router-dom"

export const FormDisplay: React.FC = () => (
  <div>TODO: Implement form-display</div>
)

export const InitialContent: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div>
      <h1 className="text-lg text-center">Initial content</h1>
      <div className="inline-flex flex-row gap-4">
        <Link to="admin/questionnaire">
          <button>Admin-Page</button>
        </Link>
        <Link to="user/form/sample-id">
          <button>User-Page</button>
        </Link>
      </div>
    </div>
  </div>
)

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <InitialContent />,
      },
      {
        path: "admin",
        children: [
          {
            path: "questionnaire",
            children: [
              { index: true, element: <QuestionnaireMain /> },
              { path: ":id", element: <QuestionnaireDetails /> },
            ],
          },
        ],
      },
      {
        path: "user",
        children: [{ path: "form/:id", element: <FormDisplay /> }],
      },
    ],
  },
]
