import React, { lazy } from "react";
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const UserRequests = lazy(() => import("../../views/admin/UserRequests"));


export const adminRoutes = [
  {
    path: "admin/dashboard/",
    // element: <AdminDashboard/>,
    element: React.createElement(AdminDashboard),
    ability: "admin",
    role: "admin",
  },
  {
    path: "admin/user-requests",
    // element: <AdminDashboard/>,
    element: React.createElement(UserRequests),
    ability: "admin",
    role: "admin",
  },
//   {
//     path: "admin/dashboard/commodities",
//     element: <Commodity/>,
//     ability: "admin",
//     role: "admin",
//   },
  
  
];
