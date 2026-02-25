import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Ticket, User, ChevronRight, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { remove } from "../../redux/userSlice";
import { toast } from "sonner";

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(remove());
    localStorage.removeItem("localUser");
    toast.success("Logged out successfully");
  };

  const navItems = [
    {
      title: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Tickets",
      path: "/dashboard/tickets",
      icon: Ticket,
    },
    {
      title: "Profile",
      path: "/dashboard/profile",
      icon: User,
    },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col">
        <div className="p-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dashboard</h2>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between p-3 rounded-xl transition-all group ${
                isActive(item.path) ? "bg-amber-50 text-amber-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  size={20}
                  className={isActive(item.path) ? "text-a-600" : "text-gray-400 group-hover:text-gray-600"}
                />
                <span className="font-semibold text-sm">{item.title}</span>
              </div>
              {isActive(item.path) && <ChevronRight size={16} />}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-semibold text-sm"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
