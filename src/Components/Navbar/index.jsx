import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TbUserDown } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

export default function Navbar() {
  const [inp,setInp]=useState()
  const [loading,setLoading]=useState(false)
  const cartQuantity=useSelector(state=>state.cart.items)?.length
  const favoritesQuantity=useSelector(state=>state.favorites.items)?.length
  const navigate=useNavigate()

  const handleSubmit=(e)=>{
    setLoading(true)
    e.preventDefault()
    setInp('')
    setLoading(false)
  } 

    if (loading) {
    return (
      <div className="flex justify-center items-center m-50">
        <ScaleLoader color="blue" height={100} width={10} />
      </div>
    );
  }

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
        {/* search */}
        <form onSubmit={handleSubmit} className="flex max-w-md">
                    <input
                      type="text"
                      placeholder="جستجو دوره مورد نظر..."
                      value={inp}
                      onChange={(e)=>setInp(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-r-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" onClick={()=>navigate(`/found/${inp.replaceAll('/',' ','-')}`)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-l-lg cursor-pointer">
                      <FaSearch />
                    </button>
                  </form>
        {/* دکمه ورود/ثبت‌نام */}
        <div className="flex items-center gap-5">
          <Link to="/auth" className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 text-sm">
            ورود / ثبت‌نام
          </Link>
          {/* cart */}
          <div onClick={()=>navigate('/cart')} className="relative cursor-pointer">
            <span className="absolute left-6 top-2 bg-red-500 w-4 h-4 text-[12px] rounded-full flex items-center justify-center">{new Intl.NumberFormat("fa-IR").format(cartQuantity)}</span>
            <MdOutlineShoppingCart className="text-[35px] hover:text-blue-400"/>
          </div>
          {/* favorites */}
          <div onClick={()=>navigate('/favorites')} className="relative cursor-pointer">
            <span className="absolute left-6 top-2 bg-red-500 w-4 h-4 text-[12px] rounded-full flex items-center justify-center">{new Intl.NumberFormat("fa-IR").format(favoritesQuantity)}</span>
            <TbUserDown className="text-[35px] hover:text-blue-400"/>
          </div>
        </div>
      </div>
    </nav>
  );
}
