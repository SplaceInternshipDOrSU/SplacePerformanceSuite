import React, { lazy } from "react";
// const Home = lazy(() => import("../../views/pages/Home"));
const UserDashboard = lazy(() =>
  import("../../views/user/UsersDashboard")
);
const PendingUser = lazy(() =>
  import("../../views/PendingUser")
);
const selfRate = lazy(() =>
  import("../../views/user/selfRate")
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
    category: "manager",
    status: "active",
  },
  {
    path: "/manager/self-rate/",
    element: React.createElement(selfRate),
    category: "manager",
    status: "active",
  },
   
 
];
