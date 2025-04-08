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

function App() {
  const location = useLocation();
  return (
    <>
      <Toaster />
      <AuthProvider>
        <Navbar />
        <Link
          to={"/addection"}
          className={`${
            location.pathname === "/addection" ? "hidden" : "block"
          }`}
        >
          <div className="fixed flex items-center justify-center w-12 h-12 rounded-full bg-emerald-700 bottom-4 right-4 z-20 animate-pulse cursor-pointer">
            <BiSupport className="text-2xl text-white" />
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
