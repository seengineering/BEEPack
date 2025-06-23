import React from "react";

// Admin Imports
import MainDashboard from "views/admin/detailed-dashboard";
import AllHives from "views/admin/all-hives";
import Profile from "views/admin/profile";
import DataTables from "views/admin/allerts_settings";
import RTLDefault from "views/rtl/default";
import { GiBeehive } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Hives",
    layout: "/admin",
    path: "all-hives",
    icon: <GiBeehive className="h-6 w-6" />,
    component: <AllHives />,
    secondary: true,
  },
  {
    name: "Dashboard",
    layout: "/admin",
    path: "detailed-dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Settings",
    layout: "/admin",
    icon: <IoMdSettings className="h-6 w-6" />,
    path: "Settings",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  /*
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "rtl",
    icon: <MdHome className="h-6 w-6" />,
    component: <RTLDefault />,
  },*/
];
export default routes;
