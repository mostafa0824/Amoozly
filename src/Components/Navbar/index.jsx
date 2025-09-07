import React, { useEffect, useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TbUserDown, TbHeart } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

export default function Navbar() {
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartQuantity = useSelector((state) => state.cart.items)?.length;
  const favoritesQuantity = useSelector((state) => state.favorites.items)?.length;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    navigate(`/found/${inp.replaceAll("/", " ", "-")}`);
    setInp("");
    setLoading(false);
    setIsSearchOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

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
        {/* لوگو و منو همبرگر */}
        <div className="flex items-center gap-4">
          {/* دکمه منو همبرگر برای موبایل */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 rounded-md hover:bg-slate-800"
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* لوگو */}
          <div
            onClick={() => navigate("/")}
            className="text-xl md:text-2xl font-bold text-blue-400 flex items-center gap-2 cursor-pointer"
          >
            <img
              className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 rounded transition-all duration-400"
              src="/images/logo.png"
              alt="logo"
            />
            <span className="hidden sm:inline">Online Courses</span>
          </div>
        </div>

        {/* منو برای دسکتاپ */}
        <ul className="ml-5 mr-5 hidden md:flex gap-6 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-blue-400">
              خانه
            </Link>
          </li>
          <li>
            <Link to="/categories" className="hover:text-blue-400">
              دسته‌بندی‌ها
            </Link>
          </li>
          <li>
            <Link to="/courses" className="hover:text-blue-400">
              دوره‌ها
            </Link>
          </li>
          <li>
            <Link to="/teachers" className="hover:text-blue-400">
              مدرس‌ها
            </Link>
          </li>
        </ul>

        {/* جستجو برای دسکتاپ */}
        <form
          onSubmit={handleSubmit}
          className="hidden md:flex max-w-md flex-1 mx-4"
        >
          <input
            type="text"
            placeholder="جستجو دوره مورد نظر..."
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            className="flex-1 border border-gray-300 rounded-r-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-l-lg cursor-pointer"
          >
            <FaSearch />
          </button>
        </form>

        {/* دکمه‌های سمت چپ */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* دکمه جستجو برای موبایل */}
          <button
            onClick={toggleSearch}
            className="md:hidden text-white p-2 rounded-md hover:bg-slate-800"
          >
            <FaSearch size={18} />
          </button>

          {/* دکمه ورود/ثبت‌نام */}
          <Link
            to="/auth"
            className="hidden sm:block bg-blue-500 px-3 py-2 md:px-4 md:py-2 rounded-md hover:bg-blue-600 text-sm"
          >
            ورود / ثبت‌نام
          </Link>

          {/* سبد خرید */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <span className="absolute -right-1 -top-1 bg-red-500 w-4 h-4 text-[10px] md:text-[12px] rounded-full flex items-center justify-center">
              {new Intl.NumberFormat("fa-IR").format(cartQuantity)}
            </span>
            <MdOutlineShoppingCart className="text-2xl md:text-[35px] hover:text-blue-400" />
          </div>

          {/* علاقه‌مندی‌ها */}
          <div
            onClick={() => navigate("/favorites")}
            className="relative cursor-pointer"
          >
            <span className="absolute -right-1 -top-1 bg-red-500 w-4 h-4 text-[10px] md:text-[12px] rounded-full flex items-center justify-center">
              {new Intl.NumberFormat("fa-IR").format(favoritesQuantity)}
            </span>
            <TbHeart className="text-2xl md:text-[35px] hover:text-blue-400" />
          </div>
        </div>
      </div>

      {/* منوی موبایل */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 px-4 py-3">
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className="block py-2 hover:text-blue-400"
                onClick={() => setIsMenuOpen(false)}
              >
                خانه
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="block py-2 hover:text-blue-400"
                onClick={() => setIsMenuOpen(false)}
              >
                دسته‌بندی‌ها
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="block py-2 hover:text-blue-400"
                onClick={() => setIsMenuOpen(false)}
              >
                دوره‌ها
              </Link>
            </li>
            <li>
              <Link
                to="/teachers"
                className="block py-2 hover:text-blue-400"
                onClick={() => setIsMenuOpen(false)}
              >
                مدرس‌ها
              </Link>
            </li>
            <li>
              <Link
                to="/auth"
                className="block py-2 bg-blue-500 text-center rounded-md hover:bg-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                ورود / ثبت‌نام
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* جستجوی موبایل */}
      {isSearchOpen && (
        <div className="md:hidden bg-slate-800 px-4 py-3">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              placeholder="جستجو دوره مورد نظر..."
              value={inp}
              onChange={(e) => setInp(e.target.value)}
              className="flex-1 border border-gray-300 rounded-r-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-l-lg cursor-pointer"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}