import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TbUserDown } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const cartQuantity=useSelector(state=>state.cart.items)?.length
  const favoritesQuantity=useSelector(state=>state.favorites.items)?.length
  const navigate=useNavigate()
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        
        {/* لوگو */}
        <div onClick={()=>navigate('/')} className="text-2xl font-bold text-blue-400 flex items-center gap-3 cursor-pointer">
          <img className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 rounded transition-all duration-400" src="/images/logo.png" alt="logo" />
          Online Courses
        </div>

        {/* منو */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li><Link to="/" className="hover:text-blue-400">خانه</Link></li>
          <li><Link to="/categories" className="hover:text-blue-400">دسته‌بندی‌ها</Link></li>
          <li><Link to="/courses" className="hover:text-blue-400">دوره‌ها</Link></li>
          <li><Link to="/teachers" className="hover:text-blue-400">مدرس‌ها</Link></li>
        </ul>

        {/* دکمه ورود/ثبت‌نام */}
        <div className="flex items-center gap-5">
          <Link to="/auth" className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 text-sm">
            ورود / ثبت‌نام
          </Link>
          {/* cart */}
          <div onClick={()=>navigate('/cart')} className="relative cursor-pointer">
            <span className="absolute left-6 top-2 bg-red-500 w-4 h-4 text-[12px] rounded-full flex items-center justify-center">{cartQuantity}</span>
            <MdOutlineShoppingCart className="text-[35px] hover:text-blue-400"/>
          </div>
          {/* favorites */}
          <div onClick={()=>navigate('/favorites')} className="relative cursor-pointer">
            <span className="absolute left-6 top-2 bg-red-500 w-4 h-4 text-[12px] rounded-full flex items-center justify-center">{favoritesQuantity}</span>
            <TbUserDown className="text-[35px] hover:text-blue-400"/>
          </div>
        </div>
      </div>
    </nav>
  );
}
