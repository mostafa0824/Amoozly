import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  MdOutlineRemoveShoppingCart,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addfavorites, removeFavorites } from "../../../store/slices/FavoritesSlice";
import { addCart, removeCart } from "../../../store/slices/CartSlice";

export default function CardCourse({ course }) {
  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = cartItems?.find(
    (item) => item?.documentId === course?.documentId
  )?.cartQuantity;
  const favoritesItems = useSelector((state) => state.favorites.items);
  const favoritesQuantity = favoritesItems?.find(
    (fa) => fa?.documentId === course?.documentId
  )?.favoritesQuantity;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = "http://localhost:5000";

  return (
    <div
      onClick={() =>
        navigate(
          `/course-details/${course?.documentId}/${course?.title.replaceAll("/"," ","-")}`
        )
      }
      className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      key={course?.id}
    >
      <p className="absolute top-2 right-4 opacity-0 group-hover:opacity-100 z-10 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md transition-all duration-300 transform group-hover:translate-y-1">
        مشاهده جزيیات
      </p>
      <img
        className="w-full h-48"
        src={`${baseUrl}${course?.image?.url}`}
        alt={course?.title}
      />

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {course?.title}
        </h3>

        <p className="text-sm text-gray-600 mb-2">
          مدرس: {course?.teacher?.name}
        </p>

        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-blue-600">
            {new Intl.NumberFormat("fa-IR").format(course?.price)} تومان
          </span>

          {course?.discount > 0 && (
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
              {course?.discount}% تخفیف
            </span>
          )}
        </div>

        <div className="flex justify-between items-center mb-3">
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
            {getLevelText(course?.level)}
          </span>

          <div className="flex items-center">
            <span className="text-yellow-500 ml-1">★</span>
            <span className="text-gray-600">{course?.rating}</span>
          </div>
        </div>

        <div className="p-4 pt-0 mt-auto flex items-center justify-center gap-4">
          {cartQuantity ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(removeCart(course?.documentId));
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
                dispatch(addCart(course));
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
                dispatch(removeFavorites(course?.documentId));
              }}
              className="h-7 w-7 text-red-500"
            />
          ) : (
            <FaRegHeart
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addfavorites(course));
              }}
              className="h-7 w-7 text-red-500"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// function level
function getLevelText(level) {
  const levels = {
    beginner: "مبتدی",
    intermediate: "متوسط",
    advanced: "پیشرفته",
  };
  return levels[level] || level;
}
