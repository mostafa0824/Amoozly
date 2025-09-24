import React, { useEffect, useState } from "react";
import fetchData from "../../Utils/fetchData";
import CardCourse from "./CardCourse";
import { ScaleLoader } from "react-spinners";
import { SiConcourse } from "react-icons/si";
import { FaFilter, FaChevronDown } from "react-icons/fa";

export default function Course() {
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);

  // filter level
  useEffect(() => {
    (async () => {
      setLoading(true);
      let query = "courses?populate=*&pagination[pageSize]=100";
      const filters = [];
      if (level) filters.push(`filters[level][$eq]=${level}`);

      if (filters.length > 0) query += `&${filters.join("&")}`;

      const filteredRes = await fetchData(query);
      setCourse(filteredRes.data);
      setLoading(false);
    })();
  }, [level]);

  const itemCourse = course?.map((cor) => (
    <CardCourse key={cor?.id} course={cor} />
  ));

  if (loading) {
    return (
      <div className="flex justify-center items-center pt-40 pb-40">
        <ScaleLoader color="blue" height={100} width={10} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 sm:px-5 py-6 pt-20">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <SiConcourse className="ml-2 text-[35px] text-blue-600" />
        لیست همه دوره ها
      </h1>

      <div className="flex gap-4 mb-6 items-center bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex items-center text-blue-700">
          <FaFilter className="ml-2" />
          <span className="textFilter font-medium">فیلتر بر اساس:</span>
        </div>
        
        <div className="relative">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="selectBox appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-10 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 w-48 cursor-pointer"
          >
            <option value="">همه سطوح</option>
            <option value="beginner">مبتدی</option>
            <option value="intermediate">متوسط</option>
            <option value="advanced">پیشرفته</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-500">
            <FaChevronDown />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-4">
        {itemCourse}
      </div>
    </div>
  );
}