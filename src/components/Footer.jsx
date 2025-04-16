import React from "react";
import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6">
      <div className="container mx-auto pt-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Human Bonding</h3>
            <p className="text-indigo-100 text-sm leading-relaxed">
              نحن نعمل على توصيل المتبرعين بالمحتاجين لخلق مجتمع أكثر تعاونًا
              وتكافلًا
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">روابط سريعة</h3>
            <ul className="space-y-2 text-indigo-100">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="hover:text-white transition-colors"
                >
                  فرص التبرع
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-white transition-colors"
                >
                  طلب تبرع
                </Link>
              </li>
              <li>
                <Link
                  to="/donate"
                  className="hover:text-white transition-colors"
                >
                  تقديم تبرع
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">تواصل معنا</h3>
            <ul className="space-y-2 text-indigo-100">
              <li>البريد الإلكتروني: info@humanbonding.com</li>
              <li>الهاتف: 123-456-7890</li>
              <li>العنوان: القاهرة، مصر</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">تابعنا</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-indigo-100 hover:text-white transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-indigo-100 hover:text-white transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-indigo-100 hover:text-white transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-indigo-100 hover:text-white transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-indigo-400 mt-12 pt-8 text-center text-indigo-100">
          <p>
            &copy; {new Date().getFullYear()} Human Bonding. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
