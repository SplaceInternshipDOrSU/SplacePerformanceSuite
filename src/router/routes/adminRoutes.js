import React, { lazy } from "react";
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const UserRequests = lazy(() => import("../../views/admin/UserRequests"));
const UserRoles = lazy(() => import("../../views/admin/UserRoles.jsx"));
const UserCategories = lazy(() => import("../../views/admin/UserCategories"));
const UserDetails = lazy(() => import("../../views/admin/UserDetails"));
const Users = lazy(() => import("../../views/admin/Users"));


export const adminRoutes = [
  {
    path: "admin/dashboard/",
    element: React.createElement(AdminDashboard),
    ability: "admin",
    // role: "admin",
    category: "admin",
  },
  {
    path: "admin/user-roles",
    element: React.createElement(UserRoles),
    ability: "admin",
    // role: "admin",
    category: "admin",
  },
  {
    path: "admin/user-categories",
    element: React.createElement(UserCategories),
    ability: "admin",
    // role: "admin",
    category: "admin",
  },
  {
    path: "admin/user-requests",
    element: React.createElement(UserRequests),
    ability: "admin",
    // role: "admin",
    category: "admin",
  },
  {
    path: 'admin/dashboard/user-details/:userId',
    element: React.createElement(UserDetails),
    ability: "admin",
    // role: "admin",
    category: "admin",
  },
  {
    path: "admin/dashboard/active-users",
    element: React.createElement(Users),
    ability: "admin",
    category: "admin",
  },

  
  
];
