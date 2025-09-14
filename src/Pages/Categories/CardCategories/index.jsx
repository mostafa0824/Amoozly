import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function CardCategories({ itemsCat }) {
  const navigate = useNavigate()
  const baseUrl = "http://localhost:5000";
  return (
    <div key={itemsCat?.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={`${baseUrl}${itemsCat?.image?.url}`} 
        alt={itemsCat?.name} 
        className="w-full h-48"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{itemsCat?.name}</h3>
        <span className="text-blue-600 text-sm block mb-2">{itemsCat?.slug}</span>
        <p className="text-gray-600 mb-4 line-clamp-2">{itemsCat?.description}</p>
        <div className="p-4 pt-0 mt-auto flex items-center justify-center gap-4">
          <button 
          className="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => navigate(`/category-details/${itemsCat?.documentId}/${itemsCat?.name.replaceAll('/',' ','-')}`)}
        >
          مشاهده دوره ها
        </button>
        </div>
        
      </div>
    </div>
  )
}