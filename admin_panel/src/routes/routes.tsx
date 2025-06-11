import { lazy, type JSX } from "react";
import type { AdminRoute } from "../types/common";

// export interface AdminRoute {
//   path: string;
//   name: string;
//   icon: string;
//   element?: JSX.Element;
//   hidden?: boolean;
//   children?: AdminRoute[];
// }

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Users = lazy(() => import("../pages/Users"));
const Inbox = lazy(() => import("../pages/Inbox"));
export const adminRoutes: AdminRoute[] = [
  {
    path: "dashboard",
    name: "Dashboard",
    element: <Dashboard />,
    icon: "DashboardOutlined",
  },
  {
    path: "users",
    name: "Users",
    element: <Users />,
    icon: "UsersOutlined",
  },
  {
    path: "emails",
    name: "Email",
    icon: "UserOutlined",
    children: [
      {
        path: "inbox",
        name: "Inbox",
        element: <Inbox />,
        icon: "OwnerOutlined",
      },
    ],
  },
];
