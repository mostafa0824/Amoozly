import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        
        {/* لوگو */}
        <div className="text-2xl font-bold text-blue-400">
          <Link to="/">🎓 OnlineCourses</Link>
        </div>

        {/* منو */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li><Link to="/" className="hover:text-blue-400">خانه</Link></li>
          <li><Link to="/categories" className="hover:text-blue-400">دسته‌بندی‌ها</Link></li>
          <li><Link to="/courses" className="hover:text-blue-400">دوره‌ها</Link></li>
          <li><Link to="/teachers" className="hover:text-blue-400">مدرس‌ها</Link></li>
        </ul>

        {/* دکمه ورود/ثبت‌نام */}
        <div>
          <Link to="/auth" className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 text-sm">
            ورود / ثبت‌نام
          </Link>
        </div>
      </div>
    </nav>
  );
}
