import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, loading, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <img
        className="absolute top-0 left-0 h-[115px] hidden md:block opacity-75 z-[2]"
        src="https://ehsan.sa/ehsan-ui/images/snapel/snapel-line.svg"
        alt=""
      />
      <img
        className="absolute top-28 left-0 h-[115px] hidden md:block opacity-25 z-[2]"
        src="https://ehsan.sa/ehsan-ui/images/snapel/snapel-line.svg"
        alt=""
      />
      {/* Mint green background section */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-[url('https://ehsan.sa/ehsan-ui/images/home/bg-statistics.svg')] bg-[#00493a] p-8 transition-all duration-500 z-1">
        <img
          className="filter brightness-0 invert saturate-0 hue-rotate-[212deg] brightness-[105%] contrast-[106%]"
          src="https://ehsan.sa/ehsan-ui/images/ahseno-ayah.svg"
          alt=""
        />
      </div>

      {/* Form section */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-4xl text-center font-bold text-gray-900">
              تسجيل الدخول
            </h2>
            {error && <p className="mt-2 text-red-600">{error}</p>}
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  البريد الالكتروني
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  كلمة المرور
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
            <div className="text-sm flex items-center justify-center">
              <p className="text-gray-700">ليس لديك حساب؟</p>
              <a
                href="/register"
                className="text-emerald-600 underline hover:text-emerald-700"
              >
                انشاء حساب
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
