import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* هدر صفحه */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">تماس با ما</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            ما اینجا هستیم تا به شما کمک کنیم. هر سوال، پیشنهاد یا مشکلی دارید، خوشحال می‌شویم که با ما در میان بگذارید.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* اطلاعات تماس */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">راه‌های ارتباطی</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <FaPhone className="text-blue-600 text-xl" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-semibold text-gray-800 mb-1">تلفن</h3>
                    <p className="text-gray-600">۰۵۱-۱۲۳۴۵۶۷۸</p>
                    <p className="text-gray-600">۰۹۱۵-۳۴۵-۶۷۸۹</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <FaEnvelope className="text-blue-600 text-xl" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-semibold text-gray-800 mb-1">ایمیل</h3>
                    <p className="text-gray-600">info@example.com</p>
                    <p className="text-gray-600">support@example.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <FaMapMarkerAlt className="text-blue-600 text-xl" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-semibold text-gray-800 mb-1">آدرس</h3>
                    <p className="text-gray-600">
                      مشهد ، خیابان ولیعصر، جنب پارک وی، پلاک ۱۲۳۴، طبقه ۵
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <FaClock className="text-blue-600 text-xl" />
                  </div>
                  <div className="mr-4">
                    <h3 className="font-semibold text-gray-800 mb-1">ساعات کاری</h3>
                    <p className="text-gray-600">شنبه تا چهارشنبه: ۸:۰۰ تا ۱۷:۰۰</p>
                    <p className="text-gray-600">پنجشنبه: ۸:۰۰ تا ۱۴:۰۰</p>
                  </div>
                </div>
              </div>

              {/* شبکه‌های اجتماعی */}
              <div className="mt-12">
                <h3 className="font-semibold text-gray-800 mb-4">ما را در شبکه‌های اجتماعی دنبال کنید</h3>
                <div className="flex gap-4">
                  <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a href="#" className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors">
                    <FaTwitter className="text-xl" />
                  </a>
                  <a href="#" className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors">
                    <FaInstagram className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* فرم تماس */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">پیام خود را ارسال کنید</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="نام خود را وارد کنید"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      آدرس ایمیل
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    موضوع
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="موضوع پیام خود را وارد کنید"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    پیام
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="متن پیام خود را بنویسید..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <FaPaperPlane className="ml-2" />
                  ارسال پیام
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* نقشه */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.901484058229!2d51.38831421526933!3d35.70224218019104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQyJzA4LjEiTiA1McKwMjMnMjYuNiJF!5e0!3m2!1sen!2s!4v1622623110330!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="نقشه آدرس"
            className="w-full"
          ></iframe>
        </div>

        {/* سوالات متداول */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">سوالات متداول</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold text-gray-800 mb-3">چگونه می‌توانم در دوره‌ها ثبت نام کنم؟</h3>
              <p className="text-gray-600">
                می‌توانید از طریق صفحه دوره‌ها، دوره مورد نظر خود را انتخاب کرده و با کلیک روی دکمه "ثبت نام" فرآیند خرید را تکمیل کنید.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold text-gray-800 mb-3">آیا دوره‌ها گواهینامه دارند؟</h3>
              <p className="text-gray-600">
                بله، پس از اتمام موفقیت‌آمیز هر دوره، یک گواهینامه معتبر برای شما صادر خواهد شد.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold text-gray-800 mb-3">چگونه می‌توانم هزینه دوره را پرداخت کنم؟</h3>
              <p className="text-gray-600">
                ما چندین روش پرداخت شامل کارت‌های بانکی، پرداخت آنلاین و کیف پول الکترونیکی را پشتیبانی می‌کنیم.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold text-gray-800 mb-3">آیا امکان بازگشت وجه وجود دارد؟</h3>
              <p className="text-gray-600">
                بله، تا ۷ روز پس از خرید در صورت عدم رضایت از دوره، می‌توانید درخواست بازگشت وجه دهید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
