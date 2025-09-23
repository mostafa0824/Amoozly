import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import fetchData from "../../../Utils/fetchData";
import { useDispatch, useSelector } from "react-redux";
import {MdOutlineRemoveShoppingCart,MdOutlineShoppingCart,} from "react-icons/md";
import { addCart, removeCart } from "../../../store/slices/CartSlice";
import { FaHeart, FaRegHeart, FaUserTie } from "react-icons/fa";
import { addfavorites, removeFavorites } from "../../../store/slices/FavoritesSlice";

export default function CourseTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = "http://localhost:5000";
  const cartItems = useSelector((state) => state.cart.items);
  const favoritesItems = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchData(
          `teachers/${id}?populate[courses][populate]=*`
        );
        setTeacherData(response.data);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ScaleLoader color="#3B82F6" height={50} width={8} />
      </div>
    );
  }

  if (!teacherData || !teacherData.courses) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800">
            اطلاعات مدرس یافت نشد
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 sm:px-5 py-6 pt-20">
      {/* اطلاعات مدرس */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl">
            {<FaUserTie className="text-blue-500" />}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {teacherData.name}
            </h1>
            <p className="text-gray-600">
              {teacherData?.["bio_Teacher"] || "بیوگرافی موجود نیست"}
            </p>
          </div>
        </div>
      </div>

      {/* دوره‌های مدرس */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        دوره‌های این مدرس
      </h2>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-4">
        {teacherData.courses.map((course) => {
          const cartQuantity = cartItems?.find(
            (item) => item?.documentId === course?.documentId
          )?.cartQuantity;
          const favoritesQuantity = favoritesItems?.find(
            (pr) => pr?.documentId === course?.documentId
          )?.favoritesQuantity;

          return (
            <div
              key={course?.id}
              className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full"
            >
              <p className="absolute top-2 right-4 opacity-0 group-hover:opacity-100 z-10 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md transition-all duration-300 transform group-hover:translate-y-1">
                مشاهده جزيیات
              </p>

              <div
                onClick={() =>
                  navigate(
                    `/course-details/${course?.documentId}/${course?.title
                      ?.replace(/\//g, " ")
                      ?.replace(/\s+/g, "-")}`
                  )
                }
                className="flex-grow"
              >
                <img
                  className="w-full h-48"
                  src={`${baseUrl}${course?.image?.url}`}
                  alt={course?.title}
                />

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {course?.title}
                  </h3>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold text-blue-600">
                      {new Intl.NumberFormat("fa-IR").format(course?.price)}{" "}
                      تومان
                    </span>

                    {course?.discount > 0 && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                        {course?.discount}% تخفیف
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                      {getLevelText(course?.level)}
                    </span>

                    <div className="flex items-center">
                      <span className="text-yellow-500 ml-1">★</span>
                      <span className="text-gray-600">{course?.rating}</span>
                    </div>
                  </div>
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
                    <FaHeart onClick={(e)=>{
                     e.stopPropagation();
                     dispatch(removeFavorites(course?.documentId))
                    }} 
                    className="h-7 w-7 text-red-500" />
                ) : (
                    <FaRegHeart 
                    onClick={(e)=>{
                      e.stopPropagation();
                      dispatch(addfavorites(course))
                    }}
                    className="h-7 w-7 text-red-500" />
                )}
              </div>
            </div>
          );
        })}
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
