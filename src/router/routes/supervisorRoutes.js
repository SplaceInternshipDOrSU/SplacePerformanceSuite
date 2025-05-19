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

  {
      path: "/supervisor/self-rate/",
      element: React.createElement(selfRate),
      category: "supervisor",
    status: "active",
    },
 
];
