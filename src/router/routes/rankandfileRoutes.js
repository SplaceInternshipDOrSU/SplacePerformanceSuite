import React, { lazy } from "react";
// const Home = lazy(() => import("../../views/pages/Home"));
const UserDashboard = lazy(() =>
  import("../../views/user/UsersDashboard")
);
const PendingUser = lazy(() =>
  import("../../views/PendingUser")
);


export const rankandfileRoutes = [
  {
    path: "/rank-and-file/account-pending",
    element: React.createElement(PendingUser),
    ability: "user",
  },
  {
    path: "/rank-and-file/dashboard/",
    element: React.createElement(UserDashboard),
    // element: <AdminDashboard />,
    // role: "agent",
    category: "rankandfile",
    status: "active",
  },
 
];
