import { Suspense, type JSX } from "react";
import { Route, Routes } from "react-router-dom";
import { adminRoutes } from "./routes";
import Login from "../pages/Login";
import AdminLayout from "../layout/layout";

interface RouteConfig {
  path: string;
  element: JSX.Element | null;
  children?: RouteConfig[];
}

const renderRouteTree = (routes: RouteConfig[]): JSX.Element[] =>
  routes.map(({ path, element, children }) => (
    <Route key={path} path={path} element={element}>
      {children && renderRouteTree(children)}
    </Route>
  ));

export default function Router(): JSX.Element {
  return (
    <Suspense fallback={"loading....."}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<AdminLayout />}>
          {renderRouteTree(adminRoutes)}
        </Route>
      </Routes>
    </Suspense>
  );
}
