import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    password: "",
  });
  const[loading,setLoading] = useState(false);
  const[error,setError] = useState("");
  let navigate = useNavigate()

  async function register (formData) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/api/auth/register`,
        formData
      );
      
      if(response.data.status==="success"){
        navigate("/login");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    register(formData);
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
        className="absolute top-[115px] left-0 h-[115px] hidden md:block opacity-25 z-[1]"
        src="https://ehsan.sa/ehsan-ui/images/snapel/snapel-line.svg"
        alt=""
      />
      {/* Mint green background section */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-[url('https://ehsan.sa/ehsan-ui/images/home/bg-statistics.svg')] bg-[#00493a] p-8 transition-all duration-500">
        <img
          className="filter brightness-0 invert saturate-0 hue-rotate-[212deg] brightness-[105%] contrast-[106%]"
          src="https://ehsan.sa/ehsan-ui/images/ahseno-ayah.svg"
          alt=""
        />
      </div>

      {/* Form section */}
      <div className="w-full mt-32 md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-4xl text-center font-bold text-gray-900">
              انشاء حساب جديد
            </h2>
            {error && <p className="mt-2 text-red-600">{error}</p>}
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  الاسم <span className="text-red-500">*</span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  البريد الالكتروني <span className="text-red-500">*</span>
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
                  كلمة المرور <span className="text-red-500">*</span>
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

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  رقم الهاتف <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  العمر
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الجنس
                </label>
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input
                      id="male"
                      name="gender"
                      type="radio"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <label
                      htmlFor="male"
                      className="mr-2 block text-sm font-medium text-gray-700"
                    >
                      ذكر
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="female"
                      name="gender"
                      type="radio"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <label
                      htmlFor="female"
                      className="mr-2 block text-sm font-medium text-gray-700"
                    >
                      أنثى
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "جاري انشاء الحساب..." : "انشاء حساب"}
            </button>
            <div className="text-sm flex items-center justify-center">
              <p className="text-gray-700">لديك حساب بالفعل؟</p>
              <a
                href="/login"
                className="text-emerald-600 underline hover:text-emerald-700 mr-1"
              >
                تسجيل الدخول
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
