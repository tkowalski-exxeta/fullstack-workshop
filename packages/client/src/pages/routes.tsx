import { Navigate, RouteObject } from "react-router-dom";
import { FormDetailsPage, FormEditorPage, FormListPage } from "../forms/index";
import { AdminLayout } from "../layout/AdminLayout";
import { MainLayout } from "../layout/MainLayout";
import { ErrorPage } from "./ErrorPage";
import { Login } from "./Login";
import { PrivateRoute } from "./PrivateRoute";
import { ThankYouPage } from "./ThankYouPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin" />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "user",
        children: [{ path: ":id", element: <FormDetailsPage /> }],
      },
      {
        path: "admin",
        element: (
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <FormListPage /> },
          { path: ":id", element: <FormEditorPage /> },
        ],
        handle: {
          roles: ["admin"],
        },
      },
      { path: "thank-you", element: <ThankYouPage /> },
    ],
  },
];
