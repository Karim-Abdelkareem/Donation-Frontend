import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

export default function Navbar() {
  const location = useLocation();
  const navLinks = [
    { path: "", label: "الرئيسية" },
    { path: "projects", label: "فرص التبرع" },
    { path: "donations", label: "التبرعات" },
    { path: "services", label: "طلب تبرع" },
    { path: "donate", label: "تقديم تبرع" },
    // { path: "addection", label: "معالجة الادمان" },
  ];
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <>
      <nav className="h-[72px] z-30 shadow-md shadow-gray-10 flex justify-between sticky top-0 bg-white items-center border-b border-gray-200">
        <div className="px-6 flex gap-3 items-center">
          {/* <img loading="lazy" className="w-22" src="/logo.png" alt="" /> */}
          <Link to={"/"}>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Human bonding
            </span>
          </Link>

          <div className="p-6 gap-2 hidden lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group py-5 px-3 rounded-md relative transition-colors duration-300 ${
                  location.pathname.split("/")[1] === link.path
                    ? "bg-gradient-to-tr from-blue-500 to-purple-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {link.label}
                <div
                  className={`absolute left-1/2 bottom-1 h-1 w-[60px] rounded-full transition-all duration-300 transform -translate-x-1/2 ${
                    location.pathname.split("/")[1] === link.path
                      ? "bg-[#818cf8] opacity-100"
                      : "opacity-0 group-hover:opacity-100 bg-gray-400"
                  }`}
                ></div>
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex gap-10 p-6">
          {isAuthenticated ? (
            <div className="flex gap-6 items-center">
              {user?.role === "admin" && (
                <Link
                  to={"/dashboard"}
                  className="text-[#6366f1] text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md "
                >
                  لوحة التحكم
                </Link>
              )}

              {user?.role === "user" && (
                <Link
                  to={"/my-donations"}
                  className="text-sm bg-indigo-50 hover:bg-indigo-200 px-3 py-2 rounded"
                >
                  تبرعاتي
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
            <div className="flex gap-3">
              <Link
                to={"/login"}
                className="flex gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm px-3 py-2 rounded-md"
              >
                <img
                  className="w-[14px]"
                  src="https://ehsan.sa/ehsan-ui/images/icons/user-icon.svg"
                  alt=""
                />
                <span>تسجيل الدخول</span>
              </Link>
              <Link
                to={"/register"}
                className="flex gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm px-3 py-2 rounded-md"
              >
                <img
                  className="w-[14px]"
                  src="https://ehsan.sa/ehsan-ui/images/icons/user-icon.svg"
                  alt=""
                />
                <span>انشئ حساب</span>
              </Link>
            </div>
          )}
        </div>
        <button className="mx-2 lg:hidden" onClick={() => setOpen(!open)}>
          <IoMdMenu size={30} />
        </button>
        <div
          className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        />
        <div
          className={`fixed top-0 left-0 h-screen w-80 bg-white z-40 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            <IoCloseSharp
              size={32}
              className="text-red-500 m-4 absolute top-0 left-0"
            />
          </button>
          <div className="flex flex-col mt-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => {
                  setOpen(false);
                }}
                className={`group py-5 px-4 relative transition-colors duration-300 ${
                  location.pathname.split("/")[1] === link.path
                    ? "bg-gradient-to-tr from-blue-500 to-purple-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {link.label}
                <div
                  className={`absolute right-0 top-0 h-full w-1  rounded-full transition-all duration-300 transform -translate-x-1/2 ${
                    location.pathname.split("/")[1] === link.path
                      ? "bg-[#818cf8] opacity-100"
                      : "opacity-0 group-hover:opacity-100 bg-gray-400"
                  }`}
                ></div>
              </Link>
            ))}
          </div>
          <div className="flex flex-col mt-10">
            {isAuthenticated ? (
              <div className="flex flex-col gap-6 m-4">
                {user?.role === "admin" && (
                  <Link
                    to={"/dashboard"}
                    className="text-[#6366f1] text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md "
                  >
                    لوحة التحكم
                  </Link>
                )}

                {user?.role === "user" && (
                  <Link
                    to={"/my-donations"}
                    className="text-sm bg-indigo-50 hover:bg-indigo-200 px-3 py-2 rounded"
                  >
                    تبرعاتي
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
              <div className="flex flex-col m-4 gap-3">
                <Link
                  to={"/login"}
                  className="flex gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm px-3 py-2 rounded-md"
                >
                  <img
                    className="w-[14px]"
                    src="https://ehsan.sa/ehsan-ui/images/icons/user-icon.svg"
                    alt=""
                  />
                  <span>تسجيل الدخول</span>
                </Link>
                <Link
                  to={"/register"}
                  className="flex gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm px-3 py-2 rounded-md"
                >
                  <img
                    className="w-[14px]"
                    src="https://ehsan.sa/ehsan-ui/images/icons/user-icon.svg"
                    alt=""
                  />
                  <span>انشئ حساب</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
