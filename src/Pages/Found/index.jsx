import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import fetchData from '../../Utils/fetchData'
import FoundCart from './FoundCart'
import { CgSearchFound } from 'react-icons/cg'
import { ScaleLoader } from 'react-spinners'
import { FaSearch } from 'react-icons/fa'

export default function Found() {
   const {name}=useParams()
   const navigate=useNavigate()
   const [loading,setLoading]=useState(true)
   const [search,setSearch]=useState([])

   useEffect(()=>{
    (async()=>{
        setLoading(true)
        const response=await fetchData(`courses?filters[$or][0][title][$containsi]=${name}&filters[$or][1][description][$containsi]=${name}&populate=*`)
        setSearch(response.data || [])
        setLoading(false)
    })()
   },[name])

     if (loading) {
    return (
      <div className="flex justify-center items-center m-50 h-64">
        <ScaleLoader color="blue" height={100} width={10} />
      </div>
    );
  }
 
  return (
    <div className="container mx-auto px-5 sm:px-5 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <CgSearchFound className="ml-2 text-[35px] text-blue-600" />
        نتایج جستجو برای: "{name}"
      </h1>
      
      {search.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md text-center mt-8">
          <div className="mb-4">
            <FaSearch className="text-4xl text-gray-400 mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">موردی یافت نشد</h3>
          <p className="text-gray-500 mb-4">متأسفانه دوره‌ای با مشخصات جستجو شده پیدا نشد.</p>
          <p className="text-gray-500 mb-6">لطفاً عبارت جستجو را تغییر دهید یا از کلمات کلیدی دیگری استفاده کنید.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() =>navigate(-1) }
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 cursor-pointer"
            >
              بازگشت
            </button>
            <button 
              onClick={() => navigate('/courses')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 cursor-pointer"
            >
              مشاهده همه دوره‌ها
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            <span className="font-semibold">{search.length}</span> نتیجه برای جستجوی شما پیدا شد
          </p>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-4">
            {search.map(item => (
              <FoundCart key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}