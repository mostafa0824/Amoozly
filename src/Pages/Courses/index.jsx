import React, { useEffect, useState } from 'react'
import fetchData from '../../Utils/fetchData';
import CardCourse from './CardCourse';
import { ScaleLoader } from 'react-spinners';

export default function Course() {
  const [loading,setLoading]=useState(true)
  const [course,setCourse]=useState([])
    // start courses
  useEffect(() => {
    (async () => {
      const response = await fetchData("courses?populate=*");
      setCourse(response.data);
      setLoading(false)
    })();
  }, []);
  // end courses

  const itemCourse=course?.map(cor=>(<CardCourse key={cor?.id} course={cor}/>))

    if (loading) {
    return (
      <div className="flex justify-center items-center m-50">
        <ScaleLoader color="blue" height={100} width={10}/>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-5 sm:px-5 py-6'>
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-4">
      {itemCourse}
    </div>
    </div>
  )
}
