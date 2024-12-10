import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkMode from '../../../components/DarkMode';

const GuestNavbar = () => {
  const navigate=useNavigate();

  const handleAboutUsClick=()=>{
    navigate('/about');
  }
  

  return (
    <div className="w-full p-4 dark:text-fuchsia-100">
      <div className=" flex items-center justify-between">
        <div className="text-2xl font-bold motion-preset-shrink dark:text-fuchsia-100 text-neutral-900">DMS</div>
        
          <div className="flex gap-6 ">
            <DarkMode/>
            <Link to="#features" className="hover:underline motion-preset-pop">Features</Link>
            <Link to="#examples" className="hover:underline motion-preset-pop">Examples</Link>
            <Link to="/about" className="hover:underline motion-preset-pop">About us</Link>
            <Link to="/login" className=" dark:text-[#a73798] text-[#800470] motion-preset-pop font-bold  hover:cursor-pointer" >Login</Link>
          </div>
        
      </div>
    </div>
  );
}

export default GuestNavbar;
