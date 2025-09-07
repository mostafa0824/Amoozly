import React from 'react';
import { ImBin } from 'react-icons/im';
import { FaShoppingCart, FaTrash, FaArrowLeft, FaCreditCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeCart } from '../../store/slices/CartSlice';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const baseUrl = "http://localhost:5000";
  const { items, totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const calculateFinalPrice = (item) => {
    return item.discount > 0 ? item.price - item.discount : item.price;
  };

  const cartItems = items?.map(item => {
    const finalPrice = calculateFinalPrice(item);
    const hasDiscount = item.discount > 0;
    
    return (
      <div 
        key={item?.id}
        className="cart-item flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 mb-4 cursor-pointer border border-gray-100"
        onClick={() => navigate(`/course-details/${item?.documentId}/${item?.title?.replace(/\//g, " ")?.replace(/\s+/g, "-")}`)}>
        
        <div className="relative group flex items-center space-x-4">
          <p className="absolute top-16 right-0 opacity-0 group-hover:opacity-100 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md transition-all duration-300 transform group-hover:translate-y-1">
            مشاهده جزيیات
          </p>
          <img 
            src={`${baseUrl}${item?.image?.url}`} 
            alt={item?.title} 
            className="w-16 h-16 object-cover rounded-md"
          />
          <div className='flex flex-col gap-2'>
            <p className="font-medium text-gray-800 line-clamp-1">{item?.title}</p>
            <div className='flex items-center gap-3'>
              <span className="text-green-600 font-semibold">
                {formatPrice(finalPrice)} تومان
              </span>
              {hasDiscount && (
                <>
                  <span className='text-gray-400 line-through'>
                    {formatPrice(item.price)}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <ImBin 
          onClick={(e) => {
            e.stopPropagation();
            dispatch(removeCart(item?.documentId));
          }} 
          className="text-red-400 hover:text-red-600 transition-all duration-250 text-[40px] cursor-pointer p-2 hover:bg-red-50 rounded-full" 
        />
      </div>
    );
  });

  // محاسبه جمع کل سبد خرید
  const calculatedTotalPrice = items.reduce((total, item) => {
    return total + calculateFinalPrice(item);
  }, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center bg-white p-8 rounded-2xl shadow-sm">
            <div className="flex justify-center mb-6">
              <FaShoppingCart className="text-5xl text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">سبد خرید شما خالی است</h2>
            <p className="text-gray-600 mb-8">می‌توانید از میان صدها دوره آموزشی، دوره مورد نظر خود را انتخاب کنید</p>
            <button 
              onClick={() => navigate('/courses')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center mx-auto cursor-pointer"
            >
              <FaArrowLeft className="ml-2" />
              مشاهده دوره‌ها
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <FaShoppingCart className="ml-2" />
          سبد خرید دوره‌های آموزشی
        </h1>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-700">
              سبد خرید شما شامل <span className="font-semibold">{items.length}</span> دوره می‌باشد
            </p>
            <button 
              onClick={() => dispatch(clearCart())}
              className="text-red-500 hover:text-red-700 flex items-center transition-all duration-300 py-2 px-4 hover:bg-red-50 rounded-lg cursor-pointer"
            >
              <FaTrash className="ml-1" />
              پاک کردن سبد خرید
            </button>
          </div>
          
          <div className="mb-8">
            {cartItems}
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg text-gray-700">جمع کل:</span>
              <span className="text-2xl font-bold text-green-600">
                {formatPrice(calculatedTotalPrice)} تومان
              </span>
            </div>
            
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer">
              <FaCreditCard className="ml-2" />
              تایید و تکمیل خرید
            </button>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2">تضمین بازگشت وجه</h3>
          <p className="text-sm text-blue-600">کلیه خریدها از سایت ما تا ۷ روز پس از خرید در صورت عدم رضایت از دوره، دارای تضمین بازگشت وجه می‌باشند.</p>
        </div>
      </div>
    </div>
  );
}