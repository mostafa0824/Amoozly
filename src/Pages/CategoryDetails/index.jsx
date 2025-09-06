import React, { useEffect, useState } from "react";
import fetchData from "../../Utils/fetchData";
import { useNavigate, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

export default function CategoryDetails() {
  const baseUrl = "http://localhost:5000";
  const navigate = useNavigate();
  const { id } = useParams();
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading,setLoading]=useState(true)
  // Fetch specific category with its courses
  useEffect(() => {
    (async () => {
      const response = await fetchData(`categories/${id}?populate[courses][populate]=*`);
      setCategoryDetails(response.data);
      setCourses(response.data?.courses || []);
      setLoading(false)
    })();
  }, [id]);

  // loading
    if (loading) {
    return (
      <div className="flex justify-center items-center m-50">
        <ScaleLoader color="blue" height={100} width={10}/>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {categoryDetails?.name}
        </h1>
        <p className="text-gray-600 mt-2">{categoryDetails?.description}</p>
        {categoryDetails?.image && (
          <img
            src={`${baseUrl}${categoryDetails?.image?.url}`}
            alt={categoryDetails?.name}
            className="mx-auto mt-4 rounded-lg shadow-md max-w-md"
          />
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-right">
        دوره‌های این دسته‌بندی
      </h2>

      {courses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          هیچ دوره‌ای در این دسته‌بندی وجود ندارد.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              onClick={() =>
                navigate(
                  `/course-details/${
                    course?.documentId
                  }/${course?.title.replaceAll("/", " ", "-")}`
                )
              }
              key={course?.id}
              className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <p className="absolute top-2 right-4 opacity-0 group-hover:opacity-100 z-10 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md transition-all duration-300 transform group-hover:translate-y-1">مشاهده جزيیات</p>
              {/* اگر دوره هم تصویر دارد */}
              {course.image && (
                <img
                  src={`${baseUrl}${course?.image?.url}`}
                  alt={course?.title}
                  className="w-full h-48"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {course?.title}
                </h3>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-blue-600">
                    {new Intl.NumberFormat("fa-IR").format(course?.price)} تومان
                  </span>
                  {course.discount > 0 && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                      {course?.discount}% تخفیف
                    </span>
                  )}
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>سطح: {getLevelText(course?.level)}</span>
                  <span>امتیاز: {course?.rating}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  مدرس: {course?.teacher?.name}
                </p>
                <div className="mt-4 mb-5 text-left text-gray-400 text-sm">
                  تاریخ انتشار: {formatDate(course?.["publish_date"])}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/cart/${course?.documentId}`);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md transition-colors duration-300 cursor-pointer"
                >
                  افزودن به سبد خرید
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// تابع برای نمایش متن سطح دوره
function getLevelText(level) {
  const levels = {
    beginner: "مبتدی",
    average: "متوسط",
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
