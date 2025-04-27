import React, { lazy } from "react";
// const Home = lazy(() => import("../../views/pages/Home"));
const UserDashboard = lazy(() =>
  import("../../views/user/UsersDashboard")
);
const PendingUser = lazy(() =>
  import("../../views/PendingUser")
);


export const managerRoutes = [
  {
    path: "/user/account-pending",
    element: React.createElement(PendingUser),
    ability: "user",
  },
  {
    path: "/manager/dashboard/",
    element: React.createElement(UserDashboard),
    // element: <AdminDashboard />,
    role: "manager",
    status: "active",
  },
 
];
