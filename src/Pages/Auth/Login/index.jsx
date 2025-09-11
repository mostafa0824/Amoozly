import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../store/slices/AuthSlice";
import fetchData from "../../../Utils/fetchData";
import { FaUser, FaLock, FaSignInAlt, FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // librery Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("نام کاربری الزامی است"),
    password: Yup.string()
      .required("رمز عبور الزامی است")
      .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
      .matches(/[A-Z]/, "رمز عبور باید شامل حداقل یک حرف بزرگ باشد")
      .matches(/[a-z]/, "رمز عبور باید شامل حداقل یک حرف کوچک باشد")
      .matches(/[@$!%*?&]/, "رمز عبور باید شامل حداقل یک علامت خاص (@, $, !, %, *) باشد"),
  });

  const handleLogin = async (values, { setStatus, setSubmitting }) => {
    setStatus(null);
    try {
      const data = await fetchData("auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: values.username,
          password: values.password,
        }),
      });

      if (data.jwt) {
        dispatch(login({ token: data.jwt, user: data.user }));
        setStatus({ success: "ورود موفقیت‌آمیز بود!" });
        setTimeout(() => navigate("/"), 1000);
      } else {
        setStatus({ error: data.error?.message || "ورود ناموفق بود" });
      }
    } catch (err) {
      setStatus({ error: "خطا در ارتباط با سرور" });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-full">
              <FaSignInAlt className="text-3xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">ورود به حساب کاربری</h1>
          <p className="mt-2 opacity-90">لطفا اطلاعات حساب خود را وارد کنید</p>
        </div>

        <div className="p-6">
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, status }) => (
              <Form className="space-y-5">
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <Field
                    type="text"
                    name="username"
                    placeholder="نام کاربری یا ایمیل"
                    className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="رمز عبور"
                    className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {status?.error && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200">
                    {status.error}
                  </div>
                )}
                {status?.success && (
                  <div className="bg-green-50 text-green-700 p-3 rounded-lg border border-green-200">
                    {status.success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                  {isSubmitting ? (
                    <ScaleLoader color="#fff" height={20} width={3} />
                  ) : (
                    <>
                      <FaSignInAlt className="ml-2" />
                      ورود به حساب
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              حساب کاربری ندارید؟{" "}
              <Link 
                to="/register" 
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center"
              >
                <FaUserPlus className="ml-1" />
                ثبت‌ نام کنید
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
