import { Link, useLocation } from "react-router";
import { useState } from "react";
import { IoMdListBox } from "react-icons/io";
import { MdVolunteerActivism } from "react-icons/md";

export default function DashboardSidebar() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`${
        isExpanded ? "w-64" : "w-20"
      } h-screen bg-gray-50 border-l rounded-md border-gray-200 fixed right-0 transition-all duration-300 ease-in-out`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1
            className={`text-xl font-bold text-indigo-600 whitespace-nowrap overflow-hidden transition-all duration-300 ${
              !isExpanded && "scale-0"
            }`}
          >
            لوحة التحكم
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/dashboard/donations"
            className={`flex items-center gap-2 p-3 rounded-md transition-colors ${
              location.pathname === "/dashboard/donations"
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <IoMdListBox className="text-xl" />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                !isExpanded && "w-0"
              }`}
            >
              حملات التبرع
            </span>
          </Link>

          <Link
            to="/dashboard/donates"
            className={`flex items-center gap-2 p-3 rounded-md transition-colors ${
              location.pathname === "/dashboard/donates"
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <MdVolunteerActivism className="text-xl" />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                !isExpanded && "w-0"
              }`}
            >
              طلبات التبرع
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
