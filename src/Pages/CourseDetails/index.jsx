import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeCart } from "../../store/slices/CartSlice";
import { addfavorites, removeFavorites } from "../../store/slices/FavoritesSlice";
import { MdOutlineChat, MdOutlineRemoveShoppingCart, MdOutlineShoppingCart } from "react-icons/md";
import { FaAngleLeft, FaHeart, FaRegHeart, FaUserTie } from "react-icons/fa";
import { PiVideoCameraBold } from "react-icons/pi";
import { ScaleLoader } from "react-spinners";
export default function CourseDetails() {
  const baseUrl = "http://localhost:5000";
  const { id } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  
// Get shopping cart status and favorites
  const cartItems = useSelector((state) => state.cart.items);
  const favoritesItems = useSelector((state) => state.favorites.items);
  const favoriteQuantity=favoritesItems?.find(pr=>pr?.documentId===courseDetail?.documentId)?.favoritesQuantity
  const cartQuantity = cartItems?.find((pr) => pr?.documentId === courseDetail?.documentId)?.cartQuantity;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchData(`courses/${id}?populate=*`);
        setCourseDetail(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center m-50">
        <ScaleLoader color="blue" height={100} width={10}/>
      </div>
    );
  }

  if (!courseDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800">
            دوره مورد نظر یافت نشد
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            بازگشت
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* هدر دوره */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors cursor-pointer"
            >
             <FaAngleLeft className="text-[20px]" />
            </button>

            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0 mr-10">
                <img
                  src={`${baseUrl}${courseDetail?.image?.url}`}
                  alt={courseDetail?.title}
                  className="w-48 h-36 object-cover rounded-xl shadow-lg border-4 border-white/30"
                />
              </div>

              <div className="flex-grow text-center lg:text-right">
                <h1 className="text-3xl font-bold mb-4">
                  {courseDetail?.title}
                </h1>
                <p className="text-blue-100 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                  {courseDetail?.description}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* اطلاعات قیمت و دسته‌بندی */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-blue-600">
                    {new Intl.NumberFormat("fa-IR").format(courseDetail?.price)}{" "}
                    تومان
                  </span>
                  {courseDetail?.discount > 0 && (
                    <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
                      {courseDetail?.discount}% تخفیف
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                    {courseDetail?.categories[0]?.name}
                  </span>
                  <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                    سطح: {getLevelText(courseDetail?.level)}
                  </span>
                  <div className="flex items-center bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full text-sm font-medium">
                    <span className="ml-1">★</span>
                    <span>{courseDetail?.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-start md:items-end space-y-2">
                <span className="text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
                  📅 تاریخ انتشار:{" "}
                  {new Date(courseDetail?.["publish_date"]).toLocaleDateString(
                    "fa-IR"
                  )}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {cartQuantity
              ?(
              <button
                onClick={() => dispatch(removeCart(courseDetail?.documentId))}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg cursor-pointer"
              >
                <MdOutlineRemoveShoppingCart className="h-6 w-6 text-white"/>
                حذف از سبد خرید
              </button>
              ):(
               <button
                onClick={() => dispatch(addCart(courseDetail))}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg cursor-pointer"
              >
                <MdOutlineShoppingCart className="h-6 w-6"/>
                افزودن به سبد خرید
              </button>
              )
            }
              
              
              {favoriteQuantity
              ?(<button
                onClick={() =>dispatch(removeFavorites(courseDetail?.documentId))}
                className="flex-1 border-2 py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-md cursor-pointer border-red-500 bg-red-50 text-red-500 hover:bg-red-100">
                  <FaHeart className="h-6 w-6 text-red-500" />
             حذف از علاقه‌مندی‌ها
              </button>
              ):(
                <button
                onClick={() =>dispatch(addfavorites(courseDetail))}
                className="flex-1 border-2 py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-md cursor-pointer border-blue-500 text-blue-500 hover:bg-blue-50"
              >                  
                  <FaRegHeart className="h-6 w-6"/>
                 افزودن به علاقه‌مندی‌ها
              </button>
              )}
              
            </div>

            {/* videos */}
            {courseDetail?.videos?.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <PiVideoCameraBold className="text-blue-500" />
                  پیش‌ نمایش دوره
                </h2>
                <div className="flex justify-center">
                  <div className="w-full max-w-2xl bg-black rounded-xl overflow-hidden shadow-2xl">
                    <video
                      controls
                      className="w-full"
                      poster={`${baseUrl}${courseDetail?.image?.url}`}
                    >
                      <source
                        src={`${baseUrl}${courseDetail?.videos[0]?.url}`}
                        type="video/mp4"
                      />
                      مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند
                    </video>
                  </div>
                </div>
              </div>
            )}

            {/* information teacher */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaUserTie className="text-blue-500"/>
                مدرس دوره
              </h2>
              <div className="flex items-center gap-6">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  {courseDetail?.teacher?.name?.charAt(0) || "م"}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {courseDetail?.teacher?.name}
                  </h3>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    {courseDetail?.teacher?.["bio_Teacher"] ||
                      "بیوگرافی موجود نیست"}
                  </p>
                </div>
              </div>
            </div>

            {/* نظرات کاربران */}
            {courseDetail?.comments?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <MdOutlineChat className="text-blue-500" />
                  نظرات کاربران
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courseDetail.comments.slice(0, 4).map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-medium">
                          ن
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">
                            کاربر
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-gray-500 text-sm">
                              {comment?.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        "{comment?.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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