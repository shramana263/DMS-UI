import React from 'react'
import { Outlet } from 'react-router-dom'
import GuestNavbar from '../Guest/components/GuestNavbar'
import { useThemeContext } from '../../contexts/ThemeContext'




const GuestLayout = ({ children }) => {

  const {isDark, setDark}= useThemeContext()
  return (
    <>
      <div className={`h-full w-full ${isDark?'dark':''} `}>

        {children}
      </div>
      {/* <GuestNavbar/> */}


    </>
  )
}
export default GuestLayout