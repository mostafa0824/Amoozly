import React, { useEffect, useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { MdChevronLeft, MdOutlineShoppingCart } from "react-icons/md";
import { TbUserDown, TbHeart, TbLogin } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { logout } from "../../store/slices/AuthSlice";
import fetchData from "../../Utils/fetchData";

export default function Navbar() {
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [profile,setProfile]=useState()
  const { user,token } = useSelector((state) => state.auth);
  const cartQuantity = useSelector((state) => state.cart.items)?.length;
  const favoritesQuantity = useSelector((state) => state.favorites.items)?.length;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle search
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

  // مشخصات user
  useEffect(()=>{
    (async()=>{
      const response=await fetchData(`profiles?filters[user][id][$eq]=${user?.id}&populate=*`)
      setProfile(response?.data?.[0])
    })()
  },[user])

  // logout
  const handleClick=()=>{
    dispatch(logout())
    navigate('/login')
  }
 
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* hambegur menu & lego */}
        <div className="flex items-center gap-4">
          {/* دکمه منو همبرگر برای موبایل */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 rounded-md hover:bg-slate-800 cursor-pointer"
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* lego */}
          <div
            onClick={() => navigate("/")}
            className="text-xl md:text-2xl font-bold text-blue-400 flex items-center gap-2 cursor-pointer"
          >
            <img
              className="imgLogo w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 rounded transition-all duration-400"
              src="/images/logo.png"
              alt="logo"/>
              <div>
               <span className="textLogo hidden sm:inline hover:text-blue-300"> Amoozly</span> 
               <p className="textLogoBottom text-gray-600 text-[12px]">پل ورود به بازار کار</p>
              </div>
            
          </div>
        </div>

        {/* desktop menu */}
        <ul className="linksNav ml-5 mr-5 hidden md:flex gap-6 text-sm font-medium">
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

        {/* search desktop */}
        <form
          onSubmit={handleSubmit}
          className="hidden border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 md:flex max-w-md flex-1 mx-4"
        >
          <input
            type="text"
            placeholder="هر آموزش یا استادی میخوای جستجو کن"
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            className="flex-1  rounded-r-lg py-2 px-4 outline-none"
          />
          <button
            type="submit"
            className=" text-white px-4 rounded-l-lg cursor-pointer"
          >
            <FaSearch className="hover:text-blue-400" />
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

          {/* cart */}
          <div
            onClick={() => navigate(`${token ? "/cart" : "/login"}`)}
            className="relative cursor-pointer"
          >
            <span className="absolute -right-1 -top-1 bg-red-500 w-4 h-4 text-[10px] md:text-[12px] rounded-full flex items-center justify-center">
              {new Intl.NumberFormat("fa-IR").format(cartQuantity)}
            </span>
            <MdOutlineShoppingCart className="text-2xl md:text-[35px] hover:text-blue-400" />
          </div>
          {/* login/logout & list */}
          {!token ? (
            <button className="flex items-center gap-1 w-35 h-10 px-2 bg-blue-500 hover:bg-blue-600 rounded-md">
              <TbLogin size={20} />
              <Link to="/login">ورود / ثبت نام</Link>
            </button>
          ) : (
            <div className="user relative cursor-pointer hover:">
              <span className="absolute -right-1 -top-1 bg-red-500 w-4 h-4 text-[10px] md:text-[12px] rounded-full flex items-center justify-center">
                {new Intl.NumberFormat("fa-IR").format(favoritesQuantity)}
              </span>
              <TbUserDown className="text-2xl md:text-[35px] hover:text-blue-400" />
              {/* menu */}
              <div className="menuUser absolute top-12 left-0 transition-all duration-300 z-10 shadow-lg w-55 h-50 bg-gray-200 rounded-lg flex flex-col justify-evenly pr-2">
           {/* user */}
           {/* profile */}
           <div onClick={()=>navigate('/profile')} 
           className="flex items-center justify-around h-10 rounded hover:bg-gray-300 transition-all duration-300">
            {profile
            ?(
            <div className="flex items-center gap-1 text-black" key={profile?.id}>
              <p>{profile?.name}</p>
              <p>{profile?.lastname}</p>
            </div>
            ):(
              <p className="text-black">سلام {user?.username} </p>
            )}
            
            <MdChevronLeft className="text-black text-[30px]"/>
            </div>
            {/* line */}
                <div className="bg-gray-300 w-full h-[1px]"></div>
                 {/* علاقه مندی */}
                <div
                  onClick={() => navigate("/favorites")}
                  className="relative flex items-center gap-1 h-10 rounded hover:bg-gray-300 transition-all duration-300"
                >
                  <TbHeart
                    className="text-black hover:text-red-400 text-[30px]"
                    onClick={() => navigate("/favorites")}
                  />
                  <span className="absolute -right-1 -top-1 bg-red-500 w-4 h-4 text-[10px] md:text-[12px] rounded-full flex items-center justify-center">
                    {new Intl.NumberFormat("fa-IR").format(favoritesQuantity)}
                  </span>
                  <p className="text-black">لیست ها</p>
                </div>
                {/* line */}
                <div className="bg-gray-300 w-full h-[1px]"></div>
                {/* cart */}
                <div
                  onClick={() => navigate("/cart")}
                  className="flex items-center gap-1 h-10 rounded hover:bg-gray-300 transition-all duration-300"
                >
                  <MdOutlineShoppingCart className="text-black text-[30px] hover:text-blue-400" />
                  <Link className="text-black">
                    دوره های خریداری شده
                  </Link>
                </div>
                {/* line */}
                <div className="bg-gray-300 w-full h-[1px]"></div>
                {/* logout */}
                <div
                  onClick={handleClick}
                  className="flex items-center gap-1 h-10 rounded hover:bg-gray-300 transition-all duration-300">
                  <IoMdExit className="text-black text-[30px] hover:text-blue-400" />
                  <Link className="text-black">
                    خروج از حساب کاربری
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* mobile menu */}
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
              {token ? (
                <Link
                  className="block py-2 bg-red-500 text-center rounded-md hover:bg-red-600"
                  onClick={handleClick}>
                 خروج از حساب کاربری
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block py-2 bg-blue-500 text-center rounded-md hover:bg-blue-600"
                  onClick={() => setIsMenuOpen(false)}>
                  ورود / ثبت‌نام
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}

      {/* mobile search */}
      {isSearchOpen && (
        <div className="md:hidden bg-slate-800 px-4 py-3">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              placeholder="هر آموزش یا استادی میخوای جستجو کن"
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
