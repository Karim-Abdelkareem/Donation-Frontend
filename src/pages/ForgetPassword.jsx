import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("https://donations-backend-ten.vercel.app/api/auth/forget-password", {
        email,
      });
      toast.success(
        "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني",
        {
          style: {
            background: 'linear-gradient(to right, #6366f1, #4f46e5)',
            color: '#fff',
            direction: 'rtl'
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#6366f1',
          },
        }
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ ما", {
        style: {
          background: 'linear-gradient(to right, #6366f1, #4f46e5)',
          color: '#fff',
          direction: 'rtl'
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#6366f1',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-72px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            نسيت كلمة المرور
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-right"
                placeholder="البريد الإلكتروني"
                dir="rtl"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  جاري الإرسال...
                </span>
              ) : (
                "إرسال رابط إعادة التعيين"
              )}
            </button>
          </div>

          <div className="text-center">
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 text-sm"
            >
              العودة لتسجيل الدخول
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
