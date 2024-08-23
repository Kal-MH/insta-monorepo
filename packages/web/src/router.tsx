import { createBrowserRouter } from "react-router-dom";
import { pageRoutes } from "./apiRoutes";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Error from "./screens/Error";
import Login from "./screens/Login";

import CommonLayout from "./components/common/CommonLayout";

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.home, element: <Home />, errorElement: <Error /> },
      { path: pageRoutes.login, element: <Login />, errorElement: <Error /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
