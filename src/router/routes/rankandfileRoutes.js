import React, { lazy } from "react";
// const Home = lazy(() => import("../../views/pages/Home"));
const UserDashboard = lazy(() =>
  import("../../views/user/UsersDashboard")
);
const selfRate = lazy(() =>
  import("../../views/user/selfRate")
);
const peerRate = lazy(() =>
  import("../../views/user/RF/peerRate")
);
const toRate = lazy(() =>
  import("../../views/user/RF/toRate")
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
  {
    path: "/rank-and-file/self-rate/",
    element: React.createElement(selfRate),
    // element: <AdminDashboard />,
    // role: "agent",
    category: "rankandfile",
    status: "active",
  },
  {
    path: "/rank-and-file/to-evaluate/",
    element: React.createElement(toRate),
    // element: <AdminDashboard />,
    // role: "agent",
    category: "rankandfile",
    status: "active",
  },
  {
    path: "/rank-and-file/peer-evaluate/:userId",
    element: React.createElement(peerRate),
    // element: <AdminDashboard />,
    // role: "agent",
    category: "rankandfile",
    status: "active",
  },
 
];
