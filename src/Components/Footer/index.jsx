import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram, FaTelegram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  const navigate=useNavigate()
  return (
    <footer className="bg-slate-900 text-gray-200 mt-10">
      {/* بخش بالا */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* توضیحات سایت */}
        <div>
          <div onClick={()=>navigate('/')} className="text-2xl font-bold text-blue-400 flex items-center gap-3 mb-4 cursor-pointer">
          <img className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 rounded transition-all duration-400" src="/images/logo.png" alt="logo" />
          Online Courses
        </div>
          <p className="text-gray-400">
            یادگیری آنلاین با بهترین دوره‌های آموزشی فارسی
          </p>
        </div>

        {/* لینک‌های مهم */}
        <div>
          <h4 className="text-lg font-semibold mb-3">لینک‌های سریع</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400">خانه</Link></li>
            <li><Link to="/categories" className="hover:text-blue-400">دسته‌بندی‌ها</Link></li>
            <li><Link to="/courses" className="hover:text-blue-400">دوره‌ها</Link></li>
            <li><Link to="/teachers" className="hover:text-blue-400">مدرس‌ها</Link></li>
          </ul>
        </div>

        {/* شبکه‌های اجتماعی */}
        <div>
          <h4 className="text-lg font-semibold mb-3">ما را دنبال کنید</h4>
          <div className="flex gap-4 text-2xl">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="https://t.me" target="_blank" rel="noreferrer" className="hover:text-blue-500"><FaTelegram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaLinkedin /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-300"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* بخش پایین */}
      <div className="border-t border-slate-700 text-center py-4 text-sm text-gray-400">
        © 2025 تمامی حقوق محفوظ است - Online Courses
      </div>
    </footer>
  );
}
