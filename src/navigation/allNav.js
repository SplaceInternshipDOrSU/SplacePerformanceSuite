import {
  AiFillDashboard,
  AiOutlineShopping,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import React from "react";
import { RiTeamFill } from "react-icons/ri";
import { TbCategoryFilled } from "react-icons/tb";
import { BiCategory, BiLoaderCircle } from "react-icons/bi";
import { BsChat } from "react-icons/bs";

import { BsCurrencyDollar } from "react-icons/bs";
import { CiChat1 } from "react-icons/ci";
import { RiProductHuntLine,RiFunctionAddFill  } from "react-icons/ri";
import { BiSolidDiscount } from "react-icons/bi";
import { FaHandshake } from "react-icons/fa";
import { TbCurrencyPeso } from "react-icons/tb";
import { MdDiscount } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import { IoIosPricetags } from "react-icons/io";
import { AiOutlineProduct } from "react-icons/ai";
import { FaArrowTrendUp } from "react-icons/fa6";

// import { RiFunctionAddFill } from "react-icons/ri";
// import { RiFunctionAddFill } from "react-icons/ri";


export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: React.createElement(AiFillDashboard),
    // icon: <AiFillDashboard />,
    category: "admin",
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "User Role",
    icon: React.createElement(FiUsers),
    // icon: <AiFillDashboard />,
    category: "admin",
    role: "admin",
    path: "/admin/user-roles",
  },
  {
    id: 3,
    title: "User Requests",
    icon: React.createElement(FiUsers),
    // icon: <AiFillDashboard />,
    category: "admin",
    role: "admin",
    path: "/admin/user-requests",
  },
  {
    id: 4,
    title: "Users",
    icon: React.createElement(FiUsers),
    // icon: <AiFillDashboard />,
    category: "admin",
    role: "admin",
    path: "/admin/dashboard/active-users",
  },
  {
    id: 4,
    title: "Teams",
    icon: React.createElement(RiTeamFill),
    // icon: <AiFillDashboard />,
    category: "admin",
    role: "admin",
    path: "/admin/teams",
  },
  {
    id: 5,
    title: "Dashboard",
    icon: React.createElement(AiFillDashboard),
    // icon: <AiFillDashboard />,
    category: "team-lead",
    role: "team-lead",
    path: "/team-lead/dashboard",
  },

  // RANK AND FILE
  {
    id: 4,
    title: "Dashboard",
    icon: React.createElement(AiFillDashboard),
    // icon: <AiFillDashboard />,
    category: "rankandfile",
    path: "/rank-and-file/dashboard",
  },
  {
    id: 4,
    title: "Self Rate",
    icon: React.createElement(AiFillDashboard),
    // icon: <AiFillDashboard />,
    category: "rankandfile",
    path: "/rank-and-file/self-rate/",
  },
    // RANK AND FILE






// SUPERVISOR
  {
    id: 4,
    title: "Dashboard",
    icon: React.createElement(AiFillDashboard),
    // icon: <AiFillDashboard />,
    category: "supervisor",
    path: "/supervisor/dashboard",
  },
   {
    id: 4,
    title: "Self Rate",
    icon: React.createElement(AiFillDashboard),
    // icon: <AiFillDashboard />,
   category: "supervisor",
    path: "/supervisor/self-rate/"
  },
// SUPERVISOR


// MANAGER
  {
    id: 4,
    title: "Dashboard",
    icon: React.createElement(AiFillDashboard),
    // icon: <AiFillDashboard />,
    category: "manager",
    path: "/manager/dashboard",
  },
     {
    id: 4,
    title: "Self Rate",
    icon: React.createElement(AiFillDashboard),
    // icon: <AiFillDashboard />,
   category: "manager",
    path: "/manager/self-rate/"
  },
// MANAGER

  {
    id: 4,
    title: "Dashboard",
    icon: React.createElement(AiFillDashboard),
    // icon: <AiFillDashboard />,
    category: "coo",
    path: "/coo/dashboard",
  },
  {
    id: 4,
    title: "Dashboard",
    icon: React.createElement(AiFillDashboard),
    // icon: <AiFillDashboard />,
    category: "ceo",
    path: "/ceo/dashboard",
  },
  // {
  //   id: 3,
  //   title: "Commodities",
  //   icon: <AiOutlineProduct />,
  //   category: "admin",
  //   path: "/admin/dashboard/commodities",
  // },
  // {
  //   id: 2,
  //   title: "Categories",
  //   icon: <BiCategory />,
  //   category: "admin",
  //   path: "/admin/dashboard/categories",
  // },
  // {
  //   id: 4,
  //   title: "Commodity Prices",
  //   icon: <IoIosPricetags />,
  //   category: "admin",
  //   path: "/admin/dashboard/commodity-prices",
  // },
  // {
  //   id: 4,
  //   title: "Seller Prices",
  //   icon: <FaArrowTrendUp />,
  //   category: "admin",
  //   path: "/admin/dashboard/seller-commodity-prices",
  // },
  // {
  //   id: 5,
  //   title: "Sellers",
  //   icon: <FiUsers />,
  //   category: "admin",
  //   path: "/admin/dashboard/sellers",
  // },
  // {
  //   id: 2,
  //   title: "Seller Locations",
  //   icon: <BiCategory />,
  //   category: "admin",
  //   path: "admin/dashboard/locations",
  // },
  // {
  //   id: 6,
  //   title: "Deactivated Sellers",
  //   icon: <FiUsers />,
  //   category: "admin",
  //   path: "/admin/dashboard/deactivate-sellers",
  // },
  // {
  //   id: 7,
  //   title: "Sellers Request",
  //   icon: <BiLoaderCircle />,
  //   category: "admin",
  //   path: "/admin/dashboard/sellers-request",
  // },
  // {
  //   id: 8,
  //   title: "Chat Seller",
  //   icon: <CiChat1 />,
  //   category: "admin",
  //   path: "/admin/dashboard/chat-sellers",
  // },

  // // Sellers_Links
  // {
  //   id: 9,
  //   title: "Dashboard",
  //   icon: <AiFillDashboard />,
  //   category: "seller",
  //   path: "/seller/dashboard/",
  // },
  // {
  //   id: 10,
  //   title: "Commodities",
  //   icon: <AiOutlineProduct />,
  //   category: "seller",
  //   path: "/seller/dashboard/commodities",
  // },
  // {
  //   id: 11,
  //   title: "Commodity Prices",
  //   icon: <IoIosPricetags />,
  //   category: "seller",
  //   path: "/seller/dashboard/commodity-prices",
  // },
  // {
  //   id: 12,
  //   title: "Chat Support",
  //   icon: <CiChat1 />,
  //   category: "seller",
  //   path: "/seller/dashboard/chat-support",
  // },
  // {
  //   id: 13,
  //   title: "Chat Customer",
  //   icon: <BsChat />,
  //   category: "seller",
  //   path: "/seller/dashboard/chat-customer",
  // },
  // {
  //   id: 17,
  //   title: "Profile",
  //   icon: <FiUsers />,
  //   category: "seller",
  //   path: "/seller/dashboard/profile",
  // },
 
];


