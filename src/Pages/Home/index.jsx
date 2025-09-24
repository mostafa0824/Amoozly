import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetchData from "../../Utils/fetchData";
import SliderHome from "./SliderHome";
import { ScaleLoader } from "react-spinners";

export default function Home() {
  const [coursesSlider, setCoursesSlider] = useState([]);
  const [categoriesSlider, setCategoriesSlider] = useState([]);
  const [coursesRating, setCoursesRating] = useState([]);
  const [loading,setLoading]=useState(false)
  const baseUrl = "http://localhost:5000";
  const navigate=useNavigate()

  useEffect(()=>{
    (async()=>{
      setLoading(true)
      const resCourses = await fetchData("courses?populate=image&pagination[pageSize]=100");
      const resCategories = await fetchData("categories?populate=image");
      const resRating = await fetchData("courses?populate=image&sort=rating:desc&pagination[limit]=6");
      setCoursesSlider(resCourses.data);
      setCategoriesSlider(resCategories.data);
      setCoursesRating(resRating.data);
      setLoading(false)
    })()
  },[])

    if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-40 pb-40">
        <ScaleLoader color="#3B82F6" height={50} width={8} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      {/* bac */}
      <div className="relative flex items-center justify-center">
        <img src="/images/bacHome.jpg" alt="" className="bannerHome w-full h-[400px] object-cover" />
        <div className="bacgroundBanner absolute left-10 top-1/3 text-white">
          <h1 className="textBannerTop text-3xl font-bold mb-5">یادگیری با بهترین دوره‌ها</h1>
          <p className="textBannerBottom mb-5">به دنیای آموزش آنلاین خوش آمدید</p>
          <button className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600">
            <Link to={"/categories"}>برای شروع کلیک کن</Link>
          </button>
        </div>
      </div>

      {/* course slider */}
      <div className="mt-12 px-4">
        <SliderHome courses={coursesSlider} />
      </div>

      {/* categories */}
      <div className="mt-16 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">بر اساس دسته‌بندی</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categoriesSlider?.map(cat => (
            <div 
              key={cat?.id}
              onClick={()=>navigate(`category-details/${cat?.documentId}/${cat?.name.replaceAll('/',' ','-')}`)}
              className="flex flex-col items-center justify-center w-40 h-40 rounded-full hover:shadow-lg transition duration-300 cursor-pointer"
            >
              <img 
                className="w-20 h-20 rounded-full object mb-3"
                src={`${baseUrl}${cat?.image?.url}`} 
                alt={cat?.name} 
              />
              <h4 className="text-sm font-medium text-gray-700 text-center">{cat?.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Courses Rating */}
      <div className="mt-16 px-4 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">محبوب‌ترین دوره‌ها</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesRating?.map(course => (
            <div 
              key={course?.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
            >
              <img 
                className="w-full h-48"
                src={`${baseUrl}${course?.image?.url}`} 
                alt={course?.title} 
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{course?.title}</h4>
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="text-gray-600 mr-1">{course?.rating}</span>
                </div>
                <button
                onClick={()=>navigate(`/course-details/${course?.documentId}/${course?.title?.replace(/\//g, " ")?.replace(/\s+/g, "-")}`)}
                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full cursor-pointer">
                  مشاهده دوره
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ثبت نام */}
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-2xl my-10 relative overflow-hidden">
  <div className="absolute top-0 left-0 w-full h-full opacity-10">
    <div className="absolute top-10 left-1/4 w-24 h-24 bg-white rounded-full"></div>
    <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-white rounded-full"></div>
  </div>
  
  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center relative z-10">
    از همین لحظه شروع کنید
  </h3>
  <button
  onClick={()=>navigate("/register")}
  className="bg-white text-indigo-600 hover:text-indigo-700 px-10 py-4 rounded-full font-semibold text-xl shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl relative z-10 cursor-pointer">
  ثبت نام کنید
  </button>
  
  <p className="mt-6 text-blue-100 text-center max-w-md mx-auto relative z-10">
    با ثبت نام در سایت، به تمامی دوره‌های آموزشی دسترسی پیدا کنید
  </p>
</div>
    </div>
  );
}