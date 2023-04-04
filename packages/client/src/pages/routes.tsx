import { FormDetails, FormDisplay, FormMain } from "forms/Form";
import { MainLayout } from "layout/main-layout";
import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <FormMain />,
      },
      {
        path: "admin",
        children: [{ path: "forms/:id", element: <FormDetails /> }],
      },
      {
        path: "user",
        children: [{ path: "forms/:id", element: <FormDisplay /> }],
      },
    ],
  },
];
