import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navLinks = [
    { path: "", label: "الرئيسية" },
    { path: "projects", label: "فرص التبرع" },
    { path: "services", label: "طلب تبرع" },
    // { path: "addection", label: "معالجة الادمان" },
  ];
  const [search, setSearch] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <>
      <nav className="h-[72px] z-10 flex justify-between sticky top-0 bg-white items-center border-b border-gray-200">
        <div className="px-6 flex gap-16 items-center">
          <img loading="lazy" className="w-22" src="/logo.png" alt="" />
          <div className="flex p-6 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group py-5 px-3 rounded-md relative transition-colors duration-300 ${
                  location.pathname.split("/")[1] === link.path
                    ? "bg-[#007960] text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {link.label}
                <div
                  className={`absolute left-1/2 bottom-1 h-1 w-[60px] rounded-full transition-all duration-300 transform -translate-x-1/2 ${
                    location.pathname.split("/")[1] === link.path
                      ? "bg-[#80c8bb] opacity-100"
                      : "opacity-0 group-hover:opacity-100 bg-gray-400"
                  }`}
                ></div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-10 p-6">
          <button
            className="cursor-pointer"
            onClick={() => {
              setSearch(!search);
            }}
          >
            <img
              src="https://ehsan.sa/ehsan-ui/images/icons/search-icon.svg"
              alt=""
            />
          </button>
          {isAuthenticated ? (
            <div className="flex gap-6 items-center">
              {user?.role === "admin" && (
                <Link
                  to={"/dashboard"}
                  className="text-[#007960] text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md "
                >
                  لوحة التحكم
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                }}
                className="cursor-pointer bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded-md"
              >
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="flex gap-2 bg-[#007960] hover:bg-[#00614d] text-white text-sm px-3 py-2 rounded-md"
            >
              <img
                className="w-[14px]"
                src="https://ehsan.sa/ehsan-ui/images/icons/user-icon.svg"
                alt=""
              />
              <span>تسجيل الدخول</span>
            </Link>
          )}
        </div>
      </nav>
      {/* search div */}
      <div
        className={`absolute mt-16 bg-white z-[3] border-b border-gray-200 w-full h-[200px] left-0 transition-all ease-out duration-300 ${
          search ? "-top-0" : "-top-72"
        }`}
      >
        <div className="flex justify-end">
          <button
            className="cursor-pointer absolute bottom-28 left-11 border border-gray-300 rounded-md px-3 py-1"
            onClick={() => setSearch(false)}
          >
            X
          </button>
          <div className="absolute bottom-6 right-6 w-[95%] flex gap-2">
            <input
              type="text"
              placeholder="بحث"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <button className="px-3 py-2 text-[#007960] border border-[#007960] text-sm rounded-md">
              بحث
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
