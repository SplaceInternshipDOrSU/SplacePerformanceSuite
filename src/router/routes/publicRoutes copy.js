// import React, { lazy } from "react";
// import { useSelector } from "react-redux";
// const Login = lazy(() => import("../../views/auth/Login"));
// const Register = lazy(() => import("../../views/auth/Register"));
// const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));
// const Home = lazy(() => import("../../views/pages/Home"));
// const UnAuthorizedAccess = lazy(() =>
//   import("./../../views/UnAuthorizedAccess")
// );
// const DeactivatedUser = lazy(() =>
//   import("./../../views/DeactivatedUser")
// );

// import {Navigate} from 'react-router-dom'

// const {category} = useSelector(state=>state.auth)

//  if(category === 'admin') return <Navigate to='admin/dashboard' replace/>
//   else if(category === 'rankandfile') return <Navigate to='rank-and-file/dashboard' replace/>
//   else if(category === 'supervisor') return <Navigate to='supervisor/dashboard' replace/>
//   else if(category === 'manager') return <Navigate to='manager/dashboard' replace/>
//   else if(category === 'coo') return <Navigate to='coo/dashboard' replace/>
//   else if(category === 'ceo') return <Navigate to='ceo/dashboard' replace/>
//   else return <Navigate to='/login' replace/>

// const publicRoutes = [
//   {
//     path: "/",
//     element: React.createElement(Home)

//     // element: <Home />
//   },
//   {
//     path: "/login",
//     element: React.createElement(Login)

//     // element: <Login />,
//   },
//   {
//     path: "/register",
//     // element: <Register />,
//     element: React.createElement(Register)
//   },
//   {
//     path: "/admin/login",
//     // element: <AdminLogin />,
//     element: React.createElement(AdminLogin)
//   },
//   {
//     path: "/unauthorized-access",
//     // element: <UnAuthorizedAccess />,
//     element: React.createElement(UnAuthorizedAccess)
//   },
//   {
//     path: "/user/account-deactivated",
//     // element: <DeactivatedUser />,
//     element: React.createElement(DeactivatedUser)
//   },
// ];

// export default publicRoutes;
