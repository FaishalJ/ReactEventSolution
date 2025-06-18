import { createBrowserRouter } from "react-router";

import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailPage from "../../features/activities/details/ActivityDetailPage";
import Counter from "../../features/counter/Counter";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "activities",
        Component: ActivityDashboard,
      },
      {
        path: "activities/:id",
        Component: ActivityDetailPage,
      },
      {
        path: "create-activity",
        Component: ActivityForm,
      },
      {
        path: "manage/:id",
        Component: ActivityForm,
      },
      {
        path: "counter",
        Component: Counter,
      },
      {
        path: "errors",
        Component: TestErrors,
      },
      {
        path: "not-found",
        Component: NotFound,
      },
      { path: "server-error", Component: ServerError },
      { path: "*", Component: NotFound }, // Catch-all for undefined routes
    ],
  },
]);
