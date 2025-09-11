import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft, FaEyeSlash, FaEye } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import fetchData from "../../../Utils/fetchData";

export default function Register() {
  const [showPassword,setShowPassword]=useState(false)
  
  const validation=Yup.object({
   username: Yup.string().required("نام کاربری الزامی است"),
   email:Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
   password:Yup.string().required("رمز عبور الزامی است")
   .min(6,"رمز عبور باید حداقل 6 کاراکتر داشته باشد")
   .matches(/[A-z]/,"رمز عبور باید شامل حداقل یک حرف بزرگ باشد")
   .matches(/[a-z]/,"رمز عبور باید شامل حداقل یک حرف کوچک باشد")
   .matches(/[@$!%*?&]/, "رمز عبور باید شامل حداقل یک علامت خاص (@, $, !, %, *) باشد"),
  })

  const handleRegister = async (values, { setSubmitting, setStatus }) => {
    console.log(values)
    setStatus(null);
    try {
      const res = await fetchData("auth/local/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res?.user) {
        setStatus({ success: "ثبت‌نام با موفقیت انجام شد!" });
        setTimeout(() => (window.location.href = "/login"), 1000);
      } else {
        setStatus({ error: res?.error?.message || "کاربر با این ایمیل/نام کاربری وجود دارد" });
      }
    } catch {
      setStatus({ error: "خطا در ارتباط با سرور. لطفا مجددا تلاش کنید" });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">ایجاد حساب کاربری</h1>
            <p className="text-blue-100 mt-2">لطفا اطلاعات خود را وارد کنید</p>
          </div>

          {/* form */}
          <div className="p-6">
            <Formik
              initialValues={{ username: "", email: "", password: "" }}
              validationSchema={validation}
              onSubmit={handleRegister}
            >
              {({ isSubmitting, status }) => (
                <Form className="space-y-4">
                  {/* usename */}
                  <InputField name="username" type="text" placeholder="نام کاربری خود را وارد کنید" icon={<FaUser />} />

                  {/* email */}
                  <InputField name="email" type="email" placeholder="ایمیل خود را وارد کنید" icon={<FaEnvelope />} />

                  {/* password */}
                  <div className="relative">
                  <InputField name="password" 
                  type={`${showPassword?'text':'password'}`} 
                  placeholder="رمز عبور خود را وارد کنید" icon={<FaLock />} />
                  <button className="absolute left-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer" 
                  onClick={()=>setShowPassword(!showPassword)}>
                   {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  </div>

                  {/* message وضعیت */}
                  {status?.error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{status.error}</div>}
                  {status?.success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">{status.success}</div>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? <ScaleLoader color="#fff" height={20} /> : "ثبت‌نام"}
                  </button>
                </Form>
              )}
            </Formik>

            {/* back link */}
            <div className="mt-6 text-center">
              <a href="/login" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">
                <FaArrowLeft className="ml-1" />
                حساب دارید؟ وارد شوید
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} - تمام حقوق محفوظ است
        </div>
      </div>
    </div>
  );
}

const InputField = ({ name, type, placeholder, icon }) => (
  <div>
    <div className="relative">
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="block w-full pr-10 pl-4 py-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
      />
    </div>
    <ErrorMessage name={name} component="div" className="text-red-600 text-sm mt-1" />
  </div>
);
