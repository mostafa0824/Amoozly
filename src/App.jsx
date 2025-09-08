import React from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Cart from './Pages/Cart'
import Categories from './Pages/Categories'
import CourseDetails from './Pages/CourseDetails'
import Course from './Pages/Courses'
import Profile from './Pages/Profile'
import Teacher from './Pages/Teachers'
import NotFound from './Pages/NotFound'
import CategoryDetails from './Pages/CategoryDetails'
import Favorites from './Pages/Favorites'
import CourseTeacher from './Pages/Teachers/CourseTeacher'
import Bloge from './Public/Bloge'
import Contact from './Public/Contact'
import Found from './Pages/Found'

export default function App() {
  return (
    <>
    <Navbar/>
    <Routes>
     <Route exact path="/" element={<Home/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/cart' element={<Cart/>}/>
     <Route path='/favorites' element={<Favorites/>}/>
     <Route path='/categories' element={<Categories/>}/>
     <Route path='/category-details/:id/:name' element={<CategoryDetails/>}/>
     <Route path='/courses' element={<Course/>}/>
     <Route path='/course-details/:id/:name' element={<CourseDetails/>}/>
     <Route path='/profile' element={<Profile/>}/>
     <Route path='/teachers' element={<Teacher/>}/>
     <Route path='/courseTeacher/:id' element={<CourseTeacher/>}/>
     <Route path='/bloge' element={<Bloge/>}/>
     <Route path='/contact' element={<Contact/>}/>
     <Route path='/found/:name' element={<Found/>}/>
     <Route path='*' element={<NotFound/>}/>
    </Routes>
    <Footer/>
    </>
  )
}
