import React, { useState } from 'react'
import { authLogout } from '../Auth/services/auth-api';
import { Outlet, useNavigate } from 'react-router-dom';
import { useStateContext } from '../Auth/contexts/StateContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchUser } from '../Auth/services/user-api';
import { fetchAllDocs } from '../Auth/services/document-api';
import AuthNavbar from '../Auth/components/AuthNavbar';
import Home from '../Auth/pages/Home';
import { useThemeContext } from '../../contexts/ThemeContext';

const AuthLayout = ({ children }) => {
  const { user, token, setUser, setToken } = useStateContext();
  const [isOpen, setOpen] = useState(true);
  const navigate = useNavigate();

  const authUser = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser

  })


  if (authUser.isError) {
    return "Something went wrong" + authUser.error.message
  }
  if (authUser.isFetching) {
    return "loading..."
  }
  // console.log({...authUser});
  // const onLogout = (ev) => {
  //     ev.preventDefault();
  //     logout.mutate()
  // };
  // setUser(authUser)
  const { isDark, setDark } = useThemeContext()
  return (
    <>
      <div className={`${isDark ? 'dark' : ''}`}>
        <div className={`h-full bg-gradient-to-br from-fuchsia-50 via-fuchsia-50 to-fuchsia-800
             dark:bg-gradient-to-br dark:from-gray-900 dark:via-neutral-800 dark:to-fuchsia-800`}>
          <AuthNavbar />
          {/* <div className='mt-20'>AuthLayout</div> */}
          <div className='mt-5 text-2xl ps-20 flex justify-left items-center dark:text-fuchsia-50'><span>Hello, </span><span>{authUser.data.name}</span></div>
          {/* <Home/> */}
          <main className=' ps-20 pe-20'>

            {children}
          </main>
        </div>

      </div>
    </>
  )
}

export default AuthLayout