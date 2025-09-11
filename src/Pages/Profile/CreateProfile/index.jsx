import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import fetchData from "../../../Utils/fetchData";
import { useSelector } from "react-redux";
import { 
  FaUser, 
  FaEnvelope, 
  FaIdCard, 
  FaMobile, 
  FaBirthdayCake,
  FaSave,
  FaArrowRight,
  FaUserPlus
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Login from "../../Auth/Login";
import { ScaleLoader } from "react-spinners";

export default function CreateProfile() {
  const navigate=useNavigate()
  const { user, token } = useSelector((state) => state.auth);
  
  if(!token){
    return <Login/>
  }

const validation = Yup.object({
  name: Yup.string().required("نام الزامی است"),
  lastname: Yup.string().required("نام خانوادگی الزامی است"),
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  National_code: Yup.string()
    .required("کد ملی الزامی است")
    .matches(/^[0-9]{10}$/, "کد ملی باید ۱۰ رقم عددی باشد"),
  number_mobail: Yup.string()
    .required("شماره موبایل الزامی است")
    .matches(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست"),
  birthday: Yup.date()
    .required("تاریخ تولد وارد شود")
    .max(new Date(), "تاریخ تولد نمی‌تواند در آینده باشد"),
});

  const handleSubmit = async (values, { setSubmitting, resetForm,setStatus }) => {
    try {
      const res = await fetchData("profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...values,
            user: user.id,
          },
        }),
      });

      if (res?.data) {
        setStatus({success :"پروفایل با موفقیت ساخته شد ✅"});
        resetForm();
        navigate("/profile")
      } else {
        console.error("Create profile error:", res);
        setStatus({error:"خطا در ساخت پروفایل ❌"});
      }
    } catch (err) {
      console.error("Server error:", err);
      setStatus({error:"خطا در ارتباط با سرور ❌"});
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-full">
              <FaUserPlus className="text-3xl" />
            </div>
          </div>
          <h2 className="text-2xl font-bold">ایجاد پروفایل کاربری</h2>
          <p className="mt-2 opacity-90">لطفا اطلاعات خود را با دقت وارد کنید</p>
        </div>

        <div className="p-6 md:p-8">
          <Formik
            initialValues={{
              name: "",
              lastname: "",
              email: "",
              National_code: "",
              number_mobail: "",
              birthday: "",
            }}
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting,status }) => (
              <Form className="space-y-5 text-right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <Field 
                      name="name" 
                      placeholder="نام"
                      className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1"/>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <Field 
                      name="lastname" 
                      placeholder="نام خانوادگی"
                      className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm mt-1"/>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <Field 
                    name="email" 
                    type="email" 
                    placeholder="ایمیل"
                    className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FaIdCard className="text-gray-400" />
                    </div>
                    <Field 
                      name="National_code" 
                      placeholder="کد ملی"
                      className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <ErrorMessage name="National_code" component="div" className="text-red-500 text-sm mt-1"/>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FaMobile className="text-gray-400" />
                    </div>
                    <Field 
                      name="number_mobail" 
                      placeholder="شماره موبایل"
                      className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <ErrorMessage name="number_mobail" component="div" className="text-red-500 text-sm mt-1"/>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaBirthdayCake className="text-gray-400" />
                  </div>
                  <Field 
                    name="birthday" 
                    type="date" 
                    className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage name="birthday" component="div" className="text-red-500 text-sm mt-1"/>
                </div>
          {/* message */}
                 {status?.success && <div className="text-green-500 mb-3">{status.success}</div>}
                {status?.error && <div className="text-red-500 mb-3">{status.error}</div>}
          {/* button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center mt-4 cursor-pointer"
                >
                  {isSubmitting ? (
                    <ScaleLoader color="#fff" height={20} width={3} />
                  ) : (
                    <>
                      <FaSave className="ml-2" />
                      ثبت پروفایل
                      <FaArrowRight className="mr-2" />
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}