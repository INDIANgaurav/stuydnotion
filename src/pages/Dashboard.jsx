import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { AiOutlineMenu } from "react-icons/ai";

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform bg-richblack-800 shadow-lg transition-transform duration-300 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile Menu Button */}
        <div className="flex items-center bg-richblack-800 p-4 md:hidden">
          <button
            className="text-white"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <AiOutlineMenu size={24} />
          </button>
        </div>
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
