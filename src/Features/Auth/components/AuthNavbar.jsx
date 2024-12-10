import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from '../Logout/LogoutButton';
import { authLogout } from '../services/auth-api';
import { useStateContext } from '../contexts/StateContext';
import DarkMode from '../../../components/DarkMode';

const AuthNavbar = () => {

    const { setToken, setRefreshToken } = useStateContext();
    const navigate = useNavigate();

    const handleAboutUsClick = () => {
        navigate('/about');
    }
    const handleLogout = (e) => {
        e.preventDefault();
        authLogout()
            .then(() => {
                setToken(null);
                setRefreshToken(null);


                localStorage.removeItem('ACCESS_TOKEN');
                localStorage.removeItem('REFRESH_TOKEN');

                // navigate('/login');
                window.location.href = "/"

            })
            .catch((error) => {
                console.error('Logout failed', error);
            });
    };
    return (
        <>
            <div className=" w-full p-4 dark:text-fuchsia-100">
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold motion-preset-shrink dark:text-fuchsia-100 text-neutral-900">DMS</div>

                    <div className="flex gap-6">
                        <DarkMode />
                        <Link to="/home" className="hover:underline flex justify-center items-center">Home</Link>
                        <Link to="#features" className="hover:underline flex justify-center items-center">Features</Link>
                        <Link to="#examples" className="hover:underline flex justify-center items-center">Examples</Link>
                        <Link to="/about" className="hover:underline flex justify-center items-center" onClick={handleAboutUsClick}>About us</Link>
                        <Link className="px-4 py-2 text-blue-600 rounded hover:cursor-pointer" onClick={handleLogout} >Logout</Link>
                        {/* <li className='flex justify-center items-center'><LogoutButton/></li> */}
                    </div>

                </div>
            </div>
        </>
    )
}

export default AuthNavbar
