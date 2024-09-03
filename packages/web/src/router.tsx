import { createBrowserRouter } from "react-router-dom";
import { pageRoutes } from "./apiRoutes";
import Error from "@/components/error/Error";
import Home from "@/pages/home/Home";
import Login from "@/pages/auth/Login";
import NotFound from "@/components/error/NotFound";
import Profile from "@/pages/profile/Profile";
import SignUp from "@/pages/auth/SignUp";
import Explore from "./pages/explore/Explore";

import ProviderLayout from "./components/layouts/ProviderLayout";

const router = createBrowserRouter([
  {
    element: <ProviderLayout />,
    children: [
      { path: pageRoutes.home, element: <Home />, errorElement: <Error /> },
      { path: pageRoutes.login, element: <Login />, errorElement: <Error /> },
      { path: pageRoutes.signup, element: <SignUp />, errorElement: <Error /> },
      { path: pageRoutes.users, element: <Profile />, errorElement: <Error /> },
      {
        path: pageRoutes.explore,
        element: <Explore />,
        errorElement: <Error />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
