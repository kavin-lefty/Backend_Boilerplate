import { Outlet } from "react-router-dom";
import Header from "../UI/Header";
import Sidebar from "../UI/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-gray-50 ">
        <Header />
        <main className="overflow-y-auto scrollbar-hide p-10 w-[80vw]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
