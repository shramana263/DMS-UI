import React from 'react'
import GuestNavbar from '../Features/Guest/components/GuestNavbar'
import { useStateContext } from '../Features/Auth/contexts/StateContext'
import { Link } from 'react-router-dom'

const Landing = () => {
    const {token}= useStateContext()
    return (
        <div className='h-[100vh] w-full p-10 bg-fuchsia-950 flex justify-center items-center '>
            <div className='h-full w-full bg-gradient-to-br from-fuchsia-50 via-fuchsia-50 to-fuchsia-800
             dark:bg-gradient-to-br dark:from-gray-900 dark:via-neutral-800 dark:to-fuchsia-800 grid grid-rows-[50px_1fr_50px] p-4 px-5  rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
                <div className='w-full'>
                    <GuestNavbar />
                </div>
                <div className='w-full h-[90%] grid grid-cols-2 justify-center'>
                    <div className='flex flex-col gap-8 p-16'>
                        <div className='flex flex-wrap text-7xl font-bold '>
                            <span className='motion-preset-slide-right text-neutral-900 dark:text-fuchsia-50'>DOCUMENT</span>
                            <span className='dark:bg-gradient-to-r dark:from-white dark:via-fuchsia-600 dark:to-fuchsia-950 bg-clip-text text-transparent
                            bg-gradient-to-r from-neutral-900 via-fuchsia-900 to-fuchsia-700
                            motion-preset-slide-right font-extrabold'>MANAGEMENT </span>
                            <span className='motion-preset-slide-right text-neutral-900 dark:text-fuchsia-50'>SYSTEM</span>
                        </div>
                        <div className='motion-preset-slide-up dark:text-white text-sm'>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                        </div>
                        <Link to={token? '/all-documents':'/login'}>
                            <div className='motion-preset-shrink rounded-r-full rounded-l-full w-56 text-center px-4 py-3 font-semibold text-white bg-[#800470] shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:cursor-pointer
                             transition ease-in-out delay-50 hover:scale-105'
                             
                             >Get Started</div>
                        </Link>
                        
                    </div>
                    <div className='h-[85%] w-[85%] motion-preset-pop'>
                        <img src="/rb_4293.png" alt="" className='h-full w-full' />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Landing
