import React, { useEffect, useState } from "react";
import fetchData from "../../Utils/fetchData";
import { ScaleLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { 
  FaUser, 
  FaEnvelope, 
  FaIdCard, 
  FaMobile, 
  FaBirthdayCake,
  FaUserCircle 
} from "react-icons/fa";
import Login from "../Auth/Login";
import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { HiOutlinePlusSmall } from "react-icons/hi2";

export default function Profile() {
  const { user,token } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

    const formatNumber = (num) => {
    return new Intl.NumberFormat('fa-IR').format(num);
  };

  if(!token){
    return <Login/>
  }

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const res = await fetchData(
          `profiles?filters[user][id][$eq]=${user?.id}&populate=*`
        );
        setProfile(res?.data?.[0] || null);
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ScaleLoader color="#3B82F6" height={50} width={8} />
      </div>
    );
  }

if (!profile) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 pt-20">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <ImProfile className="text-blue-500 text-[40px]"/>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">پروفایلی یافت نشد</h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          به نظر می‌رسد هنوز پروفایلی برای شما ایجاد نشده است. برای تکمیل اطلاعات خود، لطفاً پروفایل خود را ایجاد کنید.
        </p>
        
        <Link 
          to="/create-profile" 
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <HiOutlinePlusSmall className="text-white text-[25px]" />
          ایجاد پروفایل جدید
        </Link>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 pt-20">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white text-center">
          <div className="flex justify-center mb-4">
            <FaUserCircle className="text-5xl bg-white text-blue-500 rounded-full p-2" />
          </div>
          <h2 className="text-2xl font-bold">پروفایل کاربر</h2>
          <p className="mt-2 opacity-90">
            {profile?.name} {profile?.lastname}
          </p>
        </div>
        
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-5 space-x-4 space-x-reverse">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUser className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">نام کامل</p>
              <p className="font-medium">
                {profile?.name} {profile?.lastname}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-5 space-x-4 space-x-reverse">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaEnvelope className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">ایمیل</p>
              <p className="font-medium">{profile?.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-5 space-x-4 space-x-reverse">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaIdCard className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">کد ملی</p>
              <p className="font-medium">{formatNumber(profile?.['National_code']).replaceAll('٬','')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-5 space-x-4 space-x-reverse">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaMobile className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">شماره موبایل</p>
              <p className="font-medium">{formatNumber(profile?.['number_mobail']).replaceAll('٬','')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-5 space-x-4 space-x-reverse">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaBirthdayCake className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">تاریخ تولد</p>
              <p className="font-medium">
                {new Date(profile?.birthday).toLocaleDateString("fa-IR")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}