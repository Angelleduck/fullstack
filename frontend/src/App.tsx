import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./pages/AppLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const Posts = lazy(() => import("./pages/Posts"));

export default function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/posts",
          element: (
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}
