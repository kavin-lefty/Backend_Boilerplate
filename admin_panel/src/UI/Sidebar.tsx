import { useState, type JSX } from "react";
import {
  MdClose,
  MdMenu,
  MdKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { adminRoutes, type AdminRoute } from "../routes/routes"; // Type added here
import logo from "../assets/react.svg";

type OpenMenus = Record<string, boolean>;

export default function Sidebar(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState<OpenMenus>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string): boolean => {
    return location.pathname === `/${path}` || location.pathname === path;
  };

  const toggleMenu = (path: string): void => {
    setOpenMenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const iconMap: Record<string, JSX.Element> = {
    DashboardOutlined: <TbLayoutDashboardFilled />,
  };

  const renderMenuItems = (
    routes: AdminRoute[],
    level = 0,
    parentPath = ""
  ): JSX.Element[] => {
    return routes
      .filter((fil) => !fil.hidden)
      .map((route) => {
        const fullPath = `${parentPath}/${route.path}`.replace(/\/+/g, "/");
        const hasChildren = route.children && route.children.length > 0;
        const active = location.pathname === fullPath;
        const isMenuOpen = openMenus[fullPath];

        return (
          <div key={`${fullPath}-${level}`} className="mb-1">
            <div
              onClick={() => {
                if (hasChildren) {
                  toggleMenu(fullPath);
                } else {
                  navigate(fullPath);
                  setSidebarOpen(false);
                }
              }}
              className={`flex justify-between items-center w-full font-semibold text-left px-4 py-2 rounded-xl transition-all duration-400 cursor-pointer ${
                active
                  ? "bg-[#003F6B]/30 backdrop-blur-md text-[#003F6B]"
                  : "text-blue-900 hover:text-[#003F6B] hover:bg-[#E6F6F2]"
              }`}
              style={{ paddingLeft: `${level * 12 + 16}px` }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (hasChildren) {
                    toggleMenu(fullPath);
                  } else {
                    navigate(fullPath);
                    setSidebarOpen(false);
                  }
                }
              }}
            >
              <span className="flex items-center gap-2">
                {iconMap[route.icon] || null}
                {route.name}
              </span>
              {hasChildren && (
                <span className="text-xl">
                  {isMenuOpen ? (
                    <MdKeyboardArrowUp />
                  ) : (
                    <MdOutlineKeyboardArrowDown />
                  )}
                </span>
              )}
            </div>

            {hasChildren && isMenuOpen && (
              <div className="mt-1 bg-[#003F6B]/10 rounded-2xl">
                {renderMenuItems(route.children!, level + 1, fullPath)}
              </div>
            )}
          </div>
        );
      });
  };

  return (
    <>
      <section>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-3 fixed top-4 left-4 z-50 bg-white"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? <MdClose size={30} /> : <MdMenu size={30} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed md:static z-40 top-0 left-0 h-full w-72 bg-white border-r border-gray-200 p-4 overflow-auto transition-transform duration-300 ease-in-out transform
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <nav>
            <div className="mb-6">
              <img
                src={logo}
                alt="Logo"
                className="shadow-xl object-cover rounded-2xl"
              />
            </div>
            {renderMenuItems(adminRoutes)}
          </nav>
        </aside>
      </section>
    </>
  );
}
