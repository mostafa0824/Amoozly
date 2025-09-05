const fetchData=async(url,Option={})=>{
  try {
    const response=await fetch(import.meta.env.VITE_API_URL + url,Option)
    const data=await response.json()
    return data
  } catch (error) {
    return {success: false, message: error.message};
  }
}

export default fetchData