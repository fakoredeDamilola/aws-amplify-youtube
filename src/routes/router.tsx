import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../NotFound";
import { routes } from "./routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Shared layout (header, footer, etc.)
    errorElement: <NotFound />, // Catch-all for routing errors
    children: routes
    
  },
]);
