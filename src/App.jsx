import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Service from "./pages/Service";
import { Toaster } from "react-hot-toast";
import Protected from "./components/Protected";
import Dashboard from "./pages/Dashboard";
import EditCampaign from "./pages/EditCampaign";
import AdminProtected from "./components/AdminProtected";
import Addection from "./pages/Addection";
import { BiSupport } from "react-icons/bi";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <>
      <Toaster />
      <AuthProvider>
        <Navbar />
        <Link
          to={"/addection"}
          className={`${
            location.pathname === "/addection" ? "hidden" : "block"
          } fixed bottom-4 right-4 z-20`}
        >
          <div className="flex items-center text-white justify-center p-3  rounded-full bg-[#003d6b] cursor-pointer hover:bg-blue-950 transition-all duration-300">
            <BiSupport className="text-2xl text-white" />
            <p
              className={`whitespace-nowrap overflow-hidden transition-all duration-500 ${
                isVisible ? "w-0 opacity-0" : "mr-2 opacity-100"
              }`}
            >
              التعافي من الادمان
            </p>
          </div>
        </Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route
            path="/services"
            element={
              <Protected>
                <Service />
              </Protected>
            }
          />
          <Route
            path="/addection"
            element={
              <Protected>
                <Addection />
              </Protected>
            }
          />
          {/* Admins Routes */}
          <Route
            path="/dashboard"
            element={
              <AdminProtected>
                <Dashboard />
              </AdminProtected>
            }
          />
          <Route
            path="/edit-campaign/:id"
            element={
              <AdminProtected>
                <EditCampaign />
              </AdminProtected>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
