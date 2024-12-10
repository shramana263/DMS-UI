import React from 'react'
import Home from '../Features/Guest/pages/Home'
import { Route, Routes } from 'react-router-dom'
import AboutUs from '../Features/Guest/pages/AboutUs'
import Register from '../Features/Auth/components/Register'
import Login from '../Features/Auth/components/Login'
import Landing from '../pages/Landing'

const GuestRouter = () => {
    console.log("I am in guest layout")
    return (
    <>
     
        <Routes>
            <Route index element={<Landing />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
        </Routes> 
    </>
  )
}

export default GuestRouter
