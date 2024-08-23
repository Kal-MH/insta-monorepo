import { createBrowserRouter } from "react-router-dom";
import { pageRoutes } from "./apiRoutes";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Error from "./screens/Error";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";

import CommonLayout from "./components/common/layouts/CommonLayout";

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.home, element: <Home />, errorElement: <Error /> },
      { path: pageRoutes.login, element: <Login />, errorElement: <Error /> },
      { path: pageRoutes.signup, element: <SignUp />, errorElement: <Error /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
