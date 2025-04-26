import React, { lazy } from "react";
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));


export const adminRoutes = [
  {
    path: "admin/dashboard/",
    // element: <AdminDashboard/>,
    element: React.createElement(AdminDashboard),
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
