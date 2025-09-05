import React, { useState, useEffect } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

export default function SliderHome({ courses = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const baseUrl = "http://localhost:5000"; // آدرس Strapi

  // پلاگین AutoPlay
  const Autoplay = (slider) => {
    let timeout;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }
    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, 3000);
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });
    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  };

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop:true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      slides: {
        perView: 3,
        spacing: 15,
      },
      breakpoints: {
        "(max-width: 768px)": {
          slides: { perView: 1, spacing: 10 },
        },
      },
    },
    [Autoplay] // ✅ اضافه کردن پلاگین autoplay
  );

  // وقتی courses تغییر کرد، اسلایدر رو ریفرش کن
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [courses]);

  // شمارنده امن برای دات‌ها
  const slidesCount =
    instanceRef.current?.track?.details?.slides?.length ?? courses.length ?? 0;

  return (
    <div className="relative w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        دوره‌های آموزشی
      </h2>

      {/* اسلایدر */}
      <div ref={sliderRef} className="keen-slider rounded-xl shadow-lg">
        {courses.map((course) => (
          <div
            key={course?._id}
            className="keen-slider__slide min-w-[250px] bg-white rounded-xl shadow p-4 flex flex-col items-center"
          >
            <img
              src={`${baseUrl}${course?.image?.url}`}
              alt={course?.title}
              className="h-40 w-auto object-contain rounded mb-3"
            />
            <h3 className="text-lg font-semibold">{course?.title}</h3>
          </div>
        ))}
      </div>

      {/* دکمه‌های قبلی/بعدی */}
      {loaded && instanceRef.current && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 cursor-pointer"
            aria-label="قبلی"
          >
            ◀
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.next();
            }}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 cursor-pointer"
            aria-label="بعدی"
          >
            ▶
          </button>
        </>
      )}

      {/* دات‌های ناوبری */}
      {loaded && slidesCount > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: slidesCount }, (_, i) => (
            <button
              key={i}
              onClick={() => instanceRef.current?.moveToIdx(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                currentSlide === i ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
