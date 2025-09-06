import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function CardCourse({ course }) {
    const navigate=useNavigate()
    const baseUrl = "http://localhost:5000";

    const handleClick=(e)=>{
        e.stopPropagation()
        navigate(`/cart/${course?.documentId}`)
    }
    
    return (
        <div
        onClick={()=>navigate(`/course-details/${course?.documentId}/${course?.title.replaceAll('/',' ','-')}`)}
        className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer" key={course?.id}>
           <p className="absolute top-2 right-4 opacity-0 group-hover:opacity-100 z-10 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md transition-all duration-300 transform group-hover:translate-y-1">مشاهده جزيیات</p> 
            <img
                className="w-full h-48" 
                src={`${baseUrl}${course?.image?.url}`} 
                alt={course?.title} 
            />
            
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{course?.title}</h3>
                
                <p className="text-sm text-gray-600 mb-2">مدرس: {course?.teacher?.name}</p>
                
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold text-blue-600">
                        {new Intl.NumberFormat('fa-IR').format(course?.price)} تومان
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
                
                <button
                type="button"
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md transition-colors duration-300 cursor-pointer">
                        افزودن به سبد خرید
                </button>
            </div>
        </div>
    );
}

// تابع برای نمایش متن سطح دوره
function getLevelText(level) {
    const levels = {
        beginner: 'مبتدی',
        average: 'متوسط',
        advanced: 'پیشرفته'
    };
    return levels[level] || level;
}
