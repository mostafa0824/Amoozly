import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearfavorites, removeFavorites } from "../../store/slices/FavoritesSlice";
import { addCart, removeCart } from "../../store/slices/CartSlice";
import {MdOutlineRemoveShoppingCart,
  MdOutlineShoppingCart,
  MdOutlineFavorite,
  MdOutlineStar,
  MdOutlinePerson,
} from "react-icons/md";
import { ImBin } from "react-icons/im";
import { FaTrash } from "react-icons/fa";
import Login from "../Auth/Login";

export default function Favorites() {
  const cartItems = useSelector((state) => state.cart.items);
  const { items } = useSelector((state) => state.favorites);
  const {token}=useSelector(state=>state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = "http://localhost:5000";

    if(!token){
    return (
      <Login/>
    )
  }
  // function star
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<MdOutlineStar key={i} className="text-yellow-500 fill-yellow-500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<MdOutlineStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<MdOutlineStar key={i} className="text-gray-300" />);
      }
    }
    
    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        <span className="text-sm text-gray-600 mr-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (items?.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center bg-white p-8 rounded-2xl shadow-sm">
            <div className="flex justify-center mb-6">
              <MdOutlineFavorite className="text-5xl text-red-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">لیست علاقه‌مندی‌های شما خالی است</h2>
            <p className="text-gray-600 mb-8">دوره‌های مورد علاقه خود را اینجا ذخیره کنید تا بعداً ببینید</p>
            <button 
              onClick={() => navigate('/courses')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 cursor-pointer"
            >
              مشاهده دوره‌ها
            </button>
          </div>
        </div>
      </div>
    );
  }

  const itemsFavorites = items?.map((item) => {
    const cartQuantity = cartItems?.find(
      (ca) => ca?.documentId === item?.documentId
    )?.cartQuantity;

    return (
      <div 
        key={item?.id}
        className="favorite-item bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden mb-6"
      >
        <div 
          className="flex flex-col md:flex-row cursor-pointer"
          onClick={() => navigate(`/course-details/${item?.documentId}/${item?.title?.replace(/\//g, " ")?.replace(/\s+/g, "-")}`)}
        >
          <div className="relative group md:w-1/4">
          <p className="absolute top-2 right-3 opacity-0 group-hover:opacity-100 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md transition-all duration-300 transform group-hover:translate-y-1">
            مشاهده جزيیات
          </p>
            <img 
              src={`${baseUrl}${item?.image?.url}`} 
              alt={item?.title} 
              className="w-full h-40 md:h-full"
            />
            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
          </div>
          
          <div className="p-4 md:w-3/4">
            <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">{item?.title}</h3>
            
            <div className="flex items-center text-gray-600 mb-3">
              <MdOutlinePerson className="ml-1 text-[25px]" />
              <span className="text-sm">مدرس: {item?.teacher?.name}</span>
            </div>
            
            <div className="mb-3">
              {renderRatingStars(item?.rating || 0)}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {item?.price > 0 && (
                <span className="text-green-600 font-semibold">
                  {new Intl.NumberFormat('fa-IR').format(item?.price)} تومان
                </span>
              )}
              {item?.price === 0 && (
                <span className="text-green-600 font-semibold">رایگان</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          {cartQuantity ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeCart(item?.documentId));
              }}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MdOutlineRemoveShoppingCart className="h-5 w-5" />
              حذف از سبد خرید
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addCart(item));
              }}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MdOutlineShoppingCart className="h-5 w-5" />
              افزودن به سبد خرید
            </button>
          )}
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(removeFavorites(item?.documentId));
            }}
            className="text-red-400 hover:text-red-600 transition-all duration-300 flex items-center justify-center gap-2 py-2 px-4 rounded-lg hover:bg-red-50 cursor-pointer"
          >
            <ImBin className="text-lg" />
            حذف از علاقه‌مندی‌ها
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <MdOutlineFavorite className="ml-2 text-red-500 text-[38px]" />
            لیست علاقه‌مندی‌ها
          </h1>
          
          {items.length > 0 && (
            <button 
              onClick={() => dispatch(clearfavorites())}
              className="text-red-500 hover:text-red-700 flex items-center transition-all duration-300 py-2 px-4 hover:bg-red-50 rounded-lg cursor-pointer"
            >
              <FaTrash className="ml-1" />
              پاک کردن لیست
            </button>
          )}
        </div>
        
        <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-blue-800">
            شما <span className="font-bold">{items?.length}</span> دوره در لیست علاقه‌مندی‌های خود دارید
          </p>
        </div>
        
        <div className="favorites-list">
          {itemsFavorites}
        </div>
        
        <div className="mt-8 bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="font-medium text-green-800 mb-2">نکته:</h3>
          <p className="text-sm text-green-600">
            با افزودن دوره‌ها به لیست علاقه‌مندی‌ها، می‌توانید به راحتی بعداً به آنها دسترسی داشته و در صورت تمایل خریداری کنید.
          </p>
        </div>
      </div>
    </div>
  );
}