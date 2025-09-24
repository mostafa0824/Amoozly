import React, { useEffect, useState } from 'react'
import CardCategories from './cardCategories';
import fetchData from '../../Utils/fetchData';
import { ScaleLoader } from 'react-spinners';
import { BiCategory } from 'react-icons/bi';

export default function Categories() {
  const [loading,setLoading]=useState(true)
  const [category,setCategory]=useState([])
   // start fetch categories
  useEffect(() => {
    (async () => {
      const response = await fetchData("categories?populate=image");
      setCategory(response.data);
      setLoading(false)
    })();
  }, []);
  const itemCtegory=category?.map(cat=>(<CardCategories key={cat?.id} itemsCat={cat}/>))
  // end fetch categories
  
    if (loading) {
    return (
      <div className="flex justify-center items-center  pt-40 pb-40">
        <ScaleLoader color="blue" height={100} width={10}/>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-5 sm:px-5 py-6 pt-20'>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BiCategory className="ml-2 text-[35px] text-blue-600" />
                 دسته بندی دوره های آموزشی
              </h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-4">
          {itemCtegory}
      </div>
    </div>
  )
}
