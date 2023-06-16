import { Navigate, RouteObject } from "react-router-dom";
import { FormDetails, FormEditorPage, FormMain } from "../forms";
import { AdminLayout } from "../layout/admin-layout";
import { MainLayout } from "../layout/main-layout";
import { ErrorPage } from "./error-page";
import { Login } from "./login";
import { ThankYouPage } from "./thank-you";
import { PrivateRoute } from "./private-route";

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
        children: [{ path: ":id", element: <FormDetails /> }],
      },
      {
        path: "admin",
        element: (
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <FormMain /> },
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
