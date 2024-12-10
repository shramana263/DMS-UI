import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';


import { jwtDecode } from 'jwt-decode';
import GuestLayout from '../Features/Layouts/GuestLayout';
import AuthLayout from '../Features/Layouts/AuthLayout';
import { useStateContext } from '../Features/Auth/contexts/StateContext';

const GuestRouter = React.lazy(() => import("./GuestRouter"))
const AuthRouter = React.lazy(() => import("./AuthRouter"))

const PlayGround = () => {
  const { token } = useStateContext();
  const [isGuest, setIsGuest] = useState(true);
  const pathname = useLocation();
  const [loading, setLoading] = useState(true)

  const isValidToken = () => {


    if (!token) {
      setIsGuest(true);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        //refresh token should be called
        setIsGuest(false);


      } else {
        setIsGuest(false);
      }
    } catch (error) {

      setIsGuest(true);
    }
  };


  useEffect(() => {
    console.log('before');
    
   isValidToken();
    console.log("pathname is", pathname, isGuest);


  }, [pathname])

  useEffect(() => {
    return (
      () => {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    )

  }, [])


  return (

    loading ? <div>loading</div> :
      <>

        {isGuest ?
          <GuestLayout >
            <Suspense fallback={<div>Loading...</div>}>
              <GuestRouter />
            </Suspense>
          </GuestLayout>
          :
          <AuthLayout >
            <Suspense fallback={<div>Loading...</div>}>
              <AuthRouter />
            </Suspense>
          </AuthLayout>
        }
      </>

  );
};

export default PlayGround;