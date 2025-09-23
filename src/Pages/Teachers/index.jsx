import React, { useEffect, useState } from 'react'
import fetchData from '../../Utils/fetchData'
import { ScaleLoader } from 'react-spinners'
import { FaChalkboardTeacher, FaLinkedin, FaTwitter, FaInstagram, FaUserTie } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function Teacher() {
  const [Teacher, setTeacher] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate=useNavigate()
  const baseUrl = "http://localhost:5000";
  
  useEffect(() => {
    (async () => {
      const response = await fetchData('teachers?populate=*')
      setTeacher(response.data)
      setLoading(false)
    })()
  }, [])

  // loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ScaleLoader color="#3B82F6" height={50} width={8} />
      </div>
    );
  }

  const teachers = Teacher?.map(tech => (
    <div key={tech?.id} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:transform hover:scale-105">
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
        
        {/*  شبکه‌های اجتماعی */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white rounded-full p-2 shadow-md">
          <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors cursor-pointer">
            <FaLinkedin size={14} />
          </button>
          <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors cursor-pointer">
            <FaTwitter size={14} />
          </button>
        </div>
      </div>

      {/* information teacher */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{tech?.name}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{tech?.["bio_Teacher"]}</p>
      
      <button onClick={(e)=>{
        e.stopPropagation()
        navigate(`/courseTeacher/${tech?.documentId}`)
      }} 
      className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors duration-300 cursor-pointer">
        مشاهده تدریس دوره
      </button>
    </div>
  ))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* هدر صفحه */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full text-white mb-4">
            <FaChalkboardTeacher size={28} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">مدرسین مجرب ما</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            با مدرسین حرفه‌ای ما آشنا شوید که با سال‌ها تجربه در زمینه‌های مختلف آماده انتقال دانش به شما هستند
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teachers}
        </div>

        {Teacher.length <= 4 && (
          <div className="text-center mt-16 p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">به تیم مدرسین ما بپیوندید!</h2>
            <p className="text-gray-600 mb-6">
              اگر شما هم expertise خاصی دارید و علاقه‌مند به تدریس هستید، با ما همکاری کنید
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-colors duration-300">
              ارسال رزومه
            </button>
          </div>
        )}
      </div>
    </div>
  )
}