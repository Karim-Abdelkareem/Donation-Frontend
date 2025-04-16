import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function ConfirmEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5);
  async function confirmEmail() {
    setLoading(true);
    const response = await axios.post(
      `${import.meta.env.VITE_HOST}/api/auth/confirm-email/${token}`
    );
    console.log(response);
    if (response.data.status === "success") {
      setLoading(false);
      setMessage("تم تأكيد البريد الالكتروني بنجاح");
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/login");
          }
          return prev - 1;
        });
      }, 1000);
    }
  }
  useEffect(() => {
    confirmEmail();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            <p className="text-gray-600 text-lg font-medium">جاري التحميل...</p>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500 transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-gray-800 text-lg font-medium text-right">
                {message}
              </p>
            </div>
            <p className="mt-2 text-gray-600 text-sm text-right mb-4">
              سيتم توجيهك إلى صفحة تسجيل الدخول...
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <span>الذهاب لتسجيل الدخول</span>
              <span className="bg-blue-500 px-2 py-0.5 mr-2 rounded-full text-sm">
                {countdown}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
