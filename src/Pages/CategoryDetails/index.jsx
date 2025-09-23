import React, { useEffect, useState } from "react";
import fetchData from "../../Utils/fetchData";
import { useNavigate, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { addfavorites, removeFavorites } from "../../store/slices/FavoritesSlice";
import { FaChevronDown, FaFilter, FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveShoppingCart, MdOutlineShoppingCart } from "react-icons/md";
import { addCart, removeCart } from "../../store/slices/CartSlice";

export default function CategoryDetails() {
  const baseUrl = "http://localhost:5000";
  const navigate = useNavigate();
  const { id } = useParams();
  const [categoryDetails, setCategoryDetails] = useState({}); // titr
  const [allCourses, setAllCourses] = useState([]); // all courses
  const [filteredCourses, setFilteredCourses] = useState([]); // filter courses
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState(""); // select box
  const cartItems = useSelector((state) => state.cart.items);
  const favoritesItems = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  // fetch titr
  useEffect(()=>{
    (async()=>{
      const titr=await fetchData(`categories/${id}?populate=*`)
      setCategoryDetails(titr.data);
    })()
  },[id])

  // categories id
  useEffect(() => {
    (async () => {
      setLoading(true);
        const response = await fetchData(`categories/${id}?populate[courses][populate]=*`);
        const courses = response.data?.courses;
        setAllCourses(courses);
        setFilteredCourses(courses);
        setLoading(false);
    })();
  }, [id]);

  // filter level
  useEffect(() => {
    setLoading(true)
    if (!level) {
      setFilteredCourses(allCourses);
    } else {
      const filtered = allCourses.filter(course => course.level === level);
      setFilteredCourses(filtered);
    }
    setLoading(false)
  }, [level, allCourses]);

  // loading
  if (loading) {
    return (
      <div className="flex justify-center items-center m-50">
        <ScaleLoader color="blue" height={100} width={10} />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto pt-18">
      <div className="mb-8 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {categoryDetails?.image && (
            <img
              src={`${baseUrl}${categoryDetails?.image?.url}`}
              alt={categoryDetails?.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg object-cover border-4 border-white"
            />
          )}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {categoryDetails?.name}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              {categoryDetails?.description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center text-blue-600">
          <FaFilter className="ml-2" />
          <span className="font-medium">فیلتر بر اساس:</span>
        </div>
        <div className="relative">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-10 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 w-48 cursor-pointer shadow-sm"
          >
            <option value="">همه سطوح</option>
            <option value="beginner">مبتدی</option>
            <option value="intermediate">متوسط</option>
            <option value="advanced">پیشرفته</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-500">
            <FaChevronDown />
          </div>
        </div>
        {level && (
          <button 
            onClick={() => setLevel("")}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-200 font-medium"
          >
            حذف فیلتر
          </button>
        )}
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          دوره‌های این دسته‌بندی
          {level && <span className="text-blue-600"> (سطح: {getLevelText(level)})</span>}
        </h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
          {filteredCourses.length} دوره
        </span>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200">
          <div className="text-gray-500 text-lg mb-2">
            {level ? 
              `هیچ دوره‌ای با سطح ${getLevelText(level)} در این دسته‌بندی وجود ندارد.` : 
              'هیچ دوره‌ای در این دسته‌بندی وجود ندارد.'
            }
          </div>
          <button 
            onClick={() => setLevel("")}
            className="text-blue-600 hover:text-blue-800 font-medium mt-2 cursor-pointer"
          >
            مشاهده همه دوره‌ها
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const cartQuantity = cartItems?.find((item) => item?.documentId === course?.documentId
            )?.cartQuantity;
            const favoritesQuantity = favoritesItems?.find((fa) => fa?.documentId === course?.documentId
            )?.favoritesQuantity;
            return (
              <div
                onClick={() =>
                  navigate(
                    `/course-details/${
                      course?.documentId
                    }/${course?.title.replaceAll("/", " ", "-")}`
                  )
                }
                key={course?.id}
                className="relative group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-100"
              >
                <div className="absolute top-3 right-3 z-10">
                  <p className="opacity-0 group-hover:opacity-100 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md transition-all duration-300 transform group-hover:translate-y-0">
                    مشاهده جزيیات
                  </p>
                </div>
                
                {course.image && (
                  <div className="overflow-hidden">
                    <img
                      src={`${baseUrl}${course?.image?.url}`}
                      alt={course?.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 h-14">
                    {course?.title}
                  </h3>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-blue-600">
                      {new Intl.NumberFormat("fa-IR").format(course?.price)} تومان
                    </span>
                    {course.discount > 0 && (
                      <span className="bg-red-100 text-red-600 px-2.5 py-1 rounded-full text-sm font-medium">
                        {course?.discount}% تخفیف
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between text-sm text-gray-500 mb-3">
                    <span className="bg-gray-100 px-2.5 py-1 rounded-full">سطح: {getLevelText(course?.level)}</span>
                    <span className="flex items-center">
                      <span className="ml-1">امتیاز:</span>
                      <span className="font-medium">{course?.rating}</span>
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    مدرس: <span className="font-medium">{course?.teacher?.name}</span>
                  </p>
                  
                  <div className="text-left text-gray-400 text-sm mb-4">
                    تاریخ انتشار: {formatDate(course?.["publish_date"])}
                  </div>
                  
                  <div className="flex items-center justify-between gap-3">
                    {cartQuantity ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(removeCart(course?.documentId));
                        }}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer font-medium"
                      >
                        <MdOutlineRemoveShoppingCart className="h-5 w-5" />
                        حذف از سبد
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(addCart(course));
                        }}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer font-medium"
                      >
                        <MdOutlineShoppingCart className="h-5 w-5" />
                        افزودن به سبد
                      </button>
                    )}

                    {favoritesQuantity ? (
                      <FaHeart
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(removeFavorites(course?.documentId));
                        }}
                        className="h-8 w-8 text-red-500 cursor-pointer p-1.5 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
                      />
                    ) : (
                      <FaRegHeart
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(addfavorites(course));
                        }}
                        className="h-8 w-8 text-red-500 cursor-pointer p-1.5 bg-gray-100 rounded-full hover:bg-red-50 transition-colors"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
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

// تابع برای فرمت تاریخ
function formatDate(dateString) {
  if (!dateString) return "نامشخص";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fa-IR").format(date);
}