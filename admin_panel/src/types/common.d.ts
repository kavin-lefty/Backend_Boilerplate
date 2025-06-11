import { JSX } from "react";

export interface AdminRoute {
  path: string;
  name: string;
  icon: string;
  element?: JSX.Element;
  hidden?: boolean;
  children?: AdminRoute[];
}
