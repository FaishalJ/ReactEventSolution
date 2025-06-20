import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";
import { router } from "./app/router/Routes.ts";
import { store, StoreContext } from "./lib/stores/store.ts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StoreContext.Provider value={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer
            position="bottom-right"
            theme="colored"
            hideProgressBar
          />
        </QueryClientProvider>
      </StoreContext.Provider>
    </LocalizationProvider>
  </StrictMode>
);
