import React, { lazy } from "react";
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const UserRequests = lazy(() => import("../../views/admin/UserRequests"));
const UserDetails = lazy(() => import("../../views/admin/UserDetails.jsx"));


export const adminRoutes = [
  {
    path: "admin/dashboard/",
    element: React.createElement(AdminDashboard),
    ability: "admin",
    role: "admin",
  },
  {
    path: "admin/user-requests",
    element: React.createElement(UserRequests),
    ability: "admin",
    role: "admin",
  },
  {
    path: 'admin/dashboard/user-details/:userId',
    element: React.createElement(UserDetails),
    ability: "admin",
    role: "admin",
  },

  
  
];
