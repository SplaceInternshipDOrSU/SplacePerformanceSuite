import React, { lazy } from "react";
// const Home = lazy(() => import("../../views/pages/Home"));
const UserDashboard = lazy(() =>
  import("../../views/user/UsersDashboard")
);
const PendingUser = lazy(() =>
  import("../../views/PendingUser")
);


export const supervisorRoutes = [
  {
    path: "/supervisor/account-pending",
    element: React.createElement(PendingUser),
    ability: "user",
  },
  {
    path: "/supervisor/dashboard/",
    element: React.createElement(UserDashboard),
    // element: <AdminDashboard />,
    // role: "agent",
    category: "supervisor",
    status: "active",
  },
 
];
