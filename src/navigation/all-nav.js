import {
    AiFillDashboard,
    AiOutlineShopping,
    AiOutlinePlus,
    AiOutlineShoppingCart,
  } from "react-icons/ai";
  import { BiCategory, BiLoaderCircle } from "react-icons/bi";
  import { BsChat } from "react-icons/bs";
  import { FiUsers } from "react-icons/fi";
  import { BsCurrencyDollar } from "react-icons/bs";
  import { CiChat1 } from "react-icons/ci";
  import { RiProductHuntLine,RiFunctionAddFill  } from "react-icons/ri";
  import { BiSolidDiscount } from "react-icons/bi";
  import { FaHandshake } from "react-icons/fa";
  import { TbCurrencyPeso } from "react-icons/tb";
  import { MdDiscount } from "react-icons/md";
  import { PiPasswordBold } from "react-icons/pi";
  
  // import { RiFunctionAddFill } from "react-icons/ri";
  // import { RiFunctionAddFill } from "react-icons/ri";
  
  
  export const allNav = [
    {
      id: 1,
      title: "Dashboard",
      icon: <AiFillDashboard />,
      role: "admin",
      path: "/admin/dashboard/",
    },
    {
      id: 2,
      title: "Offers",
      icon: <AiOutlineShopping />,
      role: "admin",
      path: "/admin/dashboard/offers",
    },
    {
      id: 3,
      title: "Category",
      icon: <BiCategory />,
      role: "admin",
      path: "/admin/dashboard/category",
    },
    {
      id: 4,
      title: "Sellers",
      icon: <FiUsers />,
      role: "admin",
      path: "/admin/dashboard/sellers",
    },
    // {
    //   id: 5,
    //   title: "Payment request",
    //   icon: <BsCurrencyDollar />,
    //   role: "admin",
    //   path: "/admin/dashboard/payment-request",
    // },
    {
      id: 6,
      title: "Deactivated Sellers",
      icon: <FiUsers />,
      role: "admin",
      path: "/admin/dashboard/deactivate-sellers",
    },
    {
      id: 7,
      title: "Sellers Request",
      icon: <BiLoaderCircle />,
      role: "admin",
      path: "/admin/dashboard/sellers-request",
    },
    {
      id: 8,
      title: "Chat Seller",
      icon: <CiChat1 />,
      role: "admin",
      path: "/admin/dashboard/chat-sellers",
    },
  
    // Sellers_Links
    {
      id: 9,
      title: "Dashboard",
      icon: <AiFillDashboard />,
      role: "seller",
      path: "/seller/dashboard/",
    },
    {
      id: 10,
      title: "Add Listing",
      icon: <AiOutlinePlus />,
      role: "seller",
      path: "/seller/dashboard/add-Listing",
    },
    {
      id: 11,
      title: "All Listings",
      icon: <RiProductHuntLine />,
      role: "seller",
      path: "/seller/dashboard/listings",
    },
    // {
    //   id: 4,
    //   title: "Discount Product",
    //   icon: <RiProductHuntLine />,
    //   role: "seller",
    //   path: "/seller/dashboard/discount-products",
    // },
    // {
    //   id: 12,
    //   title: "Discounted Listings",
    //   icon: <BiSolidDiscount />,
    //   role: "seller",
    //   path: "/seller/dashboard/discounted-listings",
    // },
    {
      id: 13,
      title: "Deals",
      icon: <FaHandshake />,
      role: "seller",
      path: "/seller/dashboard/deals",
    },
    // {
    //   id: 14,
    //   title: "Payments",
    //   icon: <TbCurrencyPeso />,
    //   role: "seller",
    //   path: "/seller/dashboard/payments",
    // },
    {
      id: 15,
      title: "Chat Customer",
      icon: <BsChat />,
      role: "seller",
      path: "/seller/dashboard/chat-customer",
    },
    {
      id: 16,
      title: "Chat Support",
      icon: <CiChat1 />,
      role: "seller",
      path: "/seller/dashboard/chat-support",
    },
    {
      id: 17,
      title: "Profile",
      icon: <FiUsers />,
      role: "seller",
      path: "/seller/dashboard/profile",
    },
    {
      id: 18,
      title: "Traders",
      icon: <FiUsers />,
      role: "admin",
      path: "/admin/dashboard/traders",
    },
    {
      id: 19,
      title: "Additional Features",
      icon: <RiFunctionAddFill/>,
      role: "admin",
      path: "/admin/dashboard/additional-features",
    },
    {
      id: 20,
      title: "Vouchers",
      icon: <MdDiscount />,
      role: "seller",
      path: "/seller/dashboard/voucher",
    },
    {
      id: 21,
      title: "Traders Request",
      icon: <BiLoaderCircle />,
      role: "admin",
      path: "/admin/dashboard/traders-request",
    },
    {
      id: 21,
      title: "Deactivated Traders",
      icon: <FiUsers />,
      role: "admin",
      path: "admin/dashboard/deactivate-traders",
    },
    {
      id: 21,
      title: "Change Password",
      icon: <PiPasswordBold />,
      role: "admin",
      path: "admin/dashboard/change-password",
    },
  ];
  
  
  