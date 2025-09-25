import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import { ScaleLoader } from 'react-spinners';

export default function NotFound() {
    const [inp,setInp]=useState()
    const [loading,setLoading]=useState(false)
  const navigate = useNavigate();

  const handleSubmit=(e)=>{
    setLoading(true)
    e.preventDefault()
    navigate(`/found/${inp.replaceAll('/',' ','-')}`)
    setInp('')
    setLoading(false)
  }

    if (loading) {
    return (
      <div className="flex justify-center items-center pt-40 pb-40">
        <ScaleLoader color="blue" height={100} width={10} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4 pt-20">
      <div className="max-w-lg w-full text-center">

        <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">صفحه مورد نظر یافت نشد</h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          متأسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است منتقل شده باشد.
          لطفاً آدرس را بررسی کنید یا از دکمه‌های زیر برای بازگشت استفاده کنید.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 cursor-pointer"
          >
            <FaArrowLeft />
            بازگشت به صفحه قبل
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 cursor-pointer"
          >
            <FaHome />
            بازگشت به خانه
          </button>
        </div>

        {/* جستجو */}
        <div className="mt-10">
          <p className="text-gray-600 mb-3">یا صفحه مورد نظر خود را جستجو کنید:</p>
          <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
            <input
              type="text"
              placeholder="جستجو دوره یا استاد مورد نظر..."
              value={inp}
              onChange={(e)=>setInp(e.target.value)}
              className="flex-1 border border-gray-300 rounded-r-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-l-lg cursor-pointer">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate('/courses')}
            className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
          >
            دوره‌های آموزشی
          </button>
          <button
            onClick={() => navigate('/bloge')}
            className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
          >
            وبلاگ
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
          >
            تماس با ما
          </button>
        </div>
        <div className='flex items-center justify-center gap-1 mt-4'>
          <img
              className="imgLogo w-8 h-8 md:w-10 md:h-10 transition-all duration-400"
              src="/images/logo.png"
              alt="logo"/>
              <p>Amoozly</p>
        </div>
      </div>
      
    </div>
  );
}
