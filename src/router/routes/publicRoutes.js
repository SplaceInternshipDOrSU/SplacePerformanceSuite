import React, { lazy } from "react";
const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));
const Home = lazy(() => import("../../views/pages/Home"));
const UnAuthorizedAccess = lazy(() =>
  import("./../../views/UnAuthorizedAccess")
);
const DeactivatedUser = lazy(() =>
  import("./../../views/DeactivatedUser")
);

const publicRoutes = [
  {
    path: "/",
    element: React.createElement(Home)

    // element: <Home />
  },
  {
    path: "/login",
    element: React.createElement(Login)

    // element: <Login />,
  },
  {
    path: "/register",
    // element: <Register />,
    element: React.createElement(Register)
  },
  {
    path: "/admin/login",
    // element: <AdminLogin />,
    element: React.createElement(AdminLogin)
  },
  {
    path: "/unauthorized-access",
    // element: <UnAuthorizedAccess />,
    element: React.createElement(UnAuthorizedAccess)
  },
  {
    path: "/user/account-deactivated",
    // element: <DeactivatedUser />,
    element: React.createElement(DeactivatedUser)
  },
];

export default publicRoutes;
