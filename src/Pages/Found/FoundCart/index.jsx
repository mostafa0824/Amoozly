import React from 'react'
import { MdOutlineRemoveShoppingCart, MdOutlineShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCart, removeCart } from '../../../store/slices/CartSlice';
import { FaHeart, FaLinkedin, FaRegHeart, FaSearch, FaTwitter, FaUserTie } from 'react-icons/fa';
import { addfavorites, removeFavorites } from '../../../store/slices/FavoritesSlice';

export default function FoundCart({ tech, item }) {
  const baseUrl = "http://localhost:5000";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);
  const cartQuantity = cartItems?.find(ca => ca?.documentId === item?.documentId)?.cartQuantity;

  const favoritesItems = useSelector(state => state.favorites.items);
  const favoritesQuantity = favoritesItems?.find(fa => fa?.documentId === item?.documentId)?.favoritesQuantity;

  // ---- cart course ----
  if (item) {
    return (
      <div
        onClick={() =>
          navigate(
            `/item-details/${item?.documentId}/${item?.title.replaceAll("/", " ", "-")}`
          )
        }
        className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        key={item?.id}
      >
        <p className="absolute top-2 right-4 opacity-0 group-hover:opacity-100 z-10 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md transition-all duration-300 transform group-hover:translate-y-1">
          مشاهده جزيیات
        </p>
        <img
          className="w-full h-48 object-cover"
          src={`${baseUrl}${item?.image?.url}`}
          alt={item?.title}
        />

        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{item?.title}</h3>
          <p className="text-sm text-gray-600 mb-2">مدرس: {item?.teacher?.name}</p>

          <div className="flex justify-between items-center mb-3">
            <span className="text-xl font-bold text-blue-600">
              {new Intl.NumberFormat("fa-IR").format(item?.price)} تومان
            </span>
            {item?.discount > 0 && (
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                {item?.discount}% تخفیف
              </span>
            )}
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
              {getLevelText(item?.level)}
            </span>
            <div className="flex items-center">
              <span className="text-yellow-500 ml-1">★</span>
              <span className="text-gray-600">{item?.rating}</span>
            </div>
          </div>

          <div className="p-4 pt-0 mt-auto flex items-center justify-center gap-4">
            {cartQuantity ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeCart(item?.documentId));
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
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
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MdOutlineShoppingCart className="h-5 w-5" />
                افزودن به سبد خرید
              </button>
            )}

            {favoritesQuantity ? (
              <FaHeart
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeFavorites(item?.documentId));
                }}
                className="h-7 w-7 text-red-500 cursor-pointer hover:text-red-600 transition-colors"
              />
            ) : (
              <FaRegHeart
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addfavorites(item));
                }}
                className="h-7 w-7 text-red-500 cursor-pointer hover:text-red-600 transition-colors"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---- cart teacher ----
  if (tech) {
    return (
      <div
        key={tech?.id}
        className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:transform hover:scale-105"
      >
        <div className="relative mb-6">
          {tech?.avatar?.formats?.thumbnail?.url ? (
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
              src={`${baseUrl}${tech.avatar.formats.thumbnail.url}`}
              alt={tech?.name}
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl border-4 border-blue-100 shadow-lg">
              <FaUserTie />
            </div>
          )}

          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white rounded-full p-2 shadow-md">
            <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors cursor-pointer">
              <FaLinkedin size={14} />
            </button>
            <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors cursor-pointer">
              <FaTwitter size={14} />
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{tech?.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{tech?.["bio_Teacher"]}</p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/courseTeacher/${tech?.documentId}`);
          }}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors duration-300 cursor-pointer"
        >
          مشاهده تدریس دوره
        </button>
      </div>
    );
  }

  // ---- not data ----
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md text-center">
      <div className="mb-4">
        <FaSearch className="text-4xl text-gray-400 mx-auto" />
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">موردی یافت نشد</h3>
      <button
        onClick={() => navigate("/courses")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300"
      >
        مشاهده همه دوره‌ها
      </button>
    </div>
  );

  // ---- founction course level ----
  function getLevelText(level) {
    const levels = {
      beginner: "مبتدی",
      intermediate: "متوسط",
      advanced: "پیشرفته",
    };
    return levels[level] || level;
  }
}
