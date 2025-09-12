import React, { useState } from 'react';
import { FaSearch, FaCalendarAlt, FaUser, FaTags, FaArrowRight, FaComment } from 'react-icons/fa';

export default function Bloge() {
  const [activeCategory, setActiveCategory] = useState('');
  
  const blogPosts = [
    {
      id: 1,
      title: '۱۰ نکته کلیدی برای موفقیت در یادگیری آنلاین',
      excerpt: 'یادگیری آنلاین می‌تواند چالش‌برانگیز باشد، اما با رعایت این نکات می‌توانید تجربه یادگیری بهتری داشته باشید.',
      date: '۱۴۰۴/۰۵/۲۰',
      author: 'محمد رضایی',
      category: 'نکات آموزشی',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      comments: 12
    },
    {
      id: 2,
      title: 'بهترین زبان‌های برنامه‌نویسی برای یادگیری در سال ۱۴۰۴',
      excerpt: 'با توجه به تغییرات بازار کار، برخی زبان‌های برنامه‌نویسی ارزش یادگیری بیشتری دارند.',
      date: '۱۴۰۴/۰۵/۱۸',
      author: 'فاطمه محمدی',
      category: 'برنامه‌نویسی',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      comments: 8
    },
    {
      id: 3,
      title: 'چگونه انگیزه خود را برای یادگیری حفظ کنیم؟',
      excerpt: 'حفظ انگیزه در طول دوره‌های یادگیری آنلاین یکی از بزرگترین چالش‌هاست. در این مقاله راهکارهایی ارائه می‌دهیم.',
      date: '۱۴۰۴/۰۵/۱۵',
      author: 'علی حسینی',
      category: 'انگیزشی',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      comments: 15
    },
    {
      id: 4,
      title: 'مقایسه دوره‌های ویدیویی با کلاس‌های آنلاین زنده',
      excerpt: 'کدام روش یادگیری برای شما مناسب‌تر است؟ در این مقاله مزایا و معایب هر روش را بررسی می‌کنیم.',
      date: '۱۴۰۴/۰۵/۱۰',
      author: 'زهرا اکبری',
      category: 'مقایسه',
      image: 'https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      comments: 6
    },
    {
      id: 5,
      title: 'راهنمای انتخاب بهترین لپ‌تاپ برای برنامه‌نویسی',
      excerpt: 'انتخاب سخت‌افزار مناسب می‌تواند تجربه یادگیری برنامه‌نویسی را значительно بهبود بخشد.',
      date: '۱۴۰۴/۰۵/۰۵',
      author: 'رضا موسوی',
      category: 'سخت‌افزار',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      comments: 20
    },
    {
      id: 6,
      title: '۵ منبع رایگان برای یادگیری طراحی وب',
      excerpt: 'یادگیری طراحی وب نیازی به هزینه زیاد ندارد. این منابع رایگان می‌توانند نقطه شروع مناسبی باشند.',
      date: '۱۴۰۴/۰۵/۰۲',
      author: 'سارا کریمی',
      category: 'منابع رایگان',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      comments: 18
    }
  ];

  // دسته‌بندی‌های مختلف
  const categories = ['همه', 'نکات آموزشی', 'برنامه‌نویسی', 'انگیزشی', 'مقایسه', 'سخت‌افزار', 'منابع رایگان'];

  // مقالات پرطرفدار
  const popularPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* هدر وبلاگ */}
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">وبلاگ آموزشی</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            جدیدترین مقالات، نکات آموزشی و راهنمایی‌های تخصصی در زمینه یادگیری آنلاین و برنامه‌نویسی
          </p>
        </div>

        {/* جستجو و فیلترها */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="جستجو در مقالات..."
              className="w-full py-3 px-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* بخش اصلی مقالات */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <div className="flex items-center ml-4">
                        <FaCalendarAlt className="ml-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <FaUser className="ml-1" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mb-3">
                      {post.category}
                    </span>
                    
                    <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-500 text-sm">
                        <FaComment className="ml-1" />
                        <span>{post.comments} نظر</span>
                      </div>
                      
                      <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                        ادامه مطلب
                        <FaArrowRight className="mr-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* صفحه‌بندی */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                <button className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100">2</button>
                <button className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100">3</button>
                <button className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100">...</button>
                <button className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100">بعدی</button>
              </nav>
            </div>
          </div>

          {/* سایدبار */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <FaTags className="ml-2 text-blue-500" />
                دسته‌بندی‌ها
              </h3>
              <ul className="space-y-3">
                {categories.filter(cat => cat !== 'همه').map(category => (
                  <li key={category} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">{category}</span>
                    <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">12</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">مقالات پرطرفدار</h3>
              <div className="space-y-4">
                {popularPosts.map(post => (
                  <div key={post.id} className="flex items-center cursor-pointer group">
                    <img src={post.image} alt={post.title} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="mr-4">
                      <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray-500">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-600 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-4">عضویت در خبرنامه</h3>
              <p className="mb-4">با عضویت در خبرنامه، از جدیدترین مقالات و دوره‌های آموزشی باخبر شوید.</p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="آدرس ایمیل"
                  className="w-full py-3 px-4 rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  عضویت
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
