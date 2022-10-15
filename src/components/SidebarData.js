import React from "react";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <AiIcons.AiFillDashboard />,
    cName: "nav-text",
  },

  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <CgIcons.CgProfile />,
    cName: "nav-text",
  },
  {
    title: "Update",
    path: "/update",
    icon: <AiIcons.AiFillUpSquare />,
    cName: "nav-text",
  },
  {
    title: "Delete",
    path: "/delete",
    icon: <AiIcons.AiOutlineUserDelete />,
    cName: "nav-text",
  },
];
