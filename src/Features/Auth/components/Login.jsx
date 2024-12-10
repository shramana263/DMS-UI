import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axiosClient from '../../../axios-client';
import { useStateContext } from '../contexts/StateContext';
import { authLogin } from '../services/auth-api';
import GuestNavbar from '../../Guest/components/GuestNavbar';

const Login = () => {
  const { setUser, setToken, setRefreshToken } = useStateContext();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: authLogin,
    onSuccess: (response) => {
      console.log("Response = ",response.data.data);
      setUser(response.data.data);   // Ensure response.data contains the correct user data.
      setToken(response.data.token,response.data.refreshToken); // Ensure response.token contains the correct token.
      // setRefreshToken(response.data.refreshToken);
      navigate('/all-document');
    },
    onError: (err) => {
      console.log('Login failed:', err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent page refresh

    // Get the values from input refs
    const payload = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    // Trigger the login mutation with the payload
    loginMutation.mutate(payload);
  };


  const handleLogin=()=>{
    axiosClient.get("/home").then(res=>{
      console.log(res.data);
    }).catch(err=>{
      console.log(err);
      
    })
  }

  return (
    <section className="bg-gradient-to-br from-fuchsia-50 via-fuchsia-50 to-fuchsia-800 
    dark:bg-gradient-to-br dark:from-gray-900 dark:via-neutral-800 dark:to-fuchsia-800
    h-screen flex flex-col w-full justify-center items-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0 w-full">
        <div className="w-full rounded-lg bg-fuchsia-950 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] md:mt-0 sm:max-w-md xl:p-0 motion-preset-pop">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-fuchsia-100 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Your username
                </label>
                <input
                  type="text"
                  name="username"
                  ref={usernameRef}
                  className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 "
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-fuchsia-100 ">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  ref={passwordRef}
                  placeholder="••••••••"
                  className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 "
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline text-fuchsia-100">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-fuchsia-100 font-medium rounded-lg text-md px-5 py-2.5 text-center bg-fuchsia-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-300">
                Don't have an account yet?{' '}
                <Link to="/register" className="font-medium text-primary-600 hover:underline text-[#ac2399] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                  Sign up
                </Link>

              </p>
            </form>

            {/* <button onClick={handleLogin} className='bg-[#800470] text-white px-4 py-3 rounded'>
              Login
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
